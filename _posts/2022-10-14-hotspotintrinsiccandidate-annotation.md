---
layout: post
title:  "@HotSpotIntrinsicCandidate을 활용한 성능 향상"
date:   2022-10-14 16:58:00 +0900
categories: ["java", "jvm", "hotspot"]
---

## 1. \@HotSpotIntrinsicCandidate Annotation

**HotSpot JVM**에서는 최적화 기법중 하나로 **JDK**의 일부 정적 메소드들에 대한 고 성능의 **내장 함수(intrinsic function)**들을 제공한다. 이때, **\@HotSpotIntrinsicCandidate**는 **HotSpot**에서 **내장 함수**로 치환 될 수 있는 **메소드**들을 표시한다. **\@HotSpotIntrinsicCandidate**은 **JDK**내부에서만 선언 가능(**사용자 코드에선 불가**)하고 **JVM**에게  **\@HotSpotIntrinsicCandidate**을 가진 **메소드**만 **내제화(intrinsify)**하게 할 수 있다.

- **HotSpot JVM**은 기본적으로 코드의 중복되는 부분을 별도의 컴파일러가 **내제화**하는 기능을 가지고 있다.
