// Cau hoi: Du doan ket qua cua chuong trinh sau:
// Dap an: 10
#include <iostream>
using namespace std;
int main() {
    int a = 5, b = 6;
    if( ++a == b--){
        cout <<  (a++) + (--b);
    } else {
        cout << (--a) - (b++);
    }
    return 0;
}
