---
title: STS 개요
date: 2022-10-07T07:47:00.000Z
tags:
  - Spring
  - STS
---

## 1. STS(Spring Tool Suite)란?

Spring 개발툴. 이클립스 기반의 IDE였었다(*STS 3*이전). 지금은 다른 IDE에 설치하여 사용 가능하다.

## 2. STS3 vs STS4

- *STS*는 현재 *STS 4*가 최신
  - 최신버전 링크 : <https://spring.io/tools>
- *STS 3*에서 *STS 4*로넘어가면서, 여러 이유로 *STS 3*가 *Deprecated*됨.

  - *STS 4*부터는 _IDE agnostic_.

    *STS 3*까지는 *이클립스 기반*이기에 완성된 *STS*를 직접 다운받거나 *이클립스*에 필요한 구성요소를 다운받아 사용 가능함. *STS 4*부터는 *다른 IDE*에서도 필요한 구성요소를 다운받아 STS를 구성할 수 있게 함.

    > The Spring Tool Suite 3 is the previous generation of the Spring tooling for the Eclipse IDE. The Spring Tool Suite distribution was based on the Eclipse JEE package and included the Spring IDE components, the tc Server integration for Eclipse, and various other pre-installed plugins for the Eclipse IDE.

    > With the release of the all-new Spring Tools 4, the Spring Tool Suite 3 got deprecated and is no longer under active development. Instead, users of the Spring Tool Suite 3 are highly encouraged to migrate to the all-new Spring Tools 4: https://spring.io/tools. Even though the new Spring Tools 4 are IDE-agnostic and available for various development tools, we continue to provide a ready-to-use Eclipse-based distribution with the necessary components pre-installed.

  - *STS 4*에서는 *Spring Legacy Project*를 제거.

    *STS 3*를 마지막으로 *Spring Legacy Project*가 *Deprecated*됨.

- *Legacy Spring Framework*를 사용하고자 하는 개발자들은 STS3를 사용.
  - STS3 링크 : <https://github.com/spring-attic/toolsuite-distribution/wiki/Spring-Tool-Suite-3#latest-sts3-downloads>
