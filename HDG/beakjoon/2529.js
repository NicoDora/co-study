// 부등호
const { join } = require("path");
const { readFileSync } = require("fs");

const { K, signs } = input();
const minAns = solve("asc");
const maxAns = solve("desc");

console.log(maxAns);
console.log(minAns);

function solve(order) {
  const visited = Array(10).fill(false);
  const picked = [];

  const start = order === "asc" ? 0 : 9;
  const end = order === "asc" ? 9 : 0;
  const step = order === "asc" ? 1 : -1;

  function ok(a, sign, b) {
    return sign === "<" ? a < b : a > b;
  }

  function backtracking(depth) {
    if (picked.length === K + 1) {
      return picked.join("");
    }

    for (let i = start; order === "asc" ? i <= end : i >= end; i += step) {
      if (visited[i]) continue;

      if (picked.length > 0) {
        const sign = signs[depth - 1];
        const prev = picked[depth - 1];

        if (!ok(prev, sign, i)) continue;
      }

      // 선택
      picked.push(i);
      visited[i] = true;

      // 탐색
      const res = backtracking(depth + 1);
      if (res) return res;

      // 되돌림
      picked.pop(i);
      visited[i] = false;
    }

    return null;
  }

  return backtracking(0);
}

function input() {
  const path =
    process.platform === "linux" ? "/dev/stdin" : join(__dirname, "input.txt");

  const lines = readFileSync(path, "utf8").trim().split("\n");

  const K = Number(lines[0].trim());
  const signs = lines[lines.length - 1].trim().split(" ");

  return { K, signs };
}
