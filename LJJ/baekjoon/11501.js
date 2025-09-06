const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().toString().split('\n');

// 뒤에서 부터 순회
// 1. 최대치보다 높거나 같으면 최대치 갱신
// 2. 낮으면 이익 계산

const T = +input[0];
let line = 1;
const result = [];

for (let i = 0; i < T; i++) {
    const N = +input[line++];
    const prices = input[line++].split(' ').map(Number);

    let totalGain = 0;
    let maxPrice = 0;

    for (let j = N - 1; j >= 0; j--) {
        const currentPrice = prices[j];

        if (currentPrice >= maxPrice) {
            maxPrice = currentPrice;
        } else {
            totalGain += maxPrice - currentPrice;
        }
    }
    result.push(totalGain);
}

console.log(result.join('\n'));
