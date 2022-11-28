---
layout: post
title:  "가장 빠르게 정수와 문자열 입력을 받는법"
date:   2022-10-23 16:39:00 +0900
categories:
---


이 포스팅은 [가장 빠른 정수 입력 받기](/) 포스팅의 연장이다.

## 1. 정수와 문자열 입력이 모두 존재할때 빠르게 입력받는 법

정수와 문자열이 입력으로 함께 존재하는 문제에서는 정수 입력용 커스텀 메소드를 쓰기가 까다롭다. 문자열 처리용으로 자바 입력 라이브러리를 함께 쓴다면 라이브러리와의 미묘한 처리방식 차이로 스트림에 특수문자(특히 \n나 \r)가 남아 원하지 않는 결과를 만들게 된다. 기왕 이렇게된거 문자열까지 커스텀 메소드로 작성하여 더욱 빠르게 처리하는게 좋다. 정수 입력 커스텀 메소드도 문자열 입력 커스텀 메소드가 혹시라도 남길 공백 및 개행문자를 처리하기위해 특별한 로직 필요하다.

## 2. 문자열 입력 커스텀 메소드

``` java
private static String readStr(int bufSize) throws IOException{
		byte[] bytes = new byte[bufSize];
		int i=0;
		while(true) {
			int input = System.in.read();
			if(input != '\n' && input != '\r' && input != ' ' ) {
				bytes[i++] = (byte)input;
				break;//앞 공백 제거 후 시작.
			}
		}
		while(true) {
			int input = System.in.read();
			if(input == '\n' || input == '\r' ) {
				return new String(bytes, 0, i);
			}else
				bytes[i++] = (byte)input;
		}
}
```
1. 문자열앞에 개행(운영체제별 개행방법 모두 고려)과 공백이 연속해서 존재할 경우도 고려.
2. 운영체제 또는 입력 인코딩에 따라 메소드 종료 후에 InputStream에 개행문자가 남을 가능성이 있다.
3. 2번의 이유로 연달아 쓸때 오류를 발생 시키지 않기 위해 1번 조건을 만족시키는 설계를 하게되었다.

## 3. 수정된 정수 입력 커스텀 메소드

```java
private static int readInt() throws IOException {
		int sum;
		boolean isNegative = false;
		while(true) {
			int input = System.in.read();
			if(input != '\n' && input != '\r' && input != ' ' ) {
				if (input == '-')
					isNegative = true;
				else {
					sum = input-'0';
					break;//앞 공백만 제거 후 시작. 숫자가 아닌 문자가 들어간건 안걸러줌.
				}
			}
		}
		while (true) {
			int input = System.in.read();
			if (input == '\n' || input == ' '|| input=='\r')
				return isNegative ? sum * -1 : sum;
			else
				sum = (sum * 10) + input - '0';
		}
}
```
1. 정수 입력앞에 개행(운영체제별 개행방법 모두 고려)과 공백이 연속해서 존재할 경우도 고려.
2. 1번 조건에 해당하지 않는 문자들은 모두 정수로 가정하고 처리하므로 입력에 정수앞에 공백과 개행 이외의 문자가 남아있을때는 문자열 입력 받는 커스텀 메소드로 해당 문자들을 읽어들인 후에 정수를 읽도록 해야한다.

## 4. 22년 11월 24일 추가로 개선된 버전

변경 세부사항

- try구문을 메소드 내부에 삽입하여 static에서도 선언될 수 있게 함.
- IOException 대신 Exception으로 변경하여 import 제거.
- readInt()의 분기 조건을 단순화함.

```java
private static String readStr(int bufSize){
		try {
			byte[] bytes = new byte[bufSize];
			int i=0;
			while(true) {
				int input = System.in.read();
				if(input != '\n' && input != '\r' && input != ' ' ) {
					bytes[i++] = (byte)input;
					break;//앞 공백 제거 후 시작.
				}
			}
			while(true) {
				int input = System.in.read();
				if(input == '\n' || input == '\r' ) {
					return new String(bytes, 0, i);
				}else
					bytes[i++] = (byte)input;
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
}
```

```java
private static int readInt() {
		try {
			int sum;
			boolean isNegative = false;
			while(true) {
				int input = System.in.read();
				if(input >= '0') {
					sum = input-'0';
					break;//앞 공백만 제거 후 시작. 숫자가 아닌 문자가 들어간건 안걸러줌.
				}else if(input == '-') {//-뒤에 숫자가 나올때까지의 공백은 무시함.
					isNegative = true;
				}
			}
			while (true) {
				int input = System.in.read();
				if (input < '0')
					return isNegative ? sum * -1 : sum;
				else
					sum = (sum * 10) + input - '0';
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return 0;
}
```
