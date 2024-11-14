/*<div class="cart-item">   
                <div class="item-left">   
                    <input type="checkbox" class="item-checkbox" data-price="${product.price}">   
                    <img class="product-img" src="${product.img}" alt="${product.brandId}">   
                    <div class="product-details">   
                        <span>${product.name}</span>   
                    </div>   
                </div>   
                <span class="category">${product.pb}</span>   
                <span class="price" data-unit-price="${product.price}">${formatPrice(product.price)}</span>   
                <div class="quantity-control">   
                    <button class="decrease">-</button>   
                    <input type="text" class="quantity" value="${product.sl}" readonly>   
                    <button class="increase">+</button>   
                </div>   
                <span class="total-price">${formatPrice(totalPrice)}</span>   
                <div class="action">   
                    <button class="delete-btn">Xóa</button>   
                    <a class="similar-product" data-product="${product.name}">Tìm sản phẩm tương tự</a>   
                </div>   
            </div>
            </div>
*/

document.addEventListener('DOMContentLoaded', () => {  
    const picked = document.querySelector('.cart-container');  

    // Retrieve productPicked from localStorage  
    const storedProducts = localStorage.getItem('productPicked');  
    const productPicked = storedProducts ? JSON.parse(storedProducts) : [];   

    picked.innerHTML = '';   // Clear any previous content  

    // Loop through each product and create corresponding HTML  
    productPicked.forEach(product => {  
        const totalPrice = product.price * product.sl; // Calculate total price for the quantity  
        
        const pickedHTML = `  
            <div class="cart-item">   
                <div class="item-left">   
                    <input type="checkbox" class="item-checkbox" data-price="${product.price}">   
                    <img class="product-img" src="${product.img}" alt="${product.name}">   
                    <div class="product-details">   
                        <span>${product.name}</span>   
                    </div>   
                </div>   
                <span class="category">${product.pb}</span>   
                <span class="price" data-unit-price="${product.price}">${formatPrice(product.price)}</span>   
                <div class="quantity-control">   
                    <button class="decrease" data-name="${product.name}">-</button>   
                    <input type="text" class="quantity" value="${product.sl}" readonly>   
                    <button class="increase" data-name="${product.name}">+</button>   
                </div>   
                <span class="total-price">${formatPrice(totalPrice)}</span>   
                <div class="action">   
                    <button class="delete-btn" data-name="${product.name}">Xóa</button>   
                    <a class="similar-product" data-product="${product.name}">Tìm sản phẩm tương tự</a>   
                </div>   
            </div>  
        `;  
        picked.insertAdjacentHTML('beforeend', pickedHTML);  
    });  

    // Attach click event listeners to dynamically handle button actions  
    addEventListeners();  
});  
// Function to attach event listeners for buttons in cart  
function addEventListeners() {  
    const decreaseButtons = document.querySelectorAll('.decrease');  
    const increaseButtons = document.querySelectorAll('.increase');  
    const deleteButtons = document.querySelectorAll('.delete-btn');  
    const quantityInputs = document.querySelectorAll('.quantity');  

    // Decrease button  
    decreaseButtons.forEach(button => {  
        button.addEventListener('click', (event) => {  
            const productName = event.currentTarget.dataset.name;  
            // Handle decreasing quantity logic here  
            updateCartQuantity(productName, -1);  
        });  
    });  

    // Increase button  
    increaseButtons.forEach(button => {  
        button.addEventListener('click', (event) => {  
            const productName = event.currentTarget.dataset.name;  
            // Handle increasing quantity logic here  
            updateCartQuantity(productName, 1);  
        });  
    });  

    // Delete button  
    deleteButtons.forEach(button => {  
        button.addEventListener('click', (event) => {  
            const productName = event.currentTarget.dataset.name;  
            // Handle product deletion logic here  
            removeProductFromCart(productName);  
        });  
    });  
} 

// Function to update the quantity  
function updateCartQuantity(productName, delta) {  
    // Logic to increase or decrease the quantity in the cart  
    // Retrieve, modify and save back to localStorage  
}  

// Function to remove a product from the cart  
function removeProductFromCart(productName) {  
    // Logic to remove the product from the cart and update localStorage  
}


function updateCartQuantity(productName, delta) {  
    const storedProducts = JSON.parse(localStorage.getItem('productPicked')) || [];  
    const product = storedProducts.find(item => item.name === productName);  

    if (product) {  
        product.sl += delta;  
        if (product.sl <= 0) {  
            removeProductFromCart(productName);  
        } else {  
            localStorage.setItem('productPicked', JSON.stringify(storedProducts));  
            location.reload(); // Reload to update the displayed cart  
        }  
    }  
}  

function removeProductFromCart(productName) {  
    const storedProducts = JSON.parse(localStorage.getItem('productPicked')) || [];  
    const updatedProducts = storedProducts.filter(item => item.name !== productName);  
    localStorage.setItem('productPicked', JSON.stringify(updatedProducts));  
    location.reload(); // Reload to update the displayed cart  
}

