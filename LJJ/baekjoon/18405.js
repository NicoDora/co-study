const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : "LJJ/baekjoon/input.txt";
const input = fs.readFileSync(filePath, "utf8").trim().toString().split("\n");

//bfs문제
// 매 초 마다, 번호가 낮은 순서대로, 상하죄우 바이러스를 퍼뜨림

// N : 시험관 크기
// K : 시험관 내 바이러스 최대 크기
// S : 몇 초 뒤
// X, Y: 해당 좌표의 바이러스를 구하기

function bfs(positions) {
  const nextPositions = [];

  for (const [tx, ty] of positions) {
    const current = testTube[tx][ty];

    for (let i = 0; i < 4; i++) {
      const nx = tx + directions[i][0];
      const ny = ty + directions[i][1];

      if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
        if (testTube[nx][ny] === 0) {
          testTube[nx][ny] = current;
          nextPositions.push([nx, ny]);
        }
      }
    }
  }
  return nextPositions; // 다음 초에 퍼질 좌표들 반환
}

//바이러스 처음 시작 위치 저장 그래프 만들기
function getGraph(testTube, k) {
  const graph = Array.from({ length: k }, () => []);
  const length = testTube.length;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      const current = testTube[i][j];
      if (current) {
        graph[current - 1].push([i, j]);
      }
    }
  }
  return graph;
}

const [N, K] = input[0].split(" ").map(Number);
const testTube = input
  .slice(1, N + 1)
  .map((line) => line.split(" ").map(Number));
const [S, X, Y] = input[N + 1].split(" ").map(Number);

const directions = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

const graph = getGraph(testTube, K);

for (let s = 0; s < S; s++) {
  for (let i = 0; i < K; i++) {
    if (graph[i].length > 0) {
      graph[i] = bfs(graph[i]);
    }
  }
}

console.log(testTube[X - 1][Y - 1]);
