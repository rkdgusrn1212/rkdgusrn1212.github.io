import type { ReactNode } from "react";
import { Link } from "react-router";

import type { Project } from "~/data/projects";

/** 상세 페이지 공통 틀. 체험(demo)과 추가 섹션(children)만 페이지마다 다르다 */
export function ProjectDetail({ project: p, demo, tryLabel, children }: { project: Project; demo: ReactNode; tryLabel: string; children?: ReactNode }) {
  return (
    <main className="wrap detail">
      <nav className="crumbs" aria-label="현재 위치">
        <Link to="/">홈</Link>
        <span aria-hidden="true">/</span>
        <Link to={{ pathname: "/", hash: "#projects" }}>프로젝트</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{p.title}</span>
      </nav>

      <header className="card detail-head">
        <div className="detail-copy">
          <p className="eyebrow">{p.kind}</p>
          <h1>{p.title}</h1>
          <p className="meta">{p.meta}</p>
          <p className="summary">{p.summary}</p>
          <div className="tags">
            {p.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <div className="foot">
            {p.links.map((l) => (
              <a key={l.href} className={`btn ${l.tone === "solid" ? "solid" : ""}`} href={l.href} target="_blank" rel="noopener">
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
        <div className="preview" aria-label={`${p.title} 체험`}>
          <span className="try">체험 · {tryLabel}</span>
          {demo}
        </div>
      </header>

      <section className="card detail-body" aria-labelledby="done-title">
        <dl className="kv">
          {p.facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <h2 id="done-title">한 일</h2>
        <ul className="points">
          {p.points.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      {children}
    </main>
  );
}
