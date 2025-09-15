const { join } = require("path");
const { readFileSync } = require("fs");

const lines = input();

const atomicWeights = {
  H: 1,
  C: 12,
  O: 16,
};

const stack = [];

for (let i = 0; i < lines.length; i++) {
  const char = lines[i];

  if (atomicWeights[char]) {
    stack.push(atomicWeights[char]);
  } else if (char === "(") {
    stack.push(char);
  } else if (char === ")") {
    let sum = 0;

    while (stack.length > 0 && stack[stack.length - 1] !== "(") {
      sum += stack.pop();
    }

    stack.pop();
    stack.push(sum);
  } else if (!isNaN(char)) {
    const number = Number(char);
    const lastValue = stack.pop();
    stack.push(lastValue * number);
  }
}

const result = stack.reduce((acc, val) => acc + val, 0);

console.log(result);

function input() {
  const path =
    process.platform === "linux" ? "/dev/stdin" : join(__dirname, "input.txt");
  return readFileSync(path, "utf8").trim().split("");
}
