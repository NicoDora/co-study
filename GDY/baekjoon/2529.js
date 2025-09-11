const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const K = Number(input[0]);
const numArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const inequalitySign = input[1].trim().split(' ');

function checkSign(sign, prev, next) {
  if (sign === '>') return prev > next;
  if (sign === '<') return next > prev;
  return false;
}

let minResult = '';
let maxResult = '';
function dfs(depth, numbers) {
  if (depth === K + 1) {
    const result = numbers.join('');
    if (minResult === '') minResult = result;
    maxResult = result;
    return;
  }

  for (let i = 0; i <= 9; i++) {
    if (numArray[i] === 0) continue;

    if (
      depth === 0 ||
      checkSign(inequalitySign[depth - 1], numbers[depth - 1], i)
    ) {
      numArray[i] = 0;
      dfs(depth + 1, [...numbers, i]);
      numArray[i] = 1;
    }
  }
}
dfs(0, []);

console.log(`${maxResult}\n${minResult}`);
