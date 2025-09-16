const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().toString();

/**
 * 문제 url: https://www.acmicpc.net/problem/2257
 * 문제 이름: 화학식량
 * 시작 시각: 9/15/2025, 4:04:43 PM
 * 1단계 (문제 이해 및 조건 분석): 분
 * 2단계 (알고리즘 선택): 분
 * 3단계 (구현 및 테스트): 분
 * 4단계 (디버깅 및 제출): 분
 */

class Stack {
  constructor() {
    this.stack = {};
    this.size = 0;
  }

  isClear() {
    if (this.size === 0) {
      return true;
    }
  }

  getSize() {
    return this.size;
  }

  push(value) {
    this.stack[this.size++] = value;
  }

  pop() {
    if (this.size === 0) return null;
    const prev = this.stack[--this.size];
    delete this.stack[this.size];
    return prev;
  }
}

function getMass(CF) {
  switch (CF) {
    case 'H':
      return 1;
    case 'C':
      return 12;
    case 'O':
      return 16;
  }
}

function main(CF) {
  const arr = CF.split('');
  const stack = new Stack();
  let index = 0;

  while (index < arr.length) {
    if (arr[index] === '(') {
      stack.push('(');
      index++;
    } else if (arr[index] === ')') {
      let sum = 0;
      while (true) {
        const cur = stack.pop();
        if (cur === '(') break;
        sum += cur;
      }
      stack.push(sum);
      index++;
    } else if (/[2-9]/.test(arr[index])) {
      const cur = stack.pop();
      stack.push(cur * Number(arr[index]));
      index++;
    } else {
      stack.push(getMass(arr[index]));
      index++;
    }
  }

  let result = 0;
  while (stack.getSize() > 0) {
    result += stack.pop();
  }
  console.log(result);
}

/**
 * H: 1
 * C: 12
 * O: 16
 */

main(input);
