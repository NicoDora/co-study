function solution(s) {
  const parentheses = s.split('');
  const stack = [];

  for (let i = 0; i < parentheses.length; i++) {
    const bracket = parentheses[i];
    stack.push(bracket);

    if (stack.at(-1) === ')' && stack.at(-2) === '(') {
      stack.pop();
      stack.pop();
    }
  }

  return stack.length === 0;
}
