---
title: "[Network] OAuth2.0"
excerpt: "OAUTH2.0"

categories:
  - Network
tags:
  - [Network]

permalink: /network/1

toc: true
toc_sticky: true

date: 2022-09-02
last_modified_at: 2022-09-02
---
# OAuth2.0
>OAuth 2.0 is the industry-standard protocol for authorization.
>(OAuth 2.0 은 authorization 의 업계 표준 프로토콜이다.) 
>> Http protocol 인증헤더의 type 중 하나로 등록되어있다.
>
> The OAuth 2.0 enables a third-party application to obtain limited access to an HTTP service.
>> Third-Party 프로그램에게 리소스 소유자를 대신하여 리소스 서버에서 제공하는 자원에 대한 접근 권한을 위임하는 방식을 제공합니다.
### third-party application
>다른 사람이 만든 소프트웨어 응용 프로그램
> 

## Role

| 이름              | 역할                                                  |
|-----------------|-----------------------------------------------------|
| resource owner  | 리소스 소유자. <br> 자신의 정보에 접근 할 수 있도록 승인해주는 주체.          |
| client          | Resource Owner의 리소스를 사용하고자 접근 요청을 하는 어플리케이션.        |
| resource server | Resource Owner의 정보가 저장되어 있는 서버.                     |
| authorization server  | client의 접근 자격을 확인하고 Access Token을 발급하여 권한을 부여하는 서버. |

##Authorization Grant
---
### Authorization Code Grant 
>권한 부여 승인을 위해 자체 생성한 Authorization Code를 전달하는 방식.
>
>간편 로그인 기능에서 사용되는 방식으로 client가 resource owner를 대신하여 특정 자원에 접근을 요청할 때 사용되는 방식.

#### Authorization Code
>client 가 resource server에서 발급한 accessToken 과 교환하기 위한 임시 코드.
> 
#### 장점
 - 보안성
 > Authorization Code 를 탈취 당해도, secret 값은 오직 client 와 resource server 만이 알기에 보안성이 좋다.
 >
 > 그말인 즉슨 User 와 해당 브라우저는 모른다.
####Flow
> 사전작업 : client 는 authorization server 에 clientId, clientSecret, redirectionURI 를 등록해야한다.

![](/imgs/oauth/oauth1.png)

1. resource owner 가 Third-Party 어플리케이션에게 자신의 데이터 접근 권한을 주기 위해 , client 를 통해 해당 링크로 이동한다.

![](/imgs/oauth/oauth2.png)

2. authorization server 가 owner 의 로그인 유무와 해당 접근 권한을 client 에게 부여하겠다 라는 승인 요청을 보냄.
> 이 때 요청 uri 정보와 authorization server 에서 유지하고 있는 정보들을 확인하고 승인 요청 전송.
4. owner 가 승인 하면, authorization server 는 owner 에게 응답으로 location 헤더에 redirectionURI 를 넣어 client 로 리다이렉션 시킨다.

![사진](/imgs/oauth/oauth3.png)
5. 요청을 받은 client 는 가지고 있는 정보와 code 를 조합하여 authorization server 에게 토큰 요청을 보낸다.
![사진](/imgs/oauth/oauth4.png)
6. 발급 받은 access 토큰을 통하여 resource server 의 자원에 접근 할 수 있다.
>토큰을 발급 받게 되면 Authorization Code 는 더이상 필요 하지 않으므로 삭제 해준다. 

#### 토큰 획득
~~~
(GET)/authorize?response_type=code&client_id=s6BhdRkqt3&state=xyz&redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fc
~~~
#### 획득한 토큰으로 요청
~~~
(POST) /token

Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW

Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code=SplxlOBeZQQYbYS6WxSbIA&redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb
~~~

---
### Implicit Grant (암묵적 승인 방식)
>자격증명을 안전하게 저장하기 힘든 클라이언트(ex: JavaScript등의 스크립트 언어를 사용한 브라우저)에게 최적화된 방식입니다.

![사진](/imgs/oauth/oauth5.png)

>암시적 승인 방식에서는 권한 부여 승인 코드 없이 바로 Access Token을 발급. 
> 
**Access Token이 바로 전달되므로 누출의 위험을 방지하기 위해 만료기간을 짧게 설정하여 전달됩니다.**

>Refresh Token 사용이 불가능한 방식이고, 이 방식에서 권한 서버는 client_secret를 사용해 클라이언트를 인증하지 않음 .

#### 장점
- token 발급 절차의 간소화로 높은 응답성과 효율성 확보 가능.
#### 단점
- Access Token이 URL로 전달되기 때문에 비교적 보안에 취약.

![사진](/imgs/oauth/oauth6.png)

#### 이걸 왜 쓸까? :: 추측
1. Was 를 사용하지 않는 서비스에서 사용 할 거 같다.
2. 댓글 같은 기능 중 이름만 뽑아 오는 서비스 .

~~~
(GET)/authorize?response_type=token&client_id=s6BhdRkqt3&state=xyz&redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb
~~~

---
### Resource Owner Password Credentials Grant
> username, password로 Access Token을 받는 방식
> 
> **자신의 서비스에서 제공하는 어플리케이션일 경우에만 사용되는 인증 방식입니다.**

![사진](/imgs/oauth/oauth7.png)

>제공하는 API를 통해 username, password을 전달하여 Access Token을 받는 것입니다.

#### 중요한 점은 이 방식은 권한 서버, 리소스 서버, 클라이언트가 모두 같은 시스템에 속해 있을 때 사용되어야 하는 방식이라는 점.

~~~
(POST) /token

Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW

Content-Type: application/x-www-form-urlencoded

grant_type=password&username=johndoe&password=A3ddj3w
~~~
---
### Client Credentials Grant
>클라이언트의 자격증명만으로 Access Token을 획득하는 방식 (Refresh 토큰 사용 불가.)

![사진](/imgs/oauth/oauth8.png)

~~~
(POST) /token

Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW

Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
~~~

---
### 전체 flow 와 refresh token

![](/imgs/oauth/oauth9.png)


> 안드로이드 나 ios 같은 native app 경우 브라우저와 서버와의 통신보다 탈취 위험이 적으므로, <br>
> 인증서버에 바로 accessToken 요청 -> native app 에서 받아서 따로 백엔드 서버에 전달 해주어야 함. <br>
> 백엔드 서버에서 받아서 리소스 서버로 요청.



