const fs = require("fs");
const input = fs
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n").map(Number); // 문제 제출 시

function solve(N) {
  const dp = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0n));

  function dfs(w, h) {
    if (w === 0) return 1n;
    if (dp[w][h] !== 0n) return dp[w][h];

    let count = 0n;

    count += dfs(w - 1, h + 1);

    if (h > 0) count += dfs(w, h - 1);

    dp[w][h] = count;
    return count;
  }

  return dfs(N, 0);
}

const result = [];

for (const N of input) {
  if (N === 0) break;

  result.push(solve(N).toString());
}

console.log(result.join("\n"));
