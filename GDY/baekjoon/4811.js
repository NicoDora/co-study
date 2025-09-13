const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n').map(Number);

const dp = Array.from({ length: 31 }, (_, i) =>
  new Array(61).fill(i === 0 ? 1n : 0n)
);

for (let w = 1; w <= 30; w++) {
  for (let h = 0; h < 60; h++) {
    if (h === 0) {
      dp[w][h] = dp[w - 1][h + 1];
    } else {
      dp[w][h] = dp[w - 1][h + 1] + dp[w][h - 1];
    }
  }
}

const result = [];
for (const N of input) {
  if (Number(N) === 0) break;
  result.push(dp[N][0]);
}

console.log(result.join('\n'));
