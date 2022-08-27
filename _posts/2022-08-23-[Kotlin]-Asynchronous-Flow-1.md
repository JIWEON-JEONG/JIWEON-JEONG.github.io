---
title:  "[Kotlin] Asynchronous Flow - 1"
excerpt: "Asynchronous Flow - 1"

categories:
  - Kotlin
tags:
  - [코루틴]

permalink: /kotlin/Asynchronous-Flow-1/

toc: true
toc_sticky: true

date: 2022-08-23
last_modified_at: 2022-08-23
---
> 코루틴 공식 문서를 번역하고 내용을 조금 변경하거나 내용을 추가한 게시글입니다. 잘못된 번역이 있을 수 있습니다.
> [참고한 공식 문서 바로가기](https://kotlinlang.org/docs/flow.html)

<br>

## Asynchronous Flow

suspending function은 비동기로 단일 값을 반환합니다. 다수의 계산된 값을 어떻게 반환할 수 있을까요? Kotlin Flows로 가능합니다.

<br>

## Representing multiple values
collections를 사용하여 코틀린에서 여러 값을 나타낼 수 있습니다. 예를 들어, 3개의 숫자를 가지고 있는 List를 반환하는 `simple` 함수를 forEach를 통해 출력할 수 있습니다.
```kotlin
fun simple(): List<Int> = listOf(1, 2, 3)
 
fun main() {
    simple().forEach { value -> println(value) } 
}
```
    1
    2
    3

<br>

### Sequences
CPU-consuming blocking code(각각의 계산에 100ms가 걸리는)에서 수를 계산하는 중이라면 `Sequence`를 사용하여 수를 나타낼 수 있습니다.
```kotlin
fun simple(): Sequence<Int> = sequence { // sequence builder
    for (i in 1..3) {
        Thread.sleep(100) // pretend we are computing it
        yield(i) // yield next value
    }
}

fun main() {
    simple().forEach { value -> println(value) } 
}
```
출력 결과는 같으나 각 출력마다 100ms가 걸립니다.

<br>

### Suspending functions
그러나 이런 computation blocks는 실행되는 동안에 메인 스레드를 block합니다. 이러한 값들을 비동기로 계산하기 위해서 `simple`함수를 suspend 함수로 변경할 수 있습니다. 그러면 blocking하지 않고 작업을 수행하고 값을 list로 반환합니다.
```kotlin
suspend fun simple(): List<Int> {
    delay(1000) // pretend we are doing something asynchronous here
    return listOf(1, 2, 3)
}

fun main() = runBlocking<Unit> {
    simple().forEach { value -> println(value) } 
}
```

<br>

### Flows
`List<Int>`를 result type로 하는 것은 모든 값은 한번에 반환하겠다는 것을 의미합니다. 값이 비동기로 계산되는 stream임을 나타내기 위해 `Flow<Int>` type을 사용할 수 있습니다. `Sequence<Int>` type을 동기적으로 계산되는 값을 사용했던 것 처럼요.
```kotlin
fun simple(): Flow<Int> = flow { // flow builder
    for (i in 1..3) {
        delay(100) // pretend we are doing something useful here
        emit(i) // emit next value
    }
}

fun main() = runBlocking<Unit> {
    // Launch a concurrent coroutine to check if the main thread is blocked
    launch {
        for (k in 1..3) {
            println("I'm not blocked $k")
            delay(100)
        }
    }
    // Collect the flow
    simple().collect { value -> println(value) } 
}
```
이러한 코드는 각 숫자를 출력하기 전에 메인 스레드를 blocking 하지 않고 100ms를 기다립니다. 이는 메인 스레드에서 실행되는 별개의 코루틴이 100ms 마다 "I'm not blocked"을 출력하는 것을 통해 확인할 수 있습니다.

     I'm not blocked 1
     1
     I'm not blocked 2
     2
     I'm not blocked 3
     3

전 예제의 Flow 코드에서 확인할 수 있는 차이점에 주목하세요.
* Flow type의 builder function은 flow입니다.
* `flow { ... }` builder block안의 코드는 suspend될 수 있습니다.
* `simple` 함수는 더 이상 `suspend` modifier가 표시되지 않습니다.
* 값들은 emit 함수를 통해 flow로부터 *emitted(방출)* 됩니다.
* 값들은 collect 함수를 통해 flow로부터 *collected(수집)* 됩니다.

<br>

## Flows are cold
Flow는 *cold* sequences와 유사한 스트림입니다. flow builder안의 코드는 flow가 수집되기(collected)전까지 실행되지 않습니다. 
```kotlin
fun simple(): Flow<Int> = flow { 
    println("Flow started")
    for (i in 1..3) {
        delay(100)
        emit(i)
    }
}

fun main() = runBlocking<Unit> {
    println("Calling simple function...")
    val flow = simple()
    println("Calling collect...")
    flow.collect { value -> println(value) } 
    println("Calling collect again...")
    flow.collect { value -> println(value) } 
}
```

    Calling simple function...
    Calling collect...
    Flow started
    1
    2
    3
    Calling collect again...
    Flow started
    1
    2
    3

주요 원인은 flow를 반환하는 `simple`함수가 suspend 함수가 아니기 때문입니다. 저절로, `simple()` 호출은 빠르게 반환하며 아무것도 기다리지 않습니다. flow는 수집될 때마다 시작합니다. `collect`를 다시 호출했을 때 "Flow started"를 볼 수 있는 이유입니다.

<br>

## Flow cancellation basics
Flow는 코루틴의 일반적인 협력적인 취소(cooperative cancellation)를 고수합니다. flow collection는 flow가 취소 가능한 suspending function(예) delay)에서 중단(suspend)되었을 때 취소될 수 있습니다. 다음 예제는 어떻게 flow가 withTimeoutOrNull 블록에서 실행 중일 때 timeout으로 취소되는 지 그리고 실행 중인 코드를 중단하는 지 보여줍니다.
```kotlin
fun simple(): Flow<Int> = flow { 
    for (i in 1..3) {
        delay(100)          
        println("Emitting $i")
        emit(i)
    }
}

fun main() = runBlocking<Unit> {
    withTimeoutOrNull(250) { // Timeout after 250ms 
        simple().collect { value -> println(value) } 
    }
    println("Done")
}
```
    Emitting 1
    1
    Emitting 2
    2
    Done

