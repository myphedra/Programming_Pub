#include <iostream>
using namespace std;

int getValues(int &a, int &b, int &c, int &d, int &e, int &f){
    cout << "Enter value for a,b,c,d,e,f: " ; 
    cin >> a >> b >> c >> d >> e >> f;
    return 1;
}

void printCongTruNhanChia(int order){
    switch(order){
        case 1: { 
            cout << " + " ; break ;
        }
        case 2: { 
            cout << " - " ; break ;
        }
        case 3: { 
            cout << " * " ; break ;
        }
        case 4: { 
            cout << " / " ; break ;
        }
    }
}

int congTruNhanChia(int order, int a, int b){
    int result = 0;
    switch(order){
        case 1:{
            result = a + b; break;
        }
        case 2:{
            result = a - b; break;
        }
        case 3:{
            result = a * b; break;
        }
        case 4:{
            if (b != 0) {
                result = a / b; break;
            } else {
                cout << "Error: Division by zero" << endl;
                exit(1); //  exit(1) statement is used to terminate a program abnormally with an error code
            }
        }
    }
    return result;
}

void printPhepTinh(int CalculationOne, int CalculationTwo, int CalculationThree, int CalculationFour, int a, int b, int c, int d, int e, int f){
    
    cout << "((((" ;
    cout << a ;
    printCongTruNhanChia(CalculationOne) ; 
    cout << b ;
    cout << " ) " ; 
    printCongTruNhanChia(CalculationTwo);
    cout << c ;
    cout << " ) " ;
    printCongTruNhanChia(CalculationThree);
    cout << d ;
    cout << " ) " ; 
    printCongTruNhanChia(CalculationFour);
    cout << e << " ) " ;
    cout << " = " ;
    cout << f << endl;
}


// This function is wrong because we don't RESET value for RESULT variable after a loop !
// void printCorrectCalculation(int a, int b, int c, int d, int e, int f){
//     int result = 0;
    
//     for (int CalculationOne = 1; CalculationOne <= 4; CalculationOne++){

//         result = result + congTruNhanChia(CalculationOne, a, b);

//         for (int CalculationTwo = 1; CalculationTwo <= 4; CalculationTwo++){

//             result = result + congTruNhanChia(CalculationTwo, result, c);

//             for (int CalculationThree = 1; CalculationThree <= 4; CalculationThree++){

//                 result = result + congTruNhanChia(CalculationThree, result, d);

//                 for (int CalculationFour = 1; CalculationFour <= 4; CalculationFour++){
                    
//                     result = result + congTruNhanChia(CalculationFour, result, e);

//                     if(f == result) printPhepTinh(CalculationOne, CalculationTwo, CalculationThree, CalculationFour, a, b, c, d, e, f);
//                 }
//             }
//         }
//     }
// }

// Good!
void printCorrectCalculation(int a, int b, int c, int d, int e, int f){
    int result = 0;
    
    for (int CalculationOne = 1; CalculationOne <= 4; CalculationOne++){
        for (int CalculationTwo = 1; CalculationTwo <= 4; CalculationTwo++){
            for (int CalculationThree = 1; CalculationThree <= 4; CalculationThree++){
                for (int CalculationFour = 1; CalculationFour <= 4; CalculationFour++){
                    result = a; // Both RESET value for RESULT and assign <a>to RESULT
                    result = congTruNhanChia(CalculationOne, result, b);
                    result = congTruNhanChia(CalculationTwo, result, c);
                    result = congTruNhanChia(CalculationThree, result, d);
                    result = congTruNhanChia(CalculationFour, result, e);
                    if (f == result) {
                        printPhepTinh(CalculationOne, CalculationTwo, CalculationThree, CalculationFour, a, b, c, d, e, f);
                    }
                }
            }
        }
    }
}

int main (){
    int a, b, c, d, e, f;
    getValues(a, b, c, d, e, f);
    printCorrectCalculation(a, b, c, d, e, f);
    return 0;
}




