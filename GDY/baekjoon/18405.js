const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

class Queue {
  constructor(size) {
    this.items = [];
    this.maxSize = size + 1;
    this.front = 0;
    this.rear = 0;
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

  isEmpty() {
    return this.front === this.rear;
  }
}
const dCol = [0, 0, 1, -1];
const dRow = [1, -1, 0, 0];
const [N, K] = input[0].split(' ').map(Number);
const [S, X, Y] = input[N + 1].split(' ').map(Number);
const queue = new Queue(N * N);
const testCube = Array.from({ length: N }, (_, i) =>
  input[i + 1].trim().split(' ').map(Number)
);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (testCube[i][j] !== 0) {
      queue.enqueue({ num: testCube[i][j], xy: [i, j], t: 0 });
    }
  }
}
queue.items = queue.items.sort((a, b) => a.num - b.num);

bfs();

function bfs() {
  while (!queue.isEmpty()) {
    const { num, xy, t } = queue.dequeue();
    const [row, col] = xy;
    if (t === S) continue;
    for (let i = 0; i < 4; i++) {
      const nCol = col + dCol[i];
      const nRow = row + dRow[i];
      if (nCol < 0 || nCol >= N || nRow < 0 || nRow >= N) continue;
      if (testCube[nRow][nCol] !== 0) continue;

      testCube[nRow][nCol] = num;
      queue.enqueue({ num, xy: [nRow, nCol], t: t + 1 });
    }
  }
}
console.log(testCube[X - 1][Y - 1]);
