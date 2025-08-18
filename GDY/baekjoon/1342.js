const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim();

const charCounter = {};
const strLength = input.length;
let result = 0;

for (const char of input) {
  charCounter[char] = (charCounter[char] || 0) + 1;
}

function dfs(lastChar, currentLength) {
  if (currentLength === strLength) {
    result++;
    return;
  }
  for (const key in charCounter) {
    if (charCounter[key] > 0 && key !== lastChar) {
      charCounter[key]--;
      dfs(key, currentLength + 1);
      charCounter[key]++;
    }
  }
}

dfs('', 0);
console.log(result);
