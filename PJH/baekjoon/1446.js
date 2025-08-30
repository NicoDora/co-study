const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

const [N, D] = input[0].split(" ").map(Number);
const shortcuts = input
  .slice(1)
  .map((row) => row.split(" ").map(Number))
  .filter(([start, end, dist]) => end <= D);
const dp = Array.from({ length: D + 1 }, (_, i) => i);

for (let i = 1; i <= D; i++) {
  dp[i] = Math.min(dp[i], dp[i - 1] + 1);

  for (const [start, end, dist] of shortcuts) {
    if (end === i) dp[i] = Math.min(dp[i], dp[start] + dist);
  }
}

console.log(dp[D]);
