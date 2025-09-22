const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

function isApproximate(prev, current) {
  return Math.abs(prev) > Math.abs(current);
}

const N = +input[0];
const arr = input[1].split(' ').map(Number);

let approximate = Infinity;
let start = 0;
let end = N - 1;

while (start < end) {
  const startEle = arr[start];
  const endEle = arr[end];
  const currentApproximate = startEle + endEle;

  if (isApproximate(approximate, currentApproximate)) {
    approximate = currentApproximate;
  }

  if (approximate === 0) {
    break;
  }

  if (currentApproximate > 0) {
    end--;
  } else {
    start++;
  }
}

console.log(approximate);
