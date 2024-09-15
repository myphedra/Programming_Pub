/* Cau 6: Tim loi trong doan code sau va sua lai cho dung.
    Error: i-- (Vong lap vo han)
    Fix:   i++
*/
#include <iostream>
using namespace std;
int main() {
    int n = 5;
    for (int i = 1; i < n; i--) {
        cout << i << " ";
    }
    return 0;
}
