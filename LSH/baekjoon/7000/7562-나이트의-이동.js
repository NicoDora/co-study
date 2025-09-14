const fs = require('fs');
const input =
  process.platform !== 'linux'
    ? fs.readFileSync(`${__dirname}/../input.txt`).toString().trim().split('\n')
    : fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const cases = [];

for (let i = 1; i < input.length; i += 3) {
  const boardLength = Number(input[i]);
  const startIndex = input[i + 1].split(' ').map(Number);
  const arriveIndex = input[i + 2].split(' ').map(Number);
  cases.push([boardLength, startIndex, arriveIndex]);
}

class Node {
  x;
  y;
  count;

  constructor(x, y, count) {
    this.x = x;
    this.y = y;
    this.count = count;
  }
}

/**
 * 문제 url: https://www.acmicpc.net/problem/7562
 * 문제 이름: 나이트의 이동
 * 시작 시각: 2025. 9. 14. 오후 2:36:20
 * 1단계 (문제 이해 및 조건 분석): 1분
 * 2단계 (알고리즘 선택): 10분
 * 3단계 (구현 및 테스트): 41분
 * 4단계 (디버깅 및 제출): 78분
 */
function main(cases) {
  const results = cases.map((el) => {
    let head = 0;
    const maxBoardLength = el[0];
    const [startX, startY] = el[1];
    const [endX, endY] = el[2];
    const needVisitedNodes = [new Node(startX, startY, 0)];
    const visited = Array.from({ length: maxBoardLength }, () =>
      Array(maxBoardLength).fill(false)
    );
    visited[needVisitedNodes[0].x][needVisitedNodes[0].y] = true;

    while (needVisitedNodes.length > head) {
      const currentNode = needVisitedNodes[head++];

      if (currentNode.x === endX && currentNode.y === endY) {
        return currentNode.count;
      }

      const newNodes = [
        [currentNode.x + 1, currentNode.y + 2],
        [currentNode.x + 1, currentNode.y - 2],
        [currentNode.x - 1, currentNode.y + 2],
        [currentNode.x - 1, currentNode.y - 2],
        [currentNode.x + 2, currentNode.y + 1],
        [currentNode.x + 2, currentNode.y - 1],
        [currentNode.x - 2, currentNode.y + 1],
        [currentNode.x - 2, currentNode.y - 1],
      ]
        .map(([x, y]) => new Node(x, y, currentNode.count + 1))
        .filter((node) => node.x >= 0 && node.y >= 0)
        .filter(
          (node) => node.x <= maxBoardLength - 1 && node.y <= maxBoardLength - 1
        )
        .filter((node) => !visited[node.x][node.y]);

      newNodes.forEach((node) => {
        visited[node.x][node.y] = true;
      });
      newNodes.forEach((node) => needVisitedNodes.push(node));
    }
  });

  results.forEach((result) => console.log(result));
}

main(cases);
