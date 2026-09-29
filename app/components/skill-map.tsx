import { useState } from "react";

import { evidence, evidenceKinds, evidenceYears, type EvidenceKind } from "~/data/evidence";
import { domains, type DomainId } from "~/data/profile";

const KIND_ORDER: EvidenceKind[] = ["career", "project", "repo", "profile", "post"];
const itemsOf = (id: DomainId) =>
  evidence
    .filter((e) => e.domains.includes(id))
    .sort((a, b) => KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind) || b.sortYear - a.sortYear);

/** 분야를 고르면 그 분야의 근거(경력·프로젝트·공개 저장소·글)를 보여준다. 선택 상태는 홈이 갖는다 */
export function SkillMap({ domain, onDomain }: { domain: DomainId; onDomain: (d: DomainId) => void }) {
  return (
    <div className="map">
      <ul className="domains grad-border" aria-label="기술 분야">
        {domains.map((d) => {
          const items = itemsOf(d.id);
          const years = new Set(items.map((e) => e.sortYear));
          return (
            <li key={d.id}>
              <button type="button" aria-pressed={d.id === domain} onClick={() => onDomain(d.id)}>
                <span className="nm">{d.name}</span>
                <span className="ct">근거 {items.length}</span>
                <span className="years" aria-hidden="true">
                  {evidenceYears.map((y) => (
                    <i key={y} className={years.has(y) ? "on" : undefined} title={String(y)} />
                  ))}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {/* 분야가 바뀌면 종류 필터를 처음 상태로 되돌리려고 key를 준다 */}
      <EvidencePanel key={domain} domain={domain} />
    </div>
  );
}

function EvidencePanel({ domain }: { domain: DomainId }) {
  const [kind, setKind] = useState<EvidenceKind | "all">("all");
  const d = domains.find((x) => x.id === domain)!;
  const items = itemsOf(domain);
  const counts = new Map<EvidenceKind, number>();
  items.forEach((e) => counts.set(e.kind, (counts.get(e.kind) ?? 0) + 1));
  const years = items.map((e) => e.sortYear);
  const [y0, y1] = [Math.min(...years), Math.max(...years)];
  const shown = items.filter((e) => kind === "all" || e.kind === kind);

  return (
    <div className="card evidence" aria-live="polite">
      <div className="ev-head">
        <h3>{d.name}</h3>
        <div className="chipset" role="group" aria-label="근거 종류">
          <button type="button" aria-pressed={kind === "all"} onClick={() => setKind("all")}>
            전체 {items.length}
          </button>
          {KIND_ORDER.filter((k) => counts.has(k)).map((k) => (
            <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)}>
              {evidenceKinds[k]} {counts.get(k)}
            </button>
          ))}
        </div>
      </div>
      <p className="stack-line">
        <b>활동</b> · {y0 === y1 ? y0 : `${y0}–${y1}`}년 · 근거 {items.length}건
      </p>
      <ul className="ev-list">
        {shown.map((e) => (
          <li key={e.title}>
            <span className={`kind ${e.kind}`}>{evidenceKinds[e.kind]}</span>
            {e.href ? (
              <a href={e.href} target="_blank" rel="noopener">
                {e.title} ↗
              </a>
            ) : (
              <span className="ttl">{e.title}</span>
            )}
            <span className="yr">{e.year}</span>
            <p className="note">{e.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
