const fs = require('fs');
const input =
  process.platform !== 'linux'
    ? fs.readFileSync(`${__dirname}/../input.txt`).toString().trim().split('\n')
    : fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [_, minOfSum, maxOfSum, minDifference] = input[0].split(' ').map(Number);
const problems = input[1].split(' ').map(Number);

Math.sum = (arr) => arr.reduce((acc, cur) => acc + cur);

/**
 * 문제 url: https://www.acmicpc.net/problem/16938
 * 문제 이름: 캠프 준비
 * 시작 시각: 2025. 9. 19. 오후 13:01:07
 * 1단계 (문제 이해 및 조건 분석): 4분
 * 2단계 (알고리즘 선택): 15분
 * 3단계 (구현 및 테스트): 18분
 * 4단계 (디버깅 및 제출): 분
 */
function main(minOfSum, maxOfSum, minDifference, problems) {
  const getCombinations = (arr, selectNumber) => {
    let results = [];
    if (selectNumber === 1) return arr.map((el) => [el]);

    arr.forEach((fixed, index, origin) => {
      const rest = origin.slice(index + 1);
      const combinations = getCombinations(rest, selectNumber - 1);
      const attached = combinations.map((el) => [fixed].concat(el));
      results = results.concat(attached);
    });

    return results;
  };

  problems.sort((a, b) => a - b);

  let cases = [];

  for (let i = 2; i <= problems.length; i += 1) {
    cases = cases.concat(getCombinations(problems, i));
  }

  const validCases = cases.filter((el) => {
    if (el.at(-1) - el[0] < minDifference) {
      return false;
    }

    const sum = Math.sum(el);

    if (sum >= minOfSum && sum <= maxOfSum) {
      return true;
    }

    return false;
  });

  console.log(validCases.length);
}

main(minOfSum, maxOfSum, minDifference, problems);
