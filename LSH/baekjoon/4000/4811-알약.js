const fs = require('fs');
const input =
  process.platform !== 'linux'
    ? fs.readFileSync(`${__dirname}/../input.txt`).toString().trim().split('\n')
    : fs.readFileSync('/dev/stdin').toString().trim().split('\n');

input.pop();

/**
 * 문제 url: https://www.acmicpc.net/problem/4811
 * 문제 이름: 알약
 * 시작 시각: 2025. 9. 12. 오후 1:20:13
 * 1단계 (문제 이해 및 조건 분석): 3분
 * 2단계 (알고리즘 선택): 45분
 * 3단계 (구현 및 테스트): 26분
 * 4단계 (디버깅 및 제출): 1분
 */
function main(numbers) {
  const factorial = (n) => {
    n = BigInt(n);
    if (n <= 1n) {
      return n;
    }
    return n * factorial(n - 1n);
  };

  const arr = Array.from({ length: 30 }, (_, idx) => {
    idx = BigInt(idx + 1);
    return factorial(idx * 2n) / factorial(idx) ** 2n / (idx + 1n);
  });

  numbers.forEach((number) => console.log(Number(arr[number - 1])));
}

main(input.map(Number));
