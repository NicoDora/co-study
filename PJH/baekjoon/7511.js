const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split("\n"); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split("\n"); // 문제 제출 시

function findRoot(node, parent) {
  if (parent[node] === node) return node;
  return (parent[node] = findRoot(parent[node], parent));
}

function union(node1, node2, parent, rank) {
  const root1 = findRoot(node1, parent);
  const root2 = findRoot(node2, parent);

  if (root1 === root2) return false;

  if (rank[root1] > rank[root2]) parent[root2] = root1;
  else {
    parent[root1] = root2;
    if (rank[root1] === rank[root2]) rank[root2]++;
  }

  return true;
}

const T = Number(input[0]);
const result = [];
let i = 1;

for (let t = 1; t <= T; t++) {
  const n = Number(input[i++]);
  const k = Number(input[i++]);
  const edges = [];
  const currentCase = [];

  for (let j = 0; j < k; j++) {
    const [a, b] = input[i++].split(" ").map(Number);
    edges.push([a, b]);
  }

  const m = Number(input[i++]);
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = Array(n).fill(0);

  for (const [node1, node2] of edges) {
    union(node1, node2, parent, rank);
  }

  for (let j = 0; j < m; j++) {
    const [u, v] = input[i++].split(" ").map(Number);

    if (findRoot(u, parent) === findRoot(v, parent)) currentCase.push(1);
    else currentCase.push(0);
  }

  result.push(`Scenario ${t}:\n${currentCase.join("\n")}`);
}

console.log(result.join("\n\n"));
