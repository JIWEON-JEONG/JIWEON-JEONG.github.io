---
title: "[Android] Manifest"
excerpt: "Manifest"

categories:
  - Android
tags:
  - [대외활동, 회고]

permalink: /android/manifest/

toc: true
toc_sticky: true

date: 2022-08-04
last_modified_at: 2022-08-04
---
> 안드로이드 공식 문서를 조금 변경하거나 내용을 추가한 게시글입니다.  
> [참고한 공식 문서 바로가기](https://developer.android.com/guide/topics/manifest/manifest-intro) 

<br>

# App Manifest?
**Android 빌드 도구, Android 운영체제 및 Google Play에 앱에 대한 필수 정보를 설명함**   

<br>

## 주요 선언
### 앱의 패키지 이름
* 프로젝트를 빌드할 때 패키지 이름으로 코드 객체의 위치를 확인
* 앱을 패키징할 때 패키지 이름을 Gradle 빌드 파일의 Application ID로 대체 (시스템과 Goolge Play에서 고유한 앱 식별자로 사용)

<br>

### 앱의 구성 요소(Activity, Service, Broadcast Receiver, Content Provider)
* 각 구성 요소는 기본 속성을 정의해야함
* 자신이 처리할 수 있는 기기 구성의 종류, 그리고 구성 요소가 어떻게 시작되는지 설명하는 인텐트 필터와 같은 기능을 선언할 수 있음

<br>

### 권한

<br>

### 앱이 필요한 하드웨어 및 소프트웨어 기능
* 이에 따라 앱을 Google Play에서 설치할 수 있는 기기의 종류가 달라짐   

<br>
<br>

## 패키지 이름과 Application ID
Manifest 파일의 루트 요소는 앱의 패키지 이름에 대한 특성이 필요   
```XML
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.myapp"
    android:versionCode="1"
    android:versionName="1.0" >
    ...
</manifest>
```

### 앱을 APK로 빌드하는 동안 Android 빌드 도구가 package 특성을 사용하는 목적

1. 빌드 도구는 [R.java 클래스](https://curryyou.tistory.com/370)의 [네임스페이스](https://java119.tistory.com/65)로 패키지 이름을 적용 (앱 리소스에 액세스 하는데 사용)   
ex) 위의 매니페스트와 함께 `R 클래스`가 `com.example.myapp.R`에서 생성됩니다.
2. 빌드 도구는 패키지 이름을 사용하여 매니페스트 파일에 선언되어 있는 상대 클래스 이름을 확인
ex) 위 매니페스트를 사용하면 `<activity android:name=".MainActivity">`로 선언된 액티비티가 `com.example.myapp.MainActivity`인 것으로 확인됩니다.

<br>

APK가 컴파일 되면 `build.gradle(project)` 파일에 있는 `applicationId` 속성에 지정된 값으로 `package` 값이 대체된다. 이렇게 교체된 `package 값(applicationId)`은 앱을 시스템과 Google Play에서 식별하기 위한 고유한 값 이어야한다.   

package 이름과 build.gradle 파일의 applicationId를 동일하게 유지한다면 상관 없으나 다르게 지정하면 문제가 발생할 수 있다. 이를 해결하려면 Application ID 설정이 미치는 영향을 충분히 이해해야 한다.

<br>
<br>

## 앱 구성 요소
앱에서 생성하는 각각의 앱 구성 요소에 대해 매니페스트 파일에서 해당하는 XML 요소를 선언해야 합니다.

* `<activity>` Activity의 각 하위 클래스.   
* `<service>` Service의 각 하위 클래스.   
* `<receiver>` BroadcastReceiver의 각 하위 클래스.   
* `<provider>` ContentProvider의 각 하위 클래스.   

매니페스트 파일에서 XML 요소를 선언하지 않고 이 구성 요소를 하위 클래스로 지정하면 시스템에서 이를 시작할 수 없습니다.

<br>

## 인텐트 필터
앱 액티비티, 서비스, Broadcast Receiver는 인텐트로 활성화됩니다. 인텐트는 실행할 작업을 설명하는 Intent 객체로 정의되는 메시지입니다. 여기에는 작업할 데이터, 작업을 수행해야 하는 구성 요소의 카테고리 및 기타 지침이 포함됩니다.

앱이 인텐트를 시스템에 발행하면 시스템은 각 앱의 매니페스트 파일에 선언된 인텐트 필터에 기초하여 인텐트를 처리할 수 있는 앱 구성 요소를 찾습니다. 시스템은 일치하는 구성 요소의 인스턴스를 시작하고 해당 구성 요소에 Intent 객체를 전달합니다. 두 개 이상의 앱이 인텐트를 처리할 경우 사용자는 어느 앱을 사용할지 선택할 수 있습니다.

