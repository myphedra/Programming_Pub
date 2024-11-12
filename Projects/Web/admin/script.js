// SIDEBAR 
// Thay đổi trạng thái "active | disable" cho các <li>: 
// click -> active, remove active cho các <li> khác
const allSideMenuItems = document.querySelectorAll('#sidebar .side-menu li a');
allSideMenuItems.forEach(item => {
    // Lưu lại <li> muốn show
    const li = item.parentElement;
    item.addEventListener('click', () => {
        // Tất cả <li> bị xóa class item--active khi 'click'
        allSideMenuItems.forEach(i => {
            i.parentElement.classList.remove('item--active');
        });
        // Thêm lớp item--active vào thẻ <li> cha, cái được 'click'
        li.classList.add('item--active');
    });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav #hidden-sidebar-btn');
const sideBar = document.getElementById('sidebar');

menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('hide');
});
/* END SIDEBAR */ 

/** HIỆN TỪNG MAIN-ITEM TƯƠNG ỨNG KHI ẤN VÀO THANH SIDEBAR 
 *  Ấn Dashboard hiện main__dashboard, ẩn các cái khác,...
 * */
// Func: ẩn toàn bộ các main-item
function hideAllMainItems() {
    // Duyệt qua toàn bộ main-item và gán style 'none'
    document.querySelectorAll('.main-item').forEach(item => {
        item.style.display = 'none';
    });
}

// Func: hiển thị cụ thể main-item được 'click' tương ứng tại sidebar
function showMainItem(itemId) {
    hideAllMainItems();
    document.getElementById(itemId).style.display = 'block';  // Hiển thị main-item theo id
}

// Đặt event 'click' cho phần main-item tương ứng tại sidebar
document.getElementById('sidebar__dashboard').onclick = () => showMainItem('main__dashboard');
document.getElementById('sidebar__products').onclick = () => showMainItem('main__products');
document.getElementById('sidebar__customers').onclick = () => showMainItem('main__customers');
document.getElementById('sidebar__orders').onclick = () => showMainItem('main__orders');
document.getElementById('sidebar__statistics').onclick = () => showMainItem('main__statistics');

// Hiển thị main__dashboard mặc định khi tải trang
showMainItem('main__dashboard');

/* MAIN__PRODUCTS */
// Hiển thị modal và tải thông tin sản phẩm vào modal để chỉnh sửa
let allProducts = [];
let filteredProducts = [];
const itemsPerPage = 8;
let currentPage = 1;

