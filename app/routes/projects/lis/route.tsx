import { Link } from "react-router";

import type { Route } from "./+types/route";
import { ProjectDetail } from "~/components/project-detail";
import { casePath } from "~/data/cases";
import { getProject } from "~/data/projects";
import { seo } from "~/lib/site";
import { LisJourney } from "./journey";
import { LisRoles } from "./roles";
import { consultationShot, lisShots } from "./shots";

const project = getProject("lis");

// 최종 발표 자료에서 설명한 설계 판단. 직접 개발한 파트만 싣는다
const DECISIONS = [
  {
    title: "진료 취소도 기록으로 남긴다",
    context: "진료 도중 환자를 잘못 골랐거나 진료를 멈춰야 할 때가 있습니다.",
    choice: "취소하면 진료를 열었던 기록과 취소 사실은 남기고, 처방 오더만 내지 않게 했습니다. 누가 언제 진료를 열었는지는 나중에도 추적할 수 있어야 하기 때문입니다.",
  },
  {
    title: "거의 안 바뀌는 데이터는 느슨하게 갱신",
    context: "처방 목록은 진료 중 계속 검색하지만, 새 처방이 등록되는 일은 드뭅니다.",
    choice: "페이지 단위로 조회하고 긴 주기로만 다시 불러오게 해, 서버 부하를 줄이면서도 새 처방은 곧 반영되게 했습니다.",
  },
  {
    title: "세션 대신 토큰 인증",
    context: "Spring Security의 기본 인증은 서버 세션에 기대서, 서버를 늘리면 세션 공유가 필요해집니다.",
    choice: "JWT 방식으로 바꿔 API를 무상태로 만들었습니다. 화면에서는 토큰을 브라우저 저장소에 보관해 새로고침해도 로그인이 유지되게 했습니다.",
  },
  {
    title: "긴 가입 절차를 끊겨도 이어지게",
    context: "가입은 이메일 인증, 계정 생성, 직군별 상세 정보, 관리자 승인까지 단계가 깁니다.",
    choice: "이메일 인증을 먼저 받아 중복이나 쓸 수 없는 이메일을 상세 정보 입력 전에 알려 주고, 단계마다 서버에 체크포인트를 남겨 도중에 나가도 이어서 작성하게 했습니다.",
  },
];

export function meta({}: Route.MetaArgs) {
  return seo({
    title: project.title,
    description: "병원 진단검사 시스템(LIS)을 3인 팀 팀장으로 설계하고, 환자 무인 접수부터 의사의 처방 오더까지 직접 개발했다. 실제 화면으로 업무 흐름을 따라가 볼 수 있다.",
    path: "/projects/lis",
  });
}

export default function Lis() {
  return (
    <ProjectDetail
      project={project}
      tryLabel="실제 화면"
      demo={<img className="hero-shot" src={consultationShot.src} alt={consultationShot.alt} width={consultationShot.width} height={consultationShot.height} />}
    >
      <section className="card detail-body" aria-labelledby="roles-title">
        <h2 id="roles-title">역할 분담</h2>
        <p className="caption">파트(모듈)마다 누가 기획·설계하고 개발했는지, 팀장으로서 맡은 공통 작업은 무엇인지 정리했습니다. 행을 누르면 자세히 보입니다.</p>
        <LisRoles />
      </section>

      <section className="card detail-body" aria-labelledby="biz-title">
        <h2 id="biz-title">업무 흐름 따라가기</h2>
        <p className="biz-lede">
          LIS(진단검사 시스템)는 의사가 낸 검사 처방(오더)을 바탕으로 검체를 채혈하고, 장비나 수기로 검사 결과를 입력해 통보하는 병원 시스템입니다. 실제 LIS는 처방, 채혈, 접수, 결과 입력, 정도관리, 현장검사로 이뤄지고, 이 프로젝트는 그중 환자 접수부터 결과 분석까지의 흐름을 만들었습니다.
        </p>
        <LisJourney />
        <p className="caption">처방에는 대부분 청구코드가 붙습니다. 주로 심평원의 진료행위(수가) 코드를 쓰고, 수탁 검사처럼 다른 코드를 쓰거나 비워 두는 경우도 있습니다.</p>
      </section>

      <section className="card detail-body" aria-labelledby="decision-title">
        <h2 id="decision-title">설계 판단</h2>
        <div className="solves">
          {DECISIONS.map((d) => (
            <article key={d.title} className="solve">
              <h3>{d.title}</h3>
              <p>
                <em>상황</em>
                {d.context}
              </p>
              <p>
                <em>판단</em>
                {d.choice}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="sec" aria-labelledby="shots-title">
        <div className="sec-head">
          <h2 id="shots-title">설계와 인증</h2>
          <p className="eyebrow">저장소 README에 공개한 화면과 설계</p>
        </div>
        <ul className="wide-shots">
          {lisShots.map((s) => (
            <li key={s.label} className="card">
              <a href={s.src} target="_blank" rel="noopener">
                <img src={s.src} alt={s.alt} width={s.width} height={s.height} loading="lazy" />
              </a>
              <div>
                <h3>{s.label}</h3>
                <ul>
                  {s.parts.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside className="card next-step">
        <p className="eyebrow">그 뒤</p>
        <p>교육 과정에서 처음 다룬 진단검사 업무를, 입사 후 병원정보시스템의 진단검사 모듈로 실제 개발했습니다.</p>
        <Link className="btn green" to={casePath("lab")}>
          현업 사례 · 진단검사 모듈 →
        </Link>
      </aside>
    </ProjectDetail>
  );
}
