// 소개·경력·연혁의 원천 데이터.
// 출처: 이력 요약(입사지원 세션), 오목판 저장소·Play 공개 페이지, 공개 저장소, Blogger, 각 README.
// 공개 원칙: 현 회사명은 일반화, 병원명·현업 소스·화면 비공개, 업무 단위 성과 수치는 머리에 두지 않는다.

export type DomainId = "be" | "fe" | "mo" | "db" | "ops" | "algo" | "ai" | "emb" | "lead";

/** 분야별 기술. work = 현업·프리랜서에서 쓴 것, learn = 교육·학부·개인 프로젝트 */
export type Domain = { id: DomainId; name: string; work: string[]; learn: string[] };

export const domains: Domain[] = [
  {
    id: "be",
    name: "백엔드",
    work: ["Java 8·17", "Spring Boot", "Spring MVC", "MyBatis", "REST API 설계 · 명세", "Redis 세션", "Apache POI", "ShedLock", "Log4j2", "NestJS → Spring 포팅"],
    learn: ["Java 21", "Spring Security", "WebSocket · STOMP", "OAuth2 Resource Server", "Hibernate Validator", "JSP · Servlet", "Node.js"],
  },
  {
    id: "fe",
    name: "프론트엔드",
    work: ["React", "TypeScript", "JavaScript", "RealGrid"],
    learn: ["Redux Toolkit", "RTK Query", "React Router", "Next.js", "Fabric.js", "MUI", "Bootstrap", "Sass", "jQuery"],
  },
  {
    id: "mo",
    name: "모바일",
    work: ["Android"],
    learn: ["SurfaceView · 커스텀 뷰", "Bluetooth RFCOMM", "Retrofit · OkHttp", "Credential Manager", "AdMob · UMP", "Material Components", "라이브러리 제작"],
  },
  {
    id: "db",
    name: "데이터베이스",
    work: ["PostgreSQL", "MariaDB", "SQL 튜닝", "인덱스 설계", "파티셔닝", "Materialized View", "DB 컨버전", "동시성 제어"],
    learn: ["Oracle", "DynamoDB", "Flyway", "ERD · 반정규화"],
  },
  {
    id: "ops",
    name: "인프라 · 배포",
    work: ["Jenkins", "Tomcat", "Linux · SSH", "Elastic APM", "개발·스테이지·운영 배포"],
    learn: ["AWS Lambda", "API Gateway", "Step Functions", "AWS EC2", "Fly.io", "Docker", "Cloudflare Workers", "GitHub Actions", "NGINX", "Apache", "Gradle", "Maven", "Webpack", "Vite"],
  },
  {
    id: "algo",
    name: "알고리즘 · 성능",
    work: ["쿼리 · 배치 성능 최적화"],
    learn: ["C++", "C", "자료구조", "멀티코어 프로그래밍", "Java 입출력 최적화", "JVM · GC"],
  },
  {
    id: "ai",
    name: "AI · 데이터",
    work: ["임상 데이터 웨어하우스", "데이터 클렌징", "가명화 처리", "Claude Code 검증 자동화", "Playwright", "LLM 연동 API 명세"],
    learn: ["Python", "머신러닝", "패턴인식", "탐색 · 강화학습", "휴리스틱 게임 AI"],
  },
  {
    id: "emb",
    name: "임베디드 · 영상처리",
    work: ["바코드 프린터 연동"],
    learn: ["Raspberry Pi", "애드혹 통신", "영상처리 · Pillow", "디지털시스템 · 컴퓨터구조"],
  },
  {
    id: "lead",
    name: "운영 · 협업",
    work: ["Git", "JIRA", "Confluence 문서 200건+", "요구사항 협의 · 공수 산정", "인수인계 문서화", "보안 점검 조치", "반복 작업 자동화"],
    learn: ["팀장 3회", "Google Play 1인 출시", "공통 개발환경 구성"],
  },
];

/** 소개의 수치 칸. 이력 전체를 대표하는 사실만 둔다 (업무 단위 성과 수치는 넣지 않는다) */
export const facts = [
  { value: "2023~", label: "의료 IT 기업 시스템 백엔드 개발 · 재직 중" },
  { value: "10만+", label: "Android 오목판 누적 다운로드 · 2018 출시, 1인 개발" },
  { value: "대상", label: "TOPCIT 정기평가 2024 · 성적우수자 재직자 부문" },
];

export type Job = {
  org: string;
  period: string;
  works: { title: string; period?: string; summary: string; bullets: string[] }[];
};

