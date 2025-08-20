const fs = require("fs");
const K = Number(fs.readFileSync("input.txt").toString().trim()); // local 파일
// const K = Number(fs.readFileSync(0, "utf-8").toString().trim()); // 문제 제출 시

let length = 1;
let count = 2;

while (K > count) {
  length++;
  count += 2 ** length;
}

const prevCount = (1 << length) - 2;
const index = K - prevCount - 1;

const bit = index.toString(2).padStart(length, "0");

console.log(
  bit
    .split("")
    .map((n) => (n === "1" ? "7" : "4"))
    .join("")
);
