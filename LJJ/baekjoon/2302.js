const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const N = +input[0]; // 좌석 개수
const M = +input[1]; // VIP 수
const vipSeats = input.slice(2).map(Number);

// 1. DP 테이블 준비 (최대 40까지 필요)
const dp = Array(N + 1).fill(0);
dp[0] = 1;
dp[1] = 1;
for (let i = 2; i <= N; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

// 2. 구간 나누기
let prev = 0;
let result = 1;

for (let i = 0; i < M; i++) {
  const vip = vipSeats[i];
  const length = vip - prev - 1; // VIP 이전 길이
  result *= dp[length];
  prev = vip;
}

// 마지막 VIP 뒤 구간 처리
result *= dp[N - prev];

// 3. 출력
console.log(result);