<br>

## Flow builders
`flow { ... }` builder는 가장 기본적인 builder입니다. flow를 쉽게 선언하기 위한 다른 builder가 존재합니다.

* [flowOf](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/flow-of.html) builder는 고정된 값의 집합을 방출(emit)하는 flow를 정의합니다. 
* 다양한 colletions과 sequences는 `.asFlow()` 확장 함수를 통해 flow로 전환될 수 있습니다.

<br>
1에서 3을 출력하는 flow를 다음과 같이 작성할 수 있습니다.
```kotlin
// Convert an integer range to a flow
(1..3).asFlow().collect { value -> println(value) }
```

<br>

## Intermediate flow operators
Flow는 연산자를 사용하여 전환될 수 있습니다. collections과 sequences로 했던 것처럼요. 중간 연산자는 upstream에 적용되며 downstream flow를 반환합니다. 이러한 연산자들은 flow처럼 cold입니다. 이러한 연산자를 호출하는 것은 suspending function이 아닙니다. 빠르게 작동하며 새로운 전환된 flow의 정의를 반환합니다. 

<br>

기본 연산자는 map과 filter같은 친숙한 이름을 갖고 있습니다. sequences와의 중요한 차이점은 이러한 연산자의 코드 블록 내부에서 suspending functions를 호출할 수 있다는 점입니다.

<br>

예를 들어, incoming requests의 flow는 map 연산자를 사용하여 결과를 mapped 할 수 있습니다. 심지어 request가 suspending function로 구현된 오랜 시간 수행되는 연산자이어도요.
```kotlin
suspend fun performRequest(request: Int): String {
    delay(1000) // imitate long-running asynchronous work
    return "response $request"
}

fun main() = runBlocking<Unit> {
    (1..3).asFlow() // a flow of requests
        .map { request -> performRequest(request) }
        .collect { response -> println(response) }
}
```
매 초마다 각 라인을 출력합니다.

    response 1
    response 2
    response 3

