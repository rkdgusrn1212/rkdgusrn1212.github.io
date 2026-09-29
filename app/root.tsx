import { isRouteErrorResponse, Link, Links, Meta, NavLink, Outlet, Scripts, ScrollRestoration } from "react-router";

import type { Route } from "./+types/root";
import { projects } from "./data/projects";
import { profileLinks, SITE_NAME } from "./lib/site";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Hahmlet:wght@400;600;800&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+KR:wght@400;500;600&display=swap",
  },
];

// 페이지별 meta가 없는 경우(404.html로 쓰이는 SPA 폴백)에만 쓰이는 기본값
export const meta: Route.MetaFunction = () => [{ title: SITE_NAME }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="color-scheme" content="light dark" />
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

export default function App() {
  return (
    <>
      <header className="topbar">
        <div className="wrap topbar-in">
          <Link to="/" className="brand">
            {SITE_NAME}
          </Link>
          <nav className="topnav" aria-label="프로젝트">
            {projects.map((p) => (
              <NavLink key={p.slug} to={`/projects/${p.slug}`} viewTransition>
                {p.title}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className="wrap site-footer">
        <nav className="chips" aria-label="연락처">
          {profileLinks.map((l) => (
            <a key={l.href} className="btn" href={l.href} target="_blank" rel="noopener">
              {l.label} ↗
            </a>
          ))}
        </nav>
        <p className="caption">© {new Date().getFullYear()} 강현구 (Hyungu Kang)</p>
      </footer>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main className="wrap page">
      <p className="eyebrow">{notFound ? "404" : "오류"}</p>
      <h1 className="display">{notFound ? "없는 수입니다" : "문제가 생겼습니다"}</h1>
      <p className="lede">
        {notFound ? "주소가 바뀌었거나 사라진 페이지입니다." : "잠시 후 다시 시도해 주세요."}
      </p>
      <p>
        <Link className="btn primary" to="/">
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