앱 구성 요소는 인텐트 필터(`<intent-filter>` 요소로 정의)를 몇 개든 가질 수 있으며, 각 인텐트 필터는 해당 구성 요소의 각 기능을 설명합니다.

<br>

## 아이콘 및 레이블
어떤 매니페스트 요소는 해당 앱 구성 요소에 대해 각각 작은 아이콘과 텍스트 레이블을 사용자에게 각각 표시하기 위한 icon과 label 특성이 있습니다.

각각의 경우에 상위 요소에 설정된 아이콘과 레이블은 모든 하위 요소에 대해 기본 icon과 label 값이 됩니다. 예를 들어 `<application>` 요소에 설정된 아이콘과 레이블이 앱의 각 구성 요소(예: 모든 액티비티)에 대한 기본 아이콘과 레이블이 됩니다.

구성 요소의 `<intent-filter>`에 설정된 아이콘과 레이블은 구성 요소가 인텐트를 수행하기 위한 옵션으로 제시될 때마다 사용자에게 표시됩니다. 기본적으로 이 아이콘은 상위 구성 요소(`<activity>` 또는 `<application>` 요소)에 대해 어떤 아이콘이 선언되든 이를 상속하지만, 선택기 대화상자에서 더욱 잘 보여주고 싶은 고유한 작업을 제공하는 인텐트 필터의 아이콘이 있다면 해당 아이콘으로 변경할 수도 있습니다.

<br>

## 권한
Android 앱은 민감한 사용자 데이터(예: 연락처, SMS) 또는 특정 시스템 기능(예: 카메라, 인터넷 액세스)에 액세스하기 위한 권한을 요청해야 합니다. 각 권한은 고유한 레이블로 식별됩니다. 예를 들어 SMS 메시지를 보내야 하는 앱은 매니페스트에 다음과 같은 줄이 있어야 합니다.

```XML
<manifest ... >
    <uses-permission android:name="android.permission.SEND_SMS"/>
    ...
</manifest>
```
Android 6.0(API 레벨 23)부터 사용자는 런타임에서 일부 앱 권한을 승인하거나 거절할 수 있게 됩니다. 그러나 앱이 어떤 Android 버전을 지원하든 매니페스트에서 `<uses-permission>` 요소로 모든 권한 요청을 선언해야 합니다. 권한이 부여되면 앱이 보호된 기능을 사용할 수 있습니다. 권한이 부여되지 않으면 그러한 기능에 액세스하려는 시도가 실패합니다.

앱은 권한을 사용하여 자체적인 구성 요소를 보호할 수도 있습니다. Android에서 정의된 권한(android.Manifest.permission에서 설명) 또는 다른 앱에서 선언된 권한을 사용할 수 있습니다. 또한, 앱에서 권한을 정의할 수도 있습니다. 새 권한을 선언할 때는 `<permission>` 요소를 사용합니다.   

<br>

## 기기 호환성
매니페스트 파일에서는 앱에 필요한 하드웨어 또는 소프트웨어 기능을 선언할 수 있고, 따라서 앱과 호환되는 기기 유형도 선언할 수 있습니다. Google Play Store에서는 앱에 필요한 기능이나 시스템 버전을 제공하지 않는 기기에 앱 설치를 허용하지 않습니다.

어느 기기가 앱과 호환되는지 정의하는 매니페스트 태그가 여러 가지 있습니다. 가장 일반적으로 사용하는 태그의 몇 가지 예를 들자면 다음과 같습니다.

### `<uses-feature>`
`<uses-feature>` 요소를 사용하여 앱에 필요한 하드웨어 및 소프트웨어 기능을 선언할 수 있습니다. 예를 들어 나침반 센서가 없는 기기에서 앱이 기본적인 기능을 실행할 수 없다면, 필요에 따라 다음과 같이 매니페스트 태그를 사용하여 나침반 센서를 선언할 수 있습니다.

```XML
<manifest ... >
    <uses-feature android:name="android.hardware.sensor.compass"
                  android:required="true" />
    ...
</manifest>
```

각 후속 플랫폼 버전에 이전 버전에서 사용할 수 없는 새 API가 추가되는 경우가 종종 있습니다. 앱이 호환되는 최소 버전을 나타내려면 build.gradle 파일에 minSdkVersion과 targetSdkVersion 값을 사용해야 합니다.

```
android {
  defaultConfig {
    applicationId 'com.example.myapp'

    // Defines the minimum API level required to run the app.
    minSdkVersion 15

    // Specifies the API level used to test the app.
    targetSdkVersion 28

    ...
  }
}
```





