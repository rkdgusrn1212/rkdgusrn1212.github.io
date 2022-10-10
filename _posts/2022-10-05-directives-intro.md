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

- *JSP Page*의 종속 속성들을 정의하고 *JSP 컨테이너*에 전달하는 역할을 함.

- *jsp 기본 템플릿*에 포함. *필수적*이다.

```jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
```

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

#### 2.1.1. language attribute

```jsp
<%@ page language="java"%>
```

- 필수적으로 정의하는 속성.

- *스크립트릿*, *표현식*, *선언*에서 사용하는 *스크립트 언어*를 정의.

   > Defines the scripting language to be used in the scriptlets,
   expression scriptlets, and declarations within the body of the
   translation unit (the JSP page and any files included using
   the include directive below). [JSR-245](https://jcp.org/en/jsr/detail?id=245)

- 기본값는 *java*다. 그러나 관습적으로 명시.
- *비 Java언어*를 설정하면 *fatal translation error*발생.

   > It is a fatal translation error for a directive with a non-java
language attribute to appear after the first scripting element
has been encountered. [JSR-245](https://jcp.org/en/jsr/detail?id=245)

- 아직까지 *Java*이외의 *Java*계열 언어에 대한 지원을 하는 *JSP 컨테이너*는 없음. __사실상 값은 *java*로 고정__.

#### 2.1.2. extends attribute

- 값으로는 패키지 경로를 포함한 클래스 이름(*Fully Qualified Class Name*)을 사용.
- *JSP page*를 *Servlet 소스파일*로 변환할 때, *Servlet 클래스*가 상속받을 *SuperClass*를 지정.
- 기본적으로 *JSP 컨테이너*가 명시가 없다면 자신의 기본 *javax.servlet.Servlet* 구현 클래스를 상속하게 함.
   + *JSP 컨테이너*별로 상속해야할 구현이 다름.
   + *Tomcat*은 *org.apache.jasper.runtime.HttpJspBase*를 상속 시킨다.
- *JSP 컨테이너*가 요구하는 클래스의 *SubClass*를 상속해야만 한다.
   + Tomcat의 경 *org.apache.jasper.runtime.HttpJspBase*를 상속한 클래스여야 한다.

#### 2.1.3. import attribute

```jsp
<%@ page import="com.khgkjg12.do.*" %>
```

- *JSP page*의 *스크립팅 환경*에서 사용가능한 *Type*들을 명시한다.
   + *스크립팅 환경*은 *스크립트 언어*를 사용하는 영역을 말한다.
   + *Type*은 *Java Class*를 말함.
- *Type*은 *Fully Qualified Class Name*으로 명시.
   + *aster*를 사용, *와일드카드*로 패키지내 모든 클래스 *import* 가능.
- *Java 소스*의 *import*와 같다.

#### 2.1.4. session attribute

```jsp
<%@ page session="false" %>
```

- 기본값은 *true*다.
- *false*일경우 session 내장 객체를 사용 할 수 없다.

#### 2.1.4. buffer attribute

- *JspWriter*의 출력 버퍼 사이즈를 지정.
- *none*인 경우 버퍼를 안씀.
- 기본값은 *8kb*이상의 구현값을 가진다.

## 4. TagLib Directive
