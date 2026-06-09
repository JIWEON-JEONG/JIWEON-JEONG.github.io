var om=Object.defineProperty;var um=(e,r,n)=>r in e?om(e,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[r]=n;var v=(e,r,n)=>um(e,typeof r!="symbol"?r+"":r,n);import{r as cm,c as Mt,a as M,j as u,L as R,u as dm,b as lm,d as fm,O as mm,e as Qe,R as Lc,f as gm,h as hm}from"./router-Dej_pqjK.js";import{m as Ct,p as bm,P as yt}from"./markdown-C6YNvbGZ.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();var _s={},tu=cm;_s.createRoot=tu.createRoot,_s.hydrateRoot=tu.hydrateRoot;const _m=`---
title: "[AWS] 서버리스 개념과 lambda 아키텍처"
datePublished: 2022-09-12
slug: aws-serverless-lambda
tags: Infra, AWS
seoDescription: "서버리스란 .."
---

# 클라우드 기반 개발 1주차
## 서버리스
> 개발자가 서버를 관리 할 필요 없이 애플리케이션을 빌드하고 실행 할 수 있도록 하는 클라우드 네이티브 개발 모델.
> 
> 서버를 관리 할 필요가 없다 -> **트래픽에 따라 사용자가 직접 서버의 가용량을 증/감 시킬 필요가 없다.**

### 서버리스 종류 
1. FaaS (Fuction as a Service)
> 함수를 서비스로 제공. 일반적인 서버가 아닌 클라우드 제공업체가 관리하는 클라우드 컨테이너에서 작동.
> 
> 코드를 함수 단위로 저장, 요청이 들어오면 대기 상태의 서버가 함수를 실행.
> 
> 비용은 함수 호출 횟수에 따라 청구

EX) AWS Lambda, MS Azure Fuction.

2. Baas (Backend as a Service)

> 백엔드 개발에 필요한 여러 기능을 API 로 제공하는 서비스.

> 클라우드 제공업체가 인증 서비스와 추가 암호화, 클라우드 액세스 가능한 데이터베이스, 상세한 데이터 사용량 모니터링 등을 ‘완성해’ 제공.

EX) Firebase

### 서버리스 아키텍처를 왜 사용 할까?
1. 서버 관리가 필요 없다.
> 서버리스 아키텍처 서비스 제공자에게 서버 관리 위임. 개발자는 개발 로직(서비스 품질)에만 집중 할 수 있다.
2. 합리적인 가격
> 실제 사용량 (예를 들어 함수 호출 횟수) 에 대해서만 비용 청구.
3. 높은 가용성과 유연한 확장
> 요청이 들어올때만 서버 실행되고, 요청에 따라 유연하게 scaling 이 되기 때문에.

### CustomBackend VS Baas
> 결론부터 얘기 하자면, 각각 이점을 가지는 상황이 있기 때문에 내가 처한 상황에 맞게 사용하는 것이 현명.
1. CustomBackend
 - Baas 가 제공하지 않은 고유한 기능을 사용 해야 할 때,
 - 오랜 기간동안 지원 해야 하는 서비스 일 경우
 - 더 많은 사용자를 유치할 수 있는 잠재력 있는 서비스를 만들고 싶을 경우
2. Baas
 - MVP(Minimum viable product) 같이 가능한 빨리 사용자의 피드백을 받는것이 중요한 상황이거나 <br>
출시기간을 단축하고 개발비용을 절감 해야 할때 고려.
 - upscaling 이 필요하지 않은 어플리케이션. 
 - Baas 공급자가 도입한 수정 사항이 어플리케이션에 크게 영향을 미치지 않을 때 고려.

#### BaaS 의 한계점
1. 서비스가 BaaS 제공자에 의존적 이게 된다. (BaaS 정책이 바뀌거나 공급에 문제가 있을 경우, 서비스에 직접적인 피해.)
2. 디버깅이 어렵다. (그에 반해 CustomBackend 는 코드의 작성자이기 때문에 디버깅 수월.)
3. BaaS 의 목표는 다양한 웹 및 모바일 환경에서 작동하는것. 그말은 
> 자신의 서비스에 필요한 기능을 제공하는 API 가 없을 수도 있고,<br>
자신의 서비스가 요구하는 기능의 코드를 작성 하는 것보다 성능이나 유연성이 떨어질 수 있다.

### 서버리스 한계점 정리
1. Cold-Start
> 상시 대기가 아닌 요청이 들어올때마다 실행 되기 때문에 response 가 느림 상대적으로.
2. 제공 플랫폼에 대한 의존성 (종속성)
3. 표준 프레임워크 없음 : 클라우드 제공자가 제공하지 않는 기능은 쓸 수 없다.
4. 긴 작업에 대한 비효율성
> 서버리스는 함수가 1회 호출 될 때 사용할 수 있는 메모리 및 시간에 제한이 있기 때문.<br>
> 작업이 끝나지 않은채로 해당 시간이 지나면 작업이 끝날때까지 일정 시간마다 계속 함수를 다시 호출하므로 굉장히 비효율적이다.
5. 보안
> 데이터를 사내에서 직접 관리하는것이 아니기 때문에 민감한 데이터에 관해서는 우려가 생긴다.

## lambda 아키텍처
![](/imgs/infra/lambda.png)`,vm=`---
title: "[AWS] VPC 생성하기 전 알아야 할 내용들"
datePublished: 2022-09-11
slug: aws-vpc
tags: Infra, AWS
seoDescription: "VPC 에 대하여"
---

# 클라우드 인프라 운영 1주차
## VPN(Virtual Private Network)

> 인터넷을 통해 디바이스 간에 사설 네트워크 연결을 생성.
> 
> VPN 의 기본적인 역할은 멀리 떨어진 네트워크 환경을 하나의 안전한 네트워크로 만드는 것.

### 왜 사용할까?
>VPN 서비스는 주로 인터넷을 통해 데이터를 안전하게 전송하는 데 사용된다.

1. 개인정보 처리방침
> 가상 사설 네트워크가 없으면 암호, 신용 카드 정보 및 검색 기록과 같은 개인 데이터가 기록되고 서드 파티에서 판매될 수 있습니다. 
> 
> VPN은 암호화를 사용하여 특히 퍼블릭 Wi-Fi 네트워크를 통해 연결할 때 이 기밀 정보를 프라이빗으로 유지합니다.

2. 익명
> VPN 연결은 인터넷에서 익명을 유지하기 위해 IP 주소를 숨깁니다.

3. 보안
> VPN 서비스는 암호화를 사용하여 무단 액세스로부터 인터넷 연결을 보호합니다.
> 
> 웹 활동이 퍼블릭 Wi-Fi를 통해 이루어지기 때문에 이러한 유형의 인터넷 연결은 해킹에 취약합니다.
> 
> 보안되지 않은 퍼블릭 Wi-Fi 핫스팟에 연결할 때 VPN 서비스를 사용하면 데이터와 디바이스를 모두 안전하게 보호할 수 있습니다.

### 기업에서 특히 VPN 을 사용하는 이유
> VPN은 원격 사용자를 사무실 네트워크에 연결하는 효율적이고 빠르고 안전한 방법입니다.
> 
> VPN 연결은 값비싼 전용 LAN 또는 WAN 링크 또는 장거리 원격 전화 접속 링크와 비교하여 고대역폭의 프라이빗 인터넷 액세스를 회사에 제공합니다.

## VPC(Amazon Virtual Private Cloud)
> 사용자가 정의한 가상 네트워크로 AWS 리소스를 시작 할 수 있게 해준다.
> 
>  또한 의심스러운 인터넷 활동이 있을 경우 미리 선택된 프로그램을 끝내는 종료 메커니즘 역할을 할 수도 있습니다. 

![](/imgs/infra/vpn.png)

### VPC 를 사용하는 이유 
1. VPC 별로 네트워크를 구성할 수 있다. VPC 별로 필요한 설정을 통해 인스턴스에 네트워크 설정을 적용할 수 있다
> VPC 를 만들지 않고 인스턴스를 생성하는 경우 AWS 에서 제공하는 Default VPC 를 사용하게 된다.

> 결국, VPC를 통해 인스턴스가 속하는 네트워크를 구분하여 각 네트워크에 맞는 설정을 부여할 수 있다.
> 
> 일반적으로 보안을위해 AWS 리소스간 허용을 최소화하고 그룹별로 손쉽게 네트워크를 구성하기위해 많이 사용.

### VPC 생성하기 전 알아야 할 사전 지식
#### CIDR (Classless Inter-Domain Routing)
 - <CIDR 표기법>
>172.16.0.0/16

#### Subnet 
> 하나의 네트워크가 분할되어 나눠진 작은 네트워크
> 
> 네트워크를 운영중인 서비스의 규모에 맞게 분할 하여, 낭비되는 IP주소 자원을 최소화하려는 것이 주된 목적.

![](/imgs/infra/subnet.png)

>각각의 서브넷은 가용영역안에 존재하며 서브넷안에 RDS, EC2와같은 리소스들을 위치시킬 수 있습니다.

1. public subnet
> Internet Gateway 연결을 통해서 외부와 통신 가능하다.

2. private subnet
> 기본적으로 외부와 차단. 다른 서브넷 끼리의 통신만 가능.

##### AWS 에서 subnet 이용할때 주의점 (예약 되어 있는 IP)
![](/imgs/infra/reserved.png)
<https://memory-hub.tistory.com/11> 참조.

#### 라우팅
![](/imgs/infra/routing.png)
 - VPC 내부 에서의 네트워크 통신은 라우터가 담당.
 - **하지만, 그 외의 외부로 통하는 트래픽을 처리할 수 없다.**
 - 이때 인터넷 게이트웨이를 사용.

#### 인터넷 게이트웨이
![](/imgs/infra/internetGateway.png)
> VPC 와 인터넷을 연결해주는 하나의 관문.

 - 서브넷 B 라우팅 테이블을 보면, 모든 트래픽에 한해서 IGA A 로 향하라고 되어있다.
 - 먼저 172.31.0.0 에 매칭되는지 확인 후, 안될경우 IGA A 로 보냄.
 - private subnet 은 당연하지만 연결 X.

#### 네트워크 ACL 과 보안그룹
> ACL (Access Control List) : 서브넷 내부와 외부의 트래픽을 제어하기 위한 방화벽 역활을 하는 VPC 선택적 보안 계층.
>
> 규칙 목록은 번호가 낮은 거 부터 우선순위로 적용.
> 
> 연결된 서브넷의 모든 인스턴스에 자동 적용.
> 
> ACL과 보안그룹이 충돌한다면 보안그룹이 더 높은 우선순위를 갖음.

> 보안그룹 : 인스턴스에 대한 인바운드, 아웃바운드 제어하는 가상의 방화벽 역할.
> 
> **서브넷 수준이 아닌 인스턴스 수준에서 작동** (각각의 인스턴스 별로 적용 가능.)
>
> 상태 저장

![](/imgs/infra/acl.png)

#### NAT Gateway
![](/imgs/infra/nat.png)

>프라이빗 서브넷의 인스턴스가 VPC 외부의 서비스에 연결할 수 있지만 외부 서비스에서 이러한 인스턴스와의 연결을 시작할 수 없도록 NAT 게이트웨이를 사용.

1. public 방식 (**기본값**)

> 1. 퍼블릭 서브넷에서 퍼블릭 NAT 게이트웨이를 생성하고 생성 시 탄력적 IP 주소를 NAT 게이트웨이와 연결
> 2. NAT 게이트웨이에서 VPC용 인터넷 게이트웨이로 라우팅
> 3. 

2. private 방식
> 1. 프라이빗 NAT 게이트웨이를 통해 다른 VPC 또는 온프레미스 네트워크에 연결
> 2. 트래픽을 NAT 게이트웨이에서 Transit Gateway 또는 가상 프라이빗 게이트웨이를 통해 트래픽을 라우팅.
> 3. 프라이빗 NAT 게이트웨이를 사용하여 VPC에 인터넷 게이트웨이를 연결할 수 있지만 프라이빗 NAT 게이트웨이에서 인터넷 게이트웨이로 트래픽을 라우팅하는 경우 인터넷 게이트웨이가 트래픽을 삭제합니다.

> NAT 게이트웨이는 인스턴스의 소스 IP 주소를 NAT 게이트웨이의 IP 주소로 바꿉니다. <br>
> 퍼블릭 NAT 게이트웨이의 경우 이것은 NAT 게이트웨이의 탄력적 IP 주소입니다.<br>
> 프라이빗 NAT 게이트웨이의 경우 이것은 NAT 게이트웨이의 프라이빗 IP 주소입니다. <br>
> 인스턴스에 응답 트래픽을 전송할 때 NAT 디바이스는 주소를 원래 소스 IP 주소로 다시 변환합니다.

#### VPC 엔드포인트
> VPC 내 리소스 들이 VPC 외부의 AWS 서비스 (S3, Dynamo DB, CloudWatch) 등에 접근 할때, <br>
> InternetGateway 나 NAT Gateway 등의 외부 전송 서비스를 타지 않고도 아마존의 백본 네트워크를 통해 접근 할 수 있도록 지원하는 서비스.
> 
**엔드포인트는 VPC에서 S3에 직접 액세스하여 NAT 게이트웨이 요금을 줄이고 보안을 강화할 수 있습니다. 기본적으로 모든 액세스 정책이 사용됩니다. 언제든지 이 정책을 사용자 지정할 수 있습니다.**
![](/imgs/infra/endpoint.png)

#### 테넌시
1. 멀티 테넌시
![](/imgs/infra/멀티테넌시.png)
>여러 AWS 계정이 동일한 물리적 하드웨어를 공유하는 방식.

2. 전용 테넌시
![](/imgs/infra/전용테넌시.png)
>하드웨어 A에 사용자 A의 인스턴스만 들어가는 방식. 사용자 B의 인스턴스는 들어올 수 없음. 물리적으로 분리됨.

## 질문
1. 프라이빗 NAT 게이트웨이를 사용하여 VPC에 인터넷 게이트웨이를 연결할 수 있지만 프라이빗 NAT 게이트웨이에서 인터넷 게이트웨이로 트래픽을 라우팅하는 경우 인터넷 게이트웨이가 트래픽을 삭제합니다.
> 결국 private NAT Gateway 를 사용하면, 인터넷 게이트웨이를 통해서는 외부로 나갈수 없는 것인가?'

2. 가용영역과 서브넷수의 상관관계 ?? 

3. 전용테넌시 를 굳이 사용하는 이유?
> 성능, 보안 등의 차이가 없다고 알고 있다.


`,Om=`---
title: "[Git] Blog 를 운영하는 이유와 플랫폼을 옮긴 이유"
datePublished: 2022-09-07
slug: blog-migration
tags: Git
seoDescription: "Blog 플랫폼을 옮긴 이유"
---

## Blog 하는 이유
### 나를 위해서 
1. 내가 공부한 내용을 글로 정리하여, 확실하게 자신의 것으로 만들 수 있다.
> 추구하는 공부 방법 (2022.09.07)
> 1. 궁금하거나 모르는 내용을 공식문서나 믿을만한 정보들로 충분히 개념을 익힌다.
> 2. 익힌 개념을 짧은 코드나 그림을 그리거나 등으로 실제 나의 작업물로 만들어본다.
> 3. 해당 내용을 블로그나 멘토링 또는 발표를 통해 내 것으로 만든다.
2. **추후 특정 내용 필요할때, 내가 쓴 내용을 보며 더 편하게 리마인드 및 재사용 할 수 있다.**
3. 나를 증명하는 하나의 지표가 될 수 있다.
### 누군갈 위해서
> 사실 지금은 이부분이 큰 비중을 차지 하진 않는다.
> 
> 하지만 언젠가 내가 쓴글이 어느정도 파급력을 가지고 이사람 글이라면 믿을만 해 라는 생각이 드는 semi 공식문서 같은 블로그를 운영하고 싶다.

## Blog 플랫폼 변경 
> 전 Blog 주소 : https://velog.io/@john7645 

### 플랫폼 변경 이유
#### 1. MarkDown 언어의 매력과 통합 관리.
Diger 와 매주 한 주제를 선정하여 스터디를 진행 하면서 해당 주제를 코드적인 부분과 이론적인 부분을 함께 관리 하고 싶은 욕구가 생겼다.<br><br>
그런 욕구와 Diger 의 추천으로 공부하게 된 MarkDown 문법.IntelliJ
MarkDown 언어의 매력은 먼저 간단하고,<br> 나는 글을 쓰고 있지만 하나의 소프트웨어를 만들어 내는 느낌을 준다.<br><br>
사실 전 플랫폼인 Velog 도 마크다운 기반으로 글 작성을 제공한다. 
>반성할 점 : 그게 마크다운 인지도 모르고 사용했었다...

**그럼에도 불구하고 플랫폼을 변경한 이유는 코드와 글을 통합관리를 할 수 있기때문이다.**<br><br>
글만으로 게시물을 작성 할때도 있지만, 글에 대한 예시로 코드가 들어가는 경우가 많기 때문에,<br>
해당 코드와 그에 대한 개념적인 글을 Local 이든 원격 GitHub 에서든 한 뭉탱이로 관리 할 수 있다는 장점이 있다.

#### 2. Custom기능
전 플랫폼에서는 전체 방문자수를 알려주는 기능이 없다는 단점이 있었다.<br><br>
현 플랫폼을 사용하면서 내 페이지를 자유롭게 Custom 할 수 있고,<br>
전체 방문자 수 같은 자신이 원하는 기능을 추가 할 수 있다.
>유연한 Blog 소프트웨어 개발 가능.
> 









`,xm=`---
title: "[Git] Git 이미지 Issue 에 올리지 마세요."
datePublished: 2022-09-08
slug: git-image-issue
tags: Git
seoDescription: "Git 이미지 안올라간다면..."
---

# 서두
Git 원격 레포지토리의 .md 파일에는 이미지가 올라가는데, Git 을 통해 배포한 환경에서 <br>
(예를 들면 블로그 같은) 이미지가 보이지 않는 상황,<br>
많은 블로그에서 이를 통한 해결법으로 Issue 에 올리는 방법을 소개 하고 있다.<br><br>

하지만 Issue 로 이미지를 올리는 방법은 내가 느끼기엔 상당히 귀찮은 작업이였다.<br>
많은 사람들이 blog 플랫폼으로 Git 을 많이 사용하는데, 이렇게 귀찮은 플랫폼을 왜 사용할까?<br>
어떤 방법이 있지 않을까 라는 생각이 들었고 <br>
나의 소중한 친구인 "이진욱" 의 도움을 받아 굉장히 간편한 방법을 찾게 되었다.<br><br>

아래에 소개 되는 방법은 이미지를 Issue 에 올리는 방법을 선택하기 전에 , <br>
한번 시도 해보면 좋을 거 같은 방법이다.


## 방법
해당 이미지를 삽입하기 위해선 여러가지 방법이 있지만 가장 편한 방법은 이미지 드래그로 넣는 방법일 것이다.

![사진](/imgs/git/before.png)

>이미지를 일반적으로 드래그 하게 되면 이런식으로 들어가게 된다.

### 위에 들어가는 방식에서 .. 을 지워준다.

![](/imgs/git/after.png)

이렇게 하게 되면 정상적으로 잘 올라가게 된다.<br>
**힘들게 매번 이슈에 사진을 올리지 않아도.**

## 왜 될까? - 개인적인 생각 (피드백 환영)

Git 을 통해 배포한 페이지, 즉 우리의 이미지가 보여져야 하는 페이지는 결국 해당 Repository 의 내용을 바탕으로 구성된다.

![](/imgs/git/arch.png)

만약 Nginx.md 파일에서 ../imgs/.. 이런 식으로 선언 하게 된다면, 
>**../ 의 디렉토리는 _posts 가 된다.** 

_posts 경로에는 imgs 가 없기 때문에 사진이 안나왔던 것이고, <br>
그렇기 때문에 절대 경로로 루트에서부터 지정 해주니, 나왔다 라고 분석 했다.

    





`,pm=`---
title: "[Network] NGINX 와 설정파일"
datePublished: 2022-09-03
slug: nginx
tags: Network
seoDescription: "NGINX 와 설정파일"
---

# NGINX
>NGINX is open source software for web serving, reverse proxying, caching, load balancing, media streaming, and more.

* reverse proxy : 서버를 호출할 때 직접 서버에 접근 하는 것이 아니라 리버스 프록시 서버를 호출하게 되고,<br>
리버스 프록시 서버가 서버에게 요청을 하고 응답을 받아 클라이언트에 전달을 한다.<br>
(Internet network 기준으로 client 쪽에 있다면 Forward proxy, Server 쪽에 있다면 Reverse proxy.)

> 클라이언트는 리버스 프록시 서버를 호출하기 때문에 실제 서버의 IP를 감출 수 있고, 이를 통해 보안을 높일 수 있다는 장점이 있다.
>
> 캐시 서버로 이용할 수 있고 , 로드 밸런싱 가능 해진다.

> HTTPS 인증서를 제공 해줄 수 있다.
> 
> 비동기 방식으로 처리 하기 때문에 많은 트래픽을 동시에 처리 가능하다.
> 
>log 확인 가능 (/var/log/nginx 에 위치)

---
## NGINX 의 목적
>The goal behind NGINX was to create the fastest web server around.<br>
> (NGINX 의 목표는 가장 빠른 웹 서버를 만드는 것)

---

## NGINX 구조
![사진](/imgs/nginx/nginx1.jpg)

1. Master Process 
>config 파일을 읽고 worker process를 생성/관리
2. Worker Process
>실제 동작을 수행
3. Helper Process
> Cache Loader : 최초로 캐시를 로딩해줌 <br>
> Cache Maanger : 주기적으로 캐시를 관리해줌

## NGINX config 파일 설정 예시
>$host 또는 $request_uri 들은 클라이언트에서 받은 요청들을 참고하여 변수들 채워진다.


~~~
server{
    listen 80:
    server_name api.suwiki.kr
    
    if($host = suwiki.kr){
        return 301 https://$host$request_uri;
    }
}

