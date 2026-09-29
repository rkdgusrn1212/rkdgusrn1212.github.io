import { useState } from "react";

// 상하의 트위스트의 핵심 기능(상의·하의를 따로 넘기며 맞춰보기)을 작게 떼어 온 체험. 옷 그림은 연출용이다.
const SHAPES = {
  tee: "M30 10 L50 4 Q60 13 70 4 L90 10 L110 30 L96 42 L88 34 L88 86 L32 86 L32 34 L24 42 L10 30 Z",
  shirt: "M30 10 L50 4 L60 16 L70 4 L90 10 L110 30 L96 42 L88 34 L88 86 L32 86 L32 34 L24 42 L10 30 Z",
  hoodie: "M30 14 Q60 -8 90 14 L110 36 L96 48 L88 40 L88 86 L32 86 L32 40 L24 48 L10 36 Z",
  knit: "M34 8 L50 4 Q60 13 70 4 L86 8 L112 72 L98 78 L88 42 L88 86 L32 86 L32 42 L22 78 L8 72 Z",
  jeans: "M30 4 L90 4 L94 104 L66 104 L60 40 L54 104 L26 104 Z",
  slacks: "M31 4 L89 4 L92 104 L65 104 L60 38 L55 104 L28 104 Z",
  skirt: "M34 4 L86 4 L104 96 L16 96 Z",
  shorts: "M30 4 L90 4 L96 60 L66 60 L60 30 L54 60 L24 60 Z",
};

type Garment = { name: string; color: string; shape: keyof typeof SHAPES };

const TOPS: Garment[] = [
  { name: "화이트 셔츠", color: "#F3F1EA", shape: "shirt" },
  { name: "네이비 니트", color: "#2F3B55", shape: "knit" },
  { name: "그레이 후디", color: "#8D949C", shape: "hoodie" },
  { name: "레드 티셔츠", color: "#C4473B", shape: "tee" },
];
const BOTTOMS: Garment[] = [
  { name: "데님 팬츠", color: "#39506E", shape: "jeans" },
  { name: "베이지 슬랙스", color: "#CDBB98", shape: "slacks" },
  { name: "블랙 스커트", color: "#1D1F22", shape: "skirt" },
  { name: "카키 쇼츠", color: "#7A7A4E", shape: "shorts" },
];

function GarmentSvg({ g, part }: { g: Garment; part: "top" | "bottom" }) {
  return (
    <svg viewBox={part === "top" ? "0 -10 120 100" : "0 0 120 110"} aria-hidden="true">
      <path d={SHAPES[g.shape]} fill={g.color} stroke="rgba(0,0,0,.25)" strokeWidth={1.2} strokeLinejoin="round" />
    </svg>
  );
}

export function OutfitMatch() {
  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(1);
  const step = (n: number, d: number) => (n + d + 4) % 4;
  return (
    <div className="mm">
      <button type="button" className="arrow" aria-label="이전 상의" onClick={() => setTop((n) => step(n, -1))}>
        ‹
      </button>
      <GarmentSvg g={TOPS[top]} part="top" />
      <button type="button" className="arrow" aria-label="다음 상의" onClick={() => setTop((n) => step(n, 1))}>
        ›
      </button>
      <button type="button" className="arrow" aria-label="이전 하의" onClick={() => setBottom((n) => step(n, -1))}>
        ‹
      </button>
      <GarmentSvg g={BOTTOMS[bottom]} part="bottom" />
      <button type="button" className="arrow" aria-label="다음 하의" onClick={() => setBottom((n) => step(n, 1))}>
        ›
      </button>
      <p className="mm-name" aria-live="polite">
        {TOPS[top].name} + {BOTTOMS[bottom].name}
      </p>
    </div>
  );
}
