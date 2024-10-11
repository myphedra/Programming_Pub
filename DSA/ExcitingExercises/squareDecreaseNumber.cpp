// Square Decrease Number.
#include <iostream>
// #include <stdio.h>
// #include <conio.h>
using namespace std;

void squareDecreaseNumber(){
    int square;
    cout << "Enter number: " ; cin >> square;


    int arr[100][100];

    int N = 1 + 2*(square - 1);
    int counter = 0, num = square;

    while(num > 1){
        for(int j = 1 + counter; j < N - counter; j++){
            arr[counter][j-1] = num; 
        } 
        for(int i = 1 + counter; i < N - counter; i++){
            arr[i-1][N-1-counter] = num;

        }
        for(int j = N - counter; j > 1 + counter; j--){
            arr[N - 1 - counter][j-1] = num;

        }
        for (int i = N - counter; i > 1 + counter; i--){
            arr[i-1][counter] = num;

        }
        num = num - 1;
        counter = counter + 1;
    }
    // Print number 1.
    int one = (int)N*1.0/2;
    arr[one][one] = 1;

    // Print two-dimensional array.
    printf("\n");
    for (int i = 0; i < N; i++){
        for (int j = 0; j < N; j++){
            cout << arr[i][j] << "\t";
        }
        cout << endl;
    }
}


int main (){

    cout << "hello" << endl; 
    squareDecreaseNumber();
  
    //system ("pause");       // Print: Press any key to continue... 
    //getch(); -> conio.h | Make the program waits for any key to be pressed
    return 0;

}


