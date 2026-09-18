---
title: JSTL 개요
date: 2022-10-04T07:09:00.000Z
tags:
  - Java
  - Java EE
  - JSTL
---

## 1. JSTL 이란?

- 많은 _JSP_ 응용에서 보편적으로 사용되는 기능들을 캡슐화한 _커스텀 태그_ 라이브러리.
- _JSP 표준 태그 라이브러리_(_JavaServer Pages Standard Tag Library_).
  - 현재 가장 마지막 버전은(*Java EE 8*에 사용) *Java EE 5*에 등장한 _JSTL 1.2_.
  - 공식 링크 : <https://www.oracle.com/java/technologies/jstl.html>.
- *Jakarta EE 8*부터는 기술이름이 *Jakarta Standard Tag Library*로 변경됨.
  - _Jakarta EE 8_ : _JSTL 1.2_
  - _Jakarta EE 9_ : _JSTL 2.0_
  - _Jakarta EE 10_(최신) : _JSTL 3.0_
  - 공식 링크 : <https://jakarta.ee/specifications/tags/>

## 2. JSTL의 구성(JSTL 1.1버전 이상)

- _Core_
  - 기능 : 변수 지원, 흐름 제어, URL 관리 등등.
  - prefix : _c_
  - uri : <http://java.sun.com/jsp/jstl/core>
- _XML_
  - 기능 : *XML*처리 기능, _XML_ 흐름 제어, _XML_ 번역.
  - prefix : _x_
  - uri : <http://java.sun.com/jsp/jstl/xml>
- _Internationalization_
  - uri : Locale 기능, 메시지 포매팅, 숫자 및 날짜 포매팅.
  - prefix : _fmt_
  - uri : <http://java.sun.com/jsp/jstl/fmt>
- _Database_
  - 기능 : DB와의 연결, SQL을 통한 DB작업들을 처리.
  - prefix : _sql_
  - uri : <http://java.sun.com/jsp/jstl/sql>
- _Functions_
  - uri : *Collection*의 길이를 반환, _String_ 조작.
  - prefix : _fn_
  - uri : <http://java.sun.com/jsp/jstl/functions>

## 3. JSTL 사용법.

1. *JSTL*은 *tagliv 디렉티브*를 통해 해당 _JSP_ 페이지에서 사용할 것을 명시해야 한다.

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
