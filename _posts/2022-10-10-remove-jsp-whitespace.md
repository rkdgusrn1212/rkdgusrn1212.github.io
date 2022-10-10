---
layout: post
title: "trimDirectiveWhitespaces 설정을 통한 JSP Page 응답 소스의 최상단 공백 제거"
date: 2022-10-10 23:28:00 +0900
categories: ["Java","Java EE", "Directive", "Page Directive","trimDirectiveWhitespaces"]
---

## 1. JSP Page 응답 소스의 최상단에 공백이 발생하는 이유.

*디렉티브*들은 *서블릿*으로 변환될 때 서블릿으로 하여금 해당 위치에 공백을 발생 시킴.

## 2. Page Directive의 trimDirectiveWhitespaces 속성.

   [Page Directive](https://rkdgusrn1212.github.io/java/java%20ee/directive/page%20directive/2022/10/10/page-directive-intro.html)의 [trimDirectiveWhitespaces](/java/java%20ee/directive/page%20directive/2022/10/10/page-directive-intro.html#215-trimdirectivewhitespaces-attribute) 속성은 해당 *JSP Page*의 응답에서 공백으로만 이루어진 *템플릿 택스트*들을 제거한다. 이는 페이지 최상단의 *디렉티브*들이 만들어낸 공백 *템플릿 택스트*들을 제거하여 최상단의 공백을 제거하는데 효과적이다. 다만, *페이지*에 존재하는 모든 공백 *템플릿 텍스트*가 응답에서 제거되어 원하지 않은 출력 결과가 나올 수 있기에 사용에 유의해야 함.

## 3. trimDirectiveWhitespaces 속성 값에 따른 응답 html 파일 비교.

### 3.1. trimDirectiveWhitespaces가 false인 경우.

속성값으로 *false*를 명시 혹은 *기본값*인 사용.

```jsp
<%@ page trimDirectiveWhitespaces="false"%/>
```

- JSP 소스파일

   ```jsp
	<%@ page language="java"%>
	<%@ page contentType="text/html; charset=EUC-KR"%>
	<%@ page pageEncoding="EUC-KR"%>
	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="EUC-KR">
	<title>trimDirectiveWhitespaces가 참인 경우</title>
	</head>
	<body>
		<h1>trimDirectiveWhitespaces가 true입니다.</h1>
	</body>
	</html>
	```

- 응답 HTML 소스

	```



	<!DOCTYPE html>
   <html>
	<head>
	<meta charset="EUC-KR">
	<title>trimDirectiveWhitespaces가 참인 경우</title>
	</head>
	<body>
	<h1>trimDirectiveWhitespaces가 true입니다.</h1>
	</body>
	</html>
	```

### 3.2. trimDirectiveWhitespaces가 true인 경우.

속성값으로 *true*를 명시.

```jsp
<%@ page trimDirectiveWhitespaces="false"%/>
```

- JSP 소스파일

	```jsp
	<%@ page language="java"%>
	<%@ page contentType="text/html; charset=EUC-KR"%>
	<%@ page pageEncoding="EUC-KR"%>
	<%@ page trimDirectiveWhitespaces="true" %>
	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="EUC-KR">
	<title>trimDirectiveWhitespaces가 참인 경우</title>
	</head>
	<body>
		<h1>trimDirectiveWhitespaces가 true입니다.</h1>
	</body>
	</html>
	```

- 응답 HTML 소스

	```html		
	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="EUC-KR">
	<title>trimDirectiveWhitespaces가 참인 경우</title>
	</head>
	<body>
		<h1>trimDirectiveWhitespaces가 true입니다.</h1>
	</body>
	</html>
	```
