const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim();

const N = +input;

const dp = Array(N + 1).fill(0);

for (let i = 1; i <= Math.min(6, N); i++) {
  dp[i] = i;
}

for (let i = 7; i <= N; i++) {
  dp[i] = dp[i - 1] + 1;

  for (let j = 1; j <= i - 3; j++) {
    dp[i] = Math.max(dp[i], dp[j] * (i - j - 1));
  }
}

console.log(dp[N]);
