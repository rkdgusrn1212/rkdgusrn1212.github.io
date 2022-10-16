---
layout: post
title:  "@HotSpotIntrinsicCandidate을 활용한 성능 향상"
date:   2022-10-14 16:58:00 +0900
categories: ["java", "jvm", "hotspot", "hotspotintrinsiccandidate"]
---

## 1. @HotSpotIntrinsicCandidate 역할

### 1.1. HotSpot에서 내장 함수로 치환될 수 있는 JDK의 정적 메소드들을 표시

**HotSpot JVM**에서는 최적화 기법중 하나로 **JDK**의 일부 **정적 메소드**들에 대한 고성능의 **내장 함수(intrinsic function)**[^intrinsics]들을 제공한다. **JDK 9**부터 등장한 **@HotSpotIntrinsicCandidate**은 **JDK**의 특정 메소드들이 **HotSpot**의 **내장 함수**로 치환될 수 있음을 나타낸다. 표시를 할뿐, 실제로 **@HotSpotIntrinsicCandidate**를 통해 **javac**의 **Annotation Processor**가 **내장 함수** 또는 **네이티브 코드**로 변환해주는 기능은 없다. 해당 기능은 **JIT**의 역할이기 때문이다.

[^intrinsics]: 손으로 직접 최적화 작성한 **어셈블리어** 혹은 **컴파일러 IR**로 구성

### 1.2. JDK 사용자가 HotSpot의 내장함수 기능을 최대한 활용 할 수 있게 함

**JDK**를 활용한 개발을 할때, 개발자는 별도의 스펙을 찾아보지 않고 **정적 메소드**상단의 **@HotSpotIntrinsicCandidate**의 유무만 보고도 **Hotspot**의 **내장 함수**기능을 제공 받는지를 알 수가 있다. 따라서 개발자는 코드에 **@HotSpotIntrinsicCandidate**가 선언된 **정적 메소드**로 대체 가능한 코드는 최대한 대체시켜서 **HosSpot JVM**에 최적화된 프로그래밍이 가능하다. **HotSpot JVM**은 기본 **JDK**배포에 포함되는 **JVM**의 표준이므로 해당 어노테이션을 활용한 최적화된 프로그래밍에 익숙해져야 한다.

## 2. @HotSpotIntrinsicCandidate은 Internal 하다

**@HotSpotIntrinsicCandidate**은 **JDK**의 코어 라이브러리에서만 선언 가능하고 **사용자 코드**에서는 선언이 불가하다. **@HotSpotIntrinsicCandidate**의 선언은 오로지 **JDK**을 만들고 배포하는 개발자 및 개발사들이 고려해야할 사항이다.

> The {@code @HotSpotIntrinsicCandidate} annotation is internal to the Java libraries and is therefore not supposed to have any relevance for application code. [OpenJDK11 JavaDoc](https://github.com/AdoptOpenJDK/openjdk-jdk11/blob/master/src/java.base/share/classes/jdk/internal/HotSpotIntrinsicCandidate.java)

## 3. @HotSpotIntrinsicCandidate은 Intrinsify를 보장하진 못한다

**HotSpot**은 구동되는 타겟 OS, 벤더에 따라 그 구현이 조금씩 다르다. 따라서 각 구현마다 **내장 함수** 목록도 조금씩 달라서 @HotSpotIntrinsicCandidate이 쓰여있더라도 하드웨어에 설치된 **HotSpot**에서는 **내장 함수**로 치환이 안될 수 있다.

> \* The HotSpot VM defines (internally) a list of intrinsics. Not all intrinsic
 \* are available on all platforms supported by the HotSpot VM. Furthermore,
 \* the availability of an intrinsic on a given platform depends on the
 \* configuration of the HotSpot VM (e.g., the set of VM flags enabled).
 \* Therefore, annotating a method with {@code @HotSpotIntrinsicCandidate} does
 \* not guarantee that the marked method is intrinsified by the HotSpot VM.
 [OpenJDK11 JavaDoc](https://github.com/AdoptOpenJDK/openjdk-jdk11/blob/master/src/java.base/share/classes/jdk/internal/HotSpotIntrinsicCandidate.java)

## 4. @HotSpotIntrinsicCandidate는 반드시 표시되어야 한다

**Java 9**부터 등장한 @HotSpotIntrinsicCandidate는 **JDK**코어 라이브러리 개발자로 하여금 @HotSpotIntrinsicCandidate를 반드시 쓰게 하기위해서, **JIT 컴파일러**에서 해당 어노테이션을 가진 메소드들만 **내장 함수**치환 기능을 제공하도록 제한된다.

**OpenJDK 11**의 **JavaDoc**에 따르면 **HotSpot JVM**의 JIT를 실행할 때 **CheckIntrinsics** 플레그를 통해 **내장 함수** 치환 기능을 제공하는데, 해당 플레그가 참일 때(Default는 참), 클래스를 로드하는 시점에서 해당 어노테이션을 가지고 있는 메소드가 **HotSpot**의 **내장 함수** 리스트에 있는지를 검사한다고 한다. 해당 사항에 대해선 **OpenJDK**와 **JDK**는 같은 스펙을 공유한다.

> \* If the {@code CheckIntrinsics} VM flag is enabled, the HotSpot VM checks
 \* (when loading a class) that (1) all methods of that class that are also on
 \* the VM's list of intrinsics are annotated with {@code @HotSpotIntrinsicCandidate}
 \* and that (2) for all methods of that class annotated with
 \* {@code @HotSpotIntrinsicCandidate} there is an intrinsic in the list.
 \*
 \* @since 9 [OpenJDK11 JavaDoc](https://github.com/AdoptOpenJDK/openjdk-jdk11/blob/master/src/java.base/share/classes/jdk/internal/HotSpotIntrinsicCandidate.java)

* [관련 이슈 링크](https://bugs.java.com/bugdatabase/view_bug.do?bug_id=8076112).
* [관련 블로그 링크](https://simonis.github.io/GeekOut2018/HotspotIntrinscs/intrinsics.xhtml#/9)
* [관련 블로그 링크2](https://alidg.me/blog/2020/12/10/hotspot-intrinsics)
