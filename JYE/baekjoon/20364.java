  import java.io.BufferedReader;
  import java.io.IOException;
  import java.io.InputStreamReader;
  import java.util.StringTokenizer;
  import java.util.List;
  import java.util.ArrayList;

  class Main {

    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

      StringTokenizer st = new StringTokenizer(br.readLine());

      StringBuilder sb = new StringBuilder();
      int GROUND_COUNT = Integer.parseInt(st.nextToken());
      int DUCK_COUNT = Integer.parseInt(st.nextToken());

      int[] duck = new int[DUCK_COUNT];
      
      for (int i = 0; i < DUCK_COUNT; i++) {
        duck[i] = Integer.parseInt(br.readLine());
      }

      boolean[] used = new boolean[GROUND_COUNT + 1];

      for (int i: duck) {
        int buffer = i;
        boolean flag = false;

        List<Integer> list = new ArrayList<>();
        while (buffer != 0) {
          list.add(list.size(), buffer);
          buffer /= 2;
        }

        for (int t = list.size() - 1; t >= 0 ; t--) {
          if (used[list.get(t)]) {
            sb.append(list.get(t)).append("\n");
            flag = true;
            break;
          }
        }

        if(flag) {
          continue;
        }

        used[i] = true;

        sb.append(0).append("\n");
      }

      sb.deleteCharAt(sb.length() - 1);
      System.out.print(sb);
    }

  }
