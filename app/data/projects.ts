// 프로젝트 소개의 원천 데이터. 사실은 각 README와 Google Play 정보에서만 가져온다.
// 오목판 웹 체험판은 광고가 있는 블로그 글로만 연결한다(웹 앱 주소로 직접 링크·임베드하지 않는다).

export type Link = { label: string; href: string; tone?: "primary" | "accent" };

export type Project = {
  slug: string;
  title: string;
  kind: string;
  /** 홈의 기보 표기: 몇 번째 수, 판 위 좌표 */
  move: { n: number; coord: string };
  period: string;
  role?: string;
  context?: string;
  stack: string[];
  summary: string;
  points: string[];
  links: Link[];
};

export const BLOG_GOMOKU_POST = "https://khgkjg12.blogspot.com/2026/09/blog-post.html";
export const PLAY_GOMOKU = "https://play.google.com/store/apps/details?id=com.khgkjg12.gomoku";

export const gomokuWeb = {
  released: "2026.09",
  modes: ["인공지능 대전", "2인 대전", "온라인 대전"],
  link: { label: "블로그에서 체험하기", href: BLOG_GOMOKU_POST, tone: "accent" } satisfies Link,
};

export const projects: Project[] = [
  {
    slug: "gomoku",
    title: "오목판",
    kind: "Android 게임 · 웹 체험판",
    move: { n: 1, coord: "H8" },
    period: "출시 후 8년째 운영",
    stack: [],
    summary:
      "혼자, 또는 친구와 두는 2인용 오목 게임. 인공지능 대전, 한 화면 2인 대전, 블루투스 대전, 온라인 대전까지 네 가지 방식으로 둔다.",
    points: ["Google Play 누적 다운로드 10만+"],
    links: [{ label: "Google Play에서 보기", href: PLAY_GOMOKU, tone: "primary" }],
  },
  {
    slug: "sanghai-twist",
    title: "상하의 트위스트",
    kind: "웹 앱 · 팀 프로젝트",
    move: { n: 2, coord: "I9" },
    period: "2022.12.06 – 12.16 (10일)",
    role: "팀장 · 4인 팀",
    context: "KOSA · 더존 미니 프로젝트 3",
    stack: ["React", "REST 프록시 서버", "11번가 Open API"],
    summary:
      "쇼핑몰의 상의와 하의를 한눈에 맞춰보고, 더 잘 어울리는 조합을 골라 살 수 있게 돕는 쇼핑 앱.",
    points: [
      "API 키를 브라우저에 배포하지 않으려고, 키를 가진 별도 REST 서버가 11번가 Open API를 대신 호출하게 설계했다.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/rkdgusrn1212/sanghai_twist", tone: "primary" }],
  },
  {
    slug: "lis",
    title: "강호신 LIS",
    kind: "웹 시스템 · 팀 프로젝트",
    move: { n: 3, coord: "J10" },
    period: "15주 · 더존 과정 파이널 프로젝트",
    role: "팀장 · 메인 기획/설계 · 메인 개발",
    context: "더존 헬스케어솔루션사업본부 멘토링",
    stack: ["React 18", "MUI", "Redux Toolkit", "Spring Boot 2.7", "MyBatis", "MariaDB"],
    summary:
      "환자 접수부터 검사 결과 입력까지, 병원 진단검사 업무를 기록하고 관리하는 웹 시스템.",
    points: [
      "멘토링으로 실제 LIS 업무 흐름을 반영했다.",
      "무인 접수, 진료·처방, 인사·인증 파트를 설계하고 개발했다.",
      "공통 개발환경을 직접 구성해 팀에 배포했다.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/rkdgusrn1212/laboratory_information_system-portfolio",
        tone: "primary",
      },
    ],
  },
];

export const getProject = (slug: string) => {
  const p = projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`알 수 없는 프로젝트: ${slug}`);
  return p;
};
