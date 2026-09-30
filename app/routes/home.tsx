import { useState } from "react";
import { Link } from "react-router";

import type { Route } from "./+types/home";
import { CaseCard, ProjectCard } from "~/components/project-card";
import { SkillMap } from "~/components/skill-map";
import { Timeline } from "~/components/timeline";
import { GomokuScreens } from "~/components/toys/gomoku-screens";
import { LisFlow } from "~/components/toys/lis-flow";
import { domains, facts, jobs, type DomainId } from "~/data/profile";
import { casePath, cases } from "~/data/cases";
import { getProject, gomokuWeb } from "~/data/projects";
import { seo } from "~/lib/site";

export function meta({}: Route.MetaArgs) {
  return seo({
    description: "강현구의 포트폴리오. 백엔드, 프론트엔드, 모바일, 데이터베이스, 인프라까지 다뤄본 기술과 경력, 프로젝트, 연혁.",
    path: "/",
  });
}

type ProjectKind = "all" | "work" | "own";
const PROJECT_KINDS: { id: ProjectKind; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "work", label: "현업" },
  { id: "own", label: "개인 · 교육" },
];

export default function Home() {
  // 소개의 분야 이름과 기술 지도가 같은 선택 상태를 쓴다
  const [domain, setDomain] = useState<DomainId>("be");
  const [projectKind, setProjectKind] = useState<ProjectKind>("all");
  const show = (k: Exclude<ProjectKind, "all">) => projectKind === "all" || projectKind === k;
  const goToDomain = (id: DomainId) => {
    setDomain(id);
    document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="wrap">
      <section className="card intro" aria-labelledby="intro-title">
        <div>
          <h1 id="intro-title">강현구</h1>
          <p className="cats">{domains.map((d) => d.name.split(" · ")[0]).join(" · ")}</p>
          <div className="legend" aria-hidden="true">
            <span className="tag work">실무</span>
            <span className="tag learn">학습 · 개인</span>
            <span>분야를 누르면 근거로 이동</span>
          </div>
          <div className="techs" aria-label="다뤄본 기술">
            {domains.map((d) => (
              <div key={d.id} className="trow">
                <button type="button" onClick={() => goToDomain(d.id)} aria-label={`${d.name} 근거 보기`}>
                  {d.name}
                </button>
                <div className="tags">
                  {d.work.map((t) => (
                    <span key={t} className="tag work">
                      {t}
                    </span>
                  ))}
                  {d.learn.map((t) => (
                    <span key={t} className="tag learn">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <ul className="facts" aria-label="한눈에 보기">
          {facts.map((f) => (
            <li key={f.value}>
              <b>{f.value}</b>
              <span>{f.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="sec" id="career" aria-labelledby="career-title">
        <div className="sec-head">
          <h2 id="career-title">경력</h2>
          <p className="eyebrow">현업 소스와 화면 대신 개념도와 가상 데이터 체험을 싣습니다</p>
        </div>
        {jobs.map((job) => (
          <article key={job.org} className={`card job${job.works.length === 1 ? " small" : ""}`}>
            <div className="job-head">
              <h3>{job.org}</h3>
              <span className="when">{job.period}</span>
            </div>
            <div className="job-items">
              {job.works.map((w) => (
                <div key={w.title} className="job-item">
                  <h4>{w.title}</h4>
                  {w.period && <span className="when">{w.period}</span>}
                  <p>{w.summary}</p>
                  {w.bullets.length > 0 && (
                    <ul>
                      {w.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {w.case && (
                    <Link className="job-more" to={casePath(w.case)}>
                      사례 보기 →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="sec" id="skills" aria-labelledby="skills-title">
        <div className="sec-head">
          <h2 id="skills-title">
            기술 지도 <span>· 분야를 눌러 근거 보기</span>
          </h2>
          <p className="eyebrow">경력 · 프로젝트 · 공개 저장소 · 블로그 글 기준</p>
        </div>
        <SkillMap domain={domain} onDomain={setDomain} />
      </section>

      <section className="sec" id="projects" aria-labelledby="projects-title">
        <div className="sec-head">
          <h2 id="projects-title">
            프로젝트 <span>· 현업부터 개인 작업까지</span>
          </h2>
          <div className="chipset" role="group" aria-label="프로젝트 구분">
            {PROJECT_KINDS.map((k) => (
              <button key={k.id} type="button" aria-pressed={projectKind === k.id} onClick={() => setProjectKind(k.id)}>
                {k.label}
              </button>
            ))}
          </div>
        </div>
        <div className="projects">
          {show("work") && cases.map((c) => <CaseCard key={c.slug} item={c} />)}
          {show("own") && (
            <ProjectCard
              project={getProject("gomoku")}
              tryLabel="실제 화면"
              extraLink={
                <a className="btn" href={gomokuWeb.link.href} target="_blank" rel="noopener">
                  웹 체험판(블로그) ↗
                </a>
              }
            >
              <GomokuScreens compact />
            </ProjectCard>
          )}
          {show("own") && (
            <ProjectCard project={getProject("lis")} tryLabel="환자 접수 흐름">
              <LisFlow />
            </ProjectCard>
          )}
        </div>
      </section>

      <section className="sec" id="history" aria-labelledby="history-title">
        <Timeline />
      </section>
    </main>
  );
}
