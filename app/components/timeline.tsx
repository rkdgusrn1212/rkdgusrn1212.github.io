import { useState } from "react";

import { timeline, timelineKinds, type TimelineKind } from "~/data/profile";

const KINDS = Object.keys(timelineKinds) as TimelineKind[];

/** 연혁 (연대순). 수상만, 경력만처럼 종류별로 걸러 볼 수 있다 */
export function Timeline() {
  const [kind, setKind] = useState<TimelineKind | "all">("all");
  const shown = timeline.filter((x) => kind === "all" || x.kind === kind);
  return (
    <>
      <div className="sec-head">
        <h2 id="history-title">
          연혁 <span>· 연대순</span>
        </h2>
        <div className="chipset" role="group" aria-label="연혁 종류">
          <button type="button" aria-pressed={kind === "all"} onClick={() => setKind("all")}>
            전체
          </button>
          {KINDS.map((k) => (
            <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)}>
              {timelineKinds[k]} {timeline.filter((x) => x.kind === k).length}
            </button>
          ))}
        </div>
      </div>
      <div className="card tl-wrap">
        <ol className="timeline">
          {shown.map((x) => (
            <li key={`${x.date}-${x.title}`} className={x.kind}>
              <span className="d">{x.date}</span>
              <span className="t">
                <span className="k">{timelineKinds[x.kind].split(" · ")[0]}</span>
                {x.title}
              </span>
              {x.sub && <p className="s">{x.sub}</p>}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
