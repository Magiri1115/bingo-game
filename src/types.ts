/** カードの1マス */
export type Cell = {
  value: number;      // 元の数字（FREEマスは0）
  isOpen: boolean;    // 穴が開いているか
  isFree: boolean;    // FREEマスか（中央のみ）
};

/** 5×5のビンゴカード */
export type Card = Cell[][];  // Card[row][col]

/** ビンゴ判定結果 */
export type CheckResult = {
  reachCount: number;   // リーチ数
  bingoCount: number;   // ビンゴ数
  bingoLines: [number, number][][]; // ビンゴ成立ラインのインデックス一覧
};

/** ゲーム全体の状態 */
export type GameState = {
  card: Card;
  remainingBalls: number[];   // 未取り出しのボール
  drawnBalls: number[];       // 取り出し済みのボール（履歴）
  lastDrawn: number | null;   // 直前に取り出した数字
  checkResult: CheckResult;
  isFinished: boolean;        // 全球取り出し済みか
};
