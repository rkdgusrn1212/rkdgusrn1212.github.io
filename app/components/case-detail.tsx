import type { ReactNode } from "react";
import { Link } from "react-router";

import { casePath, cases, type Case, type FlowNode } from "~/data/cases";

/** 구조 개념도. 위에서 아래로 흐르고, 칸에 붙는 연동은 옆에 단다 */
function Flow({ nodes }: { nodes: FlowNode[] }) {
  return (
    <ol className="flow">
      {nodes.map((n) => (
        <li key={n.label}>
          <div className="flow-node">
            <b>{n.label}</b>
            {n.sub && <span>{n.sub}</span>}
          </div>
          {n.side && (
            <ul className="flow-side">
              {n.side.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}

/** 현업 사례 공통 틀. 체험(demo)만 사례마다 다르다 */
export function CaseDetail({ item: c, demo }: { item: Case; demo: ReactNode }) {
  const i = cases.findIndex((x) => x.slug === c.slug);
  const prev = cases[i - 1];
  const next = cases[i + 1];

  return (
    <main className="wrap detail case">
      <nav className="crumbs" aria-label="현재 위치">
        <Link to="/">홈</Link>
        <span aria-hidden="true">/</span>
        <Link to={{ pathname: "/", hash: "#career" }}>경력</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{c.title}</span>
      </nav>

      <header className="card detail-head">
        <div className="detail-copy">
          <p className="eyebrow">현업 사례 · ERP 기업</p>
          <h1>{c.title}</h1>
          <p className="meta">{c.period}</p>
          <p className="summary">{c.background}</p>
          <dl className="kv">
            <div>
              <dt>역할</dt>
              <dd>{c.role}</dd>
            </div>
          </dl>
          <div className="tags">
            {c.stack.map((t) => (
              <span key={t} className="tag work">
                {t}
              </span>
            ))}
          </div>
          {c.related && (
            <div className="foot">
              <Link className="btn green" to={c.related.to}>
                {c.related.label} →
              </Link>
            </div>
          )}
        </div>
        <figure className="flow-box" aria-label="구조 개념도">
          <span className="try">개념도 · 일반화</span>
          <Flow nodes={c.flow} />
        </figure>
      </header>

      <section className="card detail-body" aria-labelledby="solve-title">
        <h2 id="solve-title">어려웠던 점과 해결</h2>
        <div className="solves">
          {c.challenges.map((ch) => (
            <article key={ch.title} className="solve">
              <h3>{ch.title}</h3>
              <p>
                <em>문제</em>
                {ch.problem}
              </p>
              <p>
                <em>해결</em>
                {ch.solution}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="card case-demo" aria-labelledby="demo-title">
        <div className="case-demo-head">
          <h2 id="demo-title">
            체험 <span>· {c.demo.label}</span>
          </h2>
          <span className="tag learn">예시 데이터</span>
        </div>
        <p className="caption">{c.demo.caption}</p>
        {demo}
      </section>

      <section className="card detail-body" aria-labelledby="result-title">
        <h2 id="result-title">결과</h2>
        <ul className="points">
          {c.results.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p className="caption">현업 소스, 화면, 내부 문서는 싣지 않습니다. 개념도와 체험은 이해를 돕기 위해 새로 만든 예시입니다.</p>
      </section>

      <nav className="case-nav" aria-label="다른 사례">
        {prev ? (
          <Link to={casePath(prev.slug)}>
            <span>이전 사례</span>
            {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={casePath(next.slug)} className="next">
            <span>다음 사례</span>
            {next.title}
          </Link>
        )}
      </nav>
    </main>
  );
}
