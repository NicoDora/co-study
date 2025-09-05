  import java.io.BufferedReader;
  import java.io.IOException;
  import java.io.InputStreamReader;
  import java.util.StringTokenizer;
  import java.util.Arrays;


  class Main {

    static int PLATE_COUNT, SUSHI_KIND, CONSECUTIVE_PLATE_COUNT, COUPON;
    public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
      StringTokenizer st = new StringTokenizer(br.readLine());

      PLATE_COUNT = Integer.parseInt(st.nextToken());
      SUSHI_KIND = Integer.parseInt(st.nextToken());
      CONSECUTIVE_PLATE_COUNT = Integer.parseInt(st.nextToken());
      COUPON = Integer.parseInt(st.nextToken());

      int[] dish = new int[PLATE_COUNT];

      for (int i = 0; i < PLATE_COUNT; i++) {
        dish[i] = Integer.parseInt(br.readLine());
      }

      boolean[] eated = new boolean[SUSHI_KIND + 1];
      int answer = 0;

      
      for (int i = 0; i < PLATE_COUNT - CONSECUTIVE_PLATE_COUNT + 1 ; i++) {
        Arrays.fill(eated, false);
        int eatedCount = 0;

        for (int j = i; j < i + CONSECUTIVE_PLATE_COUNT; j++) {
          if (eated[dish[j]]) {
            continue;
          }

          eated[dish[j]] = true;
          eatedCount++;
        }
        
        if (!eated[COUPON]) {
          eatedCount++;
        }

        answer = Math.max(answer, eatedCount);
      }
      
      for (int i = PLATE_COUNT - CONSECUTIVE_PLATE_COUNT + 1; i < PLATE_COUNT; i++) {
        Arrays.fill(eated, false);
        int eatedCount = 0;
        
        for (int j = i; j < i + CONSECUTIVE_PLATE_COUNT; j++) {
          int nj = j;

          if (j >= PLATE_COUNT) {
             nj = j - PLATE_COUNT;
          }

          if (eated[dish[nj]]) {
            continue;
          }

          eated[dish[nj]] = true;
          eatedCount++;
        }

        if (!eated[COUPON]) {
          eatedCount++;
        }
        
        answer = Math.max(answer, eatedCount);
      }

      System.out.print(answer);
    }
  }
