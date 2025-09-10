const fs = require('fs');
const input =
  process.platform !== 'linux'
    ? fs.readFileSync(`${__dirname}/../input.txt`).toString().trim().split('\n')
    : fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [_, ...arr] = input;

/**
 * 문제 url: https://www.acmicpc.net/problem/20207
 * 문제 이름: 달력
 * 시작 시각: 2025. 9. 10. 오전 9:28:06
 * 1단계 (문제 이해 및 조건 분석): 8분
 * 2단계 (알고리즘 선택): 1분
 * 3단계 (구현 및 테스트): 14분
 * 4단계 (디버깅 및 제출): 1분
 */
function main(schedules) {
  const promiseCountArr = new Array(367).fill(0);

  for (const schedule of schedules) {
    const [startDay, endDay] = schedule;

    for (let i = startDay; i <= endDay; i += 1) {
      promiseCountArr[i] += 1;
    }
  }

  let coatedPaperArea = 0;
  let maxPromiseCount = 0;
  let continuousScheduleCount = 0;

  for (const promiseCount of promiseCountArr) {
    if (promiseCount === 0) {
      coatedPaperArea += maxPromiseCount * continuousScheduleCount;
      maxPromiseCount = 0;
      continuousScheduleCount = 0;
    } else {
      continuousScheduleCount += 1;
      maxPromiseCount = Math.max(maxPromiseCount, promiseCount);
    }
  }

  console.log(coatedPaperArea);
}

main(
  arr.map((el) => {
    return el.split(' ').map(Number);
  })
);
