avoidjekyllparse---
layout: post
title: "JSTL 개요"
date: 2022-10-04 16:09:00 +0900
categories: ["Java","Java EE", "JSTL"]
---

## 1. JSTL 이란?

- 많은 *JSP* 응용에서 보편적으로 사용되는 기능들을 캡슐화한 *커스텀 태그* 라이브러리.
- *JSP 표준 태그 라이브러리*(*JavaServer Pages Standard Tag Library*).
  + 현재 가장 마지막 버전은(*Java EE 8*에 사용) *Java EE 5*에 등장한 *JSTL 1.2*.
  + 공식 링크 : <https://www.oracle.com/java/technologies/jstl.html>.
- *Jakarta EE 8*부터는 기술이름이 *Jakarta Standard Tag Library*로 변경됨.
  + *Jakarta EE 8* : *JSTL 1.2*
  + *Jakarta EE 9* : *JSTL 2.0*
  + *Jakarta EE 10*(최신) : *JSTL 3.0*
  + 공식 링크 : <https://jakarta.ee/specifications/tags/>

## 2. JSTL의 구성(JSTL 1.1버전 이상)

- *Core*
  + 기능 : 변수 지원, 흐름 제어, URL 관리 등등.
  + prefix : *c*
  + uri : <http://java.sun.com/jsp/jstl/core>
- *XML*
  + 기능 : *XML*처리 기능, *XML* 흐름 제어, *XML* 번역.
  + prefix : *x*
  + uri : <http://java.sun.com/jsp/jstl/xml>
- *Internationalization*
  + uri : Locale 기능, 메시지 포매팅, 숫자 및 날짜 포매팅.
  + prefix : *fmt*
  + uri : <http://java.sun.com/jsp/jstl/fmt>
- *Database*
  + 기능 : DB와의 연결, SQL을 통한 DB작업들을 처리.
  + prefix : *sql*
  + uri : <http://java.sun.com/jsp/jstl/sql>
- *Functions*
  + uri :  *Collection*의 길이를 반환, *String* 조작.
  + prefix : *fn*
  + uri : <http://java.sun.com/jsp/jstl/functions>

## 3. JSTL 사용법.

1. *JSTL*은 *tagliv 디렉티브*를 통해 해당 *JSP* 페이지에서 사용할 것을 명시해야 한다.

   ```jsp
   <%@ taglib prefix=라이브러리_PREFIX uri=라이브러리_URI%>
   ```

   - 예시-JSTL core를 사용 명시하기.

   ```jsp
   <%@ taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core"%>
   ```

2. *JSP*에서 *커스텀 태그*처럼 사용한다.

   ```jsp
   <라이브러리_PREFIX:태그이름 속성1="값"... 속성n="값"/>
   ```

   또는

   ```jsp
   <라이브러리_PREFIX:태그이름 속성1="값"... 속성n="값">...</라이브러리_PREFIX:태그이름>
   ```
