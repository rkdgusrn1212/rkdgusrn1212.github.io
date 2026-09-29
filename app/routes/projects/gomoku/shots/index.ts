// Google Play에 공개된 오목판 4.0 스크린샷을 540px WebP로 줄인 것 (원본: gomokuboard/gomoku-board/screenshot_kr/v4)
import game from "./game.webp";
import main from "./main.webp";
import omokRule from "./omok-rule.webp";
import onlineGame from "./online-game.webp";
import onlineRoom from "./online-room.webp";
import result from "./result.webp";

export type Shot = { src: string; label: string; alt: string; /** 홈 카드에도 보여줄지 */ inCard?: boolean };

export const gomokuShots: Shot[] = [
  { src: main, label: "메인", alt: "오목판 메인 화면. 인공지능 대전, 2인 대전, 블루투스 대전, 온라인 대전 메뉴", inCard: true },
  { src: game, label: "대국", alt: "오목판 대국 화면", inCard: true },
  { src: onlineGame, label: "온라인 대국", alt: "온라인 대국 화면. 두 대국자 정보와 정해진 문구의 빠른 채팅", inCard: true },
  { src: onlineRoom, label: "온라인 대기방", alt: "온라인 대기방 화면" },
  { src: result, label: "결과", alt: "대국 결과 화면" },
  { src: omokRule, label: "오목 룰", alt: "오목 룰 설명 화면" },
];

export const SHOT_WIDTH = 540;
export const SHOT_HEIGHT = 1080;
