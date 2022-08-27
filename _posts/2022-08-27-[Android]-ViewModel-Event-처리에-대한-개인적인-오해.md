---
title: "[Android] ViewModel Event 처리에 대한 개인적인 오해"
excerpt: "ViewModel에서 Event를 처리하는 방법을 잘못 이해하고 있었습니다..."

categories:
  - Android
tags:
  - []

permalink: /android/ViewModel-Event-처리에-대한-개인적인-오해/

toc: true
toc_sticky: true

date: 2022-08-27
last_modified_at: 2022-08-27
---
## 오해의 시작
[MVVM의 ViewModel에서 이벤트를 처리하는 방법 6가지](https://medium.com/prnd/mvvm%EC%9D%98-viewmodel%EC%97%90%EC%84%9C-%EC%9D%B4%EB%B2%A4%ED%8A%B8%EB%A5%BC-%EC%B2%98%EB%A6%AC%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-6%EA%B0%80%EC%A7%80-31bb183a88ce) 이 글을 보고 "아 ... ViewModel에서 이벤트를 처리하기 위해서는 무조건 LiveData + Event같은 방식을 사용해야 하는구나" 라고 생각했다. 글을 읽어보면 알겠지만, 단순히 버튼을 클릭해서 토스트 메세지를 띄우는 로직을 setOnClickListener로 처리하지 않고 LiveData를 Observe하는 (실제론 조금 더 복잡하고 다양한) 방식으로 처리했기 때문이다. 그래서 지금까지 진행해왔던 프로젝트는 전부 무조건 SingleLiveData를 사용하여 클릭 이벤트를 처리해왔다.   

그러다 문득, "아니 토스트 메세지 출력 처럼 간단한 로직은 그냥 setOnClickListener로 처리하면되지 않나?" 라는 생각이 들었고 MVVM에서 setOnClickListener를 사용하면 안되는 이유를 구글링해보았다. 하지만 ... MVVM에서 setOnClickListener 사용하지 마세요! 같은 글을 찾아볼 순 없었고 궁금증을 확실하게 해결하기 위해 오픈 채팅방에 질문을 올렸다.   

감사하게도 많은 분들이 답변을 주셨고 이를 토대로 내린 결론은 다음과 같다.
1. 위 링크의 단순한 `버튼 클릭 -> 토스트 출력`은 **예시**를 위한 것이고 실제로 이런 `비즈니스 로직`을 처리하지 않는 간단한 로직은 setOnClickListener로 처리해도 상관없다.
2.  `비즈니스 로직`이 들어간 경우 해당 로직을 viewModel에 위임할 수 있으며 이를 통해 액티비티에 로직을 작성하지 않을 수 있다. 
   
[구글 공식 문서](https://developer.android.com/jetpack/guide/ui-layer/events?hl=ko#views)에도 다음과 같이 나와있다.

>UI 요소의 상태 수정과 관련된 경우 UI에서 사용자 이벤트를 직접 처리할 수 있습니다. 이벤트가 화면상 데이터의 새로고침 같은 비즈니스 로직을 실행해야 하는 경우 ViewModel로 처리해야 합니다.

```kotlin
class LatestNewsActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLatestNewsBinding
    private val viewModel: LatestNewsViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        /* ... */

        // The expand section event is processed by the UI that
        // modifies a View's internal state.
        binding.expandButton.setOnClickListener {
            binding.expandedSection.visibility = View.VISIBLE
        }

        // The refresh event is processed by the ViewModel that is in charge
        // of the business logic.
        binding.refreshButton.setOnClickListener {
            viewModel.refreshNews()
        }
    }
}
```

코드를 보면 setOnClickListener를 사용한 것을 볼 수 있다.   
## 결론
`MVVM의 ViewModel에서 이벤트를 처리하는 방법 6가지`을 사용하는 이유는 ViewModel에 `비즈니스 로직`을 위임하기 위함이었다 ... 혼자 멋대로 오해하고 ... 북치고 장구치고 ... ㅋㅋㅋ 후 갈 길이 정말 멀다. 추가로 오픈 채팅의 답변 내용 중에 `유닛 테스트`관련 내용도 있었는데 이것도 공부해야겠다.




