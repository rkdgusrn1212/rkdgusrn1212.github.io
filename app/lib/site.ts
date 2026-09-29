export const SITE_URL = "https://rkdgusrn1212.github.io";
export const SITE_NAME = "강현구";

export const profileLinks = [
  { label: "GitHub", href: "https://github.com/rkdgusrn1212" },
  { label: "solved.ac", href: "https://solved.ac/profile/khgkjg12" },
  { label: "9 Log 블로그", href: "https://khgkjg12.blogspot.com" },
];

/** GitHub Pages는 /projects/gomoku를 /projects/gomoku/로 301 이동시키므로, 대표 주소는 실제로 응답하는 슬래시 형태로 쓴다. */
export const canonicalUrl = (path: string) => SITE_URL + (path.endsWith("/") ? path : `${path}/`);

/** 페이지마다 제목·설명·공유 미리보기·canonical을 한 번에 만든다. */
export function seo({ title, description, path }: { title?: string; description: string; path: string }) {
  const url = canonicalUrl(path);
  const fullTitle = title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} · 한 수씩, 끝까지`;
  return [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { tagName: "link", rel: "canonical", href: url },
  ];
}
