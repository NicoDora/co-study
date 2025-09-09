  import java.io.BufferedReader;
  import java.io.IOException;
  import java.io.InputStreamReader;
  import java.util.StringTokenizer;
  import java.util.Map;
  import java.util.HashMap;

  class Main {

    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

      StringTokenizer st = new StringTokenizer(br.readLine());

      final int TARGET_COUNT = Integer.parseInt(st.nextToken());
      final int STRING_COUNT = Integer.parseInt(st.nextToken());

      String[] target = new String[TARGET_COUNT];

      for (int i = 0; i < TARGET_COUNT; i++) {
        target[i] = br.readLine();
      }

      String[] string = new String[STRING_COUNT];
      
      for (int i = 0; i < STRING_COUNT; i++) {
        string[i] = br.readLine();
      }

      NodeJS root = new NodeJS();

      for (String s: target) {
        root.addNode(s);
      }

      int answer = 0;
      for (String s: string) {
        if (root.find(s)) {
          answer++;
        }
      }

      System.out.print(answer);
    }


    static class NodeJS {
      
      Map<Character, NodeJS> child = new HashMap<>();
      
      NodeJS () {}

      public void addNode(String str) {
        char[] ch = str.toCharArray();
        NodeJS cur = this;

        for (int i = 0; i < ch.length; i++) {
          if (cur.child.containsKey(ch[i])) {
            cur = cur.child.get(ch[i]);
            continue;
          }
          
          cur.child.put(ch[i], new NodeJS());
          cur = cur.child.get(ch[i]);
        }
      }

      public boolean find(String str) {
        NodeJS cur = this;

        for (char c: str.toCharArray()) {
          if(!cur.child.containsKey(c)) {
            return false;
          }

          cur = cur.child.get(c);
        }

        return true;
      }

    }

  }