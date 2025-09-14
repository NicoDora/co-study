const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").trim().split(/\s+/).map(Number);

let idx = 0;
const T = input[idx++];

for (let i = 0; i < T; i++) {
  const N = input[idx++];
  const logs = input.slice(idx, idx + N);
  idx += N;

  const arranged = arrangeLogs(logs);

  console.log(getDifficulty(arranged));
}

function arrangeLogs(logs) {
  logs.sort((a, b) => a - b);

  const result = [];

  let left = [],
    right = [];

  logs.forEach((log, i) => {
    if (i % 2 === 0) left.push(log);
    else right.push(log);
  });

  result.push(...left, ...right.reverse());

  return result;
}

function getDifficulty(logs) {
  let maxDiff = 0;
  for (let i = 0; i < logs.length; i++) {
    const next = (i + 1) % logs.length;
    maxDiff = Math.max(maxDiff, Math.abs(logs[i] - logs[next]));
  }
  return maxDiff;
}
