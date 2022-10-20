---
layout: post
title:  "가장 빠르게 정수 입력 스트림 읽는법"
date:   2022-10-20 11:04:00 +0900
categories:
---

## 1. 빠른 정수 입력 스트림 읽기의 필요성

백준 알고리즘 문제를 풀다보면 **정수로 구성된 일련의 데이터**를 받아서 처리해야할 때가 있다. 백준은 입력과 출력 시간도 알고리즘 수행시간에 포함되다 보니 입, 출력 시간 절약이 아주 중요하다. 사람들이 입력 스트림을 읽는 방법은 크게 **4 가지**이다.

- **Scanner** 사용
- **BufferedReader** 사용
- **사칙연산**을 사용하는 **커스텀 메소드** 사용
- **비트연산**을 사용하는 **커스텀 메소드** 사용

이중 가장 빠른 것은 **사칙 연산**을 사용하는 **커스텀 메소드**이다.

- 각 방법을 빠른 순으로 나열하면

  1. **사칙연산 사용 커스텀 메소드**

  2. **비트연산 사용 커스텀 메소드**

  3. **BufferedReader**

  4. **Scanner**

- **커스텀 메소드**들의 성능은 거의 같다.

- **BufferedReader**는 **커스텀 메소드**의 두배정도 걸린다.

- **Scanner**는 **BufferedReader**의 두 배이상 걸린다.

- [테스트 수행 결과](#)

## 2. 각 방법의 코드 및 사용법

## 2.1. Scanner

- 클래스 임포트

```java
import java.util.Scanner;
```

- 객체 생성 및 정수 입력 스트림 읽기

```java
Scanner sc = new Scanner(System.in);
//생략
sc.nextInt()
//생략
sc.close();
```

## 2.2. BufferedReader

- 클래스 임포트

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
```

- 객체 생성 및 정수 입력 스트림 읽기

```java
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
//생략
    //한줄에 여러개의 입력 정수가 공백 하나를 기준으로 나뉘어서 들어올때
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
    Integer.parseInt(st.nextToken());
    //입력이 한줄에 하나씩일때
    Integer.parseInt(br.readLine());
//생략
sc.close();
```

## 2.3. 사칙연산을 이용하는 커스텀 메소드

- 메소드 선언

```java
static int readInt() throws IOException {
  int sum = 0;
	boolean isNegative = false;
	while (true) {
    int input = System.in.read();
		if (input == '\n' || input == ' ')
			return isNegative ? sum * -1 : sum;
		else if (input == '-')
			isNegative = true;
		else
			sum = (sum * 10) + input - '0';
	}
}
```

- 정수 입력 스트림 읽기

```java
readInt();
```

## 2.4 비트연산을 이용하는 커스텀 메소드

- 메소드 선언

```java
private static int readInt() throws Exception {
  int c, n = System.in.read() & 15;
  boolean isNegative = n == 13;
  if (isNegative) n = System.in.read() & 15;
  while ((c = System.in.read()) > 32) n = (n << 3) + (n << 1) + (c & 15);
  return isNegative ? ~n + 1 : n;
}
```

- 정수 입력 스트림 읽기

```java
readInt();
```


## 3. 각 방법별 성능 테스트.

**JDK 11**에서 공백으로 구분한 10000개의 정수입력을 읽는 테스트 3번씩 수행한 결과

- **사칙연산 사용 커스텀 메소드**는 4ms, 5ms, 5ms.
- **비트연산 사용 커스텀 메소드**는 5ms, 5ms, 5ms.
- **BufferedReader**는 11ms, 11ms, 10ms.
- **Scanner**는 31ms, 30ms, 29ms


## 3.1. 테스트 코드 작성

- **Scanner** 사용

```java
import java.io.IOException;
import java.util.Scanner;
public class Main {

	public static void main(String[] args) throws Exception {
		Scanner sc = new Scanner(System.in);
		System.out.println("시작");
		long startTime = System.currentTimeMillis();
		for(int i=0 ;i<10000; i++) {
			sc.nextInt();
		}
		long endTime = System.currentTimeMillis();
		System.out.println(endTime-startTime);
		sc.close();
	}
}
```

- **BufferedReader** 사용

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
public class Main {

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		Thread.sleep(3000);//3초안에 입력 붙여넣기
		System.out.println("시작");
		long startTime = System.currentTimeMillis();
		for(int i=0 ;i<1000; i++) {
			StringTokenizer st = new StringTokenizer(br.readLine(), " ");
			for(int j=0; j<10; j++) {
				Integer.parseInt(st.nextToken());
			}
		}
		long endTime = System.currentTimeMillis();
		System.out.println(endTime-startTime);
    br.close();
	}
}
```

- **사칙연산 사용 커스텀 메소드**사용

```java
import java.io.IOException;
public class Main {

	public static void main(String[] args) throws Exception {
		Thread.sleep(3000);//3초안에 입력 붙여넣기
		System.out.println("시작");
		long startTime = System.currentTimeMillis();
		for(int i=0 ;i<10000; i++) {
			readInt();
		}
		long endTime = System.currentTimeMillis();
		System.out.println(endTime-startTime);
	}
	static int readInt() throws IOException {
		int sum = 0;
		boolean isNegative = false;
		while (true) {
			int input = System.in.read();
			if (input == '\n' || input == ' ')
				return isNegative ? sum * -1 : sum;
			else if (input == '-')
				isNegative = true;
			else
				sum = (sum * 10) + input - '0';
		}
	}
}
```

- **비트연산 사용 커스텀 메소드**사용

```java
public class Main {

	public static void main(String[] args) throws Exception {
		Thread.sleep(3000);//3초안에 입력 붙여넣기
		System.out.println("시작");
		long startTime = System.currentTimeMillis();
		for(int i=0 ;i<10000; i++) {
			readInt();
		}
		long endTime = System.currentTimeMillis();
		System.out.println(endTime-startTime);
	}
	private static int readInt() throws Exception {
		int c, n = System.in.read() & 15;
		boolean isNegative = n == 13;
		if (isNegative) n = System.in.read() & 15;
		while ((c = System.in.read()) > 32) n = (n << 3) + (n << 1) + (c & 15);
		return isNegative ? ~n + 1 : n;
	}
}
```

## 3.2. 테스트 데이터 준비

 테스트 입력 데이터 준비, 및 복사해놓기. 한줄에 1~10쓰고 1000번 반복한 전체 데이터를 복사.

```
1 2 3 4 5 6 7 8 9 10
1 2 3 4 5 6 7 8 9 10
...
1 2 3 4 5 6 7 8 9 10
```

## 3.3 테스트 프로그램 실행 및 데이터 붙여넣기

3초간의 sleep시간안에 입력 스트림에 복사해둔 10000개의 숫자 데이터를 붙여넣기 후 enter, 프로그램은 3초의 sleep이 끝난후 startTime에 타임스템프를 찍고 스트림을 읽기 시작한다.

```
...
1 2 3 4 5 6 7 8 9 10
1 2 3 4 5 6 7 8 9 10
1 2 3 4 5 6 7 8 9 10
시작
5
```
