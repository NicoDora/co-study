const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const directionX = [1, -1];
const directionY = [1, -1];

const N = Number(input[0]);
const board = createBoard(N, input);

let result = 1;
const [rx, ry] = getMaxCandyCount();
result = Math.max(result, rx, ry);
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    const candidates = getDifferentCandyXY(i, j);

    if (!candidates || candidates.length === 0) continue;
    for (const { x, y } of candidates) {
      changeCandy(i, j, x, y);

      const [countX, countY] = getMaxCandyCount();
      if (countX > result) result = countX;
      if (countY > result) result = countY;

      changeCandy(x, y, i, j);
    }
  }
}

console.log(result);
function createBoard(N, candies) {
  const board = [];
  for (let i = 1; i <= N; i++) {
    board.push(candies[i].trim().split(''));
  }
  return board;
}

function getDifferentCandyXY(currentX, currentY) {
  const currentCandy = board[currentX][currentY];
  const res = [];

  for (let k = 0; k < 2; k++) {
    const nextX = currentX + directionX[k];
    if (nextX < 0 || nextX >= N) continue;
    if (currentCandy !== board[nextX][currentY]) {
      res.push({ x: nextX, y: currentY });
    }
  }

  for (let k = 0; k < 2; k++) {
    const nextY = currentY + directionY[k];
    if (nextY < 0 || nextY >= N) continue;
    if (currentCandy !== board[currentX][nextY]) {
      res.push({ x: currentX, y: nextY });
    }
  }

  return res;
}

function changeCandy(currentX, currentY, nextX, nextY) {
  [board[currentX][currentY], board[nextX][nextY]] = [
    board[nextX][nextY],
    board[currentX][currentY],
  ];
}

function getMaxCandyCount() {
  let maxRowCount = 1;
  let maxColCount = 1;
  for (let i = 0; i < N; i++) {
    let rowCount = 1;
    let colCount = 1;
    for (let j = 1; j < N; j++) {
      if (board[i][j - 1] === board[i][j]) {
        rowCount++;
      } else {
        maxRowCount = Math.max(maxRowCount, rowCount);
        rowCount = 1;
      }

      if (board[j - 1][i] === board[j][i]) {
        colCount++;
      } else {
        maxColCount = Math.max(maxColCount, colCount);
        colCount = 1;
      }
    }

    maxRowCount = Math.max(maxRowCount, rowCount);
    maxColCount = Math.max(maxColCount, colCount);
  }
  return [maxRowCount, maxColCount];
}
