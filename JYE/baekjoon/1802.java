import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

public class Main {
    static int size;
    static char[] chars;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        final int TEST_CASE = Integer.parseInt(br.readLine());
        
        for (int i = 0; i < TEST_CASE; i++) {
            chars = br.readLine().toCharArray();
            size = chars.length;
            
            if (size == 1) {
                System.out.println("YES");
                continue;
            }

            boolean answer = method(size / 2, size / 2);

            System.out.println(answer ? "YES" : "NO");
        }
    }

    static boolean method(int idx, int count) {
        for (int i = idx - count; i < idx; i++) {
            if (chars[i] == chars[(idx + count) - i]) {
                return false;
            }
        }

        if (count > 0) {
            int halfCount = count / 2;
            int leftCenterIdx = idx - halfCount - 1;
            int rightCenterIdx = idx + halfCount + 1;

            if (!method(leftCenterIdx, halfCount) || !method(rightCenterIdx, halfCount)) {
                return false;
            }
        }

        return true;
    }
}