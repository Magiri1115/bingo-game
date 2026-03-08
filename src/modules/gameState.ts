import type { Card, GameState } from '../types';
import { generateCard } from './cardGenerator';
import { createBalls } from './ballManager';
import { checkCard } from './bingoChecker';

let previousCard: Card | null = null;
let previousBalls: number[] | null = null;

/**
 * ゲームの状態を初期化する
 * @returns 初期化されたゲームの状態
 */
export function initGameState(): GameState {
  let card: Card;
  let balls: number[];

  // 直前のカードとボールの順序と同一にならないように再生成
  do {
    card = generateCard();
    balls = createBalls();
  } while (
    (previousCard && JSON.stringify(card) === JSON.stringify(previousCard)) ||
    (previousBalls && JSON.stringify(balls) === JSON.stringify(previousBalls))
  );

  previousCard = card;
  previousBalls = balls;

  const checkResult = checkCard(card);

  return {
    card,
    remainingBalls: balls,
    drawnBalls: [],
    lastDrawn: null,
    checkResult,
    isFinished: false,
  };
}

/**
 * ボールを取り出し、ゲームの状態を更新する
 * @param state 現在のゲームの状態
 * @param ball 取り出すボールの数字
 * @returns 更新されたゲームの状態
 */
export function applyDraw(state: GameState, ball: number): GameState {
  const newDrawnBalls = [...state.drawnBalls, ball];
  const newRemainingBalls = state.remainingBalls.filter(b => b !== ball);

  const newCard: Card = state.card.map(row =>
    row.map(cell =>
      cell.value === ball ? { ...cell, isOpen: true } : cell
    )
  );

  const newCheckResult = checkCard(newCard);

  const isFinished = newRemainingBalls.length === 0;

  return {
    ...state,
    card: newCard,
    remainingBalls: newRemainingBalls,
    drawnBalls: newDrawnBalls,
    lastDrawn: ball,
    checkResult: newCheckResult,
    isFinished,
  };
}
