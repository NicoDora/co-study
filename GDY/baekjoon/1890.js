const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');
const N = Number(input[0]);
const board = input.slice(1).map((l) => l.split(' ').map(Number));

const dp = Array.from({ length: N }, () => Array(N).fill(0n));
dp[0][0] = 1n;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (dp[i][j] === 0n) continue;
    if (i === N - 1 && j === N - 1) continue;

    const k = board[i][j];

    const down = i + k;
    const right = j + k;

    if (down < N) dp[down][j] += dp[i][j];
    if (right < N) dp[i][right] += dp[i][j];
  }
}

console.log(dp[N - 1][N - 1].toString());
