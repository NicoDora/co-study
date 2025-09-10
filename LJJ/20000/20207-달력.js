const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().toString().split('\n');

/**
 * 문제 url: https://www.acmicpc.net/problem/20207
 * 문제 이름: 달력
 * 시작 시각: 9/10/2025, 1:11:29 PM
 * 1단계 (문제 이해 및 조건 분석): 10분
 * 2단계 (알고리즘 선택): 0분
 * 3단계 (구현 및 테스트): 1시간 30분
 * 4단계 (디버깅 및 제출): 0분
 */
function main(N, plan) {
  const days = Array(366).fill(0);

  for (let [s, e] of plan) {
    for (let d = s; d <= e; d++) {
      days[d]++;
    }
  }

  let sum = 0;
  let width = 0;
  let height = 0;

  for (let d = 1; d <= 365; d++) {
    if (days[d] > 0) {
      width++;
      height = Math.max(height, days[d]);
    } else {
      // 띄워지는 구간이 있다면 더하고, 초기화
      if (width > 0) {
        sum += width * height;
        width = 0;
        height = 0;
      }
    }
  }

  if (width > 0) sum += width * height;

  console.log(sum);
}

const N = +input[0];
const plan = input.slice(1).map((line) => line.split(' ').map(Number));
main(N, plan);
