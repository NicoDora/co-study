const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

function dfs(string, before, depth) {
  if (depth === k + 1) {
    numbers.push(string);
    return;
  }

  for (let i = 0; i < 10; i++) {
    if (visited[i]) continue;

    const sign = inequality[depth - 1];

    if (compare(before, i, sign)) {
      visited[i] = true;
      dfs(string + i, i, depth + 1);
      visited[i] = false;
    }
  }
}

function compare(n1, n2, sign) {
  if (sign === "<") return n1 < n2;
  return n1 > n2;
}

const k = Number(input[0]);
const inequality = input[1].split(" ");
const visited = Array(10).fill(false);
const numbers = [];

for (let i = 0; i < 10; i++) {
  visited[i] = true;
  dfs(String(i), i, 1);
  visited[i] = false;
}

console.log(numbers[numbers.length - 1] + "\n" + numbers[0]);
