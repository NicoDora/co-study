import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.List;
import java.util.ArrayList;


class Main {

  static long MAX = Long.MIN_VALUE;
  static long MIN = Long.MAX_VALUE;
  static int INEQUALITY_COUNT, NUMBER_COUNT;
  static char[] INEQUALITY;
  static List<Integer> list;

  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    INEQUALITY_COUNT = Integer.parseInt(br.readLine());
    NUMBER_COUNT = INEQUALITY_COUNT + 1;

    INEQUALITY = new char[INEQUALITY_COUNT];

    StringTokenizer st = new StringTokenizer(br.readLine());

    for(int i = 0; i < INEQUALITY_COUNT; i++) {
      INEQUALITY[i] = st.nextToken().charAt(0);
    }

    list = new ArrayList<>();
    boolean[] usedNumber = new boolean[10];
    
    for (int i = 0; i < 10; i++) {
      list.add(i);
      usedNumber[i] = true;
      back(i, 0, usedNumber);
      usedNumber[i] = false;
      list.remove(0);
    }

    StringBuilder sb = new StringBuilder();
    if (MAX / (int) Math.pow(10, NUMBER_COUNT - 1) == 0) {
      sb.append(0).append(MAX).append("\n");
    } else {
      sb.append(MAX).append("\n");
    }

    if (MIN / (int) Math.pow(10, NUMBER_COUNT - 1) == 0) {
      sb.append(0).append(MIN);
    } else {
      sb.append(MIN);
    }

    System.out.print(sb);
  }

  static void back (int prev, int inequalityIdx, boolean[] usedNumber){
    if (list.size() == NUMBER_COUNT) {
      long result = 0;
      for(int i = NUMBER_COUNT - 1; i >= 0; i--) {
        result += list.get(NUMBER_COUNT - 1 - i) * Math.pow(10, i);
      }

      MAX = Math.max(MAX, result);
      MIN = Math.min(MIN, result);

      return;
    }

    switch (INEQUALITY[inequalityIdx]) {
      case '<' :
      for (int i = prev + 1; i < 10; i++) {
        if(!usedNumber[i]) {
          usedNumber[i] = true;
          list.add(i);
          back(i, inequalityIdx + 1, usedNumber);
          list.remove(list.size() - 1);
          usedNumber[i] = false;
        } 
      }
      break;

      case '>' :
      for (int i = 0; i < prev; i++) {
        if(!usedNumber[i]) {
          usedNumber[i] = true;
          list.add(i);
          back(i, inequalityIdx + 1, usedNumber);
          list.remove(list.size() - 1);
          usedNumber[i] = false;
        } 
      }

    }

    
  }


}

