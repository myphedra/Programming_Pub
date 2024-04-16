#include <bits/stdc++.h>
using namespace std;

//-------------------------------------------------
//---------------------- BALANCE BST ---------------------------
//-------------------------------------------------
/*
                    ### 2 WAYS ###
            1.  TRANSFER INTO SELF-BALANCING BST (AVL tree)
                Traversal nodes in INORDER and insert node (source tree) to  AVL tree
            2. BALANCE WITH SORTED ARRAY.
                - Inorder traversal source tree -> assign to ARRAY 
                    ==> SORTED ARRAY
                - Build balance tree from sorted array.
*/

//-------------------------------------------------
struct BST_Node{
    int data;
    BST_Node *left, *right;

    BST_Node(const int& value, BST_Node* left_ptr = nullptr, BST_Node* right_ptr = nullptr)
        :   data(value),
            left(left_ptr), right(right_ptr) {} 
};

BST_Node* insert(BST_Node* root, const int value){
    if(nullptr == root){
        root = new BST_Node(value);
        return root;
    } else if(value < root->data){
        root->left = insert(root->left, value);
    } else if(value > root->data){
        root->right = insert(root->right, value);
    }
    return root;
}
//-------------------------------------------------


//----------------------- TRANSFER INTO AVL TREE --------------------------
struct AVL_Tree{
    int data;
    AVL_Tree *left, *right;
    int height;

    AVL_Tree(const int& value, AVL_Tree* left_ptr = nullptr, AVL_Tree* right_ptr = nullptr)
        :   data(value),
            left(left_ptr), right(right_ptr),
            height(1)   {}
};
int getHeight(AVL_Tree* root){
    if(nullptr == root) return 0;
    else return root->height;
}
int setHeight(AVL_Tree* root){
    return 1 + max(getHeight(root->left), getHeight(root->right));
}
AVL_Tree* rotateRight(AVL_Tree* root){
    AVL_Tree* newRoot = root->left;     // Save left node of root (the new root)

    root->left = newRoot->right;        // point root->right to newRoot->left, step 1 in rotateRight
    newRoot->right = root;              // newRoot become root, step 2 in rotateRight

    // root->height = 1 + max(getHeight(root->left), getHeight(root->right));
    root->height    = setHeight(root);
    newRoot->height    = setHeight(newRoot);

    return newRoot;
}
AVL_Tree* rotateLeft(AVL_Tree* root){
    AVL_Tree* newRoot = root->right;

    root->right = newRoot->left;
    newRoot->left = root;

    // root->height = 1 + max(getHeight(root->left), getHeight(root->right));
    root->height    = setHeight(root);
    newRoot->height    = setHeight(newRoot);
    // newRoot->height = 1 + max(newRoot(root->left), newRoot(root->right));

    return newRoot;
}
AVL_Tree* insert_AVL_Tree(AVL_Tree* root, int value){
    if(nullptr == root){
        root = new AVL_Tree(value);
        return root;
    } else if(value < root->data){
        root->left = insert_AVL_Tree(root->left, value);
    } else if(value > root->data){
        root->right =  insert_AVL_Tree(root->right, value);
    } else {    // value == root
        return root;
    }

    // Set height 
    root->height    = setHeight(root);

    // Rotation
    int balanceValue = getHeight(root->left) - getHeight(root->right);
    /*  balanceValue:
        1. balanceValue > 1 :   LEFT    -> rotateRight  
            - value(input)  < root->left->data:     LEFT 
            ==> LEFT - LEFT
            - value         > root->left->data:     RIGHT  
            ==> LEFT - RIGHT    
        2. balanceValue < -1:   RIGHT   -> rotateLeft
            - value > root->right->data:    RIGHT
            ==> RIGHT - RIGHT   
            - value < root->right->data:    LEFT
            ==> RIGHT - LEFT
    */

   // Check left|right
    if(balanceValue > 1){   // LEFT 
        if(value < root->left->data){   // LEFT - LEFT
            return rotateRight(root);
        } else if(value > root->left->data){    // LEFT - RIGHT
            root->left = rotateLeft(root->left);
            return rotateRight(root);
        }
    } else if(balanceValue < -1){    // RIGHT    
        if(value > root->right->data){  // RIGHT - RIGHT
            return rotateLeft(root);
        } else if(value < root->right->data){   // RIGHT - LEFT
            root->right = rotateRight(root->right);
            return rotateLeft(root);
        }
    }
    return root;
}

