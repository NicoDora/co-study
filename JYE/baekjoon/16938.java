import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

    static int PROBLEM_COUNT, L, R, X, answer;
    static int[] problems;
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        StringTokenizer st = new StringTokenizer(br.readLine());

        PROBLEM_COUNT = Integer.parseInt(st.nextToken());
        L = Integer.parseInt(st.nextToken());
        R = Integer.parseInt(st.nextToken());
        X = Integer.parseInt(st.nextToken());
        problems = new int[PROBLEM_COUNT];

        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < PROBLEM_COUNT; i++) {
            problems[i] = Integer.parseInt(st.nextToken()); 
        }

        answer = 0;

        for (int i = 0; i < PROBLEM_COUNT - 1; i++) {
            back(i + 1, problems[i], problems[i], problems[i]);
        }

        System.out.print(answer);
   
    }

    static void back(int start, int max, int min, int sum) {
        int diff = max - min;
        
        if(diff >= X && sum >= L && sum <= R) {
            answer++;
        }

        for (int i = start; i < PROBLEM_COUNT; i++) {
            back(i + 1, Math.max(max, problems[i]), Math.min(min, problems[i]), sum + problems[i]);
        }
    }
}