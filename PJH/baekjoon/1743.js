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

function bfs(i, j) {
  const queue = new Queue();
  let count = 1;

  queue.push([i, j]);
  visited[i][j] = true;

  while (queue.size) {
    const [x, y] = queue.shift();

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx < 0 ||
        nx >= N ||
        ny < 0 ||
        ny >= M ||
        !map[nx][ny] ||
        visited[nx][ny]
      ) {
        continue;
      }

      queue.push([nx, ny]);
      visited[nx][ny] = true;
      count++;
    }
  }

  return count;
}

const [N, M, K] = input[0].split(" ").map(Number);
const coordinate = input.slice(1).map((row) => row.split(" ").map(Number));
const map = Array.from({ length: N }, () => Array(M).fill(false));
const visited = Array.from({ length: N }, () => Array(M).fill(false));
const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
let max = 0;

for (const [x, y] of coordinate) {
  map[x - 1][y - 1] = true;
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j]) max = Math.max(max, bfs(i, j));
  }
}

console.log(max);
