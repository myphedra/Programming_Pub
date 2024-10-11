#include <iostream>
using namespace std;

struct DoublyNode{
    int data;
    struct DoublyNode* next;
    struct DoublyNode* prev;
};  
DoublyNode* createDoublyNode(int data){
    DoublyNode* ptr = new DoublyNode;
    ptr->prev = nullptr;
    ptr->data = data;
    ptr->next = nullptr;
    return ptr;
}
void insertLast(DoublyNode* &headPtr, DoublyNode* &tailPtr, int data){
    DoublyNode* ptr_insertNode = createDoublyNode(data);

    // If headPtr is pointing to any node.
    if(nullptr == headPtr){
        headPtr = ptr_insertNode;
        tailPtr = ptr_insertNode;
    }
    else {
        tailPtr = headPtr;
        while(nullptr != tailPtr->next){
            tailPtr = tailPtr->next;
        }
        ptr_insertNode->prev = tailPtr;
        tailPtr->next = ptr_insertNode;
        tailPtr = tailPtr->next;
    }
}
DoublyNode* createDoublyLL(DoublyNode* &tailPtr, const int numNodes){
    DoublyNode* headPtr = nullptr;
    // srand(time(NULL));
    for(int i = 0; i < numNodes; i++){
        insertLast(headPtr, tailPtr, rand() % 100);  // [0;99]
    }
    return headPtr;
}
//--------------INSERT AND DELETE ----------------------
void insertDoublyNode(DoublyNode* headPtr, int value, int position){
    DoublyNode* insertNode = createDoublyNode(value);
    DoublyNode* currentNode = headPtr;
    int index = position -1;
    for(int i = 0; i < index; i++){
        currentNode = currentNode->next;
    }
    DoublyNode* nextNode = currentNode->next;
    insertNode->prev = currentNode;
    insertNode->next = nextNode;
    currentNode->next = insertNode;
    nextNode->prev = insertNode;
}
void printDoublyLL(DoublyNode* headPtr){
    DoublyNode* tmpPtr = headPtr;
    if(nullptr == tmpPtr) return;
    else {
        cout << "Your list: ";
        while(nullptr != tmpPtr){
            cout << tmpPtr->data << " ";
            tmpPtr = tmpPtr->next;
        }
        cout << endl;
    }
}
void printReverseDoublyLL(DoublyNode* headPtr, DoublyNode* tailPtr){
    DoublyNode* tmp_tailPtr = tailPtr;
    cout << "Your reverse doubly LL: ";
    while(tmp_tailPtr != headPtr){
        cout << tmp_tailPtr->data << " ";
        tmp_tailPtr = tmp_tailPtr->prev;
    }
    cout << tmp_tailPtr->data << endl;
}

int main(){
    DoublyNode* tailPtr = nullptr;
    DoublyNode* headPtr = nullptr;
    const int numDoublyNodes = 10;
    headPtr = createDoublyLL(tailPtr, numDoublyNodes);
    insertDoublyNode(headPtr, 9999 , 3);
    printDoublyLL(headPtr);

    // printReverseDoublyLL(headPtr, tailPtr);
    return 0;
}