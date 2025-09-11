const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim().split('\n');

const [N, M] = input[0].trim().split(' ').map(Number);
//dddddd
class Node {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.head = new Node();
  }

  insert(word) {
    let node = this.head;

    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new Node());
      }
      node = node.children.get(char);
    }
    node.isEnd = true;
  }

  searchPrefix(prefix) {
    let node = this.head;
    for (const char of prefix) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char);
    }
    return true;
  }
}

const trie = new Trie();
let prefixCount = 0;

for (let i = 1; i <= N; i++) {
  trie.insert(input[i].trim());
}

for (let i = 1; i <= M; i++) {
  if (trie.searchPrefix(input[i + N].trim())) prefixCount++;
}

console.log(prefixCount);
