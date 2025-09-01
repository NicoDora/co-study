const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().toString().split('\n');

function sortWoods(N, woods) {
    let min = 0;
    for (let i = 0; i < N - 2; i++) {
        min = Math.max(min, Math.abs(+woods[i] - +woods[i + 2]));
    }
    return min;
}

const N = +input[0];
const counts = input.slice(1).filter((el, idx) => {
    if (idx % 2 === 0) {
        return el;
    }
});
const woods = input.slice(1).filter((el, idx) => {
    if (idx % 2 !== 0) {
        return el;
    }
});

const result = [];

for (let i = 0; i < N; i++) {
    const c = +counts[i];
    const currentWoods = woods[i].split(' ').sort((a, b) => a - b);

    result.push(sortWoods(c, currentWoods));
}

console.log(result.join('\n'));
