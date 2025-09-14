import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.LinkedList;


class Main {

  static char[] input;
  static int answer;
  static Map<Character, Integer> map;

  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    input = br.readLine().toCharArray();
    map = new HashMap<>();

    for (char c : input) {
      if (map.containsKey(c)) {
        map.put(c, map.get(c) + 1);
        continue;
      }
      map.put(c, 1);
    }

    back(0, '.');

    System.out.print(answer);
  }

  static void back( int curIdx, char prev) {
    if(curIdx == input.length) {
      answer++;
      return;
    }
    
    for (Map.Entry<Character, Integer> m : map.entrySet() ) {
      if (prev != m.getKey() && m.getValue() != 0) {
        map.put(m.getKey(), m.getValue() - 1);
        back(curIdx + 1, m.getKey());
        map.put(m.getKey(), m.getValue() + 1);
      }
    }

  }
}