  import java.io.BufferedReader;
  import java.io.IOException;
  import java.io.InputStreamReader;
  import java.util.StringTokenizer;
  import java.util.List;
  import java.util.LinkedList;

  class Main {

    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

      final int COUNT = Integer.parseInt(br.readLine());

      for (int i = 0; i < COUNT; i++) {
        final int COLUMN_COUNT = Integer.parseInt(br.readLine());

        StringTokenizer st = new StringTokenizer(br.readLine());

        List<Integer> list = new LinkedList<>();

        for(int j = 0; j < COLUMN_COUNT; j++) {
          list.add(Integer.parseInt(st.nextToken()));
        }

        list.sort(null);

        // ["10", 11, 11, 12, 12, 13]
        // 10
        // pn

        // ["11", 12, 12, 13]
        // 10            10
        // n             p

        // ["11", 12, 12, 13]
        // 10 11         10
        //    n          p

        // ["12", 12, 13]
        // 10 11         11 10
        //    n          p

        // ["12", 13]
        // 10 11 12      11 10
        //       n       p  

        // ["13"]
        // 10 11 12      12 11 10
        //       n       p  

        // []
        // 10 11 12 13   12 11 10

        int prev = list.remove(0);
        int next = prev;

        int answer = 0;

        while (!list.isEmpty()) {
          int select = list.get(0);

          int prevAbs = Math.abs(prev - select);
          int nextAbs = Math.abs(next - select); 

          if (prevAbs < nextAbs) {
            next = list.remove(0);
            answer = Math.max(answer, nextAbs);
          } else {
            prev = list.remove(0);
            answer = Math.max(answer, prevAbs);
          }

        }

        System.out.println(answer);

      }
    }


  }

