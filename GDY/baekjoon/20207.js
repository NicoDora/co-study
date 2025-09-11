const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');
//이해:2분

const N = Number(input[0]);
const schedule = Array.from({ length: N }, (_, i) =>
  input[i + 1].trim().split(' ').map(Number)
);
const calendar = new Array(366).fill(0);

schedule.sort((a, b) => {
  if (a[0] === b[0]) {
    return b[1] - a[1];
  }
  return a[0] - b[0];
});

for (const [start, end] of schedule) {
  for (let i = start; i <= end; i++) {
    calendar[i] += 1;
  }
}

let width = 0;
let coatedPaperSize = 0;
let maxHeight = 0;

for (let i = 1; i <= 366; i++) {
  const current = calendar[i] || 0;
  if (current === 0) {
    coatedPaperSize += width * maxHeight;
    width = 0;
    maxHeight = 0;
    continue;
  }
  width++;
  maxHeight = Math.max(maxHeight, current);
}

console.log(coatedPaperSize);
