/* Cau 7: Tim loi trong doan code sau va sua lai cho dung.
    Error: i <= 5   (Truy cap phan tu ngoai mang)
    Fix:   i < 5
*/
#include <iostream>
using namespace std;
int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    for (int i = 0; i <= 5; i++) {
        cout << arr[i] << " ";
    }
    return 0;
}
