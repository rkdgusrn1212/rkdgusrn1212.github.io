import { useEffect, useRef, useState } from "react";

import { Spotlight, type Box } from "~/components/spotlight";
import { bloodImgs, consultationShot, kioskImgs, testImgs, type Img } from "./shots";

// 최종 발표 자료의 업무 설명을 단계별로 나눈 것. mine = 직접 기획·개발한 파트
type Sub = { title: string; body: string; box?: Box; img?: Img };
type Step = { name: string; who: string; mine: boolean; summary: string; subs: Sub[]; shot?: typeof consultationShot };

const STEPS: Step[] = [
  {
    name: "무인 접수",
    who: "환자 · 키오스크",
    mine: true,
    summary: "환자가 스스로 등록하고 원하는 진료과의 의사에게 접수합니다. 로그인 없이 쓰는 키오스크 화면입니다.",
    subs: [
      { title: "접수 유형 선택", img: kioskImgs[0], body: "초진과 재진을 고릅니다. 결국 주민번호가 이미 있는지로 갈리지만, 유형에 따라 안내 문구를 달리했습니다." },
      { title: "주민번호 입력", img: kioskImgs[1], body: "입력하는 동안 형식을 검사하고 가려 보여 줍니다. 등록된 번호면 이름 입력을 건너뛰고 바로 진료의 선택으로 갑니다." },
      { title: "이름 · 휴대폰 번호", img: kioskImgs[2], body: "처음 온 환자만 입력합니다. 전화번호도 실시간으로 검사하고 가립니다." },
      { title: "개인정보 동의", img: kioskImgs[3], body: "동의하고 다음을 누르면 서버에 환자가 생성됩니다. 동의하지 않았거나 요청이 실패하면 안내 문구를 띄웁니다." },
      { title: "진료의 선택", img: kioskImgs[4], body: "등록된 진료의를 진료과와 함께 보여 주고, 고르면 접수가 끝납니다." },
      { title: "접수 완료 · 대기순번", img: kioskImgs[5], body: "접수가 끝나면 진료의별로 그날 접수한 순서대로 대기순번이 나가고, 그 의사의 대기 환자 목록에 뜹니다." },
    ],
  },
  {
    name: "진료 · 처방",
    who: "의사",
    mine: true,
    summary: "대기순번이나 예약 시각에 따라 환자를 골라 진료하고, 필요한 처방을 모아 한 번에 오더합니다.",
    shot: consultationShot,
    subs: consultationShot.parts,
  },
  {
    name: "채혈",
    who: "간호사",
    mine: false,
    summary: "검사 처방 오더에 필요한 검체를 채혈합니다.",
    subs: [
      { title: "채혈 접수", img: bloodImgs[0], body: "환자를 검색해 내원 정보와 처방 오더를 불러오고, 채혈할 처방을 골라 채취 목록으로 옮깁니다." },
      { title: "바코드 출력", img: bloodImgs[1], body: "고른 처방마다 검체 용기에 붙일 바코드를 출력합니다. 바코드는 검체번호로 만듭니다." },
      { title: "채혈 등록", img: bloodImgs[2], body: "바코드로 검체를 불러와 채혈자와 채혈 일시를 기록합니다. 여러 검체를 이어서 입력할 수 있습니다." },
      { title: "부적합 검체 등록", img: bloodImgs[3], body: "검체번호를 넣고 부적합 사유 코드(예: 용혈·응고)와 통보받을 의사를 고르면 부적합 검체 목록에 올라갑니다." },
    ],
  },
  {
    name: "검사",
    who: "검사실",
    mine: false,
    summary: "채혈된 검체로 검사를 접수하고 결과를 입력합니다.",
    subs: [
      { title: "검사 접수", img: testImgs[0], body: "채혈이 접수된 검체의 바코드를 입력해 검사를 접수합니다." },
      { title: "결과 입력", img: testImgs[1], body: "접수된 검체의 결과를 바코드로 불러와 입력하고, 진행 상황을 그래프로 봅니다." },
      { title: "결과 조회", img: testImgs[2], body: "환자 이름과 접수 기간으로 찾아 같은 환자의 여러 검사를 비교합니다." },
      { title: "결과 분석", img: testImgs[3], body: "고른 검사 항목을 시계열 그래프로 봅니다." },
    ],
  },
];

const PLAY_GAP = 2600;

