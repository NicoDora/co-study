const fs = require('fs');
const input =
  process.platform !== 'linux'
    ? fs.readFileSync(`${__dirname}/../input.txt`).toString().trim().split('\n')
    : fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, ...fixedSeats] = input;

/**
 * 문제 url: https://www.acmicpc.net/problem/2302
 * 문제 이름: 극장 좌석
 * 시작 시각: 2025. 9. 23. 오후 1:25:37
 * 1단계 (문제 이해 및 조건 분석): 2분
 * 2단계 (알고리즘 선택): 5분
 * 3단계 (구현 및 테스트): 25분
 * 4단계 (디버깅 및 제출): 분
 */
function main(seatsCount, fixedSeats) {
  const fibonacci = (n) => {
    if (n <= 2) {
      return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  fixedSeats.unshift(0);
  fixedSeats.push(seatsCount + 1);

  const spots = [];

  for (let i = 1; i < fixedSeats.length; i += 1) {
    spots.push(fixedSeats[i] - fixedSeats[i - 1] - 1);
  }

  console.log(
    spots
      .filter((spot) => spot !== 0)
      .reduce((acc, cur) => acc * fibonacci(cur), 1)
  );
}

main(Number(N), fixedSeats.map(Number));
