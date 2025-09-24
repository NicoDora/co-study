const fs = require("fs");
const N = Number(fs.readFileSync("input.txt").toString().trim()); // local 파일
// const N = Number(fs.readFileSync(0, "utf-8").toString().trim()); // 문제 제출 시

function calculateMax(n) {
  let max = 0;

  for (let i = 3; i < n; i++) {
    max = Math.max(max, dp[n - i] * (i - 1));
  }

  return max;
}

const dp = Array(N + 1).fill(0);

if (N < 7) console.log(N);
else {
  for (let i = 1; i <= 6; i++) {
    dp[i] = i;
  }

  for (let i = 7; i <= N; i++) {
    dp[i] = calculateMax(i);
  }

  console.log(dp[N]);
}