export function LisJourney() {
  const [step, setStep] = useState(0);
  const [sub, setSub] = useState(0);
  const [playing, setPlaying] = useState(false);
  const pos = useRef({ step, sub });
  pos.current = { step, sub };

  const s = STEPS[step];
  const cur = s.subs[sub];
  const last = step === STEPS.length - 1 && sub === s.subs.length - 1;

  const go = (dir: 1 | -1) => {
    const { step: st, sub: su } = pos.current;
    const n = su + dir;
    if (n >= 0 && n < STEPS[st].subs.length) return setSub(n), true;
    const ns = st + dir;
    if (ns < 0 || ns >= STEPS.length) return false;
    setStep(ns);
    setSub(dir === 1 ? 0 : STEPS[ns].subs.length - 1);
    return true;
  };

  useEffect(() => {
    if (!playing) return;
    const t = window.setInterval(() => {
      if (!go(1)) setPlaying(false);
    }, PLAY_GAP);
    return () => window.clearInterval(t);
  }, [playing]);

  const pickStep = (i: number) => {
    setPlaying(false);
    setStep(i);
    setSub(0);
  };
  const pickSub = (i: number) => {
    setPlaying(false);
    setSub(i);
  };
  const play = () => {
    if (playing) return setPlaying(false);
    if (last) {
      setStep(0);
      setSub(0);
    }
    setPlaying(true);
  };

  return (
    <div className="jr">
      <div className="lis-track jr-track" role="tablist" aria-label="업무 단계">
        <div className="tube" style={{ transform: `translateX(calc(${step} * (100% + 5px)))` }} aria-hidden="true">
          <svg viewBox="0 0 16 30">
            <rect x="3" y="1" width="10" height="4" rx="1" fill="#FF9E30" />
            <path d="M4 5 H12 V24 A4 4 0 0 1 4 24 Z" fill="#fff" stroke="#1E2320" strokeWidth={1.2} />
            <path d="M4.6 15 H11.4 V24 A3.4 3.4 0 0 1 4.6 24 Z" fill="#D0392B" opacity={0.75} />
          </svg>
        </div>
        {STEPS.map((x, i) => (
          <button
            key={x.name}
            type="button"
            role="tab"
            aria-selected={i === step}
            className={`stn${i <= step ? " done" : ""}${x.mine ? " mine" : ""}`}
            onClick={() => pickStep(i)}
          >
            {x.name}
            <small>{x.mine ? "직접 개발" : "팀원"}</small>
          </button>
        ))}
      </div>

      <div
        className="jr-panel"
        role="tabpanel"
        tabIndex={0}
        aria-label={`${s.name} 설명`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            setPlaying(false);
            go(e.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <div className="jr-head">
          <h3>{s.name}</h3>
          <span>{s.who}</span>
          <em className={s.mine ? "mine" : undefined}>{s.mine ? "직접 개발" : "팀원 담당"}</em>
        </div>
        <p className="jr-summary">{s.summary}</p>

        <div className={`jr-body${s.shot || cur.img ? " with-shot" : ""}`}>
          {s.shot && (
            <figure className="jr-shot">
              <Spotlight
                src={s.shot.src}
                width={s.shot.width}
                height={s.shot.height}
                alt={s.shot.alt}
                boxes={s.subs.map((x) => ({ label: x.title, box: x.box! }))}
                active={sub}
                onPick={pickSub}
              />
              <figcaption>번호를 누르면 화면의 그 부분을 비춥니다</figcaption>
            </figure>
          )}
          {!s.shot && cur.img && (
            <figure className="jr-shot">
              <img key={cur.img.src} src={cur.img.src} alt={cur.img.alt} width={cur.img.width} height={cur.img.height} />
              {!s.mine && <figcaption>팀원이 만든 화면</figcaption>}
            </figure>
          )}
          <ol className="jr-subs">
            {s.subs.map((x, i) => (
              <li key={x.title} className={i === sub ? "on" : undefined}>
                <button type="button" onClick={() => pickSub(i)} aria-expanded={i === sub}>
                  <i>{i + 1}</i>
                  {x.title}
                </button>
                {i === sub && <p aria-live="polite">{x.body}</p>}
              </li>
            ))}
          </ol>
        </div>

        <div className="jr-controls">
          <button type="button" className="btn" onClick={() => (setPlaying(false), go(-1))} disabled={step === 0 && sub === 0}>
            ← 이전
          </button>
          <button type="button" className="btn" onClick={() => (setPlaying(false), go(1))} disabled={last}>
            다음 →
          </button>
          <button type="button" className="btn solid" onClick={play}>
            {playing ? "멈춤" : last ? "처음부터 재생" : "자동 재생"}
          </button>
          <span className="caption">← → 키로도 넘길 수 있습니다</span>
        </div>
      </div>
    </div>
  );
}
