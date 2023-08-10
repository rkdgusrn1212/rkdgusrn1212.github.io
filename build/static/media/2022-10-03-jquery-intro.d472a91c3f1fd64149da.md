avoidjekyllparse---
title: JQuery 개요
date: 2022-10-03T12:00:00.000Z
tags: JQuery
---

## 1. JQuery란?

- _JavaScript_ 라이브러리
- *$*키워드를 통해 *Dom 요소*의 접근과 수정을 용이하게 한다.
- *이벤트 핸들링*을 용이하게 한다.
- *AJAX*구현 API 제공, *AJAX*통신을 용이하게 한다.

## 2. Vanilla-JS VS JQuery

### 2.1. Dom요소의 접근 비교

`#title`요소에 대한 접근

Vanilla-JS

```
document.getElementById("title");
```

JQuery

```
$("#title");
```

### 2.2. 이벤트 핸들링 비교

숨겨진 `#message`요소가 `#button`요소를 클릭했을때 보여지게 하기.

Vanilla-JS

```
var hiddenMsg = document.getElementById("message");
document.getElementById("button").onClick = function() {
  hiddenMsg.style.display='block';
};
```

JQuery

```
var hiddenMsg = $( "#message" );
$( "#button" ).on( "click", function( event ) {
  hiddenMsg.show();
});
```

### 2.3. AJAX 통신 비교

비동기로 <https://rkdgusrn1212.github.io/>에서 get 요청으로 텍스트를 받아와 `#content`요소에 넣기.

Vanilla-JS

```
var request = new XMLHttpRequest();
request.open("GET", "https://rkdgusrn1212.github.io/");
request.send();
request.onreadystatechange = function() {
  if ( request.readyState === 4 && request.status === 200 ) {
    document.getElementById("content").innerHTML = request.responseText;
  }
};
```

JQuery

```
$.ajax({
  url: "https://rkdgusrn1212.github.io/",
  method: "GET",
  dataType: "text",
  success: function(data) {
    $("#content").html(data);
  }
})
```
