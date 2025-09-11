const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const T = Number(input[0]);

for (let i = 1; i <= T; i++) {
  const [N, list] = input.splice(1, 2);
  const numberList = list
    .trim()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);

  const result = [];
  const difference = [];
  result[0] = numberList.pop();

  for (let i = 1; i < N; i++) {
    const current = numberList.pop();
    const a = result[0] - current;
    const b = result.at(-1) - current;
    difference.push(a, b);
    if (a < b) {
      result.push(current);
    } else {
      result.unshift(current);
    }
  }
  console.log(Math.max(...difference));
}
