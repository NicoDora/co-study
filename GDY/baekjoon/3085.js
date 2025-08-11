const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

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

function getDifferentCandyXY(x, y) {
  const cur = board[x][y];
  const res = [];

  // 아래
  if (x + 1 < N && cur !== board[x + 1][y]) {
    res.push({ x: x + 1, y });
  }
  // 오른쪽
  if (y + 1 < N && cur !== board[x][y + 1]) {
    res.push({ x, y: y + 1 });
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
