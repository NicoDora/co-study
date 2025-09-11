const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

class Queue {
  constructor(size) {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
    this.maxSize = size + 1;
  }
  enqueue(item) {
    this.queue[this.rear] = item;
    this.rear = (this.rear + 1) % this.maxSize;
  }

  dequeue() {
    const returnValue = this.queue[this.front];
    this.front = (this.front + 1) % this.maxSize;
    return returnValue;
  }
}
const [N, d, k, c] = input[0].trim().split(' ').map(Number);
const sushiList = Array.from({ length: N }, (_, i) => Number(input[i + 1]));
const extendedSushiList = [...sushiList, ...sushiList];

const queue = new Queue(k);
const sushiMap = new Map();
for (let i = 0; i < k; i++) {
  const sushi = extendedSushiList[i];
  queue.enqueue(sushi);
  sushiMap.set(sushi, (sushiMap.get(sushi) || 0) + 1);
}

let maxSize = sushiMap.size;
if (!sushiMap.has(c)) {
  maxSize++;
}
let currentSize = 0;
for (let i = k; i < N + k; i++) {
  const left = queue.dequeue();
  const leftCount = sushiMap.get(left);

  if (leftCount === 1) {
    sushiMap.delete(left);
  } else {
    sushiMap.set(left, leftCount - 1);
  }
  const sushi = extendedSushiList[i];
  sushiMap.set(sushi, (sushiMap.get(sushi) || 0) + 1);
  queue.enqueue(sushi);

  currentSize = sushiMap.size;
  if (!sushiMap.has(c)) {
    currentSize++;
  }

  maxSize = Math.max(maxSize, currentSize);
}

console.log(maxSize);
