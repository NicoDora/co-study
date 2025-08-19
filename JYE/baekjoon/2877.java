import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;

class Main {

  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    final int K = Integer.parseInt(br.readLine());
  
    if(K == 1) {
      System.out.print(4);
      return;
    }

    int numberCount = 1;
    int start = 1;
    int amount = 2;

    while (true) {
      if (start <= K && K < start + amount) {
        break;
      }

      start += amount;
      amount *= 2;
      numberCount++;
    }

    char[] answer = new char[numberCount];

    Arrays.fill(answer, '4');

    int plus = K - start;

    char[] buffer = Integer.toBinaryString(plus).toCharArray();

    int answerIdx = answer.length - 1;
    for (int i = buffer.length - 1; i >= 0; i--) {
      answer[answerIdx] = buffer[i] == '0' ? '4' : '7';
      answerIdx--;
    }

    StringBuilder sb = new StringBuilder();
    
    for(char c: answer) {
      sb.append(c);
    }

    System.out.print(sb);
  }
}

