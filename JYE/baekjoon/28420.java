import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.Arrays;

public class Main {

    static int ROW_COUNT, COL_COUNT, WIDTH, CAR_LENGTH, CAMPING_LENGTH;
    static int[][] board;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        
        ROW_COUNT = Integer.parseInt(st.nextToken());
        COL_COUNT = Integer.parseInt(st.nextToken());

        
        st = new StringTokenizer(br.readLine());
        
        WIDTH = Integer.parseInt(st.nextToken());
        CAR_LENGTH = Integer.parseInt(st.nextToken());
        CAMPING_LENGTH = Integer.parseInt(st.nextToken());
        
        int[][] arr1 = new int[WIDTH * (CAR_LENGTH + CAMPING_LENGTH)][2];
        int[][] arr2 = new int[WIDTH * (CAR_LENGTH + CAMPING_LENGTH)][2];
        int[][] arr3 = new int[WIDTH * (CAR_LENGTH + CAMPING_LENGTH)][2];        
        initArr1(arr1);
        initArr2(arr2);
        initArr3(arr3);
        
        board = new int[ROW_COUNT][COL_COUNT];
        initBoard(st, br);

        int answer = Integer.MAX_VALUE;

        for (int i = 0; i < ROW_COUNT; i++) {
            for (int j = 0; j <= COL_COUNT - (CAR_LENGTH + CAMPING_LENGTH) + 2; j++) {
                int buffer = 0;
                boolean flag = true;

                for (int[] a: arr1) {
                    int newRow = i + a[0];
                    int newCol = j + a[1];

                    if (newRow >= ROW_COUNT || newCol >= COL_COUNT) {
                        flag = false;
                        break;
                    }

                    buffer += board[newRow][newCol];
                }

                if (flag) {
                    answer = Math.min(answer, buffer);
                }
            }
        }

        for (int i = 0; i <= ROW_COUNT - (WIDTH + CAR_LENGTH) + 2; i++) {
            for (int j = 0; j <= COL_COUNT - (CAMPING_LENGTH + WIDTH) + 2; j++) {
                int buffer = 0;
                boolean flag = true;

                for (int[] a: arr2) {
                    int newRow = i + a[0];
                    int newCol = j + a[1];

                    if (newRow >= ROW_COUNT || newCol >= COL_COUNT) {
                        flag = false;
                        break;
                    }

                    buffer += board[newRow][newCol];
                }

                if (flag) {
                    answer = Math.min(answer, buffer);
                }
            }
        }        
        
        for (int i = 0; i <= ROW_COUNT - (WIDTH + CAMPING_LENGTH) + 2; i++) {
            for (int j = 0; j <= COL_COUNT - (CAR_LENGTH + WIDTH) + 2; j++) {
                int buffer = 0;
                boolean flag = true;

                for (int[] a: arr3) {
                    int newRow = i + a[0];
                    int newCol = j + a[1];

                    if (newRow >= ROW_COUNT || newCol >= COL_COUNT) {
                        flag = false;
                        break;
                    }

                    buffer += board[newRow][newCol];
                }

                if (flag) {
                    answer = Math.min(answer, buffer);
                }
            }
        }

        System.out.print(answer);
    }

    static void initBoard (StringTokenizer st, BufferedReader br) throws IOException {
        for (int i = 0; i < ROW_COUNT; i++) {
            st = new StringTokenizer(br.readLine());

            for (int j = 0; j < COL_COUNT; j++) {
                board[i][j] = Integer.parseInt(st.nextToken());
            }
        }

    }

    static void initArr1 (int[][] arr){
        int idx = 0;

        for (int i = 0; i < WIDTH; i++) {
            for (int j = 0; j < CAR_LENGTH + CAMPING_LENGTH; j++) {
                arr[idx][0] = i;
                arr[idx][1] = j;
                idx++;
            }
        }
    }

    static void initArr2 (int[][] arr) {
        int idx = 0;

        for (int r = 0; r < WIDTH; r++) {
            for (int c = 0; c < CAMPING_LENGTH; c++) {
                arr[idx][0] = r;
                arr[idx][1] = c;
                idx++;
            }
        }

        for (int i = 0; i < CAR_LENGTH; i++) {
            for (int j = 0; j < WIDTH; j++) {
                arr[idx][0] = WIDTH + i;
                arr[idx][1] = CAMPING_LENGTH + j;
                idx++;
            }
        }
    }
    
    static void initArr3 (int[][] arr) {
        int idx = 0;

        for (int i = 0; i < WIDTH; i++) {
            for (int j = 0; j < CAR_LENGTH; j++) {
                arr[idx][0] = i;
                arr[idx][1] = j;
                idx++;
            }
        }

        for (int i = 0; i < CAMPING_LENGTH; i++) {
            for (int j = 0; j < WIDTH; j++) {
                arr[idx][0] = WIDTH + i;
                arr[idx][1] = CAR_LENGTH + j;
                idx++;
            }
        }
    }

}