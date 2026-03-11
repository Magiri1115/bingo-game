import type { Card } from '../types';

// 列ごとの数字範囲
const COLUMN_RANGES = [
  { min: 1,  max: 15 },   // B列
  { min: 16, max: 30 },   // I列
  { min: 31, max: 45 },   // N列
  { min: 46, max: 60 },   // G列
  { min: 61, max: 75 },   // O列
];
const FREE_ROW = 2;
const FREE_COL = 2;

/**
 * 指定された範囲から重複しないランダムな数字を5つ生成する
 * @param min 最小値
 * @param max 最大値
 * @returns 重複しないランダムな数字の配列
 */
function generateUniqueRandomNumbers(min: number, max: number): number[] {
  const numbers: number[] = [];
  while (numbers.length < 5) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  return numbers.sort((a, b) => a - b); // ソートしておくとデバッグしやすい
}

/**
 * 5x5のビンゴカードを生成する
 */
export function generateCard(): Card {
  const card: Card = [];

  for (let row = 0; row < 5; row++) {
    card[row] = [];
    for (let col = 0; col < 5; col++) {
      card[row][col] = { value: 0, isOpen: false, isFree: false }; // 初期化
    }
  }

  for (let col = 0; col < 5; col++) {
    const { min, max } = COLUMN_RANGES[col];
    const columnNumbers = generateUniqueRandomNumbers(min, max);

    for (let row = 0; row < 5; row++) {
      card[row][col].value = columnNumbers[row];
    }
  }

  // 中央(2,2)はFREEマス
  card[FREE_ROW][FREE_COL] = { value: 0, isOpen: true, isFree: true };

  return card;
}
