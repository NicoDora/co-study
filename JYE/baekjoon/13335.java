import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.Queue;
import java.util.ArrayDeque;

public class Main {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        final int TRUCK_COUNT = Integer.parseInt(st.nextToken());
        final int BRIDGE_LENGTH = Integer.parseInt(st.nextToken());
        final int MAX_WEIGHT = Integer.parseInt(st.nextToken());

        ArrayDeque<Integer> truck = new ArrayDeque<>();

        st = new StringTokenizer(br.readLine());
        
        for (int i = 0; i < TRUCK_COUNT; i++) {
            truck.add(Integer.parseInt(st.nextToken()));
        }

        ArrayDeque<Integer> queue = new ArrayDeque<>();
        
        for (int i = 0; i < BRIDGE_LENGTH - 1; i++) {
            queue.add(0);
        }

        int answer = 1;
        int curWeight = 0;

        curWeight += truck.pollFirst();
        queue.add(curWeight);

        while (curWeight != 0) {
            curWeight -= queue.pollFirst();

            int polledTruck = 0;

            if (!truck.isEmpty()) {
                polledTruck = truck.peekFirst();
            }
            
            if (curWeight + polledTruck <= MAX_WEIGHT) {
                curWeight += polledTruck;
                queue.add(polledTruck);

                if (polledTruck != 0) {
                    truck.pollFirst();
                }
            } else {
                queue.add(0);
            }
            
            answer++;
        }

        System.out.print(answer);
    }

}