const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().toString().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const cases = input.slice(1).map((el) => el.split('').map(Number));

function switchBinary(a, b) {
    for (let i = a; i >= 0; i--) {
        for (let j = b; j >= 0; j--) {
            cases[i][j] = cases[i][j] === 0 ? 1 : 0;
        }
    }
}

let count = 0;

for (let a = N - 1; a >= 0; a--) {
    for (let b = M - 1; b >= 0; b--) {
        if (cases[a][b] === 0) {
            continue;
        } else {
            switchBinary(a, b);
            count++;
        }
    }
}

console.log(count);
