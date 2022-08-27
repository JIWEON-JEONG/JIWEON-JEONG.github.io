---
title:  "[Kotlin] Cancellation and timeouts"
excerpt: "Cancellation and timeouts"

categories:
  - Kotlin
tags:
  - [코루틴]

permalink: /kotlin/Cancellation-and-timeouts/

toc: true
toc_sticky: true

date: 2022-08-08
last_modified_at: 2022-08-08
---
> 코루틴 공식 문서를 번역하고 내용을 조금 변경하거나 내용을 추가한 게시글입니다. 잘못된 번역이 있을 수 있습니다.
> [참고한 공식 문서 바로가기](https://kotlinlang.org/docs/cancellation-and-timeouts.html)

<br>

## Cancelling coroutine execution
오랜 기간 실행되는 어플리케이션의 경우 백그라운드 코루틴의 미세한 컨트롤이  필요할 수 있습니다. 예를 들어 코루틴이 실행된 페이지가 닫히면 해당 코루틴의 결과를 구할 필요가 없으며 작업이 취소될 수 있습니다. **launch** 함수는 실행중인 코루틴을 취소할 수 있는 **Job**을 반환합니다.   
{% highlight kotlin %}
val job = launch {
    repeat(1000) { i ->
        println("job: I'm sleeping $i ...")
        delay(500L)
    }
}
delay(1300L) // delay a bit
println("main: I'm tired of waiting!")
job.cancel() // cancels the job
job.join() // waits for job's completion 
println("main: Now I can quit.")
{% endhighlight kotlin %}   

    job: I'm sleeping 0 ...
    job: I'm sleeping 1 ...
    job: I'm sleeping 2 ...
    main: I'm tired of waiting!
    main: Now I can quit.
   

**job.cancel**이 실행되자마자 코루틴 출력이 중지됩니다. **Job**의 확장 함수인 **cancelAndJoin**은 **cancel**과 **join**를 실행합니다.

<br>

## Cancellation is cooperative
코루틴 취소는 협조적입니다. 코루틴 코드는 취소를 위해 협조적이어야 합니다. 모든 **kotlinx.coroutines**의 **suspending functions**는 취소 가능합니다. suspending functions는 코루틴의 취소를 확인하며 취소되었을 때 CancellationException을 throw합니다. 그러나 코루틴이 계산(computation) 작업 중이며 취소 여부를 확인하지 않는 경우 코루틴은 취소될 수 없습니다.
{% highlight kotlin %}
fun main() = runBlocking {
    val startTime = System.currentTimeMillis()
    val job = launch(Dispatchers.Default) {
        var nextPrintTime = startTime
        var i = 0
        while (i < 5) { // computation loop, just wastes CPU
            // print a message twice a second
            if (System.currentTimeMillis() >= nextPrintTime) {
                println("job: I'm sleeping ${i++} ...")
                nextPrintTime += 500L
            }
        }
    }
    delay(1300L) // delay a bit
    println("main: I'm tired of waiting!")
    job.cancelAndJoin() // cancels the job and waits for its completion
    println("main: Now I can quit.")    
}
{% endhighlight kotlin %}

    job: I'm sleeping 0 ...
    job: I'm sleeping 1 ...
    job: I'm sleeping 2 ...
    main: I'm tired of waiting!
    job: I'm sleeping 3 ...
    job: I'm sleeping 4 ...
    main: Now I can quit.

실행결과를 보면 취소된 이후에도 코루틴이 계속 실행되는 것을 볼 수 있습니다.   

<br>

## Making computation code cancellable
계산(compuation) 코드를 취소할 수 있는 방법은 2가지가 있습니다. 그 중 하나는 주기적으로 취소를 확인하는 suspending function을 실행하는 것입니다. **yield** 함수가 적합합니다. 다른 방법은 명시적으로 취소 상태를 확인하는 것입니다.   

<br>

**while(i < 5)**를 **while(isActive)**로 바꿔봅시다.
{% highlight kotlin %}
val startTime = System.currentTimeMillis()
val job = launch(Dispatchers.Default) {
    var nextPrintTime = startTime
    var i = 0
    while (isActive) { // cancellable computation loop
        // print a message twice a second
        if (System.currentTimeMillis() >= nextPrintTime) {
            println("job: I'm sleeping ${i++} ...")
            nextPrintTime += 500L
        }
    }
}
delay(1300L) // delay a bit
println("main: I'm tired of waiting!")
job.cancelAndJoin() // cancels the job and waits for its completion
println("main: Now I can quit.")
{% endhighlight kotlin %}
    job: I'm sleeping 0 ...
    job: I'm sleeping 1 ...
    job: I'm sleeping 2 ...
    main: I'm tired of waiting!
    main: Now I can quit.

loop작업은 취소되었습니다. **isActive**는 CoroutineScope 개체를 통해 Coroutine 내에서 사용할 수 있는 확장 속성입니다.   

<br>

## Closing resources with finally
취소가능한 suspending functions는 CancellationException을 발생시킵니다. 예를 들어 **try {...} finally {...}** 표현식과 코틀린의 **use**함수는 코루틴이 취소되었을 때 finalization actions를 실행합니다.

{% highlight kotlin %}
val job = launch {
    try {
        repeat(1000) { i ->
            println("job: I'm sleeping $i ...")
            delay(500L)
        }
    } finally {
        println("job: I'm running finally")
    }
}
delay(1300L) // delay a bit
println("main: I'm tired of waiting!")
job.cancelAndJoin() // cancels the job and waits for its completion
println("main: Now I can quit.")
{% endhighlight kotlin %}

**join**과 **cancelAndJoin**은 finalization actions가 완료될 때까지 기다립니다. 따라서 위 코드의 출력은 다음과 같습니다.

    job: I'm sleeping 0 ...
    job: I'm sleeping 1 ...
    job: I'm sleeping 2 ...
    main: I'm tired of waiting!
    job: I'm running finally
    main: Now I can quit.

<br>

## Run non-cancellable block
이전 예제의 finally 블록에서 suspending function을 사용하려하면 이미 코루틴이 취소되었기 때문에 CancellationException이 발생합니다. 모든 closing operations (file 닫기, job 취소 등)은 보통 중단 가능하지 않으며 어떤 suspending functions를 포함하지 않기 때문에 이러한 상황은 보통 문제 되지 않습니다. 하지만 취소된 코루틴안에서 suspend하고 싶을 때 해당 코드를 **withContext(NonCancellable) {}**로 감싸면 됩니다. 

{% highlight kotlin %}
val job = launch {
    try {
        repeat(1000) { i ->
            println("job: I'm sleeping $i ...")
            delay(500L)
        }
    } finally {
        withContext(NonCancellable) {
            println("job: I'm running finally")
            delay(1000L)
            println("job: And I've just delayed for 1 sec because I'm non-cancellable")
        }
    }
}
delay(1300L) // delay a bit
println("main: I'm tired of waiting!")
job.cancelAndJoin() // cancels the job and waits for its completion
println("main: Now I can quit.")
{% endhighlight kotlin %}

    job: I'm sleeping 0 ...
    job: I'm sleeping 1 ...
    job: I'm sleeping 2 ...
    main: I'm tired of waiting!
    job: I'm running finally
    job: And I've just delayed for 1 sec because I'm non-cancellable
    main: Now I can quit.

<br>

## Timeout
코루틴 실행을 취소해야하는 가장 명백한 이유는 코루틴 실행 시간이 시간 제한을 초과했기 때문입니다. Timeout 함수를 쓰면 이를 해결할 수 있습니다.
{% highlight kotlin %}
withTimeout(1300L) {
    repeat(1000) { i ->
        println("I'm sleeping $i ...")
        delay(500L)
    }
}
{% endhighlight kotlin %}
    I'm sleeping 0 ...
    I'm sleeping 1 ...
    I'm sleeping 2 ...
    Exception in thread "main" kotlinx.coroutines.TimeoutCancellationException: Timed out waiting for 1300 ms

withTimeout은 **TimeoutCancellationException**을 발생시키며 CancellationException의 하위 클래스입니다. 이전에 콘솔에 stack trace가 출력되는 모습을 볼 수 없습니다. 그 이유는 취소된 코루틴 CancellationException이 코루틴이 완료된 보통의 이유로 간주되기 때문입니다. 그러나 예제에서 **withTimeout**을 **main**함수 바로 안에 넣었습니다.   


cancellation은 단순히 exception이기 때문에 모든 resources는 보통 방법으로 닫힙니다. 시간 초과 시 추가 action을 하고 싶다면 코드를 **try {...} catch (e: TimeoutCancellationException) {...}**로 감싸거나 시간 초과 시 exception 대신 null을 반환하는 **withTimeoutOrNull** 함수를 사용하면 됩니다.

{% highlight kotlin %}
val result = withTimeoutOrNull(1300L) {
    repeat(1000) { i ->
        println("I'm sleeping $i ...")
        delay(500L)
    }
    "Done" // will get cancelled before it produces this result
}
println("Result is $result")
{% endhighlight kotlin %}
    I'm sleeping 0 ...
    I'm sleeping 1 ...
    I'm sleeping 2 ...
    Result is null

exception이 발생하지 않습니다.

<br>

## Asynchronous timeout and resources
**withTimeout**의 timeout 이벤트는 해당 블록에서 실행되는 코드와 관련하여 비동기적이며, timeout 블록 내부에서 반환되기 직전에도 언제든지 발생할 수 있습니다. 블록 내에서 닫거나 블록 외부로 해제해야 하는 리소스를 열거나 획득하는 경우 이 점에 유의하십시오.   

예시 코드
{% highlight kotlin %}
var acquired = 0

class Resource {
    init { acquired++ } // Acquire the resource
    fun close() { acquired-- } // Release the resource
}

fun main() {
    runBlocking {
        repeat(100_000) { // Launch 100K coroutines
            launch { 
                val resource = withTimeout(60) { // Timeout of 60 ms
                    delay(50) // Delay for 50 ms
                    Resource() // Acquire a resource and return it from withTimeout block     
                }
                resource.close() // Release the resource
            }
        }
    }
    // Outside of runBlocking all coroutines have completed
    println(acquired) // Print the number of resources still acquired
}
{% endhighlight kotlin %}

위 코드를 실행하면 항상 0이 나오진 않습니다. 

이 문제를 해결하기 위해서는 resource에 대한 reference를 변수에 저장해야합니다. 

{% highlight kotlin %}
runBlocking {
    repeat(100_000) { // Launch 100K coroutines
        launch { 
            var resource: Resource? = null // Not acquired yet
            try {
                withTimeout(60) { // Timeout of 60 ms
                    delay(50) // Delay for 50 ms
                    resource = Resource() // Store a resource to the variable if acquired      
                }
                // We can do something else with the resource here
            } finally {  
                resource?.close() // Release the resource if it was acquired
            }
        }
    }
}
// Outside of runBlocking all coroutines have completed
println(acquired) // Print the number of resources still acquired
{% endhighlight kotlin %}

위 예제는 항상 0을 출력합니다. Resources는 leak되지 않습니다.