//===== HIỂN THỊ SẢN PHẨM ĐƯỢC CHỌN BÊN GIỎ HÀNG =====//
document.addEventListener('DOMContentLoaded', () => 
{  
    const picked = document.querySelector('.cart-container');  

    // Retrieve productPicked from localStorage  
    const storedProducts = localStorage.getItem('productPicked');  
    const productPicked = storedProducts ? JSON.parse(storedProducts) : [];   

    picked.innerHTML = '';   

    productPicked.forEach(product => {  
        const totalPrice = product.price * product.sl; 
        const pickedHTML = `  
            <div class="cart-item"> 
            <div class="item-left"> 
                <input type="checkbox" class="item-checkbox" data-price="280000"> 
                <img class="product-img" src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-11.jpg" alt="Product 1"> 
                <div class="product-details"> 
                    <span>Áo Polo Cá Sấu Cotton MYO Thêu Hình Cáo</span> 
                </div> 
            </div> 
            <span class="category">Đen, L</span> 
            <span class="price" data-unit-price="280000">₫280.000</span> 
            <div class="quantity-control"> 
                <button class="decrease">-</button> 
                <input type="text" class="quantity" value="1" readonly> 
                <button class="increase">+</button> 
            </div> 
            <span class="total-price">₫280.000</span> 
            <div class="action"> 
                <button class="delete-btn">Xóa</button> 
                <a class="similar-product" data-product="Áo Polo Cá Sấu Cotton MYO Thêu Hình Cáo">Tìm sản phẩm tương tự</a> 
            </div> 
        </div>  
        `;  
        picked.insertAdjacentHTML('beforeend', pickedHTML);  
    });  
});

// Cập nhật giá trị tổng sản phẩm 
function updateTotalPrice() { 
    let totalPrice = 0; 
    let selectedItems = 0; 
    const checkboxes = document.querySelectorAll('.item-checkbox'); 
    checkboxes.forEach((checkbox) => { 
        if (checkbox.checked) { 
            const quantity = checkbox.closest('.cart-item').querySelector('.quantity').value; 
            const unitPrice = checkbox.closest('.cart-item').querySelector('.price').dataset.unitPrice; 
            const itemTotal = quantity * unitPrice; 
            totalPrice += itemTotal; 
            selectedItems += 1; 
        } 
    }); 
    document.querySelector('.total-price-footer').textContent = `${formatPrice(totalPrice)}`; 
    document.querySelector('.total-info span').textContent = `Tổng thanh toán (${selectedItems} Sản phẩm):`; 
}
// Tăng giảm số lượng sản phẩm 
const cartItems = document.querySelectorAll('.cart-item'); 
cartItems.forEach((item) => { 
    const decreaseButton = item.querySelector('.decrease'); 
    const increaseButton = item.querySelector('.increase'); 
    const quantityInput = item.querySelector('.quantity'); 
    const priceElement = item.querySelector('.total-price'); 
    const unitPrice = item.querySelector('.price').dataset.unitPrice; 

    decreaseButton.addEventListener('click', () => { 
        let quantity = parseInt(quantityInput.value); 
        if (quantity > 1) { 
            quantity--; 
            quantityInput.value = quantity; 
            priceElement.textContent = `₫${(quantity * unitPrice).toLocaleString('vi-VN')}`; 
            updateTotalPrice(); 
        } 
    }); 

    increaseButton.addEventListener('click', () => { 
        let quantity = parseInt(quantityInput.value); 
        quantity++; 
        quantityInput.value = quantity; 
        priceElement.textContent = `₫${(quantity * unitPrice).toLocaleString('vi-VN')}`; 
        updateTotalPrice(); 
    }); 
}); 

// Cập nhật tổng khi chọn sản phẩm 
const itemCheckboxes = document.querySelectorAll('.item-checkbox'); 
itemCheckboxes.forEach((checkbox) => { 
    checkbox.addEventListener('change', updateTotalPrice); 
}); 

// Chọn tất cả sản phẩm 
const selectAll = document.getElementById('select-all'); 
const selectAllFooter = document.getElementById('select-all-footer'); 

selectAll.addEventListener('change', () => { 
    const checkboxes = document.querySelectorAll('.item-checkbox'); 
    checkboxes.forEach((checkbox) => { 
        checkbox.checked = selectAll.checked; 
    }); 
    selectAllFooter.checked = selectAll.checked; 
    updateTotalPrice(); 
}); 

selectAllFooter.addEventListener('change', () => { 
    const checkboxes = document.querySelectorAll('.item-checkbox'); 
    checkboxes.forEach((checkbox) => { 
        checkbox.checked = selectAllFooter.checked; 
    }); 
    selectAll.checked = selectAllFooter.checked; 
    updateTotalPrice(); 
}); 
function displayProducts(productPicked) 
{  
    const productsContainer = document.getElementById('containProducts');  
    productsContainer.innerHTML = ''; // Xóa nội dung cũ trong giỏ hàng  
    productPicked.forEach(product => {  
        const totalPrice = product.price * product.sl;  
        const pickedHTML = `  
            <div class="cart-item">   
                <div class="item-left">   
                    <input type="checkbox" class="item-checkbox" data-price="${product.price}">   
                    <img class="product-img" src="${product.img}" alt="${product.name}">   
                    <div class="product-details">   
                        <span>${product.name}</span>   
                    </div>   
                </div>   
                <span class="category">${product.pb}</span>   
                <span class="price" data-unit-price="${product.price}">${formatPrice(product.price)}</span>   
                <div class="quantity-control">   
                    <button class="decrease" onclick="changeQuantity('${product.name}', -1)">-</button>   
                    <input type="text" class="quantity" value="${product.sl}" readonly>   
                    <button class="increase" onclick="changeQuantity('${product.name}', 1)">+</button>   
                </div>   
                <span class="total-price">${formatPrice(totalPrice)}</span>   
                <div class="action">   
                    <button class="delete-btn" onclick="deleteProduct('${product.name}')">Xóa</button>     
                </div>   
            </div>  
        `;  
        productsContainer.insertAdjacentHTML('beforeend', pickedHTML);  
    });  
}  