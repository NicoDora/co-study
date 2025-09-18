const { join } = require("path");
const { readFileSync } = require("fs");

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
    } else {
      this.rear.next = newNode;
    }
    this.rear = newNode;
    this.size++;
  }
  shift() {
    if (this.size === 0) return null;
    const data = this.front.data;
    this.front = this.front.next;
    if (!this.front) {
      this.rear = null;
    }
    this.size--;
    return data;
  }
}

const [N, M, T, board] = input();

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function bfs() {
  const queue = new Queue();

  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => [false, false])
  );
  queue.push([0, 0, 0, 0]);
  visited[0][0][0] = true;

  while (queue.size > 0) {
    const [y, x, time, hasSword] = queue.shift();

    if (y === N - 1 && x === M - 1 && time <= T) {
      return time;
    }
    if (time >= T) continue;

    for (const [dy, dx] of dirs) {
      const ny = y + dy;
      const nx = x + dx;

      if (ny < 0 || ny >= N || nx < 0 || nx >= M) continue;

      let nextHasSword = hasSword;
      if (board[ny][nx] === 2) {
        nextHasSword = 1;
      }

      if (visited[ny][nx][nextHasSword]) continue;

      if (hasSword === 1) {
        visited[ny][nx][1] = true;
        queue.push([ny, nx, time + 1, 1]);
      } else {
        if (board[ny][nx] !== 1) {
          visited[ny][nx][nextHasSword] = true;
          queue.push([ny, nx, time + 1, nextHasSword]);
        }
      }
    }
  }

  return "Fail";
}

console.log(bfs());

function input() {
  const path =
    process.platform === "linux" ? "/dev/stdin" : join(__dirname, "input.txt");
  const lines = readFileSync(path, "utf8").trim().split("\n");
  const [N, M, T] = lines[0].split(" ").map(Number);
  const board = lines
    .slice(1)
    .map((line) => line.trim().split(" ").map(Number));
  return [N, M, T, board];
}
