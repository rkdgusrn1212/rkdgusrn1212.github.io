avoidjekyllparse---
title: Jakarta EE 개요
date: 2022-10-04T09:12:00.000Z
tags:
  - Java
  - Java EE
  - Jakarta EE
---

## 1. Jakarta EE, Java EE의 새 이름

*Jakarta EE*는 *Java EE*가 이클립스 재단으로 이관되면서 붙여진 새 이름이다. *Java EE*로 불리기 이전에는 *J2EE*로 불리던 때도 있었다.

## 2. Jakarta EE의 이름 변천사.

- 1999년: *썬 마이크로시스템즈*에서 *J2EE*명으로 발표.
- 2006년: *Java EE 5*부터 *Java EE*로 개칭.
- 2010년: *오라클*의 _썬 마이크로시스템즈_ 인수.
- 2013년: _오라클_, 인수 후 첫 버전인 _Java EE 7_ 발표.
- 2017년: _오라클_, _Java EE 8_ 발표 후 *Java EE*를 *이클립스 재단*에 이관. *이클립스 재단*의 *EE4J*라는 프로젝트로 기존 *Java EE 8*의 기술들을 이식하고 오픈소스로 관리하기 시작.<https://projects.eclipse.org/projects/ee4j>
- 2018년: _이클립스 재단_, 설문을 통해 플렛폼의 새 이름과 기술명을 *Jakarta*로 결정.
- 2019년: _이클립스 재단_, *Java EE 8*과 완벽 호환되는 _Jakarta EE 8_ 발표.
- 2020년: _이클립스 재단_, _Jakarta EE 9_ 발표, API 네임스페이스를 `javax.`에서 `jakarta.`으로 변경.

## 3. 왜 이클립스 재단은 이름을 변경해야 했을까?

*오라클*은 *Java EE*를 *이클립스 재단*에 이관했지만 여전히 *Java*에 대한 상표권을 소유하고 있어 *이클립스 재단*측은 *Java*라는 이름을 가지고 새로운 기술을 발표할 수가없었다. 따라서, 투표를 통해 새 이름을 지정(2019), 새 플랫폼과 기술 이름을 *Jakarta*로 변경하기로 결정하고 새 기술이 등장하는 *Jakarta EE 9*부터는 `javax.` 네임스페이스를 비슷한 느낌의 `jakarta.` 로 변경할 수 밖에 없었다.

## 4. Jakarta EE만의 차별점.

- *Jakarta EE*는 *Java EE*의 오픈소스 버전.
- *이클립스 재단*에 이관되면서 모든 Java 네임스페이스가 *Jakarta*로 변경
- *Java EE*는 _JCP(자바 커뮤니티 프로세스)_ 를 통해 기술 표준화를 수행한것에 반해 *Jakarta EE*는 *JESP*라는 보다 개방적이고 중립적인 정책을 따르게 되었다.
- *Java EE 8*과 완벽 호환되는 *Jakarta 8*은 오로지 기술 이름만 *Jakarta*로 바뀌거나 비슷한 이름으로 변경.
- _Jakarta EE 9_ 버전부터는 API의 네임스페이스 마저 `javax.`에서 `jakarta.`로 변경, 새로운 기술 추가.
