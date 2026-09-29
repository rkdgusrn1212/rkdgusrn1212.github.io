import { useState } from "react";

import { gomokuShots, SHOT_HEIGHT, SHOT_WIDTH } from "~/routes/projects/gomoku/shots";

/**
 * 오목판 실제 화면 둘러보기. 화면을 보여주기만 하고, 둘 수 있는 판은 만들지 않는다
 * (웹 체험판은 광고가 있는 블로그 글로만 연결하는 설계).
 */
export function GomokuScreens({ compact = false }: { compact?: boolean }) {
  const shots = compact ? gomokuShots.filter((s) => s.inCard) : gomokuShots;
  const [i, setI] = useState(0);
  const cur = shots[i];
  return (
    <div className={`gm${compact ? " compact" : ""}`}>
      <div className="phone">
        <img src={cur.src} alt={cur.alt} width={SHOT_WIDTH} height={SHOT_HEIGHT} loading={compact ? "lazy" : "eager"} />
      </div>
      <div className="modes" role="group" aria-label="화면 고르기">
        {shots.map((s, j) => (
          <button key={s.label} type="button" aria-pressed={j === i} onClick={() => setI(j)}>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
