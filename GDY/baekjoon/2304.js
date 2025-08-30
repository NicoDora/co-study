const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const N = Number(input[0]);
const list = [];

for (let i = 1; i <= N; i++) {
  const [x, h] = input[i].split(' ').map(Number);
  list.push([x, h]);
}

list.sort((a, b) => a[0] - b[0]);

let maxH = 0;
let maxIdx = 0;
for (let i = 0; i < N; i++) {
  const [, height] = list[i];
  if (height > maxH) {
    maxH = height;
    maxIdx = i;
  }
}

const leftCount = getLeftCount(list, maxIdx);
const rightCount = getRightCount(list, maxIdx);
const area = leftCount + rightCount + maxH;

console.log(area);

function getLeftCount(list, maxIdx) {
  let area = 0;

  let [curX, curH] = list[0];
  for (let i = 1; i <= maxIdx; i++) {
    const [nextX, nextH] = list[i];
    if (nextH >= curH) {
      area += curH * (nextX - curX);
      curX = nextX;
      curH = nextH;
    }
  }

  return area;
}

function getRightCount(list, maxIdx) {
  let area = 0;

  let [curX, curH] = list[list.length - 1];
  for (let i = list.length - 2; i >= maxIdx; i--) {
    const [nextX, nextH] = list[i];
    if (nextH >= curH) {
      area += curH * (curX - nextX);
      curX = nextX;
      curH = nextH;
    }
  }

  return area;
}
