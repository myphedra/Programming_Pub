/** CART ĐƯỢC LƯU RỜI RẠC, 
 * TRUY XUẤT THÔNG QUA USERNAME(of CUSTOMER)
 */
class Cart {
    /* localStorageKey: username của customer tương ứng với cart */
    localStorageKey;          // private
    cartItem = undefined;      // mảng các products
    
    // Khởi tạo cart ban đầu: load lên từ localStorage
    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;
        this.loadCartFromStorage();
    }

    // Private method
    loadCartFromStorage(){
        /** Get data for cart from localStorage:
         * Lấy cart JSON từ localStorage thông qua key
         * Parse -> array để lưu vào cartItem
         */ 
        this.cartItem = JSON.parse(localStorage.getItem(this.localStorageKey));
        
        // Nếu cart null (chưa có product), gán giá trị mặc định hoặc thông báo (có thể)...
        if(!this.cartItem){
            this.cartItem = [
                {
                    productId: '',
                    quantity: 0,
                    isPicked: false,        // Đánh dấu product được chọn để mua.
                },
            ];
        }
    }
    /** SAVE CART TO localStorage: 
     * Chuyển cartItem về string
     * Lưu vào localStorage
     */
    saveCartToStorage(){
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItem));
    }
    /** THÊM PRODUCT VÀO CART: tìm trong cart product cần thêm
     * Có: tăng quantity lên
     * Không: thêm product mới vào cart
     */
    addToCart(productId){
        // Tìm product trong cart
        let matchingProduct;
        this.cartItem.forEach((item) => {
            if(item.productId === productId){
                matchingProduct = item;
            }
        });
        // Có thì tăng quantity, chưa có thì add
        if(matchingProduct){
            matchingProduct.quantity++;
        } else {
            this.cartItem.push(
                {
                    productId: productId,
                    quantity: 1,
                    isPicked: false,
                }
            );
        }
        // Cập nhật lại cart mới:
        saveCartToStorage();
    }
    // Xóa product trong cart
    removeFromCart(productId){
        const newCart = [];
        this.cartItem.forEach((cartItem) => {
            if(productId !== cartItem.productId){
                newCart.push(cartItem);
            }
        });
        this.cartItem = newCart;
        saveCartToStorage();
    }

    /** Chọn các product để mua:
     * Arg: productId
     * Thay đổi trạng thái của isPicked -> true (được chọn)
     */
    markProductToPay(productId){
        this.cartItem.forEach((item) => {
            if(productId === item.productId){
                item.isPicked = true;
            }
        });
        // Lưu vào localStorage sau khi thay đổi:
        saveCartToStorage();
    }
}