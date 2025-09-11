const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

const N = Number(input[0]);
const board = input.slice(1).map((row) => row.split(" ").map(Number));
const dp = Array.from({ length: N }, () => Array(N).fill(0n));

dp[0][0] = 1n;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (dp[i][j] === 0n) continue;

    const jump = board[i][j];

    if (jump === 0) continue;

    for (const [dx, dy] of [
      [0, jump],
      [jump, 0],
    ]) {
      const nx = i + dx;
      const ny = j + dy;

      if (nx >= N || ny >= N) continue;

      dp[nx][ny] += dp[i][j];
    }
  }
}

console.log(String(dp[N - 1][N - 1]));