void transferBST_to_AVL_Tree(BST_Node* BST_root, AVL_Tree* &AVL_root) {
    if (BST_root != nullptr) {
        transferBST_to_AVL_Tree(BST_root->left, AVL_root);
        
        AVL_root = insert_AVL_Tree(AVL_root, BST_root->data);
        
        transferBST_to_AVL_Tree(BST_root->right, AVL_root);
    }
}
//-------------------------------------------------

//----------------------- USING SORTED ARRAY --------------------------
void copyAVL_Tree_to_array(BST_Node* root, vector<int> &sortedArray){
    // if(nullptr == root)
    //     return;
    // copyAVL_Tree_to_array(root->left, sortedArray);
    // sortedArray.push_back(root->data);
    // copyAVL_Tree_to_array(root->right, sortedArray);
    
    if(nullptr != root){
        copyAVL_Tree_to_array(root->left, sortedArray);
        sortedArray.push_back(root->data);
        copyAVL_Tree_to_array(root->right, sortedArray);
    }
}

//--------------------- BUILD AVL_TREE with SORTED ARRAY ----------------------------
// Build AVL_Tree from sorted array(asc)
AVL_Tree* buildAVL_Tree(vector<int> sortedArray, int left, int right){
    if (left > right)
        return NULL; 
    // The MIDDLE of array is ROOT, recursive for: left->mid-1  |   mid+1->right   
    int mid = left + (right - left)/2;      // The same with: (left + right)/2
    AVL_Tree* root = new AVL_Tree(sortedArray[mid]);

    root->left = buildAVL_Tree(sortedArray, left, mid - 1);
    root->right = buildAVL_Tree(sortedArray, mid + 1, right);

    return root;
}
//-------------------------------------------------


void preorderTraversal(BST_Node* root){
    if(nullptr != root){
        cout << root->data << "\t";
        preorderTraversal(root->left);
        preorderTraversal(root->right);
    } 
}
void preorderTraversal(AVL_Tree* root){
    if(nullptr != root){
        cout << root->data << "\t";
        preorderTraversal(root->left);
        preorderTraversal(root->right);
    }
}



int main(){
    /* === Hi my HERO! === */
    BST_Node* SourceBST =  nullptr;
    AVL_Tree* BalanceTree = nullptr;
    AVL_Tree* BST_to_AVL = nullptr;
    AVL_Tree* AVL_TreeFromSortedArray = nullptr;
    // srand(time(NULL));
    int length = 10;
    puts("- Input: ");
    for(int i = 0; i < length; i++){
        int randomNum = rand() % 100 + 1;
        cout << randomNum << "\t";
        SourceBST = insert(SourceBST, randomNum);
        BalanceTree = insert_AVL_Tree(BalanceTree, randomNum);
    }   cout << endl;
    
    puts("- BST from input: ");
    preorderTraversal(SourceBST); cout << endl;
    puts("- AVL_Tree from input: ");
    preorderTraversal(BalanceTree); cout << endl;

    //-------------------------------------------------
    transferBST_to_AVL_Tree(SourceBST, BST_to_AVL);
    puts("- BST to AVL tree: ");
    preorderTraversal(BST_to_AVL); cout << endl;
    //-------------------------------------------------
    vector<int> sortedArray;
    copyAVL_Tree_to_array(SourceBST, sortedArray);
    
    puts("- Sorted array from BST: ");
    for(int &item : sortedArray)
        cout << item << "\t";
    cout << endl;

    puts("- AVL tree from sorted array: ");
    AVL_TreeFromSortedArray = buildAVL_Tree(sortedArray, 0, sortedArray.size() - 1);
    preorderTraversal(AVL_TreeFromSortedArray); cout << endl;

    // 51      16      4       24      98      89      61      65      64      99
    // 89      51      16      4       24      64      61      65      98      99


    return 0;
}



