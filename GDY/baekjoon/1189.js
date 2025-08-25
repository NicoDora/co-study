const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const dCol = [1, -1, 0, 0];
const dRow = [0, 0, 1, -1];
const [R, C, K] = input[0].trim().split(' ').map(Number);
const houseMap = Array.from({ length: R }, (_, i) =>
  input[i + 1].trim().split('')
);
const visited = Array.from({ length: R }, (_, i) => new Array(C).fill(false));
const start = [R - 1, 0];
const house = [0, C - 1];
let count = 0;
function dfs(depth, row, col) {
  if (row === house[0] && col === house[1]) {
    if (depth === K) count++;
    return;
  }

  for (let i = 0; i < 4; i++) {
    const nRow = row + dRow[i];
    const nCol = col + dCol[i];

    if (nRow < 0 || nRow >= R || nCol < 0 || nCol >= C) continue;
    if (houseMap[nRow][nCol] === 'T') continue;
    if (visited[nRow][nCol]) continue;
    visited[nRow][nCol] = true;
    dfs(depth + 1, nRow, nCol);
    visited[nRow][nCol] = false;
  }
}
visited[start[0]][start[1]] = true;
dfs(1, start[0], start[1]);
console.log(count);
