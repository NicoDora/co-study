const fs = require("fs");
const input = fs.readFileSync("input.txt").toString().trim().split(""); // local 파일
// const input = fs.readFileSync(0, "utf-8").toString().trim().split(""); // 문제 제출 시

function getNum(char) {
  return char === "H" ? 1 : char === "C" ? 12 : 16;
}

const stack = [];

for (let i = 0; i < input.length; i++) {
  const char = input[i];

  if (isNaN(char)) {
    if (char === "(") stack.push(0);
    else if (char === ")") {
      let sum = 0;

      while (true) {
        const num = stack.pop();
        if (num === 0) break;

        sum += num;
      }

      stack.push(sum);
    } else stack.push(getNum(char));
  } else stack.push(stack.pop() * Number(char));
}

console.log(stack.reduce((sum, n) => (sum += n), 0));
