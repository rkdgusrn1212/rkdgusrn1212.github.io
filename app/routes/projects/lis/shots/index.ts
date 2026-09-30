// LIS 저장소 README에 공개된 화면·ERD를 WebP로 줄인 것. 요소 설명은 최종 발표 자료 기준
import type { Box } from "~/components/spotlight";
import blood1 from "./blood-1.webp";
import blood2 from "./blood-2.webp";
import blood3 from "./blood-3.webp";
import blood4 from "./blood-4.webp";
import consultation from "./consultation.webp";
import erd from "./erd.webp";
import kiosk1 from "./kiosk-1.webp";
import kiosk2 from "./kiosk-2.webp";
import kiosk3 from "./kiosk-3.webp";
import kiosk4 from "./kiosk-4.webp";
import kiosk5 from "./kiosk-5.webp";
import kiosk6 from "./kiosk-6.webp";
import login from "./login.webp";
import test1 from "./test-1.webp";
import test2 from "./test-2.webp";
import test3 from "./test-3.webp";
import test4 from "./test-4.webp";

/** 단계별 한 장짜리 화면. 무인 접수·채혈·검사 화면은 최종 발표 자료에서 가져왔고, 전화번호·주민번호 칸은 흐리게 가렸다 */
export type Img = { src: string; width: number; height: number; alt: string };
const kiosk = (src: string, alt: string): Img => ({ src, width: 1000, height: 530, alt: `무인 접수 키오스크 화면. ${alt}` });
export const kioskImgs = [
  kiosk(kiosk1, "초진 접수와 재진 접수 중 고르는 첫 화면"),
  kiosk(kiosk2, "주민번호 13자리 입력"),
  kiosk(kiosk3, "이름과 휴대폰 번호 입력"),
  kiosk(kiosk4, "개인정보 수집·이용 동의"),
  kiosk(kiosk5, "진료과와 함께 나열된 진료의 목록에서 선택"),
  kiosk(kiosk6, "진료 접수 완료 안내"),
];
export const bloodImgs: Img[] = [
  { src: blood1, width: 1035, height: 500, alt: "채혈 접수 화면. 환자 검색, 내원 정보, 오더 정보, 채취할 처방 정보" },
  { src: blood2, width: 633, height: 420, alt: "채혈 바코드 출력 창. 용기 코드와 바코드" },
  { src: blood3, width: 924, height: 482, alt: "채혈 등록 화면. 바코드 입력과 채혈자·채혈 일시 목록" },
  { src: blood4, width: 1100, height: 390, alt: "부적합 검체 등록 화면. 부적합 사유 코드와 피통보자 선택, 부적합 검체 목록" },
];
export const testImgs: Img[] = [
  { src: test1, width: 1200, height: 574, alt: "검사 접수 화면. 바코드 입력, 검체·환자·검사 정보, 검사 접수 목록" },
  { src: test2, width: 1200, height: 574, alt: "검사 결과 입력 화면. 바코드 입력, 대상 목록, 진행 상황 원그래프" },
  { src: test3, width: 1200, height: 574, alt: "검사 결과 조회 화면. 환자 이름과 접수 기간으로 검색한 결과 목록" },
  { src: test4, width: 1200, height: 572, alt: "검사 결과 분석 화면. 선택한 검사의 시계열 그래프와 결과 표" },
];

/** 진료 화면. box는 화면 안 영역 [x, y, 너비, 높이] % */
export const consultationShot = {
  src: consultation,
  width: 1200,
  height: 613,
  alt: "진료 화면. 왼쪽 환자 선택, 가운데 새 진료기록과 오더 목록, 오른쪽 처방 검색과 간편 처방 등록",
  parts: [
    { title: "환자 선택", box: [12.8, 5.6, 22.6, 91.6] as Box, body: "대기 환자와 예약 환자 탭. 대기순번, 접수 시각, 차트번호를 보여 주고, 환자를 누르면 진료가 시작됩니다." },
    { title: "새 진료기록", box: [35.6, 5.6, 31.1, 91.6] as Box, body: "진료를 시작하면 서버가 진료번호를 새로 매기고, 시작 시각과 경과 시간을 표시합니다. 오더 목록은 컬럼별 정렬과 선택 제거가 됩니다." },
    { title: "처방 검색", box: [66.9, 5.6, 25.9, 46.2] as Box, body: "처방코드나 처방명으로 찾아 누르면 오더 목록에 담깁니다. 자주 바뀌지 않는 데이터라 페이지 단위로 느슨하게 갱신합니다." },
    { title: "간편 처방 등록", box: [66.9, 52.3, 25.9, 45] as Box, body: "시스템에 없는 처방을 진료 중에 바로 등록합니다. 심평원 진료행위 코드를 청구코드로 고르면 처방코드·처방명·분류가 채워지고, 검사 처방이면 검체와 용기도 고릅니다." },
    { title: "진료기록 제출", box: [58.8, 89.6, 8, 6.2] as Box, body: "모아 둔 처방을 한 번에 오더합니다. 도중에 다른 환자를 누르면 취소를 확인한 뒤, 진료 기록만 남기고 오더는 내지 않습니다." },
  ],
};

export type LisShot = { src: string; width: number; height: number; label: string; alt: string; parts: string[] };

export const lisShots: LisShot[] = [
  {
    src: erd,
    width: 1048,
    height: 710,
    label: "진료 파트 ERD",
    alt: "진료 접수, 진료, 처방 오더, 처방, 검체, 검사 결과 테이블의 ERD",
    parts: [
      "진료 접수 → 진료 → 처방 오더로 이어지고, 처방은 진료행위(수가) 코드와 처방 분류를 가집니다.",
      "검사 처방은 검체 종류, 검체 용기, 검사 분류를 가지고, 채혈된 검체와 검사 결과로 이어집니다.",
      "진료 접수의 예약 시각이 비어 있으면 방문 접수, 있으면 예약 접수입니다.",
      "검체·검사 결과 테이블은 팀원 담당이고, 초안과 검수를 맡았습니다.",
    ],
  },
  {
    src: login,
    width: 1200,
    height: 624,
    label: "로그인 · 가입",
    alt: "KHS Laboratory Information System 로그인 화면",
    parts: [
      "의사·간호사 계정으로 로그인합니다 (Spring Security + JWT).",
      "로그인 없이 쓰는 무인 접수 화면으로 가는 링크가 있습니다.",
      "가입은 이메일 인증과 아이디 생성 → 직군별 상세 정보 입력 → 관리자 승인 순서입니다.",
      "가입 도중 나가도 서버에 남긴 체크포인트부터 이어서 작성할 수 있습니다.",
    ],
  },
];
