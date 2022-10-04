---
layout: post
title: "JSTL 개요"
date: 2022-10-04 16:09:00 +0900
categories: ["Java","Java EE", "JSTL"]
---

## 1. JSTL 이란?

- *JSP 표준 태그 라이브러리*(*JavaServer Pages Standard Tag Library*)
- 많은 *JSP* 응용에서 보편적으로 사용되는 기능들을 캡슐화한 *커스텀 태그* 라이브러리

## 2. JSTL의 구성

- *Core*
  + 기능 : 변수 지원, 흐름 제어, URL 관리 등등.
  + prefix : *c*
  + 링크 : <http://java.sun.com/jsp/jstl/core>
- *XML*
  + 기능 : *XML*처리 기능, *XML* 흐름 제어, *XML* 번역.
  + prefix : *x*
  + 링크 : <http://java.sun.com/jsp/jstl/xml>
- *Internationalization*
  + 기능 : Locale 기능, 메시지 포매팅, 숫자 및 날짜 포매팅.
  + prefix : *fmt*
  + 링크 : <http://java.sun.com/jsp/jstl/fmt>
- *Database*
  + 기능 : DB와의 연결, SQL을 통한 DB작업들을 처리.
  + prefix : *sql*
  + 링크 : <http://java.sun.com/jsp/jstl/sql>
- *Functions*
  + 기능 :  *Collection*의 길이를 반환, *String* 조작.
  + prefix : *fn*
  + 링크 : <http://java.sun.com/jsp/jstl/functions>

## 3. Jakarta Standard Tag Library

*이클립스 재단*의 *J4EE* 프로젝트로 이관된 이후 버전에서 가지는 이름.
