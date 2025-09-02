const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const students = input[1].split(' ').map(Number);

const heightDiff = Array.from({ length: N - 1 }, () => []);

const maxDiff = students[N - 1] - students[0];

for (let i = 0; i < N - 1; i++) {
    heightDiff[i] = Math.abs(students[i] - students[i + 1]);
}

let sum = 0;
heightDiff.sort((a, b) => b - a);
for (let i = 0; i < K - 1; i++) {
    sum += heightDiff[i];
}

console.log(maxDiff - sum);
