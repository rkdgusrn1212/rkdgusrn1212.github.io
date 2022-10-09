---
layout: post
title: "Directive 개요"
date: 2022-10-05 14:07:00 +0900
categories: ["Java","Java EE", "Directive"]
---

## 1. Directive란?

*JSP 페이지*에 작성된 *JSP 컨테이너*에 보내는 메시지. *JSP 컨테이너*가 *JSP 페이지*를 *Servlet*으로 컴파일하는데 필요한 정보들을 명시한다.

### 1.1. Directive의 기본 문법.

```jsp
<%@ directive {attr="value"} %>
```
### 1.2. Directive의 종류.

- Page Directive : *JSP 컨테이너*에서 필요한 *JSP 페이지*의 종속 속성들을 정의하는데 사용됨.
- Include Directive : *JSP 페이지* 내부에 또 다른 *JSP 페이지* 를 포함시키기 위해 사용.
- Taglib Directive : *JSP 페이지*에서 사용할 *태그 라이브러리*를 지정.

### 1.3. Directive의 기술 스펙

- *JSP* 기술 스펙 ([JSR-245](https://jcp.org/en/jsr/detail?id=245))에 기술.
- 현재는 Java EE 8의 JSP 2.3버전이 최신이다.\[[Jakarta EE](/java/java%20ee/jakarta%20ee/2022/10/04/jakarta-ee-intro.html)\]

## 2. Page Directive

*JSP Page*의 종속 속성들을 정의하고 *JSP 컨테이너*에 전달하는 역할을 함.

### 2.1. Page Directive 문법

```jsp
<%@ page page_directive_attr_list %>
```
```ebnf
page_directive_attr_list ::=
{ language="scriptingLanguage"}
{ extends="className" }
{ import="importList" }
{ session="true|false" }
{ buffer="none|sizekb" }
{ autoFlush="true|false" }
{ isThreadSafe="true|false" }
{ info="info_text" }
{ errorPage="error_url" }
{ isErrorPage="true|false" }
{ contentType="ctinfo" }
{ pageEncoding="peinfo" }
{ isELIgnored="true|false" }
```
#### 2.1.1. language

- *스크립트릿*, *표현식*, *선언*에서 사용하는 *스크립트 언어*를 정의.

   > Defines the scripting language to be used in the scriptlets,
   expression scriptlets, and declarations within the body of the
   translation unit (the JSP page and any files included using
   the include directive below). [JSP 2.3 spec]<https://download.oracle.com/otn-pub/jcp/jsp-2_3-mrel2-eval-spec/JSP2.3MR.pdf?AuthParam=1665297664_104314cb18582a6cd77a1b8481296130>

- Default는 *java*다.

   > Default is java. [JSP 2.3 spec]<https://download.oracle.com/otn-pub/jcp/jsp-2_3-mrel2-eval-spec/JSP2.3MR.pdf?AuthParam=1665297664_104314cb18582a6cd77a1b8481296130>

- *비 Java언어*를 설정하면 *fatal translation error*발생.

   > It is a fatal translation error for a directive with a non-java
language attribute to appear after the first scripting element
has been encountered. [JSP 2.3 spec]<https://download.oracle.com/otn-pub/jcp/jsp-2_3-mrel2-eval-spec/JSP2.3MR.pdf?AuthParam=1665297664_104314cb18582a6cd77a1b8481296130>

## 3. Include Directive
## 4. TagLib Directive
