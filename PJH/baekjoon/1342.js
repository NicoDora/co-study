const fs = require("fs");
const S = fs.readFileSync("input.txt").toString().trim().split(""); // local 파일
// const S = fs.readFileSync(0, "utf-8").toString().trim().split(""); // 문제 제출 시

function dfs(string, before, depth) {
  if (depth === length) {
    set.add(string);
    return;
  }

  for (let i = 0; i < length; i++) {
    const next = i;

    if (visited[next] || S[before] === S[next]) continue;

    visited[next] = true;
    dfs(string + S[next], next, depth + 1);
    visited[next] = false;
  }
}

const length = S.length;
const visited = Array(length).fill(false);
const set = new Set();

for (let i = 0; i < length; i++) {
  visited[i] = true;
  dfs(`${S[i]}`, i, 1);
  visited[i] = false;
}

console.log(set.size);