// Hàm đọc file và cập nhật bảng sản phẩm
async function loadProducts() {
    try {
        const response = await fetch('./Docs_ForJSProducts.txt');
        const data = await response.text();

        // Bỏ qua các dòng trước dòng chứa "######"
        const startIndex = data.indexOf('######');
        if (startIndex === -1) {
            throw new Error('Không tìm thấy dòng chứa "######" trong file.');
        }
        const productsData = data.substring(startIndex + 6).trim();

        // Tách các sản phẩm bằng dấu phân cách "----"
        const products = productsData.split('----').map(product => product.trim()).filter(product => product);

        // Lưu trữ sản phẩm vào biến toàn cục
        allProducts = products;

        // Cập nhật nextProductId dựa trên ID sản phẩm hiện có
        updateNextProductId();

        // Hiển thị trang đầu tiên
        filterProducts();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Cập nhật nextProductId dựa trên ID sản phẩm lớn nhất
let nextProductId = 1;
function updateNextProductId() {
    const ids = allProducts.map(product => {
        const lines = product.split('\n').map(line => line.trim()).filter(line => line);
        return parseInt(lines[0].replace('.', '').trim());
    });
    if (ids.length > 0) {
        nextProductId = Math.max(...ids) + 1;
    }
}

// Chức năng tìm kiếm sản phẩm
const searchInput = document.getElementById('product-name');
const brandFilter = document.getElementById('brand');
searchInput.addEventListener('input', filterProducts);
brandFilter.addEventListener('change', filterProducts);

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedBrand = brandFilter.value.toLowerCase().trim();

    // Lọc sản phẩm dựa trên tiêu chí tìm kiếm
    filteredProducts = allProducts.filter(product => {
        const lines = product.split('\n').map(line => line.trim()).filter(line => line);
        if (lines.length >= 5) {
            const name = lines[1].toLowerCase();
            const brand = lines[2].toLowerCase();

            const nameMatches = name.includes(searchTerm);
            const brandMatches = selectedBrand === 'all' || brand === selectedBrand;

            return nameMatches && brandMatches;
        }
        return false;
    });

    // Tạo phân trang cho sản phẩm đã lọc
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // Hiển thị trang đầu tiên của sản phẩm đã lọc
    currentPage = 1;
    displayPage(currentPage);

    // Tạo lại nút phân trang
    createPagination(totalPages);
}

// Hiển thị sản phẩm theo trang
function displayPage(page) {
    const tableBody = document.getElementById('product-table-body');
    tableBody.innerHTML = '';

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageProducts = filteredProducts.slice(start, end);

    pageProducts.forEach(product => {
        const lines = product.split('\n').map(line => line.trim()).filter(line => line);

        if (lines.length >= 5) {
            const id = lines[0].replace('.', '').trim();
            const name = lines[1];
            const brand = lines[2];
            const imagePath = lines[3];
            const price = lines[4];

            const row = document.createElement('tr');
            row.setAttribute('data-id', id);

            row.innerHTML = `
                <td>${id}</td>
                <td><img src="${imagePath}" alt="Sản phẩm"></td>
                <td>${name}</td>
                <td>${brand}</td>
                <td>${price}</td>
                <td>
                    <button class="delete-btn">Xóa</button>
                    <button class="change" onclick="showChangeProductBox('${id}')">Sửa</button>
                </td>
            `;

            tableBody.appendChild(row);
        }
    });

    updatePagination();
}

// Tạo nút phân trang
function createPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const prevButton = document.createElement('a');
    prevButton.href = "#";
    prevButton.innerHTML = "&laquo;";
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPage(currentPage);
            updatePagination();
        }
    });
    pagination.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('a');
        button.href = "#";
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            displayPage(currentPage);
            updatePagination();
        });
        if (i === currentPage) {
            button.classList.add('active');
        }
        pagination.appendChild(button);
    }

    const nextButton = document.createElement('a');
    nextButton.href = "#";
    nextButton.innerHTML = "&raquo;";
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayPage(currentPage);
            updatePagination();
        }
    });
    pagination.appendChild(nextButton);
}

function updatePagination() {
    const paginationLinks = document.querySelectorAll('#pagination a');
    paginationLinks.forEach(link => {
        link.classList.remove('active');
        if (parseInt(link.textContent) === currentPage) {
            link.classList.add('active');
        }
    });
}

// Thêm sự kiện khi trang được tải 
document.addEventListener('DOMContentLoaded', () => { 
    loadProducts(); 
    
    // Thêm sự kiện submit cho form thêm sản phẩm 
    const addProductForm = document.getElementById('add-product-form'); 
    if (addProductForm) { 
        addProductForm.addEventListener('submit', addNewProduct); 
    } 
});
function addNewProduct(e) {
    e.preventDefault();

    const productName = document.getElementById('new-product-name').value.trim();
    const brand = document.getElementById('new-brand').value.trim();
    const price = document.getElementById('price').value.trim();
    const imageInput = document.getElementById('image-upload');
    let imageUrl = '';

    if (imageInput.files && imageInput.files[0]) {
        imageUrl = URL.createObjectURL(imageInput.files[0]);
    } else {
        imageUrl = 'default-image.png'; // Đường dẫn đến ảnh mặc định nếu không chọn ảnh
    }

    // Tạo sản phẩm mới
    const newProductData = `
        ${nextProductId}.
        ${productName}
        ${brand}
        ${imageUrl}
        ${price}
    `.trim();

    allProducts.push(newProductData);

    // Cập nhật nextProductId
    nextProductId++;

    // Đặt lại form và các bộ lọc
    addProductForm.reset();
    searchInput.value = '';
    brandFilter.value = 'all';

    filterProducts();

    // Hiển thị thông báo thành công
    alert('Sản phẩm đã được thêm thành công!');
}

