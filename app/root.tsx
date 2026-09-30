import { useEffect, useState } from "react";
import { isRouteErrorResponse, Link, Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "react-router";

import type { Route } from "./+types/root";
import { profileLinks, SITE_NAME } from "./lib/site";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap" },
];

// 페이지별 meta가 없는 경우(404.html로 쓰이는 SPA 폴백)에만 쓰이는 기본값
export const meta: Route.MetaFunction = () => [{ title: SITE_NAME }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* 옛 9LOG 블로그처럼 라이트 한 가지로 간다 */}
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#2DC677" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const SECTIONS = [
  { id: "career", label: "경력" },
  { id: "skills", label: "기술" },
  { id: "projects", label: "프로젝트" },
  { id: "history", label: "연혁" },
];

/** 홈에서 지금 보고 있는 구역을 상단 바에 표시한다 */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled || !("IntersectionObserver" in window)) return setActive(null);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [enabled]);
  return active;
}

export default function App() {
  const { pathname } = useLocation();
  const active = useActiveSection(pathname === "/");
  return (
    <>
      <header className="topbar">
        <div className="wrap topbar-in">
          <Link to="/" className="brand">
            {SITE_NAME}
          </Link>
          <nav className="topnav" aria-label="바로가기">
            {SECTIONS.map((s) => (
              <Link key={s.id} to={{ pathname: "/", hash: `#${s.id}` }} className={active === s.id ? "on" : undefined}>
                {s.label}
              </Link>
            ))}
            <a href="#contact">연락</a>
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className="footer" id="contact">
        <div className="wrap footer-in">
          <h2>함께 일해요</h2>
          <p>새 프로젝트나 협업 제안은 편하게 연락 주세요.</p>
          <nav className="pills" aria-label="연락처">
            {profileLinks.map((l) => (
              <a key={l.href} className="pill" href={l.href} {...(l.href.startsWith("http") && { target: "_blank", rel: "noopener" })}>
                {l.label}
              </a>
            ))}
          </nav>
          <p className="copyright">
            © {__BUILD_YEAR__} {SITE_NAME} (Hyungu Kang)
          </p>
        </div>
      </footer>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main className="wrap page">
      <p className="eyebrow">{notFound ? "404" : "오류"}</p>
      <h1 className="display">{notFound ? "없는 페이지입니다" : "문제가 생겼습니다"}</h1>
      <p className="lede">{notFound ? "주소가 바뀌었거나 사라진 페이지입니다." : "잠시 후 다시 시도해 주세요."}</p>
      <p>
        <Link className="btn solid" to="/">
          홈으로
        </Link>
      </p>
      {import.meta.env.DEV && error instanceof Error && (
        <pre className="dev-stack">
          <code>{error.stack}</code>
        </pre>
      )}
    </main>
  );
}
