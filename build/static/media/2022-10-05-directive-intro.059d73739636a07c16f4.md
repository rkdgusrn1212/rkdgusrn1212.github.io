avoidjekyllparse---
title: Directive 개요
date: 2022-10-05T05:07:00.000Z
tags:
  - Java
  - Java EE
  - Directive
---

## 1. Directive란?

*JSP 페이지*에 작성된 *JSP 컨테이너*에 보내는 메시지. *JSP 컨테이너*가 *JSP 페이지*를 *Servlet*으로 컴파일하는데 필요한 정보들을 명시한다.

## 2 Directive의 기본 문법.

```jsp
<%@ directive {attr="value"} %>
```

## 3 Directive의 종류.

- Page Directive : *JSP 컨테이너*에서 필요한 *JSP 페이지*의 종속 속성들을 정의하는데 사용됨.

  ```jsp
  <%@ page language="java" contentType="text/html; charset=EUC-KR"
  	pageEncoding="EUC-KR"%>
  ```

  관련 게시글 : [Page Directive 개요]().

- Include Directive : _JSP 페이지_ 내부에 또 다른 _JSP 페이지_ 를 포함시키기 위해 사용.
- Taglib Directive : *JSP 페이지*에서 사용할 *태그 라이브러리*를 지정.

## 4 Directive의 기술 스펙

- _JSP_ 기술 스펙 ([JSR-245](https://jcp.org/en/jsr/detail?id=245))에 기술.
- 현재는 Java EE 8의 JSP 2.3버전이 최신이다.\[[Jakarta EE](/java/java%20ee/jakarta%20ee/2022/10/04/jakarta-ee-intro.html)\]
