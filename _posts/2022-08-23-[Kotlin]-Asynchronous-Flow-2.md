---
title:  "[Kotlin] Asynchronous Flow - 2"
excerpt: "Asynchronous Flow - 2"

categories:
  - Kotlin
tags:
  - [코루틴]

permalink: /kotlin/Asynchronous-Flow-2/

toc: true
toc_sticky: true

date: 2022-08-24
last_modified_at: 2022-08-24
---
> 코루틴 공식 문서를 번역하고 내용을 조금 변경하거나 내용을 추가한 게시글입니다. 잘못된 번역이 있을 수 있습니다.
> [참고한 공식 문서 바로가기](https://kotlinlang.org/docs/flow.html)

<br>

## Buffering
flow의 다른 부분을 다른 코루틴에서 실행하는 것은 flow를 collection하는데 걸리는 전체 시간의 관점에서 도움이 될 수 있습니다. 특히 long-running 비동기 연산이 수반되는 경우에요. 예를 들어 `simple` flow emission이 각각의 element를 생산하는데 100ms가, collector에서 element를 처리하는데 300ms가 걸린 경우를 생각해봅시다. 
```kotlin
fun simple(): Flow<Int> = flow {
    for (i in 1..3) {
        delay(100) // pretend we are asynchronously waiting 100 ms
        emit(i) // emit next value
    }
}

fun main() = runBlocking<Unit> { 
    val time = measureTimeMillis {
        simple().collect { value -> 
            delay(300) // pretend we are processing it for 300 ms
            println(value) 
        } 
    }   
    println("Collected in $time ms")
}
```
    1
    2
    3
    Collected in 1220 ms

flow에 buffer 연산자를 사용하여 간단한 flow emitting 코드를 collecting 코드와 동시에 실행할 수 있습니다.
```kotlin
val time = measureTimeMillis {
    simple()
        .buffer() // buffer emissions, don't wait
        .collect { value -> 
            delay(300) // pretend we are processing it for 300 ms
            println(value) 
        } 
}   
println("Collected in $time ms")
```
    1
    2
    3
    Collected in 1071 ms

<br>

### Conflation
flow가 부분적인 연산 결과 또는 연산 상태 업데이트를 나타낸다면 각각의 값을 처리할 필요가 없고 가장 최근의 값만 처리할 수 있습니다. collector가 값들을 처리하는데 너무 오랜 시간이 걸릴 경우 conflate 연산자를 중간 값들을 건너뛰기 위해 사용할 수 있습니다.    
(이전 예제 코드 참고)
```kotlin
val time = measureTimeMillis {
    simple()
        .conflate() // conflate emissions, don't process each one
        .collect { value -> 
            delay(300) // pretend we are processing it for 300 ms
            println(value) 
        } 
}   
println("Collected in $time ms")
```
숫자 1이 처리되는 동안 2, 3은 이미 생산되었음을 알 수 있습니다. 그래서 2는 융합(conflated)되었고 가장 최근의 것(3)만이 collector에게 전달됩니다.

<br>

### Processing the latest value
Conflation은 collector과 emitter 둘 다 느릴 때 프로세싱 속도를 높이는 방법입니다. emitted된 값을 버리면서 작동합니다. 다른 방법은 새로운 값이 emitted될 때마다 느린 collector를 취소하고 재시작하는 것입니다.  `xxx`연산자의 필수 로직을 수행하지만 새로운 값이 있을 때 코드를 취소하는 `xxxLatest` 연산자의 가족이 있습니다. 이전 예제에서 conflate를 collectLatest로 바꿔봅시다.
```kotlin
val time = measureTimeMillis {
    simple()
        .collectLatest { value -> // cancel & restart on the latest value
            println("Collecting $value") 
            delay(300) // pretend we are processing it for 300 ms
            println("Done $value") 
        } 
}   
println("Collected in $time ms")
```
collectLatest 바디가 300ms 걸리고, 새로운 값은 100ms마다 도착하기 때문에 매 값마다 block이 수행되지만 오직 마지막 값만 complete됨을 확인할 수 있습니다.


    Collecting 1
    Collecting 2
    Collecting 3
    Done 3
    Collected in 741 ms

<br>

## Composing multiple flows
여러개의 flow를 합치는 많은 방법이 있습니다.

<br>

### Zip
Sequence.zip 확장 함수 처럼, flows는 두 개의 flow를 합치는 zip 연산자를 가지고 있습니다.
```kotlin
val nums = (1..3).asFlow() // numbers 1..3
val strs = flowOf("one", "two", "three") // strings 
nums.zip(strs) { a, b -> "$a -> $b" } // compose a single string
    .collect { println(it) } // collect and print
```

    1 -> one
    2 -> two
    3 -> three


<br>

### Combine
flow가 가장 최근의 변수 또는 작업의 값을 나타낼 때(conflation 섹션에서 보았듯이), 해당하는 flows의 가장 최근 값에 의존하는 계산을 수행하고 upstream flows가 값을 emit할 때마다 재계산할 필요가 있습니다. 이러한 연산자를 combine이라 합니다.

<br>

예를 들어, 이전 예제의 숫자들이 300ms 마다 갱신되지만 문자열은 400ms마다 갱신된다면 zip 연산자를 사용하여 이들을 zipping하는 것은 같은 결과를 출력합니다. 비록 400ms 마다 출력하지만요.
```kotlin
val nums = (1..3).asFlow().onEach { delay(300) } // numbers 1..3 every 300 ms
val strs = flowOf("one", "two", "three").onEach { delay(400) } // strings every 400 ms
val startTime = System.currentTimeMillis() // remember the start time 
nums.zip(strs) { a, b -> "$a -> $b" } // compose a single string with "zip"
    .collect { value -> // collect and print 
        println("$value at ${System.currentTimeMillis() - startTime} ms from start") 
    } 
```

<br>

하지만 combine 연산자를 zip 대신 사용하면
```kotlin
val nums = (1..3).asFlow().onEach { delay(300) } // numbers 1..3 every 300 ms
val strs = flowOf("one", "two", "three").onEach { delay(400) } // strings every 400 ms          
val startTime = System.currentTimeMillis() // remember the start time 
nums.combine(strs) { a, b -> "$a -> $b" } // compose a single string with "combine"
    .collect { value -> // collect and print 
        println("$value at ${System.currentTimeMillis() - startTime} ms from start") 
    } 
```
   
꽤 다른 결과를 얻을 수 있습니다. `nums` 또는 `strs` flow의 emission 마다 줄이 출력됩니다.
    1 -> one at 452 ms from start
    2 -> one at 651 ms from start
    2 -> two at 854 ms from start
    3 -> two at 952 ms from start
    3 -> three at 1256 ms from start
  
<br>

## Flattening flows
Flow는 비동기적으로 수신된 값의 sequence를 나타냅니다. 그래서 각각의 값들이 다른 값의 sequence에 대한 request를 trigger하는 상황을 얻기 쉽습니다. 예를 들어, 다음 함수는 두 개의 문자열을 500ms 간격으로 emit하는 flow를 반환합니다.
```kotlin
fun requestFlow(i: Int): Flow<String> = flow {
    emit("$i: First")
    delay(500) // wait 500 ms
    emit("$i: Second")
}
```
3개의 정수를 가지는 flow가 있고 매번 `requestFlow`를 호출합니다.
```kotlin
(1..3).asFlow().map { requestFlow(it) }
```
그러면 이후의 프로세싱을 위해 단일 flow로 *flattened(합쳐진)*될 필요가 있는 flow 의 flow(`Flow<Flow<String>>`)로 마치게 됩니다. Collections와 sequences는 이를 위한 flatten과 flatMap 연산자가 있습니다. 그러나 flow의 비동기적인 본질 때문에 그들은 flattening의 다른 모드를 필요로 합니다. flow의 flattening 연산자 family가 존재합니다.

<br>

### flatMapConcat
연결(Concatenating) 모드는 flatMapConcat와 flattenConcat 연산자에 의해 구현됩니다. 이것들은 sequence 연산자의 가장 직접적인 유사점입니다. 다음 flow가 collect를 시작하기 전에 내부 flow가 종료될 때까지 기다립니다.
```kotlin
fun requestFlow(i: Int): Flow<String> = flow {
    emit("$i: First") 
    delay(500) // wait 500 ms
    emit("$i: Second")    
}

fun main() = runBlocking<Unit> { 
    val startTime = System.currentTimeMillis() // remember the start time 
    (1..3).asFlow().onEach { delay(100) } // a number every 100 ms 
        .flatMapConcat { requestFlow(it) }                                                                           
        .collect { value -> // collect and print 
            println("$value at ${System.currentTimeMillis() - startTime} ms from start") 
        } 
}
```
    1: First at 121 ms from start
    1: Second at 622 ms from start
    2: First at 727 ms from start
    2: Second at 1227 ms from start
    3: First at 1328 ms from start
    3: Second at 1829 ms from start

<br>

### flatMapMerge
다른 flattening 모드는 모든 다가오는 flow를 동시에 collect하고 값을 단일 flow로 합칩니다. 그래서 값들은 가능한 빠르게 emit됩니다. flatMapMerge와 flattenMerge 연산자에 의해 구현됩니다. 전부 동시에 발생하는 flow의 수를 제한하는 `concurrency` 파라미터를 사용할 수 있습니다. (DEFAULT_CONCURRENCY와 기본적으로 동일합니다.)
```kotlin
val startTime = System.currentTimeMillis() // remember the start time 
(1..3).asFlow().onEach { delay(100) } // a number every 100 ms 
    .flatMapMerge { requestFlow(it) }                                                                           
    .collect { value -> // collect and print 
        println("$value at ${System.currentTimeMillis() - startTime} ms from start") 
    } 
```
    1: First at 136 ms from start
    2: First at 231 ms from start
    3: First at 333 ms from start
    1: Second at 639 ms from start
    2: Second at 732 ms from start
    3: Second at 833 ms from start

<br>

### flatMapLatest
collectLatest 연산자와 유사합니다. 새 flow가 emit되는 즉시 이전 flow의 collection이 취소되는 해당 "최신" flattening 모드가 있습니다.
```kotlin
val startTime = System.currentTimeMillis() // remember the start time 
(1..3).asFlow().onEach { delay(100) } // a number every 100 ms 
    .flatMapLatest { requestFlow(it) }                                                                           
    .collect { value -> // collect and print 
        println("$value at ${System.currentTimeMillis() - startTime} ms from start") 
    } 
```
    1: First at 142 ms from start
    2: First at 322 ms from start
    3: First at 425 ms from start
    3: Second at 931 ms from start

<br>

## Flow exceptions
Flow collection는 연산자 내부의 emitter 또는 code가 exception을 발생시켰을 때, 예외와 함께 완료될 수 있습니다.

<br>

### Collector try and catch
collector는 exception을 다루기위해 코틀린의 `try/catch` block을 사용할 수 있습니다.
```kotlin
fun simple(): Flow<Int> = flow {
    for (i in 1..3) {
        println("Emitting $i")
        emit(i) // emit next value
    }
}

fun main() = runBlocking<Unit> {
    try {
        simple().collect { value ->         
            println(value)
            check(value <= 1) { "Collected $value" }
        }
    } catch (e: Throwable) {
        println("Caught $e")
    } 
}    
```
이 코드는 collect 마지막 연산자에서 성공적으로 exception을 catch합니다. 또한 그 이후에 값이 emit되지 않음을 알 수 있습니다.
    Emitting 1
    1
    Emitting 2
    2
    Caught java.lang.IllegalStateException: Collected 2
  
<br>

### Everything is caught
이전 예제는 emitter 또는 어떤 intermediate 또는 terminal 연산자에서 발생한 어느 exception을 catch했습니다. 예를 들어, emit된 값들을 strings로 mapped하는 코드로 바꿔봅시다. 추가로 exception도 발생하게끔 만듭니다.
```kotlin
fun simple(): Flow<String> = 
    flow {
        for (i in 1..3) {
            println("Emitting $i")
            emit(i) // emit next value
        }
    }
    .map { value ->
        check(value <= 1) { "Crashed on $value" }                 
        "string $value"
    }

fun main() = runBlocking<Unit> {
    try {
        simple().collect { value -> println(value) }
    } catch (e: Throwable) {
        println("Caught $e")
    } 
} 
```
여전히 exception은 catch되고 collection는 중지됩니다.
    Emitting 1
    string 1
    Emitting 2
    Caught java.lang.IllegalStateException: Crashed on 2
  
<br>

## Exception transparency
emitter 코드가 예외 처리 동작을 어떻게 캡슐화할 수 있을 까요?

<br>

Flow는 반드시 *transparent to exceptions* 해야하고 `try/catch` 블록 내부에서 `flow {...}` 빌더 안에서 값을 emit하는 것은 exception transparency 위반입니다. 이렇게 하면 이전 예시와 같이 예외를 던지는 collector가 항상 `try/catch`를 사용하여 exception을 catch할 수 있습니다.

<br>

emitter는 catch 연산자를 사용할 수 있습니다. catch 연산자는 exception transparency를 예방하고 예외 처리 캡슐화를 허용합니다. `catch` 연산자의 body는 예외를 분석할 수 있고 어떤 exception이 catch되었는지에 따라 여러 방식으로 반응할 수 있습니다. 
* Exception은 `throw`를 사용하여 재발생될 수 있다.
* catch 바디로부터 emit을 사용하여 Exception은 값의 emission으로 바뀔 수 있습니다.
* Exception은 다른 코드에 의해 무시되고, 기록되고, 처리될 수 있습니다.

<br>

예를 들어, Exception을 catch하는 대로 텍스트를 emit해봅시다.
```kotlin
simple()
    .catch { e -> emit("Caught $e") } // emit on exception
    .collect { value -> println(value) }
```
`try/catch`로 코드를 감싸지 않았음에도 결과는 같습니다.

<br>

### Transparent catch
catch 중간 연산자는 오직 upstream exceptions를 catch 합니다.
```kotlin
fun simple(): Flow<Int> = flow {
    for (i in 1..3) {
        println("Emitting $i")
        emit(i)
    }
}

fun main() = runBlocking<Unit> {
    simple()
        .catch { e -> println("Caught $e") } // does not catch downstream exceptions
        .collect { value ->
            check(value <= 1) { "Collected $value" }                 
            println(value) 
        }
}   
```
`catch` 연산자가 있음에도 불구하고 "Caught ..." 메세지가 출력되지 않습니다.
      Emitting 1
      1
      Emitting 2
      Exception in thread "main" java.lang.IllegalStateException: Collected 2 at ...

<br>

### Catching declaratively
catch 연산자의 선언적 성격을 모든 exception을 처리하려는 욕구와 합칠 수 있습니다. collect 연산자의 바디를 onEach로 옮기고 catch 연산자 이전에 놓기만 하면 됩니다. 이 flow Collection은 파라미터 없이 collect를 호출함으로써 수행됩니다.
```kotlin
simple()
    .onEach { value ->
        check(value <= 1) { "Collected $value" }                 
        println(value) 
    }
    .catch { e -> println("Caught $e") }
    .collect()
```
이제 "Caught ..." 메세지 출력을 확인할 수 있고 `try/catch` 블록을 사용하지 않고 모든 exception을 처리할 수 있습니다.
    Emitting 1
    1
    Emitting 2
    Caught java.lang.IllegalStateException: Collected 2

<br>

## Flow completion
flow collection이 끝났을 때, action을 실행하고 싶을 수 있습니다. 반드시(imperative) 또는 선언적(declarative)으로 이 일을 수행할 수 있습니다.

<br>

### Imperative finally block
`try/catch`에 더하여 collector는 `collection`이 완료되었을 때 action을 수행하기 위해 `finally` 블록도 사용할 수 있습니다. 
```kotlin
fun simple(): Flow<Int> = (1..3).asFlow()

fun main() = runBlocking<Unit> {
    try {
        simple().collect { value -> println(value) }
    } finally {
        println("Done")
    }
}      
```
    1
    2
    3
    Done

<br>

### Declarative handling
onCompletion 중간 연산자는 flow가 완전히 collect되었을 때 실행됩니다.
```kotlin
simple()
    .onCompletion { println("Done") }
    .collect { value -> println(value) }
```
onCompletion의 주요 장점은 람다의 nullable `Throwable` 매개변수입니다. 이는 flow collection이 정상적으로 완료되었는지 예외적으로 완료되었는지 여부를 확인하는 데 사용할 수 있습니다.
```kotlin
fun simple(): Flow<Int> = flow {
    emit(1)
    throw RuntimeException()
}

fun main() = runBlocking<Unit> {
    simple()
        .onCompletion { cause -> if (cause != null) println("Flow completed exceptionally") }
        .catch { cause -> println("Caught exception") }
        .collect { value -> println(value) }
}  
```
    1
    Flow completed exceptionally
    Caught exception

onCompletion 연산자는 catch와 다르게 exception을 처리하지 않습니다. 위 예제에서 알 수 있듯, 예외는 여전히 downstream으로 flow됩니다. 이것은 이후의 `onCompletion` 연산자로 전달되고 `catch` 연산자를 통해 처리될 수 있습니다.

<br>

### Successful completion
catch 연산자와의 또 다른 점은 onCompletion은 모든 exception을 확인할 수 있고 오로지 upstream flow가 성공적으로 완료되었을 때 `null` excetion을 수신할 수 있습니다. 
```kotlin
fun simple(): Flow<Int> = (1..3).asFlow()

fun main() = runBlocking<Unit> {
    simple()
        .onCompletion { cause -> println("Flow completed with $cause") }
        .collect { value ->
            check(value <= 1) { "Collected $value" }                 
            println(value) 
        }
}
```
completion cause가 null이 아님을 확인할 수 있습니다. flow는 downstream exception에 의해 종료되었기 때문입니다.
    1
    Flow completed with java.lang.IllegalStateException: Collected 2
    Exception in thread "main" java.lang.IllegalStateException: Collected 2

<br>

## Imperative versus declarative
imperative한 방식과 declarative한 방식 중 어느 방식이 더 선호되고 그 이유는 무엇일까요? 특정 방식을 옹호하지 말고 두 개의 선택지 모두 유효하다고 믿어야합니다. 그리고 여러분의 선호와 코드 스타일에 따라 선택해야합니다.

<br>

## Launching flow
flow를 사용하여 일부 소스에서 발생하는 비동기 이벤트를 쉽게 나타낼 수 있습니다. 이 경우에 들어오는 이벤트에 대한 반응과 코드 조각을 등록하고 추가 작업을 계속하는 `addEventListener` 함수의 아날로그가 필요합니다.   
onEach 연산자는 이 역할을 수행합니다. 그러나 `onEach`는 중간 연산자입니다. flow를 collect하기 위해 terminal 연산자가 필요합니다. 그렇지 않으면 `onEach`를 호출하는 것은 아무런 효과가 없습니다.

<br>

collect terminal 연산자를 `onEach` 뒤에 사용한다면 다음 코드는 flow가 collect될 때까지 기다립니다.
    Event: 1
    Event: 2
    Event: 3
    Done

launchIn terminal 연산자는 여기서 쓸모가 있습니다. `collect`를 `launchIn`으로 바꿈으로써 별개의 코루틴에서 flow collection을 시작할 수 있습니다. 따라서 추가 코드의 실행은 즉시 계속됩니다.
```kotlin
fun main() = runBlocking<Unit> {
    events()
        .onEach { event -> println("Event: $event") }
        .launchIn(this) // <--- Launching the flow in a separate coroutine
    println("Done")
}   
```
    Done
    Event: 1
    Event: 2
    Event: 3
`launchIn`에 요구되는 파라미터는 반드시 flow를 collect할 코루틴이 실행되는 CoroutineScope를 구체화해야합니다. 위 예제에서 이러한 범위는 runBlocking 코루틴 빌더 출신입니다. 그래서 flow가 실행되는 동안 이 runBlocking 범위는 자식 코루틴을 기다리고 main 함수가 이 예제를 반환하거나 종료하지 못하게 합니다.

<br>

실제 어플리케이션에서 scope는 lifetime이 제한된 엔티티에서 나옵니다. entity의 lifetime이 종료되자마자 해당 scope는 최소되어 해당 flow의 collection이 취소됩니다. 이렇게하면 `onEach { ... }.launchIn(scope)` 쌍이 `addEventListener`처럼 작동합니다. 그러나 removeEventListener 함수는 필요하지 않습니다. 취소 및 구조화된 동시성이 이러한 목적을 제공하기 때문입니다.

<br>

launchIn 또한 job을 반환합니다. 

<br>

### Flow cancellation checks
각각의 emit된 값 마다 flow 빌더는 추가적은 ensureActive check를 수행합니다. 이는 `flow { ... }`에서 발생하는 반복 emitting이 취소될 수 있음을 의미합니다.
```kotlin
fun foo(): Flow<Int> = flow { 
    for (i in 1..5) {
        println("Emitting $i") 
        emit(i) 
    }
}

fun main() = runBlocking<Unit> {
    foo().collect { value -> 
        if (value == 3) cancel()  
        println(value)
    } 
}
```
    Emitting 1
    1
    Emitting 2
    2
    Emitting 3
    3
    Emitting 4
    Exception in thread "main" kotlinx.coroutines.JobCancellationException: BlockingCoroutine was cancelled; job="coroutine#1":BlockingCoroutine{Cancelled}@6d7b4f4c
그러나 대부분의 다른 flow 연산자들은 성능상의 이유로 스스로 추가적인 cancellation check를 하지 않습니다. 예를 들어, IntRange.asFlow 확장 함수를 사용하고 아무 곳에서도 suspend하지 않으면 cancellation check는 없습니다.
```kotlin
fun main() = runBlocking<Unit> {
    (1..5).asFlow().collect { value -> 
        if (value == 3) cancel()  
        println(value)
    } 
}
```
    1
    2
    3
    4
    5
    Exception in thread "main" kotlinx.coroutines.JobCancellationException: BlockingCoroutine was cancelled; job="coroutine#1":BlockingCoroutine{Cancelled}@3327bd23

### Making busy flow cancellable
이러한 경우 `.onEach { currentCoroutineContext().ensureActive() }`를 추가하면 되지만 이미 cancellable 연산자가 제공됩니다.
```kotlin
fun main() = runBlocking<Unit> {
    (1..5).asFlow().cancellable().collect { value -> 
        if (value == 3) cancel()  
        println(value)
    } 
}
```
    1
    2
    3
    Exception in thread "main" kotlinx.coroutines.JobCancellationException: BlockingCoroutine was cancelled; job="coroutine#1":BlockingCoroutine{Cancelled}@5ec0a365

<br>

## Flow and Reactive Streams
Reactive Streams이나 RxJava 및 Reactor 프로젝트와 같은 Reactive 프레임워크에 익숙한 사람들에게는 flow 설계가 매우 익숙해 보일 수 있습니다.

<br>

실제로, flow 디자인은 Reactive Stream과 Reactive Stream 다양한 구현에서 영감을 받았습니다. 그러나 Flow의 주요 목표는 가능한 한 간단한 설계를 하고, 코틀린과 서스펜션을 친화적으로 만들고, 구조화된 동시성을 존중하는 것입니다. 이 목표를 달성하는 것은 반응적인 선구자들과 그들의 엄청난 노력 없이는 불가능할 것입니다. Reactive Stream과 코틀린 Flow 기사에서 전체 스토리를 읽을 수 있습니다.

<br>

개념적으로는 다르지만 Flow는 reactive stream이며 반응형(스펙 및 TCK 호환) 게시자로 변환할 수 있으며 그 반대도 가능합니다. 이러한 converters는 즉시 사용할 수 있는 `kotlinx.coroutine`에 의해 제공되며, 해당 reactive 모듈(반응성 스트림의 경우 `kotlinx-coroutine-reactive`, 프로젝트 반응기의 경우 `kotlinx-coroutine-reactor`, RxJava2/RxJava3의 경우 `kotlinx-coroutine-routines-reactor`)에서 찾을 수 있습니다. 통합 모듈에는 흐름으로의 변환, 원자로 상황과의 통합 및 다양한 반응성 실체와 작업하는 서스펜션 친화적 방법이 포함됩니다.
