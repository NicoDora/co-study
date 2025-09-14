const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().toString().split('\n');

const [N, D] = input[0].split(' ').map(Number);

const shortcuts = input.slice(1).map((line) => line.split(' ').map(Number));

const dp = Array(D + 1).fill(Infinity);
dp[0] = 0;

const roads = Array.from({ length: D + 1 }, () => []);
for (let [s, e, l] of shortcuts) {
    if (e <= D && e - s > l) {
        roads[s].push([e, l]);
    }
}

for (let i = 0; i < D; i++) {
    dp[i + 1] = Math.min(dp[i + 1], dp[i] + 1);

    for (let [e, l] of roads[i]) {
        dp[e] = Math.min(dp[e], dp[i] + l);
    }
}

console.log(dp[D]);
