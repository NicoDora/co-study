// 십자뒤집기
const { join } = require("path");
const { readFileSync } = require("fs");

const { P, tastcases } = input();

for (let idx = 0; idx < P; idx++) {
  const testcase = tastcases[idx];
  console.log(solve(testcase));
}

function solve(target) {
  const start = Array.from({ length: 3 }, () => Array(3).fill("."));
  if (sameBoard(start, target)) return 0;

  const q = [{ board: start, depth: 0 }];
  const visited = new Set([keyOf(start)]);

  while (q.length) {
    const { board, depth } = q.shift();

    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        const nb = deepCopy(board);
        flipCrossAtPoint(nb, y, x);

        const k = keyOf(nb);
        if (visited.has(k)) continue;

        if (sameBoard(nb, target)) return depth + 1;

        visited.add(k);
        q.push({ board: nb, depth: depth + 1 });
      }
    }
  }

  return -1;
}

function deepCopy(b) {
  return b.map((row) => row.slice());
}

function keyOf(b) {
  return b.map((r) => r.join("")).join("\n");
}

function flipCrossAtPoint(board, y, x) {
  const dirs = [
    [-1, 0], // up
    [1, 0], // down
    [0, 0], // self
    [0, 1], // right
    [0, -1], // left
  ];

  for (const [dy, dx] of dirs) {
    const ny = y + dy;
    const nx = x + dx;
    if (ny < 0 || ny >= 3 || nx < 0 || nx >= 3) continue;
    board[ny][nx] = board[ny][nx] === "." ? "*" : ".";
  }
}

function sameBoard(a, b) {
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (a[y][x] !== b[y][x]) return false;
    }
  }
  return true;
}

function input() {
  const path =
    process.platform === "linux" ? "/dev/stdin" : join(__dirname, "input.txt");

  const lines = readFileSync(path, "utf8").trim().split("\n");
  const P = Number(lines[0].trim());
  const tastcases = [];

  for (let i = 1; i < lines.length; i += 3) {
    const board = [];
    board.push(lines[i]);
    board.push(lines[i + 1]);
    board.push(lines[i + 2]);
    tastcases.push(board.map((str) => str.split("")));
  }

  return { P, tastcases };
}
