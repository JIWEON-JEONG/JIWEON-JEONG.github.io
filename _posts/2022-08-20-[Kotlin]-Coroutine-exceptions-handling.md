---
title:  "[Kotlin] Coroutine exceptions handling"
excerpt: "Coroutine exceptions handling"

categories:
  - Kotlin
tags:
  - [코루틴]

permalink: /kotlin/Coroutine-exceptions-handling/

toc: true
toc_sticky: true

date: 2022-08-20
last_modified_at: 2022-08-20
---
> 코루틴 공식 문서를 번역하고 내용을 조금 변경하거나 내용을 추가한 게시글입니다. 잘못된 번역이 있을 수 있습니다.
> [참고한 공식 문서 바로가기](https://kotlinlang.org/docs/exception-handling.html)

<br>

## Exception propagation
코루틴 빌더는 두 가지 일을 합니다. 자동으로 exception을 전파하거나 (launch, actor) 사용자에게 노출하거나(async, produce). 이러한 빌더들이 root 코루틴을 만들 때 전자의(자동으로 exception을 전파하는) 빌더는 exceptions를 자바의 Thread.uncaughtExceptionHandler와 유사한 uncaught exceptions로 취급합니다. 반면 후자는(사용자에게 노출) 사용자가 마지막 exception을 처리하는 것에 의존합니다. 예를 들어 await, receive를 통해서요.

<br>

GlobalScope를 사용하는 간단한 예제를 통해 증명할 수 있습니다.
    GlobalScope는 사소한 방식으로 역효과를 일으킬 수 있는 섬세한 API입니다. 전체 application에 대한 root 코루틴을 만드는 것은 드문 GlobalScope의 용도 중 하나입니다. 따라서 GlobalScope를 @OptIn(DelicateCoroutineAPI::class)과 함께 사용하도록 명시적으로 opt-in 해야합니다.

{% highlight kotlin %}
@OptIn(DelicateCoroutinesApi::class)
fun main() = runBlocking {
    val job = GlobalScope.launch { // root coroutine with launch
        println("Throwing exception from launch")
        throw IndexOutOfBoundsException() // Will be printed to the console by Thread.defaultUncaughtExceptionHandler
    }
    job.join()
    println("Joined failed job")
    val deferred = GlobalScope.async { // root coroutine with async
        println("Throwing exception from async")
        throw ArithmeticException() // Nothing is printed, relying on user to call await
    }
    try {
        deferred.await()
        println("Unreached")
    } catch (e: ArithmeticException) {
        println("Caught ArithmeticException")
    }
}
{% endhighlight kotlin %}

    Throwing exception from launch
    Exception in thread "DefaultDispatcher-worker-2 @coroutine#2" java.lang.IndexOutOfBoundsException
    Joined failed job
    Throwing exception from async
    Caught ArithmeticException

<br>

## CoroutineExceptionHandler
uncaught exceptions를 콘솔에 출력하는 기본 동작을 커스텀할 수 있습니다. root 코루틴의 CoroutineExceptionHandler context 요소는 root 코루틴과 사용자 지정 예외 처리가 발생할 수 있는 모든 하위 요소에 대해 일반적인 catch 블록으로 사용할 수 있습니다. 이는 Thread.uncaughtExceptionHandler와 유사합니다. CoroutineExceptionHandler에서 exception을 복구할 수 없습니다. handler가 호출되었을 대 코루틴은 이미 해당 exception을 완료한 상태입니다. 일반적으로 handler는 exception을 기록하거나, 에러 메세지를 보여주거나, application을 종료하거나 재시작하기 위해 사용됩니다.

<br>

CoroutineExceptionHandler는 오직 uncaught exceptions(다른 방법으로 처리되지 않는 예외)에서 발생합니다. 특히 모든 자식 코루틴들은 exception을 부모 코루틴으로 위임하고 부모 코루틴들 역시 부모로 ... 이 과정을 반복하여  루트까지 위임합니다. 그래서 context에 설치된 CoroutineExceptionHandler는 결코 사용되지 않습니다. 추가로 async 빌더는 항상 모든 exception을 처리하며 Deferred 객체의 결과에 표시합니다. 따라서 CoroutineExceptionHandler는 효과가 없습니다. 

{% highlight kotlin %}
val handler = CoroutineExceptionHandler { _, exception -> 
    println("CoroutineExceptionHandler got $exception") 
}
val job = GlobalScope.launch(handler) { // root coroutine, running in GlobalScope
    throw AssertionError()
}
val deferred = GlobalScope.async(handler) { // also root, but async instead of launch
    throw ArithmeticException() // Nothing will be printed, relying on user to call deferred.await()
}
joinAll(job, deferred)
{% endhighlight kotlin %}
    CoroutineExceptionHandler got java.lang.AssertionError

<br>

## Cancellation and exceptions
취소는 exception과 밀접하게 연관되어있습니다. 코루틴은 내부적으로 취소를 위해 CancellationException을 사용합니다. 이러한 exceptions는 모든 handler에 의해 무시됩니다. 따라서 catch 블록에서 얻을 수 있는 추가적인 디버그 정보를 위한 source로만 사용되어야합니다. 코루틴이 Job.cancel에 의해 취소되었을 때 종료되지만, 부모는 종료되지 않습니다.

{% highlight kotlin %}
val job = launch {
    val child = launch {
        try {
            delay(Long.MAX_VALUE)
        } finally {
            println("Child is cancelled")
        }
    }
    yield()
    println("Cancelling child")
    child.cancel()
    child.join()
    yield()
    println("Parent is not cancelled")
}
job.join()
{% endhighlight kotlin %}

    Cancelling child
    Child is cancelled
    Parent is not cancelled

만약 코루틴이 CancellationException 이외의 exception를 마주친다면, 부모를 exception와 함께 취소힙니다. 이것은 재정의될 수 없으며 structured concurrency를 위한 안정적인 코루틴 위계 질서를 위해 제공됩니다. CoroutineExceptionHandler 구현은 자식 코루틴을 위해 사용되지 않습니다.

<br>

original exception은 모든 자식이 종료된 부모에 의해 처리됩니다.
{% highlight kotlin %}
val handler = CoroutineExceptionHandler { _, exception -> 
    println("CoroutineExceptionHandler got $exception") 
}
val job = GlobalScope.launch(handler) {
    launch { // the first child
        try {
            delay(Long.MAX_VALUE)
        } finally {
            withContext(NonCancellable) {
                println("Children are cancelled, but exception is not handled until all children terminate")
                delay(100)
                println("The first child finished its non cancellable block")
            }
        }
    }
    launch { // the second child
        delay(10)
        println("Second child throws an exception")
        throw ArithmeticException()
    }
}
job.join()
{% endhighlight kotlin %}
    Second child throws an exception
    Children are cancelled, but exception is not handled until all children terminate
    The first child finished its non cancellable block
    CoroutineExceptionHandler got java.lang.ArithmeticException

<br>

## Exceptions aggregation
다수의 자식을 갖고 있는 코루틴이 exception에 의해 fail된다면 일반적인 규칙은 "첫 번째 exception이 이긴다"는 것입니다. 따라서 첫 번째 exception이 처리될 것입니다. 모든 부수적인 exceptions는 suppressed된 상태로 first exception에 추가되게 됩니다. 
{% highlight kotlin %}
import kotlinx.coroutines.*
import java.io.*

@OptIn(DelicateCoroutinesApi::class)
fun main() = runBlocking {
    val handler = CoroutineExceptionHandler { _, exception ->
        println("CoroutineExceptionHandler got $exception with suppressed ${exception.suppressed.contentToString()}")
    }
    val job = GlobalScope.launch(handler) {
        launch {
            try {
                delay(Long.MAX_VALUE) // it gets cancelled when another sibling fails with IOException
            } finally {
                throw ArithmeticException() // the second exception
            }
        }
        launch {
            delay(100)
            throw IOException() // the first exception
        }
        delay(Long.MAX_VALUE)
    }
    job.join()  
}
{% endhighlight kotlin %}
    CoroutineExceptionHandler got java.io.IOException with suppressed [java.lang.ArithmeticException]

Cancellation exceptions는 투명하며 기본적으로 unwrapped됩니다.
{% highlight kotlin %}
val handler = CoroutineExceptionHandler { _, exception ->
    println("CoroutineExceptionHandler got $exception")
}
val job = GlobalScope.launch(handler) {
    val inner = launch { // all this stack of coroutines will get cancelled
        launch {
            launch {
                throw IOException() // the original exception
            }
        }
    }
    try {
        inner.join()
    } catch (e: CancellationException) {
        println("Rethrowing CancellationException with original cause")
        throw e // cancellation exception is rethrown, yet the original IOException gets to the handler  
    }
}
job.join()
{% endhighlight kotlin %}

<br>

## Supervision
단방향 취소가 요구되는 경우에 대해 알아봅시다.

<br>

scope안에 Job이 정의된 UI 컴포넌트가 좋은 예시입니다. UI의 자식이 취소되었다고 모든 UI 컴포넌트를 취소해야하는 것은 필수가 아닙니다. 반면 UI 컴포넌트가 destory되었다면 모든 자식 job들을 취소해야합니다. 

<br>

다른 예시는 서버 프로세스가 자식 job들의 실행을 감독해야할 때입니다. 취소를 감지하고 취소된 것들만 재실행해야합니다.

### Supervision job
**SupervisorJob**은 이러한 목적에 적합합니다. 취소를 아래 방향으로 전파하는 exception을 가지고 있는 job과 유사합니다. 다음 예시를 통해 증명됩니다.
{% highlight kotlin %}
val supervisor = SupervisorJob()
with(CoroutineScope(coroutineContext + supervisor)) {
    // launch the first child -- its exception is ignored for this example (don't do this in practice!)
    val firstChild = launch(CoroutineExceptionHandler { _, _ ->  }) {
        println("The first child is failing")
        throw AssertionError("The first child is cancelled")
    }
    // launch the second child
    val secondChild = launch {
        firstChild.join()
        // Cancellation of the first child is not propagated to the second child
        println("The first child is cancelled: ${firstChild.isCancelled}, but the second one is still active")
        try {
            delay(Long.MAX_VALUE)
        } finally {
            // But cancellation of the supervisor is propagated
            println("The second child is cancelled because the supervisor was cancelled")
        }
    }
    // wait until the first child fails & completes
    firstChild.join()
    println("Cancelling the supervisor")
    supervisor.cancel()
    secondChild.join()
}
{% endhighlight kotlin %}
    The first child is failing
    The first child is cancelled: true, but the second one is still active
    Cancelling the supervisor
    The second child is cancelled because the supervisor was cancelled

<br>

### Supervision scope
coroutineScope 대신 범위 동시성(scoped concurrency)를 위한 supervisorScope를 사용할 수 있습니다. 이것은 취소를 한 방향으로만 전파하며 오직 자신이 실패했을 때만 모든 자식들을 취소합니다. 또한 coroutineScope와 동일하게 모든 자식들의 종료를 기다립니다.

{% highlight kotlin %}
try {
    supervisorScope {
        val child = launch {
            try {
                println("The child is sleeping")
                delay(Long.MAX_VALUE)
            } finally {
                println("The child is cancelled")
            }
        }
        // Give our child a chance to execute and print using yield 
        yield()
        println("Throwing an exception from the scope")
        throw AssertionError()
    }
} catch(e: AssertionError) {
    println("Caught an assertion error")
}
{% endhighlight kotlin %}

    The child is sleeping
    Throwing an exception from the scope
    The child is cancelled
    Caught an assertion error

<br>

### Exceptions in supervised coroutines
supervisor job은 exception을 다루는 방식에도 차이가 있습니다. 모든 자식은 exception handling mechanism을 통해 자신의 exceptions를 스스로 처리해야합니다. 이러한 차이점은 자식의 실패가 부모로 전파되지 않는다는 점입니다. 이는 supervisorScope안에서 실행된 코루틴이 그들의 scope에서 설치된 CoroutineExceptionHandler를 사용한다는 것을 의미합니다. 마치 root 코루틴이 하는 것처럼요.

{% highlight kotlin %}
val handler = CoroutineExceptionHandler { _, exception -> 
    println("CoroutineExceptionHandler got $exception") 
}
supervisorScope {
    val child = launch(handler) {
        println("The child throws an exception")
        throw AssertionError()
    }
    println("The scope is completing")
}
println("The scope is completed")
{% endhighlight kotlin %}
    The scope is completing
    The child throws an exception
    CoroutineExceptionHandler got java.lang.AssertionError
    The scope is completed