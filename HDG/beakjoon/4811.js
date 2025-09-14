// 알약
const { join } = require("path");
const { readFileSync } = require("fs");

const lines = input();

// 입력은 여러 줄 n, 마지막 0
const ns = lines.filter((n) => n !== 0);
if (ns.length === 0) process.exit(0);

const maxN = Math.max(...ns);

// memo[w][h] = dp(w,h)
const memo = Array.from({ length: maxN + 1 }, () =>
  Array(maxN + 1).fill(undefined)
);

function dp(w, h) {
  const cached = memo[w][h];
  if (cached !== undefined) return cached;

  if (w === 0) return (memo[w][h] = 1n);

  let res = 0n;
  if (w > 0) res += dp(w - 1, h + 1); // W 먹기 -> 반쪽이 하나 늘어남
  if (h > 0) res += dp(w, h - 1); // H 먹기
  return (memo[w][h] = res);
}

// 각 n에 대해 답 출력
let out = [];
for (const n of ns) {
  out.push(dp(n, 0).toString()); // BigInt 출력은 문자열로
}
console.log(out.join("\n"));

function input() {
  const path =
    process.platform === "linux" ? "/dev/stdin" : join(__dirname, "input.txt");

  const lines = readFileSync(path, "utf8").trim().split("\n").map(Number);

  return lines;
}
