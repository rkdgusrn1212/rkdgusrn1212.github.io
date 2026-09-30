import { useState } from "react";

// 클렌징 단계가 앞 단계의 칼럼에 기대는 구조. 데이터셋 칼럼을 지우면 뒤 단계가 연쇄로 깨진다. 가상 예시.
// 결과 미리보기는 "가공 전에는 칼럼 제목만 보여 준다"는 규칙대로 값을 보여 주지 않는다.
const SOURCE = ["가명ID", "나이", "키", "체중", "검사일"];

type Step = { id: string; kind: string; text: string; uses: string[]; makes?: string };
const STEPS: Step[] = [
  { id: "bmi", kind: "칼럼 추가", text: "BMI = 체중 ÷ 키²", uses: ["키", "체중"], makes: "BMI" },
  { id: "outlier", kind: "이상치 제거", text: "BMI 10 미만 · 60 초과 제외", uses: ["BMI"] },
  { id: "adult", kind: "조건", text: "나이 19세 이상", uses: ["나이"] },
  { id: "band", kind: "칼럼 추가", text: "연령대 = 나이 10살 단위", uses: ["나이"], makes: "연령대" },
];

/** 지운 원천 칼럼에서 출발해 깨지는 단계와 그 이유(빠진 칼럼)를 앞에서부터 계산한다 */
function analyze(removed: string[]) {
  const have = new Set(SOURCE.filter((c) => !removed.includes(c)));
  const broken = new Map<string, string[]>();
  for (const s of STEPS) {
    const missing = s.uses.filter((u) => !have.has(u));
    if (missing.length) broken.set(s.id, missing);
    else if (s.makes) have.add(s.makes);
  }
  return { broken, columns: [...have] };
}

export function CleansingDemo() {
  const [removed, setRemoved] = useState<string[]>([]);
  const [cleaned, setCleaned] = useState<string[]>([]);
  const { broken, columns } = analyze(removed);
  const pending = [...broken.keys()].filter((id) => !cleaned.includes(id));

  const reset = () => {
    setRemoved([]);
    setCleaned([]);
  };

  return (
    <div className="demo cl">
      <div className="cl-src">
        <span className="cl-title">데이터셋 칼럼 · 조인과 필터로 만든 결과</span>
        <div className="tags">
          {SOURCE.map((c) =>
            removed.includes(c) ? (
              <span key={c} className="tag cl-gone">
                {c}
              </span>
            ) : (
              <button key={c} type="button" className="tag cl-col" onClick={() => setRemoved((r) => [...r, c])} aria-label={`${c} 칼럼 삭제`}>
                {c} <span aria-hidden="true">✕</span>
              </button>
            ),
          )}
        </div>
      </div>

      <ol className="cl-steps">
        {STEPS.map((s, k) => {
          const miss = broken.get(s.id);
          const state = !miss ? "" : cleaned.includes(s.id) ? " cleaned" : " broken";
          return (
            <li key={s.id} className={`cl-step${state}`}>
              <i>{k + 1}</i>
              <div>
                <span className="cl-kind">{s.kind}</span>
                <b>{s.text}</b>
                {miss && <small>{cleaned.includes(s.id) ? "함께 정리됨" : `'${miss.join("', '")}' 칼럼이 없어 실행할 수 없음`}</small>}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="cl-out" aria-live="polite">
        <span className="cl-title">결과 미리보기</span>
        {pending.length ? (
          <p className="cc-result bad">정리하지 않은 단계 {pending.length}개 · 실행 불가</p>
        ) : (
          <div className="cl-preview" role="table" aria-label="결과 미리보기">
            <div role="row">
              {columns.map((c) => (
                <span key={c} role="columnheader">
                  {c}
                </span>
              ))}
            </div>
            <p>가공 전에는 칼럼 제목만 보여 줍니다</p>
          </div>
        )}
      </div>

      <div className="foot">
        {pending.length > 0 && (
          <button type="button" className="btn solid" onClick={() => setCleaned((c) => [...c, ...pending])}>
            연결된 단계 {pending.length}개 정리
          </button>
        )}
        {removed.length > 0 && (
          <button type="button" className="btn" onClick={reset}>
            처음으로
          </button>
        )}
        {removed.length === 0 && <p className="caption">데이터셋 칼럼의 ✕를 눌러 지워 보세요. 예: 키</p>}
      </div>
    </div>
  );
}
