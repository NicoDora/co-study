import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.List;
import java.util.ArrayList;

public class Main {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        final int ITEM_COUNT = Integer.parseInt(st.nextToken());
        final int WEIGHT = Integer.parseInt(st.nextToken());

        List<Integer> list = new ArrayList<>();
        
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < ITEM_COUNT; i++) {
            int now = Integer.parseInt(st.nextToken());
            
            // 하나만 선택했을 때
            if (now == WEIGHT) {
                System.out.print(1);
                return;
            }

            if (now < WEIGHT) {
                list.add(now);
            }
        }

        list.sort(null);

        int L = 0;
        int R = list.size() - 1;

        while (L < R) {
            int left = list.get(L);
            int right = list.get(R);

            int sum = left + right;

            if (sum == WEIGHT) {
                System.out.print(1);
                return;
            }

            if (sum > WEIGHT) {
                R--;
                continue;
            }

            L++;
        }

        for (int i = 0; i < ITEM_COUNT; i++) {
            L = i + 1;
            R = list.size() - 1;

            int need = WEIGHT - list.get(i);

            while(L < R) {
                int left = list.get(L);
                int right = list.get(R);

                int sum = left + right;

                if (sum == need) {
                    System.out.print(1);
                    return;
                }
                
                if (sum > WEIGHT) {
                    R--;
                    continue;
                }

                L++;
            }
        }

        System.out.print(0);
    }

}