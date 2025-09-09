const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'LJJ/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);

const searchPrefix = input.slice(1, N + 1); // 집합 S
const validationWords = input.slice(N + 1); // 검사할 단어

class Node {
  constructor(value = '') {
    this.value = value;
    this.end = false;
    this.children = {};
  }
}

class Trie {
  constructor() {
    this.head = new Node();
  }

  insert(string) {
    let currentNode = this.head;

    for (let i = 0; i < string.length; i++) {
      const currentChar = string[i];

      if (currentNode.children[currentChar] === undefined) {
        currentNode.children[currentChar] = new Node(
          currentNode.value + currentChar
        );
      }

      currentNode = currentNode.children[currentChar];
    }
    currentNode.end = true;
  }

  isPrefix(string) {
    let currentNode = this.head;

    for (let i = 0; i < string.length; i++) {
      const currentChar = string[i];
      if (currentNode.children[currentChar]) {
        currentNode = currentNode.children[currentChar];
      } else {
        return false;
      }
    }
    return true;
  }
}

const trie = new Trie();
let count = 0;

for (let i = 0; i < N; i++) {
  trie.insert(searchPrefix[i]);
}

for (let i = 0; i < M; i++) {
  if (trie.isPrefix(validationWords[i])) {
    count++;
  }
}

console.log(count);
