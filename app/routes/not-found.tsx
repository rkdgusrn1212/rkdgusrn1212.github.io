import { Link } from "react-router";

export function meta() {
  return [{ title: "없는 페이지 · 강현구" }, { name: "robots", content: "noindex" }];
}

export default function NotFound() {
  return (
    <main className="wrap page">
      <p className="eyebrow">404</p>
      <h1 className="display">없는 페이지입니다</h1>
      <p className="lede">주소가 바뀌었거나 사라진 페이지입니다. 옛 블로그 글은 9 Log 블로그로 옮겨졌습니다.</p>
      <div className="tags">
        <Link className="btn solid" to="/">
          홈으로
        </Link>
        <a className="btn" href="https://khgkjg12.blogspot.com" target="_blank" rel="noopener">
          9 Log 블로그 ↗
        </a>
      </div>
    </main>
  );
}
