// Cau hoi: Du doan ket qua cua chuong trinh sau:
// Dap an: 12
#include <iostream>
using namespace std;
int main() {
    int a = 21;
    int *p = &a;
    *p = 12;
    cout << a;
    return 0;
}
