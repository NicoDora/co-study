const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const [N, D] = input.shift().split(' ').map(Number);
const shortcuts = input.map((shortcut) =>
  shortcut.trim().split(' ').map(Number)
);
const dp = new Array(D + 1);

dp[0] = 0;
for (let i = 1; i <= D; i++) {
  dp[i] = dp[i - 1] + 1;

  for (const [start, end, dist] of shortcuts) {
    if (i === end) dp[i] = Math.min(dp[i], dp[start] + dist);
  }
}
console.log(dp[D]);
