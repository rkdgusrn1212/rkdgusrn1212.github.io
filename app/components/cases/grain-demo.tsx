import { useMemo, useState } from "react";

// 같은 통계를 원천(검사 항목 단위) 행에서 셀 때와 집계 최소 단위 데이터셋에서 셀 때를 비교한다.
// 데이터는 고정 시드로 만든 가상 값이다. 실제 규모·구조와 무관하다.
const CENTERS = ["A센터", "B센터", "C센터"];
const TYPES = [
  { name: "일반", items: 20 },
  { name: "종합", items: 60 },
  { name: "암", items: 15 },
  { name: "특수", items: 25 },
];
const DAYS = 365;

type Agg = { day: number; center: number; type: number; people: number };

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 일자 × 센터 × 검진 종류마다 수검자 수를 만든다. 수검자가 없는 조합은 집계 행이 생기지 않는다 */
function build(): Agg[] {
  const rand = mulberry32(2025);
  const rows: Agg[] = [];
  for (let day = 0; day < DAYS; day++)
    for (let center = 0; center < CENTERS.length; center++)
      for (let type = 0; type < TYPES.length; type++) {
        const people = Math.floor(rand() * rand() * 7);
        if (people) rows.push({ day, center, type, people });
      }
  return rows;
}

const PERIODS = [
  { label: "최근 1개월", days: 31 },
  { label: "최근 3개월", days: 92 },
  { label: "1년", days: 365 },
];

const fmt = (n: number) => n.toLocaleString("ko-KR");
const dateOf = (day: number) => {
  const d = new Date(Date.UTC(2025, 0, 1 + day));
  return `2025-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
};

export function GrainDemo() {
  const data = useMemo(build, []);
  const [center, setCenter] = useState(-1);
  const [period, setPeriod] = useState(1);

  const from = DAYS - PERIODS[period].days;
  const hit = data.filter((r) => r.day >= from && (center < 0 || r.center === center));
  const people = hit.reduce((s, r) => s + r.people, 0);
  // 원천은 수검자 한 명이 검사 항목 수만큼 행을 가진다고 본다
  const rawRows = hit.reduce((s, r) => s + r.people * TYPES[r.type].items, 0);
  const aggRows = hit.length;

  return (
    <div className="demo gr">
      <div className="gr-controls">
        <div className="chipset" role="group" aria-label="센터">
          {["전체", ...CENTERS].map((c, k) => (
            <button key={c} type="button" aria-pressed={center === k - 1} onClick={() => setCenter(k - 1)}>
              {c}
            </button>
          ))}
        </div>
        <div className="chipset" role="group" aria-label="기간">
          {PERIODS.map((p, k) => (
            <button key={p.label} type="button" aria-pressed={period === k} onClick={() => setPeriod(k)}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <p className="gr-answer" aria-live="polite">
        수검자 <b>{fmt(people)}명</b>
        <span>두 방식의 결과는 같습니다</span>
      </p>

      <div className="gr-bars">
        <div>
          <span>원천 행에서 바로 집계 · 검사 항목 단위</span>
          <div className="gr-bar raw" style={{ width: "100%" }}>
            {fmt(rawRows)}행
          </div>
        </div>
        <div>
          <span>집계 최소 단위 데이터셋에서 합산</span>
          <div className="gr-bar agg" style={{ width: `max(${(aggRows / rawRows) * 100}%, 5.5em)` }}>
            {fmt(aggRows)}행
          </div>
        </div>
      </div>

      <div className="gr-table" role="table" aria-label="집계 데이터셋 예시">
        <div role="row" className="gr-th">
          <span role="columnheader">일자 🔑</span>
          <span role="columnheader">센터 🔑</span>
          <span role="columnheader">검진 종류 🔑</span>
          <span role="columnheader">수검자</span>
        </div>
        {hit.slice(-3).map((r) => (
          <div role="row" key={`${r.day}-${r.center}-${r.type}`}>
            <span role="cell">{dateOf(r.day)}</span>
            <span role="cell">{CENTERS[r.center]}</span>
            <span role="cell">{TYPES[r.type].name}</span>
            <span role="cell">{r.people}</span>
          </div>
        ))}
      </div>
      <p className="caption">🔑 유일 키 · 일자, 센터, 검진 종류 조합마다 한 행만 두고 배치로 갱신합니다.</p>
    </div>
  );
}
