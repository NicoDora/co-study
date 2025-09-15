const fs = require('fs');
const input =
  process.platform !== 'linux'
    ? fs.readFileSync(`${__dirname}/../input.txt`).toString().trim().split('\n')
    : fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const chemicalFormula = input[0];

/**
 * 문제 url: https://www.acmicpc.net/problem/2257
 * 문제 이름: 화학식량
 * 시작 시각: 2025. 9. 15. 오전 9:18:41
 * 1단계 (문제 이해 및 조건 분석): 3분
 * 2단계 (알고리즘 선택): 9분
 * 3단계 (구현 및 테스트): 38분
 * 4단계 (디버깅 및 제출): 5분
 */
function main(chemicalFormula) {
  const calculateFormula = (formula) => {
    return Function(`"use strict";
     return ${formula};
    `)();
  };
  const atomicMass = new Map([
    ['H', '1'],
    ['C', '12'],
    ['O', '16'],
  ]);

  const formula = chemicalFormula
    .replace(/\(\)/g, '')
    .replace(/\(/g, '+(')
    .replace(/[A-Z]/g, (str) => `+${str}`)
    .replace(/[2-9]/g, (str) => `*${str}`)
    .replace(/[A-Z]/g, (str) => atomicMass.get(str));

  console.log(calculateFormula(formula));
}

main(chemicalFormula);
