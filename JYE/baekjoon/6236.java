import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        final int COUNT = Integer.parseInt(st.nextToken());
        final int M = Integer.parseInt(st.nextToken());

        int sum = 0;
        int[] input = new int[COUNT];

        for (int i = 0; i < COUNT; i++) {
            input[i] = Integer.parseInt(br.readLine());
            sum += input[i];
        }

        if (COUNT == 1) {
            System.out.print(input[0]);
            return;
        }

        int min = sum / M;
        int max = sum;

        int mid = 0;
        
        while (min <= max) {
            mid = (min + max) / 2;
            int cur = mid;
            int countM = 1;

            boolean flag = false;
                
            // System.out.println("cur: " + cur + ", mid: " + mid + ", min: " + min + ", max: " + max);
            for (int i = 0; i < COUNT; i++) {
                if (cur - input[i] >= 0) {
                    // System.out.print("    cur -= input[i]: " + cur + " - " + input[i]);
                    cur -= input[i];
                    // System.out.println(" = " + cur);
                    continue;
                }

                if (countM + 1 > M) {
                    // System.out.println("    countM + 1");
                    min = mid;
                    flag = true;
                    break;
                }

                // System.out.print("    cur = mid: " + cur + " + " + mid);
                countM++;
                cur = mid;
                // System.out.println(" = " + cur);
                i--;
            }

            if (flag) {
                if (max - min == 1 || min == max) {
                    mid = max;
                    break;
                }
                continue;
            }

            max = mid;

            if(max - min == 1 || min == max) {
                mid = max;
                break;
            }
        }

        System.out.print(mid);
    }
}