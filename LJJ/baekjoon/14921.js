const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

function validationApproximate(prev, current) {
  const prevAbs = Math.abs(prev);
  const currentAbs = Math.abs(current);

  if (currentAbs < prevAbs) {
    return current;
  }
  return prev;
}

const N = +input[0];
const arr = input[1].split(' ').map(Number);

let approximate = Infinity;
let start = 0;
let end = 0;
while (start < N - 1) {
  if (end === N) {
    start++;
    end = start;
  }
  const startEle = arr[start];
  const endEle = arr[end];
  const currentApproximate = startEle + endEle;
  if (
    startEle === endEle ||
    Math.abs(currentApproximate) > Math.abs(approximate)
  ) {
    end++;
    continue;
  }
  approximate = validationApproximate(approximate, startEle + endEle);
  end++;
}

console.log(approximate);
