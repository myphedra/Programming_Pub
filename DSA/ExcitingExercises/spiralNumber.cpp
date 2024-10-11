#include <iostream>
// #include <stdio.h>
// #include <conio.h>
using namespace std;

void spiralNumber(){
    int row, column;
    cout << "Enter number of rows and columns (row*column): " ; cin >> row >> column;

    int arr[100][100];
    int N = row*column;
    int counter = 0, num = 1;

    while(num <= N){
        for(int j = 1 + counter; j < column - counter; j++){
            arr[counter][j-1] = num; num++;
        } 
        if(num > N){break;}
        for(int i = 1 + counter; i < row - counter; i++){
            arr[i-1][column-1-counter] = num; num++;

        }
        if(num > N){break;}
        for(int j = column - counter; j > 1 + counter; j--){
            arr[row - 1 - counter][j-1] = num; num++;

        }
        if(num > N){break;}
        for (int i = row - counter; i > 1 + counter; i--){
            arr[i-1][counter] = num; num++;

        }
        counter = counter + 1;
    }

    // Print two-dimensional array.
    printf("\n");
    for (int i = 0; i < row; i++){
        for (int j = 0; j < column; j++){
            cout << arr[i][j] << "\t";
        }
        cout << endl;
    }
}


int main (){

    cout << "hello" << endl; 
    spiralNumber();
  
    //system ("pause");       // Print: Press any key to continue... 
    //getch(); -> conio.h | Make the program waits for any key to be pressed
    return 0;

}


