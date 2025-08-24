const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "LJJ/baekjoon/input.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const P = +input[0];
const boards = [];

for (let i = 0; i < P; i++) {
  const board = input
    .slice(1 + i * 3, 1 + i * 3 + 3)
    .map((line) => line.split(""));
  boards.push(board);
}

const direction = [
  [0, 0], // 자기 자신
  [1, 0], // 아래
  [-1, 0], // 위
  [0, 1], // 오른쪽
  [0, -1], // 왼쪽
];

// 보드를 복사하는 함수
function copyBoard(board) {
  return board.map((row) => [...row]);
}

// 특정 칸 누르기
function press(board, r, c) {
  for (let [dr, dc] of direction) {
    const nr = r + dr;
    const nc = c + dc;
    if (nr >= 0 && nr < 3 && nc >= 0 && nc < 3) {
      board[nr][nc] = board[nr][nc] === "*" ? "." : "*";
    }
  }
}

// 두 보드가 같은지 비교
function isSame(board1, board2) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board1[i][j] !== board2[i][j]) return false;
    }
  }
  return true;
}

const results = [];

for (let p = 0; p < P; p++) {
  const target = boards[p];
  let answer = Infinity;

  for (let mask = 0; mask < 1 << 9; mask++) {
    const board = Array.from({ length: 3 }, () => Array(3).fill("."));
    let count = 0;

    for (let pos = 0; pos < 9; pos++) {
      if (mask & (1 << pos)) {
        const r = Math.floor(pos / 3);
        const c = pos % 3;
        press(board, r, c);
        count++;
      }
    }

    if (isSame(board, target)) {
      answer = Math.min(answer, count);
    }
  }

  results.push(answer === Infinity ? -1 : answer);
}

console.log(results.join("\n"));
