//4와 7
const { join } = require("path");
const { readFileSync } = require("fs");

const K = input();

let seq = K;
let length = 1;
let num = 2;

while (seq > num) {
  seq -= num;
  length += 1;
  num *= 2;
}

let answer = "";
let group = 1 << (length - 1);
for (let i = 0; i < length; i++) {
  if (seq <= group) {
    answer += "4";
  } else {
    answer += "7";
    seq -= group;
  }
  group >>= 1;
}

console.log(answer);

function input() {
  const path =
    process.platform === "linux" ? "/dev/stdin" : join(__dirname, "input.txt");
  const K = readFileSync(path, "utf8").trim();

  return Number(K);
}
