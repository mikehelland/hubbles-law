#include<stdio.h>

int main()
{
    printf("\reticulating splines... fast!\n\n");

    unsigned long t = 0;
    double c = 1;
    double H = 0.00035;

    double photon = 0;
    
    int hit5 = 0;
    int hit13 = 0;

    // first, in units of 1 million years per step
    while (t < 14000) {
        t++;

        photon += c / (1 + H * photon);

        if (!hit5 && photon > 5500) {
            printf("d = %f       t = %lu\n", photon, t);
            hit5 = 1;
        }

        if (!hit13 && photon > 13800) {
            printf("d = %f       t = %lu\n", photon, t);
            hit13 = 1;
        }

        /*if (t % 500 == 0) {
            printf("t = %lu     d = %f\n", t, photon);
        }*/
    }


    printf("\reticulating splines... slow...\n\n");

    t = 0;
    photon = 0;

    // now in units of 1 year per step
    //        14,00Q00Q000
    while (t < 14000000000) {
        t++;

        photon += c / (1 - H * photon);

            //  50Q00Q000
        if (t % 500000000 == 0) {
            printf("t = %lu     d = %f\n", t, photon);
        }
    }

    return 0;
}