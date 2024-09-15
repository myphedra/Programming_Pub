// Cau hoi 9: Hay toi uu doan code sau. 
// Tra loi:  
/*  
    int optimized(int start, int jump, int n){
        return n*start + (int) jump*(n*(n-1))/2;
    }

*/   



// #include <iostream>
// using namespace std;
int notOptimized(int start, int jump, int n) {
    int sum = 0; 
    for (int i = 0; i < n; ++i) {
        int currentTerm = start + i * jump; 
        sum += currentTerm; 
    }
    return sum;
}
// int main(){
//     /* === Hi my HERO! === */
//     cout << notOptimized(3, 2, 5);
//     return 0;
// }


