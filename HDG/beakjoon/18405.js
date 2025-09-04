// 경쟁적 전염
const fs = require("fs");
const { join } = require("path");

class Virus {
  constructor(virusType, time, x, y) {
    this.virusType = virusType;
    this.time = time;
    this.x = x;
    this.y = y;
  }
}

function solve({ N, K, board, S, X, Y }) {
  const queue = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const virusType = board[i][j];

      if (virusType !== 0) {
        const newVirus = new Virus(virusType, 0, j, i);
        queue.push(newVirus);
      }
    }
  }

  queue.sort((a, b) => a.virusType - b.virusType);

  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  let head = 0;

  while (head < queue.length) {
    const virus = queue[head];
    head++;

    if (virus.time === S) break;

    for (const [dx, dy] of dirs) {
      const nx = virus.x + dx;
      const ny = virus.y + dy;

      if (0 > nx || nx >= N || 0 > ny || ny >= N) continue;
      if (board[ny][nx] !== 0) continue;

      const newVirus = new Virus(virus.virusType, virus.time + 1, nx, ny);

      queue.push(newVirus);
      board[ny][nx] = newVirus.virusType;
    }
  }

  return board[X - 1][Y - 1];
}

// -- template --

function template() {
  const filePath =
    process.platform === "linux" ? "/dev/stdin" : join(__dirname, "input.txt");
  const raw = fs.readFileSync(filePath, "utf8").trim();
  const input = parseInput(raw);
  const answer = solve(input);

  console.log(answer);
}

function parseInput(raw) {
  const lines = raw.split("\n");
  const [N, K] = lines[0].trim().split(" ").map(Number);
  const [S, X, Y] = lines[lines.length - 1].trim().split(" ").map(Number);

  const board = lines
    .slice(1, lines.length - 1)
    .map((line) => line.trim().split(" ").map(Number));

  return { N, K, board, S, X, Y };
}

template();
