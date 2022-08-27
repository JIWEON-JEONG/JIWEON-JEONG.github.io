---
title:  "[Kotlin] Shared mutable state and concurrency"
excerpt: "Shared mutable state and concurrency"

categories:
  - Kotlin
tags:
  - [코루틴]

permalink: /kotlin/Shared-mutable-state-and-concurrency/

toc: true
toc_sticky: true

date: 2022-08-21
last_modified_at: 2022-08-21
---
> 코루틴 공식 문서를 번역하고 내용을 조금 변경하거나 내용을 추가한 게시글입니다. 잘못된 번역이 있을 수 있습니다.
> [참고한 공식 문서 바로가기](https://kotlinlang.org/docs/shared-mutable-state-and-concurrency.html)

<br>

Dispatchers.Default와 같은 multi-threaded dispatcher를 통해 코루틴은 동시에 실행될 수 있습니다. 이는 모든 동시성 문제를 나타냅니다. 주요 문제는 shared mutable state에 대한 액세스 동기화입니다. 코루틴 환경에서 이러한 문제의 일부 해결책은 multi-threaded 환경의 해결책과 유사합니다. 하지만 나머지는 유니크합니다.

<br>

## The problem
같은 행동을 천번하는 백개의 코루틴을 실행해봅시다. 또한 추가 비교를 위해 완료 시간을 측정합니다.
{% highlight kotiln %}
suspend fun massiveRun(action: suspend () -> Unit) {
    val n = 100  // number of coroutines to launch
    val k = 1000 // times an action is repeated by each coroutine
    val time = measureTimeMillis {
        coroutineScope { // scope for coroutines
            repeat(n) {
                launch {
                    repeat(k) { action() }
                }
            }
        }
    }
    println("Completed ${n * k} actions in $time ms")
}
{% endhighlight kotlin %}
multi-threaded인 Dispatchers.Default를 사용하여 shared mutable variable를 증가시키는 아주 간단한 action을 실행합니다.
{% highlight kotlin %}
var counter = 0

fun main() = runBlocking {
    withContext(Dispatchers.Default) {
        massiveRun {
            counter++
        }
    }
    println("Counter = $counter")
}
{% endhighlight kotlin %}
항상 "Counter = 100000"를 출력하진 않습니다. 그 이유는 백개의 코루틴이 동기화 없이 counter를 멀티 스레드에서 동시에 증가시키기 때문입니다.

<br>

## Volatiles are of no help
volatile 변수가 동시성 문제를 해결한다는 흔한 오해가 있다.
{% highlight kotlin %}
@Volatile // in Kotlin `volatile` is an annotation 
var counter = 0

fun main() = runBlocking {
    withContext(Dispatchers.Default) {
        massiveRun {
            counter++
        }
    }
    println("Counter = $counter")
}
{% endhighlight kotlin %}
여전히 "Counter = 100000" 결과를 얻을 수 없습니다. volatile 변수는 선형적인 읽기와 쓰기를 보장하지만 대량 actions에 대해서는 원자성을 제공하지 않기 때문입니다.

<br>

## Thread-safe data structures
thread와 코루틴 모두에게 적용되는 일반적인 해결책은 thread-safe(synchronized, linearizable, atomic) 데이터 구조를 사용하는 것입니다. 이러한 데이터 구조는 shared stated에서 작동하는 동시 작업에 대한 synchronization을 제공합니다. 단순한 counter의 경우 atomic incrementAndGet 작업을 할 수 있는 AtomicInteger 클래스를 사용할 수 있습니다.
{% highlight kotlin %}
val counter = AtomicInteger()

fun main() = runBlocking {
    withContext(Dispatchers.Default) {
        massiveRun {
            counter.incrementAndGet()
        }
    }
    println("Counter = $counter")
}
{% endhighlight kotlin %}
이러한 특정 문제에 대한 가장 빠른 해결책입니다. 순수한 counters, collections, queues 그리고 다른 표준 데이터 구조와 기본 작동에 대해 효과가 있습니다. 그러나 복잡한 state나 thread-safe 구현체를 이미 가지고 있지 않은 operations에 대해 쉽게 규모를 키울 수 없습니다. 

<br>

## Thread confinement find-grained
Thread 제한은 shared mutable state 문제 접근 방법입니다. 특정 shared state에 대한 접근을 단일 thread로 제한합니다. 전형적으로 UI applications에서 사용됩니다. UI 상태는 단일 event-dispatch/application thread에 의해 제한됩니다. 코루틴에서 single-threaded context를 사용하여 쉽게 적용할 수 있습니다.
{% highlight kotlin %}
val counterContext = newSingleThreadContext("CounterContext")
var counter = 0

fun main() = runBlocking {
    withContext(Dispatchers.Default) {
        massiveRun {
            // confine each increment to a single-threaded context
            withContext(counterContext) {
                counter++
            }
        }
    }
    println("Counter = $counter")
}
{% endhighlight kotiln %}
이 코드는 아주 느리게 동작합니다. find-grained thread-confinement이기 때문이죠. 각각의 독립적인 increment는 multi-threaded Dispatchers.Default context에서 withContext(counterContext)를 사용하는 single-threaded context block으로 전환됩니다.

<br>

## Thread confinement coarse-grained
실제로, 스레드 제한은 더 큰 덩어리로 수행됩니다. 예를 들어 상태를 업데이트 하기 위한 거대한 비즈니스 로직은 단일 스레드로 제한됩니다. 다음 예시는 이렇게 동작합니다. 각각의 코루틴을 시작하기 위해서 단일 스레드 context를 사용합니다. 
{% highlight kotlin %}
val counterContext = newSingleThreadContext("CounterContext")
var counter = 0

fun main() = runBlocking {
    // confine everything to a single-threaded context
    withContext(counterContext) {
        massiveRun {
            counter++
        }
    }
    println("Counter = $counter")
}
{% endhighlight kotlin %}
이제 더 빠르고 동일한 결과를 생산합니다.

<br>

## Mutual exclusion
Mutual exclusion 해결책은 shared state의 모든 수정을 동시에 실행될 수 없는 임계 영역으로 보호합니다. blocking 환경에서 일반적으로 synchronized나 ReentrantLock를 사용해야했습니다. 코루틴의 대안은 Mutex입니다. 임계 영역의 한계를 정하는 lock과 unlock 함수를 가지고 있습니다. 가장 큰 차이점은 Mutex.lock()은 suspending function라는 것입니다. 이는 thread를 block하지 않습니다.

<br>

추가로 withLock 확장 함수가 존재합니다. 편리하게 mutex.lock(); try { ... } finally { mutex.unlock() } 패턴을 나타냅니다.
{% highlight kotlin %}
val mutex = Mutex()
var counter = 0

fun main() = runBlocking {
    withContext(Dispatchers.Default) {
        massiveRun {
            // protect each increment with lock
            mutex.withLock {
                counter++
            }
        }
    }
    println("Counter = $counter")
}
{% endhighlight kotlin %}
예제에서 사용한 locking은 fine-grained이기 때문에 비용이 듭니다. 그러나 몇몇 상황에서는 좋은 선택입니다. 반드시 shared state를 주기적으로 수정해야하지만 이를 위한 natural thread가 없는 경우에 말이죠.

<br>

## Actors
actor는 코루틴, 해당 코루틴에 국한되고 캡슐화된 state, 그리고 다른 코루틴들과 소통하기위한 채널들의 조합으로 만들어지는 entity입니다. 간단한 actor는 함수로 만들어질 수 있습니다. 하지만 복잡한 상태를 갖는 actor는 클래스에 더 적합합니다.

<br>

actor 코루틴 빌더는 편리하게 actor's mailbox channel을 자신의 범위에 결합하여 메세지를 수신하고 send channel을 결과 job 객체로 결합합니다. actor에 대한 단일 레퍼런스는 핸들로서 가지고 다닐 수 있습니다.

<br>

actor를 사용하기 위한 첫 번째 단계는 actor가 처리할 메세지의 클래스를 정의하는 것입니다. 코틀린의 sealed classes는 이 목적에 부합합니다. CounterMsg sealed class를 IncCounter 메세지, GetCounter 메세지와 함께 정의했습니다. IncCounter는 counter를 증가하기 위함이며 GetCounter는 값을 가져오기 위함입니다. 또한 후자의 경우 response를 보낼 필요가 있습니다. 추후에 알려지는 단일값을 나타내는 CompletableDefferred communication primitive는 이러한 목적을 위해 사용됩니다.
{% highlight kotlin %}
// Message types for counterActor
sealed class CounterMsg
object IncCounter : CounterMsg() // one-way message to increment counter
class GetCounter(val response: CompletableDeferred<Int>) : CounterMsg() // a request with reply
{% endhighlight kotlin %}

이제 actor 코루틴 빌더를 사용하는 actor를 실행하는 함수를 정의할 수 있습니다.
{% highlight kotlin %}
// This function launches a new counter actor
fun CoroutineScope.counterActor() = actor<CounterMsg> {
    var counter = 0 // actor state
    for (msg in channel) { // iterate over incoming messages
        when (msg) {
            is IncCounter -> counter++
            is GetCounter -> msg.response.complete(counter)
        }
    }
}
{% endhighlight kotlin %}

주요 코드는 간단합니다.
{% highlight kotlin %}
fun main() = runBlocking<Unit> {
    val counter = counterActor() // create the actor
    withContext(Dispatchers.Default) {
        massiveRun {
            counter.send(IncCounter)
        }
    }
    // send a message to get a counter value from an actor
    val response = CompletableDeferred<Int>()
    counter.send(GetCounter(response))
    println("Counter = ${response.await()}")
    counter.close() // shutdown the actor
}
{% endhighlight kotlin %}

actor 자체가 어떤 context에서 실행되는 지는 (정확성을 위해) 중요하지 않다. actor는 코루틴이고 코루틴은 순차적으로 실행됩니다. 그래서 특정 코루틴에 대한 state의 제한은 shared mutable state 문제의 해결책으로 작동합니다. 사실상 actor는 자신의 private state를 수정할 수 있지만 오직 messages를 통해서만 영향을 미칠 수 있다. (Lock의 사용 없이)

<br>

actor는 부하 상태에서 locking보다 효율적입니다. 이러한 경우 항상 할 일이 있으며 다른 context로 전환될 일이 전혀 없기 때문입니다.