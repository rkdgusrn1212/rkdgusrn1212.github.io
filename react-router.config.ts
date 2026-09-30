import type { Config } from "@react-router/dev/config";
import bloggerMap from "./app/data/blogger-map.json" with { type: "json" };
import { cases } from "./app/data/cases";
import { projects } from "./app/data/projects";

// GitHub Pages는 정적 호스팅이라 서버 없이(ssr: false) 빌드 시점에 모든 페이지를 HTML로 만든다.
export default {
  ssr: false,
  prerender: [
    "/",
    ...projects.map((p) => `/projects/${p.slug}`),
    ...cases.map((c) => `/work/${c.slug}`),
    "/not-found",
    "/sitemap.xml",
    // 옛 블로그 주소 /posts/0~29 → Blogger로 이동시키는 페이지
    ...bloggerMap.posts.map((p) => p.oldPath),
  ],
} satisfies Config;
