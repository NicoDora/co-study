const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

const N = Number(input[0]);
const pillar = input
  .slice(1)
  .map((row) => row.split(" ").map(Number))
  .sort((a, b) => a[0] - b[0]);
const lastIndex = pillar[N - 1][0];
let max = 0;
let leftMaxIndex, rightMaxIndex;

const map = Array(lastIndex + 1).fill(0);

for (const [L, H] of pillar) {
  if (H > max) {
    max = H;
    leftMaxIndex = L;
    rightMaxIndex = L;
  } else if (H === max) rightMaxIndex = L;

  map[L] = H;
}

let currentMax = 0;
let leftArea = 0;
let rightArea = 0;

for (let i = 1; i < leftMaxIndex; i++) {
  if (map[i] > currentMax) currentMax = map[i];
  leftArea += currentMax;
}

currentMax = 0;

for (let i = lastIndex; i > rightMaxIndex; i--) {
  if (map[i] > currentMax) currentMax = map[i];
  rightArea += currentMax;
}

console.log(leftArea + rightArea + (rightMaxIndex - leftMaxIndex + 1) * max);
