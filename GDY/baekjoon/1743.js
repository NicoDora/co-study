const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

class Queue {
  constructor(size) {
    this.front = 0;
    this.rear = 0;
    this.size = size + 1;
    this.items = [];
  }

  isEmpty() {
    return this.front === this.rear;
  }

  isFull() {
    return this.front === (this.rear + 1) % this.size;
  }

  enqueue(item) {
    if (this.isFull()) return;
    this.items[this.rear] = item;
    this.rear = (this.rear + 1) % this.size;
  }

  dequeue() {
    if (this.isEmpty()) return;
    const item = this.items[this.front];
    this.front = (this.front + 1) % this.size;
    return item;
  }
}

const dCol = [0, 0, 1, -1];
const dRow = [1, -1, 0, 0];
const [N, M, K] = parseStringToNumberArray(input[0]);
const aisle = Array.from({ length: N }, () => new Array(M).fill('.'));
const size = [];
for (let i = 1; i <= K; i++) {
  const [x, y] = parseStringToNumberArray(input[i]);
  aisle[x - 1][y - 1] = '#';
}
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (aisle[i][j] === '#') {
      size.push(bfs(i, j));
    }
  }
}

function bfs(row, col) {
  const queue = new Queue(N * M);
  queue.enqueue([row, col]);
  aisle[row][col] = '.';
  let size = 1;

  while (!queue.isEmpty()) {
    const [cRow, cCol] = queue.dequeue();
    for (let i = 0; i < 4; i++) {
      const nRow = cRow + dRow[i];
      const nCol = cCol + dCol[i];
      if (nRow < 0 || nCol < 0 || nRow >= N || nCol >= M) continue;
      if (aisle[nRow][nCol] === '#') {
        aisle[nRow][nCol] = '.';
        queue.enqueue([nRow, nCol]);
        size++;
      }
    }
  }
  return size;
}

function parseStringToNumberArray(str) {
  return str.trim().split(' ').map(Number);
}

console.log(Math.max(...size));
