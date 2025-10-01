import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        final int ORIGIN_COUNT = Integer.parseInt(st.nextToken());
        final int TARGET_COUNT = Integer.parseInt(st.nextToken());
        
        char[] origin = new char[ORIGIN_COUNT + 1];
        char[] buffer = br.readLine().toCharArray();

        for (int i = 0; i < ORIGIN_COUNT; i++) {
            origin[i + 1] = buffer[i];
        }

        char[] target = new char[TARGET_COUNT + 1];
        buffer = br.readLine().toCharArray();

        for (int i = 0; i < TARGET_COUNT; i++) {
            target[i + 1] = buffer[i];
        }

        int[][] dp = new int[ORIGIN_COUNT + 1][TARGET_COUNT + 1];

        for (int i = 1; i <= ORIGIN_COUNT; i++) {
            if (origin[i] == target[TARGET_COUNT]) {
                dp[i][TARGET_COUNT] = 1;
            }
        }

        for (int i = TARGET_COUNT - 1; i >= 1; i--) {
            for (int j = 1; j <= ORIGIN_COUNT; j++) {

                if (j == 1) {
                    if (target[i] == origin[j]) {
                        dp[j][i] = dp[j + 1][i + 1] + 1;
                        continue;
                    }

                    dp[j][i] = dp[j + 1][i + 1];
                    continue;
                } else if (j == ORIGIN_COUNT) {
                    if (target[i] == origin[j]) {
                        dp[j][i] = dp[j - 1][i + 1] + 1;
                        continue;
                    }

                    dp[j][i] = dp[j - 1][i + 1];
                    continue;
                }

                if (target[i] == origin[j]) {
                    dp[j][i] = Math.max(dp[j - 1][i + 1] + 1, dp[j + 1][i + 1] + 1);
                    continue;
                }

                dp[j][i] = Math.max(dp[j - 1][i + 1], dp[j + 1][i + 1]);
            }
        }

    
        int answer = 0;

        for (int i = 1; i <= ORIGIN_COUNT; i++ ) {
            answer = Math.max(answer, dp[i][1]);
        }

        System.out.print(answer);
    }

}