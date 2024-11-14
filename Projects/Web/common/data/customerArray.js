/** CUSTOMER ARRAY: lưu toàn bộ thông tin của khách hàng.
 * Mỗi phần từ là một Customer Object, với: 
 * Property: username, password, status, phone, email,
 *           address (obj)   
 * Method:
 *  -
 *  -
 */
class Address {
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
class Customer {
    username = '';   // (Work like ID), unique
    password = '';   
    
    /* Information của khách hàng: 
    có thể gộp thành Object nhưng để đơn giản -> không gộp */
    phone = '';      
    email = '';
    address = undefined;        // Object 
    
    /** status: tình trạng của khách hàng, bị lock hay chưa
     * 0: unavailable (đã bị lock)
     * 1: available (chưa lock, đang hoạt động)
     */
    status = 1;     // Default: 1 
    
    constructor(username, password, phone, email, address, status = 1){
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.email = email;
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
// console.log(customerArray);
// Nếu customerArray chưa được tạo:
if(!customerArray){
    customerArray = [];
    console.log(customerArray);
    
}

// Lưu mảng vào localStorage:
export function saveCustomerArrayToStorage(){
    localStorage.setItem('customerArray', JSON.stringify(customerArray));
    console.log('Saved customerArray to localStorage');
}

/** ----- USER ----- */
// Kiểm tra trong mảng customer đã có tồn tại username ?
// Có: return true
// Không: return false
export function checkExistedUsername(username) {
    // !!! forEach: duyệt từ đầu đến cuối mảng không dừng với return.
    // some: dừng lại vòng lặp ngay khi tìm thấy username tương ứng.
    return customerArray.some((customer) => {
        if (username === customer.username) {

            console.log('Exised: pass user: ' + username);
            return true; // Đã tồn tại
        }
        return false;
    });
}

// Kiểm tra đăng nhập đúng:
// false: username không tồn tại hoặc mật khẩu không đúng.
// true: hợp lệ
export function checkValidAccount(username, password){
    const matchingCustomer = customerArray.find(customer => customer.username === username);
    if(!matchingCustomer || matchingCustomer.password !== password){
        return false;
    }    
    return true;
}

// Thêm new customer vào Array
// Chỉ cần truyền username, password (khi customer mới đăng kí)
export function addCustomerToArray(username, password, phone = '', email = '', address = '', status = 1){
    const customer = new Customer(username, password);
    customerArray.push(customer);
    console.log('Added customer to customerArray');

    // Lưu thay đổi vào localStorage:
    saveCustomerArrayToStorage();
}
