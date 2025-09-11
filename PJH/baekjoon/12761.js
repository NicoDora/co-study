const fs = require("fs");
const [A, B, N, M] = fs
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number); // local 파일
// const [A, B, N, M] = fs.readFileSync(0, "utf-8").toString().trim().split(" ").map(Number); // 문제 제출 시

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

const queue = new Queue();
const visited = Array(100001).fill(false);

queue.push([N, 0]);

while (queue.size) {
  const [position, count] = queue.shift();
  const nextCases = [
    position + 1,
    position - 1,
    position + A,
    position - A,
    position + B,
    position - B,
    position * A,
    position * B,
  ];

  if (position === M) {
    console.log(count);
    return;
  }

  for (const next of nextCases) {
    if (next < 0 || next > 100000 || visited[next] === true) continue;

    queue.push([next, count + 1]);
    visited[next] = true;
  }
}
