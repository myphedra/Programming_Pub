
// Cau hoi: Du doan ket qua cua chuong trinh sau:
// Dap an: 0 1 2
#include <iostream>
using namespace std;
int main() {
    for (int i = 0; i < 5; i++) {
        if (i == 3) break;
        cout << i << " ";
    }
    return 0;
}
