const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "LJJ/baekjoon/input.txt";
const input = fs.readFileSync(filePath, "utf8").trim().toString().split("\n");

//그래프 알고리즘을 활용한 최대 개수 구하는 문제
//BFS알고리즘을 횔용한 최대 개수 구하기

const N = Number(input[0]);
const graph = input.slice(1).map((line) => line.trim().split(""));

const direction = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

let max = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < 4; k++) {
      const dx = direction[k][0];
      const dy = direction[k][1];
      const nx = i + dx;
      const ny = j + dy;

      if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
        if (graph[nx][ny] !== graph[i][j]) {
          //다른 값일경우 색을 바꾸기
          [graph[nx][ny], graph[i][j]] = [graph[i][j], graph[nx][ny]];
          //최대값인지 계산
          max = Math.max(max, count_candy());
          //원위치
          [graph[i][j], graph[nx][ny]] = [graph[nx][ny], graph[i][j]];
        }
      }
    }
  }
}
console.log(max);

// 최대 개수 세는 메서드
function count_candy() {
  let [row_cnt, col_cnt, row_max, col_max] = [1, 1, -1e9, -1e9];

  // 행(row) 계산
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N - 1; j++) {
      // 동일한 색상이라면
      if (graph[i][j] === graph[i][j + 1]) {
        row_cnt++;
      } else {
        row_cnt = 1;
      }
      row_max = Math.max(row_cnt, row_max);
    }
    row_cnt = 1;
  }

  // 열(column) 계산
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N - 1; i++) {
      // 동일한 색상이라면
      if (graph[i][j] === graph[i + 1][j]) {
        col_cnt++;
      } else {
        col_cnt = 1;
      }
      col_max = Math.max(col_cnt, col_max);
    }
    col_cnt = 1;
  }
  return (answer = Math.max(row_max, col_max));
}
