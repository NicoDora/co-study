const { join } = require("path");
const { readFileSync } = require("fs");

const [N, M, VIPSeats] = input();
const seats = Array.from({ length: N }, (_, i) => i + 1);
let left = 0;
let right = 0;
let answer = 1;

for (let i = 0; i < M + 1; i++) {
  let newArr;

  if (i >= M) {
    newArr = seats.slice(left);
  } else {
    right = VIPSeats[i] - 1;
    newArr = seats.slice(left, right);
  }

  answer *= fibonacci(newArr.length);

  left = VIPSeats[i];
}

console.log(answer);

function fibonacci(n) {
  n = n + 1;

  if (n <= 1) {
    return n;
  }

  let a = 0;
  let b = 1;
  let temp;

  for (let i = 2; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }

  return b;
}

function input() {
  const path =
    process.platform === "linux" ? "/dev/stdin" : join(__dirname, "input.txt");
  const [N, M, ...VIPSeats] = readFileSync(path, "utf8")
    .trim()
    .split("\n")
    .map(Number);

  return [N, M, VIPSeats];
}
