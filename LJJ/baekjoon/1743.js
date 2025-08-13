const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "LJJ/baekjoon/input.txt";
const input = fs.readFileSync(filePath, "utf8").trim().toString().split("\n");

// 1단계 (문제 이해 및 조건 분석): 가장 큰 음식물의 크기를 구하기 (모든 경로에 대해서 가장 큰 값을 가지는 경로 구하기)
// 2단계 (알고리즘 선택): bfs?, 그래프? 10분
// 3단계 (구현 및 테스트): 40분
// 4단계 (디버깅 및 제출): 60분

const [N, M, K] = input[0].split(" ").map(Number);
const trashLocation = input.slice(1).map((ele) => ele.split(" ").map(Number));

const path = Array.from({ length: N }, () => new Array(M).fill(0));
const visited = Array.from({ length: N }, () => new Array(M).fill(false));

for (const [x, y] of trashLocation) {
  path[x - 1][y - 1] = 1;
}

const direction = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];
const result = [];

for (let i = 0; i < K; i++) {
  let x = trashLocation[i][0] - 1;
  let y = trashLocation[i][1] - 1;

  const bfs = (x, y) => {
    let count = 1;
    const queue = [];
    queue.push([x, y]);

    while (queue.length > 0) {
      const [tx, ty] = queue.shift();
      visited[tx][ty] = true;

      for (let i = 0; i < 4; i++) {
        const nx = tx + direction[i][0];
        const ny = ty + direction[i][1];

        if (nx < 0 || ny < 0 || nx >= N || ny >= M) {
          continue;
        } else {
          if (!visited[nx][ny]) {
            visited[nx][ny] = true;
            if (path[nx][ny] === 1) {
              queue.push([nx, ny]);
              count++;
            }
          }
        }
      }
    }
    result.push(count);
  };
  bfs(x, y);
}
console.log(Math.max(...result));
