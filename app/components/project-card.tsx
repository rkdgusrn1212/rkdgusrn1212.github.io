import type { ReactNode } from "react";
import { Link } from "react-router";

import { casePath, type Case } from "~/data/cases";
import type { Project } from "~/data/projects";

/** 옛 9LOG 프로젝트 카드 모양(분홍 테두리, 주황 테두리 미리보기)에 체험을 넣은 카드 */
export function ProjectCard({ project: p, tryLabel, children, extraLink }: { project: Project; tryLabel: string; children: ReactNode; extraLink?: ReactNode }) {
  return (
    <article className="pcard">
      <div className="preview">
        <span className="try">체험 · {tryLabel}</span>
        {children}
      </div>
      <div className="pbody">
        <p className="eyebrow">{p.kind}</p>
        <h3>{p.title}</h3>
        <p className="meta">{p.meta}</p>
        <p>{p.summary}</p>
        <div className="tags">
          {p.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <p className="meta">{p.note}</p>
        <div className="foot">
          <Link className="btn solid" to={`/projects/${p.slug}/`} viewTransition>
            자세히 보기
          </Link>
          {p.links.map((l) => (
            <a key={l.href} className="btn" href={l.href} target="_blank" rel="noopener">
              {l.label} ↗
            </a>
          ))}
          {extraLink}
        </div>
      </div>
    </article>
  );
}

/** 현업 사례 카드. 현업 화면은 싣지 않으므로 미리보기에는 업무 흐름 개념도를 작게 보여 준다 */
export function CaseCard({ item: c }: { item: Case }) {
  return (
    <article className="pcard">
      <div className="preview">
        <span className="try">개념도 · 업무 흐름</span>
        <ol className="mini-flow" aria-label={`${c.title} 업무 흐름`}>
          {c.flow.map((n) => (
            <li key={n.label}>{n.label}</li>
          ))}
        </ol>
      </div>
      <div className="pbody">
        <p className="eyebrow">현업 · ERP 기업</p>
        <h3>{c.title}</h3>
        <p className="meta">{c.period}</p>
        <p>{c.summary}</p>
        <div className="tags">
          {c.stack.slice(0, 5).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <div className="foot">
          <Link className="btn solid" to={casePath(c.slug)} viewTransition>
            사례 보기
          </Link>
        </div>
      </div>
    </article>
  );
}
