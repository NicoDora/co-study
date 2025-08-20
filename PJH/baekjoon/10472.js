const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  push(data) {
    const newNode = new Node(data);

    if (this.size === 0) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }

    this.size++;
  }

  shift() {
    if (this.size === 0) return null;

    const data = this.front.data;

    this.front = this.front.next;
    this.size--;

    return data;
  }
}

function bfs(target) {
  const queue = new Queue();
  const initial = Array.from({ length: MAX }, () => Array(MAX).fill("."));
  const set = new Set([serialize(initial)]);

  queue.push([initial, 0]);

  while (queue.size) {
    const [board, count] = queue.shift();

    if (serialize(board) === serialize(target)) return count;

    for (let i = 0; i < MAX; i++) {
      for (let j = 0; j < MAX; j++) {
        const newBoard = copyBoard(board);
        clickCell(newBoard, i, j);
        const key = serialize(newBoard);

        if (!set.has(key)) {
          set.add(key);
          queue.push([newBoard, count + 1]);
        }
      }
    }
  }

  return -1;
}

function serialize(board) {
  return board.map((row) => row.join("")).join("");
}

function copyBoard(board) {
  return board.map((row) => [...row]);
}

function clickCell(board, x, y) {
  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx < 0 || nx >= MAX || ny < 0 || ny >= MAX) continue;

    board[nx][ny] = board[nx][ny] === "*" ? "." : "*";
  }
}

const P = Number(input[0]);
const directions = [
  [0, 0],
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
const MAX = 3;
const result = [];
let index = 1;

for (let i = 0; i < P; i++) {
  const target = input.slice(index, (index += MAX)).map((row) => row.split(""));
  result.push(bfs(target));
}

console.log(result.join("\n"));