### Transform operator
flow transformation 연산자들 중에서 가장 일반적인 것은 transform입니다. map이나 filter같은 단순하거나 더 복잡한 transformations를 모방하기 위해 사용됩니다. `transform` 연산자를 사용함으로써 우리는 임의의 값을 임의의 횟수만큼 emit할 수 있습니다.

<br>

예를 들어, `transform`을 사용하면 long-running asynchronout request가 수행되기 전에 string을 emit할 수 있고 응답을 따라갈 수 있습니다.
```kotlin
suspend fun performRequest(request: Int): String {
    delay(1000) // imitate long-running asynchronous work
    return "response $request"
}

fun main() = runBlocking<Unit> {
    (1..3).asFlow() // a flow of requests
        .transform { request ->
            emit("Making request $request") 
            emit(performRequest(request)) 
        }
        .collect { response -> println(response) }
}
```

    Making request 1
    response 1
    Making request 2
    response 2
    Making request 3
    response 3

<br>

### Size-limiting operators
take와 같은 Size-limiting 중간 연산자는 해당 limit에 도달했을 때 flow의 실행을 취소합니다. 코루틴 취소는 항상 exception을 발생함으로써 수행됩니다. 그래서 모든 resource-management 함수(`try { ... } finally { ... }`)는 cancellation의 경우 일반적으로 작동합니다.
```kotlin
fun numbers(): Flow<Int> = flow {
    try {                          
        emit(1)
        emit(2) 
        println("This line will not execute")
        emit(3)    
    } finally {
        println("Finally in numbers")
    }
}

fun main() = runBlocking<Unit> {
    numbers() 
        .take(2) // take only the first two
        .collect { value -> println(value) }
}   
``` 
    1
    2
    Finally in numbers

<br>

## Terminal flow operators
flow의 Terminal 연산자는 flow의 collection을 시작하는 suspending function입니다. collect 연산자는 가장 기본적이지만 다른 쉽게 만들 수 있는 terminal 연산자들이 있습니다.
* toList와 toSet처럼 다양한 collections 전환
* 첫 번재 값을 가져오고 flow가 단일 값을 emit하는지 확인하기 위한 연산자
* reduce와 flow를 사용하여 값으로 flow를 reducing

```kotlin
val sum = (1..5).asFlow()
    .map { it * it } // squares of numbers from 1 to 5                           
    .reduce { a, b -> a + b } // sum them (terminal operator)
println(sum)
```
    55

<br>

## Flows are sequential
flow의 각각의 독립적인 collection은 여러개의 flow에서 작동하는 특별한 연산자가 아니라면 순서대로 실행됩니다. collection은 terminal 연산자를 호출한 코루틴 안에서 작동합니다. 기본적으로 새 코루틴이 시작되지 않습니다. 각각의 emitted된 값은 upstream에서 downstream으로 중간 연산자에 의해 처리됩니다. 그리고 마지막 연산자까지 전달됩니다.
```kotlin
(1..5).asFlow()
    .filter {
        println("Filter $it")
        it % 2 == 0              
    }              
    .map { 
        println("Map $it")
        "string $it"
    }.collect { 
        println("Collect $it")
    }  
```
    Filter 1
    Filter 2
    Map 2
    Collect string 2
    Filter 3
    Filter 4
    Map 4
    Collect string 4
    Filter 5

<br>

## Flow context
flow Collection은 항상 호출한 코루틴의 context안에서 발생합니다. 예를 들어 `simple` flow가 있습니다. 그러면 따라오는 코드는 해당 코드의 author에 의해 구체화된 context에서 실행됩니다. `simple` flow의 구현 세부 사항에 관계없이요.
```kotlin
withContext(context) {
    simple().collect { value ->
        println(value) // run in the specified context
    }
}
```
이 flow의 property를 *context preservation*라고 합니다.

<br>

