const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

class Queue {
  constructor(size) {
    this.items = [];
    this.front = 0;
    this.rear = 0;
    this.maxSize = size + 1;
  }
  isEmpty() {
    return this.front === this.rear;
  }
  enqueue(item) {
    this.items[this.rear] = item;
    this.rear = (this.rear + 1) % this.maxSize;
  }
  dequeue() {
    const item = this.items[this.front];
    this.front = (this.front + 1) % this.maxSize;
    return item;
  }
}
const [R, C] = input[0].split(' ').map(Number);
const dRow = [1, -1, 0, 0];
const dCol = [0, 0, 1, -1];

const farm = Array.from({ length: R }, (_, index) =>
  input[index + 1].trim().split('')
);

const queue = new Queue(R * C);
let kCount = 0;
let vCount = 0;
let kTotal = 0;
let vTotal = 0;

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (farm[i][j] === '.' || farm[i][j] === 'v' || farm[i][j] === 'k') {
      bfs(i, j);
      if (vCount >= kCount) {
        vTotal += vCount;
      } else {
        kTotal += kCount;
      }
      vCount = 0;
      kCount = 0;
    }
  }
}
console.log(kTotal, vTotal);
function bfs(row, col) {
  queue.front = 0;
  queue.rear = 0;
  queue.enqueue([row, col]);
  if (farm[row][col] === 'v') {
    vCount++;
  } else if (farm[row][col] === 'k') {
    kCount++;
  }
  farm[row][col] = 'O';
  while (!queue.isEmpty()) {
    const [cRow, cCol] = queue.dequeue();

    for (let i = 0; i < 4; i++) {
      const nRow = cRow + dRow[i];
      const nCol = cCol + dCol[i];

      if (nRow < 0 || nCol < 0 || nRow >= R || nCol >= C) continue;
      const cell = farm[nRow][nCol];

      if (cell === '#' || cell === 'O') continue;

      if (cell === 'v') {
        vCount++;
      } else if (cell === 'k') {
        kCount++;
      }
      farm[nRow][nCol] = 'O';

      queue.enqueue([nRow, nCol]);
    }
  }
}
