/**
 * 1〜75の数字をシャッフルした配列を生成する (Fisher-Yatesアルゴリズム)
 * @returns シャッフルされた数字の配列
 */
export function createBalls(): number[] {
  const balls: number[] = Array.from({ length: 75 }, (_, i) => i + 1);
  for (let i = balls.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [balls[i], balls[j]] = [balls[j], balls[i]]; // 要素を交換
  }
  return balls;
}

/**
 * 残りのボール配列から先頭のボールを1つ取り出す
 * @param remaining 残りのボール配列
 * @returns 取り出したボールと、取り出し後の残りのボール配列
 */
export function drawBall(remaining: number[]): { ball: number; remaining: number[] } {
  if (remaining.length === 0) {
    throw new Error('No remaining balls to draw.');
  }
  const ball = remaining[0];
  const newRemaining = remaining.slice(1); // 破壊的変更なし
  return { ball, remaining: newRemaining };
}
