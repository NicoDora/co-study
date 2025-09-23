const fs = require("fs");
const [N, M, ...VIP] = fs
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number); // local 파일
// const [N, M, ...VIP] = fs.readFileSync(0, "utf-8").toString().trim().split("\n").map(Number); // 문제 제출 시

const seat = Array(N + 1).fill(true);
const dp = Array(N + 1).fill(0);
const rows = [];

for (let i = 0; i < M; i++) {
  seat[VIP[i]] = false;
}

dp[0] = 1;
dp[1] = 1;

for (let i = 2; i <= N; i++) {
  dp[i] = dp[i - 2] + dp[i - 1];
}

let count = 0;

for (let i = 1; i <= N; i++) {
  if (seat[i]) count++;
  else {
    if (count > 0) rows.push(count);
    count = 0;
  }
}

rows.push(count);

console.log(rows.reduce((result, n) => (result *= dp[n]), 1) || 1);
