/** CART ĐƯỢC LƯU RỜI RẠC, 
 * TRUY XUẤT THÔNG QUA USERNAME(of CUSTOMER)
 */
export class Cart {
    /* localStorageKey: username của customer tương ứng với cart */
    localStorageKey;          // private
    cartItem = [];      // mảng các products
    
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
                    //-----FOR USER-----
                    brandId: '',
                    img: '',
                    name: '',
                    pb: '',
                    price: 0,
                    chip: '',
                    pin: '',
                    size: '',
                    f: '',
                    //------------------
                },
            ];
        }

        console.log('Loaded cart of ' + this.localStorageKey);
    }
    /** SAVE CART TO localStorage: 
     * Chuyển cartItem về string
     * Lưu vào localStorage
     */
    saveCartToStorage(){
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItem));

        console.log('Saved cart of ' + this.localStorageKey);
    }
    /** THÊM PRODUCT VÀO CART: tìm trong cart product cần thêm
     * Có: tăng quantity lên
     * Không: thêm product mới vào cart
     */
    addToCart(product){
        // Tìm product với productId trong cart
        let matchingProduct;
        this.cartItem.forEach((item) => {
            if(item.productId === product.productId){
                matchingProduct = item;
            }
        });
        // Có thì tăng quantity, chưa có thì add
        if(matchingProduct){
            matchingProduct.quantity += product.quantity;
            // matchingProduct.quantity++;
        } else {
            this.cartItem.push(
                {
                    productId: product.productId,
                    quantity: 1,
                    isPicked: false,
                    //--------------
                    brandId: product.brandId,
                    img: product.img,
                    name: product.name,
                    pb: product.pb,
                    price: product.price,
                    chip: product.chips,
                    pin: product.pin,
                    size: product.size,
                    f: product.f,
                }
            );
        }
        console.log('Added product ' + productId + 'to cart of ' + this.localStorageKey);
        // Cập nhật lại cart mới:
        saveCartToStorage();
    }
    // addToCart(productId){
    //     // Tìm product trong cart
    //     let matchingProduct;
    //     this.cartItem.forEach((item) => {
    //         if(item.productId === productId){
    //             matchingProduct = item;
    //         }
    //     });
    //     // Có thì tăng quantity, chưa có thì add
    //     if(matchingProduct){
    //         matchingProduct.quantity++;
    //     } else {
    //         this.cartItem.push(
    //             {
    //                 productId: productId,
    //                 quantity: 1,
    //                 isPicked: false,
    //             }
    //         );
    //     }
    //     console.log('Added product ' + productId + 'to cart of ' + this.localStorageKey);
    //     // Cập nhật lại cart mới:
    //     saveCartToStorage();
    // }
    // Xóa product trong cart
    removeFromCart(productId){
        const newCart = [];
        this.cartItem.forEach((cartItem) => {
            if(productId !== cartItem.productId){
                newCart.push(cartItem);
            }
        });
        this.cartItem = newCart;

        console.log('Removed product with ID: ' + productId);
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