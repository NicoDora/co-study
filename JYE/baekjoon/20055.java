import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

    static int LENGTH, DL_COUNT;
    static int[] conveyer;
    static boolean[] robot;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        init(br);

        int level = 0;
        
        while (true) {
            level++;

            // 1
            rotateConveyer();
            robotMove();

            robotCheck(LENGTH);

            // 2
            for (int i = LENGTH - 1; i >= 1; i--) {
                if (conveyer[i + 1] > 0 && robot[i] && !robot[i + 1]) {
                    robot[i] = false;
                    robot[i + 1] = true;
                    conveyer[i + 1]--;
                }
            }

            robotCheck(LENGTH);

            // 3
            if (conveyer[1] > 0 && !robot[1]) {
                robot[1] = true;
                conveyer[1]--;
            }

            int count = 0;

            for (int i = 1; i < conveyer.length; i++) {
                if (conveyer[i] == 0) {
                    count++;
                }
            }

            if (count >= DL_COUNT) {
                break;
            }
        }            

        System.out.print(level);
    }

    static void rotateConveyer() {
        int last = conveyer[conveyer.length - 1];
        for (int i = conveyer.length - 1; i > 1; i--) {
            conveyer[i] = conveyer[i - 1];
        }
        conveyer[1] = last;
    }

    static void robotCheck (int curLocation) {
        if (robot[curLocation]) {
            robot[curLocation] = false;
        }
    }
    
    static void robotMove() {
        boolean last = robot[robot.length - 1];
    
        for (int i = robot.length - 1; i > 1; i--) { 
            robot[i] = robot[i - 1];
        }

        robot[1] = last;
    }

    static void init(BufferedReader br) throws IOException {
        StringTokenizer st = new StringTokenizer(br.readLine());

        LENGTH = Integer.parseInt(st.nextToken());
        DL_COUNT = Integer.parseInt(st.nextToken());

        conveyer = new int[2 * LENGTH + 1];
        robot = new boolean[2 * LENGTH + 1];

        st = new StringTokenizer(br.readLine());

        for (int i = 1; i < 2 * LENGTH + 1; i++) {
            conveyer[i] = Integer.parseInt(st.nextToken());
        }
    }

}