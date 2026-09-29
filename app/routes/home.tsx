import { Link } from "react-router";

import type { Route } from "./+types/home";
import { gomokuWeb, projects } from "~/data/projects";
import { profileLinks, seo } from "~/lib/site";

export function meta({}: Route.MetaArgs) {
  return seo({
    description: "8년째 운영 중인 오목 앱부터 팀장으로 이끈 웹 프로젝트까지, 한 수씩 끝까지 두는 개발자 강현구의 포트폴리오.",
    path: "/",
  });
}

// P1 뼈대: 장 구성과 내용만 잡는다. 스크롤에 맞춰 움직이는 장면(stage)은 P2에서 만든다.
export default function Home() {
  return (
    <main className="wrap">
      <section className="page">
        <p className="eyebrow">강현구 · 세 판의 기록</p>
        <h1 className="display">
          한 수씩,
          <br />
          끝까지.
        </h1>
        <p className="lede">
          8년째 운영 중인 오목 앱부터 팀장으로 이끈 웹 프로젝트까지. 스크롤을 내리면 한 수씩 진행된다.
        </p>
      </section>

      {projects.map((p) => (
        <section key={p.slug} className="chapter" id={`ch-${p.slug}`}>
          <div className="ch-text">
            <span className="num">
              제{p.move.n}수 · {p.move.coord}
            </span>
            <h2>{p.title}</h2>
            <p>{p.summary}</p>
            <div className="chips">
              {p.role && <span className="chip hot">{p.role}</span>}
              <span className="chip">{p.period}</span>
              {p.stack.slice(0, 3).map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
            {p.slug === "gomoku" && (
              <p>
                같은 판을 브라우저로 옮긴 웹 체험판({gomokuWeb.released})은 블로그에서 둘 수 있다.{" "}
                <a href={gomokuWeb.link.href} target="_blank" rel="noopener">
                  {gomokuWeb.link.label} ↗
                </a>
              </p>
            )}
            <div>
              <Link className="btn primary" to={`/projects/${p.slug}`} viewTransition>
                자세히 보기 →
              </Link>
            </div>
          </div>
          <div className="stage" aria-hidden="true">
            <span className="caption">장면 연출 자리 (P2)</span>
          </div>
        </section>
      ))}

      <section className="page" style={{ borderTop: "1px solid var(--hair)" }}>
        <p className="eyebrow">다음 수</p>
        <h2 className="display" style={{ fontSize: "clamp(34px,5vw,56px)" }}>
          다음 수는
          <br />
          함께 둘 차례
        </h2>
        <div className="chips">
          {profileLinks.map((l, i) => (
            <a key={l.href} className={`btn${i === 0 ? " primary" : ""}`} href={l.href} target="_blank" rel="noopener">
              {l.label} ↗
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
