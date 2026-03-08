import './style.css'
import { initGameState, applyDraw } from './modules/gameState';
import { renderCard, renderStatus, renderFinished } from './modules/renderer';

document.addEventListener('DOMContentLoaded', () => {
  let gameState = initGameState();

  const drawBallButton = document.getElementById('draw-ball-button') as HTMLButtonElement;
  const resetButton = document.getElementById('reset-button') as HTMLButtonElement;
  const lastDrawnElement = document.getElementById('last-drawn') as HTMLSpanElement;
  const reachCountElement = document.getElementById('reach-count') as HTMLSpanElement;
  const bingoCountElement = document.getElementById('bingo-count') as HTMLSpanElement;
  const drawnBallsHistoryElement = document.getElementById('drawn-balls-history') as HTMLDivElement;

  function updateUI() {
    renderCard(gameState.card, gameState.checkResult.bingoLines);
    renderStatus(gameState);

    lastDrawnElement.textContent = gameState.lastDrawn !== null ? String(gameState.lastDrawn) : '--';
    reachCountElement.textContent = String(gameState.checkResult.reachCount);
    bingoCountElement.textContent = String(gameState.checkResult.bingoCount);

    drawnBallsHistoryElement.innerHTML = '';
    gameState.drawnBalls.forEach(ball => {
      const span = document.createElement('span');
      span.textContent = String(ball);
      drawnBallsHistoryElement.appendChild(span);
    });

    if (gameState.isFinished) {
      drawBallButton.disabled = true;
      renderFinished();
    } else {
      drawBallButton.disabled = false;
    }
  }

  drawBallButton.addEventListener('click', () => {
    if (gameState.remainingBalls.length > 0) {
      const nextBall = gameState.remainingBalls[0];
      gameState = applyDraw(gameState, nextBall);
      updateUI();
    }
  });

  resetButton.addEventListener('click', () => {
    gameState = initGameState();
    updateUI();
  });

  // 初期表示
  updateUI();
});