그래서 `flow { ... }` 빌더 안의 코드는 해당 flow의 collector에 의해 제공된 context에서 작동합니다. 예를 들어 호출된 thread를 출력하고 세개의 수를 emit하는 `simple` 함수의 구현을 생각해보세요.
```kotlin
fun log(msg: String) = println("[${Thread.currentThread().name}] $msg")

fun simple(): Flow<Int> = flow {
    log("Started simple flow")
    for (i in 1..3) {
        emit(i)
    }
}  

fun main() = runBlocking<Unit> {
    simple().collect { value -> log("Collected $value") } 
}      
```

    [main @coroutine#1] Started simple flow
    [main @coroutine#1] Collected 1
    [main @coroutine#1] Collected 2
    [main @coroutine#1] Collected 3

`simple().collect`가 메인 스레드에서 호출되기 때문에, `simple` flow의 body 역시 메인 스레드에서 호출됩니다. 이것은 빠른 실행 또는 실행 context를 신경쓰지 않고 호출자를 block하지않는 비동기 코드를 위한 완벽한 기본값입니다. 

<br>

### Wrong emissiong withContext
그러나, long-running CPU-consuming 코드는 Dispatchers.Default context에서 실행될 필요가 있습니다. 그리고 UI-updating code는 Dispatchers.Main context에서 실행되야합니다. 일반적으로 withContext는 코루틴을 사용하는 코드의 context를 바꾸기위해 사용됩니다. 그러나 `flow { ... }` 빌더 안의 코드는 context 보존 프로퍼티를 준수해야하고 다른 context로부터 emit하는 것을 허용하지 않습니다.
```kotlin
fun simple(): Flow<Int> = flow {
    // The WRONG way to change context for CPU-consuming code in flow builder
    kotlinx.coroutines.withContext(Dispatchers.Default) {
        for (i in 1..3) {
            Thread.sleep(100) // pretend we are computing it in CPU-consuming way
            emit(i) // emit next value
        }
    }
}

fun main() = runBlocking<Unit> {
    simple().collect { value -> println(value) } 
} 
```
    Exception in thread "main" java.lang.IllegalStateException: Flow invariant is violated:
    		Flow was collected in [CoroutineId(1), "coroutine#1":BlockingCoroutine{Active}@5511c7f8, BlockingEventLoop@2eac3323],
    		but emission happened in [CoroutineId(1), "coroutine#1":DispatchedCoroutine{Active}@2dae0000, Dispatchers.Default].
    		Please refer to 'flow' documentation or use 'flowOn' instead
    	at ...

<br>

### flowOn operator
flowOn 함수를 통해 예외를 처리할 수 있습니다. flowOn은 flow emission의 context를 바꿉니다. flow의 context를 바꾸는 올바른 방법은 아래 예시에 나와있습니다. 
```kotlin
fun log(msg: String) = println("[${Thread.currentThread().name}] $msg")
           
fun simple(): Flow<Int> = flow {
    for (i in 1..3) {
        Thread.sleep(100) // pretend we are computing it in CPU-consuming way
        log("Emitting $i")
        emit(i) // emit next value
    }
}.flowOn(Dispatchers.Default) // RIGHT way to change context for CPU-consuming code in flow builder

fun main() = runBlocking<Unit> {
    simple().collect { value ->
        log("Collected $value") 
    } 
}     
```
    [DefaultDispatcher-worker-1 @coroutine#2] Emitting 1
    [main @coroutine#1] Collected 1
    [DefaultDispatcher-worker-1 @coroutine#2] Emitting 2
    [main @coroutine#1] Collected 2
    [DefaultDispatcher-worker-1 @coroutine#2] Emitting 3
    [main @coroutine#1] Collected 3

collection이 메인 스레드에서 작동함에도 불구하고 백그라운드 스레드에서 `flow { ... }`가 어떻게 작동하는지 주목하세요.

<br>

여기서 추가로 알 수 있는 점은 flowOn 연산자는 flow의 기본적인 순차 섭리를 바꿨다는 것입니다. 이제 collcetion는 하나의 코루틴("coroutine#1")에서 발생하고 emission은 다른 코루틴("coroutine#2")에서 발생합니다. #coroutine#2 코루틴은 collecting 코루틴과 동시에 다른 스레드에서 실행됩니다. flowOn 연산자는 CoroutineDispatcher를 문맥 안에서 바꿔야할 때 upstream flow를 위한 다른 코루틴을 만듭니다.