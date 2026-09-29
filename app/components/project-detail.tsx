import type { ReactNode } from "react";

import type { Project } from "~/data/projects";

/** 상세 페이지 공통 틀. 체험 영역(demo)과 추가 섹션(children)만 페이지마다 다르다. */
export function ProjectDetail({ project: p, demo, children }: { project: Project; demo: ReactNode; children?: ReactNode }) {
  return (
    <main className="wrap page">
      <p className="eyebrow">
        제{p.move.n}수 · {p.move.coord} · {p.kind}
      </p>
      <h1 className="display">{p.title}</h1>
      <p className="lede">{p.summary}</p>

      <div className="stage" aria-label={`${p.title} 체험`}>
        {demo}
      </div>

      <dl className="facts">
        <dt>기간</dt>
        <dd>{p.period}</dd>
        {p.role && (
          <>
            <dt>역할</dt>
            <dd>{p.role}</dd>
          </>
        )}
        {p.context && (
          <>
            <dt>배경</dt>
            <dd>{p.context}</dd>
          </>
        )}
        {p.stack.length > 0 && (
          <>
            <dt>스택</dt>
            <dd>{p.stack.join(" · ")}</dd>
          </>
        )}
      </dl>

      {p.points.length > 0 && (
        <section className="section">
          <h2>한 일</h2>
          <ul>
            {p.points.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      )}

      {children}

      <div className="chips">
        {p.links.map((l) => (
          <a key={l.href} className={`btn ${l.tone ?? ""}`} href={l.href} target="_blank" rel="noopener">
            {l.label} ↗
          </a>
        ))}
      </div>
    </main>
  );
}
