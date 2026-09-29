import { useEffect, useRef, useState } from "react";

// 강호신 LIS의 업무 흐름(환자 접수 → 결과 입력)을 버튼 하나로 따라가 보는 체험. 검체 그래픽은 연출용이다.
const STATIONS = ["무인 접수", "진료·처방", "채혈 접수", "결과 입력"];
const LOGS = ["등록 여부 조회 · 방문 접수", "검사 처방 일괄 오더", "간호사 채혈 접수", "검사 결과 입력 완료"];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function LisFlow() {
  const [reached, setReached] = useState(0); // 이번 접수가 지나간 단계 수
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const start = () => {
    if (running) return;
    const gap = prefersReducedMotion() ? 0 : 700;
    setRunning(true);
    setReached(0);
    STATIONS.forEach((_, k) => timers.current.push(window.setTimeout(() => setReached(k + 1), k * gap)));
    timers.current.push(
      window.setTimeout(() => {
        setDone((d) => d + 1);
        setRunning(false);
      }, STATIONS.length * gap + (gap ? 600 : 0)),
    );
  };

  const at = running ? Math.max(reached - 1, 0) : 0;
  const log = running && reached > 0 ? `${String(done + 1).padStart(3, "0")} · ${LOGS[reached - 1]}` : done ? `완료 · ${done}건 처리` : "대기 중 · 0건 처리";

  return (
    <div className="lis">
      <div className="lis-track">
        <div className="tube" style={{ transform: `translateX(calc(${at} * (100% + 5px)))` }} aria-hidden="true">
          <svg viewBox="0 0 16 30">
            <rect x="3" y="1" width="10" height="4" rx="1" fill="#FF9E30" />
            <path d="M4 5 H12 V24 A4 4 0 0 1 4 24 Z" fill="#fff" stroke="#1E2320" strokeWidth={1.2} />
            <path d="M4.6 15 H11.4 V24 A3.4 3.4 0 0 1 4.6 24 Z" fill="#D0392B" opacity={0.75} />
          </svg>
        </div>
        {STATIONS.map((s, i) => (
          <div key={s} className={`stn${i < reached ? " done" : ""}`}>
            {s}
          </div>
        ))}
      </div>
      <p className="lis-log" aria-live="polite">
        {log}
      </p>
      <div>
        <button type="button" className="btn solid" onClick={start} disabled={running}>
          {done ? "다음 환자 접수" : "환자 접수하기"}
        </button>
      </div>
    </div>
  );
}
