const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

const T = Number(input[0]);
const result = [];
let index = 1;

for (let i = 0; i < T; i++) {
  const N = Number(input[index++]);
  const price = input[index++].split(" ").map(Number);
  let profit = 0;
  let currentMax = 0;

  for (let i = N - 1; i >= 0; i--) {
    const currentPrice = price[i];

    if (currentPrice > currentMax) currentMax = currentPrice;
    else profit += currentMax - currentPrice;
  }

  result.push(profit);
}

console.log(result.join("\n"));
