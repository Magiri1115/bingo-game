import type { Card, GameState } from '../types';

const bingoCardElement = document.getElementById('bingo-card') as HTMLDivElement;

/**
 * ビンゴカードをDOMに描画または更新する
 * @param card 描画するビンゴカード
 * @param bingoLines ビンゴが成立しているラインの配列
 */
export function renderCard(card: Card, bingoLines: [number, number][][]): void {
  if (!bingoCardElement) return;

  bingoCardElement.innerHTML = ''; // 一度クリア

  card.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.textContent = cell.isFree ? 'FREE' : String(cell.value);

      if (cell.isOpen) {
        cellElement.classList.add('is-open');
      }
      if (cell.isFree) {
        cellElement.classList.add('is-free');
      }

      // ビンゴライン上のセルをハイライト
      const isOnBingoLine = bingoLines.some(line =>
        line.some(([r, c]) => r === rowIndex && c === colIndex)
      );
      if (isOnBingoLine) {
        cellElement.classList.add('is-bingo-line');
      }

      bingoCardElement.appendChild(cellElement);
    });
  });
}

/**
 * ゲームの状態（最新ボール、リーチ数、ビンゴ数）をDOMに描画または更新する
 * @param state 現在のゲームの状態
 */
export function renderStatus(state: GameState): void {
  const lastDrawnElement = document.getElementById('last-drawn') as HTMLSpanElement;
  const reachCountElement = document.getElementById('reach-count') as HTMLSpanElement;
  const bingoCountElement = document.getElementById('bingo-count') as HTMLSpanElement;
  const drawnBallsHistoryElement = document.getElementById('drawn-balls-history') as HTMLDivElement;

  if (lastDrawnElement) {
    lastDrawnElement.textContent = state.lastDrawn !== null ? String(state.lastDrawn) : '--';
  }
  if (reachCountElement) {
    reachCountElement.textContent = String(state.checkResult.reachCount);
  }
  if (bingoCountElement) {
    bingoCountElement.textContent = String(state.checkResult.bingoCount);
  }

  if (drawnBallsHistoryElement) {
    drawnBallsHistoryElement.innerHTML = '';
    state.drawnBalls.forEach(ball => {
      const span = document.createElement('span');
      span.textContent = String(ball);
      drawnBallsHistoryElement.appendChild(span);
    });
  }
}

/**
 * ゲーム終了時のメッセージを表示する
 */
export function renderFinished(): void {
  // 必要に応じてゲーム終了メッセージをDOMに追加
  console.log('Game Finished!');
  const messageElement = document.createElement('p');
  messageElement.textContent = 'すべてのボールが出ました！ゲーム終了！';
  messageElement.style.fontWeight = 'bold';
  messageElement.style.marginTop = '20px';
  bingoCardElement.insertAdjacentElement('afterend', messageElement);
}
