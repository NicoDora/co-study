import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.ArrayList;

public class Main {
    static int SEAT_COUNT, VIP_COUNT;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        SEAT_COUNT = Integer.parseInt(br.readLine());
        VIP_COUNT = Integer.parseInt(br.readLine());

        int[] vip = new int[VIP_COUNT];
        
        for (int i = 0; i < VIP_COUNT; i++) {
            vip[i] = Integer.parseInt(br.readLine());
        }
        
        int[] sum = new int[41];
        sum[1] = 1;
        sum[2] = 2;
        
        for (int i = 3; i < 41; i++) {
            sum[i] = sum[i - 1] + sum[i - 2];
        }
        
        List<Integer> answerList = new ArrayList<>();

        int start = 1;

        for (int i = 0; i < vip.length; i++) {
            answerList.add(vip[i] - start);
            start = vip[i] + 1;
        }

        answerList.add(SEAT_COUNT - start + 1);

        int answer = 1;
        for (int l: answerList) {
            answer *= sum[l] == 0 ? 1 : sum[l];
        }

        System.out.print(answer);
    }
}