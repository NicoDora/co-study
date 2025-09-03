const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

const [T, W] = input[0].split(" ").map(Number);
const position = input.slice(1).map(Number);
const dp = Array.from({ length: T }, () =>
  Array.from({ length: 2 }, () => Array(W + 1).fill(0))
);

if (position[0] === 1) dp[0][0][0] = 1;
else dp[0][1][1] = 1;

for (let i = 1; i < T; i++) {
  const droppedPosition = position[i];

  for (let k = 0; k <= W; k++) {
    if (k === 0) {
      dp[i][0][k] = dp[i - 1][0][k] + (droppedPosition === 1 ? 1 : 0);
    } else {
      dp[i][0][k] =
        Math.max(dp[i - 1][0][k], dp[i - 1][1][k - 1]) +
        (droppedPosition === 1 ? 1 : 0);
      dp[i][1][k] =
        Math.max(dp[i - 1][1][k], dp[i - 1][0][k - 1]) +
        (droppedPosition === 2 ? 1 : 0);
    }
  }
}

console.log(Math.max(...dp[T - 1].flat()));
