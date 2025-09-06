  import java.io.BufferedReader;
  import java.io.IOException;
  import java.io.InputStreamReader;
  import java.util.StringTokenizer;
  import java.util.List;
  import java.util.ArrayList;
  import java.util.Map;
  import java.util.HashMap;


  class Main {

    static int PLATE_COUNT, SUSHI_KIND, CONSECUTIVE_PLATE_COUNT, COUPON;
    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

      final int CASE = Integer.parseInt(br.readLine());

      for (int i = 0; i < CASE; i++) {
        int number = Integer.parseInt(br.readLine());
        StringTokenizer st = new StringTokenizer(br.readLine());

        int[] input = new int[number];

        Map<Integer, Integer> map = new HashMap<>();

        for (int j = 0; j < number; j++) {
          input[j] = Integer.parseInt(st.nextToken());

          if (map.containsKey(input[j])) {
            map.put(input[j], map.get(input[j]) + 1);
          } else {
            map.put(input[j], 1);
          }
        }

        long answer = 0;

        int sellDay = 0;
        
        for (int in: input) {
          sellDay = Math.max(sellDay, in);
        }

        List<Integer> buffer = new ArrayList<>();

        for (int j = 0; j < number; j++) {
          if (input[j] < sellDay) {
            buffer.add(input[j]);
            map.put(input[j], map.get(input[j]) - 1);
            
            if(map.get(input[j]) == 0) {
              map.remove(input[j]);
            }
            
            continue;
          }

          for (int b: buffer) {
            answer += sellDay - b;
          }

          buffer.clear();
          map.put(input[j], map.get(input[j]) - 1);

          if(map.get(input[j]) == 0) {
              map.remove(input[j]);
            }
            
          sellDay = 0;
          for (int k : map.keySet()) {
            sellDay = Math.max(sellDay, k);
          }
        }
        System.out.println(answer);
      }
    }
  }
