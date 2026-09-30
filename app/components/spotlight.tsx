/** 이미지 위 영역. 이미지 크기에 대한 백분율 [x, y, 너비, 높이] */
export type Box = [number, number, number, number];

/**
 * 화면 이미지에서 한 영역만 밝히고 나머지를 어둡게 한다.
 * 번호 핀을 누르면 onPick으로 그 영역을 고른다.
 */
export function Spotlight({
  src,
  width,
  height,
  alt,
  boxes,
  active,
  onPick,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  boxes: { label: string; box: Box }[];
  active: number | null;
  onPick: (i: number) => void;
}) {
  const on = active !== null ? boxes[active]?.box : undefined;
  const pct = ([x, y, w, h]: Box) => ({ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` });
  return (
    <div className={`spot${on ? " dim" : ""}`}>
      <img src={src} alt={alt} width={width} height={height} />
      {on && <div className="spot-hole" style={pct(on)} aria-hidden="true" />}
      {boxes.map((b, i) => (
        <button
          key={b.label}
          type="button"
          className={`spot-pin${i === active ? " on" : ""}`}
          style={{ left: `${b.box[0] + 0.8}%`, top: `${b.box[1] + 1.2}%` }}
          onClick={() => onPick(i)}
          aria-label={`${i + 1}. ${b.label}`}
          aria-pressed={i === active}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
