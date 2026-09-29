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

- `app/data/projects.ts`: 프로젝트 소개의 원천 데이터 (README·Google Play에 있는 사실만)
- `app/routes/projects/<slug>/`: 상세 페이지. 그 페이지의 이미지·영상은 같은 폴더에 두고 `import`한다
- `app/routes/legacy-post.tsx`: 옛 블로그 주소 `/posts/0~29` → Blogger 이동 (`app/data/blogger-map.json`)
- `scripts/postbuild.mjs`: `__spa-fallback.html`을 GitHub Pages용 `404.html`로 복사 (유일한 우회책)
- `scripts/smoke.mjs`: 배포 후 전 페이지 200, 제목 중복, 옛 주소 이동, 404 점검

## 원칙

- 오목판 웹 체험판은 광고가 있는 블로그 글로만 연결한다. 웹 앱을 임베드하거나 직접 링크하지 않고, 둘 수 있는 판도 만들지 않는다.
- 버전은 고정한다. Node 24(`.nvmrc`), 러너 `ubuntu-24.04`, 의존성은 정확한 버전.

옛 블로그(CRA + react-snap) 코드와 md 글 원본은 git 히스토리에 남아 있다. 글은 [9 Log](https://khgkjg12.blogspot.com)로 옮겼다.
