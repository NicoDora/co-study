  import java.io.BufferedReader;
  import java.io.IOException;
  import java.io.InputStreamReader;
  import java.util.List;
  import java.util.ArrayList;

  class Main {

    static long[] dp;
    static int max;

    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

      List<Integer> input = new ArrayList<>();

      max = 0;

      while (true) {
        int value = Integer.parseInt(br.readLine());

        if (value == 0) {
          break;
        }

        max = Math.max(value, max);
        input.add(value);

        // 1
        // WH -> 1
        // 2
        // WHWH
        // WWHH -> 2 = 1(WH) + 1(WWH)
        // 3
        // WH WWHH
        // WH WHWH
        // WWH WHH 
        // WWH HWH
        // WWWH HH -> 5 = 2(WH) + 2(WWH) + 1(WWWH)
        // 4
        // WWH 남은 W : 2개, H : 3개
        // WWH HWWHH
        // WWH HWHWH
        // WWH WHWHH
        // WWH WHHWH
        // WWH WWHWH

        // WWWH 남은 W: 1개, H : 3개
        // WWWH WHHH
        // WWWH HWHH
        // WWWH HHWH
        // 14 = 5(WH) + 5(WWH) + 3(WWWH) + 1(WWWWH)

        // 5
        // 30 = 14(WH) + (WWH) + (WWWH) + (WWWWH) + 1(WWWWWH)
        // 6
        // 41 + 41 + 40
      }

      dp = new long[max + 1];
      dp[0] = 1;

      for (int i = 0; i < max; i++) {
        dp[i + 1] = (dp[i] * (2 * (2 * i + 1)) / (i + 2));
      }

      for(int i: input) {
        System.out.println(dp[i]);
      }

    }


  }