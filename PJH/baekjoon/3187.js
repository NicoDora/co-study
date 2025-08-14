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
  let v = 0;
  let k = 0;

  queue.push([i, j]);
  visited[i][j] = true;

  if (map[i][j] === "v") v++;
  else if (map[i][j] === "k") k++;

  while (queue.size) {
    const [x, y] = queue.shift();

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx < 0 ||
        nx >= R ||
        ny < 0 ||
        ny >= C ||
        map[nx][ny] === "#" ||
        visited[nx][ny]
      ) {
        continue;
      }

      if (map[nx][ny] === "v") v++;
      else if (map[nx][ny] === "k") k++;

      queue.push([nx, ny]);
      visited[nx][ny] = true;
    }
  }

  if (v >= k) return [v, 0];
  return [0, k];
}

const [R, C] = input[0].split(" ").map(Number);
const map = input.slice(1).map((row) => row.split(""));
const visited = Array.from({ length: R }, () => Array(C).fill(false));
const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
let totalV = 0;
let totalK = 0;

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (map[i][j] === "#" || visited[i][j]) continue;

    const [v, k] = bfs(i, j);
    totalV += v;
    totalK += k;
  }
}

console.log(totalK, totalV);
