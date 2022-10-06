---
layout: post
title: "JSP Access Model 개요"
date: 2022-10-06 09:08:00 +0900
categories: ["Java","Java EE", "JSP Access Model"]
---

## 1. JSP Access Model이란?

- JSP를 사용해 Java Web Application를 설계하는 2가지의 디자인 패턴이다.
- 1998년 *썬 마이크로시스템즈*에서 발표한 [*JSP 0.92* 기술 스펙](http://www.kirkdorffer.com/jspspecs/jsp092.html#model)에서 제시되었다.
- *Model 1*과 *Model 2*로 구성된다.

### 1.1 JSP Access Model이 공통적으로 가지는 특징

![Model-common 구조](/assets/img/jsp-model-common.png)

- *JSP* 파일은 처음 요청이 들어순간 어떤 *객체*로 컴파일 되어 서버 메모리에 올라감.
  + 클라이언트 브라우저, *Java Servlet*등이 *JSP*파일에 요청을 보낸다.
- 메모리상의 *객체*는 클라이언트로의 응답으로 *HTML* 파일을 보냄.
- 서버는 *JSP*파일에 변동이 있는지 확인, 변동이 있다면 메모리상의 *객체*를 새로 컴파일한 *객체*로 바꿈.

## 2. Model 1

> "요청이 *JSP* 파일로..."

![Model-1 구조](/assets/img/jsp-model-1.png)

- 클라이언트의 웹 브라우저가 직접 *JSP* 파일에 요청을 보냄.
- 동적 콘텐츠를 *JavaBeans*가 생성.
  + *JSP*파일은 클라이언트의 요청을 받아 *JavaBeans*의 동적 콘텐츠를 가져와서 표시함.
  + *JavaBean*은 *Enterprise JavaBean*또는 *DB*로부터 정보를 요청하여 동적 컨텐츠를 생성.

## 3. Model 2

> "요청이 *Java Servlet*으로..."

![Model-2 구조](/assets/img/jsp-model-2.png)

- 클라이언트의 웹 브라우저가 *Java Servlet*으로 요청을 보냄.
- 동적 콘텐츠를 *Java Servlet*이 생성.
  + *Java Servlet*은 *JDBC*를 통해 *DB*로부터 정보를 얻어서 동적 콘텐츠를 생성.
  + *Java Servlet*는 동적 콘텐츠를 *JavaBeans*로 래핑함.
  + *JSP*파일은 *JavaBean*으로부터 동적 콘텐츠를 가져와서 표시함.
