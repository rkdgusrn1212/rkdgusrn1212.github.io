---
layout: post
title:  "@HotSpotIntrinsicCandidate을 활용한 성능 향상"
date:   2022-10-14 16:58:00 +0900
categories: ["java", "jvm", "hotspot", "hotspotintrinsiccandidate"]
---

## 1. @HotSpotIntrinsicCandidate 역할

**HotSpot JVM**에서는 최적화 기법중 하나로 **JDK**의 일부 **정적 메소드**들에 대한 고성능의 **내장 함수(intrinsic function)**들을 제공한다. **@HotSpotIntrinsicCandidate**는 **HotSpot**에서 **내장 함수**로 치환될 수 있는 **JDK**의 **정적 메소드**들을 표시한다.

## 1.1. JDK 사용자가 Hotspot에 내장함수 기능을 최대한 활용 할 수 있게 함

**JDK**를 활용한 개발을 할때, 개발자는 별도의 스펙을 찾아보지 않고 **정적 메소드**상단의 **@HotSpotIntrinsicCandidate**의 유무만 보고도 **Hotspot**의 **내장 함수**기능을 제공 받는지를 알 수가 있다. 따라서 개발자는 코드에 **@HotSpotIntrinsicCandidate**가 선언된 **정적 메소드**로 대체 가능한 코드는 최대한 대체시켜서 **HosSpot JVM**에 최적화된 프로그래밍이 가능하다.

## 2. @HotSpotIntrinsicCandidate 선언

**@HotSpotIntrinsicCandidate**은 **JDK**의 코어 라이브러리에서만 선언 가능하고 **사용자 코드**에서는 선언이 불가하다. **@HotSpotIntrinsicCandidate**의 선언은 오로지 **JDK**을 만들고 배포하는 개발자 및 개발사들이 고려해야할 사항이다.
