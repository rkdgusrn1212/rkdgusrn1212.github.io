import { useState } from "react";

// 결과 기능의 개념 예시. 가상의 지질 검사에 교과서 산식(Friedewald)을 쓴다. 실제 화면·산식 구현과 무관하다.
type Key = "tc" | "hdl" | "tg" | "ldl";
type Vals = Record<"tc" | "hdl" | "tg", number>;

const ITEMS: { key: Key; name: string; ref: string; high?: number; low?: number }[] = [
  { key: "tc", name: "총콜레스테롤", ref: "< 200", high: 200 },
  { key: "hdl", name: "HDL 콜레스테롤", ref: "≥ 40", low: 40 },
  { key: "tg", name: "중성지방", ref: "< 150", high: 150 },
  { key: "ldl", name: "LDL 콜레스테롤 (산식)", ref: "< 130", high: 130 },
];

const PAST: { date: string; v: Vals }[] = [
  { date: "23.03", v: { tc: 232, hdl: 41, tg: 190 } },
  { date: "23.06", v: { tc: 221, hdl: 43, tg: 170 } },
  { date: "23.09", v: { tc: 208, hdl: 45, tg: 150 } },
  { date: "23.12", v: { tc: 199, hdl: 47, tg: 140 } },
];
const TODAY = "24.03";

/** LDL = 총콜레스테롤 − HDL − 중성지방/5. 중성지방 400 이상이면 쓰지 않는다 */
const ldl = (v: Vals) => (v.tg >= 400 ? null : Math.round(v.tc - v.hdl - v.tg / 5));
const valueOf = (v: Vals, k: Key) => (k === "ldl" ? ldl(v) : v[k]);
const flag = (k: Key, n: number | null) => {
  const it = ITEMS.find((i) => i.key === k)!;
  if (n === null) return "";
  if (it.high !== undefined && n >= it.high) return "H";
  if (it.low !== undefined && n < it.low) return "L";
  return "";
};

type Log = { no: number; time: string; text: string };

export function ResultDemo() {
  const [draft, setDraft] = useState<Vals>({ tc: 186, hdl: 50, tg: 120 });
  const [saved, setSaved] = useState<Vals | null>(null);
  const [logs, setLogs] = useState<Log[]>([]);
  const [chart, setChart] = useState<Key>("ldl");

  const dirty = !saved || (Object.keys(draft) as (keyof Vals)[]).some((k) => draft[k] !== saved[k]);

  const save = () => {
    if (!dirty) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    const changes = saved
      ? (Object.keys(draft) as (keyof Vals)[])
          .filter((k) => draft[k] !== saved[k])
          .map((k) => `${ITEMS.find((i) => i.key === k)!.name} ${saved[k]} → ${draft[k]}`)
      : ["최초 저장"];
    setLogs((l) => [{ no: l.length + 1, time, text: changes.join(", ") }, ...l]);
    setSaved(draft);
  };

  // 추이 그래프: 지난 결과 + 저장된 오늘 결과
  const series = [...PAST.map((p) => ({ date: p.date, n: valueOf(p.v, chart) })), ...(saved ? [{ date: TODAY, n: valueOf(saved, chart) }] : [])];
  const nums = series.map((p) => p.n).filter((n): n is number => n !== null);
  const refLine = ITEMS.find((i) => i.key === chart)!;
  const limit = refLine.high ?? refLine.low!;
  const lo = Math.min(...nums, limit) - 15;
  const hi = Math.max(...nums, limit) + 15;
  const W = 300;
  const H = 120;
  const x = (i: number) => 24 + (i * (W - 40)) / 4;
  const y = (n: number) => 10 + ((hi - n) / (hi - lo)) * (H - 30);
  const pts = series.map((p, i) => (p.n === null ? null : [x(i), y(p.n)] as const));

  return (
    <div className="demo rs">
      <div className="rs-grid">
        <table className="rs-table">
          <thead>
            <tr>
              <th>항목</th>
              <th>결과 ({TODAY})</th>
              <th>참고치</th>
            </tr>
          </thead>
          <tbody>
            {ITEMS.map((it) => {
              const n = it.key === "ldl" ? ldl(draft) : draft[it.key];
              const f = flag(it.key, n);
              return (
                <tr key={it.key}>
                  <th scope="row">{it.name}</th>
                  <td>
                    {it.key === "ldl" ? (
                      <span className="rs-calc" title="총콜레스테롤 − HDL − 중성지방/5">
                        {n === null ? "산식 적용 불가" : n}
                      </span>
                    ) : (
                      <input
                        type="number"
                        inputMode="numeric"
                        value={draft[it.key]}
                        aria-label={`${it.name} 결과`}
                        onChange={(e) => setDraft((d) => ({ ...d, [it.key]: Math.max(0, Number(e.target.value) || 0) }))}
                      />
                    )}
                    {f && <b className={`rs-flag ${f}`}>{f}</b>}
                  </td>
                  <td className="rs-ref">{it.ref}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="rs-side">
          <div className="chipset" role="group" aria-label="추이 항목">
            {ITEMS.map((it) => (
              <button key={it.key} type="button" aria-pressed={chart === it.key} onClick={() => setChart(it.key)}>
                {it.name.replace(" 콜레스테롤", "").replace(" (산식)", "")}
              </button>
            ))}
          </div>
          <svg className="rs-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${refLine.name} 결과 추이`}>
            <line x1={16} x2={W - 8} y1={y(limit)} y2={y(limit)} className="rs-limit" />
            <text x={W - 10} y={y(limit) - 4} textAnchor="end" className="rs-limit-t">
              참고치 {refLine.ref}
            </text>
            <polyline points={pts.filter(Boolean).map((p) => p!.join(",")).join(" ")} className="rs-line" />
            {series.map((p, i) =>
              pts[i] ? (
                <g key={p.date}>
                  <circle cx={pts[i]![0]} cy={pts[i]![1]} r={i === 4 ? 4.5 : 3} className={i === 4 ? "rs-now" : "rs-dot"} />
                  <text x={pts[i]![0]} y={pts[i]![1] - 8} textAnchor="middle" className="rs-val">
                    {p.n}
                  </text>
                </g>
              ) : null,
            )}
            {series.map((p, i) => (
              <text key={p.date} x={x(i)} y={H - 4} textAnchor="middle" className="rs-date">
                {p.date}
              </text>
            ))}
          </svg>
          {!saved && <p className="caption">결과를 저장하면 {TODAY} 결과가 추이에 더해집니다.</p>}
        </div>
      </div>

      <div className="rs-foot">
        <button type="button" className="btn solid" onClick={save} disabled={!dirty}>
          {saved ? "수정 저장" : "결과 저장"}
        </button>
        <span className="caption">값을 바꿔 다시 저장하면 수정 이력이 쌓입니다. 중성지방이 400 이상이면 LDL 산식을 쓰지 않습니다.</span>
      </div>

      <ol className="rs-log" aria-label="수정 이력" aria-live="polite">
        {logs.length === 0 && <li className="rs-empty">아직 저장한 결과가 없습니다.</li>}
        {logs.map((l) => (
          <li key={l.no}>
            <b>v{l.no}</b>
            <span>{l.time}</span>
            {l.text}
          </li>
        ))}
      </ol>
    </div>
  );
}
