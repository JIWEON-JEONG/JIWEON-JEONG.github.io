---
title: "[Network] NGINX 와 설정파일"
excerpt: "NGINX 와 설정파일"

categories:
  - Network
tags:
  - [Network]

permalink: /network/2/

toc: true
toc_sticky: true

date: 2022-09-03
last_modified_at: 2022-09-03
---
#NGINX
>NGINX is open source software for web serving, reverse proxying, caching, load balancing, media streaming, and more.

*reverse proxy : 서버를 호출할 때 직접 서버에 접근 하는 것이 아니라 리버스 프록시 서버를 호출하게 되고, 리버스 프록시 서버가 서버에게 요청을 하고 응답을 받아 클라이언트에 전달을 한다.<br>
(Internet network 기준으로 client 쪽에 있다면 Forward proxy, Server 쪽에 있다면 Reverse proxy.)
> 클라이언트는 리버스 프록시 서버를 호출하기 때문에 실제 서버의 IP를 감출 수 있고, 이를 통해 보안을 높일 수 있다는 장점이 있다.
>
> 캐시 서버로 이용할 수 있고 , 로드 밸런싱 가능 해진다.

> HTTPS 인증서를 제공 해줄 수 있다.
> 
> 비동기 방식으로 처리 하기 때문에 많은 트래픽을 동시에 처리 가능하다.
> 
> log 확인 가능 (/var/log/nginx 에 위치)
---

##NGINX 의 목적
>The goal behind NGINX was to create the fastest web server around.<br>
> (NGINX 의 목표는 가장 빠른 웹 서버를 만드는 것.)
---

##NGINX 구조
![사진](imgs/nginx1.png)
1. Master Process 
>config 파일을 읽고 worker process를 생성/관리
2. Worker Process
>실제 동작을 수행
3. Helper Process
> Cache Loader : 최초로 캐시를 로딩해줌 <br>
> Cache Maanger : 주기적으로 캐시를 관리해줌

##NGINX config 파일 설정 예시
>$host 또는 $request_uri 들은 클라이언트에서 받은 요청들을 참고하여 변수들 채워진다.
>
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

