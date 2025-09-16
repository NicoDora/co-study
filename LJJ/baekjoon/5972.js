const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().toString().split('\n');
/**
 * 문제 url: https://www.acmicpc.net/problem/5972
 * 문제 이름: 택배배송
 * 시작 시각: 9/16/2025, 1:02:49 PM
 * 1단계 (문제 이해 및 조건 분석): 분
 * 2단계 (알고리즘 선택): 분
 * 3단계 (구현 및 테스트): 분
 * 4단계 (디버깅 및 제출): 분
 */
class PriorityQueue {
  constructor() {
    this.queue = {}; // index: [value, priority]
    this.front = 0;
    this.end = 0;
  }

  size() {
    return this.end - this.front;
  }

  isEmpty() {
    return this.size() === 0;
  }

  enqueue(element) {
    if (this.isEmpty()) {
      this.queue[this.end++] = element;
    } else {
      // 우선순위에 맞게 삽입 위치 찾기
      let inserted = false;

      for (let i = this.front; i < this.end; i++) {
        if (this.queue[i][1] > element[1]) {
          // 뒤로 밀기
          for (let j = this.end; j > i; j--) {
            this.queue[j] = this.queue[j - 1];
          }
          this.queue[i] = element;
          this.end++;
          inserted = true;
          break;
        }
      }

      // 우선순위가 가장 낮으면 뒤에 추가
      if (!inserted) {
        this.queue[this.end++] = element;
      }
    }
  }

  dequeue() {
    if (this.isEmpty()) return null;

    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;

    // 큐가 비면 초기화
    if (this.isEmpty()) {
      this.queue = {};
      this.front = 0;
      this.end = 0;
    }

    return value;
  }

  peek() {
    return this.isEmpty() ? null : this.queue[this.front];
  }

  print() {
    console.log(this.queue);
  }
}

function main(N, M, loads) {
  const graph = Array.from({ length: N + 1 }, () => []);

  for (let i = 0; i < M; i++) {
    const [a, b, c] = loads[i];
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  }

  const queue = new PriorityQueue();
  queue.enqueue([1, 0]);
  const distance = Array(N + 1).fill(Infinity);
  distance[1] = 0;

  while (queue.size() > 0) {
    const [current, cost] = queue.dequeue();

    if (cost > distance[current]) {
      continue;
    }

    for (let [nextCurrent, nextCost] of graph[current]) {
      const newCost = cost + nextCost;

      if (newCost < distance[nextCurrent]) {
        distance[nextCurrent] = newCost;
        queue.enqueue([nextCurrent, newCost]);
      }
    }
  }
  console.log(distance[N]);
}

const [N, M] = input[0].split(' ').map(Number);
const loads = input.slice(1).map((line) => line.split(' ').map(Number));

main(N, M, loads);
