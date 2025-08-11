const file = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString();

// console.log(file);

// const N = Number(input[0]);
// const board = Array.from({ length: N }, () => []);
// console.log(board);
// const setBoard = () => {};
