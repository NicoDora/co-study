const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

const [N, K] = input[0].split(" ").map(Number);
const children = input[1].split(" ").map(Number);
const diff = [];

for (let i = 0; i < N - 1; i++) {
  diff.push(Math.abs(children[i] - children[i + 1]));
}

diff.sort((a, b) => b - a);

console.log(diff.slice(K - 1).reduce((sum, n) => (sum += n), 0));
