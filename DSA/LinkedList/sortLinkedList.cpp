#include <bits/stdc++.h>
using namespace std;

struct Node{
    int data;
    struct Node *nextPtr;
};

Node* createNode(int value){
    Node* ptr_tmpNode = new Node;
    ptr_tmpNode->data = value;
    ptr_tmpNode->nextPtr = nullptr;
    return ptr_tmpNode;
}
void insertLast(Node* &headPtr, int value){
    Node* ptr_tmpNode = createNode(value);
    
    // If headPtr is point to any node.
    if(nullptr == headPtr)  
        headPtr = ptr_tmpNode;
    else{
        Node* tmpPtr = headPtr;
        while(tmpPtr->nextPtr != nullptr){
            tmpPtr = tmpPtr->nextPtr;
        }
        tmpPtr->nextPtr = ptr_tmpNode;
    }
}   
void createList(Node* &headPtr, const int numElements){
    /* Enter value, ask for continue or exit. */
    // int value = 0, repeat = 0;
    // do{
    //     cout << "Enter value: "; cin >> value;
    //     insertLast();

    //     cout << "Continue? [1|0]:"; cin >> repeat;
    // } while(repeat != 0);

    /* Enter number of elements, then enter that value. */
    int value = 0;
    for(int i = 0; i < numElements; i++){
        cin >> value;
        insertLast(headPtr, value);
    }
}
void printList(Node* headPtr){
    Node* tmpPtr = headPtr;
    if(nullptr == tmpPtr) return;
    else {
        cout << "Your list: " << endl;
        while(nullptr != tmpPtr){
            cout << tmpPtr->data << " ";
            tmpPtr = tmpPtr->nextPtr;
        }
        cout << endl;
    }
}
int countNumberNodes(Node* headPtr){
    int counter = 0;
    Node* tmpPtr = headPtr;
    while(nullptr != tmpPtr){
        tmpPtr = tmpPtr->nextPtr; 
        counter++;
    }
    return counter;
}

//-------------------- SORT LINKED LIST ------------------
void swapDataTwoNodes(Node* ptr_secondNode, Node* ptr_firstNode){
    int tmp = ptr_firstNode->data;
    ptr_firstNode->data = ptr_secondNode->data;
    ptr_secondNode->data = tmp;
}
// INTERCHANGE SORT:
bool interchangeSort(Node* headPtr_srcLL){
    // Check empty LL
    if(headPtr_srcLL == nullptr)
        return false;
    Node* iPtr = headPtr_srcLL;
    while(iPtr != nullptr){
        Node* jPtr = iPtr->nextPtr;
        while(jPtr != nullptr){
            if((iPtr->data) > (jPtr->data)){
                // Swap 2 data
                swapDataTwoNodes(iPtr, jPtr);
                // int tmp = iPtr->data;
                // iPtr->data = jPtr->data;
                // jPtr->data = tmp; 
            }
            jPtr = jPtr->nextPtr;
        }
        iPtr = iPtr->nextPtr;
    }
    return true;
}

// SELECTION SORT:
bool selectionSort(Node* headPtr_srcLL){
    if(nullptr == headPtr_srcLL)
        return false;

    Node* ptr_minNode = nullptr;
    Node* iPtr = headPtr_srcLL;

    while(nullptr != iPtr){
        ptr_minNode = iPtr;
        Node* jPtr = iPtr;
        while(nullptr != jPtr){
            if((jPtr->data) < (ptr_minNode->data))
                ptr_minNode = jPtr;
            jPtr = jPtr->nextPtr;
        }
        swapDataTwoNodes(iPtr, ptr_minNode);
        iPtr = iPtr->nextPtr;
    }
    return true;
}


// MERGE SORT:
// Thuat toan: Copy data cua LL ra Array, sau do sap xep Array bang Merge Sort, roi copy lai LL
void merge(int sortedArray[], int lengthSortedArray, int left, int mid, int right){
    int lengthFirstArray    = mid - left + 1;
    int lengthSecondArray   = right - mid;
    int *ptrFirstArray  = new int[lengthFirstArray];
    int *ptrSecondArray = new int[lengthSecondArray];
    
    // Copy data from source array to 2 temp array.
    for(int i = 0; i < lengthFirstArray; i++){
        *(ptrFirstArray + i) = sortedArray[left + i]; 
    }
    for(int i = 0; i < lengthSecondArray; i++){
        *(ptrSecondArray + i) = sortedArray[mid + 1 + i]; 
    }

    // Merge 2 temp array to source array.
    int indexFirstArray = 0, indexSecondArray = 0, indexSortedArray = left;
    while(indexFirstArray < lengthFirstArray && indexSecondArray < lengthSecondArray){
        if( *(ptrFirstArray + indexFirstArray) <= *(ptrSecondArray + indexSecondArray)){            
            sortedArray[indexSortedArray] = *(ptrFirstArray + indexFirstArray);
            indexFirstArray++;
        } else {
            sortedArray[indexSortedArray] = *(ptrSecondArray + indexSecondArray);
            indexSecondArray++;
        }
        indexSortedArray++;
    }
    //Neu mang nao het truoc thi gan gia tri con lai cua mang kia cho mang SortedArray
    if(indexFirstArray >= lengthFirstArray) {
        for(int i = indexSecondArray; i < lengthSecondArray; i++){
            sortedArray[indexSortedArray] = *(ptrSecondArray + i);
            indexSortedArray++;
        }
    } else {
        for(int i = indexFirstArray; i < lengthFirstArray; i++){
            sortedArray[indexSortedArray] = *(ptrFirstArray + i);
            indexSortedArray++;
        }
    }
}
void mergeSortArray(int srcArray[], int lengthSrcArray, int left, int right){
    if(left < right){
        // Same with: (left + right)/2, but the way below is useful when left and right is big number.
        int mid = left + (right - left)/2;
        mergeSortArray(srcArray, lengthSrcArray, left, mid);
        mergeSortArray(srcArray, lengthSrcArray, mid + 1, right);
        merge(srcArray, lengthSrcArray, left, mid, right);
    }
}
bool mergeSortLL(Node* headPtr_srcLL){
    Node* tmpPtr_srcLL = headPtr_srcLL;

    // Copy data cua LL qua Array
    int length_copyArray = countNumberNodes(tmpPtr_srcLL);
    int *ptr_copyArray = new int[length_copyArray];
    int index = 0;
    while(nullptr != tmpPtr_srcLL){
        *(ptr_copyArray + index) =  tmpPtr_srcLL->data;
        index++;
        tmpPtr_srcLL = tmpPtr_srcLL->nextPtr;
    }

    // Sap xep copyArray 
    mergeSortArray(ptr_copyArray, length_copyArray, 0, length_copyArray - 1);

    // Copy copyArray da sap xep qua LL
    index = 0;
    tmpPtr_srcLL = headPtr_srcLL;
    while(nullptr != tmpPtr_srcLL){
        tmpPtr_srcLL->data = *(ptr_copyArray + index);
        index++;
        tmpPtr_srcLL = tmpPtr_srcLL->nextPtr;
    }
    return true;
}
//----------------------------------------------------------



int main (){

    Node* headPtr = nullptr;
    const int numElements = 5;
    createList(headPtr, numElements);

    // selectionSort(headPtr);
    mergeSortLL(headPtr);
    printList(headPtr);

    return 0;
}