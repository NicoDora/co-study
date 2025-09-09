const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const [R, C] = input[0].trim().split(' ').map(Number);

const words = [];

for (let i = 1; i <= R; i++) {
  const word = input[i]
    .trim()
    .split('#')
    .filter((s) => {
      if (s.length === 1) return false;
      if (!s) return false;
      return true;
    });
  words.push(...word);
}

for (let i = 0; i < C; i++) {
  let word = '';
  for (let j = 0; j < R; j++) {
    word += input[j + 1][i];
  }
  const newWord = word.split('#').filter((s) => {
    if (s.length === 1) return false;
    if (!s) return false;
    return true;
  });
  words.push(...newWord);
}
console.log(words.sort((a, b) => a.localeCompare(b))[0]);
