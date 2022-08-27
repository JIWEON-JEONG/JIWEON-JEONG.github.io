---
title:  "[Kotlin] Coroutines basics"
excerpt: "코틀린 기초에 대해 정리"

categories:
  - Kotlin
tags:
  - [코루틴]

permalink: /kotlin/Coroutines-basics/

toc: true
toc_sticky: true

date: 2022-08-04
last_modified_at: 2022-08-04
---
> 코루틴 공식 문서를 번역하고 내용을 조금 변경하거나 내용을 추가한 게시글입니다. 잘못된 번역이 있을 수 있습니다.
> [참고한 공식 문서 바로가기](https://kotlinlang.org/docs/coroutines-basics.html)

<br>

{% highlight kotlin %}
fun main() = runBlocking { // this: CoroutineScope
    launch { // launch a new coroutine and continue
        delay(1000L) // non-blocking delay for 1 second (default time unit is ms)
        println("World!") // print after delay
    }
    println("Hello") // main coroutine continues while a previous one is delayed
}
{% endhighlight kotlin %}

    Hello
    World!

<br>

`launch`는 coroutine builder입니다.   
코드의 나머지 부분과 동시에 실행되며 독립적으로 작동합니다.   

`delay`는 suspending function입니다. 코루틴을 특정 시간동안 중단시킵니다.   
코루틴을 중단시켜도 스레드는 block되지 않습니다. 다른 코루틴이 실행되고 실행된 코루틴이 스레드를 사용합니다.

`runBlocking`은 coroutine builder입니다.   
`fun main()`과 runBlocking안에 있는 코루틴 코드를 연결합니다.
또한 { } 안은 `CoroutineScope`입니다.   
`launch`의 경우 `CoroutineScope`안에서만 선언할 수 있습니다.

<br>

## Structured concurrency
새로운 코루틴은 특정한 CoroutineScope안에서 실행되어야 합니다.CoroutineScope는 코루틴의 생명주기의 범위를 정합니다.   
Structured concurrency는 코루틴이 lost, leak됨을 방지합니다.   

<br>

## suspending function
{% highlight kotlin %}
fun main() = runBlocking { // this: CoroutineScope
    launch { doWorld() }
    println("Hello")
}

// this is your first suspending function
suspend fun doWorld() {
    delay(1000L)
    println("World!")
}
{% endhighlight kotlin %}
launch안의 코드를 별개의 함수로 분리해봅시다. 일반적인 함수와 다르게 `suspend` modifier가 붙은 것을 확인할 수 있습니다. 이를 **suspending function**이라 부릅니다. suspending function의 특징은 다른 suspending functions함수(`delay`)를 사용할 수 있습니다.   

<br>

## Scope builder
runBlocking 말고도 다른 coroutineScope builder를 통해 `coroutine scope`를 제공할 수 있습니다. 이러한 coroutineScope builder는 실행된 자식(children)이 완료될 때까지 종료되지 않습니다.   

`runBlocking`과 `coroutineScope`는 서로 자식 코루틴이 종료될 때까지 기다린다는 점에서 유사합니다. 차이점은 `runBlocking`은 종료될 때까지 현재 thread를 멈추게(block)하는 반면 `coroutineScope`는 단순히 중단(suspend)하며 block하진 않습니다.   

모든 `suspending function`에서 `coroutineScope`를 사용할 수 있습니다.   

<br>

## Scope builder and concurrency
여러 개의 동시 작업을 위해 `coroutineScope builder`를 `suspending function`에 사용할 수 있습니다.

{% highlight kotlin %}
// Sequentially executes doWorld followed by "Done"
fun main() = runBlocking {
    doWorld()
    println("Done")
}

// Concurrently executes both sections
suspend fun doWorld() = coroutineScope { // this: CoroutineScope
    launch {
        delay(2000L)
        println("World 2")
    }
    launch {
        delay(1000L)
        println("World 1")
    }
    println("Hello")
}
{% endhighlight %}
    Hello
    World 1
    World 2
    Done
<br>

launch 블록 안에 있는 코드는 동시에 실행됩니다.   

<br>


## An explicit job
`launch` coroutine builder는 `Job` 객체를 리턴합니다.
`Job`객체는 실행된 coroutine을 다룰 수 있으며 coroutine의 종료를 기다릴 수 있습니다.

{% highlight kotlin %}
val job = launch { // launch a new coroutine and keep a reference to its Job
    delay(1000L)
    println("World!")
}
println("Hello")
job.join() // wait until child coroutine completes
println("Done")
{% endhighlight %}
    Hello
    World!
    Done

<br>

## Coroutines are light-weight
코루틴은 JVM threads보다 자원을 덜 사용합니다. 스레드를 사용하면 메모리 부족이 생기는 코드는 코루틴에서는 사용할 수 있습니다.   
다음 코드는 100000개의 코루틴을 실행하지만 메모리를 거의 사용하지 않습니다.
{% highlight kotlin %}
import kotlinx.coroutines.*

fun main() = runBlocking {
    repeat(100_000) { // launch a lot of coroutines
        launch {
            delay(5000L)
            print(".")
        }
    }
}
{% endhighlight %}
   
위 코드를 threads를 사용한다면 out-of-memory error가 발생합니다.















