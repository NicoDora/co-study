import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;


public class Main {

    static int[] parent;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        final int COUNT = Integer.parseInt(br.readLine());

        for (int i = 1; i <= COUNT; i++) {

            System.out.println("Scenario " + i + ":");

            final int USER_COUNT = Integer.parseInt(br.readLine());

            parent = new int[USER_COUNT];

            for (int j = 0; j < USER_COUNT; j++) {
                parent[j] = j;
            }

            final int RELATION_COUNT = Integer.parseInt(br.readLine());

            for (int j = 0; j < RELATION_COUNT; j++) {
                StringTokenizer st = new StringTokenizer(br.readLine());

                int x = Integer.parseInt(st.nextToken());
                int y = Integer.parseInt(st.nextToken());

                union(x, y);
            }

            final int INPUT_COUNT = Integer.parseInt(br.readLine());

            for (int j = 0; j < INPUT_COUNT; j++) {
                StringTokenizer st = new StringTokenizer(br.readLine());

                int x = Integer.parseInt(st.nextToken());
                int y = Integer.parseInt(st.nextToken());

                System.out.println(find(x) == find(y) ? 1 : 0);
            }

            System.out.println();
        }
    }

    static int find(int idx) {
        if (parent[idx] == idx) {
            return idx;
        }

        return find(parent[idx]);
    }

    static void union(int x, int y) {
        int parentX = find(x);
        int parentY = find(y);

        if (parentX == parentY) return;

        if (parentX > parentY) {
            parent[parentX] = parentY;
        } else {
            parent[parentY] = parentX;
        }
    }
}