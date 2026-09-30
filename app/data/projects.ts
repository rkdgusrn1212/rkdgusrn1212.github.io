// 대표 프로젝트의 원천 데이터. 홈 카드와 상세 페이지가 함께 쓴다.
// 사실은 각 README, 오목판 저장소·Play 공개 페이지, 이력 요약에서만 가져온다.
// - 오목판 웹 체험판은 광고가 있는 블로그 글로만 연결한다 (웹 앱을 임베드하거나 직접 링크하지 않는다).
// - 현 회사명은 일반화하므로 양성과정·멘토링 설명에도 회사명을 쓰지 않는다.

export type Link = { label: string; href: string; tone?: "solid" | "outline" };

export type Project = {
  slug: string;
  title: string;
  /** 카드·상세 머리의 분류 */
  kind: string;
  /** 카드에 보이는 한 줄 이력 */
  meta: string;
  summary: string;
  /** 카드의 기술 칩 */
  tags: string[];
  /** 카드의 설계 한 줄 */
  note: string;
  /** 상세 페이지의 사실 표 */
  facts: [string, string][];
  /** 상세 페이지의 "한 일" */
  points: string[];
  links: Link[];
};

export const BLOG_GOMOKU_POST = "https://khgkjg12.blogspot.com/2026/09/blog-post.html";
export const PLAY_GOMOKU = "https://play.google.com/store/apps/details?id=com.khgkjg12.gomoku";

export const gomokuWeb = {
  released: "2026.09",
  // 웹 체험판은 오프라인 모드만 있다 (온라인 대전은 Android 앱에만)
  modes: ["인공지능 대전", "2인 대전"],
  stack: ["React 18", "TypeScript", "Vite", "Fabric.js", "Cloudflare Workers"],
  link: { label: "블로그에서 체험하기", href: BLOG_GOMOKU_POST, tone: "outline" } satisfies Link,
};

export const projects: Project[] = [
  {
    slug: "gomoku",
    title: "오목판",
    kind: "Android 게임 · 1인 개발",
    meta: "2018.09 출시 · 2026.09 4.0 리뉴얼 · 누적 다운로드 10만+",
    summary: "혼자, 또는 친구와 두는 2인용 오목 게임. 인공지능 대전, 한 화면 2인 대전, 블루투스 대전, 온라인 대전을 지원합니다.",
    tags: ["Java", "Spring Boot", "WebSocket · STOMP", "Bluetooth RFCOMM", "AWS 서버리스"],
    note: "3.0의 온라인 대전은 AWS 서버리스로, 4.0에서는 Spring Boot 서버로 다시 만들었습니다. 판정·AI는 공용 라이브러리로 분리해 앱·서버·웹이 같은 규칙을 씁니다.",
    facts: [
      ["연혁", "2018.09 출시 · 2019.07 3.0 · 2026.09 4.0 리뉴얼"],
      ["역할", "1인 개발 (기획 · 개발 · 배포)"],
      ["규모", "Google Play 누적 다운로드 10만+"],
    ],
    points: [
      "인공지능 대전은 칸마다 공격·수비 점수를 매기는 점수판(휴리스틱) 방식으로 만들었습니다.",
      "판정과 AI를 공용 라이브러리로 분리해 Android 앱, 서버, 웹 체험판이 같은 규칙(고모쿠 룰, 오목 룰 33 금수·장목)을 씁니다.",
      "판 렌더링은 직접 만든 오픈소스 Graphic2D(SurfaceView 기반)를 씁니다.",
      "블루투스 대전은 Bluetooth Classic(RFCOMM)으로 주변 기기를 자동 탐색해 연결합니다.",
    ],
    links: [{ label: "Google Play", href: PLAY_GOMOKU, tone: "solid" }],
  },
  {
    slug: "lis",
    title: "진단검사 시스템 (LIS)",
    kind: "웹 시스템 · 양성과정 최종 프로젝트 · 팀 강호신",
    meta: "2022.12 – 2023.02 · 9주 · 3인 팀 팀장 · 메인 기획/설계 · 메인 개발",
    summary: "병원 진단검사 시스템을 3인 팀 팀장으로 설계했습니다. 환자 무인 접수부터 의사의 처방 오더까지 직접 개발하고, 채혈·검사 파트와 테이블을 통합했습니다.",
    tags: ["Spring Boot", "Spring Security · JWT", "MyBatis", "MariaDB", "React · RTK Query"],
    note: "무인 접수, 진료·처방, 계정·인증 파트를 설계·개발하고, 테이블 설계와 통합, 공통 개발환경 구성을 맡았습니다.",
    facts: [
      ["기간", "2022.12 – 2023.02 (9주)"],
      ["역할", "팀장 · 메인 기획/설계 · 메인 개발 (3인 팀)"],
      ["기여", "팀 커밋과 최종 코드의 대부분을 직접 작성"],
      ["배경", "KOSA 양성과정 최종 프로젝트 · 헬스케어 솔루션 현업 멘토링"],
      ["수상", "양성과정 수료식 우수인재상 (2023.02)"],
      ["스택", "Spring Boot 2.7 · Spring Security + JWT · MyBatis · MariaDB · React 18 · MUI · Redux Toolkit · AWS EC2"],
    ],
    points: [
      "무인 접수(환자 등록, 방문·예약 접수), 진료·처방, 계정·인증 파트를 설계하고 개발했습니다.",
      "전체 ERD 초안과 명명 규칙을 잡고, 파트별 스키마를 병합한 뒤 반정규화했습니다.",
      "공통 개발환경(ESLint·Prettier·TypeScript 설정, PR 단위 작업, Branch Protection과 Code Owner로 교차 리뷰)을 직접 구성해 팀에 배포했습니다.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/rkdgusrn1212/laboratory_information_system-portfolio", tone: "solid" }],
  },
];

export const getProject = (slug: string) => {
  const p = projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`알 수 없는 프로젝트: ${slug}`);
  return p;
};
