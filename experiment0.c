#include<stdio.h>
#include <time.h>

int main()
{
    printf("\nRunning experiment\n\n");

    time_t startTime = time(NULL);
   
    float x_g1 = 0;
    float x_g2 = 16777218;
    float x_p = 0;

    for (int i = 0; i < 2000; i++) {
        while (x_p < x_g2) {
            x_p++;
            //printf("%fd\r", x_p);
        }
        x_p = 0;
    }

    printf("\nRan in %ld\n\n", time(NULL) - startTime);

    return 0;
}