const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

const T = Number(input[0]);
const result = [];
let index = 1;

for (let i = 0; i < T; i++) {
  const N = Number(input[index++]);
  const array = input[index++]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);
  const sort = Array(N);
  let front = 0;
  let rear = N - 1;

  for (let j = 0; j < N; j++) {
    if (j % 2 === 0) sort[front++] = array[j];
    else sort[rear--] = array[j];
  }

  let maxDiff = Math.abs(sort[0] - sort[sort.length - 1]);

  for (let j = 0; j < N - 1; j++) {
    maxDiff = Math.max(maxDiff, Math.abs(sort[j] - sort[j + 1]));
  }

  result.push(maxDiff);
}

console.log(result.join("\n"));
