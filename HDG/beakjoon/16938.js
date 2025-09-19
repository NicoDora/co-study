const { join } = require("path");
const { readFileSync } = require("fs");

const [N, L, R, X, questions] = input();
const picked = [];
const visited = Array(N).fill(false);
let count = 0;

backtracking(0);

console.log(count);

function backtracking(depth) {
  for (let i = depth; i < N; i++) {
    if (visited[i]) continue;

    // 선택
    picked.push(questions[i]);
    visited[i] = true;

    let sum = 0;

    for (let i = 0; i < picked.length; i++) {
      sum += picked[i];
    }

    if (picked.length >= 2 && L <= sum && sum <= R) {
      const min = Math.min(...picked);
      const max = Math.max(...picked);

      if (max - min >= X) {
        count++;
      }
    }

    // 탐색
    if (sum < R) {
      backtracking(i + 1);
    }

    // 되돌림
    picked.pop();
    visited[i] = false;
  }

  return false;
}

function input() {
  const path =
    process.platform === "linux" ? "/dev/stdin" : join(__dirname, "input.txt");
  const lines = readFileSync(path, "utf8").trim().split("\n");
  const [N, L, R, X] = lines[0].split(" ").map(Number);
  const questions = lines[1].split(" ").map(Number);

  return [N, L, R, X, questions];
}
