# rkdgusrn1212.github.io

강현구의 인터랙티브 포트폴리오. React Router 8 프레임워크 모드로, 서버 없이(`ssr: false`) 빌드 시점에 모든 페이지를 HTML로 만들어 GitHub Pages에 올린다.

## 작업

```bash
npm ci          # 의존성 설치 (버전 고정)
npm run dev     # 로컬 개발 서버
npm run build   # build/client 생성 (+ 404.html)
npm run smoke   # 배포된 사이트 점검 (주소 인자로 로컬도 가능)
```

배포는 `main`에 push하면 GitHub Actions가 빌드 → 배포 → 점검까지 한다. 빌드 산출물은 커밋하지 않는다.

## 구조

- `app/data/profile.ts`: 분야별 기술(실무/학습), 소개 수치, 경력, 연혁
- `app/data/evidence.ts`: 기술 지도의 근거 (경력은 설명만, 나머지는 공개 자료 링크)
- `app/data/projects.ts`: 개인·교육 프로젝트 (홈 카드와 상세 페이지가 함께 씀)
- `app/data/cases.ts`: 현업 사례 (홈 경력의 "사례 보기"와 `/work/<slug>/`가 함께 씀)
- `app/components/toys/`: 프로젝트 체험 (오목판 실제 화면, LIS 환자 접수 흐름)
- `app/components/cases/`: 현업 사례 체험. 가상 데이터로 만든 개념 예시 (결과 입력과 이력, 클렌징 단계, 집계 단위)
- `app/routes/projects/<slug>/`: 상세 페이지. 그 페이지의 이미지·영상은 같은 폴더에 두고 `import`한다
- `app/routes/legacy-post.tsx`: 옛 블로그 주소 `/posts/0~29` → Blogger 이동 (`app/data/blogger-map.json`)
- `scripts/postbuild.mjs`: `__spa-fallback.html`을 GitHub Pages용 `404.html`로 복사 (유일한 우회책)
- `scripts/smoke.mjs`: 배포 후 전 페이지 200, 제목 중복, 옛 주소 이동, 404 점검

## 원칙

- 오목판 웹 체험판은 광고가 있는 블로그 글로만 연결한다. 웹 앱을 임베드하거나 직접 링크하지 않고, 둘 수 있는 판도 만들지 않는다.
- 버전은 고정한다. Node 24(`.nvmrc`), 러너 `ubuntu-24.04`, 의존성은 정확한 버전.
- 공개 원칙: 현 회사명은 "ERP 기업"으로 일반화, 병원명·현업 소스·화면 비공개, 업무 단위 성과 수치는 머리에 두지 않는다. 현업 사례는 지원서에 쓴 수준까지만, 개념도와 가상 데이터로 보여 준다 (테이블·API 이름, 장애 상세, 보안 점검 항목 제외).
- 스타일은 옛 9LOG 블로그 팔레트(초록·분홍·아몬드·주황)를 잇는다.

옛 블로그(CRA + react-snap) 코드와 md 글 원본은 git 히스토리에 남아 있다. 글은 [9 Log](https://khgkjg12.blogspot.com)로 옮겼다.
