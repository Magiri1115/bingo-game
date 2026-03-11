import type { Card, CheckResult } from '../types';

// 判定対象の12ライン定義（各ラインは[row,col]のペア配列）
export const LINES: [number, number][][] = [
  // 横5本
  [[0,0],[0,1],[0,2],[0,3],[0,4]],
  [[1,0],[1,1],[1,2],[1,3],[1,4]],
  [[2,0],[2,1],[2,2],[2,3],[2,4]],
  [[3,0],[3,1],[3,2],[3,3],[3,4]],
  [[4,0],[4,1],[4,2],[4,3],[4,4]],
  // 縦5本
  [[0,0],[1,0],[2,0],[3,0],[4,0]],
  [[0,1],[1,1],[2,1],[3,1],[4,1]],
  [[0,2],[1,2],[2,2],[3,2],[4,2]],
  [[0,3],[1,3],[2,3],[3,3],[4,3]],
  [[0,4],[1,4],[2,4],[3,4],[4,4]],
  // 斜め2本
  [[0,0],[1,1],[2,2],[3,3],[4,4]],
  [[0,4],[1,3],[2,2],[3,1],[4,0]],
];

/**
 * ビンゴカードのリーチ数とビンゴ数を判定する
 * @param card ビンゴカード
 * @returns リーチ数、ビンゴ数、ビンゴ成立ラインのインデックス一覧
 */
export function checkCard(card: Card): CheckResult {
  let reachCount = 0;
  let bingoCount = 0;
  const bingoLines: [number, number][][] = [];

  LINES.forEach((line) => {
    let openCount = 0;
    line.forEach(([row, col]) => {
      if (card[row][col].isOpen) {
        openCount++;
      }
    });

    if (openCount === 5) {
      bingoCount++;
      bingoLines.push(line);
    } else if (openCount === 4) {
      reachCount++;
    }
  });

  return { reachCount, bingoCount, bingoLines };
}
