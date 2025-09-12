const fs = require('fs');
const input =
  process.platform !== 'linux'
    ? fs.readFileSync(`${__dirname}/../input.txt`).toString().trim().split('\n')
    : fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [A, B, startPoint, endPoint] = input[0].split(' ').map(Number);

class Node {
  idx;
  count;

  constructor(idx, count) {
    this.idx = idx;
    this.count = count;
  }
}

/**
 * 문제 url: https://www.acmicpc.net/problem/12761
 * 문제 이름: 돌다리
 * 시작 시각: 2025. 9. 11. 오후 6:18:12
 * 1단계 (문제 이해 및 조건 분석): 5분
 * 2단계 (알고리즘 선택): 0분
 * 3단계 (구현 및 테스트): 55분
 * 4단계 (디버깅 및 제출): 11분
 */
function main(startPoint, endPoint, A, B) {
  let lastNode;
  let head = 0;
  const needVisitNodes = [new Node(startPoint, 0)];
  const visitedNodeSet = new Set();

  while (needVisitNodes.length !== 0) {
    const currentNode = needVisitNodes[head++];

    if (currentNode.idx === endPoint) {
      lastNode = currentNode;
      break;
    }

    if (!visitedNodeSet.has(currentNode.idx)) {
      visitedNodeSet.add(currentNode.idx);
      const newNodes = [
        currentNode.idx * A,
        currentNode.idx * B,
        currentNode.idx - A,
        currentNode.idx + A,
        currentNode.idx - B,
        currentNode.idx + B,
        currentNode.idx - 1,
        currentNode.idx + 1,
      ]
        .filter((el) => el >= 0 && el <= 100000)
        .filter((el) => {
          if (visitedNodeSet.has(el)) {
            visitedNodeSet.add(el);
            return false;
          }
          return true;
        })
        .map((el) => new Node(el, currentNode.count + 1));

      newNodes.forEach((node) => needVisitNodes.push(node));
    }
  }

  console.log(lastNode.count);
}

main(startPoint, endPoint, A, B);
