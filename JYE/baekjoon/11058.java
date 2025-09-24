import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;


// AI 도움
public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        final int COUNT = Integer.parseInt(br.readLine());

        long[] dp = new long[COUNT + 1];
        
        for (int i = 1; i <= COUNT; i++) {
            dp[i] = dp[i - 1] + 1;
        
            for (int j = 3; i - j >= 0; j++) {
                long buffer = dp[i - j] * (j - 1);
        
                dp[i] = Math.max(dp[i], buffer);
            }
        }

        System.out.print(dp[COUNT]);
    }
}