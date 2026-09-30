import { useState } from "react";

// 저장소 README의 기여 내역을 파트(모듈)별·공통 작업별로 정리한 것
type Who = "강" | "류" | "김";
const PEOPLE: Record<Who, string> = { 강: "강현구 (팀장)", 류: "류호진", 김: "김동신" };
const PHASES = ["기획", "화면 설계", "DB 설계", "개발"] as const;

/** 칸 하나. by = 담당, review = 팀장이 검수·병합만 한 칸 */
type Cell = { by?: Who; review?: boolean };
type Row = { name: string; cells?: Cell[]; lines: string[] };

const me: Cell = { by: "강" };
const PARTS: Row[] = [
  {
    name: "계정 · 인증",
    cells: [me, me, me, me],
    lines: [
      "요구사항: 의사는 모든 업무를, 간호사는 채혈 접수부터 할 수 있습니다.",
      "정의한 프로세스: 직원 등록·탈퇴·정보 변경, 로그인·로그아웃, 이메일 점유 인증, 비밀번호 찾기.",
      "DB: 의사와 간호사를 직원의 하위 유형으로 두고, 간호사만의 칸이 없어 간호사 테이블은 없앴습니다.",
      "구현: Spring Security + JWT, 단계별 체크포인트가 있는 가입 신청.",
    ],
  },
  {
    name: "무인 접수",
    cells: [me, me, me, me],
    lines: [
      "원래 요구사항은 환자 데이터를 DB에 직접 넣어도 되는 수준이었지만, 제 파트를 일찍 끝내고 추가로 맡았습니다. 환자 혼자 쓰는 셀프 접수를 목표로 했습니다.",
      "정의한 프로세스: 환자 등록(주민번호로 등록 여부 확인), 방문 접수(진료 대기 목록에 순서대로), 예약 접수(날짜·시간 선택, 당일 예약은 진료 대기 목록에).",
      "DB: 진료 접수의 예약 시각이 비어 있으면 방문, 있으면 예약으로 구분했습니다.",
    ],
  },
  {
    name: "진료 · 처방",
    cells: [me, me, me, me],
    lines: [
      "논문, 실제 진단검사실 자료, 다른 HIS·LIS 매뉴얼을 참고해 진료실 프로세스를 정의했습니다.",
      "정의한 프로세스: 심평원 진료행위 코드를 매핑한 처방 등록, 환자별 임시 오더, 진료를 마칠 때 한 번에 오더.",
    ],
  },
  {
    name: "채혈",
    cells: [{ by: "류" }, { by: "류", review: true }, { by: "류", review: true }, { by: "류" }],
    lines: ["팀원이 채혈 접수, 바코드 출력, 채혈 등록, 부적합 검체 등록을 설계하고 구현했습니다.", "저는 화면 설계를 검수해 병합하고, 테이블을 검수했습니다."],
  },
  {
    name: "검사",
    cells: [{ by: "김" }, { by: "김", review: true }, { by: "김", review: true }, { by: "김" }],
    lines: ["팀원이 검사 접수와 결과 입력·조회·분석을 설계하고 구현했습니다.", "저는 검체·검사 결과 테이블의 초안을 잡고 검수했으며, 화면 설계를 병합했습니다."],
  },
];

