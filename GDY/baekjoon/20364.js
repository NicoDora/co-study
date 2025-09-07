const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const [N, Q] = input[0].trim().split(' ').map(Number);
const binaryTree = [null, ...Array.from({ length: N }, () => false)];
let lastTrueNode = 0;
let landPrice = '';

for (let i = 1; i <= Q; i++) {
  const landNumber = Number(input[i]);
  const checkNumber = checkLand(landNumber);

  if (checkNumber === 0) binaryTree[landNumber] = true;
  landPrice += lastTrueNode + '\n';
  lastTrueNode = 0;
}
console.log(landPrice);

function checkLand(node) {
  if (binaryTree[node] === true) {
    lastTrueNode = node;
  }
  if (node === 1) {
    return 0;
  }

  if (node % 2 === 1) {
    return checkLand((node - 1) / 2);
  } else {
    return checkLand(node / 2);
  }
}
