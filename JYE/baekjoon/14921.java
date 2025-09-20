import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int amount = Integer.parseInt(br.readLine());
        StringTokenizer st = new StringTokenizer(br.readLine());

        int[] input = new int[amount];

        boolean plus = false;
        boolean minus = false;
        for (int i = 0; i < amount; i++) {
            input[i] = Integer.parseInt(st.nextToken());
            if (input[i] > 0) {
                plus = true;
                continue;
            }

            minus = true;
        }

        if(plus && !minus) {
            System.out.println(input[0] + input[1]);
            return;
        }

        if(!plus && minus) {
            System.out.println(input[amount - 2] + input[amount - 1]);
            return;
        }

        int l = 0;
        int r = amount - 1;
        
        int answer = input[l] + input[r];
        int last = input[l] + input[r];

        while (true) {
            // System.out.println("l:" + l + ", r:" + r);
            if (answer == 0) {
                System.out.print(0);
                return;
            }

            int now = input[l] + input[r];

            if (Math.abs(answer) > Math.abs(now)) {
                answer = now;
                last = now;
            } else {
                last = now;
            }

            if (last > 0) {
                r--;
            } else {
                l++;
            }

            if (l >= r) {
                break;
            }
        }

        System.out.print(answer);
   
    }

}