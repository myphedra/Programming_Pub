// Cau hoi: Du doan ket qua cua chuong trinh sau:
// Dap an: MondayTuesdayWednesdayThursdayFridaySaturdayInvalid
#include <iostream>
using namespace std;
int main() {
    int day = 2;
    switch (day) {
        case 1:     cout << "Sunday";
        case 2:     cout << "Monday";
        case 3:     cout << "Tuesday";
        case 4:     cout << "Wednesday";
        case 5:     cout << "Thursday";
        case 6:     cout << "Friday";
        case 7:     cout << "Saturday";
        default:
            cout << "Invalid";
    }
    return 0;
}