const COMMON: Row[] = [
  {
    name: "일정 · 자원 관리",
    lines: ["주 단위로 일정을 짜고 할 일을 팀원 역량에 맞게 나눴습니다.", "산출물은 Issue에 올리게 하고 Milestone으로 진행을 공유했으며, 성취율을 다음 계획에 반영했습니다."],
  },
  {
    name: "기술 스택 선정",
    lines: ["멘토링을 맡은 현업의 개발 환경과 팀 역량을 함께 보고 스택을 정했고, 버전은 현업 환경에 맞췄습니다.", "팀원이 프로젝트를 하며 부족한 기술을 익힐 수 있게 구성했습니다."],
  },
  {
    name: "공통 개발환경",
    lines: [
      "백엔드: 기능별 Controller·Service·Model 디렉터리와 명명 규칙, MyBatis Mapper·DO·DAO 규칙, Hibernate Validator 검증 규칙, 파트별 라우팅과 Spring Security 기초 설정.",
      "프론트엔드: React + Redux Toolkit + RTK Query 구성, ESLint·Prettier·TypeScript 설정, MUI 등 공통 라이브러리.",
      "제가 구성해 배포한 환경 위에서 팀원이 각자 작업을 올리는 방식으로 개발했습니다.",
    ],
  },
  {
    name: "형상관리",
    lines: ["브랜치·커밋·병합 규칙을 정하고, Code Owner로 리뷰 없는 병합을 막았습니다.", "로그나 보안 관련 파일이 올라가지 않게 제외 규칙을 두었습니다."],
  },
  {
    name: "ERD 설계",
    lines: [
      "전체 ERD 초안과 명명·데이터형 규칙을 먼저 잡았습니다.",
      "파트별로 각자 스키마를 검토·수정하게 했고, 처방·진료행위(수가) 코드·검체·검체 용기처럼 여러 파트가 함께 참조하는 마스터 테이블은 제가 맡았습니다.",
      "파트별 결과를 병합한 뒤 성능을 고려해 반정규화하고, 필요한 트리거와 뷰를 추가했습니다.",
    ],
  },
  {
    name: "화면 설계 통합",
    lines: ["팀원들이 파트별로 나눠 설계한 화면을 검수하고 하나로 병합했습니다."],
  },
  {
    name: "개발 총괄 · 배포",
    lines: ["파트 병합과 최종 검토, 문서화를 맡았습니다.", "AWS EC2에 빌드하고 배포했습니다."],
  },
];

function Chip({ cell }: { cell: Cell }) {
  if (!cell.by) return <span className="rm-none">—</span>;
  return (
    <span className="rm-cell">
      <b className={`rm-who ${cell.by === "강" ? "me" : "mate"}`} title={PEOPLE[cell.by]}>
        {cell.by}
      </b>
      {cell.review && <small title="팀장 검수·병합">+검수</small>}
    </span>
  );
}

export function LisRoles() {
  const [open, setOpen] = useState("계정 · 인증");
  const row = [...PARTS, ...COMMON].find((r) => r.name === open)!;
  const isCommon = COMMON.includes(row);

  const rowButton = (r: Row) => (
    <button type="button" className={`rm-row${r.name === open ? " on" : ""}`} aria-pressed={r.name === open} onClick={() => setOpen(r.name)}>
      <span className="rm-name">{r.name}</span>
      {r.cells ? (
        r.cells.map((c, i) => <Chip key={PHASES[i]} cell={c} />)
      ) : (
        <span className="rm-span">
          <Chip cell={me} /> 팀 전체 대상
        </span>
      )}
    </button>
  );

  return (
    <div className="rm">
      <div className="rm-legend">
        {(Object.keys(PEOPLE) as Who[]).map((w) => (
          <span key={w}>
            <b className={`rm-who ${w === "강" ? "me" : "mate"}`}>{w}</b> {PEOPLE[w]}
          </span>
        ))}
        <span>
          <small className="rm-review">+검수</small> 팀장이 검수·병합
        </span>
      </div>

      <div className="rm-table" role="group" aria-label="파트별 역할">
        <div className="rm-head" aria-hidden="true">
          <span>파트 · 모듈</span>
          {PHASES.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
        {PARTS.map(rowButton)}
        <div className="rm-group">공통 작업</div>
        {COMMON.map(rowButton)}
      </div>

      <div className="rm-detail" aria-live="polite">
        <h3>
          {row.name}
          <span>{isCommon ? "공통 작업" : row.cells!.some((c) => c.by === "강") ? "직접 개발" : "팀원 담당"}</span>
        </h3>
        <ul>
          {row.lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
