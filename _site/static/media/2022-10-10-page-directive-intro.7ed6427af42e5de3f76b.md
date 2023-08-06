avoidjekyllparse---
layout: post
title: "Page Directive 개요"
date: 2022-10-10 16:35:00 +0900
categories: ["Java","Java EE", "Directive", "Page Directive"]
---

## 1. Page Directive

- *JSP Page*의 종속 속성들을 정의하고 *JSP 컨테이너*에 전달하는 역할을 함.

- *jsp 기본 템플릿*에 포함. *필수적*이다.

```jsp
<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
```

## 2. Page Directive 문법

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

### 2.1. language attribute

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

### 2.2. extends attribute

- 값으로는 패키지 경로를 포함한 클래스 이름(*Fully Qualified Class Name*)을 사용.
- *JSP page*를 *Servlet 소스파일*로 변환할 때, *Servlet 클래스*가 상속받을 *SuperClass*를 지정.
- 기본적으로 *JSP 컨테이너*가 명시가 없다면 자신의 기본 *javax.servlet.Servlet* 구현 클래스를 상속하게 함.
   + *JSP 컨테이너*별로 상속해야할 구현이 다름.
   + *Tomcat*은 *org.apache.jasper.runtime.HttpJspBase*를 상속 시킨다.
- *JSP 컨테이너*가 요구하는 클래스의 *SubClass*를 상속해야만 한다.
   + Tomcat의 경 *org.apache.jasper.runtime.HttpJspBase*를 상속한 클래스여야 한다.

### 2.3. import attribute

```jsp
<%@ page import="com.khgkjg12.do.*" %>
```

- *JSP page*의 *스크립팅 환경*에서 사용가능한 *Type*들을 명시한다.
   + *스크립팅 환경*은 *스크립트 언어*를 사용하는 영역을 말한다.
   + *Type*은 *Java Class*를 말함.
- *Type*은 *Fully Qualified Class Name*으로 명시.
   + *aster*를 사용, *와일드카드*로 패키지내 모든 클래스 *import* 가능.
- *Java 소스*의 *import*와 같다.

### 2.4. session attribute

```jsp
<%@ page session="false" %>
```

- 기본값은 *true*다.
- *false*일경우 session 내장 객체를 사용 할 수 없다.

### 2.5. buffer attribute

```jsp
<%@ page buffer = "16kb" %>
```

- *JspWriter*의 출력 버퍼 사이즈를 지정.
- *none*인 경우 버퍼를 안씀.
- 대게 기본값은 *8kb*이다. *JSP 구성*에따라 기본값으로 *8kb* 이상 값을 가짐.

### 2.6. autoFlush attribute

```jsp
<%@ page autoFlush = "false" %>
```

- 버퍼가 가득 찼을 때, 자동으로 Flush 할지를 설정.
- *true*일 경우, 버퍼가 다 차면 버퍼를 플러시하고 계속해서 작업 진행.
- *false*일 경우, 버퍼가 다 차면 예외 발생 및 작업 중단.
- 기본값은 *true*.

### 2.7. isThreadSafe attribute

```jsp
<%@ page isThreadSage="false"%>
```

- *false*일 경우 *웹 컨테이너*는 다수의 요청에 대한 응답을 단일 쓰래드를 통해 순차적으로 동기화 수행.
- *true*일 경우 *웹 컨테이너*는 다중 쓰래드를 통해 다수의 요청을 동시에 비동기 수행.
- 기본값은 *true*

### 2.8. info attribute

```jsp
<%@ page info="This page is written by khgkjg12"%>
```

- 값으로 해당 페이지를 설명해주는 문자열을 가짐.
- 문자열 길이의 제한 없음.
- 해당 페이지를 구현한 *Servlet*에서 *Servlet.getServletInfo* method를 통해 얻을 수 있음.

   >  can subsequently be obtained from the
