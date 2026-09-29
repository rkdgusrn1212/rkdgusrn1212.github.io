import { projects } from "~/data/projects";
import { canonicalUrl } from "~/lib/site";

// 빌드 때 /sitemap.xml 파일로 만들어진다. 배포 후 smoke 검사도 이 목록을 기준으로 돈다.
export function loader() {
  const paths = ["/", ...projects.map((p) => `/projects/${p.slug}`)];
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    paths.map((p) => `  <url><loc>${canonicalUrl(p)}</loc></url>`).join("\n") +
    `\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
