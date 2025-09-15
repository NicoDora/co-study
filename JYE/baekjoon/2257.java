import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Stack;

public class Main {

  // AI를 사용한 코드. 도저히 못풀겠음.
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String input = br.readLine();

        Stack<Integer> stack = new Stack<>();

        for (char ch : input.toCharArray()) {
            if (ch == '(') {
                stack.push(-1);
            } else if (ch == ')') {
                int buffer = 0;
                while (!stack.isEmpty() && stack.peek() != -1) {
                    buffer += stack.pop();
                }

                if (!stack.isEmpty()) {
                    stack.pop();
                }

                stack.push(buffer);
            } else if (Character.isDigit(ch)) {
                int last = stack.pop();
                int multiplier = ch - '0'; // char를 int로 변환
                stack.push(last * multiplier);
            } else {
                switch (ch) {
                    case 'H':
                        stack.push(1);
                        break;
                    case 'C':
                        stack.push(12);
                        break;
                    case 'O':
                        stack.push(16);
                }
            }
        }

        int answer = 0;
        while (!stack.isEmpty()) {
            answer += stack.pop();
        }

        System.out.println(answer);
    }
}