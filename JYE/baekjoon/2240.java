  import java.io.BufferedReader;
  import java.io.IOException;
  import java.io.InputStreamReader;
  import java.util.StringTokenizer;

  class Main {

    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
      StringTokenizer st = new StringTokenizer(br.readLine());

      final int TEST_CASE = Integer.parseInt(st.nextToken());
      final int MOVE_COUNT = Integer.parseInt(st.nextToken());

      int[] fall = new int[TEST_CASE + 1];

      for (int i = 1; i < TEST_CASE + 1; i++) {
        fall[i] = Integer.parseInt(br.readLine());
      }
      
      int[][][] dp = new int[MOVE_COUNT + 1][TEST_CASE + 1][2];
      
      for (int i = 1; i < TEST_CASE + 1; i++) {
        switch (fall[i]) {
          case 1:
          dp[0][i][0] += dp[0][i - 1][0] + 1;
          dp[0][i][1] += dp[0][i - 1][1];
          break;
          default:
          dp[0][i][0] += dp[0][i - 1][0];
        }
      }

      for (int i = 1; i < MOVE_COUNT + 1; i++) {
        for (int j = 1; j < TEST_CASE + 1; j++) {
            switch (fall[j]) {
              case 1:
              dp[i][j][1] = dp[i][j - 1][1];
              dp[i][j][0] = Math.max(dp[i][j - 1][0] + 1, dp[i - 1][j][1] + 1);
              break;
              default:
              dp[i][j][0] = dp[i][j - 1][0];
              dp[i][j][1] = Math.max(dp[i][j - 1][1] + 1, dp[i - 1][j][0] + 1);
            }
        }
      }

      System.out.print(Math.max(dp[MOVE_COUNT][TEST_CASE][0], dp[MOVE_COUNT][TEST_CASE][1]));
    }


  }
