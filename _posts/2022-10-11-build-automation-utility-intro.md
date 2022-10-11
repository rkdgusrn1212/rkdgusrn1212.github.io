---
layout: post
title:  "빌드 자동화 도구 개요"
date:   2022-10-11 09:21:00 +0900
categories: "build automation utility"
---

## 1. 빌드 자동화 도구란?

*Build Automation Utility(빌드 자동화 도구)* 프로젝트 빌드 및 배포 과정에서 단순하고 반복적인 작업을 자동화해준다.

## 2. 주요 빌드 자동화 도구

### 2.1. Make

- *C*로 작성된 *빌드 자동화 도구*.
- *Unix* 계열 *OS*에서 사용됨.
- 다양한 *Make* 파생들이 존재함.
  + SunPro Make
  + Distributed Make(dmake)
  + BSD Make
    * pmake
    * bmake
    * fmake
  + GNU Make(gmake)
  + Glenn Fowler's nmake
  + Microsoft's' nmake
  + MK

### 2.2. Ant

- *Java* 기반 빌드 자동화 도구.
- *아파치 재단*의 *오픈소스 프로젝트*
- *이클립스*에 내장됨. 별도의 설치 없이 Ant 프로젝트 생성 가능.
- 가장 오래된 *자바 프로젝트* 빌드 자동화 도구
- *XML* 문법을 사용

### 2.3. Maven

- *Java* 기반의 빌드 자동화 도구
- *Ant*의 단점들을 해소하고 자동화 수준을 높힌 *Java*기반 빌드 자동화 도구
- *아파치 재단*의 *오픈소스 프로젝트*
- *XML* 문법 사용

### 2.4. Gradle

- *Java* 기반의 빌드 자동화 도구
- *Maven*보다 빌드 속도가 훨신 빠름.
- *안드로이드 프로젝트*의 빌드 자동화 도구로 유명.
- *JVM*에서 동작하는 동적 타입언어인 *Groovy*문법을 사용.