server{
    listen 443 ssl:
    server_name api.suwiki.kr
    
    ssl_certificate /*/*.pem;
    ssl_certificate_key /*/*.pem;
    
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/*.pem;
    
    location / {
        proxy_pass http://127.0.0.1:8080;
    }
}
~~~

`,Dm=`---
title: "[DB] NoSql 과 Redis"
datePublished: 2022-09-30
slug: nosql-redis
tags: DB
seoDescription: "Spring 프로젝트 Redis 도입 전 사전 공부"
---

# NoSql 과 Redis

## RDBMS
1. 데이터를 관계로 표현한다. (열과 행이 있는 테이블로 표현)
2. 테이블 형식의 데이터를 조작할 수 있는 관계 연산자 제공.
3. 트랜잭션 시 강력한 ACID 제공.
>
> Atomicity : All or Noting. 모두 반영되거나 전혀 반영되지 않거나.
> 
> Consistency : 트랜잭션이 일어난 이후의 데이터베이스는 데이터베이스의 제약 이나 규칙(무결성 같은)을 만족해야 한다.
>
> Isolation : 각각의 트랜잭션은 서로 간섭 없이 독립적으로 이루어져야 한다. (마이너스 통장 예시)
> 
> Durability : 트랜잭션이 성공적으로 완료 되었을 경우, 결과는 영구적으로 반영되어야 한다.

## NoSql
> 단순히 기존 관계형 DBMS가 갖고 있는 특성뿐만 아니라, 다른 특성들을 부가적으로 지원하는 DB.

### 왜 각광 받게 되었나?
> 관계형 데이터 또는 정형데이터가 아닌 데이터, 즉 비정형데이터라는 것을 보다 쉽게 담아서 저장하고 처리할 수 있는 구조를 가진 데이터 베이스들이 관심을 받게 되었고, 
> 해당 기술이 점점 더 발전하게 되면서, NoSQL 데이터베이스가 각광을 받게 되었다.

### 특징
- 관계형 모델을 사용하지 않으며 테이블간의 조인 기능 없음
- 직접 프로그래밍을 하는 등의 비SQL 인터페이스를 통한 데이터 액세스
- 대부분 여러 대의 데이터베이스 서버를 묶어서(클러스터링) 하나의 데이터베이스를 구성 (수평적 확장)
- 관계형 데이터베이스에서는 지원하는 Data처리 완결성(Transaction ACID 지원) **미보장**
- **데이터의 스키마와 속성들을 다양하게 수용 및 동적 정의 (Schema-less)**
- 데이터베이스의 중단 없는 서비스와 자동 복구 기능지원
- **확장성, 가용성, 높은 성능**

> NoSQL은 초고용량 데이터 처리 등 성능에 특화된 목적을 위해, 비관계형 데이터 저장소에, 비구조적인 데이터를 저장하기 위한 분산 저장 시스템이라고 볼 수 있다.

### 어떤 형태로 저장 될까? - 다양한 종류의 데이터 모델
1. Key Value DB
> Key Value 의 쌍으로 데이터가 저장되는 가장 단순한 형태의 솔루션
>
> Dynamo, Redis
2. Wide Columnar Store
> Key Value 에서 발전된 형태의 Column Family 데이터 모델을 사용
>
> Cassandra, ScyllaDB
3. Document DB
> JSON, XML과 같은 Collection 데이터 모델 구조를 채택
>
> MongoDB
4. Graph DB
> Nodes, Relationship, Key-Value 데이터 모델을 채용
> 
> Neo4J

## Redis
### Cache
> 나중에 요청할 결과를 미리 저장해 두었다가, 빠르게 서비스를 해주는 것. 

### Cache 전략 
#### Look a side
![](/imgs/db/lookAside.png)
- 읽기가 많은 워크로드에 적합합니다.
- 캐시 클러스터가 다운되어도 시스템 전체의 오류로 가지 않습니다.


- 캐시에 없는 데이터인 경우, 더 오랜 시간이 걸리게 됩니다.
- 캐시가 최신 데이터를 가지고 있는가? (동기화 문제가 중요하게 됩니다.)

#### Write back : insert 쿼리 1개 500 번, insert 쿼리 500개 1개
![](/imgs/db/writeBack.png)
- 쓰기가 많은 워크로드에 적합합니다.
- 가장 최근에 업데이트되고 엑세스 된 데이터를 항상 캐시에서 사용할 수 있는 혼합 워크로드에 적합합니다.
- 데이터베이스에 대한 전체 쓰기를 줄일 수 있어, 해당 비용을 감소할 수 있습니다.

- 캐시에서 오류가 발생하면 데이터 영구소실.

### 왜 Collection 이 중요한가? :: Memarched vs Redis
- 개발의 편의성 
- 개발의 난이도
- ex - 랭킹서버 
  - 직접 구현 해도 되지만, Redis 의 Sorted Set 을 이용하면 랭킹 구현 가능.
  - 다만 가져다 쓰면 해당 기술의 한계에 종속적.
- NoSql 특성상 ACID 가 약하여 RaceCondition 에 취약 할 수 있는데
Redis 의 경우 자료구조가 Atomic 하기 때문에 RaceCondition 피할 수 있다. 
> 개발 시간을 단축 시키고 문제를 줄여줄 수 있다.
> 

### 전역객체 또는 필드로 저장해도 메모리 DB 인데 그거랑 뭐가 다를까?
- 서버가 여러대인 경우 Consistency 문제 발생
- 세션 같은 경우 A 서버에서 세션 저장 하면 -> B 서버에는 세션 객체 없기 때문에 문제 발생.
- 

### Redis 사용 처 
- Remote Data Store
> A, B, C 서버에서 데이터를 공유 하고 싶을때 
- 인증 토큰 저장
- Ranking board 사용 (Sorted Set)
- 유저 API Limit

### Redis Collections
- Strings (Key-Value) : 가장 많이씀.
> 보통 prefix 붙임. key 값에 token:1234567
>
> 단순 증감 연산 효율 (연산 함수 제공)
- List (LinkedList 와 유사)
> Blocking 기능을 통해 이벤트 queue 구현 가능.
- Set : 데이터가 있는지 없는지만 체크하는 용도 (특정 유저 follow 목록)
- Sorted Set : 가장 많이 씀. - 랭킹에 따라 순서가 바뀌길 바란다면
- Hash 
- Streams
> 로그를 저장하기 가장 적절한 자료구조.

:: 하나의 컬렉션에 너무 많은 아이템을 담으면 좋지 않음.
> 10000개 이하 몇천개 수준으로 유지하는게 좋다.

:: Expire item 개별로 걸리지 않고 전체 Collection 에 걸리기 때문에
> 위의 많은 개수들이 모두 삭제 되고 모두 가져오게 됨 - 성능적 부하.

### Redis 운영
1. 메모리 관리를 잘하자.
   - Maxmemory 를 설정하더라도 이보다 더 사용할 가능성이 큼.
   - 멀티쓰레드 환경에서 RaceCondition 으로 발생하는 문제 취약. - 잦은 ContextSwitching 으로 쓰레드가 경합하면서 생기는 문제들
> 1. Redis 는 기본적으로 Single Thread
> 2. Redis 기본 자료구조는 Atomic 하기 때문에, 서로 다른 트랜잭션의 Read/Write 동기화
2. O(N) 관련 명령어는 주의하자.
 - Redis 는 Single Thread 기반이기 때문에 keys, flushall, flushdb, getall 등 조심.

### Replication - Fork
- 메모리 데이터 이기 때문에 유실될 때를 어떻게 대비 할 것인가? 에 대한 해결책.
- Fork 할때 메모리 여유 있게 사용. 

### 꿀팁
- keys * -> scan 으로 대체
- hgetall -> hscan
- del -> unlink

MAXMEMORY-POLICY = ALLKEYS-LRU (메모리가 가득 찼을 때 가장 바람직한 POLICY)
redis 캐시로 이용 할때 , ExpireTime 설정 권장.`,$m=`---
title: "[Network] OAuth2.0"
datePublished: 2022-09-02
slug: oauth2
tags: Network
seoDescription: "OAUTH2.0"
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



`,wm=`---
title: "[Retrospective-2022] 프리코스 1주차&2주차 회고"
datePublished: 2022-11-10
slug: precourse-retrospective
tags: Retrospective
seoDescription: "우아한테크코스 프리코스를 진행하며..."
---

# 작성이유
- 프리코스를 진행하면서 생각보다 많은 내용을 매주 얻고 있어서, 배운 내용과 깨달은 내용을 정리하고 자 함.

---
# 배운점
## 기능별 커밋의 목적을 이해.
요구사항을 충분히 이해하고, 프로그램을 어떻게 짤건지 설계하는 과정이 중요하다는 것은 모두 다 알지만,<br>
실제로 설계 및 문제이해에 나는 충분히 시간을 쏟지 않고 있었다.<br>
기능별 커밋은 요구사항을 충분히 읽고, 프로그램을 설계 하는것을 강제 하는 역할을 하였다.
> 장점
> 
> 기능 목록을 작성 하게 되면, 요구사항에 대해 충분한 이해를 가지고 코드를 작성 하게 된다.
> 
> 구현해야 될 기능들을 정리해 놓으면 어떻게 설계할지 좀 더 윤곽이 잡힌다.

물론 작성한 기능목록은 구현하면서 계속 바뀌고 있지만, 이런 습관을 들일수 있는 계기가 되었다.

## Git 을 통한 협업 
매주 과제 PR 을 올리면서, 인상 깊었던 것이 2개가 있었다.
1. 커밋 메세지
커밋 메세지도 문단으로 남기는 것을 보고 인상깊었다.<br>
해당 기능에 대한 부가적인 설명이나 상세설명을 써놓아도 좋겠다 라는 것을 느꼈다.
2. 객체 의존도 사진 작성, 체크박스 활용
어떤 분의 PR 을 보니 자신이 짠 코드의 객체 의존도가 표시된 사진과 기능들을 모두 체크박스 처리 하여 보다
시각적으로 가독성 좋게 올리신 분이 있어서 굉장히 인상깊었다. 나도 이런부분은 벤치마킹하여 다음주 PR에 도입 해보려고 한다.

## 추가적인 자잘한 팁
- 예외적인 상황 테스트도 꼭 만들자.
- 값을 하드코딩 하지말자. 지역변수 이용!
- userList 같이 변수명에 자료형을 사용하지말자.
- 메서드 분리 기준으로 자신만의 기준을 세우자. 예를 들어 메서드 15줄 언더로 작성 등..
- 단위테스트는 작게 작게 만들자.


`,Pm=`---
title: "[Retrospective-2022] 2022년 3/4 분기"
datePublished: 2022-08-28
slug: retrospective-2022-q3
tags: Retrospective, Log
seoDescription: "2022년 3/4 분기 회고"
---

## 전 분기에 목표 했던 것들.
1. 독서 
2. Spring 과 JPA 다시 수강 하면서 내것으로 만들기.
3. 자바 스터디를 통해 자바의 깊은 내용을 공부해보자.
4. Querydsl 공부해보자.
5. 자소서 준비 (포트폴리오)
6. 운동 시작하기.
7. **새로운 프로젝트(ttbkk)에서 많이 배우고 , 많이 혼나고 , 많이 빡구를 당하면서 값비싼 경험을 온전히 받아 들이고 성장할 수 있는 기회로 만드는것이 이번 3분기의 포인트가 될 것이다.**

## 전분기 목표에 대한 회고
###독서 
"객체지향 사실과 오해" 라는 책을 완독 했다.<br><br>
해당 책으로 Diger 와 매주 1챕터 씩 스터디를 진행 했고, 8주를 거쳐 완독을 하게 되었다.

>책을 읽고 서로 토의 내용 정리 : https://github.com/Be-GGanboo-With-Java


...작성중...





`,Mm=`---
title: "[Retrospective-2022] 개발자에게 정말 필요한 역량은 무엇일까? (Feat Siner)"
datePublished: 2022-09-09
slug: retrospective-siner
tags: Retrospective, Log
seoDescription: "Siner 님의 조언"
---

# 사전지식

 - Flyway : 데이터베이스 Migration tool.
>데이터베이스의 버전을 관리 할 수 있는 도구 라고 생각하면 좋겠다.
> 
>이야기에서 툴의 이름이 나와 언급했지만 구체적인 툴의 정보를 요구하지 않음.

---
# 서론
## 이야기의 시작
2022년 09월 08일 테스트 전용 데이터베이스를 사용할 수 있는 환경을 구축하고 있었다.<br>
환경 구축을 하면서 나오는 에러에 대해 구글링을 했지만, 내 환경에서는 해결법이 되지 않았고 시간은 어느새 2일이 지나있었다. <br>
>테스트 전용 환경 구축 트러블슈팅 : 해결중 ... (해결 후 정리 하여 블로그 올릴 예정)

시간이 더이상 지체되면 더 늘어질 거 같아, <br>
해당 프로젝트의 pm 이자 내 멘토 이자 사촌형인 Siner 에게 도움을 요청했고 흔쾌히 시간을 내줬다.<br>

처음 내가 물어 봤던 내용은 "flyway 를 disable 했는데도 불구하고, flyway 가 동작한다. 이거 이상하다." <br>

지금 작성하면서도 굉장히 창피한 수준의 질문인 것 같다.<br>
Siner 는 나에게 오히려 되물었다. <br>
"해당 flyway 가 어디서 동작하는지 , 코드로 찾아갈 수 있어?"<br>

나는 당황했다. <br>
분명 나도 Flyway 에 대한 이해가 필요 할 걸 알고 있었고 공식 문서를 통해 flyway 가 어떤 툴인지, <br>
어떻게 대충 동작하는지 에 대해서 봤기 때문에 <br>
파일의 이름으로 해당 파일을 인식하고 그에 대한 코드를 돌리는 식이 라는 것은 알았지만 <br>
그 내부적인 코드는 내가 구현 하지도 않았고 그 내용을 도대체 어디서 볼 수 있지? <br>
라는 생각이 가장 먼저 들었다.<br>

## 문제를 만났을 때 내가 대처했던 방법 
내가 에러를 만나고 그것을 해결 하기 위한 프로세스를 리마인드 해보면

1. 해당 오류 구글링
2. 적용 -> 실패
3. 오류 내용중 flyway keyword 찾아 다시 구글링 -> 적용 -> 실패
4. 다시 구글링 -> 적용 -> 실패
5. 반복

> 위 방법으로 당장의 눈앞에 문제는 해결 할 수 있지만, <br>
> 결국 나에게 남는것은 해당 tool 의 사용법을 암기 하는 꼴이 된다.

---
# 본론
## 문제를 만났을 때 어떤 방식으로 접근 해야 할까?
내가 어떤 문제를 만났을 때, flyway 에 대해서 구글링 하고 무지성으로 적용 하는 것이 아니라 <br>
그 문제를 먼저 분석 할 필요가 있다.<br>

예를 들어 flyway 에 대한 키워드로 문제가 발생 했다면 그냥 에러코드를 복붙 해서 구글에 붙이는 것이 아닌 <br>
왜 이런 문제가 발생 했는지 한번 생각해보고 이해해보는 시간이 필요하다. <br>

그 이해한 것을 바탕으로 찾아 봐야 하는데, 
 - 첫번째 : 구글링

> 구글링이 나쁜 것은 아니지만, 
> 
> 구글링으로 해결이 되지 않을 때도 있고, 누군가 정리 놓아야만 
> 
> 내가 알 수 있다 라는 단점이 있다.

**결국 구글링을 통한 문제 해결은 한계점이 있다.**

## 어떻게 해결 할 것인가 ? 하나의 해결법 : 오픈소스 
>"세상의 모든것은 코드로 되어있다" 라는 마인드 셋

내가 맞닥뜨린 문제를 바탕으로 예시를 들어보자면,<br>
>나는 flyway 를 실행시키지 않고 싶은데, flyway 가 실행이 된다. <br>
구글링을 통해 flyway 를 disable 시키는 방법을 알게 되었지만 어째서 인지 동작 하지 않는다.<br>

결국 구글에서 제공해주는 정보가 없으니 아무것도 하지 못하는 바보가 되어버렸다.<br>

flyway 도 코드이다. 

우리는 flyway 를 disable 시키기 위한 방법 또는 flyway 가 어떻게 실행되는지를 알기 위해

구글에서 찾는 것이 아닌 해당 코드에서 찾을 수 있어야 한다.

>flyway 는 구글로 동작하는게 아닌 해당 코드로 동작하는 프로그램이기 때문이다.

예시로 flyway 를 들었지만 우리가 사용하는 프로그램들은 모두 코드로 되어있다.

그리고 그 코드들은 대부분 github 같은 저장소에 오픈소스로 배포되어 있기 때문에 

>우리는 그 코드를 통해 우리가 쓰는 프로그램을 분석 할 수 있고, 더 나아가 내 프로그램에 맞게 튜닝 해서 사용 할 수도 있다.

**구글링의 한계점을 오픈소스를 통해 깨 부술수 있다.**

## 오픈소스 그래서 어떻게 찾아야해? - 구체적인 방법
1. 먼저 문제가 발생 하면 해당 문제를 분석하고 어떻게 해결 할 건지 정해야한다.
2. 나는 flyway 에서 "Please restore backups and roll back database and code!" 이러한 에러메세지를 넘겨 주었기 때문에 <br>
이 문장을 따라서 flyway 가 어떻게 실행 되었는지를 따라 가보려고 한다.
3. 찾고자 하는 메세지나 함수 들은 github 검색의 "in this repository" 로 간편하게 찾을 수 있다.
![](/imgs/log/opensource1.png)
4. 위 사진 처럼 해당 함수를 호출 하는 부분을 reference 로 타고타고 올라 갈 수 있다.

이렇게 github 에서도 찾을 수 있지만 ,

IDE 에서도 해당 라이브러리 내부 클래스로 볼 수도 있다. 
>더 편한 방법으로 사용하면 될 거 같다.
> 
>Intellij 파일 찾기 : cmd + shift + o

### 오픈 소스 장점
1. 구글에서 정보를 찾는 입장에서 정보를 제공하는 입장이 될 수 있다.
2. 현재 내가 처한 상황에서 최선의 선택을 할 수 있는 능력을 갖게 된다.


> 같은 프로그램을 사용하더라도, 어떤 사람이 사용 하면 좋은 퍼포먼스를 내고, 어떤 사람이 사용하면 내 서비스가 완전히 죽어버릴 수 있다.
> 
> 그 차이는 내가 사용하는 프로그램이 어떻게 동작하는지 정확히 이해하고 사용하는 사람과 단순히 이용법만 외워서 쓰는 사람의 차이 라고 생각한다.

> 프로그램이 어떻게 동작하는지 좋은 블로그나 공식문서를 통해 운 좋게 알수는 있으나, 
>
> 현재 처해진 상황이나 문제를 빠르게 정확하게 해결 하기 위해선 사용하는 프로그램을 직접 뜯어보는 능력이 필수적으로 요구 된다.

3. 툴에 의존적이지 않게 된다.
> 구글링을 통해 어찌어찌 flyway 에러를 해결 했다고 가정하자.
> 
> flyway 가 이제 legacy 프로그램이 되어서 다른 프로그램으로 교체 할때, 그 해당 프로그램도 구글링으로 쳐보면서 환경을 구축 할 것인가?
> 
> 만약 사용하고자 하는 프로그램이 나온지 얼마 안되어서 레퍼런스가 없을 경우, 오픈소스를 분석하는 능력이 있다면 어떤 툴을 쓰든 두렵지 않을 것 같다.

4. 오픈소스 기여 가능.
> 왜 기업들이 오픈소스 기여한 사람들을 좋아하는지 알게 되었다. 

---
# 결론
Siner 에게 많은 것을 배웠지만, 이번 주제 만큼은 정말 귀한 것을 배웠다고 생각한다.

개발자에게 정말 필요한 역량은 무엇일까? 라는 제목을 지은 이유는 필요한 역량중 많은 것이 있겠지만, 

오픈소스를 뜯어보는 능력도 그중 하나가 되지 않을까 생각을 한다.

시간적 리소스가 부족한 경우, 오프소스를 뜯어 보는 것 보다 구글링이 더 효율적일 때도 있을 거라 생각한다.
>모든 문제에 대해서 오픈소스를 뜯어보는 것은 하라고 해도 못할것 같다..

어느 한가지 방법이 좋다! 이 방법만 사용해라 라기 보다는 

언젠가 구글링으로 해결 할 수 없는 문제를 마주칠 경우, 해결 할 수 있어야한다.

**해결책으로 오픈소스를 뜯어서 파악 할 수 있는 능력이 있어야 한다. 그렇기에 미리 연습 해놓아야 한다. 라는 것이 핵심이다.**

>다음편은 직접 spring 오픈소스를 뜯어보면서 application.yml 이 어떻게 동작하게 되는지 실습 한 내용을 써보려고 한다.





















    






`,Tm=`---
title: "[Spring] 테스트 전용 환경 구축"
datePublished: 2022-09-08
slug: spring-test-database
tags: Spring
seoDescription: "\\"
---

~~~
2022-09-08 18:10:49.187  INFO 4935 --- [           main] o.f.core.internal.command.DbValidate     : Successfully validated 5 migrations (execution time 00:00.084s)
2022-09-08 18:10:49.231  INFO 4935 --- [           main] o.f.c.i.s.JdbcTableSchemaHistory         : Creating Schema History table "PUBLIC"."flyway_schema_history" ...
2022-09-08 18:10:49.334  INFO 4935 --- [           main] o.f.core.internal.command.DbMigrate      : Current version of schema "PUBLIC": << Empty Schema >>
2022-09-08 18:10:49.368  INFO 4935 --- [           main] o.f.core.internal.command.DbMigrate      : Migrating schema "PUBLIC" to version "1 - init ddl"
2022-09-08 18:10:49.390 ERROR 4935 --- [           main] o.f.core.internal.command.DbMigrate      : Migration of schema "PUBLIC" to version "1 - init ddl" failed! Please restore backups and roll back database and code!
2022-09-08 18:10:49.428  WARN 4935 --- [           main] o.s.w.c.s.GenericWebApplicationContext   : Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'flywayInitializer' defined in class path resource [org/springframework/boot/autoconfigure/flyway/FlywayAutoConfiguration$FlywayConfiguration.class]: Invocation of init method failed; nested exception is org.flywaydb.core.internal.command.DbMigrate$FlywayMigrateException: 
Migration V1__init_ddl.sql failed
---------------------------------
SQL State  : 42001
Error Code : 42001
Message    : Syntax error in SQL statement "CREATE TABLE USER (
                             ID CHAR(32) NOT NULL,
                             NICKNAME VARCHAR(50) NOT NULL,
                             SOCIAL_ID VARCHAR(50) NOT NULL,
                             SOCIAL_TYPE VARCHAR(20) NOT NULL,
                             CREATED_AT DATETIME(6) NOT NULL,
                             UPDATED_AT DATETIME(6) NOT NULL,
                             PRIMARY KEY (ID)
) ENGINE=[*]INNODB DEFAULT CHARSET=UTF8MB4 COLLATE=UTF8MB4_0900_AI_CI"; expected "identifier"; SQL statement:

org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'flywayInitializer' defined in class path resource [org/springframework/boot/autoconfigure/flyway/FlywayAutoConfiguration$FlywayConfiguration.class]: Invocation of init method failed; nested exception is org.flywaydb.core.internal.command.DbMigrate$FlywayMigrateException: 
Migration V1__init_ddl.sql failed
~~~


~~~
Message    : Syntax error in SQL statement "CREATE TABLE USER (
                             ID CHAR(32) NOT NULL,
                             NICKNAME VARCHAR(50) NOT NULL,
                             SOCIAL_ID VARCHAR(50) NOT NULL,
                             SOCIAL_TYPE VARCHAR(20) NOT NULL,
                             CREATED_AT DATETIME(6) NOT NULL,
                             UPDATED_AT DATETIME(6) NOT NULL,
                             PRIMARY KEY (ID)
) ENGINE=[*]INNODB DEFAULT CHARSET=UTF8MB4 COLLATE=UTF8MB4_0900_AI_CI"; expected "identifier"; SQL statement:
~~~

> yml 에 있는 flyway 랑 상관없이 동작 - docker 인가?
> 
> implementation 'org.flywaydb:flyway-core:7.10.0' 해당 코드를 빼면 실행 됨.
> 
> 즉 해당 코드가 프로젝트에 어떻게 동작하는지 이해할 필요가 있음.

##Database Seeding
>Database seeding is populating a database with an initial set of data. It's common to load seed data such as initial user accounts or dummy data upon initial setup of an application.

## Flyway
>Flyway is an open-source database migration tool
> 
> simplicity and convention 을 중요하게 여기는 database migration tool 이다.

### 기본 명령어 
Migrate, Clean, Info, Validate, Undo, Baseline and Repair.

### Migration
>Flyway 에서는 데이터베이스의 모든 변경사항을 Migration 이라고 한다.




Spring Boot jars include metadata files that provide details of all supported configuration properties. The files are designed to let IDE developers offer contextual help and “code completion” as users are working with application.properties or application.yml files.

The majority of the metadata file is generated automatically at compile time by processing all items annotated with @ConfigurationProperties. However, it is possible to write part of the metadata manually for corner cases or more advanced use cases.



`;var P={},Rc={};Object.defineProperty(Rc,"__esModule",{value:!0});var Rt={};Object.defineProperty(Rt,"__esModule",{value:!0});Rt.ErrorCodes=void 0;var nu;(function(e){e.GITHUB_API_RATE_LIMIT="GITHUB_API_RATE_LIMIT",e.GITHUB_AUTH_EXPIRED="GITHUB_AUTH_EXPIRED",e.GITHUB_PERMISSION_DENIED="GITHUB_PERMISSION_DENIED",e.CONTENT_VALIDATION_FAILED="CONTENT_VALIDATION_FAILED",e.NETWORK_ERROR="NETWORK_ERROR",e.FILE_NOT_FOUND="FILE_NOT_FOUND",e.INVALID_CONTENT_FORMAT="INVALID_CONTENT_FORMAT"})(nu||(Rt.ErrorCodes=nu={}));var Yc={};Object.defineProperty(Yc,"__esModule",{value:!0});var qe={};Object.defineProperty(qe,"__esModule",{value:!0});qe.API_ROUTES=qe.ROUTES=void 0;qe.ROUTES={HOME:"/",POSTS:"/posts",POST_DETAIL:"/posts/$slug",CATEGORIES:"/categories",CATEGORY_DETAIL:"/categories/$category",TAGS:"/tags",TAG_DETAIL:"/tags/$tag",ABOUT:"/about"};qe.API_ROUTES={POSTS:"/data/posts.json",POST_DETAIL:"/data/posts/$slug.json",CATEGORIES:"/data/categories.json",TAGS:"/data/tags.json",METADATA:"/data/metadata.json"};var Y={},ru={},au={};Object.defineProperty(Y,"__esModule",{value:!0});Y.DEFAULT_READING_SPEED=Y.SUPPORTED_IMAGE_TYPES=Y.MAX_FILE_SIZE=Y.THEMES=Y.STORAGE_KEYS=Y.CONFIG=void 0;const V=(e,r="")=>typeof process<"u"&&au?au[e]||r:typeof globalThis<"u"&&ru&&ru[e]||r;Y.CONFIG={SITE_URL:V("VITE_SITE_URL","http://localhost:5173"),SITE_TITLE:V("VITE_SITE_TITLE","정지원의 기록"),SITE_DESCRIPTION:V("VITE_SITE_DESCRIPTION","Software Engineer. Spring, AWS, 인프라를 공부하며 성장을 기록하는 공간입니다."),AUTHOR_NAME:V("VITE_AUTHOR_NAME","Jiweon Jeong"),AUTHOR_EMAIL:V("VITE_AUTHOR_EMAIL","dlektl6@naver.com"),GITHUB_REPO:V("VITE_GITHUB_REPO","JIWEON-JEONG/JIWEON-JEONG.github.io"),POSTS_PER_PAGE:parseInt(V("VITE_POSTS_PER_PAGE","10")),FEATURED_POSTS_COUNT:parseInt(V("VITE_FEATURED_POSTS_COUNT","3")),GITHUB_CLIENT_ID:V("VITE_GITHUB_CLIENT_ID",""),HASHNODE_ENABLED:V("VITE_HASHNODE_ENABLED","false")==="true",HASHNODE_PUBLICATION_ID:V("VITE_HASHNODE_PUBLICATION_ID",""),HASHNODE_API_TOKEN:V("VITE_HASHNODE_API_TOKEN",""),HASHNODE_PUBLICATION_HOST:V("VITE_HASHNODE_PUBLICATION_HOST","")};Y.STORAGE_KEYS={THEME:"q00-blog-theme",USER_PREFERENCES:"q00-blog-preferences",POSTS_CACHE:"q00-blog-posts-cache"};Y.THEMES={LIGHT:"light",DARK:"dark",SYSTEM:"system"};Y.MAX_FILE_SIZE=5*1024*1024;Y.SUPPORTED_IMAGE_TYPES=["image/jpeg","image/png","image/webp","image/gif"];Y.DEFAULT_READING_SPEED=200;var ae={},Wc={},Os={},ie={},g={};g.toDate=Im;function Im(e){const r=Object.prototype.toString.call(e);return e instanceof Date||typeof e=="object"&&r==="[object Date]"?new e.constructor(+e):typeof e=="number"||r==="[object Number]"||typeof e=="string"||r==="[object String]"?new Date(e):new Date(NaN)}var T={};T.constructFrom=Sm;function Sm(e,r){return e instanceof Date?new e.constructor(r):new Date(r)}ie.addDays=Nm;var jm=g,Em=T;function Nm(e,r){const n=(0,jm.toDate)(e);return isNaN(r)?(0,Em.constructFrom)(e,NaN):(r&&n.setDate(n.getDate()+r),n)}var Ve={};Ve.addMonths=Fm;var Am=g,iu=T;function Fm(e,r){const n=(0,Am.toDate)(e);if(isNaN(r))return(0,iu.constructFrom)(e,NaN);if(!r)return n;const a=n.getDate(),i=(0,iu.constructFrom)(e,n.getTime());i.setMonth(n.getMonth()+r+1,0);const s=i.getDate();return a>=s?i:(n.setFullYear(i.getFullYear(),i.getMonth(),a),n)}Os.add=Ym;var Cm=ie,ym=Ve,Lm=T,Rm=g;function Ym(e,r){const{years:n=0,months:a=0,weeks:i=0,days:s=0,hours:o=0,minutes:c=0,seconds:d=0}=r,l=(0,Rm.toDate)(e),f=a||n?(0,ym.addMonths)(l,a+n*12):l,m=s||i?(0,Cm.addDays)(f,s+i*7):f,h=c+o*60,p=(d+h*60)*1e3;return(0,Lm.constructFrom)(e,m.getTime()+p)}var xs={},ps={};ps.isSaturday=Hm;var Wm=g;function Hm(e){return(0,Wm.toDate)(e).getDay()===6}var Ds={};Ds.isSunday=Gm;var Bm=g;function Gm(e){return(0,Bm.toDate)(e).getDay()===0}var lt={};lt.isWeekend=zm;var Um=g;function zm(e){const r=(0,Um.toDate)(e).getDay();return r===0||r===6}xs.addBusinessDays=Xm;var qm=T,Qm=ps,Vm=Ds,Zi=lt,Zm=g;function Xm(e,r){const n=(0,Zm.toDate)(e),a=(0,Zi.isWeekend)(n);if(isNaN(r))return(0,qm.constructFrom)(e,NaN);const i=n.getHours(),s=r<0?-1:1,o=Math.trunc(r/5);n.setDate(n.getDate()+o*7);let c=Math.abs(r%5);for(;c>0;)n.setDate(n.getDate()+s),(0,Zi.isWeekend)(n)||(c-=1);return a&&(0,Zi.isWeekend)(n)&&r!==0&&((0,Qm.isSaturday)(n)&&n.setDate(n.getDate()+(s<0?2:-1)),(0,Vm.isSunday)(n)&&n.setDate(n.getDate()+(s<0?1:-2))),n.setHours(i),n}var Yt={},Ze={};Ze.addMilliseconds=km;var Km=g,Jm=T;function km(e,r){const n=+(0,Km.toDate)(e);return(0,Jm.constructFrom)(e,n+r)}var b={};b.secondsInYear=b.secondsInWeek=b.secondsInQuarter=b.secondsInMonth=b.secondsInMinute=b.secondsInHour=b.secondsInDay=b.quartersInYear=b.monthsInYear=b.monthsInQuarter=b.minutesInYear=b.minutesInMonth=b.minutesInHour=b.minutesInDay=b.minTime=b.millisecondsInWeek=b.millisecondsInSecond=b.millisecondsInMinute=b.millisecondsInHour=b.millisecondsInDay=b.maxTime=b.daysInYear=b.daysInWeek=void 0;b.daysInWeek=7;const eg=b.daysInYear=365.2425,tg=b.maxTime=Math.pow(10,8)*24*60*60*1e3;b.minTime=-tg;b.millisecondsInWeek=6048e5;b.millisecondsInDay=864e5;b.millisecondsInMinute=6e4;b.millisecondsInHour=36e5;b.millisecondsInSecond=1e3;b.minutesInYear=525600;b.minutesInMonth=43200;b.minutesInDay=1440;b.minutesInHour=60;b.monthsInQuarter=3;b.monthsInYear=12;b.quartersInYear=4;const ng=b.secondsInHour=3600;b.secondsInMinute=60;const Hc=b.secondsInDay=ng*24;b.secondsInWeek=Hc*7;const rg=b.secondsInYear=Hc*eg,ag=b.secondsInMonth=rg/12;b.secondsInQuarter=ag*3;Yt.addHours=og;var ig=Ze,sg=b;function og(e,r){return(0,ig.addMilliseconds)(e,r*sg.millisecondsInHour)}var $s={},we={},se={},ee={},B={};B.getDefaultOptions=ug;B.setDefaultOptions=cg;let Bc={};function ug(){return Bc}function cg(e){Bc=e}ee.startOfWeek=fg;var dg=g,lg=B;function fg(e,r){var c,d,l,f;const n=(0,lg.getDefaultOptions)(),a=(r==null?void 0:r.weekStartsOn)??((d=(c=r==null?void 0:r.locale)==null?void 0:c.options)==null?void 0:d.weekStartsOn)??n.weekStartsOn??((f=(l=n.locale)==null?void 0:l.options)==null?void 0:f.weekStartsOn)??0,i=(0,dg.toDate)(e),s=i.getDay(),o=(s<a?7:0)+s-a;return i.setDate(i.getDate()-o),i.setHours(0,0,0,0),i}se.startOfISOWeek=gg;var mg=ee;function gg(e){return(0,mg.startOfWeek)(e,{weekStartsOn:1})}we.getISOWeekYear=bg;var su=T,ou=se,hg=g;function bg(e){const r=(0,hg.toDate)(e),n=r.getFullYear(),a=(0,su.constructFrom)(e,0);a.setFullYear(n+1,0,4),a.setHours(0,0,0,0);const i=(0,ou.startOfISOWeek)(a),s=(0,su.constructFrom)(e,0);s.setFullYear(n,0,4),s.setHours(0,0,0,0);const o=(0,ou.startOfISOWeek)(s);return r.getTime()>=i.getTime()?n+1:r.getTime()>=o.getTime()?n:n-1}var ws={},de={},ft={};ft.startOfDay=vg;var _g=g;function vg(e){const r=(0,_g.toDate)(e);return r.setHours(0,0,0,0),r}var le={};le.getTimezoneOffsetInMilliseconds=xg;var Og=g;function xg(e){const r=(0,Og.toDate)(e),n=new Date(Date.UTC(r.getFullYear(),r.getMonth(),r.getDate(),r.getHours(),r.getMinutes(),r.getSeconds(),r.getMilliseconds()));return n.setUTCFullYear(r.getFullYear()),+e-+n}de.differenceInCalendarDays=Dg;var pg=b,uu=ft,cu=le;function Dg(e,r){const n=(0,uu.startOfDay)(e),a=(0,uu.startOfDay)(r),i=+n-(0,cu.getTimezoneOffsetInMilliseconds)(n),s=+a-(0,cu.getTimezoneOffsetInMilliseconds)(a);return Math.round((i-s)/pg.millisecondsInDay)}var Xe={};Xe.startOfISOWeekYear=Mg;var $g=we,wg=se,Pg=T;function Mg(e){const r=(0,$g.getISOWeekYear)(e),n=(0,Pg.constructFrom)(e,0);return n.setFullYear(r,0,4),n.setHours(0,0,0,0),(0,wg.startOfISOWeek)(n)}ws.setISOWeekYear=jg;var Tg=T,Ig=de,du=Xe,Sg=g;function jg(e,r){let n=(0,Sg.toDate)(e);const a=(0,Ig.differenceInCalendarDays)(n,(0,du.startOfISOWeekYear)(n)),i=(0,Tg.constructFrom)(e,0);return i.setFullYear(r,0,4),i.setHours(0,0,0,0),n=(0,du.startOfISOWeekYear)(i),n.setDate(n.getDate()+a),n}$s.addISOWeekYears=Ag;var Eg=we,Ng=ws;function Ag(e,r){return(0,Ng.setISOWeekYear)(e,(0,Eg.getISOWeekYear)(e)+r)}var Wt={};Wt.addMinutes=yg;var Fg=Ze,Cg=b;function yg(e,r){return(0,Fg.addMilliseconds)(e,r*Cg.millisecondsInMinute)}var Ht={};Ht.addQuarters=Rg;var Lg=Ve;function Rg(e,r){const n=r*3;return(0,Lg.addMonths)(e,n)}var Ps={};Ps.addSeconds=Wg;var Yg=Ze;function Wg(e,r){return(0,Yg.addMilliseconds)(e,r*1e3)}var mt={};mt.addWeeks=Bg;var Hg=ie;function Bg(e,r){const n=r*7;return(0,Hg.addDays)(e,n)}var Ms={};Ms.addYears=Ug;var Gg=Ve;function Ug(e,r){return(0,Gg.addMonths)(e,r*12)}var Gc={};Gc.areIntervalsOverlapping=zg;var Tt=g;function zg(e,r,n){const[a,i]=[+(0,Tt.toDate)(e.start),+(0,Tt.toDate)(e.end)].sort((c,d)=>c-d),[s,o]=[+(0,Tt.toDate)(r.start),+(0,Tt.toDate)(r.end)].sort((c,d)=>c-d);return n!=null&&n.inclusive?a<=o&&s<=i:a<o&&s<i}var Uc={},Ts={};Ts.max=Qg;var qg=g;function Qg(e){let r;return e.forEach(function(n){const a=(0,qg.toDate)(n);(r===void 0||r<a||isNaN(Number(a)))&&(r=a)}),r||new Date(NaN)}var Is={};Is.min=Zg;var Vg=g;function Zg(e){let r;return e.forEach(n=>{const a=(0,Vg.toDate)(n);(!r||r>a||isNaN(+a))&&(r=a)}),r||new Date(NaN)}Uc.clamp=Jg;var Xg=Ts,Kg=Is;function Jg(e,r){return(0,Kg.min)([(0,Xg.max)([e,r.start]),r.end])}var zc={};zc.closestIndexTo=kg;var lu=g;function kg(e,r){const n=(0,lu.toDate)(e);if(isNaN(Number(n)))return NaN;const a=n.getTime();let i,s;return r.forEach(function(o,c){const d=(0,lu.toDate)(o);if(isNaN(Number(d))){i=NaN,s=NaN;return}const l=Math.abs(a-d.getTime());(i==null||l<s)&&(i=c,s=l)}),i}var qc={};qc.closestTo=e0;var fu=T,mu=g;function e0(e,r){const n=(0,mu.toDate)(e);if(isNaN(Number(n)))return(0,fu.constructFrom)(e,NaN);const a=n.getTime();let i,s;return r.forEach(o=>{const c=(0,mu.toDate)(o);if(isNaN(Number(c))){i=(0,fu.constructFrom)(e,NaN),s=NaN;return}const d=Math.abs(a-c.getTime());(i==null||d<s)&&(i=c,s=d)}),i}var Se={};Se.compareAsc=t0;var gu=g;function t0(e,r){const n=(0,gu.toDate)(e),a=(0,gu.toDate)(r),i=n.getTime()-a.getTime();return i<0?-1:i>0?1:i}var Qc={};Qc.compareDesc=n0;var hu=g;function n0(e,r){const n=(0,hu.toDate)(e),a=(0,hu.toDate)(r),i=n.getTime()-a.getTime();return i>0?-1:i<0?1:i}var G={};G.constructNow=a0;var r0=T;function a0(e){return(0,r0.constructFrom)(e,Date.now())}var Vc={};Vc.daysToWeeks=s0;var i0=b;function s0(e){const r=e/i0.daysInWeek,n=Math.trunc(r);return n===0?0:n}var Zc={},Ke={};Ke.isSameDay=o0;var bu=ft;function o0(e,r){const n=(0,bu.startOfDay)(e),a=(0,bu.startOfDay)(r);return+n==+a}var fe={},Ss={};Ss.isDate=u0;function u0(e){return e instanceof Date||typeof e=="object"&&Object.prototype.toString.call(e)==="[object Date]"}fe.isValid=l0;var c0=Ss,d0=g;function l0(e){if(!(0,c0.isDate)(e)&&typeof e!="number")return!1;const r=(0,d0.toDate)(e);return!isNaN(Number(r))}Zc.differenceInBusinessDays=h0;var _u=ie,f0=de,m0=Ke,vu=fe,g0=lt,Ou=g;function h0(e,r){const n=(0,Ou.toDate)(e);let a=(0,Ou.toDate)(r);if(!(0,vu.isValid)(n)||!(0,vu.isValid)(a))return NaN;const i=(0,f0.differenceInCalendarDays)(n,a),s=i<0?-1:1,o=Math.trunc(i/7);let c=o*5;for(a=(0,_u.addDays)(a,o*7);!(0,m0.isSameDay)(n,a);)c+=(0,g0.isWeekend)(a)?0:s,a=(0,_u.addDays)(a,s);return c===0?0:c}var js={};js.differenceInCalendarISOWeekYears=b0;var xu=we;function b0(e,r){return(0,xu.getISOWeekYear)(e)-(0,xu.getISOWeekYear)(r)}var Xc={};Xc.differenceInCalendarISOWeeks=v0;var _0=b,pu=se,Du=le;function v0(e,r){const n=(0,pu.startOfISOWeek)(e),a=(0,pu.startOfISOWeek)(r),i=+n-(0,Du.getTimezoneOffsetInMilliseconds)(n),s=+a-(0,Du.getTimezoneOffsetInMilliseconds)(a);return Math.round((i-s)/_0.millisecondsInWeek)}var Bt={};Bt.differenceInCalendarMonths=O0;var $u=g;function O0(e,r){const n=(0,$u.toDate)(e),a=(0,$u.toDate)(r),i=n.getFullYear()-a.getFullYear(),s=n.getMonth()-a.getMonth();return i*12+s}var Es={},Ns={};Ns.getQuarter=p0;var x0=g;function p0(e){const r=(0,x0.toDate)(e);return Math.trunc(r.getMonth()/3)+1}Es.differenceInCalendarQuarters=D0;var wu=Ns,Pu=g;function D0(e,r){const n=(0,Pu.toDate)(e),a=(0,Pu.toDate)(r),i=n.getFullYear()-a.getFullYear(),s=(0,wu.getQuarter)(n)-(0,wu.getQuarter)(a);return i*4+s}var Gt={};Gt.differenceInCalendarWeeks=w0;var $0=b,Mu=ee,Tu=le;function w0(e,r,n){const a=(0,Mu.startOfWeek)(e,n),i=(0,Mu.startOfWeek)(r,n),s=+a-(0,Tu.getTimezoneOffsetInMilliseconds)(a),o=+i-(0,Tu.getTimezoneOffsetInMilliseconds)(i);return Math.round((s-o)/$0.millisecondsInWeek)}var Ut={};Ut.differenceInCalendarYears=P0;var Iu=g;function P0(e,r){const n=(0,Iu.toDate)(e),a=(0,Iu.toDate)(r);return n.getFullYear()-a.getFullYear()}var zt={};zt.differenceInDays=T0;var M0=de,Su=g;function T0(e,r){const n=(0,Su.toDate)(e),a=(0,Su.toDate)(r),i=ju(n,a),s=Math.abs((0,M0.differenceInCalendarDays)(n,a));n.setDate(n.getDate()-i*s);const o=+(ju(n,a)===-i),c=i*(s-o);return c===0?0:c}function ju(e,r){const n=e.getFullYear()-r.getFullYear()||e.getMonth()-r.getMonth()||e.getDate()-r.getDate()||e.getHours()-r.getHours()||e.getMinutes()-r.getMinutes()||e.getSeconds()-r.getSeconds()||e.getMilliseconds()-r.getMilliseconds();return n<0?-1:n>0?1:n}var qt={},me={};me.getRoundingMethod=I0;function I0(e){return r=>{const a=(e?Math[e]:Math.trunc)(r);return a===0?0:a}}var gt={};gt.differenceInMilliseconds=S0;var Eu=g;function S0(e,r){return+(0,Eu.toDate)(e)-+(0,Eu.toDate)(r)}qt.differenceInHours=A0;var j0=me,E0=b,N0=gt;function A0(e,r,n){const a=(0,N0.differenceInMilliseconds)(e,r)/E0.millisecondsInHour;return(0,j0.getRoundingMethod)(n==null?void 0:n.roundingMethod)(a)}var Kc={},As={};As.subISOWeekYears=C0;var F0=$s;function C0(e,r){return(0,F0.addISOWeekYears)(e,-r)}Kc.differenceInISOWeekYears=R0;var Nu=Se,y0=js,L0=As,Au=g;function R0(e,r){let n=(0,Au.toDate)(e);const a=(0,Au.toDate)(r),i=(0,Nu.compareAsc)(n,a),s=Math.abs((0,y0.differenceInCalendarISOWeekYears)(n,a));n=(0,L0.subISOWeekYears)(n,i*s);const o=+((0,Nu.compareAsc)(n,a)===-i),c=i*(s-o);return c===0?0:c}var Qt={};Qt.differenceInMinutes=B0;var Y0=me,W0=b,H0=gt;function B0(e,r,n){const a=(0,H0.differenceInMilliseconds)(e,r)/W0.millisecondsInMinute;return(0,Y0.getRoundingMethod)(n==null?void 0:n.roundingMethod)(a)}var ht={},Fs={},Vt={};Vt.endOfDay=U0;var G0=g;function U0(e){const r=(0,G0.toDate)(e);return r.setHours(23,59,59,999),r}var Zt={};Zt.endOfMonth=q0;var z0=g;function q0(e){const r=(0,z0.toDate)(e),n=r.getMonth();return r.setFullYear(r.getFullYear(),n+1,0),r.setHours(23,59,59,999),r}Fs.isLastDayOfMonth=X0;var Q0=Vt,V0=Zt,Z0=g;function X0(e){const r=(0,Z0.toDate)(e);return+(0,Q0.endOfDay)(r)==+(0,V0.endOfMonth)(r)}ht.differenceInMonths=k0;var Xi=Se,K0=Bt,J0=Fs,Ki=g;function k0(e,r){const n=(0,Ki.toDate)(e),a=(0,Ki.toDate)(r),i=(0,Xi.compareAsc)(n,a),s=Math.abs((0,K0.differenceInCalendarMonths)(n,a));let o;if(s<1)o=0;else{n.getMonth()===1&&n.getDate()>27&&n.setDate(30),n.setMonth(n.getMonth()-i*s);let c=(0,Xi.compareAsc)(n,a)===-i;(0,J0.isLastDayOfMonth)((0,Ki.toDate)(e))&&s===1&&(0,Xi.compareAsc)(e,a)===1&&(c=!1),o=i*(s-Number(c))}return o===0?0:o}var Jc={};Jc.differenceInQuarters=nh;var eh=me,th=ht;function nh(e,r,n){const a=(0,th.differenceInMonths)(e,r)/3;return(0,eh.getRoundingMethod)(n==null?void 0:n.roundingMethod)(a)}var bt={};bt.differenceInSeconds=ih;var rh=me,ah=gt;function ih(e,r,n){const a=(0,ah.differenceInMilliseconds)(e,r)/1e3;return(0,rh.getRoundingMethod)(n==null?void 0:n.roundingMethod)(a)}var kc={};kc.differenceInWeeks=uh;var sh=me,oh=zt;function uh(e,r,n){const a=(0,oh.differenceInDays)(e,r)/7;return(0,sh.getRoundingMethod)(n==null?void 0:n.roundingMethod)(a)}var Cs={};Cs.differenceInYears=dh;var Fu=Se,ch=Ut,Cu=g;function dh(e,r){const n=(0,Cu.toDate)(e),a=(0,Cu.toDate)(r),i=(0,Fu.compareAsc)(n,a),s=Math.abs((0,ch.differenceInCalendarYears)(n,a));n.setFullYear(1584),a.setFullYear(1584);const o=(0,Fu.compareAsc)(n,a)===-i,c=i*(s-+o);return c===0?0:c}var ys={};ys.eachDayOfInterval=lh;var Ji=g;function lh(e,r){const n=(0,Ji.toDate)(e.start),a=(0,Ji.toDate)(e.end);let i=+n>+a;const s=i?+n:+a,o=i?a:n;o.setHours(0,0,0,0);let c=(r==null?void 0:r.step)??1;if(!c)return[];c<0&&(c=-c,i=!i);const d=[];for(;+o<=s;)d.push((0,Ji.toDate)(o)),o.setDate(o.getDate()+c),o.setHours(0,0,0,0);return i?d.reverse():d}var ed={};ed.eachHourOfInterval=mh;var fh=Yt,ki=g;function mh(e,r){const n=(0,ki.toDate)(e.start),a=(0,ki.toDate)(e.end);let i=+n>+a;const s=i?+n:+a;let o=i?a:n;o.setMinutes(0,0,0);let c=(r==null?void 0:r.step)??1;if(!c)return[];c<0&&(c=-c,i=!i);const d=[];for(;+o<=s;)d.push((0,ki.toDate)(o)),o=(0,fh.addHours)(o,c);return i?d.reverse():d}var td={},Xt={};Xt.startOfMinute=hh;var gh=g;function hh(e){const r=(0,gh.toDate)(e);return r.setSeconds(0,0),r}td.eachMinuteOfInterval=vh;var bh=Wt,_h=Xt,es=g;function vh(e,r){const n=(0,_h.startOfMinute)((0,es.toDate)(e.start)),a=(0,es.toDate)(e.end);let i=+n>+a;const s=i?+n:+a;let o=i?a:n,c=(r==null?void 0:r.step)??1;if(!c)return[];c<0&&(c=-c,i=!i);const d=[];for(;+o<=s;)d.push((0,es.toDate)(o)),o=(0,bh.addMinutes)(o,c);return i?d.reverse():d}var nd={};nd.eachMonthOfInterval=Oh;var ts=g;function Oh(e,r){const n=(0,ts.toDate)(e.start),a=(0,ts.toDate)(e.end);let i=+n>+a;const s=i?+n:+a,o=i?a:n;o.setHours(0,0,0,0),o.setDate(1);let c=(r==null?void 0:r.step)??1;if(!c)return[];c<0&&(c=-c,i=!i);const d=[];for(;+o<=s;)d.push((0,ts.toDate)(o)),o.setMonth(o.getMonth()+c);return i?d.reverse():d}var rd={},Kt={};Kt.startOfQuarter=ph;var xh=g;function ph(e){const r=(0,xh.toDate)(e),n=r.getMonth(),a=n-n%3;return r.setMonth(a,1),r.setHours(0,0,0,0),r}rd.eachQuarterOfInterval=$h;var Dh=Ht,It=Kt,ns=g;function $h(e,r){const n=(0,ns.toDate)(e.start),a=(0,ns.toDate)(e.end);let i=+n>+a;const s=i?+(0,It.startOfQuarter)(n):+(0,It.startOfQuarter)(a);let o=i?(0,It.startOfQuarter)(a):(0,It.startOfQuarter)(n),c=(r==null?void 0:r.step)??1;if(!c)return[];c<0&&(c=-c,i=!i);const d=[];for(;+o<=s;)d.push((0,ns.toDate)(o)),o=(0,Dh.addQuarters)(o,c);return i?d.reverse():d}var ad={};ad.eachWeekOfInterval=Ph;var wh=mt,St=ee,rs=g;function Ph(e,r){const n=(0,rs.toDate)(e.start),a=(0,rs.toDate)(e.end);let i=+n>+a;const s=i?(0,St.startOfWeek)(a,r):(0,St.startOfWeek)(n,r),o=i?(0,St.startOfWeek)(n,r):(0,St.startOfWeek)(a,r);s.setHours(15),o.setHours(15);const c=+o.getTime();let d=s,l=(r==null?void 0:r.step)??1;if(!l)return[];l<0&&(l=-l,i=!i);const f=[];for(;+d<=c;)d.setHours(0),f.push((0,rs.toDate)(d)),d=(0,wh.addWeeks)(d,l),d.setHours(15);return i?f.reverse():f}var Jt={};Jt.eachWeekendOfInterval=Ih;var Mh=ys,Th=lt;function Ih(e){const r=(0,Mh.eachDayOfInterval)(e),n=[];let a=0;for(;a<r.length;){const i=r[a++];(0,Th.isWeekend)(i)&&n.push(i)}return n}var id={},_t={};_t.startOfMonth=jh;var Sh=g;function jh(e){const r=(0,Sh.toDate)(e);return r.setDate(1),r.setHours(0,0,0,0),r}id.eachWeekendOfMonth=Fh;var Eh=Jt,Nh=Zt,Ah=_t;function Fh(e){const r=(0,Ah.startOfMonth)(e),n=(0,Nh.endOfMonth)(e);return(0,Eh.eachWeekendOfInterval)({start:r,end:n})}var sd={},Ls={};Ls.endOfYear=yh;var Ch=g;function yh(e){const r=(0,Ch.toDate)(e),n=r.getFullYear();return r.setFullYear(n+1,0,0),r.setHours(23,59,59,999),r}var kt={};kt.startOfYear=Yh;var Lh=g,Rh=T;function Yh(e){const r=(0,Lh.toDate)(e),n=(0,Rh.constructFrom)(e,0);return n.setFullYear(r.getFullYear(),0,1),n.setHours(0,0,0,0),n}sd.eachWeekendOfYear=Gh;var Wh=Jt,Hh=Ls,Bh=kt;function Gh(e){const r=(0,Bh.startOfYear)(e),n=(0,Hh.endOfYear)(e);return(0,Wh.eachWeekendOfInterval)({start:r,end:n})}var od={};od.eachYearOfInterval=Uh;var as=g;function Uh(e,r){const n=(0,as.toDate)(e.start),a=(0,as.toDate)(e.end);let i=+n>+a;const s=i?+n:+a,o=i?a:n;o.setHours(0,0,0,0),o.setMonth(0,1);let c=(r==null?void 0:r.step)??1;if(!c)return[];c<0&&(c=-c,i=!i);const d=[];for(;+o<=s;)d.push((0,as.toDate)(o)),o.setFullYear(o.getFullYear()+c);return i?d.reverse():d}var ud={};ud.endOfDecade=qh;var zh=g;function qh(e){const r=(0,zh.toDate)(e),n=r.getFullYear(),a=9+Math.floor(n/10)*10;return r.setFullYear(a,11,31),r.setHours(23,59,59,999),r}var cd={};cd.endOfHour=Vh;var Qh=g;function Vh(e){const r=(0,Qh.toDate)(e);return r.setMinutes(59,59,999),r}var dd={},Rs={};Rs.endOfWeek=Kh;var Zh=g,Xh=B;function Kh(e,r){var c,d,l,f;const n=(0,Xh.getDefaultOptions)(),a=(r==null?void 0:r.weekStartsOn)??((d=(c=r==null?void 0:r.locale)==null?void 0:c.options)==null?void 0:d.weekStartsOn)??n.weekStartsOn??((f=(l=n.locale)==null?void 0:l.options)==null?void 0:f.weekStartsOn)??0,i=(0,Zh.toDate)(e),s=i.getDay(),o=(s<a?-7:0)+6-(s-a);return i.setDate(i.getDate()+o),i.setHours(23,59,59,999),i}dd.endOfISOWeek=kh;var Jh=Rs;function kh(e){return(0,Jh.endOfWeek)(e,{weekStartsOn:1})}var ld={};ld.endOfISOWeekYear=rb;var eb=we,tb=se,nb=T;function rb(e){const r=(0,eb.getISOWeekYear)(e),n=(0,nb.constructFrom)(e,0);n.setFullYear(r+1,0,4),n.setHours(0,0,0,0);const a=(0,tb.startOfISOWeek)(n);return a.setMilliseconds(a.getMilliseconds()-1),a}var fd={};fd.endOfMinute=ib;var ab=g;function ib(e){const r=(0,ab.toDate)(e);return r.setSeconds(59,999),r}var md={};md.endOfQuarter=ob;var sb=g;function ob(e){const r=(0,sb.toDate)(e),n=r.getMonth(),a=n-n%3+3;return r.setMonth(a,0),r.setHours(23,59,59,999),r}var gd={};gd.endOfSecond=cb;var ub=g;function cb(e){const r=(0,ub.toDate)(e);return r.setMilliseconds(999),r}var hd={};hd.endOfToday=lb;var db=Vt;function lb(){return(0,db.endOfDay)(Date.now())}var bd={};bd.endOfTomorrow=fb;function fb(){const e=new Date,r=e.getFullYear(),n=e.getMonth(),a=e.getDate(),i=new Date(0);return i.setFullYear(r,n,a+1),i.setHours(23,59,59,999),i}var _d={};_d.endOfYesterday=mb;function mb(){const e=new Date,r=e.getFullYear(),n=e.getMonth(),a=e.getDate(),i=new Date(0);return i.setFullYear(r,n,a-1),i.setHours(23,59,59,999),i}var Ys={},je={},Ws={},Hs={};Hs.formatDistance=void 0;const gb={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},hb=(e,r,n)=>{let a;const i=gb[e];return typeof i=="string"?a=i:r===1?a=i.one:a=i.other.replace("{{count}}",r.toString()),n!=null&&n.addSuffix?n.comparison&&n.comparison>0?"in "+a:a+" ago":a};Hs.formatDistance=hb;var Bs={},vd={};vd.buildFormatLongFn=bb;function bb(e){return(r={})=>{const n=r.width?String(r.width):e.defaultWidth;return e.formats[n]||e.formats[e.defaultWidth]}}Bs.formatLong=void 0;var is=vd;const _b={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},vb={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},Ob={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"};Bs.formatLong={date:(0,is.buildFormatLongFn)({formats:_b,defaultWidth:"full"}),time:(0,is.buildFormatLongFn)({formats:vb,defaultWidth:"full"}),dateTime:(0,is.buildFormatLongFn)({formats:Ob,defaultWidth:"full"})};var Gs={};Gs.formatRelative=void 0;const xb={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},pb=(e,r,n,a)=>xb[e];Gs.formatRelative=pb;var Us={},Od={};Od.buildLocalizeFn=Db;function Db(e){return(r,n)=>{const a=n!=null&&n.context?String(n.context):"standalone";let i;if(a==="formatting"&&e.formattingValues){const o=e.defaultFormattingWidth||e.defaultWidth,c=n!=null&&n.width?String(n.width):o;i=e.formattingValues[c]||e.formattingValues[o]}else{const o=e.defaultWidth,c=n!=null&&n.width?String(n.width):e.defaultWidth;i=e.values[c]||e.values[o]}const s=e.argumentCallback?e.argumentCallback(r):r;return i[s]}}Us.localize=void 0;var Je=Od;const $b={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},wb={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},Pb={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},Mb={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},Tb={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},Ib={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},Sb=(e,r)=>{const n=Number(e),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"};Us.localize={ordinalNumber:Sb,era:(0,Je.buildLocalizeFn)({values:$b,defaultWidth:"wide"}),quarter:(0,Je.buildLocalizeFn)({values:wb,defaultWidth:"wide",argumentCallback:e=>e-1}),month:(0,Je.buildLocalizeFn)({values:Pb,defaultWidth:"wide"}),day:(0,Je.buildLocalizeFn)({values:Mb,defaultWidth:"wide"}),dayPeriod:(0,Je.buildLocalizeFn)({values:Tb,defaultWidth:"wide",formattingValues:Ib,defaultFormattingWidth:"wide"})};var zs={},xd={};xd.buildMatchFn=jb;function jb(e){return(r,n={})=>{const a=n.width,i=a&&e.matchPatterns[a]||e.matchPatterns[e.defaultMatchWidth],s=r.match(i);if(!s)return null;const o=s[0],c=a&&e.parsePatterns[a]||e.parsePatterns[e.defaultParseWidth],d=Array.isArray(c)?Nb(c,m=>m.test(o)):Eb(c,m=>m.test(o));let l;l=e.valueCallback?e.valueCallback(d):d,l=n.valueCallback?n.valueCallback(l):l;const f=r.slice(o.length);return{value:l,rest:f}}}function Eb(e,r){for(const n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&r(e[n]))return n}function Nb(e,r){for(let n=0;n<e.length;n++)if(r(e[n]))return n}var pd={};pd.buildMatchPatternFn=Ab;function Ab(e){return(r,n={})=>{const a=r.match(e.matchPattern);if(!a)return null;const i=a[0],s=r.match(e.parsePattern);if(!s)return null;let o=e.valueCallback?e.valueCallback(s[0]):s[0];o=n.valueCallback?n.valueCallback(o):o;const c=r.slice(i.length);return{value:o,rest:c}}}zs.match=void 0;var ke=xd,Fb=pd;const Cb=/^(\d+)(th|st|nd|rd)?/i,yb=/\d+/i,Lb={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},Rb={any:[/^b/i,/^(a|c)/i]},Yb={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},Wb={any:[/1/i,/2/i,/3/i,/4/i]},Hb={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},Bb={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},Gb={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},Ub={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},zb={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},qb={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}};zs.match={ordinalNumber:(0,Fb.buildMatchPatternFn)({matchPattern:Cb,parsePattern:yb,valueCallback:e=>parseInt(e,10)}),era:(0,ke.buildMatchFn)({matchPatterns:Lb,defaultMatchWidth:"wide",parsePatterns:Rb,defaultParseWidth:"any"}),quarter:(0,ke.buildMatchFn)({matchPatterns:Yb,defaultMatchWidth:"wide",parsePatterns:Wb,defaultParseWidth:"any",valueCallback:e=>e+1}),month:(0,ke.buildMatchFn)({matchPatterns:Hb,defaultMatchWidth:"wide",parsePatterns:Bb,defaultParseWidth:"any"}),day:(0,ke.buildMatchFn)({matchPatterns:Gb,defaultMatchWidth:"wide",parsePatterns:Ub,defaultParseWidth:"any"}),dayPeriod:(0,ke.buildMatchFn)({matchPatterns:zb,defaultMatchWidth:"any",parsePatterns:qb,defaultParseWidth:"any"})};Ws.enUS=void 0;var Qb=Hs,Vb=Bs,Zb=Gs,Xb=Us,Kb=zs;Ws.enUS={code:"en-US",formatDistance:Qb.formatDistance,formatLong:Vb.formatLong,formatRelative:Zb.formatRelative,localize:Xb.localize,match:Kb.match,options:{weekStartsOn:0,firstWeekContainsDate:1}};(function(e){Object.defineProperty(e,"defaultLocale",{enumerable:!0,get:function(){return r.enUS}});var r=Ws})(je);var qs={},Qs={};Qs.getDayOfYear=t_;var Jb=de,kb=kt,e_=g;function t_(e){const r=(0,e_.toDate)(e);return(0,Jb.differenceInCalendarDays)(r,(0,kb.startOfYear)(r))+1}var en={};en.getISOWeek=s_;var n_=b,r_=se,a_=Xe,i_=g;function s_(e){const r=(0,i_.toDate)(e),n=+(0,r_.startOfISOWeek)(r)-+(0,a_.startOfISOWeekYear)(r);return Math.round(n/n_.millisecondsInWeek)+1}var tn={},nn={},vt={};vt.getWeekYear=c_;var yu=T,Lu=ee,o_=g,u_=B;function c_(e,r){var f,m,h,_;const n=(0,o_.toDate)(e),a=n.getFullYear(),i=(0,u_.getDefaultOptions)(),s=(r==null?void 0:r.firstWeekContainsDate)??((m=(f=r==null?void 0:r.locale)==null?void 0:f.options)==null?void 0:m.firstWeekContainsDate)??i.firstWeekContainsDate??((_=(h=i.locale)==null?void 0:h.options)==null?void 0:_.firstWeekContainsDate)??1,o=(0,yu.constructFrom)(e,0);o.setFullYear(a+1,0,s),o.setHours(0,0,0,0);const c=(0,Lu.startOfWeek)(o,r),d=(0,yu.constructFrom)(e,0);d.setFullYear(a,0,s),d.setHours(0,0,0,0);const l=(0,Lu.startOfWeek)(d,r);return n.getTime()>=c.getTime()?a+1:n.getTime()>=l.getTime()?a:a-1}nn.startOfWeekYear=g_;var d_=T,l_=vt,f_=ee,m_=B;function g_(e,r){var c,d,l,f;const n=(0,m_.getDefaultOptions)(),a=(r==null?void 0:r.firstWeekContainsDate)??((d=(c=r==null?void 0:r.locale)==null?void 0:c.options)==null?void 0:d.firstWeekContainsDate)??n.firstWeekContainsDate??((f=(l=n.locale)==null?void 0:l.options)==null?void 0:f.firstWeekContainsDate)??1,i=(0,l_.getWeekYear)(e,r),s=(0,d_.constructFrom)(e,0);return s.setFullYear(i,0,a),s.setHours(0,0,0,0),(0,f_.startOfWeek)(s,r)}tn.getWeek=O_;var h_=b,b_=ee,__=nn,v_=g;function O_(e,r){const n=(0,v_.toDate)(e),a=+(0,b_.startOfWeek)(n,r)-+(0,__.startOfWeekYear)(n,r);return Math.round(a/h_.millisecondsInWeek)+1}var Ee={};Ee.addLeadingZeros=x_;function x_(e,r){const n=e<0?"-":"",a=Math.abs(e).toString().padStart(r,"0");return n+a}var rn={};rn.lightFormatters=void 0;var _e=Ee;rn.lightFormatters={y(e,r){const n=e.getFullYear(),a=n>0?n:1-n;return(0,_e.addLeadingZeros)(r==="yy"?a%100:a,r.length)},M(e,r){const n=e.getMonth();return r==="M"?String(n+1):(0,_e.addLeadingZeros)(n+1,2)},d(e,r){return(0,_e.addLeadingZeros)(e.getDate(),r.length)},a(e,r){const n=e.getHours()/12>=1?"pm":"am";switch(r){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];case"aaaa":default:return n==="am"?"a.m.":"p.m."}},h(e,r){return(0,_e.addLeadingZeros)(e.getHours()%12||12,r.length)},H(e,r){return(0,_e.addLeadingZeros)(e.getHours(),r.length)},m(e,r){return(0,_e.addLeadingZeros)(e.getMinutes(),r.length)},s(e,r){return(0,_e.addLeadingZeros)(e.getSeconds(),r.length)},S(e,r){const n=r.length,a=e.getMilliseconds(),i=Math.trunc(a*Math.pow(10,n-3));return(0,_e.addLeadingZeros)(i,r.length)}};qs.formatters=void 0;var p_=Qs,D_=en,$_=we,w_=tn,P_=vt,y=Ee,ve=rn;const He={midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"};qs.formatters={G:function(e,r,n){const a=e.getFullYear()>0?1:0;switch(r){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});case"GGGG":default:return n.era(a,{width:"wide"})}},y:function(e,r,n){if(r==="yo"){const a=e.getFullYear(),i=a>0?a:1-a;return n.ordinalNumber(i,{unit:"year"})}return ve.lightFormatters.y(e,r)},Y:function(e,r,n,a){const i=(0,P_.getWeekYear)(e,a),s=i>0?i:1-i;if(r==="YY"){const o=s%100;return(0,y.addLeadingZeros)(o,2)}return r==="Yo"?n.ordinalNumber(s,{unit:"year"}):(0,y.addLeadingZeros)(s,r.length)},R:function(e,r){const n=(0,$_.getISOWeekYear)(e);return(0,y.addLeadingZeros)(n,r.length)},u:function(e,r){const n=e.getFullYear();return(0,y.addLeadingZeros)(n,r.length)},Q:function(e,r,n){const a=Math.ceil((e.getMonth()+1)/3);switch(r){case"Q":return String(a);case"QQ":return(0,y.addLeadingZeros)(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(e,r,n){const a=Math.ceil((e.getMonth()+1)/3);switch(r){case"q":return String(a);case"qq":return(0,y.addLeadingZeros)(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(e,r,n){const a=e.getMonth();switch(r){case"M":case"MM":return ve.lightFormatters.M(e,r);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(e,r,n){const a=e.getMonth();switch(r){case"L":return String(a+1);case"LL":return(0,y.addLeadingZeros)(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(e,r,n,a){const i=(0,w_.getWeek)(e,a);return r==="wo"?n.ordinalNumber(i,{unit:"week"}):(0,y.addLeadingZeros)(i,r.length)},I:function(e,r,n){const a=(0,D_.getISOWeek)(e);return r==="Io"?n.ordinalNumber(a,{unit:"week"}):(0,y.addLeadingZeros)(a,r.length)},d:function(e,r,n){return r==="do"?n.ordinalNumber(e.getDate(),{unit:"date"}):ve.lightFormatters.d(e,r)},D:function(e,r,n){const a=(0,p_.getDayOfYear)(e);return r==="Do"?n.ordinalNumber(a,{unit:"dayOfYear"}):(0,y.addLeadingZeros)(a,r.length)},E:function(e,r,n){const a=e.getDay();switch(r){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});case"EEEE":default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(e,r,n,a){const i=e.getDay(),s=(i-a.weekStartsOn+8)%7||7;switch(r){case"e":return String(s);case"ee":return(0,y.addLeadingZeros)(s,2);case"eo":return n.ordinalNumber(s,{unit:"day"});case"eee":return n.day(i,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(i,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(i,{width:"short",context:"formatting"});case"eeee":default:return n.day(i,{width:"wide",context:"formatting"})}},c:function(e,r,n,a){const i=e.getDay(),s=(i-a.weekStartsOn+8)%7||7;switch(r){case"c":return String(s);case"cc":return(0,y.addLeadingZeros)(s,r.length);case"co":return n.ordinalNumber(s,{unit:"day"});case"ccc":return n.day(i,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(i,{width:"narrow",context:"standalone"});case"cccccc":return n.day(i,{width:"short",context:"standalone"});case"cccc":default:return n.day(i,{width:"wide",context:"standalone"})}},i:function(e,r,n){const a=e.getDay(),i=a===0?7:a;switch(r){case"i":return String(i);case"ii":return(0,y.addLeadingZeros)(i,r.length);case"io":return n.ordinalNumber(i,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});case"iiii":default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(e,r,n){const i=e.getHours()/12>=1?"pm":"am";switch(r){case"a":case"aa":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(i,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(i,{width:"wide",context:"formatting"})}},b:function(e,r,n){const a=e.getHours();let i;switch(a===12?i=He.noon:a===0?i=He.midnight:i=a/12>=1?"pm":"am",r){case"b":case"bb":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(i,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(i,{width:"wide",context:"formatting"})}},B:function(e,r,n){const a=e.getHours();let i;switch(a>=17?i=He.evening:a>=12?i=He.afternoon:a>=4?i=He.morning:i=He.night,r){case"B":case"BB":case"BBB":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(i,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(i,{width:"wide",context:"formatting"})}},h:function(e,r,n){if(r==="ho"){let a=e.getHours()%12;return a===0&&(a=12),n.ordinalNumber(a,{unit:"hour"})}return ve.lightFormatters.h(e,r)},H:function(e,r,n){return r==="Ho"?n.ordinalNumber(e.getHours(),{unit:"hour"}):ve.lightFormatters.H(e,r)},K:function(e,r,n){const a=e.getHours()%12;return r==="Ko"?n.ordinalNumber(a,{unit:"hour"}):(0,y.addLeadingZeros)(a,r.length)},k:function(e,r,n){let a=e.getHours();return a===0&&(a=24),r==="ko"?n.ordinalNumber(a,{unit:"hour"}):(0,y.addLeadingZeros)(a,r.length)},m:function(e,r,n){return r==="mo"?n.ordinalNumber(e.getMinutes(),{unit:"minute"}):ve.lightFormatters.m(e,r)},s:function(e,r,n){return r==="so"?n.ordinalNumber(e.getSeconds(),{unit:"second"}):ve.lightFormatters.s(e,r)},S:function(e,r){return ve.lightFormatters.S(e,r)},X:function(e,r,n){const a=e.getTimezoneOffset();if(a===0)return"Z";switch(r){case"X":return Yu(a);case"XXXX":case"XX":return Ie(a);case"XXXXX":case"XXX":default:return Ie(a,":")}},x:function(e,r,n){const a=e.getTimezoneOffset();switch(r){case"x":return Yu(a);case"xxxx":case"xx":return Ie(a);case"xxxxx":case"xxx":default:return Ie(a,":")}},O:function(e,r,n){const a=e.getTimezoneOffset();switch(r){case"O":case"OO":case"OOO":return"GMT"+Ru(a,":");case"OOOO":default:return"GMT"+Ie(a,":")}},z:function(e,r,n){const a=e.getTimezoneOffset();switch(r){case"z":case"zz":case"zzz":return"GMT"+Ru(a,":");case"zzzz":default:return"GMT"+Ie(a,":")}},t:function(e,r,n){const a=Math.trunc(e.getTime()/1e3);return(0,y.addLeadingZeros)(a,r.length)},T:function(e,r,n){const a=e.getTime();return(0,y.addLeadingZeros)(a,r.length)}};function Ru(e,r=""){const n=e>0?"-":"+",a=Math.abs(e),i=Math.trunc(a/60),s=a%60;return s===0?n+String(i):n+String(i)+r+(0,y.addLeadingZeros)(s,2)}function Yu(e,r){return e%60===0?(e>0?"-":"+")+(0,y.addLeadingZeros)(Math.abs(e)/60,2):Ie(e,r)}function Ie(e,r=""){const n=e>0?"-":"+",a=Math.abs(e),i=(0,y.addLeadingZeros)(Math.trunc(a/60),2),s=(0,y.addLeadingZeros)(a%60,2);return n+i+r+s}var an={};an.longFormatters=void 0;const Wu=(e,r)=>{switch(e){case"P":return r.date({width:"short"});case"PP":return r.date({width:"medium"});case"PPP":return r.date({width:"long"});case"PPPP":default:return r.date({width:"full"})}},Dd=(e,r)=>{switch(e){case"p":return r.time({width:"short"});case"pp":return r.time({width:"medium"});case"ppp":return r.time({width:"long"});case"pppp":default:return r.time({width:"full"})}},M_=(e,r)=>{const n=e.match(/(P+)(p+)?/)||[],a=n[1],i=n[2];if(!i)return Wu(e,r);let s;switch(a){case"P":s=r.dateTime({width:"short"});break;case"PP":s=r.dateTime({width:"medium"});break;case"PPP":s=r.dateTime({width:"long"});break;case"PPPP":default:s=r.dateTime({width:"full"});break}return s.replace("{{date}}",Wu(a,r)).replace("{{time}}",Dd(i,r))};an.longFormatters={p:Dd,P:M_};var Ot={};Ot.isProtectedDayOfYearToken=j_;Ot.isProtectedWeekYearToken=E_;Ot.warnOrThrowProtectedError=N_;const T_=/^D+$/,I_=/^Y+$/,S_=["D","DD","YY","YYYY"];function j_(e){return T_.test(e)}function E_(e){return I_.test(e)}function N_(e,r,n){const a=A_(e,r,n);if(console.warn(a),S_.includes(e))throw new RangeError(a)}function A_(e,r,n){const a=e[0]==="Y"?"years":"days of the month";return`Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${r}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}(function(e){e.format=e.formatDate=_,Object.defineProperty(e,"formatters",{enumerable:!0,get:function(){return a.formatters}}),Object.defineProperty(e,"longFormatters",{enumerable:!0,get:function(){return i.longFormatters}});var r=je,n=B,a=qs,i=an,s=Ot,o=fe,c=g;const d=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,l=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,f=/^'([^]*?)'?$/,m=/''/g,h=/[a-zA-Z]/;function _(O,D,x){var F,Z,te,X,be,Q,oe,ue;const S=(0,n.getDefaultOptions)(),N=(x==null?void 0:x.locale)??S.locale??r.defaultLocale,j=(x==null?void 0:x.firstWeekContainsDate)??((Z=(F=x==null?void 0:x.locale)==null?void 0:F.options)==null?void 0:Z.firstWeekContainsDate)??S.firstWeekContainsDate??((X=(te=S.locale)==null?void 0:te.options)==null?void 0:X.firstWeekContainsDate)??1,z=(x==null?void 0:x.weekStartsOn)??((Q=(be=x==null?void 0:x.locale)==null?void 0:be.options)==null?void 0:Q.weekStartsOn)??S.weekStartsOn??((ue=(oe=S.locale)==null?void 0:oe.options)==null?void 0:ue.weekStartsOn)??0,q=(0,c.toDate)(O);if(!(0,o.isValid)(q))throw new RangeError("Invalid time value");let J=D.match(l).map(L=>{const C=L[0];if(C==="p"||C==="P"){const ne=i.longFormatters[C];return ne(L,N.formatLong)}return L}).join("").match(d).map(L=>{if(L==="''")return{isToken:!1,value:"'"};const C=L[0];if(C==="'")return{isToken:!1,value:p(L)};if(a.formatters[C])return{isToken:!0,value:L};if(C.match(h))throw new RangeError("Format string contains an unescaped latin alphabet character `"+C+"`");return{isToken:!1,value:L}});N.localize.preprocessor&&(J=N.localize.preprocessor(q,J));const A={firstWeekContainsDate:j,weekStartsOn:z,locale:N};return J.map(L=>{if(!L.isToken)return L.value;const C=L.value;(!(x!=null&&x.useAdditionalWeekYearTokens)&&(0,s.isProtectedWeekYearToken)(C)||!(x!=null&&x.useAdditionalDayOfYearTokens)&&(0,s.isProtectedDayOfYearToken)(C))&&(0,s.warnOrThrowProtectedError)(C,D,String(O));const ne=a.formatters[C[0]];return ne(q,C,N.localize,A)}).join("")}function p(O){const D=O.match(f);return D?D[1].replace(m,"'"):O}})(Ys);var Vs={};Vs.formatDistance=Y_;var F_=Se,Be=b,C_=ht,y_=bt,jt=g,L_=je,R_=B,Hu=le;function Y_(e,r,n){const a=(0,R_.getDefaultOptions)(),i=(n==null?void 0:n.locale)??a.locale??L_.defaultLocale,s=2520,o=(0,F_.compareAsc)(e,r);if(isNaN(o))throw new RangeError("Invalid time value");const c=Object.assign({},n,{addSuffix:n==null?void 0:n.addSuffix,comparison:o});let d,l;o>0?(d=(0,jt.toDate)(r),l=(0,jt.toDate)(e)):(d=(0,jt.toDate)(e),l=(0,jt.toDate)(r));const f=(0,y_.differenceInSeconds)(l,d),m=((0,Hu.getTimezoneOffsetInMilliseconds)(l)-(0,Hu.getTimezoneOffsetInMilliseconds)(d))/1e3,h=Math.round((f-m)/60);let _;if(h<2)return n!=null&&n.includeSeconds?f<5?i.formatDistance("lessThanXSeconds",5,c):f<10?i.formatDistance("lessThanXSeconds",10,c):f<20?i.formatDistance("lessThanXSeconds",20,c):f<40?i.formatDistance("halfAMinute",0,c):f<60?i.formatDistance("lessThanXMinutes",1,c):i.formatDistance("xMinutes",1,c):h===0?i.formatDistance("lessThanXMinutes",1,c):i.formatDistance("xMinutes",h,c);if(h<45)return i.formatDistance("xMinutes",h,c);if(h<90)return i.formatDistance("aboutXHours",1,c);if(h<Be.minutesInDay){const p=Math.round(h/60);return i.formatDistance("aboutXHours",p,c)}else{if(h<s)return i.formatDistance("xDays",1,c);if(h<Be.minutesInMonth){const p=Math.round(h/Be.minutesInDay);return i.formatDistance("xDays",p,c)}else if(h<Be.minutesInMonth*2)return _=Math.round(h/Be.minutesInMonth),i.formatDistance("aboutXMonths",_,c)}if(_=(0,C_.differenceInMonths)(l,d),_<12){const p=Math.round(h/Be.minutesInMonth);return i.formatDistance("xMonths",p,c)}else{const p=_%12,O=Math.trunc(_/12);return p<3?i.formatDistance("aboutXYears",O,c):p<9?i.formatDistance("overXYears",O,c):i.formatDistance("almostXYears",O+1,c)}}var Zs={};Zs.formatDistanceStrict=U_;var W_=je,H_=B,B_=me,Bu=le,G_=Se,Oe=b,Et=g;function U_(e,r,n){const a=(0,H_.getDefaultOptions)(),i=(n==null?void 0:n.locale)??a.locale??W_.defaultLocale,s=(0,G_.compareAsc)(e,r);if(isNaN(s))throw new RangeError("Invalid time value");const o=Object.assign({},n,{addSuffix:n==null?void 0:n.addSuffix,comparison:s});let c,d;s>0?(c=(0,Et.toDate)(r),d=(0,Et.toDate)(e)):(c=(0,Et.toDate)(e),d=(0,Et.toDate)(r));const l=(0,B_.getRoundingMethod)((n==null?void 0:n.roundingMethod)??"round"),f=d.getTime()-c.getTime(),m=f/Oe.millisecondsInMinute,h=(0,Bu.getTimezoneOffsetInMilliseconds)(d)-(0,Bu.getTimezoneOffsetInMilliseconds)(c),_=(f-h)/Oe.millisecondsInMinute,p=n==null?void 0:n.unit;let O;if(p?O=p:m<1?O="second":m<60?O="minute":m<Oe.minutesInDay?O="hour":_<Oe.minutesInMonth?O="day":_<Oe.minutesInYear?O="month":O="year",O==="second"){const D=l(f/1e3);return i.formatDistance("xSeconds",D,o)}else if(O==="minute"){const D=l(m);return i.formatDistance("xMinutes",D,o)}else if(O==="hour"){const D=l(m/60);return i.formatDistance("xHours",D,o)}else if(O==="day"){const D=l(_/Oe.minutesInDay);return i.formatDistance("xDays",D,o)}else if(O==="month"){const D=l(_/Oe.minutesInMonth);return D===12&&p!=="month"?i.formatDistance("xYears",1,o):i.formatDistance("xMonths",D,o)}else{const D=l(_/Oe.minutesInYear);return i.formatDistance("xYears",D,o)}}var $d={};$d.formatDistanceToNow=Q_;var z_=G,q_=Vs;function Q_(e,r){return(0,q_.formatDistance)(e,(0,z_.constructNow)(e),r)}var wd={};wd.formatDistanceToNowStrict=X_;var V_=Zs,Z_=G;function X_(e,r){return(0,V_.formatDistanceStrict)(e,(0,Z_.constructNow)(e),r)}var Pd={};Pd.formatDuration=ev;var K_=je,J_=B;const k_=["years","months","weeks","days","hours","minutes","seconds"];function ev(e,r){const n=(0,J_.getDefaultOptions)(),a=(r==null?void 0:r.locale)??n.locale??K_.defaultLocale,i=(r==null?void 0:r.format)??k_,s=(r==null?void 0:r.zero)??!1,o=(r==null?void 0:r.delimiter)??" ";return a.formatDistance?i.reduce((d,l)=>{const f=`x${l.replace(/(^.)/,h=>h.toUpperCase())}`,m=e[l];return m!==void 0&&(s||e[l])?d.concat(a.formatDistance(f,m)):d},[]).join(o):""}var Md={};Md.formatISO=nv;var tv=g,xe=Ee;function nv(e,r){const n=(0,tv.toDate)(e);if(isNaN(n.getTime()))throw new RangeError("Invalid time value");const a=(r==null?void 0:r.format)??"extended",i=(r==null?void 0:r.representation)??"complete";let s="",o="";const c=a==="extended"?"-":"",d=a==="extended"?":":"";if(i!=="time"){const l=(0,xe.addLeadingZeros)(n.getDate(),2),f=(0,xe.addLeadingZeros)(n.getMonth()+1,2);s=`${(0,xe.addLeadingZeros)(n.getFullYear(),4)}${c}${f}${c}${l}`}if(i!=="date"){const l=n.getTimezoneOffset();if(l!==0){const O=Math.abs(l),D=(0,xe.addLeadingZeros)(Math.trunc(O/60),2),x=(0,xe.addLeadingZeros)(O%60,2);o=`${l<0?"+":"-"}${D}:${x}`}else o="Z";const f=(0,xe.addLeadingZeros)(n.getHours(),2),m=(0,xe.addLeadingZeros)(n.getMinutes(),2),h=(0,xe.addLeadingZeros)(n.getSeconds(),2),_=s===""?"":"T",p=[f,m,h].join(d);s=`${s}${_}${p}${o}`}return s}var Td={};Td.formatISO9075=iv;var rv=fe,av=g,Ge=Ee;function iv(e,r){const n=(0,av.toDate)(e);if(!(0,rv.isValid)(n))throw new RangeError("Invalid time value");const a=(r==null?void 0:r.format)??"extended",i=(r==null?void 0:r.representation)??"complete";let s="";const o=a==="extended"?"-":"",c=a==="extended"?":":"";if(i!=="time"){const d=(0,Ge.addLeadingZeros)(n.getDate(),2),l=(0,Ge.addLeadingZeros)(n.getMonth()+1,2);s=`${(0,Ge.addLeadingZeros)(n.getFullYear(),4)}${o}${l}${o}${d}`}if(i!=="date"){const d=(0,Ge.addLeadingZeros)(n.getHours(),2),l=(0,Ge.addLeadingZeros)(n.getMinutes(),2),f=(0,Ge.addLeadingZeros)(n.getSeconds(),2);s=`${s}${s===""?"":" "}${d}${c}${l}${c}${f}`}return s}var Id={};Id.formatISODuration=sv;function sv(e){const{years:r=0,months:n=0,days:a=0,hours:i=0,minutes:s=0,seconds:o=0}=e;return`P${r}Y${n}M${a}DT${i}H${s}M${o}S`}var Sd={};Sd.formatRFC3339=cv;var ov=fe,uv=g,pe=Ee;function cv(e,r){const n=(0,uv.toDate)(e);if(!(0,ov.isValid)(n))throw new RangeError("Invalid time value");const a=(r==null?void 0:r.fractionDigits)??0,i=(0,pe.addLeadingZeros)(n.getDate(),2),s=(0,pe.addLeadingZeros)(n.getMonth()+1,2),o=n.getFullYear(),c=(0,pe.addLeadingZeros)(n.getHours(),2),d=(0,pe.addLeadingZeros)(n.getMinutes(),2),l=(0,pe.addLeadingZeros)(n.getSeconds(),2);let f="";if(a>0){const _=n.getMilliseconds(),p=Math.trunc(_*Math.pow(10,a-3));f="."+(0,pe.addLeadingZeros)(p,a)}let m="";const h=n.getTimezoneOffset();if(h!==0){const _=Math.abs(h),p=(0,pe.addLeadingZeros)(Math.trunc(_/60),2),O=(0,pe.addLeadingZeros)(_%60,2);m=`${h<0?"+":"-"}${p}:${O}`}else m="Z";return`${o}-${s}-${i}T${c}:${d}:${l}${f}${m}`}var jd={};jd.formatRFC7231=gv;var dv=fe,lv=g,Nt=Ee;const fv=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],mv=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function gv(e){const r=(0,lv.toDate)(e);if(!(0,dv.isValid)(r))throw new RangeError("Invalid time value");const n=fv[r.getUTCDay()],a=(0,Nt.addLeadingZeros)(r.getUTCDate(),2),i=mv[r.getUTCMonth()],s=r.getUTCFullYear(),o=(0,Nt.addLeadingZeros)(r.getUTCHours(),2),c=(0,Nt.addLeadingZeros)(r.getUTCMinutes(),2),d=(0,Nt.addLeadingZeros)(r.getUTCSeconds(),2);return`${n}, ${a} ${i} ${s} ${o}:${c}:${d} GMT`}var Ed={};Ed.formatRelative=Ov;var hv=de,bv=Ys,Gu=g,_v=je,vv=B;function Ov(e,r,n){var m,h,_,p;const a=(0,Gu.toDate)(e),i=(0,Gu.toDate)(r),s=(0,vv.getDefaultOptions)(),o=(n==null?void 0:n.locale)??s.locale??_v.defaultLocale,c=(n==null?void 0:n.weekStartsOn)??((h=(m=n==null?void 0:n.locale)==null?void 0:m.options)==null?void 0:h.weekStartsOn)??s.weekStartsOn??((p=(_=s.locale)==null?void 0:_.options)==null?void 0:p.weekStartsOn)??0,d=(0,hv.differenceInCalendarDays)(a,i);if(isNaN(d))throw new RangeError("Invalid time value");let l;d<-6?l="other":d<-1?l="lastWeek":d<0?l="yesterday":d<1?l="today":d<2?l="tomorrow":d<7?l="nextWeek":l="other";const f=o.formatRelative(l,a,i,{locale:o,weekStartsOn:c});return(0,bv.format)(a,f,{locale:o,weekStartsOn:c})}var Nd={};Nd.fromUnixTime=pv;var xv=g;function pv(e){return(0,xv.toDate)(e*1e3)}var Xs={};Xs.getDate=$v;var Dv=g;function $v(e){return(0,Dv.toDate)(e).getDate()}var xt={};xt.getDay=Pv;var wv=g;function Pv(e){return(0,wv.toDate)(e).getDay()}var Ks={};Ks.getDaysInMonth=Iv;var Mv=g,Tv=T;function Iv(e){const r=(0,Mv.toDate)(e),n=r.getFullYear(),a=r.getMonth(),i=(0,Tv.constructFrom)(e,0);return i.setFullYear(n,a+1,0),i.setHours(0,0,0,0),i.getDate()}var Ad={},Js={};Js.isLeapYear=jv;var Sv=g;function jv(e){const n=(0,Sv.toDate)(e).getFullYear();return n%400===0||n%4===0&&n%100!==0}Ad.getDaysInYear=Av;var Ev=Js,Nv=g;function Av(e){const r=(0,Nv.toDate)(e);return String(new Date(r))==="Invalid Date"?NaN:(0,Ev.isLeapYear)(r)?366:365}var Fd={};Fd.getDecade=Cv;var Fv=g;function Cv(e){const n=(0,Fv.toDate)(e).getFullYear();return Math.floor(n/10)*10}var ks={};ks.getDefaultOptions=Lv;var yv=B;function Lv(){return Object.assign({},(0,yv.getDefaultOptions)())}var Cd={};Cd.getHours=Yv;var Rv=g;function Yv(e){return(0,Rv.toDate)(e).getHours()}var eo={};eo.getISODay=Hv;var Wv=g;function Hv(e){let n=(0,Wv.toDate)(e).getDay();return n===0&&(n=7),n}var yd={};yd.getISOWeeksInYear=Uv;var Bv=mt,Gv=b,Uu=Xe;function Uv(e){const r=(0,Uu.startOfISOWeekYear)(e),a=+(0,Uu.startOfISOWeekYear)((0,Bv.addWeeks)(r,60))-+r;return Math.round(a/Gv.millisecondsInWeek)}var Ld={};Ld.getMilliseconds=qv;var zv=g;function qv(e){return(0,zv.toDate)(e).getMilliseconds()}var Rd={};Rd.getMinutes=Vv;var Qv=g;function Vv(e){return(0,Qv.toDate)(e).getMinutes()}var Yd={};Yd.getMonth=Xv;var Zv=g;function Xv(e){return(0,Zv.toDate)(e).getMonth()}var Wd={};Wd.getOverlappingDaysInIntervals=Jv;var zu=le,Kv=b,At=g;function Jv(e,r){const[n,a]=[+(0,At.toDate)(e.start),+(0,At.toDate)(e.end)].sort((m,h)=>m-h),[i,s]=[+(0,At.toDate)(r.start),+(0,At.toDate)(r.end)].sort((m,h)=>m-h);if(!(n<s&&i<a))return 0;const c=i<n?n:i,d=c-(0,zu.getTimezoneOffsetInMilliseconds)(c),l=s>a?a:s,f=l-(0,zu.getTimezoneOffsetInMilliseconds)(l);return Math.ceil((f-d)/Kv.millisecondsInDay)}var Hd={};Hd.getSeconds=eO;var kv=g;function eO(e){return(0,kv.toDate)(e).getSeconds()}var Bd={};Bd.getTime=nO;var tO=g;function nO(e){return(0,tO.toDate)(e).getTime()}var Gd={};Gd.getUnixTime=aO;var rO=g;function aO(e){return Math.trunc(+(0,rO.toDate)(e)/1e3)}var Ud={};Ud.getWeekOfMonth=cO;var iO=Xs,sO=xt,oO=_t,uO=B;function cO(e,r){var d,l,f,m;const n=(0,uO.getDefaultOptions)(),a=(r==null?void 0:r.weekStartsOn)??((l=(d=r==null?void 0:r.locale)==null?void 0:d.options)==null?void 0:l.weekStartsOn)??n.weekStartsOn??((m=(f=n.locale)==null?void 0:f.options)==null?void 0:m.weekStartsOn)??0,i=(0,iO.getDate)(e);if(isNaN(i))return NaN;const s=(0,sO.getDay)((0,oO.startOfMonth)(e));let o=a-s;o<=0&&(o+=7);const c=i-o;return Math.ceil(c/7)+1}var zd={},to={};to.lastDayOfMonth=lO;var dO=g;function lO(e){const r=(0,dO.toDate)(e),n=r.getMonth();return r.setFullYear(r.getFullYear(),n+1,0),r.setHours(0,0,0,0),r}zd.getWeeksInMonth=hO;var fO=Gt,mO=to,gO=_t;function hO(e,r){return(0,fO.differenceInCalendarWeeks)((0,mO.lastDayOfMonth)(e),(0,gO.startOfMonth)(e),r)+1}var qd={};qd.getYear=_O;var bO=g;function _O(e){return(0,bO.toDate)(e).getFullYear()}var Qd={};Qd.hoursToMilliseconds=OO;var vO=b;function OO(e){return Math.trunc(e*vO.millisecondsInHour)}var Vd={};Vd.hoursToMinutes=pO;var xO=b;function pO(e){return Math.trunc(e*xO.minutesInHour)}var Zd={};Zd.hoursToSeconds=$O;var DO=b;function $O(e){return Math.trunc(e*DO.secondsInHour)}var Xd={};Xd.interval=wO;var qu=g;function wO(e,r,n){const a=(0,qu.toDate)(e);if(isNaN(+a))throw new TypeError("Start date is invalid");const i=(0,qu.toDate)(r);if(isNaN(+i))throw new TypeError("End date is invalid");if(n!=null&&n.assertPositive&&+a>+i)throw new TypeError("End date must be after start date");return{start:a,end:i}}var Kd={};Kd.intervalToDuration=EO;var et=Os,PO=zt,MO=qt,TO=Qt,IO=ht,SO=bt,jO=Cs,Qu=g;function EO(e){const r=(0,Qu.toDate)(e.start),n=(0,Qu.toDate)(e.end),a={},i=(0,jO.differenceInYears)(n,r);i&&(a.years=i);const s=(0,et.add)(r,{years:a.years}),o=(0,IO.differenceInMonths)(n,s);o&&(a.months=o);const c=(0,et.add)(s,{months:a.months}),d=(0,PO.differenceInDays)(n,c);d&&(a.days=d);const l=(0,et.add)(c,{days:a.days}),f=(0,MO.differenceInHours)(n,l);f&&(a.hours=f);const m=(0,et.add)(l,{hours:a.hours}),h=(0,TO.differenceInMinutes)(n,m);h&&(a.minutes=h);const _=(0,et.add)(m,{minutes:a.minutes}),p=(0,SO.differenceInSeconds)(n,_);return p&&(a.seconds=p),a}var Jd={};Jd.intlFormat=AO;var NO=g;function AO(e,r,n){let a;return FO(r)?a=r:n=r,new Intl.DateTimeFormat(n==null?void 0:n.locale,a).format((0,NO.toDate)(e))}function FO(e){return e!==void 0&&!("locale"in e)}var kd={};kd.intlFormatDistance=CO;var Te=b,ss=de,Vu=Bt,os=Es,Zu=Gt,us=Ut,Xu=qt,Ku=Qt,cs=bt,Ju=g;function CO(e,r,n){let a=0,i;const s=(0,Ju.toDate)(e),o=(0,Ju.toDate)(r);if(n!=null&&n.unit)i=n==null?void 0:n.unit,i==="second"?a=(0,cs.differenceInSeconds)(s,o):i==="minute"?a=(0,Ku.differenceInMinutes)(s,o):i==="hour"?a=(0,Xu.differenceInHours)(s,o):i==="day"?a=(0,ss.differenceInCalendarDays)(s,o):i==="week"?a=(0,Zu.differenceInCalendarWeeks)(s,o):i==="month"?a=(0,Vu.differenceInCalendarMonths)(s,o):i==="quarter"?a=(0,os.differenceInCalendarQuarters)(s,o):i==="year"&&(a=(0,us.differenceInCalendarYears)(s,o));else{const d=(0,cs.differenceInSeconds)(s,o);Math.abs(d)<Te.secondsInMinute?(a=(0,cs.differenceInSeconds)(s,o),i="second"):Math.abs(d)<Te.secondsInHour?(a=(0,Ku.differenceInMinutes)(s,o),i="minute"):Math.abs(d)<Te.secondsInDay&&Math.abs((0,ss.differenceInCalendarDays)(s,o))<1?(a=(0,Xu.differenceInHours)(s,o),i="hour"):Math.abs(d)<Te.secondsInWeek&&(a=(0,ss.differenceInCalendarDays)(s,o))&&Math.abs(a)<7?i="day":Math.abs(d)<Te.secondsInMonth?(a=(0,Zu.differenceInCalendarWeeks)(s,o),i="week"):Math.abs(d)<Te.secondsInQuarter?(a=(0,Vu.differenceInCalendarMonths)(s,o),i="month"):Math.abs(d)<Te.secondsInYear&&(0,os.differenceInCalendarQuarters)(s,o)<4?(a=(0,os.differenceInCalendarQuarters)(s,o),i="quarter"):(a=(0,us.differenceInCalendarYears)(s,o),i="year")}return new Intl.RelativeTimeFormat(n==null?void 0:n.locale,{localeMatcher:n==null?void 0:n.localeMatcher,numeric:(n==null?void 0:n.numeric)||"auto",style:n==null?void 0:n.style}).format(a,i)}var el={};el.isAfter=yO;var ku=g;function yO(e,r){const n=(0,ku.toDate)(e),a=(0,ku.toDate)(r);return n.getTime()>a.getTime()}var tl={};tl.isBefore=LO;var ec=g;function LO(e,r){const n=(0,ec.toDate)(e),a=(0,ec.toDate)(r);return+n<+a}var nl={};nl.isEqual=RO;var tc=g;function RO(e,r){const n=(0,tc.toDate)(e),a=(0,tc.toDate)(r);return+n==+a}var rl={};rl.isExists=YO;function YO(e,r,n){const a=new Date(e,r,n);return a.getFullYear()===e&&a.getMonth()===r&&a.getDate()===n}var al={};al.isFirstDayOfMonth=HO;var WO=g;function HO(e){return(0,WO.toDate)(e).getDate()===1}var il={};il.isFriday=GO;var BO=g;function GO(e){return(0,BO.toDate)(e).getDay()===5}var sl={};sl.isFuture=zO;var UO=g;function zO(e){return+(0,UO.toDate)(e)>Date.now()}var ol={},no={},ro={},ao={},I={},$e={},io={};io.transpose=QO;var qO=T;function QO(e,r){const n=r instanceof Date?(0,qO.constructFrom)(r,0):new r(0);return n.setFullYear(e.getFullYear(),e.getMonth(),e.getDate()),n.setHours(e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()),n}$e.ValueSetter=$e.Setter=$e.DateToSystemTimezoneSetter=void 0;var VO=io,ZO=T;const XO=10;class so{constructor(){v(this,"subPriority",0)}validate(r,n){return!0}}$e.Setter=so;class KO extends so{constructor(r,n,a,i,s){super(),this.value=r,this.validateValue=n,this.setValue=a,this.priority=i,s&&(this.subPriority=s)}validate(r,n){return this.validateValue(r,this.value,n)}set(r,n,a){return this.setValue(r,n,this.value,a)}}$e.ValueSetter=KO;class JO extends so{constructor(){super(...arguments);v(this,"priority",XO);v(this,"subPriority",-1)}set(n,a){return a.timestampIsSet?n:(0,ZO.constructFrom)(n,(0,VO.transpose)(n,Date))}}$e.DateToSystemTimezoneSetter=JO;I.Parser=void 0;var kO=$e;class ex{run(r,n,a,i){const s=this.parse(r,n,a,i);return s?{setter:new kO.ValueSetter(s.value,this.validate,this.set,this.priority,this.subPriority),rest:s.rest}:null}validate(r,n,a){return!0}}I.Parser=ex;ao.EraParser=void 0;var tx=I;class nx extends tx.Parser{constructor(){super(...arguments);v(this,"priority",140);v(this,"incompatibleTokens",["R","u","t","T"])}parse(n,a,i){switch(a){case"G":case"GG":case"GGG":return i.era(n,{width:"abbreviated"})||i.era(n,{width:"narrow"});case"GGGGG":return i.era(n,{width:"narrow"});case"GGGG":default:return i.era(n,{width:"wide"})||i.era(n,{width:"abbreviated"})||i.era(n,{width:"narrow"})}}set(n,a,i){return a.era=i,n.setFullYear(i,0,1),n.setHours(0,0,0,0),n}}ao.EraParser=nx;var oo={},$={},W={};W.timezonePatterns=W.numericPatterns=void 0;W.numericPatterns={month:/^(1[0-2]|0?\d)/,date:/^(3[0-1]|[0-2]?\d)/,dayOfYear:/^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,week:/^(5[0-3]|[0-4]?\d)/,hour23h:/^(2[0-3]|[0-1]?\d)/,hour24h:/^(2[0-4]|[0-1]?\d)/,hour11h:/^(1[0-1]|0?\d)/,hour12h:/^(1[0-2]|0?\d)/,minute:/^[0-5]?\d/,second:/^[0-5]?\d/,singleDigit:/^\d/,twoDigits:/^\d{1,2}/,threeDigits:/^\d{1,3}/,fourDigits:/^\d{1,4}/,anyDigitsSigned:/^-?\d+/,singleDigitSigned:/^-?\d/,twoDigitsSigned:/^-?\d{1,2}/,threeDigitsSigned:/^-?\d{1,3}/,fourDigitsSigned:/^-?\d{1,4}/};W.timezonePatterns={basicOptionalMinutes:/^([+-])(\d{2})(\d{2})?|Z/,basic:/^([+-])(\d{2})(\d{2})|Z/,basicOptionalSeconds:/^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,extended:/^([+-])(\d{2}):(\d{2})|Z/,extendedOptionalSeconds:/^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/};$.dayPeriodEnumToHours=ux;$.isLeapYearIndex=dx;$.mapValue=rx;$.normalizeTwoDigitYear=cx;$.parseAnyDigitsSigned=ix;$.parseNDigits=sx;$.parseNDigitsSigned=ox;$.parseNumericPattern=K;$.parseTimezonePattern=ax;var ds=b,ce=W;function rx(e,r){return e&&{value:r(e.value),rest:e.rest}}function K(e,r){const n=r.match(e);return n?{value:parseInt(n[0],10),rest:r.slice(n[0].length)}:null}function ax(e,r){const n=r.match(e);if(!n)return null;if(n[0]==="Z")return{value:0,rest:r.slice(1)};const a=n[1]==="+"?1:-1,i=n[2]?parseInt(n[2],10):0,s=n[3]?parseInt(n[3],10):0,o=n[5]?parseInt(n[5],10):0;return{value:a*(i*ds.millisecondsInHour+s*ds.millisecondsInMinute+o*ds.millisecondsInSecond),rest:r.slice(n[0].length)}}function ix(e){return K(ce.numericPatterns.anyDigitsSigned,e)}function sx(e,r){switch(e){case 1:return K(ce.numericPatterns.singleDigit,r);case 2:return K(ce.numericPatterns.twoDigits,r);case 3:return K(ce.numericPatterns.threeDigits,r);case 4:return K(ce.numericPatterns.fourDigits,r);default:return K(new RegExp("^\\d{1,"+e+"}"),r)}}function ox(e,r){switch(e){case 1:return K(ce.numericPatterns.singleDigitSigned,r);case 2:return K(ce.numericPatterns.twoDigitsSigned,r);case 3:return K(ce.numericPatterns.threeDigitsSigned,r);case 4:return K(ce.numericPatterns.fourDigitsSigned,r);default:return K(new RegExp("^-?\\d{1,"+e+"}"),r)}}function ux(e){switch(e){case"morning":return 4;case"evening":return 17;case"pm":case"noon":case"afternoon":return 12;case"am":case"midnight":case"night":default:return 0}}function cx(e,r){const n=r>0,a=n?r:1-r;let i;if(a<=50)i=e||100;else{const s=a+50,o=Math.trunc(s/100)*100,c=e>=s%100;i=e+o-(c?100:0)}return n?i:1-i}function dx(e){return e%400===0||e%4===0&&e%100!==0}oo.YearParser=void 0;var lx=I,Ue=$;class fx extends lx.Parser{constructor(){super(...arguments);v(this,"priority",130);v(this,"incompatibleTokens",["Y","R","u","w","I","i","e","c","t","T"])}parse(n,a,i){const s=o=>({year:o,isTwoDigitYear:a==="yy"});switch(a){case"y":return(0,Ue.mapValue)((0,Ue.parseNDigits)(4,n),s);case"yo":return(0,Ue.mapValue)(i.ordinalNumber(n,{unit:"year"}),s);default:return(0,Ue.mapValue)((0,Ue.parseNDigits)(a.length,n),s)}}validate(n,a){return a.isTwoDigitYear||a.year>0}set(n,a,i){const s=n.getFullYear();if(i.isTwoDigitYear){const c=(0,Ue.normalizeTwoDigitYear)(i.year,s);return n.setFullYear(c,0,1),n.setHours(0,0,0,0),n}const o=!("era"in a)||a.era===1?i.year:1-i.year;return n.setFullYear(o,0,1),n.setHours(0,0,0,0),n}}oo.YearParser=fx;var uo={};uo.LocalWeekYearParser=void 0;var mx=vt,nc=ee,gx=I,ze=$;class hx extends gx.Parser{constructor(){super(...arguments);v(this,"priority",130);v(this,"incompatibleTokens",["y","R","u","Q","q","M","L","I","d","D","i","t","T"])}parse(n,a,i){const s=o=>({year:o,isTwoDigitYear:a==="YY"});switch(a){case"Y":return(0,ze.mapValue)((0,ze.parseNDigits)(4,n),s);case"Yo":return(0,ze.mapValue)(i.ordinalNumber(n,{unit:"year"}),s);default:return(0,ze.mapValue)((0,ze.parseNDigits)(a.length,n),s)}}validate(n,a){return a.isTwoDigitYear||a.year>0}set(n,a,i,s){const o=(0,mx.getWeekYear)(n,s);if(i.isTwoDigitYear){const d=(0,ze.normalizeTwoDigitYear)(i.year,o);return n.setFullYear(d,0,s.firstWeekContainsDate),n.setHours(0,0,0,0),(0,nc.startOfWeek)(n,s)}const c=!("era"in a)||a.era===1?i.year:1-i.year;return n.setFullYear(c,0,s.firstWeekContainsDate),n.setHours(0,0,0,0),(0,nc.startOfWeek)(n,s)}}uo.LocalWeekYearParser=hx;var co={};co.ISOWeekYearParser=void 0;var bx=se,_x=T,vx=I,rc=$;class Ox extends vx.Parser{constructor(){super(...arguments);v(this,"priority",130);v(this,"incompatibleTokens",["G","y","Y","u","Q","q","M","L","w","d","D","e","c","t","T"])}parse(n,a){return a==="R"?(0,rc.parseNDigitsSigned)(4,n):(0,rc.parseNDigitsSigned)(a.length,n)}set(n,a,i){const s=(0,_x.constructFrom)(n,0);return s.setFullYear(i,0,4),s.setHours(0,0,0,0),(0,bx.startOfISOWeek)(s)}}co.ISOWeekYearParser=Ox;var lo={};lo.ExtendedYearParser=void 0;var xx=I,ac=$;class px extends xx.Parser{constructor(){super(...arguments);v(this,"priority",130);v(this,"incompatibleTokens",["G","y","Y","R","w","I","i","e","c","t","T"])}parse(n,a){return a==="u"?(0,ac.parseNDigitsSigned)(4,n):(0,ac.parseNDigitsSigned)(a.length,n)}set(n,a,i){return n.setFullYear(i,0,1),n.setHours(0,0,0,0),n}}lo.ExtendedYearParser=px;var fo={};fo.QuarterParser=void 0;var Dx=I,$x=$;class wx extends Dx.Parser{constructor(){super(...arguments);v(this,"priority",120);v(this,"incompatibleTokens",["Y","R","q","M","L","w","I","d","D","i","e","c","t","T"])}parse(n,a,i){switch(a){case"Q":case"QQ":return(0,$x.parseNDigits)(a.length,n);case"Qo":return i.ordinalNumber(n,{unit:"quarter"});case"QQQ":return i.quarter(n,{width:"abbreviated",context:"formatting"})||i.quarter(n,{width:"narrow",context:"formatting"});case"QQQQQ":return i.quarter(n,{width:"narrow",context:"formatting"});case"QQQQ":default:return i.quarter(n,{width:"wide",context:"formatting"})||i.quarter(n,{width:"abbreviated",context:"formatting"})||i.quarter(n,{width:"narrow",context:"formatting"})}}validate(n,a){return a>=1&&a<=4}set(n,a,i){return n.setMonth((i-1)*3,1),n.setHours(0,0,0,0),n}}fo.QuarterParser=wx;var mo={};mo.StandAloneQuarterParser=void 0;var Px=I,Mx=$;class Tx extends Px.Parser{constructor(){super(...arguments);v(this,"priority",120);v(this,"incompatibleTokens",["Y","R","Q","M","L","w","I","d","D","i","e","c","t","T"])}parse(n,a,i){switch(a){case"q":case"qq":return(0,Mx.parseNDigits)(a.length,n);case"qo":return i.ordinalNumber(n,{unit:"quarter"});case"qqq":return i.quarter(n,{width:"abbreviated",context:"standalone"})||i.quarter(n,{width:"narrow",context:"standalone"});case"qqqqq":return i.quarter(n,{width:"narrow",context:"standalone"});case"qqqq":default:return i.quarter(n,{width:"wide",context:"standalone"})||i.quarter(n,{width:"abbreviated",context:"standalone"})||i.quarter(n,{width:"narrow",context:"standalone"})}}validate(n,a){return a>=1&&a<=4}set(n,a,i){return n.setMonth((i-1)*3,1),n.setHours(0,0,0,0),n}}mo.StandAloneQuarterParser=Tx;var go={};go.MonthParser=void 0;var Ix=W,Sx=I,tt=$;class jx extends Sx.Parser{constructor(){super(...arguments);v(this,"incompatibleTokens",["Y","R","q","Q","L","w","I","D","i","e","c","t","T"]);v(this,"priority",110)}parse(n,a,i){const s=o=>o-1;switch(a){case"M":return(0,tt.mapValue)((0,tt.parseNumericPattern)(Ix.numericPatterns.month,n),s);case"MM":return(0,tt.mapValue)((0,tt.parseNDigits)(2,n),s);case"Mo":return(0,tt.mapValue)(i.ordinalNumber(n,{unit:"month"}),s);case"MMM":return i.month(n,{width:"abbreviated",context:"formatting"})||i.month(n,{width:"narrow",context:"formatting"});case"MMMMM":return i.month(n,{width:"narrow",context:"formatting"});case"MMMM":default:return i.month(n,{width:"wide",context:"formatting"})||i.month(n,{width:"abbreviated",context:"formatting"})||i.month(n,{width:"narrow",context:"formatting"})}}validate(n,a){return a>=0&&a<=11}set(n,a,i){return n.setMonth(i,1),n.setHours(0,0,0,0),n}}go.MonthParser=jx;var ho={};ho.StandAloneMonthParser=void 0;var Ex=W,Nx=I,nt=$;class Ax extends Nx.Parser{constructor(){super(...arguments);v(this,"priority",110);v(this,"incompatibleTokens",["Y","R","q","Q","M","w","I","D","i","e","c","t","T"])}parse(n,a,i){const s=o=>o-1;switch(a){case"L":return(0,nt.mapValue)((0,nt.parseNumericPattern)(Ex.numericPatterns.month,n),s);case"LL":return(0,nt.mapValue)((0,nt.parseNDigits)(2,n),s);case"Lo":return(0,nt.mapValue)(i.ordinalNumber(n,{unit:"month"}),s);case"LLL":return i.month(n,{width:"abbreviated",context:"standalone"})||i.month(n,{width:"narrow",context:"standalone"});case"LLLLL":return i.month(n,{width:"narrow",context:"standalone"});case"LLLL":default:return i.month(n,{width:"wide",context:"standalone"})||i.month(n,{width:"abbreviated",context:"standalone"})||i.month(n,{width:"narrow",context:"standalone"})}}validate(n,a){return a>=0&&a<=11}set(n,a,i){return n.setMonth(i,1),n.setHours(0,0,0,0),n}}ho.StandAloneMonthParser=Ax;var bo={},_o={};_o.setWeek=yx;var Fx=tn,Cx=g;function yx(e,r,n){const a=(0,Cx.toDate)(e),i=(0,Fx.getWeek)(a,n)-r;return a.setDate(a.getDate()-i*7),a}bo.LocalWeekParser=void 0;var Lx=_o,Rx=ee,Yx=W,Wx=I,ic=$;class Hx extends Wx.Parser{constructor(){super(...arguments);v(this,"priority",100);v(this,"incompatibleTokens",["y","R","u","q","Q","M","L","I","d","D","i","t","T"])}parse(n,a,i){switch(a){case"w":return(0,ic.parseNumericPattern)(Yx.numericPatterns.week,n);case"wo":return i.ordinalNumber(n,{unit:"week"});default:return(0,ic.parseNDigits)(a.length,n)}}validate(n,a){return a>=1&&a<=53}set(n,a,i,s){return(0,Rx.startOfWeek)((0,Lx.setWeek)(n,i,s),s)}}bo.LocalWeekParser=Hx;var vo={},Oo={};Oo.setISOWeek=Ux;var Bx=en,Gx=g;function Ux(e,r){const n=(0,Gx.toDate)(e),a=(0,Bx.getISOWeek)(n)-r;return n.setDate(n.getDate()-a*7),n}vo.ISOWeekParser=void 0;var zx=Oo,qx=se,Qx=W,Vx=I,sc=$;class Zx extends Vx.Parser{constructor(){super(...arguments);v(this,"priority",100);v(this,"incompatibleTokens",["y","Y","u","q","Q","M","L","w","d","D","e","c","t","T"])}parse(n,a,i){switch(a){case"I":return(0,sc.parseNumericPattern)(Qx.numericPatterns.week,n);case"Io":return i.ordinalNumber(n,{unit:"week"});default:return(0,sc.parseNDigits)(a.length,n)}}validate(n,a){return a>=1&&a<=53}set(n,a,i){return(0,qx.startOfISOWeek)((0,zx.setISOWeek)(n,i))}}vo.ISOWeekParser=Zx;var xo={};xo.DateParser=void 0;var Xx=W,Kx=I,ls=$;const Jx=[31,28,31,30,31,30,31,31,30,31,30,31],kx=[31,29,31,30,31,30,31,31,30,31,30,31];class e1 extends Kx.Parser{constructor(){super(...arguments);v(this,"priority",90);v(this,"subPriority",1);v(this,"incompatibleTokens",["Y","R","q","Q","w","I","D","i","e","c","t","T"])}parse(n,a,i){switch(a){case"d":return(0,ls.parseNumericPattern)(Xx.numericPatterns.date,n);case"do":return i.ordinalNumber(n,{unit:"date"});default:return(0,ls.parseNDigits)(a.length,n)}}validate(n,a){const i=n.getFullYear(),s=(0,ls.isLeapYearIndex)(i),o=n.getMonth();return s?a>=1&&a<=kx[o]:a>=1&&a<=Jx[o]}set(n,a,i){return n.setDate(i),n.setHours(0,0,0,0),n}}xo.DateParser=e1;var po={};po.DayOfYearParser=void 0;var t1=W,n1=I,fs=$;class r1 extends n1.Parser{constructor(){super(...arguments);v(this,"priority",90);v(this,"subpriority",1);v(this,"incompatibleTokens",["Y","R","q","Q","M","L","w","I","d","E","i","e","c","t","T"])}parse(n,a,i){switch(a){case"D":case"DD":return(0,fs.parseNumericPattern)(t1.numericPatterns.dayOfYear,n);case"Do":return i.ordinalNumber(n,{unit:"date"});default:return(0,fs.parseNDigits)(a.length,n)}}validate(n,a){const i=n.getFullYear();return(0,fs.isLeapYearIndex)(i)?a>=1&&a<=366:a>=1&&a<=365}set(n,a,i){return n.setMonth(0,i),n.setHours(0,0,0,0),n}}po.DayOfYearParser=r1;var Do={},pt={};pt.setDay=o1;var a1=ie,i1=g,s1=B;function o1(e,r,n){var m,h,_,p;const a=(0,s1.getDefaultOptions)(),i=(n==null?void 0:n.weekStartsOn)??((h=(m=n==null?void 0:n.locale)==null?void 0:m.options)==null?void 0:h.weekStartsOn)??a.weekStartsOn??((p=(_=a.locale)==null?void 0:_.options)==null?void 0:p.weekStartsOn)??0,s=(0,i1.toDate)(e),o=s.getDay(),d=(r%7+7)%7,l=7-i,f=r<0||r>6?r-(o+l)%7:(d+l)%7-(o+l)%7;return(0,a1.addDays)(s,f)}Do.DayParser=void 0;var u1=pt,c1=I;class d1 extends c1.Parser{constructor(){super(...arguments);v(this,"priority",90);v(this,"incompatibleTokens",["D","i","e","c","t","T"])}parse(n,a,i){switch(a){case"E":case"EE":case"EEE":return i.day(n,{width:"abbreviated",context:"formatting"})||i.day(n,{width:"short",context:"formatting"})||i.day(n,{width:"narrow",context:"formatting"});case"EEEEE":return i.day(n,{width:"narrow",context:"formatting"});case"EEEEEE":return i.day(n,{width:"short",context:"formatting"})||i.day(n,{width:"narrow",context:"formatting"});case"EEEE":default:return i.day(n,{width:"wide",context:"formatting"})||i.day(n,{width:"abbreviated",context:"formatting"})||i.day(n,{width:"short",context:"formatting"})||i.day(n,{width:"narrow",context:"formatting"})}}validate(n,a){return a>=0&&a<=6}set(n,a,i,s){return n=(0,u1.setDay)(n,i,s),n.setHours(0,0,0,0),n}}Do.DayParser=d1;var $o={};$o.LocalDayParser=void 0;var l1=pt,f1=I,ms=$;class m1 extends f1.Parser{constructor(){super(...arguments);v(this,"priority",90);v(this,"incompatibleTokens",["y","R","u","q","Q","M","L","I","d","D","E","i","c","t","T"])}parse(n,a,i,s){const o=c=>{const d=Math.floor((c-1)/7)*7;return(c+s.weekStartsOn+6)%7+d};switch(a){case"e":case"ee":return(0,ms.mapValue)((0,ms.parseNDigits)(a.length,n),o);case"eo":return(0,ms.mapValue)(i.ordinalNumber(n,{unit:"day"}),o);case"eee":return i.day(n,{width:"abbreviated",context:"formatting"})||i.day(n,{width:"short",context:"formatting"})||i.day(n,{width:"narrow",context:"formatting"});case"eeeee":return i.day(n,{width:"narrow",context:"formatting"});case"eeeeee":return i.day(n,{width:"short",context:"formatting"})||i.day(n,{width:"narrow",context:"formatting"});case"eeee":default:return i.day(n,{width:"wide",context:"formatting"})||i.day(n,{width:"abbreviated",context:"formatting"})||i.day(n,{width:"short",context:"formatting"})||i.day(n,{width:"narrow",context:"formatting"})}}validate(n,a){return a>=0&&a<=6}set(n,a,i,s){return n=(0,l1.setDay)(n,i,s),n.setHours(0,0,0,0),n}}$o.LocalDayParser=m1;var wo={};wo.StandAloneLocalDayParser=void 0;var g1=pt,h1=I,gs=$;class b1 extends h1.Parser{constructor(){super(...arguments);v(this,"priority",90);v(this,"incompatibleTokens",["y","R","u","q","Q","M","L","I","d","D","E","i","e","t","T"])}parse(n,a,i,s){const o=c=>{const d=Math.floor((c-1)/7)*7;return(c+s.weekStartsOn+6)%7+d};switch(a){case"c":case"cc":return(0,gs.mapValue)((0,gs.parseNDigits)(a.length,n),o);case"co":return(0,gs.mapValue)(i.ordinalNumber(n,{unit:"day"}),o);case"ccc":return i.day(n,{width:"abbreviated",context:"standalone"})||i.day(n,{width:"short",context:"standalone"})||i.day(n,{width:"narrow",context:"standalone"});case"ccccc":return i.day(n,{width:"narrow",context:"standalone"});case"cccccc":return i.day(n,{width:"short",context:"standalone"})||i.day(n,{width:"narrow",context:"standalone"});case"cccc":default:return i.day(n,{width:"wide",context:"standalone"})||i.day(n,{width:"abbreviated",context:"standalone"})||i.day(n,{width:"short",context:"standalone"})||i.day(n,{width:"narrow",context:"standalone"})}}validate(n,a){return a>=0&&a<=6}set(n,a,i,s){return n=(0,g1.setDay)(n,i,s),n.setHours(0,0,0,0),n}}wo.StandAloneLocalDayParser=b1;var Po={},Mo={};Mo.setISODay=x1;var _1=ie,v1=eo,O1=g;function x1(e,r){const n=(0,O1.toDate)(e),a=(0,v1.getISODay)(n),i=r-a;return(0,_1.addDays)(n,i)}Po.ISODayParser=void 0;var p1=Mo,D1=I,rt=$;class $1 extends D1.Parser{constructor(){super(...arguments);v(this,"priority",90);v(this,"incompatibleTokens",["y","Y","u","q","Q","M","L","w","d","D","E","e","c","t","T"])}parse(n,a,i){const s=o=>o===0?7:o;switch(a){case"i":case"ii":return(0,rt.parseNDigits)(a.length,n);case"io":return i.ordinalNumber(n,{unit:"day"});case"iii":return(0,rt.mapValue)(i.day(n,{width:"abbreviated",context:"formatting"})||i.day(n,{width:"short",context:"formatting"})||i.day(n,{width:"narrow",context:"formatting"}),s);case"iiiii":return(0,rt.mapValue)(i.day(n,{width:"narrow",context:"formatting"}),s);case"iiiiii":return(0,rt.mapValue)(i.day(n,{width:"short",context:"formatting"})||i.day(n,{width:"narrow",context:"formatting"}),s);case"iiii":default:return(0,rt.mapValue)(i.day(n,{width:"wide",context:"formatting"})||i.day(n,{width:"abbreviated",context:"formatting"})||i.day(n,{width:"short",context:"formatting"})||i.day(n,{width:"narrow",context:"formatting"}),s)}}validate(n,a){return a>=1&&a<=7}set(n,a,i){return n=(0,p1.setISODay)(n,i),n.setHours(0,0,0,0),n}}Po.ISODayParser=$1;var To={};To.AMPMParser=void 0;var w1=I,P1=$;class M1 extends w1.Parser{constructor(){super(...arguments);v(this,"priority",80);v(this,"incompatibleTokens",["b","B","H","k","t","T"])}parse(n,a,i){switch(a){case"a":case"aa":case"aaa":return i.dayPeriod(n,{width:"abbreviated",context:"formatting"})||i.dayPeriod(n,{width:"narrow",context:"formatting"});case"aaaaa":return i.dayPeriod(n,{width:"narrow",context:"formatting"});case"aaaa":default:return i.dayPeriod(n,{width:"wide",context:"formatting"})||i.dayPeriod(n,{width:"abbreviated",context:"formatting"})||i.dayPeriod(n,{width:"narrow",context:"formatting"})}}set(n,a,i){return n.setHours((0,P1.dayPeriodEnumToHours)(i),0,0,0),n}}To.AMPMParser=M1;var Io={};Io.AMPMMidnightParser=void 0;var T1=I,I1=$;class S1 extends T1.Parser{constructor(){super(...arguments);v(this,"priority",80);v(this,"incompatibleTokens",["a","B","H","k","t","T"])}parse(n,a,i){switch(a){case"b":case"bb":case"bbb":return i.dayPeriod(n,{width:"abbreviated",context:"formatting"})||i.dayPeriod(n,{width:"narrow",context:"formatting"});case"bbbbb":return i.dayPeriod(n,{width:"narrow",context:"formatting"});case"bbbb":default:return i.dayPeriod(n,{width:"wide",context:"formatting"})||i.dayPeriod(n,{width:"abbreviated",context:"formatting"})||i.dayPeriod(n,{width:"narrow",context:"formatting"})}}set(n,a,i){return n.setHours((0,I1.dayPeriodEnumToHours)(i),0,0,0),n}}Io.AMPMMidnightParser=S1;var So={};So.DayPeriodParser=void 0;var j1=I,E1=$;class N1 extends j1.Parser{constructor(){super(...arguments);v(this,"priority",80);v(this,"incompatibleTokens",["a","b","t","T"])}parse(n,a,i){switch(a){case"B":case"BB":case"BBB":return i.dayPeriod(n,{width:"abbreviated",context:"formatting"})||i.dayPeriod(n,{width:"narrow",context:"formatting"});case"BBBBB":return i.dayPeriod(n,{width:"narrow",context:"formatting"});case"BBBB":default:return i.dayPeriod(n,{width:"wide",context:"formatting"})||i.dayPeriod(n,{width:"abbreviated",context:"formatting"})||i.dayPeriod(n,{width:"narrow",context:"formatting"})}}set(n,a,i){return n.setHours((0,E1.dayPeriodEnumToHours)(i),0,0,0),n}}So.DayPeriodParser=N1;var jo={};jo.Hour1to12Parser=void 0;var A1=W,F1=I,oc=$;class C1 extends F1.Parser{constructor(){super(...arguments);v(this,"priority",70);v(this,"incompatibleTokens",["H","K","k","t","T"])}parse(n,a,i){switch(a){case"h":return(0,oc.parseNumericPattern)(A1.numericPatterns.hour12h,n);case"ho":return i.ordinalNumber(n,{unit:"hour"});default:return(0,oc.parseNDigits)(a.length,n)}}validate(n,a){return a>=1&&a<=12}set(n,a,i){const s=n.getHours()>=12;return s&&i<12?n.setHours(i+12,0,0,0):!s&&i===12?n.setHours(0,0,0,0):n.setHours(i,0,0,0),n}}jo.Hour1to12Parser=C1;var Eo={};Eo.Hour0to23Parser=void 0;var y1=W,L1=I,uc=$;class R1 extends L1.Parser{constructor(){super(...arguments);v(this,"priority",70);v(this,"incompatibleTokens",["a","b","h","K","k","t","T"])}parse(n,a,i){switch(a){case"H":return(0,uc.parseNumericPattern)(y1.numericPatterns.hour23h,n);case"Ho":return i.ordinalNumber(n,{unit:"hour"});default:return(0,uc.parseNDigits)(a.length,n)}}validate(n,a){return a>=0&&a<=23}set(n,a,i){return n.setHours(i,0,0,0),n}}Eo.Hour0to23Parser=R1;var No={};No.Hour0To11Parser=void 0;var Y1=W,W1=I,cc=$;class H1 extends W1.Parser{constructor(){super(...arguments);v(this,"priority",70);v(this,"incompatibleTokens",["h","H","k","t","T"])}parse(n,a,i){switch(a){case"K":return(0,cc.parseNumericPattern)(Y1.numericPatterns.hour11h,n);case"Ko":return i.ordinalNumber(n,{unit:"hour"});default:return(0,cc.parseNDigits)(a.length,n)}}validate(n,a){return a>=0&&a<=11}set(n,a,i){return n.getHours()>=12&&i<12?n.setHours(i+12,0,0,0):n.setHours(i,0,0,0),n}}No.Hour0To11Parser=H1;var Ao={};Ao.Hour1To24Parser=void 0;var B1=W,G1=I,dc=$;class U1 extends G1.Parser{constructor(){super(...arguments);v(this,"priority",70);v(this,"incompatibleTokens",["a","b","h","H","K","t","T"])}parse(n,a,i){switch(a){case"k":return(0,dc.parseNumericPattern)(B1.numericPatterns.hour24h,n);case"ko":return i.ordinalNumber(n,{unit:"hour"});default:return(0,dc.parseNDigits)(a.length,n)}}validate(n,a){return a>=1&&a<=24}set(n,a,i){const s=i<=24?i%24:i;return n.setHours(s,0,0,0),n}}Ao.Hour1To24Parser=U1;var Fo={};Fo.MinuteParser=void 0;var z1=W,q1=I,lc=$;class Q1 extends q1.Parser{constructor(){super(...arguments);v(this,"priority",60);v(this,"incompatibleTokens",["t","T"])}parse(n,a,i){switch(a){case"m":return(0,lc.parseNumericPattern)(z1.numericPatterns.minute,n);case"mo":return i.ordinalNumber(n,{unit:"minute"});default:return(0,lc.parseNDigits)(a.length,n)}}validate(n,a){return a>=0&&a<=59}set(n,a,i){return n.setMinutes(i,0,0),n}}Fo.MinuteParser=Q1;var Co={};Co.SecondParser=void 0;var V1=W,Z1=I,fc=$;class X1 extends Z1.Parser{constructor(){super(...arguments);v(this,"priority",50);v(this,"incompatibleTokens",["t","T"])}parse(n,a,i){switch(a){case"s":return(0,fc.parseNumericPattern)(V1.numericPatterns.second,n);case"so":return i.ordinalNumber(n,{unit:"second"});default:return(0,fc.parseNDigits)(a.length,n)}}validate(n,a){return a>=0&&a<=59}set(n,a,i){return n.setSeconds(i,0),n}}Co.SecondParser=X1;var yo={};yo.FractionOfSecondParser=void 0;var K1=I,mc=$;class J1 extends K1.Parser{constructor(){super(...arguments);v(this,"priority",30);v(this,"incompatibleTokens",["t","T"])}parse(n,a){const i=s=>Math.trunc(s*Math.pow(10,-a.length+3));return(0,mc.mapValue)((0,mc.parseNDigits)(a.length,n),i)}set(n,a,i){return n.setMilliseconds(i),n}}yo.FractionOfSecondParser=J1;var Lo={};Lo.ISOTimezoneWithZParser=void 0;var k1=T,ep=le,at=W,tp=I,it=$;class np extends tp.Parser{constructor(){super(...arguments);v(this,"priority",10);v(this,"incompatibleTokens",["t","T","x"])}parse(n,a){switch(a){case"X":return(0,it.parseTimezonePattern)(at.timezonePatterns.basicOptionalMinutes,n);case"XX":return(0,it.parseTimezonePattern)(at.timezonePatterns.basic,n);case"XXXX":return(0,it.parseTimezonePattern)(at.timezonePatterns.basicOptionalSeconds,n);case"XXXXX":return(0,it.parseTimezonePattern)(at.timezonePatterns.extendedOptionalSeconds,n);case"XXX":default:return(0,it.parseTimezonePattern)(at.timezonePatterns.extended,n)}}set(n,a,i){return a.timestampIsSet?n:(0,k1.constructFrom)(n,n.getTime()-(0,ep.getTimezoneOffsetInMilliseconds)(n)-i)}}Lo.ISOTimezoneWithZParser=np;var Ro={};Ro.ISOTimezoneParser=void 0;var rp=T,ap=le,st=W,ip=I,ot=$;class sp extends ip.Parser{constructor(){super(...arguments);v(this,"priority",10);v(this,"incompatibleTokens",["t","T","X"])}parse(n,a){switch(a){case"x":return(0,ot.parseTimezonePattern)(st.timezonePatterns.basicOptionalMinutes,n);case"xx":return(0,ot.parseTimezonePattern)(st.timezonePatterns.basic,n);case"xxxx":return(0,ot.parseTimezonePattern)(st.timezonePatterns.basicOptionalSeconds,n);case"xxxxx":return(0,ot.parseTimezonePattern)(st.timezonePatterns.extendedOptionalSeconds,n);case"xxx":default:return(0,ot.parseTimezonePattern)(st.timezonePatterns.extended,n)}}set(n,a,i){return a.timestampIsSet?n:(0,rp.constructFrom)(n,n.getTime()-(0,ap.getTimezoneOffsetInMilliseconds)(n)-i)}}Ro.ISOTimezoneParser=sp;var Yo={};Yo.TimestampSecondsParser=void 0;var op=T,up=I,cp=$;class dp extends up.Parser{constructor(){super(...arguments);v(this,"priority",40);v(this,"incompatibleTokens","*")}parse(n){return(0,cp.parseAnyDigitsSigned)(n)}set(n,a,i){return[(0,op.constructFrom)(n,i*1e3),{timestampIsSet:!0}]}}Yo.TimestampSecondsParser=dp;var Wo={};Wo.TimestampMillisecondsParser=void 0;var lp=T,fp=I,mp=$;class gp extends fp.Parser{constructor(){super(...arguments);v(this,"priority",20);v(this,"incompatibleTokens","*")}parse(n){return(0,mp.parseAnyDigitsSigned)(n)}set(n,a,i){return[(0,lp.constructFrom)(n,i),{timestampIsSet:!0}]}}Wo.TimestampMillisecondsParser=gp;ro.parsers=void 0;var hp=ao,bp=oo,_p=uo,vp=co,Op=lo,xp=fo,pp=mo,Dp=go,$p=ho,wp=bo,Pp=vo,Mp=xo,Tp=po,Ip=Do,Sp=$o,jp=wo,Ep=Po,Np=To,Ap=Io,Fp=So,Cp=jo,yp=Eo,Lp=No,Rp=Ao,Yp=Fo,Wp=Co,Hp=yo,Bp=Lo,Gp=Ro,Up=Yo,zp=Wo;ro.parsers={G:new hp.EraParser,y:new bp.YearParser,Y:new _p.LocalWeekYearParser,R:new vp.ISOWeekYearParser,u:new Op.ExtendedYearParser,Q:new xp.QuarterParser,q:new pp.StandAloneQuarterParser,M:new Dp.MonthParser,L:new $p.StandAloneMonthParser,w:new wp.LocalWeekParser,I:new Pp.ISOWeekParser,d:new Mp.DateParser,D:new Tp.DayOfYearParser,E:new Ip.DayParser,e:new Sp.LocalDayParser,c:new jp.StandAloneLocalDayParser,i:new Ep.ISODayParser,a:new Np.AMPMParser,b:new Ap.AMPMMidnightParser,B:new Fp.DayPeriodParser,h:new Cp.Hour1to12Parser,H:new yp.Hour0to23Parser,K:new Lp.Hour0To11Parser,k:new Rp.Hour1To24Parser,m:new Yp.MinuteParser,s:new Wp.SecondParser,S:new Hp.FractionOfSecondParser,X:new Bp.ISOTimezoneWithZParser,x:new Gp.ISOTimezoneParser,t:new Up.TimestampSecondsParser,T:new zp.TimestampMillisecondsParser};(function(e){Object.defineProperty(e,"longFormatters",{enumerable:!0,get:function(){return s.longFormatters}}),e.parse=O,Object.defineProperty(e,"parsers",{enumerable:!0,get:function(){return c.parsers}});var r=T,n=ks,a=je,i=g,s=an,o=Ot,c=ro,d=$e;const l=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,f=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,m=/^'([^]*?)'?$/,h=/''/g,_=/\S/,p=/[a-zA-Z]/;function O(x,S,N,j){var ue,L,C,ne,Fe,Ce,ye,Le;const z=(0,n.getDefaultOptions)(),q=(j==null?void 0:j.locale)??z.locale??a.defaultLocale,J=(j==null?void 0:j.firstWeekContainsDate)??((L=(ue=j==null?void 0:j.locale)==null?void 0:ue.options)==null?void 0:L.firstWeekContainsDate)??z.firstWeekContainsDate??((ne=(C=z.locale)==null?void 0:C.options)==null?void 0:ne.firstWeekContainsDate)??1,A=(j==null?void 0:j.weekStartsOn)??((Ce=(Fe=j==null?void 0:j.locale)==null?void 0:Fe.options)==null?void 0:Ce.weekStartsOn)??z.weekStartsOn??((Le=(ye=z.locale)==null?void 0:ye.options)==null?void 0:Le.weekStartsOn)??0;if(S==="")return x===""?(0,i.toDate)(N):(0,r.constructFrom)(N,NaN);const F={firstWeekContainsDate:J,weekStartsOn:A,locale:q},Z=[new d.DateToSystemTimezoneSetter],te=S.match(f).map(w=>{const E=w[0];if(E in s.longFormatters){const U=s.longFormatters[E];return U(w,q.formatLong)}return w}).join("").match(l),X=[];for(let w of te){!(j!=null&&j.useAdditionalWeekYearTokens)&&(0,o.isProtectedWeekYearToken)(w)&&(0,o.warnOrThrowProtectedError)(w,S,x),!(j!=null&&j.useAdditionalDayOfYearTokens)&&(0,o.isProtectedDayOfYearToken)(w)&&(0,o.warnOrThrowProtectedError)(w,S,x);const E=w[0],U=c.parsers[E];if(U){const{incompatibleTokens:Re}=U;if(Array.isArray(Re)){const Ye=X.find(We=>Re.includes(We.token)||We.token===E);if(Ye)throw new RangeError(`The format string mustn't contain \`${Ye.fullToken}\` and \`${w}\` at the same time`)}else if(U.incompatibleTokens==="*"&&X.length>0)throw new RangeError(`The format string mustn't contain \`${w}\` and any other token at the same time`);X.push({token:E,fullToken:w});const Me=U.run(x,w,q.match,F);if(!Me)return(0,r.constructFrom)(N,NaN);Z.push(Me.setter),x=Me.rest}else{if(E.match(p))throw new RangeError("Format string contains an unescaped latin alphabet character `"+E+"`");if(w==="''"?w="'":E==="'"&&(w=D(w)),x.indexOf(w)===0)x=x.slice(w.length);else return(0,r.constructFrom)(N,NaN)}}if(x.length>0&&_.test(x))return(0,r.constructFrom)(N,NaN);const be=Z.map(w=>w.priority).sort((w,E)=>E-w).filter((w,E,U)=>U.indexOf(w)===E).map(w=>Z.filter(E=>E.priority===w).sort((E,U)=>U.subPriority-E.subPriority)).map(w=>w[0]);let Q=(0,i.toDate)(N);if(isNaN(Q.getTime()))return(0,r.constructFrom)(N,NaN);const oe={};for(const w of be){if(!w.validate(Q,F))return(0,r.constructFrom)(N,NaN);const E=w.set(Q,oe,F);Array.isArray(E)?(Q=E[0],Object.assign(oe,E[1])):Q=E}return(0,r.constructFrom)(N,Q)}function D(x){return x.match(m)[1].replace(h,"'")}})(no);ol.isMatch=Vp;var qp=fe,Qp=no;function Vp(e,r,n){return(0,qp.isValid)((0,Qp.parse)(e,r,new Date,n))}var ul={};ul.isMonday=Xp;var Zp=g;function Xp(e){return(0,Zp.toDate)(e).getDay()===1}var cl={};cl.isPast=Jp;var Kp=g;function Jp(e){return+(0,Kp.toDate)(e)<Date.now()}var Ho={},Bo={};Bo.startOfHour=eD;var kp=g;function eD(e){const r=(0,kp.toDate)(e);return r.setMinutes(0,0,0),r}Ho.isSameHour=tD;var gc=Bo;function tD(e,r){const n=(0,gc.startOfHour)(e),a=(0,gc.startOfHour)(r);return+n==+a}var Go={},sn={};sn.isSameWeek=nD;var hc=ee;function nD(e,r,n){const a=(0,hc.startOfWeek)(e,n),i=(0,hc.startOfWeek)(r,n);return+a==+i}Go.isSameISOWeek=aD;var rD=sn;function aD(e,r){return(0,rD.isSameWeek)(e,r,{weekStartsOn:1})}var dl={};dl.isSameISOWeekYear=iD;var bc=Xe;function iD(e,r){const n=(0,bc.startOfISOWeekYear)(e),a=(0,bc.startOfISOWeekYear)(r);return+n==+a}var Uo={};Uo.isSameMinute=sD;var _c=Xt;function sD(e,r){const n=(0,_c.startOfMinute)(e),a=(0,_c.startOfMinute)(r);return+n==+a}var zo={};zo.isSameMonth=oD;var vc=g;function oD(e,r){const n=(0,vc.toDate)(e),a=(0,vc.toDate)(r);return n.getFullYear()===a.getFullYear()&&n.getMonth()===a.getMonth()}var qo={};qo.isSameQuarter=uD;var Oc=Kt;function uD(e,r){const n=(0,Oc.startOfQuarter)(e),a=(0,Oc.startOfQuarter)(r);return+n==+a}var Qo={},Vo={};Vo.startOfSecond=dD;var cD=g;function dD(e){const r=(0,cD.toDate)(e);return r.setMilliseconds(0),r}Qo.isSameSecond=lD;var xc=Vo;function lD(e,r){const n=(0,xc.startOfSecond)(e),a=(0,xc.startOfSecond)(r);return+n==+a}var Zo={};Zo.isSameYear=fD;var pc=g;function fD(e,r){const n=(0,pc.toDate)(e),a=(0,pc.toDate)(r);return n.getFullYear()===a.getFullYear()}var ll={};ll.isThisHour=hD;var mD=G,gD=Ho;function hD(e){return(0,gD.isSameHour)(e,(0,mD.constructNow)(e))}var fl={};fl.isThisISOWeek=vD;var bD=G,_D=Go;function vD(e){return(0,_D.isSameISOWeek)(e,(0,bD.constructNow)(e))}var ml={};ml.isThisMinute=pD;var OD=G,xD=Uo;function pD(e){return(0,xD.isSameMinute)(e,(0,OD.constructNow)(e))}var gl={};gl.isThisMonth=wD;var DD=G,$D=zo;function wD(e){return(0,$D.isSameMonth)(e,(0,DD.constructNow)(e))}var hl={};hl.isThisQuarter=TD;var PD=G,MD=qo;function TD(e){return(0,MD.isSameQuarter)(e,(0,PD.constructNow)(e))}var bl={};bl.isThisSecond=jD;var ID=G,SD=Qo;function jD(e){return(0,SD.isSameSecond)(e,(0,ID.constructNow)(e))}var _l={};_l.isThisWeek=AD;var ED=G,ND=sn;function AD(e,r){return(0,ND.isSameWeek)(e,(0,ED.constructNow)(e),r)}var vl={};vl.isThisYear=yD;var FD=G,CD=Zo;function yD(e){return(0,CD.isSameYear)(e,(0,FD.constructNow)(e))}var Ol={};Ol.isThursday=RD;var LD=g;function RD(e){return(0,LD.toDate)(e).getDay()===4}var xl={};xl.isToday=HD;var YD=G,WD=Ke;function HD(e){return(0,WD.isSameDay)(e,(0,YD.constructNow)(e))}var pl={};pl.isTomorrow=zD;var BD=ie,GD=G,UD=Ke;function zD(e){return(0,UD.isSameDay)(e,(0,BD.addDays)((0,GD.constructNow)(e),1))}var Dl={};Dl.isTuesday=QD;var qD=g;function QD(e){return(0,qD.toDate)(e).getDay()===2}var $l={};$l.isWednesday=ZD;var VD=g;function ZD(e){return(0,VD.toDate)(e).getDay()===3}var wl={};wl.isWithinInterval=XD;var hs=g;function XD(e,r){const n=+(0,hs.toDate)(e),[a,i]=[+(0,hs.toDate)(r.start),+(0,hs.toDate)(r.end)].sort((s,o)=>s-o);return n>=a&&n<=i}var Pl={},Dt={};Dt.subDays=JD;var KD=ie;function JD(e,r){return(0,KD.addDays)(e,-r)}Pl.isYesterday=n$;var kD=G,e$=Ke,t$=Dt;function n$(e){return(0,e$.isSameDay)(e,(0,t$.subDays)((0,kD.constructNow)(e),1))}var Ml={};Ml.lastDayOfDecade=a$;var r$=g;function a$(e){const r=(0,r$.toDate)(e),n=r.getFullYear(),a=9+Math.floor(n/10)*10;return r.setFullYear(a+1,0,0),r.setHours(0,0,0,0),r}var Tl={},Xo={};Xo.lastDayOfWeek=o$;var i$=g,s$=B;function o$(e,r){var c,d,l,f;const n=(0,s$.getDefaultOptions)(),a=(r==null?void 0:r.weekStartsOn)??((d=(c=r==null?void 0:r.locale)==null?void 0:c.options)==null?void 0:d.weekStartsOn)??n.weekStartsOn??((f=(l=n.locale)==null?void 0:l.options)==null?void 0:f.weekStartsOn)??0,i=(0,i$.toDate)(e),s=i.getDay(),o=(s<a?-7:0)+6-(s-a);return i.setHours(0,0,0,0),i.setDate(i.getDate()+o),i}Tl.lastDayOfISOWeek=c$;var u$=Xo;function c$(e){return(0,u$.lastDayOfWeek)(e,{weekStartsOn:1})}var Il={};Il.lastDayOfISOWeekYear=m$;var d$=we,l$=se,f$=T;function m$(e){const r=(0,d$.getISOWeekYear)(e),n=(0,f$.constructFrom)(e,0);n.setFullYear(r+1,0,4),n.setHours(0,0,0,0);const a=(0,l$.startOfISOWeek)(n);return a.setDate(a.getDate()-1),a}var Sl={};Sl.lastDayOfQuarter=h$;var g$=g;function h$(e){const r=(0,g$.toDate)(e),n=r.getMonth(),a=n-n%3+3;return r.setMonth(a,0),r.setHours(0,0,0,0),r}var jl={};jl.lastDayOfYear=_$;var b$=g;function _$(e){const r=(0,b$.toDate)(e),n=r.getFullYear();return r.setFullYear(n+1,0,0),r.setHours(0,0,0,0),r}var El={};(function(e){e.lightFormat=d,Object.defineProperty(e,"lightFormatters",{enumerable:!0,get:function(){return a.lightFormatters}});var r=fe,n=g,a=rn;const i=/(\w)\1*|''|'(''|[^'])+('|$)|./g,s=/^'([^]*?)'?$/,o=/''/g,c=/[a-zA-Z]/;function d(f,m){const h=(0,n.toDate)(f);if(!(0,r.isValid)(h))throw new RangeError("Invalid time value");const _=m.match(i);return _?_.map(O=>{if(O==="''")return"'";const D=O[0];if(D==="'")return l(O);const x=a.lightFormatters[D];if(x)return x(h,O);if(D.match(c))throw new RangeError("Format string contains an unescaped latin alphabet character `"+D+"`");return O}).join(""):""}function l(f){const m=f.match(s);return m?m[1].replace(o,"'"):f}})(El);var Nl={};Nl.milliseconds=v$;var Dc=b;function v$({years:e,months:r,weeks:n,days:a,hours:i,minutes:s,seconds:o}){let c=0;e&&(c+=e*Dc.daysInYear),r&&(c+=r*(Dc.daysInYear/12)),n&&(c+=n*7),a&&(c+=a);let d=c*24*60*60;return i&&(d+=i*60*60),s&&(d+=s*60),o&&(d+=o),Math.trunc(d*1e3)}var Al={};Al.millisecondsToHours=x$;var O$=b;function x$(e){const r=e/O$.millisecondsInHour;return Math.trunc(r)}var Fl={};Fl.millisecondsToMinutes=D$;var p$=b;function D$(e){const r=e/p$.millisecondsInMinute;return Math.trunc(r)}var Cl={};Cl.millisecondsToSeconds=w$;var $$=b;function w$(e){const r=e/$$.millisecondsInSecond;return Math.trunc(r)}var yl={};yl.minutesToHours=M$;var P$=b;function M$(e){const r=e/P$.minutesInHour;return Math.trunc(r)}var Ll={};Ll.minutesToMilliseconds=I$;var T$=b;function I$(e){return Math.trunc(e*T$.millisecondsInMinute)}var Rl={};Rl.minutesToSeconds=j$;var S$=b;function j$(e){return Math.trunc(e*S$.secondsInMinute)}var Yl={};Yl.monthsToQuarters=N$;var E$=b;function N$(e){const r=e/E$.monthsInQuarter;return Math.trunc(r)}var Wl={};Wl.monthsToYears=F$;var A$=b;function F$(e){const r=e/A$.monthsInYear;return Math.trunc(r)}var ge={};ge.nextDay=L$;var C$=ie,y$=xt;function L$(e,r){let n=r-(0,y$.getDay)(e);return n<=0&&(n+=7),(0,C$.addDays)(e,n)}var Hl={};Hl.nextFriday=Y$;var R$=ge;function Y$(e){return(0,R$.nextDay)(e,5)}var Bl={};Bl.nextMonday=H$;var W$=ge;function H$(e){return(0,W$.nextDay)(e,1)}var Gl={};Gl.nextSaturday=G$;var B$=ge;function G$(e){return(0,B$.nextDay)(e,6)}var Ul={};Ul.nextSunday=z$;var U$=ge;function z$(e){return(0,U$.nextDay)(e,0)}var zl={};zl.nextThursday=Q$;var q$=ge;function Q$(e){return(0,q$.nextDay)(e,4)}var ql={};ql.nextTuesday=Z$;var V$=ge;function Z$(e){return(0,V$.nextDay)(e,2)}var Ql={};Ql.nextWednesday=K$;var X$=ge;function K$(e){return(0,X$.nextDay)(e,3)}var Vl={};Vl.parseISO=J$;var Lt=b;function J$(e,r){const n=(r==null?void 0:r.additionalDigits)??2,a=nw(e);let i;if(a.date){const d=rw(a.date,n);i=aw(d.restDateString,d.year)}if(!i||isNaN(i.getTime()))return new Date(NaN);const s=i.getTime();let o=0,c;if(a.time&&(o=iw(a.time),isNaN(o)))return new Date(NaN);if(a.timezone){if(c=sw(a.timezone),isNaN(c))return new Date(NaN)}else{const d=new Date(s+o),l=new Date(0);return l.setFullYear(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()),l.setHours(d.getUTCHours(),d.getUTCMinutes(),d.getUTCSeconds(),d.getUTCMilliseconds()),l}return new Date(s+o+c)}const Ft={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},k$=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,ew=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,tw=/^([+-])(\d{2})(?::?(\d{2}))?$/;function nw(e){const r={},n=e.split(Ft.dateTimeDelimiter);let a;if(n.length>2)return r;if(/:/.test(n[0])?a=n[0]:(r.date=n[0],a=n[1],Ft.timeZoneDelimiter.test(r.date)&&(r.date=e.split(Ft.timeZoneDelimiter)[0],a=e.substr(r.date.length,e.length))),a){const i=Ft.timezone.exec(a);i?(r.time=a.replace(i[1],""),r.timezone=i[1]):r.time=a}return r}function rw(e,r){const n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+r)+"})|(\\d{2}|[+-]\\d{"+(2+r)+"})$)"),a=e.match(n);if(!a)return{year:NaN,restDateString:""};const i=a[1]?parseInt(a[1]):null,s=a[2]?parseInt(a[2]):null;return{year:s===null?i:s*100,restDateString:e.slice((a[1]||a[2]).length)}}function aw(e,r){if(r===null)return new Date(NaN);const n=e.match(k$);if(!n)return new Date(NaN);const a=!!n[4],i=ut(n[1]),s=ut(n[2])-1,o=ut(n[3]),c=ut(n[4]),d=ut(n[5])-1;if(a)return lw(r,c,d)?ow(r,c,d):new Date(NaN);{const l=new Date(0);return!cw(r,s,o)||!dw(r,i)?new Date(NaN):(l.setUTCFullYear(r,s,Math.max(i,o)),l)}}function ut(e){return e?parseInt(e):1}function iw(e){const r=e.match(ew);if(!r)return NaN;const n=bs(r[1]),a=bs(r[2]),i=bs(r[3]);return fw(n,a,i)?n*Lt.millisecondsInHour+a*Lt.millisecondsInMinute+i*1e3:NaN}function bs(e){return e&&parseFloat(e.replace(",","."))||0}function sw(e){if(e==="Z")return 0;const r=e.match(tw);if(!r)return 0;const n=r[1]==="+"?-1:1,a=parseInt(r[2]),i=r[3]&&parseInt(r[3])||0;return mw(a,i)?n*(a*Lt.millisecondsInHour+i*Lt.millisecondsInMinute):NaN}function ow(e,r,n){const a=new Date(0);a.setUTCFullYear(e,0,4);const i=a.getUTCDay()||7,s=(r-1)*7+n+1-i;return a.setUTCDate(a.getUTCDate()+s),a}const uw=[31,null,31,30,31,30,31,31,30,31,30,31];function Zl(e){return e%400===0||e%4===0&&e%100!==0}function cw(e,r,n){return r>=0&&r<=11&&n>=1&&n<=(uw[r]||(Zl(e)?29:28))}function dw(e,r){return r>=1&&r<=(Zl(e)?366:365)}function lw(e,r,n){return r>=1&&r<=53&&n>=0&&n<=6}function fw(e,r,n){return e===24?r===0&&n===0:n>=0&&n<60&&r>=0&&r<60&&e>=0&&e<25}function mw(e,r){return r>=0&&r<=59}var Xl={};Xl.parseJSON=gw;function gw(e){const r=e.match(/(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d{0,7}))?(?:Z|(.)(\d{2}):?(\d{2})?)?/);return r?new Date(Date.UTC(+r[1],+r[2]-1,+r[3],+r[4]-(+r[9]||0)*(r[8]=="-"?-1:1),+r[5]-(+r[10]||0)*(r[8]=="-"?-1:1),+r[6],+((r[7]||"0")+"00").substring(0,3))):new Date(NaN)}var he={};he.previousDay=_w;var hw=xt,bw=Dt;function _w(e,r){let n=(0,hw.getDay)(e)-r;return n<=0&&(n+=7),(0,bw.subDays)(e,n)}var Kl={};Kl.previousFriday=Ow;var vw=he;function Ow(e){return(0,vw.previousDay)(e,5)}var Jl={};Jl.previousMonday=pw;var xw=he;function pw(e){return(0,xw.previousDay)(e,1)}var kl={};kl.previousSaturday=$w;var Dw=he;function $w(e){return(0,Dw.previousDay)(e,6)}var ef={};ef.previousSunday=Pw;var ww=he;function Pw(e){return(0,ww.previousDay)(e,0)}var tf={};tf.previousThursday=Tw;var Mw=he;function Tw(e){return(0,Mw.previousDay)(e,4)}var nf={};nf.previousTuesday=Sw;var Iw=he;function Sw(e){return(0,Iw.previousDay)(e,2)}var rf={};rf.previousWednesday=Ew;var jw=he;function Ew(e){return(0,jw.previousDay)(e,3)}var af={};af.quartersToMonths=Aw;var Nw=b;function Aw(e){return Math.trunc(e*Nw.monthsInQuarter)}var sf={};sf.quartersToYears=Cw;var Fw=b;function Cw(e){const r=e/Fw.quartersInYear;return Math.trunc(r)}var of={};of.roundToNearestHours=Rw;var yw=me,$c=T,Lw=g;function Rw(e,r){const n=(r==null?void 0:r.nearestTo)??1;if(n<1||n>12)return(0,$c.constructFrom)(e,NaN);const a=(0,Lw.toDate)(e),i=a.getMinutes()/60,s=a.getSeconds()/60/60,o=a.getMilliseconds()/1e3/60/60,c=a.getHours()+i+s+o,d=(r==null?void 0:r.roundingMethod)??"round",f=(0,yw.getRoundingMethod)(d)(c/n)*n,m=(0,$c.constructFrom)(e,a);return m.setHours(f,0,0,0),m}var uf={};uf.roundToNearestMinutes=Hw;var Yw=me,wc=T,Ww=g;function Hw(e,r){const n=(r==null?void 0:r.nearestTo)??1;if(n<1||n>30)return(0,wc.constructFrom)(e,NaN);const a=(0,Ww.toDate)(e),i=a.getSeconds()/60,s=a.getMilliseconds()/1e3/60,o=a.getMinutes()+i+s,c=(r==null?void 0:r.roundingMethod)??"round",l=(0,Yw.getRoundingMethod)(c)(o/n)*n,f=(0,wc.constructFrom)(e,a);return f.setMinutes(l,0,0),f}var cf={};cf.secondsToHours=Gw;var Bw=b;function Gw(e){const r=e/Bw.secondsInHour;return Math.trunc(r)}var df={};df.secondsToMilliseconds=zw;var Uw=b;function zw(e){return e*Uw.millisecondsInSecond}var lf={};lf.secondsToMinutes=Qw;var qw=b;function Qw(e){const r=e/qw.secondsInMinute;return Math.trunc(r)}var ff={},on={};on.setMonth=Kw;var Vw=T,Zw=Ks,Xw=g;function Kw(e,r){const n=(0,Xw.toDate)(e),a=n.getFullYear(),i=n.getDate(),s=(0,Vw.constructFrom)(e,0);s.setFullYear(a,r,15),s.setHours(0,0,0,0);const o=(0,Zw.getDaysInMonth)(s);return n.setMonth(r,Math.min(i,o)),n}ff.set=tP;var Jw=T,kw=on,eP=g;function tP(e,r){let n=(0,eP.toDate)(e);return isNaN(+n)?(0,Jw.constructFrom)(e,NaN):(r.year!=null&&n.setFullYear(r.year),r.month!=null&&(n=(0,kw.setMonth)(n,r.month)),r.date!=null&&n.setDate(r.date),r.hours!=null&&n.setHours(r.hours),r.minutes!=null&&n.setMinutes(r.minutes),r.seconds!=null&&n.setSeconds(r.seconds),r.milliseconds!=null&&n.setMilliseconds(r.milliseconds),n)}var mf={};mf.setDate=rP;var nP=g;function rP(e,r){const n=(0,nP.toDate)(e);return n.setDate(r),n}var gf={};gf.setDayOfYear=iP;var aP=g;function iP(e,r){const n=(0,aP.toDate)(e);return n.setMonth(0),n.setDate(r),n}var hf={};hf.setDefaultOptions=sP;var Pc=B;function sP(e){const r={},n=(0,Pc.getDefaultOptions)();for(const a in n)Object.prototype.hasOwnProperty.call(n,a)&&(r[a]=n[a]);for(const a in e)Object.prototype.hasOwnProperty.call(e,a)&&(e[a]===void 0?delete r[a]:r[a]=e[a]);(0,Pc.setDefaultOptions)(r)}var bf={};bf.setHours=uP;var oP=g;function uP(e,r){const n=(0,oP.toDate)(e);return n.setHours(r),n}var _f={};_f.setMilliseconds=dP;var cP=g;function dP(e,r){const n=(0,cP.toDate)(e);return n.setMilliseconds(r),n}var vf={};vf.setMinutes=fP;var lP=g;function fP(e,r){const n=(0,lP.toDate)(e);return n.setMinutes(r),n}var Of={};Of.setQuarter=hP;var mP=on,gP=g;function hP(e,r){const n=(0,gP.toDate)(e),a=Math.trunc(n.getMonth()/3)+1,i=r-a;return(0,mP.setMonth)(n,n.getMonth()+i*3)}var xf={};xf.setSeconds=_P;var bP=g;function _P(e,r){const n=(0,bP.toDate)(e);return n.setSeconds(r),n}var pf={};pf.setWeekYear=DP;var vP=T,OP=de,Mc=nn,xP=g,pP=B;function DP(e,r,n){var d,l,f,m;const a=(0,pP.getDefaultOptions)(),i=(n==null?void 0:n.firstWeekContainsDate)??((l=(d=n==null?void 0:n.locale)==null?void 0:d.options)==null?void 0:l.firstWeekContainsDate)??a.firstWeekContainsDate??((m=(f=a.locale)==null?void 0:f.options)==null?void 0:m.firstWeekContainsDate)??1;let s=(0,xP.toDate)(e);const o=(0,OP.differenceInCalendarDays)(s,(0,Mc.startOfWeekYear)(s,n)),c=(0,vP.constructFrom)(e,0);return c.setFullYear(r,0,i),c.setHours(0,0,0,0),s=(0,Mc.startOfWeekYear)(c,n),s.setDate(s.getDate()+o),s}var Df={};Df.setYear=PP;var $P=T,wP=g;function PP(e,r){const n=(0,wP.toDate)(e);return isNaN(+n)?(0,$P.constructFrom)(e,NaN):(n.setFullYear(r),n)}var $f={};$f.startOfDecade=TP;var MP=g;function TP(e){const r=(0,MP.toDate)(e),n=r.getFullYear(),a=Math.floor(n/10)*10;return r.setFullYear(a,0,1),r.setHours(0,0,0,0),r}var wf={};wf.startOfToday=SP;var IP=ft;function SP(){return(0,IP.startOfDay)(Date.now())}var Pf={};Pf.startOfTomorrow=jP;function jP(){const e=new Date,r=e.getFullYear(),n=e.getMonth(),a=e.getDate(),i=new Date(0);return i.setFullYear(r,n,a+1),i.setHours(0,0,0,0),i}var Mf={};Mf.startOfYesterday=EP;function EP(){const e=new Date,r=e.getFullYear(),n=e.getMonth(),a=e.getDate(),i=new Date(0);return i.setFullYear(r,n,a-1),i.setHours(0,0,0,0),i}var Tf={},Ko={};Ko.subMonths=AP;var NP=Ve;function AP(e,r){return(0,NP.addMonths)(e,-r)}Tf.sub=LP;var FP=Dt,CP=Ko,yP=T;function LP(e,r){const{years:n=0,months:a=0,weeks:i=0,days:s=0,hours:o=0,minutes:c=0,seconds:d=0}=r,l=(0,CP.subMonths)(e,a+n*12),f=(0,FP.subDays)(l,s+i*7),m=c+o*60,_=(d+m*60)*1e3;return(0,yP.constructFrom)(e,f.getTime()-_)}var If={};If.subBusinessDays=YP;var RP=xs;function YP(e,r){return(0,RP.addBusinessDays)(e,-r)}var Sf={};Sf.subHours=HP;var WP=Yt;function HP(e,r){return(0,WP.addHours)(e,-r)}var jf={};jf.subMilliseconds=GP;var BP=Ze;function GP(e,r){return(0,BP.addMilliseconds)(e,-r)}var Ef={};Ef.subMinutes=zP;var UP=Wt;function zP(e,r){return(0,UP.addMinutes)(e,-r)}var Nf={};Nf.subQuarters=QP;var qP=Ht;function QP(e,r){return(0,qP.addQuarters)(e,-r)}var Af={};Af.subSeconds=ZP;var VP=Ps;function ZP(e,r){return(0,VP.addSeconds)(e,-r)}var Ff={};Ff.subWeeks=KP;var XP=mt;function KP(e,r){return(0,XP.addWeeks)(e,-r)}var Cf={};Cf.subYears=kP;var JP=Ms;function kP(e,r){return(0,JP.addYears)(e,-r)}var yf={};yf.weeksToDays=tM;var eM=b;function tM(e){return Math.trunc(e*eM.daysInWeek)}var Lf={};Lf.yearsToDays=rM;var nM=b;function rM(e){return Math.trunc(e*nM.daysInYear)}var Rf={};Rf.yearsToMonths=iM;var aM=b;function iM(e){return Math.trunc(e*aM.monthsInYear)}var Yf={};Yf.yearsToQuarters=oM;var sM=b;function oM(e){return Math.trunc(e*sM.quartersInYear)}(function(e){var r=Os;Object.keys(r).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===r[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return r[t]}})});var n=xs;Object.keys(n).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===n[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return n[t]}})});var a=ie;Object.keys(a).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===a[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return a[t]}})});var i=Yt;Object.keys(i).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===i[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return i[t]}})});var s=$s;Object.keys(s).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===s[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return s[t]}})});var o=Ze;Object.keys(o).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===o[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return o[t]}})});var c=Wt;Object.keys(c).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===c[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return c[t]}})});var d=Ve;Object.keys(d).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===d[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return d[t]}})});var l=Ht;Object.keys(l).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===l[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return l[t]}})});var f=Ps;Object.keys(f).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===f[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return f[t]}})});var m=mt;Object.keys(m).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===m[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return m[t]}})});var h=Ms;Object.keys(h).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===h[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return h[t]}})});var _=Gc;Object.keys(_).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===_[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return _[t]}})});var p=Uc;Object.keys(p).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===p[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return p[t]}})});var O=zc;Object.keys(O).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===O[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return O[t]}})});var D=qc;Object.keys(D).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===D[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return D[t]}})});var x=Se;Object.keys(x).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===x[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return x[t]}})});var S=Qc;Object.keys(S).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===S[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return S[t]}})});var N=T;Object.keys(N).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===N[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return N[t]}})});var j=G;Object.keys(j).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===j[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return j[t]}})});var z=Vc;Object.keys(z).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===z[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return z[t]}})});var q=Zc;Object.keys(q).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===q[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return q[t]}})});var J=de;Object.keys(J).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===J[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return J[t]}})});var A=js;Object.keys(A).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===A[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return A[t]}})});var F=Xc;Object.keys(F).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===F[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return F[t]}})});var Z=Bt;Object.keys(Z).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Z[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Z[t]}})});var te=Es;Object.keys(te).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===te[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return te[t]}})});var X=Gt;Object.keys(X).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===X[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return X[t]}})});var be=Ut;Object.keys(be).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===be[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return be[t]}})});var Q=zt;Object.keys(Q).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Q[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Q[t]}})});var oe=qt;Object.keys(oe).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===oe[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return oe[t]}})});var ue=Kc;Object.keys(ue).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ue[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ue[t]}})});var L=gt;Object.keys(L).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===L[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return L[t]}})});var C=Qt;Object.keys(C).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===C[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return C[t]}})});var ne=ht;Object.keys(ne).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ne[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ne[t]}})});var Fe=Jc;Object.keys(Fe).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Fe[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Fe[t]}})});var Ce=bt;Object.keys(Ce).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ce[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ce[t]}})});var ye=kc;Object.keys(ye).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ye[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ye[t]}})});var Le=Cs;Object.keys(Le).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Le[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Le[t]}})});var w=ys;Object.keys(w).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===w[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return w[t]}})});var E=ed;Object.keys(E).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===E[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return E[t]}})});var U=td;Object.keys(U).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===U[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return U[t]}})});var Re=nd;Object.keys(Re).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Re[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Re[t]}})});var Me=rd;Object.keys(Me).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Me[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Me[t]}})});var Ye=ad;Object.keys(Ye).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ye[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ye[t]}})});var We=Jt;Object.keys(We).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===We[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return We[t]}})});var fn=id;Object.keys(fn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===fn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return fn[t]}})});var mn=sd;Object.keys(mn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===mn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return mn[t]}})});var gn=od;Object.keys(gn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===gn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return gn[t]}})});var hn=Vt;Object.keys(hn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===hn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return hn[t]}})});var bn=ud;Object.keys(bn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===bn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return bn[t]}})});var _n=cd;Object.keys(_n).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===_n[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return _n[t]}})});var vn=dd;Object.keys(vn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===vn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return vn[t]}})});var On=ld;Object.keys(On).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===On[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return On[t]}})});var xn=fd;Object.keys(xn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===xn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return xn[t]}})});var pn=Zt;Object.keys(pn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===pn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return pn[t]}})});var Dn=md;Object.keys(Dn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Dn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Dn[t]}})});var $n=gd;Object.keys($n).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===$n[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return $n[t]}})});var wn=hd;Object.keys(wn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===wn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return wn[t]}})});var Pn=bd;Object.keys(Pn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Pn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Pn[t]}})});var Mn=Rs;Object.keys(Mn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Mn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Mn[t]}})});var Tn=Ls;Object.keys(Tn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Tn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Tn[t]}})});var In=_d;Object.keys(In).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===In[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return In[t]}})});var Sn=Ys;Object.keys(Sn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Sn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Sn[t]}})});var jn=Vs;Object.keys(jn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===jn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return jn[t]}})});var En=Zs;Object.keys(En).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===En[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return En[t]}})});var Nn=$d;Object.keys(Nn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Nn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Nn[t]}})});var An=wd;Object.keys(An).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===An[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return An[t]}})});var Fn=Pd;Object.keys(Fn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Fn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Fn[t]}})});var Cn=Md;Object.keys(Cn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Cn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Cn[t]}})});var yn=Td;Object.keys(yn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===yn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return yn[t]}})});var Ln=Id;Object.keys(Ln).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ln[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ln[t]}})});var Rn=Sd;Object.keys(Rn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Rn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Rn[t]}})});var Yn=jd;Object.keys(Yn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Yn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Yn[t]}})});var Wn=Ed;Object.keys(Wn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Wn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Wn[t]}})});var Hn=Nd;Object.keys(Hn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Hn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Hn[t]}})});var Bn=Xs;Object.keys(Bn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Bn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Bn[t]}})});var Gn=xt;Object.keys(Gn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Gn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Gn[t]}})});var Un=Qs;Object.keys(Un).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Un[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Un[t]}})});var zn=Ks;Object.keys(zn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===zn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return zn[t]}})});var qn=Ad;Object.keys(qn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===qn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return qn[t]}})});var Qn=Fd;Object.keys(Qn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Qn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Qn[t]}})});var Vn=ks;Object.keys(Vn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Vn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Vn[t]}})});var Zn=Cd;Object.keys(Zn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Zn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Zn[t]}})});var Xn=eo;Object.keys(Xn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Xn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Xn[t]}})});var Kn=en;Object.keys(Kn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Kn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Kn[t]}})});var Jn=we;Object.keys(Jn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Jn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Jn[t]}})});var kn=yd;Object.keys(kn).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===kn[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return kn[t]}})});var er=Ld;Object.keys(er).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===er[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return er[t]}})});var tr=Rd;Object.keys(tr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===tr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return tr[t]}})});var nr=Yd;Object.keys(nr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===nr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return nr[t]}})});var rr=Wd;Object.keys(rr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===rr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return rr[t]}})});var ar=Ns;Object.keys(ar).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ar[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ar[t]}})});var ir=Hd;Object.keys(ir).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ir[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ir[t]}})});var sr=Bd;Object.keys(sr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===sr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return sr[t]}})});var or=Gd;Object.keys(or).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===or[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return or[t]}})});var ur=tn;Object.keys(ur).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ur[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ur[t]}})});var cr=Ud;Object.keys(cr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===cr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return cr[t]}})});var dr=vt;Object.keys(dr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===dr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return dr[t]}})});var lr=zd;Object.keys(lr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===lr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return lr[t]}})});var fr=qd;Object.keys(fr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===fr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return fr[t]}})});var mr=Qd;Object.keys(mr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===mr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return mr[t]}})});var gr=Vd;Object.keys(gr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===gr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return gr[t]}})});var hr=Zd;Object.keys(hr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===hr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return hr[t]}})});var br=Xd;Object.keys(br).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===br[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return br[t]}})});var _r=Kd;Object.keys(_r).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===_r[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return _r[t]}})});var vr=Jd;Object.keys(vr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===vr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return vr[t]}})});var Or=kd;Object.keys(Or).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Or[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Or[t]}})});var xr=el;Object.keys(xr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===xr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return xr[t]}})});var pr=tl;Object.keys(pr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===pr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return pr[t]}})});var Dr=Ss;Object.keys(Dr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Dr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Dr[t]}})});var $r=nl;Object.keys($r).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===$r[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return $r[t]}})});var wr=rl;Object.keys(wr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===wr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return wr[t]}})});var Pr=al;Object.keys(Pr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Pr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Pr[t]}})});var Mr=il;Object.keys(Mr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Mr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Mr[t]}})});var Tr=sl;Object.keys(Tr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Tr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Tr[t]}})});var Ir=Fs;Object.keys(Ir).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ir[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ir[t]}})});var Sr=Js;Object.keys(Sr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Sr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Sr[t]}})});var jr=ol;Object.keys(jr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===jr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return jr[t]}})});var Er=ul;Object.keys(Er).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Er[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Er[t]}})});var Nr=cl;Object.keys(Nr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Nr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Nr[t]}})});var Ar=Ke;Object.keys(Ar).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ar[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ar[t]}})});var Fr=Ho;Object.keys(Fr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Fr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Fr[t]}})});var Cr=Go;Object.keys(Cr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Cr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Cr[t]}})});var yr=dl;Object.keys(yr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===yr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return yr[t]}})});var Lr=Uo;Object.keys(Lr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Lr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Lr[t]}})});var Rr=zo;Object.keys(Rr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Rr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Rr[t]}})});var Yr=qo;Object.keys(Yr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Yr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Yr[t]}})});var Wr=Qo;Object.keys(Wr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Wr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Wr[t]}})});var Hr=sn;Object.keys(Hr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Hr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Hr[t]}})});var Br=Zo;Object.keys(Br).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Br[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Br[t]}})});var Gr=ps;Object.keys(Gr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Gr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Gr[t]}})});var Ur=Ds;Object.keys(Ur).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ur[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ur[t]}})});var zr=ll;Object.keys(zr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===zr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return zr[t]}})});var qr=fl;Object.keys(qr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===qr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return qr[t]}})});var Qr=ml;Object.keys(Qr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Qr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Qr[t]}})});var Vr=gl;Object.keys(Vr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Vr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Vr[t]}})});var Zr=hl;Object.keys(Zr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Zr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Zr[t]}})});var Xr=bl;Object.keys(Xr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Xr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Xr[t]}})});var Kr=_l;Object.keys(Kr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Kr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Kr[t]}})});var Jr=vl;Object.keys(Jr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Jr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Jr[t]}})});var kr=Ol;Object.keys(kr).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===kr[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return kr[t]}})});var ea=xl;Object.keys(ea).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ea[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ea[t]}})});var ta=pl;Object.keys(ta).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ta[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ta[t]}})});var na=Dl;Object.keys(na).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===na[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return na[t]}})});var ra=fe;Object.keys(ra).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ra[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ra[t]}})});var aa=$l;Object.keys(aa).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===aa[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return aa[t]}})});var ia=lt;Object.keys(ia).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ia[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ia[t]}})});var sa=wl;Object.keys(sa).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===sa[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return sa[t]}})});var oa=Pl;Object.keys(oa).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===oa[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return oa[t]}})});var ua=Ml;Object.keys(ua).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ua[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ua[t]}})});var ca=Tl;Object.keys(ca).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ca[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ca[t]}})});var da=Il;Object.keys(da).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===da[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return da[t]}})});var la=to;Object.keys(la).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===la[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return la[t]}})});var fa=Sl;Object.keys(fa).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===fa[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return fa[t]}})});var ma=Xo;Object.keys(ma).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ma[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ma[t]}})});var ga=jl;Object.keys(ga).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ga[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ga[t]}})});var ha=El;Object.keys(ha).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ha[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ha[t]}})});var ba=Ts;Object.keys(ba).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ba[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ba[t]}})});var _a=Nl;Object.keys(_a).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===_a[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return _a[t]}})});var va=Al;Object.keys(va).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===va[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return va[t]}})});var Oa=Fl;Object.keys(Oa).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Oa[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Oa[t]}})});var xa=Cl;Object.keys(xa).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===xa[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return xa[t]}})});var pa=Is;Object.keys(pa).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===pa[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return pa[t]}})});var Da=yl;Object.keys(Da).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Da[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Da[t]}})});var $a=Ll;Object.keys($a).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===$a[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return $a[t]}})});var wa=Rl;Object.keys(wa).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===wa[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return wa[t]}})});var Pa=Yl;Object.keys(Pa).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Pa[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Pa[t]}})});var Ma=Wl;Object.keys(Ma).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ma[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ma[t]}})});var Ta=ge;Object.keys(Ta).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ta[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ta[t]}})});var Ia=Hl;Object.keys(Ia).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ia[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ia[t]}})});var Sa=Bl;Object.keys(Sa).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Sa[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Sa[t]}})});var ja=Gl;Object.keys(ja).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ja[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ja[t]}})});var Ea=Ul;Object.keys(Ea).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ea[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ea[t]}})});var Na=zl;Object.keys(Na).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Na[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Na[t]}})});var Aa=ql;Object.keys(Aa).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Aa[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Aa[t]}})});var Fa=Ql;Object.keys(Fa).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Fa[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Fa[t]}})});var Ca=no;Object.keys(Ca).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ca[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ca[t]}})});var ya=Vl;Object.keys(ya).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ya[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ya[t]}})});var La=Xl;Object.keys(La).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===La[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return La[t]}})});var Ra=he;Object.keys(Ra).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ra[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ra[t]}})});var Ya=Kl;Object.keys(Ya).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ya[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ya[t]}})});var Wa=Jl;Object.keys(Wa).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Wa[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Wa[t]}})});var Ha=kl;Object.keys(Ha).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ha[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ha[t]}})});var Ba=ef;Object.keys(Ba).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ba[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ba[t]}})});var Ga=tf;Object.keys(Ga).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ga[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ga[t]}})});var Ua=nf;Object.keys(Ua).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ua[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ua[t]}})});var za=rf;Object.keys(za).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===za[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return za[t]}})});var qa=af;Object.keys(qa).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===qa[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return qa[t]}})});var Qa=sf;Object.keys(Qa).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Qa[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Qa[t]}})});var Va=of;Object.keys(Va).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Va[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Va[t]}})});var Za=uf;Object.keys(Za).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Za[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Za[t]}})});var Xa=cf;Object.keys(Xa).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Xa[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Xa[t]}})});var Ka=df;Object.keys(Ka).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ka[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ka[t]}})});var Ja=lf;Object.keys(Ja).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ja[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ja[t]}})});var ka=ff;Object.keys(ka).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ka[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ka[t]}})});var ei=mf;Object.keys(ei).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ei[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ei[t]}})});var ti=pt;Object.keys(ti).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ti[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ti[t]}})});var ni=gf;Object.keys(ni).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ni[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ni[t]}})});var ri=hf;Object.keys(ri).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ri[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ri[t]}})});var ai=bf;Object.keys(ai).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ai[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ai[t]}})});var ii=Mo;Object.keys(ii).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ii[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ii[t]}})});var si=Oo;Object.keys(si).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===si[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return si[t]}})});var oi=ws;Object.keys(oi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===oi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return oi[t]}})});var ui=_f;Object.keys(ui).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ui[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ui[t]}})});var ci=vf;Object.keys(ci).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ci[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ci[t]}})});var di=on;Object.keys(di).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===di[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return di[t]}})});var li=Of;Object.keys(li).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===li[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return li[t]}})});var fi=xf;Object.keys(fi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===fi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return fi[t]}})});var mi=_o;Object.keys(mi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===mi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return mi[t]}})});var gi=pf;Object.keys(gi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===gi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return gi[t]}})});var hi=Df;Object.keys(hi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===hi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return hi[t]}})});var bi=ft;Object.keys(bi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===bi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return bi[t]}})});var _i=$f;Object.keys(_i).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===_i[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return _i[t]}})});var vi=Bo;Object.keys(vi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===vi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return vi[t]}})});var Oi=se;Object.keys(Oi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Oi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Oi[t]}})});var xi=Xe;Object.keys(xi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===xi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return xi[t]}})});var pi=Xt;Object.keys(pi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===pi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return pi[t]}})});var Di=_t;Object.keys(Di).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Di[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Di[t]}})});var $i=Kt;Object.keys($i).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===$i[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return $i[t]}})});var wi=Vo;Object.keys(wi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===wi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return wi[t]}})});var Pi=wf;Object.keys(Pi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Pi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Pi[t]}})});var Mi=Pf;Object.keys(Mi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Mi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Mi[t]}})});var Ti=ee;Object.keys(Ti).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ti[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ti[t]}})});var Ii=nn;Object.keys(Ii).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ii[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ii[t]}})});var Si=kt;Object.keys(Si).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Si[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Si[t]}})});var ji=Mf;Object.keys(ji).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===ji[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return ji[t]}})});var Ei=Tf;Object.keys(Ei).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ei[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ei[t]}})});var Ni=If;Object.keys(Ni).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ni[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ni[t]}})});var Ai=Dt;Object.keys(Ai).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ai[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ai[t]}})});var Fi=Sf;Object.keys(Fi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Fi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Fi[t]}})});var Ci=As;Object.keys(Ci).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ci[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ci[t]}})});var yi=jf;Object.keys(yi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===yi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return yi[t]}})});var Li=Ef;Object.keys(Li).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Li[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Li[t]}})});var Ri=Ko;Object.keys(Ri).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ri[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ri[t]}})});var Yi=Nf;Object.keys(Yi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Yi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Yi[t]}})});var Wi=Af;Object.keys(Wi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Wi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Wi[t]}})});var Hi=Ff;Object.keys(Hi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Hi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Hi[t]}})});var Bi=Cf;Object.keys(Bi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Bi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Bi[t]}})});var Gi=g;Object.keys(Gi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Gi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Gi[t]}})});var Ui=io;Object.keys(Ui).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Ui[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Ui[t]}})});var zi=yf;Object.keys(zi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===zi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return zi[t]}})});var qi=Lf;Object.keys(qi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===qi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return qi[t]}})});var Qi=Rf;Object.keys(Qi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Qi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Qi[t]}})});var Vi=Yf;Object.keys(Vi).forEach(function(t){t==="default"||t==="__esModule"||t in e&&e[t]===Vi[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return Vi[t]}})})})(Wc);Object.defineProperty(ae,"__esModule",{value:!0});ae.isValidDate=ae.formatISODate=ae.formatRelativeDate=ae.formatDate=void 0;const dt=Wc,uM=(e,r="PPP")=>{const n=typeof e=="string"?(0,dt.parseISO)(e):e;return(0,dt.format)(n,r)};ae.formatDate=uM;const cM=e=>{const r=typeof e=="string"?(0,dt.parseISO)(e):e;return(0,dt.formatDistanceToNow)(r,{addSuffix:!0})};ae.formatRelativeDate=cM;const dM=(e=new Date)=>e.toISOString();ae.formatISODate=dM;const lM=e=>{try{const r=(0,dt.parseISO)(e);return!isNaN(r.getTime())}catch{return!1}};ae.isValidDate=lM;var Wf={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.extractTitleFromSlug=e.extractDateFromSlug=e.createPostSlug=e.createSlug=void 0;const r=s=>s.toLowerCase().trim().replace(/[\s_]+/g,"-").replace(/[^a-z0-9-]/g,"").replace(/-+/g,"-").replace(/^-+|-+$/g,"");e.createSlug=r;const n=(s,o)=>{const c=(0,e.createSlug)(s);return o?`${o.toISOString().split("T")[0]}-${c}`:c};e.createPostSlug=n;const a=s=>{const o=s.match(/^(\d{4}-\d{2}-\d{2})-/);return o?new Date(o[1]):null};e.extractDateFromSlug=a;const i=s=>s.replace(/^\d{4}-\d{2}-\d{2}-/,"").split("-").map(c=>c.charAt(0).toUpperCase()+c.slice(1)).join(" ");e.extractTitleFromSlug=i})(Wf);var Hf={};(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.generateStructuredData=e.truncateDescription=e.generatePageSEO=e.generatePostSEO=void 0;const r=Y,n=o=>{var _,p,O,D;const c=((_=o.seo)==null?void 0:_.metaTitle)||o.title,d=((p=o.seo)==null?void 0:p.keywords)||o.tags,l=o.coverImage||`${r.CONFIG.SITE_URL}/images/og-post.png`,f=o.subtitle?`${c} — ${o.subtitle}`:c,m=((O=o.seo)==null?void 0:O.metaDescription)||(o.subtitle?`${o.subtitle}. ${o.excerpt}`:o.excerpt),h=((D=o.seo)==null?void 0:D.metaDescription)||o.subtitle||o.excerpt;return{title:`${c} | ${r.CONFIG.SITE_TITLE}`,description:(0,e.truncateDescription)(m),keywords:d,ogTitle:f,ogDescription:(0,e.truncateDescription)(h),ogUrl:`${r.CONFIG.SITE_URL}/posts/${o.slug}`,ogImage:l,twitterCard:o.coverImage?"summary_large_image":"summary",canonicalUrl:`${r.CONFIG.SITE_URL}/posts/${o.slug}`,publishedTime:typeof o.publishedAt=="string"?o.publishedAt:o.publishedAt.toISOString(),modifiedTime:typeof o.updatedAt=="string"?o.updatedAt:o.updatedAt.toISOString(),author:o.author}};e.generatePostSEO=n;const a=(o,c,d="")=>({title:o===r.CONFIG.SITE_TITLE?o:`${o} | ${r.CONFIG.SITE_TITLE}`,description:c||r.CONFIG.SITE_DESCRIPTION,ogTitle:o,ogDescription:c||r.CONFIG.SITE_DESCRIPTION,ogUrl:`${r.CONFIG.SITE_URL}${d}`,ogImage:`${r.CONFIG.SITE_URL}/images/og-default.png`,twitterCard:"summary",canonicalUrl:`${r.CONFIG.SITE_URL}${d}`});e.generatePageSEO=a;const i=(o,c=160)=>o.length<=c?o:o.substring(0,c).replace(/\s+\S*$/,"")+"...";e.truncateDescription=i;const s=o=>{const c={"@context":"https://schema.org","@type":"BlogPosting",headline:o.title,description:o.excerpt,image:o.coverImage||`${r.CONFIG.SITE_URL}/images/posts/${o.slug}.jpg`,datePublished:typeof o.publishedAt=="string"?o.publishedAt:o.publishedAt.toISOString(),dateModified:typeof o.updatedAt=="string"?o.updatedAt:o.updatedAt.toISOString(),author:{"@type":"Person",name:o.author,url:r.CONFIG.SITE_URL},publisher:{"@type":"Organization",name:r.CONFIG.SITE_TITLE,url:r.CONFIG.SITE_URL},mainEntityOfPage:{"@type":"WebPage","@id":`${r.CONFIG.SITE_URL}/posts/${o.slug}`},keywords:o.tags.join(", "),wordCount:o.wordCount,timeRequired:`PT${o.readingTimeMinutes}M`};return o.subtitle&&(c.alternativeHeadline=o.subtitle),o.series&&(c.isPartOf={"@type":"BlogPosting",name:o.series.name,url:`${r.CONFIG.SITE_URL}/tags/${o.series.slug}`}),o.views&&(c.interactionStatistic={"@type":"InteractionCounter",interactionType:"https://schema.org/ReadAction",userInteractionCount:o.views}),c};e.generateStructuredData=s})(Hf);var un={};Object.defineProperty(un,"__esModule",{value:!0});un.generateRSSFeed=fM;un.generateAtomFeed=mM;const H=Y;function fM(e){const r=new Date().toUTCString(),n=e.slice(0,20).map(a=>{const i=a.publishedAt instanceof Date?a.publishedAt.toUTCString():new Date(a.publishedAt).toUTCString(),s=`${H.CONFIG.SITE_URL}/posts/${a.slug}`,o=a.excerpt?a.excerpt.replace(/<[^>]*>/g,"").substring(0,300)+"...":a.title;return`
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${s}</link>
      <guid isPermaLink="true">${s}</guid>
      <description><![CDATA[${o}]]></description>
      <pubDate>${i}</pubDate>
      ${a.author?`<author>${a.author}</author>`:""}
      ${a.category?`<category><![CDATA[${a.category}]]></category>`:""}
      ${a.tags?a.tags.map(c=>`<category><![CDATA[${c}]]></category>`).join(`
      `):""}
    </item>`}).join("");return`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${H.CONFIG.SITE_TITLE}]]></title>
    <link>${H.CONFIG.SITE_URL}</link>
    <description><![CDATA[${H.CONFIG.SITE_DESCRIPTION}]]></description>
    <language>en-us</language>
    <lastBuildDate>${r}</lastBuildDate>
    <atom:link href="${H.CONFIG.SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <generator>Jiweon Blog RSS Generator</generator>
    <webMaster>${H.CONFIG.AUTHOR_EMAIL} (${H.CONFIG.AUTHOR_NAME})</webMaster>
    <managingEditor>${H.CONFIG.AUTHOR_EMAIL} (${H.CONFIG.AUTHOR_NAME})</managingEditor>
    <copyright>Copyright ${new Date().getFullYear()} ${H.CONFIG.AUTHOR_NAME}</copyright>
    <ttl>60</ttl>${n}
  </channel>
</rss>`}function mM(e){const r=new Date().toISOString(),n=e.slice(0,20).map(a=>{const i=a.publishedAt instanceof Date?a.publishedAt.toISOString():new Date(a.publishedAt).toISOString(),s=`${H.CONFIG.SITE_URL}/posts/${a.slug}`,o=a.excerpt?a.excerpt.replace(/<[^>]*>/g,"").substring(0,500)+"...":a.title;return`
    <entry>
      <title type="html"><![CDATA[${a.title}]]></title>
      <link href="${s}"/>
      <id>${s}</id>
      <published>${i}</published>
      <updated>${i}</updated>
      ${a.author?`<author><name>${a.author}</name></author>`:""}
      <content type="html"><![CDATA[${o}]]></content>
      ${a.category?`<category term="${a.category}"/>`:""}
      ${a.tags?a.tags.map(c=>`<category term="${c}"/>`).join(`
      `):""}
    </entry>`}).join("");return`<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title><![CDATA[${H.CONFIG.SITE_TITLE}]]></title>
  <link href="${H.CONFIG.SITE_URL}"/>
  <link href="${H.CONFIG.SITE_URL}/atom.xml" rel="self"/>
  <id>${H.CONFIG.SITE_URL}</id>
  <updated>${r}</updated>
  <subtitle><![CDATA[${H.CONFIG.SITE_DESCRIPTION}]]></subtitle>
  <generator>Jiweon Blog Atom Generator</generator>
  ${H.CONFIG.AUTHOR_NAME?`<author><name>${H.CONFIG.AUTHOR_NAME}</name></author>`:""}${n}
</feed>`}var $t={};Object.defineProperty($t,"__esModule",{value:!0});$t.getPostLanguage=hM;$t.getLanguageLabel=bM;$t.getTopicTags=_M;const Bf=["ko","en"],gM={ko:"한국어",en:"English"};function hM(e){return e.tags.map(n=>n.toLowerCase()).find(n=>Bf.includes(n))??null}function bM(e){return gM[e]}function _M(e){return e.tags.filter(r=>!Bf.includes(r.toLowerCase()))}var cn={};Object.defineProperty(cn,"__esModule",{value:!0});cn.HashnodeService=void 0;class vM{constructor(r,n){this.apiUrl="https://gql.hashnode.com/",this.publicationId=r,this.authToken=n}async request(r,n){const a={"Content-Type":"application/json"};this.authToken&&(a.Authorization=this.authToken);const i=await fetch(this.apiUrl,{method:"POST",headers:a,body:JSON.stringify({query:r,variables:n})});if(!i.ok)throw new Error(`HTTP error! status: ${i.status}`);const s=await i.json();if(s.errors)throw new Error(`GraphQL error: ${s.errors[0].message}`);return s.data}async getPublication(){return(await this.request(`
      query GetPublication($id: ObjectId!) {
        publication(id: $id) {
          id
          title
          displayTitle
          about {
            markdown
          }
          url
          author {
            id
            name
            username
          }
        }
      }
    `,{id:this.publicationId})).publication}async getPosts(r=10,n){const i=await this.request(`
      query GetPosts($publicationId: ObjectId!, $first: Int!, $after: String) {
        publication(id: $publicationId) {
          posts(first: $first, after: $after) {
            edges {
              node {
                id
                title
                subtitle
                slug
                content {
                  markdown
                  html
                }
                brief
                publishedAt
                updatedAt
                tags {
                  id
                  name
                  slug
                }
                author {
                  id
                  name
                  username
                }
                publication {
                  id
                  title
                  url
                }
                coverImage {
                  url
                }
                readTimeInMinutes
                reactionCount
                responseCount
                featured
                views
                series {
                  id
                  name
                  slug
                }
                seo {
                  title
                  description
                }
                ogMetaData {
                  image
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    `,{publicationId:this.publicationId,first:r,after:n});return{posts:i.publication.posts.edges.map(s=>s.node),pageInfo:i.publication.posts.pageInfo}}async getPostBySlug(r){return(await this.request(`
      query GetPost($publicationId: ObjectId!, $slug: String!) {
        publication(id: $publicationId) {
          post(slug: $slug) {
            id
            title
            subtitle
            slug
            content {
              markdown
              html
            }
            brief
            publishedAt
            updatedAt
            tags {
              id
              name
              slug
            }
            author {
              id
              name
              username
            }
            publication {
              id
              title
              url
            }
            coverImage {
              url
            }
            readTimeInMinutes
            reactionCount
            responseCount
            featured
            views
            series {
              id
              name
              slug
            }
            seo {
              title
              description
            }
            ogMetaData {
              image
            }
          }
        }
      }
    `,{publicationId:this.publicationId,slug:r})).publication.post}async getSeries(){const r=`
      query GetPublicationSeries($publicationId: ObjectId!) {
        publication(id: $publicationId) {
          seriesList {
            edges {
              node {
                id
                name
                slug
                posts(first: 20) {
                  edges {
                    node {
                      id
                      title
                      slug
                      brief
                      publishedAt
                      readTimeInMinutes
                      views
                      tags {
                        name
                      }
                      author {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;try{return(await this.request(r,{publicationId:this.publicationId})).publication.seriesList.edges.map(a=>({id:a.node.id,name:a.node.name,slug:a.node.slug,posts:a.node.posts.edges.map(i=>i.node)}))}catch(n){console.error("Failed to fetch series from API, falling back to post extraction:",n);const{posts:a}=await this.getPosts(20),i=new Map;return a.forEach(s=>{if(s.series){const o=s.series.id;i.has(o)||i.set(o,{id:s.series.id,name:s.series.name,slug:s.series.slug,posts:[]}),i.get(o).posts.push(s)}}),Array.from(i.values())}}async getDraft(r){return(await this.request(`
      query Draft($id: ObjectId!) {
        draft(id: $id) {
          id
          slug
          title
          subtitle
          content {
            markdown
          }
        }
      }
    `,{id:r})).draft}async getSeriesPosts(r){const n=`
      query GetSeriesPosts($publicationId: ObjectId!, $seriesSlug: String!) {
        publication(id: $publicationId) {
          series(slug: $seriesSlug) {
            posts(first: 20) {
              edges {
                node {
                  id
                  title
                  subtitle
                  slug
                  content {
                    markdown
                    html
                  }
                  brief
                  publishedAt
                  updatedAt
                  tags {
                    id
                    name
                    slug
                  }
                  author {
                    id
                    name
                    username
                  }
                  publication {
                    id
                    title
                    url
                  }
                  coverImage {
                    url
                  }
                  readTimeInMinutes
                  reactionCount
                  responseCount
                  featured
                  views
                  series {
                    id
                    name
                    slug
                  }
                  seo {
                    title
                    description
                  }
                  ogMetaData {
                    image
                  }
                }
              }
            }
          }
        }
      }
    `;try{return(await this.request(n,{publicationId:this.publicationId,seriesSlug:r})).publication.series.posts.edges.map(i=>i.node)}catch(a){console.error("Failed to fetch series posts, falling back to filtering:",a);const{posts:i}=await this.getPosts(20);return i.filter(s=>{var o;return((o=s.series)==null?void 0:o.slug)===r})}}transformToBlogPost(r){var n,a,i,s,o;return{slug:r.slug,title:r.title,subtitle:r.subtitle,content:r.content.html,excerpt:r.brief,publishedAt:new Date(r.publishedAt),updatedAt:new Date(r.updatedAt),tags:r.tags.map(c=>c.name),category:((n=r.tags[0])==null?void 0:n.name)||"general",author:r.author.name,featured:r.featured,draft:!1,readingTimeMinutes:r.readTimeInMinutes,wordCount:Math.round(r.readTimeInMinutes*200),views:r.views,series:r.series,coverImage:((a=r.coverImage)==null?void 0:a.url)||((i=r.ogMetaData)==null?void 0:i.image),seo:{metaTitle:((s=r.seo)==null?void 0:s.title)||r.title,metaDescription:((o=r.seo)==null?void 0:o.description)||r.brief,keywords:r.tags.map(c=>c.name)}}}transformToBlogMetadata(r){var n,a;return{siteTitle:r.displayTitle||r.title,siteDescription:((n=r.about)==null?void 0:n.markdown)||r.title,siteUrl:r.url,authorName:((a=r.author)==null?void 0:a.name)||"Author",authorEmail:"",socialLinks:{},theme:{primaryColor:"#2563eb",accentColor:"#3b82f6",backgroundColor:"#ffffff",textColor:"#111827"},navigation:[{label:"Home",href:"/",external:!1,order:1},{label:"Posts",href:"/posts",external:!1,order:2},{label:"About",href:"/about",external:!1,order:3}],featuredPostsCount:3,postsPerPage:10}}}cn.HashnodeService=vM;var wt={},Pe={},Ne={};Object.defineProperty(Ne,"__esModule",{value:!0});Ne.isDraftFile=Jo;Ne.isNoteFile=ko;Ne.parseNotes=MM;Ne.parseMarkdownPosts=IM;const OM=Y,xM=/^([A-Za-z][A-Za-z0-9_]*):[ \t]?(.*)$/;function pM(e){return!e||!e.trimStart().startsWith('"')?!1:(e.match(/"/g)||[]).length%2===1}function DM(e){const r=e.trim();return r.length>=2&&r.startsWith('"')&&r.endsWith('"')?r.slice(1,-1):r}function Gf(e){const r=e.match(/^﻿?---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);if(!r)return{data:{},body:e};const n={};let a=null;for(const i of r[1].split(/\r?\n/)){const s=i.match(xM),o=a?pM(n[a]):!1;s&&!o?(a=s[1],n[a]=s[2]):a&&(n[a]+=`
`+i)}for(const i of Object.keys(n))n[i]=DM(n[i]);return{data:n,body:r[2].replace(/^\s+/,"")}}function Uf(e){return e.replace(/```[\s\S]*?```/g," ").replace(/`[^`]*`/g," ").replace(/!\[[^\]]*\]\([^)]*\)/g," ").replace(/\[([^\]]*)\]\([^)]*\)/g,"$1").replace(/^#{1,6}\s+/gm,"").replace(/^>\s?/gm,"").replace(/[*_~>#-]/g," ").replace(/\s+/g," ").trim()}function $M(e){const r=Uf(e);return r.length>200?r.slice(0,200).trimEnd()+"…":r}function wM(e){const r=e.split(/\s+/).filter(Boolean).length,n=(e.match(/[　-鿿가-힯]/g)||[]).length;return r+n}function Jo(e){return e.startsWith("draft-")}function ko(e){return e.startsWith("note_")||e.startsWith("note-")}function PM(e){var l,f,m;const{data:r,body:n}=Gf(e.raw),a=n.trim();if(!a)return null;const i=r.datePublished||r.date||"",s=new Date(i),o=isNaN(s.getTime())?new Date:s,c=(r.slug||r.cuid||e.name.replace(/^note[_-]/,"").replace(/\.md$/,"")).trim(),d=(r.tags||"").split(",").map(h=>h.trim()).filter(Boolean);return{id:c,title:((l=r.title)==null?void 0:l.trim())||void 0,body:a,date:o,source:((f=r.source)==null?void 0:f.trim())||((m=r.url)==null?void 0:m.trim())||void 0,tags:d}}function MM(e){return e.filter(r=>ko(r.name)&&!Jo(r.name)).map(PM).filter(r=>r!==null).sort((r,n)=>n.date.getTime()-r.date.getTime())}function TM(e){const{data:r,body:n}=Gf(e.raw),a=(r.slug||e.name.replace(/\.md$/,"")).trim(),i=(r.title||"").trim();if(!a||!i)return null;const s=new Date(r.datePublished||""),o=isNaN(s.getTime())?new Date:s,c=(r.tags||"").split(",").map(m=>m.trim()).filter(Boolean),l=(r.seoDescription?r.seoDescription.replace(/\s+/g," ").trim():"")||$M(n),f=wM(Uf(n));return{slug:a,title:i,subtitle:r.subtitle||void 0,content:n,excerpt:l,publishedAt:o,updatedAt:o,tags:c,category:c[0]||"general",author:OM.CONFIG.AUTHOR_NAME,featured:!1,draft:!1,readingTimeMinutes:Math.max(1,Math.round(f/200)),wordCount:f,coverImage:r.cover||r.ogImage||void 0,seo:{metaTitle:r.seoTitle||i,metaDescription:l,keywords:c}}}function IM(e){return e.filter(r=>!Jo(r.name)&&!ko(r.name)).map(TM).filter(r=>r!==null).sort((r,n)=>n.publishedAt.getTime()-r.publishedAt.getTime())}Object.defineProperty(Pe,"__esModule",{value:!0});Pe.LocalMarkdownContentProvider=void 0;Pe.registerLocalPosts=SM;Pe.getLocalNotes=jM;Pe.createLocalContentProvider=NM;const De=Y,Tc=Ne,zf=[];let qf=[],Qf=[];function SM(e){qf=(0,Tc.parseMarkdownPosts)(e),Qf=(0,Tc.parseNotes)(e)}function jM(){return Qf}function EM(e){const r=e.tags.map(n=>n.toLowerCase());return zf.find(n=>r.includes(n.tag))}class Vf{all(){return qf.map(r=>{const n=EM(r);return n?{...r,series:{id:n.id,name:n.name,slug:n.slug}}:r})}async getPosts(r,n=0){const a=this.all();return r?a.slice(n,n+r):a.slice(n)}async getPostBySlug(r){return this.all().find(n=>n.slug===r)||null}async getMetadata(){return{siteTitle:De.CONFIG.SITE_TITLE,siteDescription:De.CONFIG.SITE_DESCRIPTION,siteUrl:De.CONFIG.SITE_URL,authorName:De.CONFIG.AUTHOR_NAME,authorEmail:De.CONFIG.AUTHOR_EMAIL,socialLinks:{},theme:{primaryColor:"#2563eb",accentColor:"#3b82f6",backgroundColor:"#ffffff",textColor:"#111827"},navigation:[{label:"Home",href:"/",external:!1,order:1},{label:"Posts",href:"/posts",external:!1,order:2},{label:"About",href:"/about",external:!1,order:3}],featuredPostsCount:De.CONFIG.FEATURED_POSTS_COUNT,postsPerPage:De.CONFIG.POSTS_PER_PAGE}}async searchPosts(r){const n=r.toLowerCase();return this.all().filter(a=>a.title.toLowerCase().includes(n)||a.content.toLowerCase().includes(n)||a.excerpt.toLowerCase().includes(n)||a.tags.some(i=>i.toLowerCase().includes(n)))}async getFeaturedPosts(){const r=this.all().filter(a=>a.featured);return(r.length>0?r:this.all()).slice(0,De.CONFIG.FEATURED_POSTS_COUNT)}async getPostsByCategory(r){return this.all().filter(n=>n.category===r)}async getPostsByTag(r){return this.all().filter(n=>n.tags.includes(r))}async getSeriesPosts(r){return this.all().filter(n=>{var a;return((a=n.series)==null?void 0:a.slug)===r}).sort((n,a)=>n.publishedAt.getTime()-a.publishedAt.getTime())}async getTags(){const r=new Set;return this.all().forEach(n=>n.tags.forEach(a=>r.add(a))),Array.from(r).sort()}async getCategories(){const r=new Set;return this.all().forEach(n=>r.add(n.category)),Array.from(r).sort()}async getSeries(){const r=this.all();return zf.map(n=>({id:n.id,name:n.name,slug:n.slug,posts:r.filter(a=>{var i;return((i=a.series)==null?void 0:i.slug)===n.slug}).sort((a,i)=>a.publishedAt.getTime()-i.publishedAt.getTime())})).filter(n=>n.posts.length>0)}async getDraft(){return null}}Pe.LocalMarkdownContentProvider=Vf;function NM(){return new Vf}Object.defineProperty(wt,"__esModule",{value:!0});wt.HashnodeContentProvider=void 0;wt.createContentProvider=CM;const re=Y,AM=Pe;class FM{constructor(r){this.cacheKey=re.STORAGE_KEYS.POSTS_CACHE,this.cacheTimeout=5*60*1e3,this.hashnodeService=r}getCachedData(r){try{const n=localStorage.getItem(`${this.cacheKey}-${r}`);if(!n)return null;const{data:a,timestamp:i}=JSON.parse(n);return Date.now()-i>this.cacheTimeout?(localStorage.removeItem(`${this.cacheKey}-${r}`),null):a}catch{return null}}setCachedData(r,n){try{localStorage.setItem(`${this.cacheKey}-${r}`,JSON.stringify({data:n,timestamp:Date.now()}))}catch{}}async getPosts(r=re.CONFIG.POSTS_PER_PAGE,n=0){const a=`posts-${r}-${n}`,i=this.getCachedData(a);if(i)return i;try{const o=(await this.hashnodeService.getPosts(r)).posts.map(c=>this.hashnodeService.transformToBlogPost(c));return this.setCachedData(a,o),o}catch(s){return console.error("Failed to fetch posts from Hashnode:",s),[]}}async getPostBySlug(r){const n=`post-${r}`,a=this.getCachedData(n);if(a)return a;try{const i=await this.hashnodeService.getPostBySlug(r);if(!i)return null;const s=this.hashnodeService.transformToBlogPost(i);return this.setCachedData(n,s),s}catch(i){return console.error(`Failed to fetch post ${r} from Hashnode:`,i),null}}async getMetadata(){const r="metadata",n=this.getCachedData(r);if(n)return n;try{const a=await this.hashnodeService.getPublication(),i=this.hashnodeService.transformToBlogMetadata(a);return this.setCachedData(r,i),i}catch(a){return console.error("Failed to fetch metadata from Hashnode:",a),{siteTitle:re.CONFIG.SITE_TITLE,siteDescription:re.CONFIG.SITE_DESCRIPTION,siteUrl:re.CONFIG.SITE_URL,authorName:re.CONFIG.AUTHOR_NAME,authorEmail:re.CONFIG.AUTHOR_EMAIL,socialLinks:{},theme:{primaryColor:"#2563eb",accentColor:"#3b82f6",backgroundColor:"#ffffff",textColor:"#111827"},navigation:[{label:"Home",href:"/",external:!1,order:1},{label:"Posts",href:"/posts",external:!1,order:2},{label:"About",href:"/about",external:!1,order:3}],featuredPostsCount:re.CONFIG.FEATURED_POSTS_COUNT,postsPerPage:re.CONFIG.POSTS_PER_PAGE}}}async searchPosts(r){const n=await this.getPosts(50),a=r.toLowerCase();return n.filter(i=>i.title.toLowerCase().includes(a)||i.content.toLowerCase().includes(a)||i.excerpt.toLowerCase().includes(a)||i.tags.some(s=>s.toLowerCase().includes(a)))}async getFeaturedPosts(){return(await this.getPosts()).filter(n=>n.featured).slice(0,re.CONFIG.FEATURED_POSTS_COUNT)}async getPostsByCategory(r){return(await this.getPosts(50)).filter(a=>a.category===r)}async getPostsByTag(r){return(await this.getPosts(50)).filter(a=>a.tags.includes(r))}async getSeriesPosts(r){const n=`series-posts-${r}`,a=this.getCachedData(n);if(a)return a;try{const s=(await this.hashnodeService.getSeriesPosts(r)).map(o=>this.hashnodeService.transformToBlogPost(o));return this.setCachedData(n,s),s}catch(i){return console.error("Failed to fetch series posts:",i),[]}}async getTags(){const r="tags",n=this.getCachedData(r);if(n)return n;const a=await this.getPosts(50),i=new Set;a.forEach(o=>o.tags.forEach(c=>i.add(c)));const s=Array.from(i).sort();return this.setCachedData(r,s),s}async getCategories(){const r="categories",n=this.getCachedData(r);if(n)return n;const a=await this.getPosts(50),i=new Set;a.forEach(o=>i.add(o.category));const s=Array.from(i).sort();return this.setCachedData(r,s),s}async getSeries(){const r="series",n=this.getCachedData(r);if(n)return n;try{const i=(await this.hashnodeService.getSeries()).map(s=>({id:s.id,name:s.name,slug:s.slug,posts:s.posts.map(o=>this.hashnodeService.transformToBlogPost(o))}));return this.setCachedData(r,i),i}catch(a){return console.error("Failed to fetch series:",a),[]}}async getDraft(r){const n=`draft-${r}`,a=this.getCachedData(n);if(a)return a;try{const i=await this.hashnodeService.getDraft(r);return i&&this.setCachedData(n,i),i}catch(i){return console.error(`Failed to fetch draft ${r}:`,i),null}}clearCache(){try{Object.keys(localStorage).forEach(r=>{r.startsWith(this.cacheKey)&&localStorage.removeItem(r)})}catch{}}}wt.HashnodeContentProvider=FM;function CM(e){return(0,AM.createLocalContentProvider)()}(function(e){var r=Mt&&Mt.__createBinding||(Object.create?function(a,i,s,o){o===void 0&&(o=s);var c=Object.getOwnPropertyDescriptor(i,s);(!c||("get"in c?!i.__esModule:c.writable||c.configurable))&&(c={enumerable:!0,get:function(){return i[s]}}),Object.defineProperty(a,o,c)}:function(a,i,s,o){o===void 0&&(o=s),a[o]=i[s]}),n=Mt&&Mt.__exportStar||function(a,i){for(var s in a)s!=="default"&&!Object.prototype.hasOwnProperty.call(i,s)&&r(i,a,s)};Object.defineProperty(e,"__esModule",{value:!0}),n(Rc,e),n(Rt,e),n(Yc,e),n(qe,e),n(Y,e),n(ae,e),n(Wf,e),n(Hf,e),n(un,e),n($t,e),n(cn,e),n(wt,e),n(Ne,e),n(Pe,e)})(P);const yM=Object.assign({"../content/aws-serverless-lambda.md":_m,"../content/aws-vpc.md":vm,"../content/blog-migration.md":Om,"../content/git-image-issue.md":xm,"../content/nginx.md":pm,"../content/nosql-redis.md":Dm,"../content/oauth2.md":$m,"../content/precourse-retrospective.md":wm,"../content/retrospective-2022-q3.md":Pm,"../content/retrospective-siner.md":Mm,"../content/spring-test-database.md":Tm}),LM=Object.entries(yM).map(([e,r])=>({name:e.split("/").pop(),raw:r}));P.registerLocalPosts(LM);var Pt={},Zf={},vs={exports:{}};function Xf(e){var r,n,a="";if(typeof e=="string"||typeof e=="number")a+=e;else if(typeof e=="object")if(Array.isArray(e)){var i=e.length;for(r=0;r<i;r++)e[r]&&(n=Xf(e[r]))&&(a&&(a+=" "),a+=n)}else for(n in e)e[n]&&(a&&(a+=" "),a+=n);return a}function Ic(){for(var e,r,n=0,a="",i=arguments.length;n<i;n++)(e=arguments[n])&&(r=Xf(e))&&(a&&(a+=" "),a+=r);return a}vs.exports=Ic,vs.exports.clsx=Ic;var Kf=vs.exports;(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.Button=void 0;const r=u,n=M,a=Kf;e.Button=(0,n.forwardRef)(({className:i,variant:s="primary",size:o="md",loading:c,disabled:d,children:l,...f},m)=>(0,r.jsxs)("button",{className:(0,a.clsx)("inline-flex items-center justify-center rounded-md font-medium transition-colors","focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2","disabled:pointer-events-none disabled:opacity-50",{"bg-stone-900 text-white focus-visible:ring-stone-500":s==="primary","bg-stone-100 text-stone-900 focus-visible:ring-stone-500":s==="secondary","border border-stone-300 bg-transparent text-stone-700 focus-visible:ring-stone-500":s==="outline","text-stone-700 focus-visible:ring-stone-500":s==="ghost"},{"h-8 px-3 text-sm":o==="sm","h-10 px-4 text-sm":o==="md","h-12 px-6 text-base":o==="lg"},i),disabled:d||c,ref:m,...f,children:[c&&(0,r.jsxs)("svg",{className:"mr-2 h-4 w-4 animate-spin",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,r.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,r.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),l]})),e.Button.displayName="Button"})(Zf);var dn={};Object.defineProperty(dn,"__esModule",{value:!0});dn.LoadingSpinner=void 0;const Sc=u,RM=Kf,YM=({size:e="md",className:r})=>(0,Sc.jsx)("div",{className:(0,RM.clsx)("animate-spin rounded-full border-b-2 border-current",{"h-4 w-4":e==="sm","h-8 w-8":e==="md","h-12 w-12":e==="lg"},r),role:"status","aria-label":"Loading",children:(0,Sc.jsx)("span",{className:"sr-only",children:"Loading..."})});dn.LoadingSpinner=YM;var ln={};Object.defineProperty(ln,"__esModule",{value:!0});ln.ErrorBoundary=void 0;const ct=u,WM=M;class HM extends WM.Component{constructor(r){super(r),this.state={hasError:!1}}static getDerivedStateFromError(r){return{hasError:!0,error:r}}componentDidCatch(r,n){var a,i;console.error("ErrorBoundary caught an error:",r,n),(i=(a=this.props).onError)==null||i.call(a,r,n)}render(){return this.state.hasError?this.props.fallback||(0,ct.jsxs)("div",{className:"flex min-h-[400px] flex-col items-center justify-center p-8 text-center",children:[(0,ct.jsx)("div",{className:"mb-4 text-6xl",children:"😕"}),(0,ct.jsx)("h2",{className:"mb-2 text-xl font-semibold text-gray-900",children:"Something went wrong"}),(0,ct.jsx)("p",{className:"mb-4 text-gray-600",children:"We're sorry, something unexpected happened. Please try refreshing the page."}),(0,ct.jsx)("button",{onClick:()=>window.location.reload(),className:"rounded-md bg-stone-900 px-4 py-2 text-white",children:"Refresh page"}),!1]}):this.props.children}}ln.ErrorBoundary=HM;(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.ErrorBoundary=e.LoadingSpinner=e.Button=void 0;var r=Zf;Object.defineProperty(e,"Button",{enumerable:!0,get:function(){return r.Button}});var n=dn;Object.defineProperty(e,"LoadingSpinner",{enumerable:!0,get:function(){return n.LoadingSpinner}});var a=ln;Object.defineProperty(e,"ErrorBoundary",{enumerable:!0,get:function(){return a.ErrorBoundary}})})(Pt);const Jf=M.createContext(void 0),BM=({children:e})=>{const r=()=>typeof window>"u"?"light":window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",[n,a]=M.useState("system"),[i,s]=M.useState(r);M.useEffect(()=>{const f=localStorage.getItem(P.STORAGE_KEYS.THEME);f&&(f==="light"||f==="dark"||f==="system")&&a(f);const m=window.matchMedia("(prefers-color-scheme: dark)");s(m.matches?"dark":"light");const h=_=>{s(_.matches?"dark":"light")};return m.addEventListener("change",h),()=>m.removeEventListener("change",h)},[]),M.useEffect(()=>{(n==="system"?i:n)==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},[n,i]);const o=f=>{a(f),localStorage.setItem(P.STORAGE_KEYS.THEME,f)},l={theme:n,resolvedTheme:n==="system"?i:n,toggleTheme:()=>{o((n==="system"?i:n)==="dark"?"light":"dark")},setTheme:o,systemTheme:i};return u.jsx(Jf.Provider,{value:l,children:e})},kf=()=>{const e=M.useContext(Jf);if(e===void 0)throw new Error("useTheme must be used within a ThemeProvider");return e},em=M.createContext(void 0),GM=({children:e})=>{const[r,n]=M.useState([]),[a,i]=M.useState([]),[s,o]=M.useState([]),[c,d]=M.useState([]),[l,f]=M.useState([]),[m,h]=M.useState(!0),[_,p]=M.useState(null),O=P.createContentProvider(),D=async()=>{try{h(!0),p(null);const[A,F,Z,te,X]=await Promise.all([O.getPosts(),O.getFeaturedPosts(),O.getCategories(),O.getTags(),O.getSeries()]);n(A),i(F),o(Z),d(te),f(X)}catch(A){console.error("Error fetching posts:",A),p(A instanceof Error?A.message:"Failed to fetch posts"),n([]),i([]),o([]),d([]),f([])}finally{h(!1)}},x=async A=>{try{return await O.getPostBySlug(A)}catch(F){return console.error(`Error fetching post ${A}:`,F),null}},S=async A=>{try{return await O.searchPosts(A)}catch(F){return console.error("Error searching posts:",F),[]}},N=async A=>{try{return await O.getPostsByCategory(A)}catch(F){return console.error("Error fetching posts by category:",F),[]}},j=async A=>{try{return await O.getPostsByTag(A)}catch(F){return console.error("Error fetching posts by tag:",F),[]}},z=async A=>{try{return await O.getDraft(A)}catch(F){return console.error(`Error fetching draft ${A}:`,F),null}},q=async()=>{await D()};M.useEffect(()=>{D()},[]);const J={posts:r,featuredPosts:a,categories:s,tags:c,series:l,isLoading:m,error:_,getPostBySlug:x,searchPosts:S,getPostsByCategory:N,getPostsByTag:j,getDraft:z,refreshPosts:q};return u.jsx(em.Provider,{value:J,children:e})},tm=()=>{const e=M.useContext(em);if(e===void 0)throw new Error("useBlog must be used within a BlogProvider");return e},jc="wpti-lang",nm=M.createContext(void 0),UM=()=>{var e;return typeof navigator>"u"?"en":(e=navigator.language)!=null&&e.toLowerCase().startsWith("ko")?"ko":"en"},zM=({children:e})=>{const[r,n]=M.useState("en");M.useEffect(()=>{const s=localStorage.getItem(jc);n(s==="ko"||s==="en"?s:UM())},[]);const a=s=>{n(s);try{localStorage.setItem(jc,s)}catch{}},i=()=>a(r==="ko"?"en":"ko");return u.jsx(nm.Provider,{value:{lang:r,setLang:a,toggle:i},children:e})},eu=()=>{const e=M.useContext(nm);if(!e)throw new Error("useLang must be used within a LangProvider");return e},k={SITE_TITLE:"정지원의 기록",SITE_DESCRIPTION:"Software Engineer. 생각을 기록하는 공간입니다.",HASHNODE_PUBLICATION_ID:"",HASHNODE_API_TOKEN:""},qM=()=>{const{lang:e,setLang:r}=eu();return u.jsx("div",{className:"inline-flex font-mono text-[11px] uppercase tracking-[0.16em]",role:"group","aria-label":"Content language",children:["ko","en"].map(n=>u.jsx("button",{onClick:()=>r(n),"aria-pressed":e===n,className:`px-2 py-1 transition-colors ${e===n?"text-stone-900 dark:text-stone-100":"text-stone-400 dark:text-stone-600 hover:text-stone-600 dark:hover:text-stone-400"}`,children:n},n))})},QM=()=>{const{theme:e,toggleTheme:r,resolvedTheme:n}=kf(),a=()=>e==="system"?n==="dark"?"🌙":"☀️":e==="dark"?"🌙":"☀️",i=()=>({light:"Light mode",dark:"Dark mode",system:"System theme"})[e];return u.jsx("button",{onClick:r,className:`p-2 text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200
                 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors`,"aria-label":`Switch to ${n==="dark"?"light":"dark"} mode`,title:i(),children:u.jsx("span",{className:"text-lg",children:a()})})},VM=({className:e=""})=>{const[r,n]=M.useState(!1);return u.jsx("header",{className:`sticky top-0 z-50 w-full bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-lg
                       border-b border-stone-200/50 dark:border-stone-700/50 shadow-sm shadow-stone-200/50 dark:shadow-stone-900/50 ${e}`,children:u.jsxs("div",{className:"container mx-auto px-4 py-4",children:[u.jsxs("div",{className:"flex items-center justify-between",children:[u.jsx("div",{className:"flex items-center space-x-4",children:u.jsx(R,{to:"/",className:`text-2xl font-black text-stone-900 dark:text-white
                         transition-all duration-300 tracking-tight`,children:k.SITE_TITLE})}),u.jsxs("nav",{className:"hidden lg:flex items-center space-x-6",children:[u.jsx(R,{to:"/",className:`text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white
                         transition-colors font-medium`,activeProps:{className:"text-stone-900 dark:text-white"},children:"Home"}),u.jsx(R,{to:"/posts",className:`text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white
                         transition-colors font-medium`,activeProps:{className:"text-stone-900 dark:text-white"},children:"Posts"})]}),u.jsxs("div",{className:"flex items-center space-x-2 lg:space-x-4",children:[u.jsx("a",{href:"/rss.xml",target:"_blank",rel:"noopener noreferrer",className:`hidden lg:flex items-center p-2 text-stone-500 dark:text-stone-400
                         rounded-md transition-colors hover:text-orange-500 dark:hover:text-orange-400`,title:"RSS Feed",children:u.jsxs("svg",{className:"w-5 h-5",fill:"currentColor",viewBox:"0 0 24 24",children:[u.jsx("path",{d:"M4 11a9 9 0 0 1 9 9"}),u.jsx("path",{d:"M4 4a16 16 0 0 1 16 16"}),u.jsx("circle",{cx:"5",cy:"19",r:"1"})]})}),u.jsx(qM,{}),u.jsx(QM,{}),u.jsx("button",{onClick:()=>n(!r),className:`lg:hidden p-2 text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200
                         rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors`,children:u.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r?u.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"}):u.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})})})]})]}),r&&u.jsx("nav",{className:"lg:hidden mt-4 pt-4 border-t border-stone-200 dark:border-stone-700 animate-in slide-in-from-top-5 duration-200",children:u.jsxs("div",{className:"flex flex-col space-y-2",children:[u.jsx(R,{to:"/",onClick:()=>n(!1),className:`px-3 py-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white
                           hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md transition-colors font-medium`,activeProps:{className:"text-stone-900 dark:text-white bg-stone-100 dark:bg-stone-800"},children:"Home"}),u.jsx(R,{to:"/posts",onClick:()=>n(!1),className:`px-3 py-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white
                           hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md transition-colors font-medium`,activeProps:{className:"text-stone-900 dark:text-white bg-stone-100 dark:bg-stone-800"},children:"Posts"}),u.jsxs("a",{href:"/rss.xml",target:"_blank",rel:"noopener noreferrer",className:`flex items-center px-3 py-2 text-stone-600 dark:text-stone-300
                           rounded-md transition-colors font-medium hover:text-orange-500 dark:hover:text-orange-400`,onClick:()=>n(!1),children:[u.jsxs("svg",{className:"w-4 h-4 mr-2",fill:"currentColor",viewBox:"0 0 24 24",children:[u.jsx("path",{d:"M4 11a9 9 0 0 1 9 9"}),u.jsx("path",{d:"M4 4a16 16 0 0 1 16 16"}),u.jsx("circle",{cx:"5",cy:"19",r:"1"})]}),"RSS Feed"]})]})})]})})},ZM=()=>{const{theme:e,toggleTheme:r,resolvedTheme:n}=kf(),a=()=>e==="system"?n==="dark"?"🌙":"☀️":e==="dark"?"🌙":"☀️",i=()=>({light:"Light mode",dark:"Dark mode",system:"System theme"})[e];return u.jsx("button",{onClick:r,className:`p-2 text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200
                 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200`,"aria-label":`Switch to ${n==="dark"?"light":"dark"} mode`,title:i(),children:u.jsx("span",{className:"text-lg",children:a()})})},XM=({className:e=""})=>{const r=dm(),n=()=>{window.history.length>1?r.history.back():r.navigate({to:"/"})};return u.jsx("header",{className:`fixed top-0 left-0 right-0 z-50 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200/50 dark:border-stone-700/50 ${e}`,children:u.jsx("div",{className:"container mx-auto px-4 py-3",children:u.jsxs("div",{className:"flex items-center justify-between",children:[u.jsxs("button",{onClick:n,className:`flex items-center space-x-2 px-3 py-2 text-stone-600 dark:text-stone-400
                       hover:text-stone-900 dark:hover:text-white rounded-full
                       hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200
                       font-medium`,children:[u.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:u.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 19l-7-7 7-7"})}),u.jsx("span",{className:"hidden sm:inline",children:"Back"})]}),u.jsx("div",{className:"flex items-center space-x-2",children:u.jsx(ZM,{})})]})})})},KM=[{label:"LinkedIn",href:"https://www.linkedin.com/in/%EC%A7%80%EC%9B%90-%EC%A0%95-4044b2234/"},{label:"GitHub",href:"https://github.com/JIWEON-JEONG"},{label:"RSS",href:"/rss.xml"}],Ec="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors",JM=()=>u.jsx("footer",{className:"mt-24 border-t border-stone-200 dark:border-stone-800",children:u.jsx("div",{className:"container mx-auto max-w-3xl px-4 py-10",children:u.jsxs("div",{className:"flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between",children:[u.jsxs("div",{className:"flex flex-col gap-3",children:[u.jsx("span",{className:"font-display text-lg text-stone-800 dark:text-stone-200",children:"정지원의 기록"}),u.jsx("nav",{className:"flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em]",children:u.jsx(R,{to:"/posts",className:Ec,children:"Posts"})})]}),u.jsxs("div",{className:"flex flex-col gap-3 sm:items-end",children:[u.jsx("div",{className:"flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] sm:justify-end",children:KM.map(e=>u.jsx("a",{href:e.href,target:"_blank",rel:"noreferrer",className:Ec,children:e.label},e.label))}),u.jsxs("span",{className:"font-mono text-[11px] uppercase tracking-[0.16em] text-stone-400 dark:text-stone-600",children:["© ",new Date().getFullYear()," Jiweon Jeong"]})]})]})})}),Nc=({children:e,className:r=""})=>{const n=lm(),a=n.pathname.startsWith("/posts/")&&n.pathname!=="/posts";return u.jsxs("div",{className:"min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950",children:[a?u.jsx(XM,{}):u.jsx(VM,{}),u.jsx("main",{className:`flex-grow ${a?"pt-16":""} ${r}`,children:e}),u.jsx(JM,{})]})},Ae=fm({component:()=>u.jsx(Pt.ErrorBoundary,{children:u.jsx(BM,{children:u.jsx(GM,{children:u.jsxs(zM,{children:[u.jsx(Nc,{children:u.jsx(mm,{})}),!1]})})})}),notFoundComponent:()=>u.jsx(Nc,{children:u.jsx("div",{className:"flex min-h-[60vh] items-center justify-center",children:u.jsxs("div",{className:"text-center",children:[u.jsx("h1",{className:"text-4xl font-bold text-gray-900 dark:text-white mb-4",children:"404"}),u.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-6",children:"Page not found"}),u.jsx("a",{href:"/",className:`inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-stone-900
                         rounded-md transition-colors`,children:"Go Home"})]})})})}),kM=Qe("/")({component:tT,head:()=>({meta:[{title:`${k.SITE_TITLE} - ${k.SITE_DESCRIPTION}`},{name:"description",content:k.SITE_DESCRIPTION}],links:[{rel:"alternate",type:"application/rss+xml",title:`${k.SITE_TITLE} RSS Feed`,href:"/rss.xml"}]})}),eT=[{label:"LinkedIn",href:"https://www.linkedin.com/in/%EC%A7%80%EC%9B%90-%EC%A0%95-4044b2234/"},{label:"GitHub",href:"https://github.com/JIWEON-JEONG"}];function Ac({children:e}){return u.jsx("p",{className:"font-mono text-xs uppercase tracking-[0.28em] text-stone-400 dark:text-stone-500 mb-6",children:e})}function tT(){const{posts:e,isLoading:r,error:n}=tm(),{lang:a}=eu();if(n)return u.jsxs("div",{className:"container mx-auto max-w-3xl px-4 py-16",children:[u.jsx("h1",{className:"font-display text-3xl text-stone-900 dark:text-white",children:"Could not load"}),u.jsx("p",{className:"text-stone-600 dark:text-stone-300 mt-3",children:n})]});if(r)return u.jsx("div",{className:"container mx-auto px-4 py-24 flex justify-center",children:u.jsx(Pt.LoadingSpinner,{size:"lg"})});const i=e.filter(c=>P.getPostLanguage(c)===a),s=i[0]||e[0],o=(i.length>0?i:e).slice(0,5);return u.jsxs("div",{className:"container mx-auto max-w-3xl px-4 py-14 sm:py-20",children:[u.jsxs("section",{children:[u.jsx("h1",{className:"font-display text-4xl sm:text-5xl font-medium text-stone-900 dark:text-white tracking-tight",children:"정지원 (Jiweon Jeong)"}),u.jsx("p",{className:"mt-4 text-lg leading-relaxed text-stone-600 dark:text-stone-300 max-w-xl",children:"Software Engineer. Spring, AWS, 인프라를 공부하며 성장을 기록하는 공간입니다."}),u.jsx("div",{className:"mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em]",children:eT.map(c=>u.jsxs("a",{href:c.href,target:"_blank",rel:"noreferrer",className:"text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors",children:[c.label," ↗"]},c.label))})]}),s&&u.jsxs("section",{className:"mt-16 sm:mt-20 border-t border-stone-200 dark:border-stone-800 pt-12",children:[u.jsx(Ac,{children:"Latest"}),u.jsxs("div",{className:"flex items-center gap-3 mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500",children:[u.jsx("time",{dateTime:s.publishedAt instanceof Date?s.publishedAt.toISOString():s.publishedAt,title:P.formatDate(s.publishedAt),children:P.formatRelativeDate(s.publishedAt)}),u.jsx("span",{"aria-hidden":!0,className:"text-stone-300 dark:text-stone-700",children:"/"}),u.jsxs("span",{children:[s.readingTimeMinutes," min"]})]}),u.jsx("h2",{className:"mb-4",children:u.jsx(R,{to:"/posts/$slug",params:{slug:s.slug},className:`font-display text-3xl sm:text-[40px] leading-[1.15] font-medium text-stone-900 dark:text-stone-50
                         underline-offset-[6px] decoration-stone-300 dark:decoration-stone-600 hover:underline`,children:s.title})}),s.excerpt&&u.jsx("p",{className:"text-[17px] leading-relaxed text-stone-600 dark:text-stone-400 max-w-2xl",children:s.excerpt}),u.jsxs("div",{className:"mt-6 flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em]",children:[u.jsx(R,{to:"/posts/$slug",params:{slug:s.slug},className:"text-stone-900 dark:text-stone-100 hover:opacity-60 transition-opacity",children:"Read →"}),u.jsx(R,{to:"/posts",className:"text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors",children:"All posts"})]})]}),o.length>1&&u.jsxs("section",{className:"mt-16 sm:mt-20 border-t border-stone-200 dark:border-stone-800 pt-12",children:[u.jsxs("div",{className:"flex items-baseline justify-between gap-4",children:[u.jsx(Ac,{children:"Recent"}),u.jsx(R,{to:"/posts",className:"font-mono text-[11px] uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors",children:"All posts →"})]}),u.jsx("ol",{className:"space-y-px",children:o.slice(1).map(c=>u.jsx("li",{children:u.jsxs(R,{to:"/posts/$slug",params:{slug:c.slug},className:"group flex items-baseline gap-4 py-3 border-t border-stone-200/70 dark:border-stone-800",children:[u.jsx("time",{className:"font-mono text-[11px] text-stone-400 dark:text-stone-600 tabular-nums shrink-0",children:P.formatDate(c.publishedAt)}),u.jsx("span",{className:"font-display text-lg text-stone-800 dark:text-stone-200 group-hover:underline underline-offset-[5px] decoration-stone-300 dark:decoration-stone-600",children:c.title})]})},c.slug))})]})]})}const nT=({post:e,className:r=""})=>{const n=P.getPostLanguage(e),a=P.getTopicTags(e).slice(0,3);return u.jsxs("article",{className:`group border-b border-stone-200/70 dark:border-stone-800 py-8 first:pt-0 last:border-b-0 ${r}`,children:[u.jsxs("div",{className:"flex items-center justify-between gap-4 mb-3",children:[u.jsxs("div",{className:"flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500",children:[u.jsx("time",{dateTime:e.publishedAt instanceof Date?e.publishedAt.toISOString():e.publishedAt,title:P.formatDate(e.publishedAt),children:P.formatRelativeDate(e.publishedAt)}),u.jsx("span",{"aria-hidden":!0,className:"text-stone-300 dark:text-stone-700",children:"/"}),u.jsxs("span",{children:[e.readingTimeMinutes," min"]})]}),n&&u.jsx("span",{className:"font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 border border-stone-300 dark:border-stone-700 rounded-full px-2 py-0.5",children:n})]}),u.jsx("h2",{children:u.jsx(R,{to:"/posts/$slug",params:{slug:e.slug},className:`font-display text-2xl sm:text-[28px] leading-[1.2] font-medium text-stone-900 dark:text-stone-50
                     decoration-stone-300 dark:decoration-stone-600 underline-offset-[6px]
                     group-hover:underline`,children:e.title})}),e.excerpt&&u.jsx("p",{className:"mt-3 text-[15px] leading-relaxed text-stone-600 dark:text-stone-400 line-clamp-2 max-w-2xl",children:e.excerpt}),a.length>0&&u.jsx("div",{className:"mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em]",children:a.map(i=>u.jsx(R,{to:"/tags/$tag",params:{tag:i},className:"text-stone-400 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors",children:i},i))})]})},rT=Qe("/posts/")({component:aT}),Fc=[{key:"all",label:"All"},{key:"ko",label:"한국어"},{key:"en",label:"English"}];function aT(){const{posts:e,isLoading:r,error:n}=tm(),{lang:a}=eu(),[i,s]=M.useState(a),[o,c]=M.useState(null);M.useEffect(()=>{s(a)},[a]);const d=M.useMemo(()=>{const f=new Map;return e.forEach(m=>P.getTopicTags(m).forEach(h=>f.set(h,(f.get(h)??0)+1))),[...f.entries()].filter(([,m])=>m>1).sort((m,h)=>h[1]-m[1]).map(([m,h])=>({tag:m,n:h}))},[e]),l=M.useMemo(()=>e.filter(f=>!(i!=="all"&&P.getPostLanguage(f)!==i||o&&!P.getTopicTags(f).includes(o))),[e,i,o]);return n?u.jsxs("div",{className:"container mx-auto px-4 py-16",children:[u.jsx("p",{className:"font-mono text-sm uppercase tracking-[0.2em] text-stone-400",children:"Error"}),u.jsx("h1",{className:"font-display text-3xl text-stone-900 dark:text-white mt-2",children:"Could not load posts"}),u.jsx("p",{className:"text-stone-600 dark:text-stone-300 mt-3",children:n})]}):u.jsxs("div",{className:"container mx-auto px-4 py-10 sm:py-14 max-w-3xl",children:[u.jsxs("div",{className:"flex flex-col gap-5 border-b border-stone-200 dark:border-stone-800 pb-5 mb-10",children:[u.jsxs("div",{className:"flex items-center justify-between gap-4 flex-wrap",children:[u.jsx("span",{className:"font-mono text-xs uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500",children:"Language"}),u.jsx("div",{className:"inline-flex font-mono text-xs",children:Fc.map((f,m)=>{const h=i===f.key;return u.jsx("button",{onClick:()=>s(f.key),"aria-pressed":h,className:`px-3.5 py-1.5 border border-stone-300 dark:border-stone-700 transition-colors
                    ${m===0?"rounded-l-full":""} ${m===Fc.length-1?"rounded-r-full":""}
                    ${m!==0?"-ml-px":""}
                    ${h?"bg-stone-900 text-stone-50 border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100 relative z-10":"text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"}`,children:f.label},f.key)})})]}),d.length>0&&u.jsxs("div",{className:"flex items-center justify-between gap-4 flex-wrap",children:[u.jsx("span",{className:"font-mono text-xs uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500",children:"Topic"}),u.jsxs("div",{className:"flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs",children:[u.jsx("button",{onClick:()=>c(null),className:`uppercase tracking-[0.12em] transition-colors ${o===null?"text-stone-900 dark:text-stone-100 underline underline-offset-[6px] decoration-2":"text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"}`,children:"All"}),d.map(({tag:f,n:m})=>{const h=o===f;return u.jsxs("button",{onClick:()=>c(h?null:f),className:`uppercase tracking-[0.12em] transition-colors ${h?"text-stone-900 dark:text-stone-100 underline underline-offset-[6px] decoration-2":"text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"}`,children:[f,u.jsx("sup",{className:"ml-1 text-[0.65em] text-stone-400 dark:text-stone-600",children:m})]},f)})]})]})]}),r?u.jsx("div",{className:"flex justify-center py-16",children:u.jsx(Pt.LoadingSpinner,{size:"lg"})}):l.length===0?u.jsxs("div",{className:"py-16 text-center",children:[u.jsx("p",{className:"font-display text-2xl text-stone-700 dark:text-stone-300",children:"Nothing here yet"}),u.jsx("p",{className:"font-mono text-xs uppercase tracking-[0.2em] text-stone-400 mt-3",children:"Try a different filter"})]}):u.jsx("div",{children:l.map(f=>u.jsx(nT,{post:f},f.slug))})]})}(function(e){e.languages.typescript=e.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),e.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete e.languages.typescript.parameter,delete e.languages.typescript["literal-property"];var r=e.languages.extend("typescript",{});delete r["class-name"],e.languages.typescript["class-name"].inside=r,e.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:r}}}}),e.languages.ts=e.languages.typescript})(Prism);Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/});Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}});Prism.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}});Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript"));Prism.languages.js=Prism.languages.javascript;(function(e){var r=e.util.clone(e.languages.javascript),n=/(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source,a=/(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source,i=/(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;function s(d,l){return d=d.replace(/<S>/g,function(){return n}).replace(/<BRACES>/g,function(){return a}).replace(/<SPREAD>/g,function(){return i}),RegExp(d,l)}i=s(i).source,e.languages.jsx=e.languages.extend("markup",r),e.languages.jsx.tag.pattern=s(/<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source),e.languages.jsx.tag.inside.tag.pattern=/^<\/?[^\s>\/]*/,e.languages.jsx.tag.inside["attr-value"].pattern=/=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/,e.languages.jsx.tag.inside.tag.inside["class-name"]=/^[A-Z]\w*(?:\.[A-Z]\w*)*$/,e.languages.jsx.tag.inside.comment=r.comment,e.languages.insertBefore("inside","attr-name",{spread:{pattern:s(/<SPREAD>/.source),inside:e.languages.jsx}},e.languages.jsx.tag),e.languages.insertBefore("inside","special-attr",{script:{pattern:s(/=<BRACES>/.source),alias:"language-javascript",inside:{"script-punctuation":{pattern:/^=(?=\{)/,alias:"punctuation"},rest:e.languages.jsx}}},e.languages.jsx.tag);var o=function(d){return d?typeof d=="string"?d:typeof d.content=="string"?d.content:d.content.map(o).join(""):""},c=function(d){for(var l=[],f=0;f<d.length;f++){var m=d[f],h=!1;if(typeof m!="string"&&(m.type==="tag"&&m.content[0]&&m.content[0].type==="tag"?m.content[0].content[0].content==="</"?l.length>0&&l[l.length-1].tagName===o(m.content[0].content[1])&&l.pop():m.content[m.content.length-1].content==="/>"||l.push({tagName:o(m.content[0].content[1]),openedBraces:0}):l.length>0&&m.type==="punctuation"&&m.content==="{"?l[l.length-1].openedBraces++:l.length>0&&l[l.length-1].openedBraces>0&&m.type==="punctuation"&&m.content==="}"?l[l.length-1].openedBraces--:h=!0),(h||typeof m=="string")&&l.length>0&&l[l.length-1].openedBraces===0){var _=o(m);f<d.length-1&&(typeof d[f+1]=="string"||d[f+1].type==="plain-text")&&(_+=o(d[f+1]),d.splice(f+1,1)),f>0&&(typeof d[f-1]=="string"||d[f-1].type==="plain-text")&&(_=o(d[f-1])+_,d.splice(f-1,1),f--),d[f]=new e.Token("plain-text",_,null,_)}m.content&&typeof m.content!="string"&&c(m.content)}};e.hooks.add("after-tokenize",function(d){d.language!=="jsx"&&d.language!=="tsx"||c(d.tokens)})})(Prism);(function(e){var r=e.util.clone(e.languages.typescript);e.languages.tsx=e.languages.extend("jsx",r),delete e.languages.tsx.parameter,delete e.languages.tsx["literal-property"];var n=e.languages.tsx.tag;n.pattern=RegExp(/(^|[^\w$]|(?=<\/))/.source+"(?:"+n.pattern.source+")",n.pattern.flags),n.lookbehind=!0})(Prism);(function(e){var r="\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",n={pattern:/(^(["']?)\w+\2)[ \t]+\S.*/,lookbehind:!0,alias:"punctuation",inside:null},a={bash:n,environment:{pattern:RegExp("\\$"+r),alias:"constant"},variable:[{pattern:/\$?\(\([\s\S]+?\)\)/,greedy:!0,inside:{variable:[{pattern:/(^\$\(\([\s\S]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,operator:/--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,greedy:!0,inside:{variable:/^\$\(|^`|\)$|`$/}},{pattern:/\$\{[^}]+\}/,greedy:!0,inside:{operator:/:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,punctuation:/[\[\]]/,environment:{pattern:RegExp("(\\{)"+r),lookbehind:!0,alias:"constant"}}},/\$(?:\w+|[#?*!@$])/],entity:/\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/};e.languages.bash={shebang:{pattern:/^#!\s*\/.*/,alias:"important"},comment:{pattern:/(^|[^"{\\$])#.*/,lookbehind:!0},"function-name":[{pattern:/(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,lookbehind:!0,alias:"function"},{pattern:/\b[\w-]+(?=\s*\(\s*\)\s*\{)/,alias:"function"}],"for-or-select":{pattern:/(\b(?:for|select)\s+)\w+(?=\s+in\s)/,alias:"variable",lookbehind:!0},"assign-left":{pattern:/(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,inside:{environment:{pattern:RegExp("(^|[\\s;|&]|[<>]\\()"+r),lookbehind:!0,alias:"constant"}},alias:"variable",lookbehind:!0},parameter:{pattern:/(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/,alias:"variable",lookbehind:!0},string:[{pattern:/((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,lookbehind:!0,greedy:!0,inside:a},{pattern:/((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,lookbehind:!0,greedy:!0,inside:{bash:n}},{pattern:/(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,lookbehind:!0,greedy:!0,inside:a},{pattern:/(^|[^$\\])'[^']*'/,lookbehind:!0,greedy:!0},{pattern:/\$'(?:[^'\\]|\\[\s\S])*'/,greedy:!0,inside:{entity:a.entity}}],environment:{pattern:RegExp("\\$?"+r),alias:"constant"},variable:a.variable,function:{pattern:/(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,lookbehind:!0},keyword:{pattern:/(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,lookbehind:!0},builtin:{pattern:/(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,lookbehind:!0,alias:"class-name"},boolean:{pattern:/(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,lookbehind:!0},"file-descriptor":{pattern:/\B&\d\b/,alias:"important"},operator:{pattern:/\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,inside:{"file-descriptor":{pattern:/^\d/,alias:"important"}}},punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,number:{pattern:/(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,lookbehind:!0}},n.inside=e.languages.bash;for(var i=["comment","function-name","for-or-select","assign-left","parameter","string","environment","function","keyword","builtin","boolean","file-descriptor","operator","punctuation","number"],s=a.variable[1].inside,o=0;o<i.length;o++)s[i[o]]=e.languages.bash[i[o]];e.languages.sh=e.languages.bash,e.languages.shell=e.languages.bash})(Prism);Prism.languages.json={property:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,lookbehind:!0,greedy:!0},string:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,lookbehind:!0,greedy:!0},comment:{pattern:/\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},number:/-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,punctuation:/[{}[\],]/,operator:/:/,boolean:/\b(?:false|true)\b/,null:{pattern:/\bnull\b/,alias:"keyword"}};Prism.languages.webmanifest=Prism.languages.json;(function(e){var r=/[*&][^\s[\]{},]+/,n=/!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,a="(?:"+n.source+"(?:[ 	]+"+r.source+")?|"+r.source+"(?:[ 	]+"+n.source+")?)",i=/(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(/<PLAIN>/g,function(){return/[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source}),s=/"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;function o(c,d){d=(d||"").replace(/m/g,"")+"m";var l=/([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g,function(){return a}).replace(/<<value>>/g,function(){return c});return RegExp(l,d)}e.languages.yaml={scalar:{pattern:RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(/<<prop>>/g,function(){return a})),lookbehind:!0,alias:"string"},comment:/#.*/,key:{pattern:RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g,function(){return a}).replace(/<<key>>/g,function(){return"(?:"+i+"|"+s+")"})),lookbehind:!0,greedy:!0,alias:"atrule"},directive:{pattern:/(^[ \t]*)%.+/m,lookbehind:!0,alias:"important"},datetime:{pattern:o(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source),lookbehind:!0,alias:"number"},boolean:{pattern:o(/false|true/.source,"i"),lookbehind:!0,alias:"important"},null:{pattern:o(/null|~/.source,"i"),lookbehind:!0,alias:"important"},string:{pattern:o(s),lookbehind:!0,greedy:!0},number:{pattern:o(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source,"i"),lookbehind:!0},tag:n,important:r,punctuation:/---|[:[\]{}\-,|>?]|\.\.\./},e.languages.yml=e.languages.yaml})(Prism);(function(e){var r=/(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;function n(f){return f=f.replace(/<inner>/g,function(){return r}),RegExp(/((?:^|[^\\])(?:\\{2})*)/.source+"(?:"+f+")")}var a=/(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source,i=/\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g,function(){return a}),s=/\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;e.languages.markdown=e.languages.extend("markup",{}),e.languages.insertBefore("markdown","prolog",{"front-matter-block":{pattern:/(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,lookbehind:!0,greedy:!0,inside:{punctuation:/^---|---$/,"front-matter":{pattern:/\S+(?:\s+\S+)*/,alias:["yaml","language-yaml"],inside:e.languages.yaml}}},blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},table:{pattern:RegExp("^"+i+s+"(?:"+i+")*","m"),inside:{"table-data-rows":{pattern:RegExp("^("+i+s+")(?:"+i+")*$"),lookbehind:!0,inside:{"table-data":{pattern:RegExp(a),inside:e.languages.markdown},punctuation:/\|/}},"table-line":{pattern:RegExp("^("+i+")"+s+"$"),lookbehind:!0,inside:{punctuation:/\||:?-{3,}:?/}},"table-header-row":{pattern:RegExp("^"+i+"$"),inside:{"table-header":{pattern:RegExp(a),alias:"important",inside:e.languages.markdown},punctuation:/\|/}}}},code:[{pattern:/((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,lookbehind:!0,alias:"keyword"},{pattern:/^```[\s\S]*?^```$/m,greedy:!0,inside:{"code-block":{pattern:/^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,lookbehind:!0},"code-language":{pattern:/^(```).+/,lookbehind:!0},punctuation:/```/}}],title:[{pattern:/\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:n(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^..)[\s\S]+(?=..$)/,lookbehind:!0,inside:{}},punctuation:/\*\*|__/}},italic:{pattern:n(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^.)[\s\S]+(?=.$)/,lookbehind:!0,inside:{}},punctuation:/[*_]/}},strike:{pattern:n(/(~~?)(?:(?!~)<inner>)+\2/.source),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^~~?)[\s\S]+(?=\1$)/,lookbehind:!0,inside:{}},punctuation:/~~?/}},"code-snippet":{pattern:/(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,lookbehind:!0,greedy:!0,alias:["code","keyword"]},url:{pattern:n(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),lookbehind:!0,greedy:!0,inside:{operator:/^!/,content:{pattern:/(^\[)[^\]]+(?=\])/,lookbehind:!0,inside:{}},variable:{pattern:/(^\][ \t]?\[)[^\]]+(?=\]$)/,lookbehind:!0},url:{pattern:/(^\]\()[^\s)]+/,lookbehind:!0},string:{pattern:/(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,lookbehind:!0}}}}),["url","bold","italic","strike"].forEach(function(f){["url","bold","italic","strike","code-snippet"].forEach(function(m){f!==m&&(e.languages.markdown[f].inside.content.inside[m]=e.languages.markdown[m])})}),e.hooks.add("after-tokenize",function(f){if(f.language!=="markdown"&&f.language!=="md")return;function m(h){if(!(!h||typeof h=="string"))for(var _=0,p=h.length;_<p;_++){var O=h[_];if(O.type!=="code"){m(O.content);continue}var D=O.content[1],x=O.content[3];if(D&&x&&D.type==="code-language"&&x.type==="code-block"&&typeof D.content=="string"){var S=D.content.replace(/\b#/g,"sharp").replace(/\b\+\+/g,"pp");S=(/[a-z][\w-]*/i.exec(S)||[""])[0].toLowerCase();var N="language-"+S;x.alias?typeof x.alias=="string"?x.alias=[x.alias,N]:x.alias.push(N):x.alias=[N]}}}m(f.tokens)}),e.hooks.add("wrap",function(f){if(f.type==="code-block"){for(var m="",h=0,_=f.classes.length;h<_;h++){var p=f.classes[h],O=/language-(.+)/.exec(p);if(O){m=O[1];break}}var D=e.languages[m];if(D)f.content=e.highlight(l(f.content),D,m);else if(m&&m!=="none"&&e.plugins.autoloader){var x="md-"+new Date().valueOf()+"-"+Math.floor(Math.random()*1e16);f.attributes.id=x,e.plugins.autoloader.loadLanguages(m,function(){var S=document.getElementById(x);S&&(S.innerHTML=e.highlight(S.textContent,e.languages[m],m))})}}});var o=RegExp(e.languages.markup.tag.pattern.source,"gi"),c={amp:"&",lt:"<",gt:">",quot:'"'},d=String.fromCodePoint||String.fromCharCode;function l(f){var m=f.replace(o,"");return m=m.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi,function(h,_){if(_=_.toLowerCase(),_[0]==="#"){var p;return _[1]==="x"?p=parseInt(_.slice(2),16):p=Number(_.slice(1)),d(p)}else{var O=c[_];return O||h}}),m}e.languages.md=e.languages.markdown})(Prism);(function(e){var r=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;e.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+r.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+r.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+r.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+r.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:r,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},e.languages.css.atrule.inside.rest=e.languages.css;var n=e.languages.markup;n&&(n.tag.addInlined("style","css"),n.tag.addAttribute("style","css"))})(Prism);const iT=()=>{Ct.setOptions({breaks:!0,gfm:!0});const e=new Ct.Renderer,r=e.code.bind(e);e.code=function(n,a,i){if(a&&yt.languages[a])try{const s=yt.highlight(n,yt.languages[a],a);return`<pre class="language-${a}"><code class="language-${a}">${s}</code></pre>`}catch(s){console.warn(`Failed to highlight code for language: ${a}`,s)}return r(n,a||"",i||!1)},Ct.use({renderer:e})},rm=({content:e,className:r="",isHtml:n=!1})=>{M.useEffect(()=>{n||iT()},[n]);const a=M.useMemo(()=>{if(!e)return"";try{const i=n?e:Ct(e);return bm.sanitize(i,{ALLOWED_TAGS:["p","br","strong","em","u","s","h1","h2","h3","h4","h5","h6","ul","ol","li","blockquote","pre","code","a","img","hr","table","thead","tbody","tr","th","td","div","span","del","ins","figure","figcaption","picture","source","iframe","video","audio","sup","sub","mark","details","summary"],ALLOWED_ATTR:["href","src","alt","title","class","id","target","rel","width","height","loading","srcset","sizes","type","media","allow","allowfullscreen","frameborder","name","open","style","data-src"],ALLOWED_URI_REGEXP:/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i})}catch(i){return console.error("Error rendering markdown:",i),"<p>Error rendering content</p>"}},[e,n]);return M.useEffect(()=>{yt.highlightAll()},[a]),e?u.jsx("div",{className:`prose dark:prose-invert max-w-none ${r}`,dangerouslySetInnerHTML:{__html:a}}):u.jsx("div",{className:`prose dark:prose-invert max-w-none ${r}`,children:u.jsx("p",{className:"text-gray-500 italic",children:"No content available"})})},Cc=["-rotate-1","rotate-1","-rotate-[0.5deg]","rotate-[0.75deg]"],sT=({note:e,index:r=0,className:n=""})=>{const a=Cc[r%Cc.length];return u.jsxs("article",{className:`group relative ${a} hover:rotate-0 transition-transform duration-200
                  bg-amber-50 dark:bg-stone-800/70
                  border border-amber-200/70 dark:border-stone-700
                  shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_20px_-12px_rgba(0,0,0,0.25)]
                  px-6 pt-7 pb-6 ${n}`,children:[u.jsx("span",{"aria-hidden":!0,className:`absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-16
                   bg-stone-200/70 dark:bg-stone-600/50 border border-stone-300/40 dark:border-stone-600/40
                   rotate-[-2deg]`}),u.jsxs("div",{className:"flex items-center justify-between gap-3 mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400",children:[u.jsx("time",{dateTime:e.date.toISOString(),children:P.formatDate(e.date)}),e.source&&u.jsx("a",{href:e.source,target:"_blank",rel:"noreferrer",className:"hover:text-stone-900 dark:hover:text-stone-100 transition-colors",children:"via ↗"})]}),e.title&&u.jsx("h3",{className:"font-display text-lg leading-snug text-stone-900 dark:text-stone-100 mb-2",children:e.title}),u.jsx(rm,{content:e.body,className:`prose-sm prose-stone dark:prose-invert max-w-none
                   text-[15px] leading-relaxed text-stone-700 dark:text-stone-300`})]})},oT=Qe("/notes/")({component:uT});function uT(){const e=P.getLocalNotes();return u.jsxs("div",{className:"container mx-auto px-4 py-10 sm:py-14 max-w-3xl",children:[u.jsxs("header",{className:"border-b border-stone-200 dark:border-stone-800 pb-5 mb-12",children:[u.jsx("p",{className:"font-mono text-xs uppercase tracking-[0.28em] text-stone-400 dark:text-stone-500",children:"Notes"}),u.jsx("p",{className:"mt-3 text-stone-600 dark:text-stone-400 max-w-xl",children:"Short, unpolished scraps — half-thoughts collected from elsewhere. Not essays. Don't read too much into them."})]}),e.length===0?u.jsx("p",{className:"font-mono text-xs uppercase tracking-[0.2em] text-stone-400 py-12 text-center",children:"Nothing pinned yet"}):u.jsx("div",{className:"grid gap-x-6 gap-y-10 sm:grid-cols-2",children:e.map((r,n)=>u.jsx(sT,{note:r,index:n},r.id))})]})}const yc=({post:e,featured:r=!1,showExcerpt:n=!0,className:a=""})=>{const i=P.getPostLanguage(e),s=P.getTopicTags(e).slice(0,r?5:3),o=`
    group relative flex flex-col h-full border border-stone-200 dark:border-stone-800
    bg-stone-50/40 dark:bg-stone-900/40 p-7 transition-colors duration-200
    hover:border-stone-400 dark:hover:border-stone-600
    ${r?"md:col-span-2 lg:col-span-2":""}
    ${a}
  `.trim();return u.jsxs("article",{className:o,children:[u.jsxs("div",{className:"flex items-center justify-between gap-3 mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500",children:[u.jsxs("div",{className:"flex items-center gap-2",children:[e.series&&u.jsxs(u.Fragment,{children:[u.jsx(R,{to:"/series/$slug",params:{slug:e.series.slug},className:"text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors",children:e.series.name}),u.jsx("span",{"aria-hidden":!0,className:"text-stone-300 dark:text-stone-700",children:"/"})]}),u.jsx("time",{dateTime:e.publishedAt instanceof Date?e.publishedAt.toISOString():e.publishedAt,title:P.formatDate(e.publishedAt),children:P.formatRelativeDate(e.publishedAt)})]}),i&&u.jsx("span",{className:"border border-stone-300 dark:border-stone-700 rounded-full px-2 py-0.5 text-[10px] font-medium tracking-[0.2em] text-stone-500 dark:text-stone-400",children:i})]}),u.jsx("h2",{className:"mb-3",children:u.jsx(R,{to:"/posts/$slug",params:{slug:e.slug},className:`font-display font-medium leading-[1.2] text-stone-900 dark:text-stone-50
                      decoration-stone-300 dark:decoration-stone-600 underline-offset-[6px] group-hover:underline
                      ${r?"text-3xl md:text-4xl":"text-2xl"}`,children:e.title})}),n&&e.excerpt&&u.jsx("p",{className:"mb-6 text-[15px] leading-relaxed text-stone-600 dark:text-stone-400 line-clamp-3 flex-grow",children:e.excerpt}),u.jsxs("div",{className:"mt-auto flex items-center justify-between gap-4 pt-5 border-t border-stone-200/70 dark:border-stone-800",children:[s.length>0?u.jsx("div",{className:"flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em]",children:s.map(c=>u.jsx(R,{to:"/tags/$tag",params:{tag:c},className:"text-stone-400 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors",children:c},c))}):u.jsx("span",{}),u.jsxs("span",{className:"font-mono text-[11px] uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500 shrink-0",children:[e.readingTimeMinutes," min"]})]})]})},cT=({currentPage:e,totalPages:r,onPageChange:n})=>{if(r<=1)return null;const a=Array.from({length:r},(o,c)=>c+1),i=r>7;let s=a;return i&&(e<=4?s=[1,2,3,4,5,"...",r]:e>=r-3?s=[1,"...",r-4,r-3,r-2,r-1,r]:s=[1,"...",e-1,e,e+1,"...",r]),u.jsxs("nav",{className:"flex items-center justify-center space-x-2 mt-8","aria-label":"Pagination",children:[u.jsx("button",{onClick:()=>n(e-1),disabled:e===1,className:`px-3 py-2 text-sm font-medium text-stone-500 bg-stone-50 border border-stone-300
                   rounded-md disabled:opacity-50 disabled:cursor-not-allowed
                   dark:bg-stone-800 dark:border-stone-600 dark:text-stone-400`,children:"Previous"}),s.map((o,c)=>u.jsx("span",{children:o==="..."?u.jsx("span",{className:"px-3 py-2 text-sm text-gray-400",children:"..."}):u.jsx("button",{onClick:()=>n(o),className:`px-3 py-2 text-sm font-medium rounded-md transition-colors
                ${e===o?"bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900":"text-stone-500 bg-stone-50 border border-stone-300 dark:bg-stone-800 dark:border-stone-600 dark:text-stone-400"}`,children:o})},c)),u.jsx("button",{onClick:()=>n(e+1),disabled:e===r,className:`px-3 py-2 text-sm font-medium text-stone-500 bg-stone-50 border border-stone-300
                   rounded-md disabled:opacity-50 disabled:cursor-not-allowed
                   dark:bg-stone-800 dark:border-stone-600 dark:text-stone-400`,children:"Next"})]})},dT=({posts:e,isLoading:r=!1,showFeatured:n=!1,postsPerPage:a=10,title:i,className:s=""})=>{const[o,c]=M.useState(1),{featuredPosts:d,paginatedPosts:l,totalPages:f}=M.useMemo(()=>{const h=n?e.filter(S=>S.featured):[],_=n?e.filter(S=>!S.featured):e,p=(o-1)*a,O=p+a,D=_.slice(p,O),x=Math.ceil(_.length/a);return{featuredPosts:h,paginatedPosts:D,totalPages:x}},[e,n,o,a]),m=h=>{c(h),window.scrollTo({top:0,behavior:"smooth"})};return r?u.jsx("div",{className:"flex justify-center py-12",children:u.jsx(Pt.LoadingSpinner,{size:"lg"})}):e.length===0?u.jsx("div",{className:"text-center py-12",children:u.jsxs("div",{className:"text-gray-500 dark:text-gray-400",children:[u.jsx("p",{className:"text-lg mb-2",children:"No posts found"}),u.jsx("p",{className:"text-sm",children:"Check back later for new content!"})]})}):u.jsxs("div",{className:s,children:[i&&u.jsx("h2",{className:"text-2xl font-bold text-gray-900 dark:text-white mb-8",children:i}),n&&d.length>0&&u.jsxs("section",{className:"mb-12",children:[u.jsx("h3",{className:"text-xl font-semibold text-gray-900 dark:text-white mb-6",children:"Featured Posts"}),u.jsx("div",{className:"grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3",children:d.map(h=>u.jsx(yc,{post:h,featured:!0,showExcerpt:!0},h.slug))})]}),(l.length>0||!n&&e.length>0)&&u.jsxs("section",{children:[n&&d.length>0&&u.jsx("h3",{className:"text-xl font-semibold text-gray-900 dark:text-white mb-6",children:"Latest Posts"}),u.jsx("div",{className:"grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3",children:(n?l:e).map(h=>u.jsx(yc,{post:h,featured:!1,showExcerpt:!0},h.slug))}),u.jsx(cT,{currentPage:o,totalPages:f,onPageChange:m})]})]})},am=Qe("/tags/$tag")({loader:async({params:e})=>({posts:await P.createContentProvider({publicationId:k.HASHNODE_PUBLICATION_ID,apiToken:k.HASHNODE_API_TOKEN}).getPostsByTag(e.tag),tag:e.tag}),component:lT,errorComponent:()=>u.jsx("div",{className:"container mx-auto px-4 py-8",children:u.jsxs("div",{className:"text-center",children:[u.jsx("h1",{className:"text-2xl font-bold text-red-600 mb-4",children:"Tag Not Found"}),u.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-6",children:"No posts found for this tag."}),u.jsx("a",{href:"/posts",className:`inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-stone-900
                     rounded-md transition-colors`,children:"View All Posts"})]})})});function lT(){const{posts:e,tag:r}=am.useLoaderData();return u.jsxs("div",{className:"container mx-auto px-4 py-8",children:[u.jsxs("div",{className:"mb-8",children:[u.jsxs("h1",{className:"text-3xl font-bold text-stone-900 dark:text-white mb-4",children:['Posts tagged with "',r,'"']}),u.jsxs("p",{className:"text-stone-600 dark:text-stone-300",children:[e.length," ",e.length===1?"post":"posts"," found"]})]}),u.jsx(dT,{posts:e,showFeatured:!1,title:""})]})}const fT=({posts:e,className:r=""})=>u.jsx("div",{className:`space-y-1 ${r}`,children:e.map((n,a)=>u.jsx("article",{className:"group",children:u.jsx(R,{to:"/posts/$slug",params:{slug:n.slug},className:`block py-4 px-6 border-l-4 border-stone-200 dark:border-stone-700
                       bg-stone-50/30 dark:bg-stone-900/30
                       transition-all duration-200
                       hover:border-stone-400 dark:hover:border-stone-500
                       hover:bg-stone-100/50 dark:hover:bg-stone-800/50`,children:u.jsxs("div",{className:"flex items-start justify-between gap-4",children:[u.jsxs("div",{className:"flex-1 min-w-0",children:[u.jsxs("div",{className:"flex items-center gap-3 mb-2",children:[u.jsx("span",{className:`inline-flex items-center justify-center w-8 h-8 text-sm font-bold
                                   text-stone-600 dark:text-stone-400
                                   bg-stone-200/60 dark:bg-stone-700/60
                                   rounded-full shrink-0`,children:a+1}),u.jsx("h3",{className:`font-semibold text-stone-900 dark:text-white
                                 text-lg leading-tight truncate`,children:n.title})]}),n.excerpt&&u.jsx("p",{className:`text-stone-600 dark:text-stone-300 text-sm leading-relaxed
                               line-clamp-2 ml-11`,children:n.excerpt})]}),u.jsxs("div",{className:"flex flex-col items-end gap-1 text-xs text-stone-500 dark:text-stone-400 shrink-0",children:[u.jsx("time",{dateTime:n.publishedAt instanceof Date?n.publishedAt.toISOString():n.publishedAt,title:P.formatDate(n.publishedAt),children:P.formatRelativeDate(n.publishedAt)}),u.jsxs("span",{children:[n.readingTimeMinutes," min"]})]})]})})},n.slug))}),im=Qe("/series/$slug")({loader:async({params:e})=>{const r=P.createContentProvider({publicationId:k.HASHNODE_PUBLICATION_ID,apiToken:k.HASHNODE_API_TOKEN}),n=await r.getSeriesPosts(e.slug),i=(await r.getSeries()).find(s=>s.slug===e.slug);return{posts:n,slug:e.slug,seriesName:(i==null?void 0:i.name)||e.slug}},component:mT,errorComponent:()=>u.jsx("div",{className:"container mx-auto px-4 py-8",children:u.jsxs("div",{className:"text-center",children:[u.jsx("h1",{className:"text-2xl font-bold text-red-600 mb-4",children:"Series Not Found"}),u.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-6",children:"No posts found for this series."}),u.jsx("a",{href:"/posts",className:`inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-stone-900
                     rounded-md transition-colors`,children:"View All Posts"})]})})});function mT(){const{posts:e,seriesName:r}=im.useLoaderData();return u.jsxs("div",{className:"container mx-auto px-4 py-8",children:[u.jsxs("div",{className:"mb-8",children:[u.jsxs("h1",{className:"text-3xl font-bold text-stone-900 dark:text-white mb-4",children:["📚 ",r]}),u.jsxs("p",{className:"text-stone-600 dark:text-stone-300",children:[e.length," ",e.length===1?"post":"posts"," in this series"]})]}),u.jsx(fT,{posts:e})]})}const gT=({post:e,previousPost:r,nextPost:n,className:a=""})=>{var s;M.useEffect(()=>{const o=P.generateStructuredData(e),c=document.querySelector('script[type="application/ld+json"]');c&&c.remove();const d=document.createElement("script");return d.type="application/ld+json",d.textContent=JSON.stringify(o),document.head.appendChild(d),()=>{const l=document.querySelector('script[type="application/ld+json"]');l&&l.remove()}},[e]);const i=async()=>{const o={title:e.title,text:e.excerpt,url:window.location.href};if(navigator.share)try{await navigator.share(o)}catch{}else navigator.clipboard.writeText(window.location.href)};return u.jsxs("article",{className:`max-w-4xl mx-auto ${a}`,children:[u.jsxs("header",{className:"mb-8",children:[u.jsxs("div",{className:"mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-stone-400 dark:text-stone-500",children:[u.jsx("span",{className:"text-stone-600 dark:text-stone-300",children:((s=e.series)==null?void 0:s.name)||P.getTopicTags(e)[0]||"Essay"}),P.getPostLanguage(e)&&u.jsxs(u.Fragment,{children:[u.jsx("span",{"aria-hidden":!0,className:"text-stone-300 dark:text-stone-700",children:"/"}),u.jsx("span",{children:P.getPostLanguage(e)})]})]}),u.jsx("h1",{className:"font-display text-4xl md:text-5xl font-medium text-stone-900 dark:text-white mb-4 leading-[1.15] tracking-tight",children:e.title}),e.subtitle&&u.jsx("p",{className:"text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed",children:e.subtitle}),u.jsxs("div",{className:"flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6",children:[u.jsx("div",{className:"flex items-center space-x-2",children:u.jsx("span",{className:"font-medium text-gray-700 dark:text-gray-300",children:e.author})}),u.jsx("span",{children:"•"}),u.jsx("time",{dateTime:typeof e.publishedAt=="string"?e.publishedAt:e.publishedAt.toISOString(),children:P.formatDate(typeof e.publishedAt=="string"?e.publishedAt:e.publishedAt.toISOString())}),u.jsx("span",{children:"•"}),u.jsxs("span",{children:[e.readingTimeMinutes," min read"]}),e.wordCount&&u.jsxs(u.Fragment,{children:[u.jsx("span",{children:"•"}),u.jsxs("span",{children:[e.wordCount.toLocaleString()," words"]})]})]}),P.getTopicTags(e).length>0&&u.jsx("div",{className:"flex flex-wrap gap-x-5 gap-y-2 mb-8 font-mono text-[11px] uppercase tracking-[0.16em]",children:P.getTopicTags(e).map(o=>u.jsx(R,{to:"/tags/$tag",params:{tag:o},className:"text-stone-400 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors",children:o},o))}),e.coverImage&&u.jsx("div",{className:"mb-8 rounded-lg overflow-hidden",children:u.jsx("img",{src:e.coverImage,alt:e.title,className:"w-full h-auto object-cover",loading:"eager"})}),u.jsx("div",{className:"flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-6",children:u.jsxs("button",{onClick:i,className:`inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                       bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 
                       transition-colors`,children:[u.jsx("svg",{className:"w-4 h-4 mr-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:u.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"})}),"Share"]})})]}),u.jsx("div",{className:"mb-12",children:u.jsx(rm,{content:e.content,className:"prose-lg"})}),(r||n)&&u.jsx("nav",{className:"border-t border-gray-200 dark:border-gray-700 pt-8 mb-8",children:u.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[u.jsx("div",{className:`${r?"":"md:col-start-2"}`,children:r&&u.jsxs(R,{to:"/posts/$slug",params:{slug:r.slug},className:`block p-4 border border-gray-200 dark:border-gray-700 rounded-lg 
                             hover:border-gray-300 dark:hover:border-gray-600 transition-colors group`,children:[u.jsx("div",{className:"text-sm text-gray-500 dark:text-gray-400 mb-1",children:"← Previous"}),u.jsx("div",{className:"font-medium text-gray-900 dark:text-white",children:r.title})]})}),u.jsx("div",{children:n&&u.jsxs(R,{to:"/posts/$slug",params:{slug:n.slug},className:`block p-4 border border-gray-200 dark:border-gray-700 rounded-lg 
                             hover:border-gray-300 dark:hover:border-gray-600 transition-colors group text-right`,children:[u.jsx("div",{className:"text-sm text-gray-500 dark:text-gray-400 mb-1",children:"Next →"}),u.jsx("div",{className:"font-medium text-gray-900 dark:text-white",children:n.title})]})})]})})]})},sm=Qe("/posts/$slug")({loader:async({params:e})=>{const r=P.createContentProvider({publicationId:k.HASHNODE_PUBLICATION_ID,apiToken:k.HASHNODE_API_TOKEN}),n=await r.getPostBySlug(e.slug);if(!n)throw new Error("Post not found");const a=await r.getPosts(20),i=a.findIndex(c=>c.slug===e.slug),s=i>0?a[i-1]:null,o=i<a.length-1?a[i+1]:null;return{post:n,previousPost:s?{slug:s.slug,title:s.title}:null,nextPost:o?{slug:o.slug,title:o.title}:null}},component:hT,errorComponent:()=>u.jsx("div",{className:"container mx-auto px-4 py-8",children:u.jsxs("div",{className:"text-center",children:[u.jsx("h1",{className:"text-2xl font-bold text-red-600 mb-4",children:"Post Not Found"}),u.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-6",children:"The post you're looking for doesn't exist or has been moved."}),u.jsx("a",{href:"/posts",className:`inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-stone-900
                     rounded-md transition-colors`,children:"View All Posts"})]})})});function hT(){const{post:e,previousPost:r,nextPost:n}=sm.useLoaderData();return Lc.useEffect(()=>{const a=P.generatePostSEO(e);document.title=a.title;let i=document.querySelector('meta[name="description"]');i||(i=document.createElement("meta"),i.setAttribute("name","description"),document.head.appendChild(i)),i.setAttribute("content",a.description);const s=(c,d)=>{let l=document.querySelector(`meta[property="${c}"]`);l||(l=document.createElement("meta"),l.setAttribute("property",c),document.head.appendChild(l)),l.setAttribute("content",d)};a.ogTitle&&s("og:title",a.ogTitle),a.ogDescription&&s("og:description",a.ogDescription),a.ogUrl&&s("og:url",a.ogUrl),a.ogImage&&s("og:image",a.ogImage);const o=(c,d)=>{let l=document.querySelector(`meta[name="${c}"]`);l||(l=document.createElement("meta"),l.setAttribute("name",c),document.head.appendChild(l)),l.setAttribute("content",d)};a.twitterCard&&o("twitter:card",a.twitterCard),a.ogTitle&&o("twitter:title",a.ogTitle),a.ogDescription&&o("twitter:description",a.ogDescription),a.ogImage&&o("twitter:image",a.ogImage)},[e]),u.jsx("div",{className:"container mx-auto px-4 py-8",children:u.jsx(gT,{post:e,previousPost:r,nextPost:n})})}const bT=kM.update({id:"/",path:"/",getParentRoute:()=>Ae}),_T=rT.update({id:"/posts/",path:"/posts/",getParentRoute:()=>Ae}),vT=oT.update({id:"/notes/",path:"/notes/",getParentRoute:()=>Ae}),OT=am.update({id:"/tags/$tag",path:"/tags/$tag",getParentRoute:()=>Ae}),xT=im.update({id:"/series/$slug",path:"/series/$slug",getParentRoute:()=>Ae}),pT=sm.update({id:"/posts/$slug",path:"/posts/$slug",getParentRoute:()=>Ae}),DT={IndexRoute:bT,PostsSlugRoute:pT,SeriesSlugRoute:xT,TagsTagRoute:OT,NotesIndexRoute:vT,PostsIndexRoute:_T},$T=Ae._addFileChildren(DT)._addFileTypes(),wT=gm({routeTree:$T});_s.createRoot(document.getElementById("root")).render(u.jsx(Lc.StrictMode,{children:u.jsx(hm,{router:wT})}));
//# sourceMappingURL=index-lk7OlWrf.js.map
