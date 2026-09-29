// 기술 지도의 근거. 경력은 설명만(현업 소스·화면 비공개), 나머지는 공개 자료로 링크한다.
import type { DomainId } from "./profile";
import { BLOG_GOMOKU_POST, PLAY_GOMOKU } from "./projects";

export type EvidenceKind = "career" | "project" | "repo" | "profile" | "post";
export const evidenceKinds: Record<EvidenceKind, string> = {
  career: "경력",
  project: "프로젝트",
  repo: "저장소",
  profile: "프로필",
  post: "글",
};

export type Evidence = {
  kind: EvidenceKind;
  /** 화면에 보이는 기간 표기 */
  year: string;
  /** 정렬과 활동 연도 막대에 쓰는 대표 연도 */
  sortYear: number;
  title: string;
  note: string;
  href?: string;
  domains: DomainId[];
};

const GH = "https://github.com/rkdgusrn1212/";
const BL = "https://khgkjg12.blogspot.com";

export const evidence: Evidence[] = [
  // 경력 (설명만)
  { kind: "career", year: "2023–24", sortYear: 2023, title: "병원정보시스템 진단검사 모듈", note: "테이블 설계부터 서버·화면까지. 위탁검사 연동, 바코드 출력, 동시성 제어, PostgreSQL로 DB 컨버전", domains: ["be", "fe", "db", "emb"] },
  { kind: "career", year: "2024–25", sortYear: 2024, title: "임상 데이터 웨어하우스", note: "병원 10여 곳 데이터 카탈로그 운영, 데이터 클렌징 API 20여 개 단독 개발, 정의서 반영 자동화", domains: ["be", "db", "ai", "lead"] },
  { kind: "career", year: "2025–26", sortYear: 2025, title: "건강검진 경영지표 통계", note: "통계 모듈 5개 백엔드. 집계 재개발, 데이터셋 재설계와 조회·배치 성능 최적화", domains: ["be", "db", "algo"] },
  { kind: "career", year: "2026", sortYear: 2026, title: "연구 데이터 심의 시스템", note: "서버 포팅 안정화, 보안 점검 조치, 중복 API 통합(하위 호환 유지)", domains: ["be", "ops", "lead"] },
  { kind: "career", year: "2016–18", sortYear: 2016, title: "프리랜서 Android · 홈페이지", note: "Android 앱 개발, 회사 홈페이지 기능 개발과 유지보수", domains: ["mo", "fe"] },

  // 프로젝트
  { kind: "project", year: "2018–", sortYear: 2018, title: "오목판 (Android)", note: "2018.09 출시 · 1인 개발 · 2019 3.0(블루투스·온라인) · 2026 4.0 리뉴얼. 누적 다운로드 10만+. 칸별 공격·수비 점수판 AI", href: PLAY_GOMOKU, domains: ["mo", "ai", "lead"] },
  { kind: "project", year: "2019", sortYear: 2019, title: "오목판 3.0 서버리스 백엔드", note: "AWS Lambda · API Gateway · DynamoDB · Step Functions로 대전 상태와 턴 타임아웃 관리", href: PLAY_GOMOKU, domains: ["be", "db", "ops"] },
  { kind: "project", year: "2026", sortYear: 2026, title: "오목판 4.0 온라인 대전 서버", note: "Java 21 · Spring Boot(WebSocket/STOMP, OAuth2) · MyBatis · MariaDB · Flyway · Fly.io(Docker)", href: PLAY_GOMOKU, domains: ["be", "db", "ops"] },
  { kind: "project", year: "2026", sortYear: 2026, title: "오목판 웹 체험판", note: "React 18 · TypeScript · Vite · Fabric.js. Cloudflare Workers 정적 배포. 인공지능·2인 대전", href: BLOG_GOMOKU_POST, domains: ["fe", "ops", "ai"] },
  { kind: "project", year: "2022", sortYear: 2022, title: "상하의 트위스트", note: "4인 팀 팀장. React + Open API 키를 숨기는 REST 프록시 서버", href: `${GH}sanghai_twist`, domains: ["fe", "be", "lead"] },
  { kind: "project", year: "2023", sortYear: 2023, title: "강호신 LIS", note: "3인 팀 팀장. Spring Boot·MyBatis·MariaDB, React·RTK Query, 테이블 설계, AWS EC2 배포", href: `${GH}laboratory_information_system-portfolio`, domains: ["be", "fe", "db", "ops", "lead"] },

  // 공개 저장소
  { kind: "repo", year: "2022–26", sortYear: 2026, title: "rkdgusrn1212.github.io", note: "9LOG 블로그(React·RTK Query) → 이 포트폴리오(React Router 8, 빌드 시 프리렌더, GitHub Actions 배포)", href: `${GH}rkdgusrn1212.github.io`, domains: ["fe", "ops"] },
  { kind: "repo", year: "2022", sortYear: 2022, title: "맛집 웹앱 (양성과정 미니 프로젝트 2)", note: "Java 팀 프로젝트", href: `${GH}dz_proj2_team1`, domains: ["be"] },
  { kind: "repo", year: "2022", sortYear: 2022, title: "NodeAccessibleLinkedList", note: "노드를 직접 참조해 여러 연산을 O(1)로 제공하는 Java 연결 리스트", href: `${GH}NodeAccessibleLinkedList`, domains: ["algo"] },
  { kind: "repo", year: "2018", sortYear: 2018, title: "Graphic2D", note: "SurfaceView 기반 Android 2D 그래픽 프레임워크. 오목판의 판 렌더링에 쓰는 자체 라이브러리", href: `${GH}Graphic2D`, domains: ["mo"] },
  { kind: "repo", year: "2018", sortYear: 2018, title: "PictureLoader-Android", note: "카메라·앨범 이미지를 불러와 자르고 URI로 돌려주는 다이얼로그 라이브러리", href: `${GH}PictureLoader-Android`, domains: ["mo"] },
  { kind: "repo", year: "2018", sortYear: 2018, title: "ActionButton", note: "Android 커스텀 버튼", href: `${GH}ActionButton`, domains: ["mo"] },
  { kind: "repo", year: "2018", sortYear: 2018, title: "Overriding (캡스톤)", note: "라즈베리파이 애드혹 통신 프로젝트 · 세종대 캡스톤", href: `${GH}Overriding`, domains: ["emb"] },
  { kind: "repo", year: "2018", sortYear: 2018, title: "Overriding-Module", note: "Overriding 앱-모듈 통신용 Android 라이브러리", href: `${GH}Overriding-Module`, domains: ["mo", "emb"] },
  { kind: "repo", year: "2018", sortYear: 2018, title: "SimpleImageProcessingCamera", note: "영상처리 패키지를 쓴 Android 카메라", href: `${GH}SimpleImageProcessingCamera`, domains: ["mo", "emb"] },
  { kind: "repo", year: "2018", sortYear: 2018, title: "guitar_club · Sejong-Junggo-Web", note: "React 동아리 페이지, 웹 프로그래밍 팀 프로젝트", href: `${GH}guitar_club`, domains: ["fe"] },
  { kind: "profile", year: "진행 중", sortYear: 2026, title: "solved.ac 프로필", note: "백준 문제 풀이 기록", href: "https://solved.ac/profile/khgkjg12", domains: ["algo"] },

  // 블로그 글
  { kind: "post", year: "2025", sortYear: 2025, title: "소프트웨어 유지보수 방법론", note: "현업에서 느낀 유지보수 업무의 문제점과 개선 방안", href: `${BL}/2025/03/maintain-method.html`, domains: ["lead"] },
  { kind: "post", year: "2023", sortYear: 2023, title: "NextJS의 4가지 Rendering 방식과 그 구현", note: "CSR · SSR · SSG · ISR", href: `${BL}/2023/08/nextjs-rendering.html`, domains: ["fe"] },
  { kind: "post", year: "2023", sortYear: 2023, title: "Node.js 웹 서버가 Java 웹 서버보다 성능이 뛰어날까?", note: "서버 모델 비교", href: `${BL}/2023/07/nodejs-vs-java-web-server.html`, domains: ["be", "algo"] },
  { kind: "post", year: "2022", sortYear: 2022, title: "Java EE · JSP · Spring 시리즈 (20편 이상)", note: "EL, JSTL, Directive, MVC, DI, IoC, Spring MVC", href: `${BL}/search/label/Java%20EE`, domains: ["be"] },
  { kind: "post", year: "2022", sortYear: 2022, title: "Java 입출력·JVM 성능 시리즈", note: "가장 빠른 입출력, JVM 비교연산, @HotSpotIntrinsicCandidate, GC 메모리", href: `${BL}/search/label/%EC%84%B1%EB%8A%A5`, domains: ["algo", "be"] },
  { kind: "post", year: "2022", sortYear: 2022, title: "머신러닝 시리즈 (12편)", note: "Feature Engineering, PCA, K-means, Target Encoding, SHAP, PDP", href: `${BL}/search/label/Machine%20Learning`, domains: ["ai"] },
  { kind: "post", year: "2022", sortYear: 2022, title: "인공지능의 기초 시리즈 (7편)", note: "탐색 전략, 휴리스틱, 지역탐색, 강화학습, MDP", href: `${BL}/2022/05/`, domains: ["ai"] },
  { kind: "post", year: "2019", sortYear: 2019, title: "Python 영상처리 시리즈 (5편)", note: "Pillow로 감마 보정, 스트레칭, 반전, 슬라이딩", href: `${BL}/search/label/Image%20Processing`, domains: ["emb", "ai"] },
  { kind: "post", year: "2017", sortYear: 2017, title: "Database 설계 시리즈", note: "설계 순서, 요구사항 수집·분석", href: `${BL}/search/label/Database`, domains: ["db"] },
  { kind: "post", year: "2017", sortYear: 2017, title: "AWS 요금정책과 프리티어 정리", note: "DynamoDB, Cognito, API Gateway 등", href: `${BL}/2017/11/`, domains: ["ops"] },
  { kind: "post", year: "2016–17", sortYear: 2016, title: "C++ 알고리즘 풀이 (57편)", note: "입출력, 진법 변환, 정렬, 배열 연산", href: `${BL}/search/label/C%2B%2B`, domains: ["algo"] },
];

/** 활동 연도 막대의 범위 */
export const evidenceYears = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
