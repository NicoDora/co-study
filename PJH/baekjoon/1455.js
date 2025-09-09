const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

const [N, M] = input[0].split(" ").map(Number);
const coins = input.slice(1).map((row) => row.split("").map(Number));
const dp = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));
let count = 0;

for (let i = N - 1; i >= 0; i--) {
  for (let j = M - 1; j >= 0; j--) {
    dp[i][j] = dp[i + 1][j] + dp[i][j + 1] - dp[i + 1][j + 1];

    const currentCoin = (coins[i][j] + dp[i][j]) % 2;

    if (currentCoin === 1) {
      count++;
      dp[i][j]++;
    }
  }
}

console.log(count);
