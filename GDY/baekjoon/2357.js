const fs = require('fs');
const filePath =
  process.platform === 'linux' ? '/dev/stdin' : 'GDY/baekjoon/input.txt';
const input = fs.readFileSync(filePath, 'utf8').trim();

const massMap = {
  H: 1,
  C: 12,
  O: 16,
};

function main(str) {
  const stack = [];

  for (const char of str) {
    if (massMap[char]) {
      stack.push(massMap[char]);
      continue;
    }

    switch (char) {
      case '(':
        stack.push(char);
        break;
      case ')': {
        let temp = 0;
        while (stack.at(-1) !== '(') {
          temp += stack.pop();
        }
        stack.pop();
        stack.push(temp);
        break;
      }
      default:
        const lastValue = stack.pop();
        stack.push(lastValue * Number(char));
        break;
    }
  }

  console.log(stack.reduce((prev, cur) => prev + cur, 0));
}

main(input);