// Xóa sản phẩm
document.getElementById('product-table-body').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const row = event.target.closest('tr');
        const productId = row.getAttribute('data-id');
        console.log('Product ID to delete:', productId);
        if (confirm('Bạn có muốn xóa sản phẩm này không?')) {
            // Xóa sản phẩm khỏi dữ liệu
            allProducts = allProducts.filter(product => {
                const lines = product.split('\n').map(line => line.trim()).filter(line => line);
                return lines[0].replace('.', '').trim() !== productId;
            });
            console.log('Updated allProducts:', allProducts);

            // Cập nhật lại danh sách sản phẩm
            filterProducts();

            alert('Sản phẩm đã được xóa thành công!');
        }
    }
});

// Hiển thị modal chỉnh sửa sản phẩm
function showChangeProductBox(productId) {
    // Hiển thị modal
    document.getElementById('modal1').style.display = 'flex';

    // Lấy thông tin sản phẩm
    const productData = allProducts.find(product => {
        const lines = product.split('\n').map(line => line.trim()).filter(line => line);
        return lines[0].replace('.', '').trim() === productId;
    });

    const lines = productData.split('\n').map(line => line.trim()).filter(line => line);

    const productName = lines[1];
    const brand = lines[2];
    const imageUrl = lines[3];
    const price = lines[4];

    // Điền thông tin vào modal
    document.getElementById('edit-name').value = productName;
    document.getElementById('edit-price').value = price;
    document.getElementById('imgbefore').src = imageUrl;
    document.getElementById('imgafter').src = imageUrl;

    // Cập nhật sự kiện lưu
    const saveButton = document.getElementById('save');
    saveButton.onclick = () => saveProductChanges(productId);
}

// Lưu thay đổi sản phẩm
async function saveProductChanges(productId) {
    const updatedName = document.getElementById('edit-name').value.trim();
    const updatedPrice = document.getElementById('edit-price').value.trim();
    const updatedImageInput = document.getElementById('edit-image-upload');
    let updatedImage = document.getElementById('imgafter').src;

    if (updatedImageInput.files && updatedImageInput.files[0]) {
        updatedImage = URL.createObjectURL(updatedImageInput.files[0]);
    }

    // Cập nhật thông tin sản phẩm trong dữ liệu
    allProducts = allProducts.map(product => {
        const lines = product.split('\n').map(line => line.trim()).filter(line => line);
        if (lines[0].replace('.', '').trim() === productId) {
            return `
${productId}.
${updatedName}
${lines[2]} // Giữ nguyên thương hiệu
${updatedImage}
${updatedPrice}
            `.trim();
        }
        return product;
    });

    // Ghi lại dữ liệu vào file
    await saveProductsToFile();

    filterProducts();

    // Đóng modal
    closeChangeBox();

    // Hiển thị thông báo thành công
    alert('Sản phẩm đã được chỉnh sửa thành công!');
}

// Ghi dữ liệu sản phẩm vào file
async function saveProductsToFile() {
    const productsData = allProducts.join('\n----\n');
    const fileContent = `######\n${productsData}`;
    try {
        await fetch('./Docs_ForJSProducts.txt', {
            method: 'PUT',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: fileContent
        });
    } catch (error) {
        console.error('Error saving products:', error);
    }
}

// Đóng modal
function closeChangeBox() {
    document.getElementById('modal1').style.display = 'none';
}

// Cập nhật hình ảnh xem trước khi chọn ảnh mới
function changeImagePreview(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imgafter').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}