const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().toString();

/**
 * 문제 url: https://www.acmicpc.net/problem/12761
 * 문제 이름: 돌다리
 * 시작 시각: 9/11/2025, 1:05:18 PM
 * 1단계 (문제 이해 및 조건 분석): 30분
 * 2단계 (알고리즘 선택): 0분
 * 3단계 (구현 및 테스트): 1시간
 * 4단계 (디버깅 및 제출): 20분
 */

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
    this.queue[this.end++] = value;
  }

  dequeue() {
    if (this.size() > 0) {
      let remove = this.queue[this.front];
      delete this.queue[this.front++];

      return remove;
    }
  }
}

function main(forceA, forceB, locationN, locationM) {
  const queue = new Queue();
  queue.enqueue([locationN, 0]);
  visited[locationN] = true;

  while (queue.size() > 0) {
    const [curLocation, jump] = queue.dequeue();

    if (curLocation === locationM) {
      return jump;
    }

    const moves = [
      curLocation + 1,
      curLocation - 1,
      curLocation + forceA,
      curLocation - forceA,
      curLocation + forceB,
      curLocation - forceB,
      curLocation * forceA,
      curLocation * forceB,
    ];

    for (let next of moves) {
      if (next >= 0 && next <= 100000 && !visited[next]) {
        visited[next] = true;
        queue.enqueue([next, jump + 1]);
      }
    }
    console.log(queue);
  }
}

// 8가지 방법
// 1. +1
// 2. -1
// 3. A 만큰 더함
// 4. B 만큼 더함
// 5. A 만큼 곱함
// 6. B 만큰 곱함
// 7. A 만큼 뺌,
// 8. B 만큼 뺌,
const [A, B, N, M] = input.split(' ').map(Number);
const visited = Array.from({ length: 100001 }, () => false);

const result = main(A, B, N, M);
console.log(result);
