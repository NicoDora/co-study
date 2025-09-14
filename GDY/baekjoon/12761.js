const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim();

//이동방법 +1, -1
// +- A, +- B
// 현위치 * A  현위치* B
//무넺이해10분
class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  enqueue(value) {
    this.queue[this.rear] = value;
    this.rear += 1;
  }
  dequeue() {
    const returnValue = this.queue[this.front];
    this.front += 1;
    return returnValue;
  }
  size() {
    return this.rear - this.front;
  }
}

function main(A, B, N, M) {
  const visited = Array.from({ length: 100001 }, () => null);
  const moveCount = bfs(A, B, N, M, visited);
  console.log(moveCount);
}

function bfs(A, B, N, M, visited) {
  const queue = new Queue();
  queue.enqueue(N);
  visited[N] = 0;

  while (queue.size() !== 0) {
    const currentLocation = queue.dequeue();

    if (currentLocation === M) {
      return visited[currentLocation];
    }

    const nextMoveArray = [
      currentLocation + 1,
      currentLocation - 1,
      currentLocation + A,
      currentLocation + B,
      currentLocation - A,
      currentLocation - B,
      currentLocation * A,
      currentLocation * B,
    ];

    for (const nextLocation of nextMoveArray) {
      if (nextLocation < 0 || nextLocation > 100000) continue;
      if (visited[nextLocation] !== null) continue;
      queue.enqueue(nextLocation);
      visited[nextLocation] = visited[currentLocation] + 1;
    }
  }

  return moveCount;
}

const [A, B, N, M] = input.split(' ').map(Number);
main(A, B, N, M);
