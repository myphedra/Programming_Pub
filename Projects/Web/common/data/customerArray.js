/** CUSTOMER ARRAY: lưu toàn bộ thông tin của khách hàng.
 * Mỗi phần từ là một Customer Object, với: 
 * Property: username, password, status, phone, email,
 *           address (obj)   
 * Method:
 *  -
 *  -
 */
export class Address {
    city = undefined;           // Thành phố
    district = undefined;       // Quận *
    ward = undefined;           // Phường
    numberAndRoad = undefined;  // Số nhà và tên đường

    /* METHOD */
    // Lấy ra district field
    getDistrict(){
        return this.district;
    }
}
export class Customer {
    username = undefined;   // (Work like ID), unique
    password = undefined;   
    
    /* Information của khách hàng: 
    có thể gộp thành Object nhưng để đơn giản -> không gộp */
    phone = undefined;      
    email = undefined;
    address = undefined;        // Object 
    
    /** status: tình trạng của khách hàng, bị lock hay chưa
     * 0: unavailable (đã bị lock)
     * 1: available (chưa lock, đang hoạt động)
     */
    status = undefined;     // Default: 1 
    
    constructor(username, password, phone, address, status = 1){
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.status = 1;
    }

    /* METHOD */
    lockCustomer(){
        this.status = 0;
    }
    unlockCustomer(){
        if(this.status === 0){
            this.status = 1;
        } else {
            console.log('Failed: Tài khoản người dùng chưa bị khóa.');
        }
    }
}

/* MẢNG KHÁCH HÀNG */
// Load mảng lên từ localStorage
export let customerArray = JSON.parse(localStorage.getItem('customerArray'));
// Nếu customerArray chưa được tạo:
if(!customerArray){
    customerArray = [];
}

// Lưu mảng vào localStorage:
function saveOrderArrayToStorage(){
    localStorage.setItem('customerArray', JSON.stringify(customerArray))
}