const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

// dp 알고리즘 문제
// gain은 매 초 떨어진 나무가 현재 위치와 같으면 1 아니면 0
// 점화식: dp[t][w] = max[dp[t-1][w], dp[t-1][m-1] + gain(t, m)]
const [T, W] = input[0].split(' ').map(Number);
const falls = input.slice(1).map(Number);

const dp = Array.from({ length: T + 1 }, () => Array(W + 1).fill(0));

for (let t = 1; t <= T; t++) {
    for (let m = 0; m <= Math.min(W, t); m++) {
        const pos = m % 2 === 0 ? 1 : 2; // 현재 위치
        const gain = falls[t - 1] === pos ? 1 : 0; // 얻을 수 있는 위치인지 판별

        // 모든 이동을 소진시 이전값 그대로 저장
        if (m === 0) {
            dp[t][m] = dp[t - 1][m] + gain;
        } else {
            // 그자리 있기 vs 이동하기를 했을 때, 더 큰값을 dp에 저장
            dp[t][m] = Math.max(dp[t - 1][m], dp[t - 1][m - 1]) + gain;
        }
    }
}

console.log(Math.max(...dp[T]));
