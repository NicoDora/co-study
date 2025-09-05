const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const T = +input[0];
let line = 1;

for (let t = 0; t < T; t++) {
    const N = +input[line++];
    const prices = input[line++].split(' ').map(BigInt);

    let gain = 0n;
    let maxPrice = 0n;

    for (let i = N - 1; i >= 0; i--) {
        if (prices[i] > maxPrice) maxPrice = prices[i];
        gain += maxPrice - prices[i];
    }

    console.log(gain.toString());
}
