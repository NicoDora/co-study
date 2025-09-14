  import java.io.BufferedReader;
  import java.io.IOException;
  import java.io.InputStreamReader;
  import java.util.StringTokenizer;

  class Main {

    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

      final int COUNT = Integer.parseInt(br.readLine());

      boolean[] exist = new boolean[367];
      int[] height = new int[367];

      StringTokenizer st;

      for (int i = 0; i < COUNT; i++) {
        st = new StringTokenizer(br.readLine());

        int start = Integer.parseInt(st.nextToken());
        int end = Integer.parseInt(st.nextToken());

        for (int j = start; j <= end; j++) {
          height[j]++;
          exist[j] = true;
        }

      }

      int idx = 1;
      int start = 0;
      int end = 0;

      boolean YS = false;

      int answer = 0;
      while (idx < 367) {
        if (!YS && exist[idx]) {
          start = idx;
          end = idx;
          YS = true;
          idx++;
          continue;
        }

        if (YS && !exist[idx]) {
          int max = 0;

          for (int i = start; i <= end; i++) {
            max = Math.max(max, height[i]);
          }
          answer += max * (end - start + 1);

          YS = false;
          idx++;
          continue;
        }

        if (YS && exist[idx]) {
          end = idx;
          idx++;
          continue;
        }

        idx++;
      }

      System.out.print(answer);
    }
  }