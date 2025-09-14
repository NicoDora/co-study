const fs = require('fs');
const input =
  process.platform !== 'linux'
    ? fs.readFileSync(`${__dirname}/../input.txt`).toString().trim().split('\n')
    : fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [NM, ...arr] = input;
const [N, M] = NM.split(' ');
const stringArr = arr.slice(0, N);
const substringArr = arr.slice(N, N + M);

/**
 * 문제 url: https://www.acmicpc.net/problem/14426
 * 문제 이름: 접두사 찾기
 * 시작 시각: 2025. 9. 9. 오후 2:01:38
 * 1단계 (문제 이해 및 조건 분석): 4분
 * 2단계 (알고리즘 선택): 0분
 * 3단계 (구현 및 테스트): 13분
 * 4단계 (디버깅 및 제출): 3분
 */
function main(strings, subStrings) {
  const prefixStrSet = new Set();

  for (const str of strings) {
    for (let i = 1; i < str.length + 1; i += 1) {
      prefixStrSet.add(str.slice(0, i));
    }
  }

  let prefixCount = 0;

  for (const subString of subStrings) {
    prefixCount += Number(prefixStrSet.has(subString));
  }

  console.log(prefixCount);
}

main(stringArr, substringArr);
