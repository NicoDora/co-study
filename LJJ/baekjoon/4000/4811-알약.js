const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().toString().split('\n');

/**
 * 문제 url: https://www.acmicpc.net/problem/4811
 * 문제 이름: 알약
 * 시작 시각: 9/12/2025, 12:59:27 PM
 * 1단계 (문제 이해 및 조건 분석): 분
 * 2단계 (알고리즘 선택): 분
 * 3단계 (구현 및 테스트): 분
 * 4단계 (디버깅 및 제출): 분
 */

const NList = input.map(Number);
const memo = Array.from({ length: 31 }, () => Array(31).fill(0));
memo[0][0] = 1;

for (let i = 0; i <= 30; i++) {
  for (let j = 0; j <= 30; j++) {
    if (i > 0) {
      memo[i][j] += memo[i - 1][j + 1];
    }
    if (j > 0) {
      memo[i][j] += memo[i][j - 1];
    }
  }
}
function main(NList) {
  const result = [];
  for (let i = 0; i < NList.length - 1; i++) {
    result.push(memo[NList[i]][0]);
  }
  console.log(result.join('\n'));
}

main(NList);
