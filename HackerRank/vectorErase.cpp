#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

void getVectorValue(vector<int> &iVector){
    int temp; 
    for(int i = 0; i <  iVector.capacity(); i++){
        cin >> temp;
        iVector.push_back(temp);
    }
}

void printVector(vector<int> &iVector){
    for(int &item : iVector){
        cout << item << " ";
    }
}
int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    vector<int> iVector;
    int N; cin >> N; 
    iVector.reserve(N);
    getVectorValue(iVector);
    
    int x; cin >> x;
    iVector.erase(iVector.begin() + x -1);
    
    int a, b; cin >> a >> b;
    iVector.erase(iVector.begin() + a -1, iVector.begin() + b -1);
    
    cout << iVector.size() << endl;
    printVector(iVector);
    return 0;
}
