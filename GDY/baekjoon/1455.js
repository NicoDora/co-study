const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const [N, M] = input[0].trim().split(' ').map(Number);

const coinBoard = Array.from({ length: N }, (_, i) =>
  input[i + 1].trim().split('').map(Number)
);

let count = 0;
for (let i = N - 1; i >= 0; i--) {
  for (let j = M - 1; j >= 0; j--) {
    if (coinBoard[i][j] === 1) {
      coinBoard[i][j] = 0;
      count++;
      turnCoin(i, j);
    }
  }
}

function turnCoin(i, j) {
  for (let r = 0; r <= i; r++) {
    for (let c = 0; c <= j; c++) {
      coinBoard[r][c] = coinBoard[r][c] === 1 ? 0 : 1;
    }
  }
}

console.log(count);