page’s implementation of Servlet.getServletInfo method. [JSR-245](https://jcp.org/en/jsr/detail?id=245)

### 2.9. isErrorPage attribute

```jsp
<%@ page isErrorPage="false"%>
```

- 현재 *JSP page*가 *애러 페이지*인지 여부를 설정.
- 기본값 *false*

### 2.10. isErrorPage attribute

```jsp
<%@ page errorPage="/error.jsp"%>
```

- 예외 및 *Throwable* 발생시 *포워딩*할 *애러 페이지*를 지정.
- 값으로 *URL*을 사용

### 2.11. contentType attribute

```jsp
<%@ page contentType="text/html; charset=EUC-KR"%>
```

- 필수 속성.
- 해당 *JSP page*를 구현한 *Servlet*에서 응답으로 보낼 문서의 *MIME 타입*과 *문자 인코딩(charset)*을 지정.

### 2.12. pageEncoding attribute

```jsp
<%@ page pageEncoding="EUC-KR"%>
```

- 필수 속성
- *JSP 컨테이너*가 *JSP 파일*을 *Servlet 소스*로 변환할 때 참고 할 인코딩.

### 2.13. isELIgnored attribute

```jsp
<%@ page isELIgnored="true"%>
```

- *JSP 컨테이너*가 EL 표현식을 무시할 지 여부를 지정.
- 기본값은 *web.xml* 버전에 따라 다름.
   + *Servlet 2.3* 이하 버전이 명시된 *web.xml*을 사용하는 *Web Application*에서는 *isELIgnored=true*가 기본값이다.
   + *Servlet 2.4* 이상 버전이 명시된 *web.xml*을 사용하는 *Web Application*에서는 *isELIgnored=false*가 기본값이다.

   > The default mode for JSP pages in a Web Application delivered using a
web.xml using the Servlet 2.3 or earlier format is to ignore EL expressions; this
provides for backward compatibility.
The default mode for JSP pages in a Web Application delivered using a
web.xml using the Servlet 2.4 format is to evaluate EL expressions with the ${}
syntax. Expressions using the #{} are evaluated starting with JSP 2.1. See
Section , “Backwards Compatibility with JSP 2.0” for more details on the
evaluation of #{} expressions. [JSR-245](https://jcp.org/en/jsr/detail?id=245)

   ![ELIgnored 기본값](/assets/img/el-ignore-figure.png)

   \[출처 : [JSR-245](https://jcp.org/en/jsr/detail?id=245)\]

### 2.14. deferredSyntaxAllowedAsLiteral attribute

```jsp
<%@ page deferredSyntaxAllowedAsLiteral="true"%>
```

- *\#{*을 단순한 문자열로 인식 할 것인지 여부를 지정.
- *\#{*은 EL의 지연된 평가([Deferred Evaluation](/java/java%20ee/el/2022/10/04/el-intro.html#212-deferred-evaluation)) 표현식에서 사용.
- 기본값은 *false*.

### 2.15. trimDirectiveWhitespaces attribute

```jsp
<%@ page trimDirectiveWhitespaces="true"%>
```

- *템플릿 텍스트*에서 공백을 처리할지 여부를 지정.
   + *템플릿 텍스트*는 택스트로 이루어진 *[템플릿 데이터](/java/java%20ee/jsp/2022/10/07/jsp-intro.html#2-jsp-page%EC%9D%98-%EA%B5%AC%EC%84%B1)*
- *true*일 경우 공백으로 이루어진 *템플릿 텍스트*는 출력에서 제거.
- *false*일 경우 공백으로 이루어진 *템플릿 텍스트*도 출력.
- 기본값은 *false*.
- *JSP 페이지* 응답의 해드 윗부분, 최상단에서 *디렉티브*들이 유발하는 공백을 제거하는데 효과적이다.
	+ *템플릿 텍스트를 동반하지 않는 디렉티브*들은 *JSP 페이지*의 응답에 공백을 발생시킨다.
	+ *디렉티브*들로 인한 공백은 클라이언트 브라우저에서 해당 *JSP 페이지*의 소스 보기를 통해 확인 가능.
	+ *디렉티브*가 유발한 최상단의 공백 이외에도 페이지 내의 모든 공백 *템플릿 텍스트*가 사라지므로 의도치 않는 곳의 공백이 사라지므로 사용에 유의해야 한다.
	+ 관련 게시글 : [trimDirectiveWhitespaces 설정을 통한 JSP Page 응답 소스의 최상단 공백 제거](/java/java%20ee/directive/page%20directive/trimdirectivewhitespaces/2022/10/10/remove-jsp-whitespace.html)
