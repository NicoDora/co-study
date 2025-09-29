const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

function binarySearch() {
  let start = 0;
  let end = N - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    const weight = W[mid];

    if (weight === C) return true;
    else if (weight > C) end = mid - 1;
    else start = mid + 1;
  }

  return false;
}

function twoPointer() {
  let start = 0;
  let end = N - 1;

  while (start < end) {
    const front = W[start];
    const rear = W[end];
    const sum = front + rear;

    if (sum === C) return true;
    else if (sum > C) end--;
    else start++;
  }

  return false;
}

function threePointer() {
  for (let i = 0; i < N - 2; i++) {
    let start = i + 1;
    let end = N - 1;

    while (start < end) {
      const front = W[start];
      const rear = W[end];
      const fixedPointer = W[i];
      const sum = front + rear + fixedPointer;

      if (sum === C) return true;
      else if (sum > C) end--;
      else start++;
    }
  }

  return false;
}

const [N, C] = input[0].split(" ").map(Number);
const W = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

if (binarySearch() || twoPointer() || threePointer()) console.log(1);
else console.log(0);
