---
layout: post
title: "Jakarta EE 개요"
date: 2022-10-04 18:12:00 +0900
categories: ["Java","Java EE","Jakarta EE"]
---

## 1. Jakarta EE, Java EE의 새 이름

*Jakarta EE*는 *Java EE*가 이클립스 재단으로 이관되면서 붙여진 새 이름이다. *Java EE*로 불리기 이전에는 *J2EE*로 불리던 때도 있었다.

## 2. Jakarta EE의 이름 변천사.

- 1999년 *썬 마이크로시스템즈*에서 *J2EE*명으로 발표.
- 2006년 *Java EE 5*부터 *Java EE*로 개칭.
- 2010년 *오라클*의 *썬 마이크로시스템즈* 인수.
- 2013년 *오라클*, 인수 후 첫 버전인 *Java EE 7* 발표.
- 2017년 *오라클*, *Java EE 8* 발표 후 *Java EE*를 *이클립스 재단*에 이관.
- 2019년 *이클립스 재단*, *Java EE 8*과 완벽 호환되는 *Jakarta EE 8* 발표.
- 2020년 *이클립스 재단*, *Jakarta EE 9* 발표, 패키지명을  ```javax.```에서 ```jakarta.```으로 변경.

## 3. 왜 이클립스 재단은 이름을 변경해야 했을까?

*오라클*은 *Java EE*를 *이클립스 재단*에 이관했지만 여전히 *Java*에 대한 상표권을 소유하고 있어 *이클립스 재단*측은 *Java*가 포함된 이름을 전부 *Jakarta*바꾸고 이 후에는 ```javax.``` 네임스페이스도 비슷한 느낌의 ```jakarta.``` 로 변경할 수 밖에 없었다.

## 4. Jakarta EE만의 차별점.

- *Jakarta EE*는 *Java EE*의 오픈소스 버전.
- *이클립스 재단*에 이관되면서 모든 Java EE에 포함된 각종 사양과 기술의 이름을 변경 *Jakarta*로 변경
- *이클립스 재단*은 Jakarta EE를 *EE4J*라는 프로젝트로 관리한다.
- *Java EE*는 *JCP(자바 커뮤니티 프로세스)* 를 통해 기술 표준화를 수행한것에 반해 *Jakarta EE*는 *JESP*라는 보다 중립적인 정책을 따르게 되었다.
- *Jakarta EE 8*만 *Java EE 8*와 완벽히 호환되며 *Jakarta EE 9* 이후 버전부터는 ```javax.``` 네임스페이스를 ```jakarta.```로 변경함에 따라 호환이 되지 않는다.