export const jobs: Job[] = [
  {
    org: "의료 IT 기업",
    period: "2023.03 – 재직 중 · 연구원 → 주임연구원 · 백엔드 개발",
    works: [
      {
        title: "병원정보시스템 진단검사 모듈",
        period: "2023 – 2024",
        summary: "테이블 설계부터 서버, 화면까지 맡은 풀스택 개발.",
        bullets: ["위탁검사 연동, 바코드 출력 장비 연동", "동시성 제어, PostgreSQL로 DB 컨버전"],
      },
      {
        title: "임상 데이터 웨어하우스",
        period: "2024 – 2025",
        summary: "병원 10여 곳의 데이터 카탈로그 운영과 데이터 클렌징.",
        bullets: ["엑셀 정의서 반영 자동화", "데이터 클렌징 API 20여 개 서버 단독 개발 · 운영 배포"],
      },
      {
        title: "건강검진 경영지표 통계",
        period: "2025 – 2026",
        summary: "통계 모듈 5개 백엔드. 집계 오류를 재개발했습니다.",
        bullets: ["데이터셋 재설계와 조회·배치 성능 최적화", "엑셀 출력 공통 모듈 설계"],
      },
      {
        title: "연구 데이터 심의 시스템",
        period: "2026",
        summary: "서버 포팅 안정화와 보안 점검 항목 조치.",
        bullets: ["중복 API 통합 (하위 호환 유지)"],
      },
    ],
  },
  {
    org: "크리스피 · 프리랜서",
    period: "2016.12 – 2018.02 · 재학 중 병행",
    works: [{ title: "Android 앱 · 회사 홈페이지", summary: "Android 앱 개발, 회사 홈페이지 기능 개발과 유지보수.", bullets: [] }],
  },
];

export type TimelineKind = "award" | "career" | "edu" | "cert" | "project";
export const timelineKinds: Record<TimelineKind, string> = {
  award: "수상",
  career: "경력",
  edu: "학력 · 교육",
  cert: "자격",
  project: "프로젝트",
};

/** 연혁 (연대순). 교내 해커톤의 주제와 2018년 팀/개인 여부는 확인 전이라 비워 둔다 */
export const timeline: { date: string; kind: TimelineKind; title: string; sub?: string }[] = [
  { date: "2014.03", kind: "edu", title: "세종대학교 컴퓨터공학과 입학" },
  { date: "2016.12", kind: "award", title: "제1회 SW해커톤(교내) 장려상", sub: "세종대학교 소프트웨어중심대학 지원사업단 · 팀" },
  { date: "2016.12", kind: "career", title: "크리스피 프리랜서 시작", sub: "Android 앱, 회사 홈페이지 · 2018.02까지, 재학 중 병행" },
  { date: "2018.06", kind: "award", title: "제4회 SW해커톤(교내) 은상", sub: "세종대학교 소프트웨어중심대학 지원사업단" },
  { date: "2018.09", kind: "project", title: "오목판 Google Play 출시", sub: "1인 개발" },
  { date: "2019.07", kind: "project", title: "오목판 3.0", sub: "블루투스·온라인 대전 추가, AWS 서버리스 백엔드" },
  { date: "2020.02", kind: "edu", title: "세종대학교 컴퓨터공학과 졸업" },
  { date: "2020.06", kind: "cert", title: "정보처리기사" },
  { date: "2020.11", kind: "cert", title: "컴퓨터활용능력 1급" },
  { date: "2022.07", kind: "edu", title: "클라우드 기반 ERP 개발 전문가 양성과정", sub: "한국소프트웨어산업협회(KOSA) · 2023.02까지 1,200시간 · 팀 프로젝트 3회 모두 팀장" },
  { date: "2022.09", kind: "cert", title: "SQL개발자(SQLD)" },
  { date: "2022.12", kind: "project", title: "상하의 트위스트", sub: "4인 팀 팀장 · 10일" },
  { date: "2023.02", kind: "award", title: "양성과정 수료식 우수인재상", sub: "한국소프트웨어산업협회(KOSA) · 개인" },
  { date: "2023.03", kind: "career", title: "의료 IT 기업 입사", sub: "연구원 → 주임연구원 · 백엔드 개발 · 재직 중" },
  { date: "2024.10", kind: "cert", title: "TOPCIT 수준 4", sub: "종합 775점" },
  { date: "2024.12", kind: "award", title: "제22회 TOPCIT 정기평가 대상", sub: "정보통신기획평가원 · 성적우수자 재직자 부문 · 개인" },
  { date: "2026.09", kind: "project", title: "오목판 4.0 리뉴얼 · 웹 체험판", sub: "Spring Boot 온라인 대전 서버, 브라우저 체험판" },
];
