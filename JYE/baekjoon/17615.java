import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.ArrayList;

public class Main {

    static int LENGTH;
    static boolean[] isRed;
    static List<Color> list = new ArrayList<>();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        init(br);

        boolean isLeftRed = isRed[0];
        boolean isRightRed = isRed[LENGTH - 1];

        int LRed = 0;
        int RRed = 0;
        int LBlue = 0;
        int RBlue = 0;
        for (int i = 0; i < list.size(); i++) {
            Color color = list.get(i);
            boolean isRedOne = color.isRed;
            int sequence = color.sequence;

            if (isLeftRed && isRightRed) {
                if (isRedOne) {
                    if (i != 0) {
                        LRed += sequence;
                    }

                    if (i != list.size() - 1) {
                        RRed += sequence;
                    }
                } else {
                    LBlue += sequence;
                    RBlue += sequence;
                }
   

            } else if (isLeftRed && !isRightRed) {
                if (isRedOne) {
                    if (i != 0) {
                        LRed += sequence;
                    }

                    RRed += sequence;
                } else {
                    LBlue += sequence;

                    if (i != list.size() - 1) {
                        RBlue += sequence;
                    }
                }
            } else if (!isLeftRed && isRightRed) {
                if (isRedOne) {
                    LRed += sequence;
                                    
                    if (i != list.size() - 1) {
                        RRed += sequence;
                    }
                } else {
                    if (i != 0) {
                        LBlue += sequence;
                    }

                    RBlue += sequence;
                }
                

            } else {
                if (isRedOne) {
                    LRed += sequence;
                    RRed += sequence;
                } else {
                    if (i != 0) {
                        LBlue += sequence;
                    }

                    if (i != list.size() - 1) {
                        RBlue += sequence;

                    }

                }
                
            }
        }

        System.out.print(Math.min(Math.min(LRed, RRed), Math.min(LBlue, RBlue)));
    }

    static void init(BufferedReader br) throws IOException {
        LENGTH = Integer.parseInt(br.readLine());

        isRed = new boolean[LENGTH];
        char[] input = br.readLine().toCharArray();

        for (int i = 0; i < LENGTH; i++) {
            isRed[i] = input[i] == 'R';
        }

        boolean curIsRed = isRed[0];
        int sequence = 1;

        for (int i = 1; i < LENGTH; i++) {
            if (curIsRed != isRed[i]) {
                list.add(new Color(curIsRed, sequence));

                curIsRed = isRed[i];
                sequence = 1;
                continue;
            }

            sequence++;
        }

        list.add(new Color(curIsRed, sequence));
    }


    static class Color {
        boolean isRed;
        int sequence;

        Color(boolean isRed, int sequence) {
            this.isRed = isRed;
            this.sequence = sequence;
        }
    }


}