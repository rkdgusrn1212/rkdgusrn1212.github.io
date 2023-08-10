avoidjekyllparse---
title: Spring Web MVC Controller 구현
date: 2022-10-11T02:04:00.000Z
tags:
  - spring
  - spring framework
  - web mvc framework
---

## 1. Controller

사용자 입력을 해석하고 뷰를 통해 사용자에게 출력되어지는 모델로 변환해준다.

## 2. 컨트롤러 작성법.

### 2.1. Annotaion 기반 프로그래밍 모델

- *Spring 2.5*부터 등장.
- \*RequestMapping

###

## 1. \@Controller annotation 사용

해당 클래스위에 _\@Controller_ Annotaion을 선언한다.

## 2. Annotation 안쓰고 Controller 선언하는 법

해당 Controller 클래스가 _org.springframework.web.servlet.mvc.Controller_ 인터페이스를 구현하면 된다.

## 3. ModelAndView 페이지 리턴 메소드

- ModelAndView 객체 생성
- addObject()로 전달할 객체 추가.
- setViewName()으로 전달될 view 지정.
