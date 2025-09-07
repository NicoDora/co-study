const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const [N, K] = input[0].trim().split(' ').map(Number);
const students = input[1].trim().split(' ').map(Number);
const diffs = [];
for (let i = 0; i < N - 1; i++) {
  diffs.push(students[i + 1] - students[i]);
}
diffs.sort((a, b) => b - a);

let sum = 0;

for (let i = K - 1; i < diffs.length; i++) {
  sum += diffs[i];
}

console.log(sum);
