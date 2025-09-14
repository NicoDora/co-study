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

const [N, K] = input[0].split(" ").map(Number);
const map = input.slice(1, N + 1).map((row) => row.split(" ").map(Number));
const [S, X, Y] = input[N + 1].split(" ").map(Number);
const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
const initialViruses = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    const virusType = map[i][j];
    if (virusType > 0) initialViruses.push([virusType, 0, i, j]);
  }
}

initialViruses.sort((a, b) => a[0] - b[0]);

const queue = new Queue();

for (const virus of initialViruses) {
  queue.push(virus);
}

while (queue.size) {
  const [virusType, time, x, y] = queue.shift();

  if (time >= S) break;

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx < 0 || nx >= N || ny < 0 || ny >= N || map[nx][ny] > 0) continue;

    map[nx][ny] = virusType;
    queue.push([virusType, time + 1, nx, ny]);
  }
}

console.log(map[X - 1][Y - 1]);
