const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
const children = input[1].split(" ").map(Number);

const diffs = [];
for (let i = 0; i < N - 1; i++) {
  diffs.push(children[i + 1] - children[i]);
}

diffs.sort((a, b) => a - b);

while (diffs.length > N - K) {
  diffs.pop();
}

const sum = diffs.reduce((acc, cur) => acc + cur, 0);
console.log(sum);
