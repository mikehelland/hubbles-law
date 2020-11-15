#include<stdio.h>


void runFast() {
    printf("\reticulating splines... fast!\n\n");

    unsigned long t = 0;
    double c = 1;
    double H = 0.00035;

    double photon = 0;    
    long nextTarget = 200;

    while (t < 50000) {
        t++;

        photon += c / (1 + H * photon);

        if (photon >= nextTarget) {
            printf("d = %f       t = %lu\n", photon, t);
            nextTarget += 200;
        }
    }
}

void runSlow() {
    printf("\reticulating splines... slow...\n\n");

    // 1 year per step
    // c = 1 lightyear per year

    unsigned long t = 0;
    double c = 1;
    double H = 0.00000000031;

    double photon = 0;    
    long nextTarget = 1000000000;

    while (1) {
        t++;

        photon += c / (1 + H * photon);

        if (photon >= nextTarget) {
            printf("d = %f       t = %lu\n", photon, t);
            nextTarget += 200000000;
            return;
        }
    }

}

int main()
{

    runFast();
    runSlow();
    return 0;

}