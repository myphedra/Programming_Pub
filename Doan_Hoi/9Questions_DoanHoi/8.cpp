/* Cau 7: Tim loi trong doan code sau va sua lai cho dung.
    Error: int a, int b   (Chi truyen tham tri(1 ban copy), khong truyen tham chieu hoac con tro)
    Fix:   int &a, int &b
*/

#include <iostream>
using namespace std;

void swap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}
int main() {
    int x = 69, y = 96;
    swap(x, y);
    cout << "x: " << x << ", y: " << y;
    return 0;
}
