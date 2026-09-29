import type { Route } from "./+types/legacy-post";
import bloggerMap from "~/data/blogger-map.json";

// 옛 블로그 주소 /posts/N. 글은 2026-09 Blogger로 옮겼다.
// GitHub Pages는 서버 301을 못 하므로 meta refresh + canonical로 넘긴다.
export function loader({ params }: Route.LoaderArgs) {
  const hit = bloggerMap.posts.find((p) => p.oldPath === `/posts/${params.n}`);
  if (!hit) throw new Response("Not Found", { status: 404 });
  return { url: hit.bloggerUrl, title: hit.title };
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: loaderData.title },
    { name: "robots", content: "noindex" },
    { httpEquiv: "refresh", content: `0; url=${loaderData.url}` },
    { tagName: "link", rel: "canonical", href: loaderData.url },
  ];
}

export default function LegacyPost({ loaderData }: Route.ComponentProps) {
  return (
    <main className="wrap page">
      <p className="eyebrow">옮겨진 글</p>
      <p className="lede">
        이 글은 블로그로 옮겨졌습니다. <a href={loaderData.url}>{loaderData.title}</a>
      </p>
    </main>
  );
}
