/*
14. Cho danh sách liên kết L, mỗi phần tử chứa một số nguyên dương.
a. Tính tổng các phần tử của L.
b. Thêm 1 phần tử vào đầu danh sách
c. Thêm 1 phần tử vào cuối danh sách
d. Thêm 1 phần tử vào vị trí k trong danh sách
e. Đếm xem danh sách L có bao nhiêu số nguyên tố ?
f. Tìm xem x có trong danh sách L hay không ? (trả về 0/1)
g. Tách danh sách L thành 2 danh sách chẵn,lẻ.
h. Đảo ngược các phần tử trong danh sách L. Xuất danh sách L.
i. Xóa các số nguyên tố trong danh sách L. Xuất danh sách L.
*/
#include<iostream>
#include<math.h>
using namespace std;

struct UnsignedInteger{
    unsigned int data;
    struct UnsignedInteger* next;
};
UnsignedInteger* createUnsignedInteger(unsigned int value){
    UnsignedInteger* newNode = new UnsignedInteger;
    newNode->data = value;
    newNode->next = nullptr;
    return newNode;
}
void insertLast(UnsignedInteger* &headPtr, unsigned int value){
    UnsignedInteger* newNode = createUnsignedInteger(value);
    if(nullptr == headPtr)
        headPtr = newNode;
    else {
        UnsignedInteger* tmpPtr = headPtr;
        while(nullptr != tmpPtr->next){
            tmpPtr = tmpPtr->next;
        }
        tmpPtr->next = newNode;
    }
}
void createList(UnsignedInteger* &headPtr, const int numberOfElements){
    int value = 0;
    for(int i = 0; i < numberOfElements; i++){
        insertLast(headPtr, rand() % 100);
    }
}
void printList(UnsignedInteger* headPtr){
    UnsignedInteger* tmpPtr = headPtr;
    if(nullptr == tmpPtr) return;
    else {
        while(nullptr != tmpPtr){
            cout << tmpPtr->data << " ";
            tmpPtr = tmpPtr->next;
        }
        cout << endl;
    }
}

/* Tinh tong cac phan tu trong LL*/
unsigned int sumLL(UnsignedInteger* headPtr){
    unsigned int sum = 0;
    while(nullptr != headPtr->next){
        sum += headPtr->data;
        headPtr = headPtr->next;
    }
    return sum;
}
void insertHead(UnsignedInteger* &headPtr, unsigned int value){
    UnsignedInteger* newNode = new UnsignedInteger;
    newNode->next = headPtr;
    headPtr = newNode;
}
bool findX(UnsignedInteger* headPtr, const unsigned int x){
    while(nullptr != headPtr->next){
        if(x == headPtr->data)
            return 1;
    }
    return 0;
}

// Tach sourceLL -> 2 list: so chan(even number), so le (odd number)
bool isEvenNumber(unsigned int number){
    return (0 == number % 2);
}
void splitLL(UnsignedInteger* sourceLL ,UnsignedInteger* &evenNumLL, UnsignedInteger* &oddNumLL){
    UnsignedInteger* tmpPtr = sourceLL;
    while(nullptr != tmpPtr){
        if(true == isEvenNumber(tmpPtr->data))
            insertLast(evenNumLL, tmpPtr->data);
        else 
            insertLast(oddNumLL, tmpPtr->data);
        
        tmpPtr = tmpPtr->next;
    }  
}

/*
ReverseLL:
    OldLL: a -> b -> c -> NULL | headPtr -> a
    ReverseLL:  c -> b -> a -> NULL | headPtr -> c
*/
UnsignedInteger* copyLL(UnsignedInteger* headPtr_src){
    UnsignedInteger* headPtr_dest = nullptr;
    UnsignedInteger* tmpPtr = headPtr_src;
    // Check empty srcLL
    if(headPtr_src == nullptr)
        return nullptr;
    while(nullptr != tmpPtr){
        insertLast(headPtr_dest, tmpPtr->data);
        tmpPtr = tmpPtr->next;
    }
    return headPtr_dest;    
}
UnsignedInteger* reverseLL(UnsignedInteger* sourceLL){
    UnsignedInteger* headPtr_reverseLL = copyLL(sourceLL);

    UnsignedInteger* currentNode = headPtr_reverseLL;
    UnsignedInteger* prevNode = nullptr;
    UnsignedInteger* nextNode = nullptr;

    // Cho currentNode chay tu headNode -> null
    while(nullptr != currentNode){
        nextNode = currentNode->next;
        currentNode->next = prevNode;
        
        prevNode = currentNode;
        currentNode = nextNode;
    }   
    headPtr_reverseLL = prevNode;
    return headPtr_reverseLL;
}

/*  Delete node have PRIME  */
bool isPrime(int number){   for(int i = 2; i * i <= number; i++) if(0 == number%i) return false; return true;  }
void deleteCurrentNode(UnsignedInteger* &headPtr, UnsignedInteger* &currentNode, UnsignedInteger* &prevNode){
    //  Neu node muon xoa la node dau
    if(prevNode == headPtr){
        headPtr = currentNode->next;
        free(currentNode) ;
        currentNode = headPtr;
    }
    else {
        prevNode->next = currentNode->next;
        free(currentNode) ;
        currentNode = prevNode->next;
    }
}
void deletePrimeNode(UnsignedInteger* &headPtr_sourceLL){
    UnsignedInteger* currentNode = headPtr_sourceLL;
    UnsignedInteger* prevNode = currentNode;
    while(nullptr != currentNode){
        if(true == isPrime(currentNode->data)){
            deleteCurrentNode(headPtr_sourceLL, currentNode, prevNode);
        }
        prevNode = currentNode;
        currentNode = currentNode->next;

    }
}








int main (){

    int numElements = 10;
    UnsignedInteger* headPtr = nullptr;
    createList(headPtr, numElements);
    printList(headPtr);

    UnsignedInteger* evenNumberLL = nullptr;
    UnsignedInteger* oddNumberLL = nullptr;

    // Tach sourceLL -> 2 list: so chan(even number), so le (odd number)
    // splitLL(headPtr, evenNumberLL, oddNumberLL);
    // cout << "List even number: ";
    // printList(evenNumberLL) ;
    // cout << "List odd number: ";
    // printList(oddNumberLL);

    /*
    ReverseLL:
    OldLL: a -> b -> c -> NULL | headPtr -> a
    ReverseLL:  c -> b -> a -> NULL | headPtr -> c
    */
    UnsignedInteger* headPtr_reverseLL = reverseLL(headPtr);
    cout << "Your reverse LinkedList: ";
    printList(headPtr_reverseLL);

    // Xoa nhung PRIME trong LL
    deletePrimeNode(headPtr);
    cout << "Your list without prime: ";
    printList(headPtr);



    return 0;

}