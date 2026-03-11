/**
 * 1から75までの数字を含む配列を生成(Fisher-Yatesシャッフル)。
 * この関数はビンゴゲームで使用するボールの初期状態を作成。
 * @returns 1から75までの数字がランダムにシャッフルされた配列。
 */
export function createBalls(): number[] {
  const balls: number[] = Array.from({ length: 75 }, (_, i) => i + 1);
  for (let i = balls.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // 現在の要素とランダムに選ばれた要素を交換し、シャッフルを進行させる
    [balls[i], balls[j]] = [balls[j], balls[i]];
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
    throw new Error('引けるボールがありません。');
  }
  const ball = remaining[0];
  const newRemaining = remaining.slice(1);
  return { ball, remaining: newRemaining };
}
