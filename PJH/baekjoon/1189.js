const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

function dfs(x, y, dist) {
  if (dist === K) {
    if (x === 0 && y === C - 1) count++;
    return;
  }

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (
      nx < 0 ||
      nx >= R ||
      ny < 0 ||
      ny >= C ||
      map[nx][ny] !== "." ||
      visited[nx][ny]
    ) {
      continue;
    }

    visited[nx][ny] = true;
    dfs(nx, ny, dist + 1);
    visited[nx][ny] = false;
  }
}

const [R, C, K] = input[0].split(" ").map(Number);
const map = input.slice(1).map((row) => row.split(""));
const visited = Array.from({ length: R }, () => Array(C).fill(false));
const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
let count = 0;

visited[R - 1][0] = true;
dfs(R - 1, 0, 1);

console.log(count);
