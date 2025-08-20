const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim();
const K = Number(input);

let binaryNum = (K + 1).toString(2);
binaryNum = binaryNum.slice(1);
let result = '';

for (let char of binaryNum) {
  result += char === '0' ? '4' : '7';
}
console.log(result);
