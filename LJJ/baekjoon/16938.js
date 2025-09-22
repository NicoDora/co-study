const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const [N, sumMin, sumMax, diff] = input[0].split(' ').map(Number);
const levelList = input[1].split(' ').map(Number);

const visited = Array(N).fill(false);
let answer = 0;

function dfs(idx) {
  // 1. 종료 조건
  if (idx === N) {
    const chosen = [];
    for (let i = 0; i < N; i++) {
      if (visited[i]) chosen.push(levelList[i]);
    }

    if (chosen.length >= 2) {
      const sum = chosen.reduce((a, b) => a + b, 0);
      const minVal = Math.min(...chosen);
      const maxVal = Math.max(...chosen);

      if (sum >= sumMin && sum <= sumMax && maxVal - minVal >= diff) {
        answer++;
      }
    }
    return;
  }

  // 2. 현재 문제 선택
  visited[idx] = true;
  dfs(idx + 1);

  // 3. 현재 문제 선택 X
  visited[idx] = false;
  dfs(idx + 1);
}

dfs(0);

console.log(answer);
