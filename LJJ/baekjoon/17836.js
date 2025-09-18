const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

class Queue {
  constructor() {
    this.queue = {};
    this.front = 0;
    this.end = 0;
  }

  size() {
    return this.end - this.front;
  }

  enqueue(value) {
    this.queue[this.end] = value;
    this.end++;
  }

  dequeue() {
    if (this.size() <= 0) {
      return null;
    }
    const prev = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    return prev;
  }
}

const [N, M, T] = input[0].split(' ').map(Number);
const castle = input.slice(1).map((line) => line.split(' ').map(Number));

const visited = Array.from({ length: N + 1 }, () =>
  new Array(M + 1).fill(false)
);

let move = 0;

const dirRow = [-1, 1, 0, 0];
const dirCol = [0, 0, -1, 1];

function bfs() {
  const queue = new Queue();
  queue.enqueue([0, 0, 0, 0]);

  while (queue.size() > 0) {
    const [col, row, time, sword] = queue.dequeue();

    if (time > T) {
      continue;
    }

    if (col === N - 1 && row === M - 1) {
      return time;
    }

    for (let i = 0; i < 4; i++) {
      const newRow = row + dirRow[i];
      const newCol = col + dirCol[i];

      if (newRow < 0 || newCol < 0 || newRow >= M || newCol >= N) {
        continue;
      }

      if (!visited[newCol][newRow][sword]) {
        if (castle[newCol][newRow] === 0) {
          visited[newCol][newRow][sword] = true;
          queue.enqueue([newCol, newRow, time + 1, sword]);
        } else if (castle[newCol][newRow] === 1 && sword === 1) {
          visited[newCol][newRow][1] = true;
          queue.enqueue([newCol, newRow, time + 1, 1]);
        } else if (castle[newCol][newRow] === 2) {
          visited[newCol][newRow][1] = true;
          queue.enqueue([newCol, newRow, time + 1, 1]);
        }
      }
    }
  }
  return -1;
}

const result = bfs();
if (result === -1) {
  console.log('Fail');
} else {
  console.log(result);
}
