// Thay đổi trạng thái "active | disable" cho các <li>: 
// click -> active, remove active cho các <li> khác
const allSideMenu = document.querySelectorAll('#sidebar .side-menu li a');
allSideMenu.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', function(){
        // Tất cả <li> bị xóa khỏi lớp item--active
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('item--active');
        })
        // Thêm lớp item--active vào thẻ <li> cha 
        li.classList.add('item--active');
    });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav #hidden-sidebar-btn');
const sideBar = document.getElementById('sidebar');

menuBar.addEventListener('click', function() {
    sideBar.classList.toggle('hide');
});

// Hiển thị modal và tải thông tin sản phẩm vào modal để chỉnh sửa
function showChangeProductBox(productId) {
    // Hiển thị modal
    document.getElementById("modal1").style.display = "flex";

    // Lấy thông tin sản phẩm từ bảng
    const row = document.querySelector(`.product-table tbody tr[data-id='${productId}']`);
    const productName = row.querySelector('td:nth-child(3)').textContent;
    const price = row.querySelector('td:nth-child(5)').textContent.replace(/[^0-9.]/g, ''); // Loại bỏ ký tự không phải số và dấu chấm
    const imageUrl = row.querySelector('td:nth-child(2) img').src;

    // Tải thông tin sản phẩm vào modal
    document.getElementById('name').value = productName;
    document.getElementById('price').value = price; // Hiển thị giá
    document.getElementById('imgbefore').src = imageUrl;

    // Cập nhật sự kiện lưu sản phẩm
    document.getElementById('save').onclick = function() {
        saveProductChanges(productId);
    };
}


// Lưu thay đổi sản phẩm
function saveProductChanges(productId) {
    const row = document.querySelector(`.product-table tbody tr[data-id='${productId}']`);
    const updatedName = document.getElementById('name').value;
    let updatedPrice = document.getElementById('price').value;
    const updatedImage = document.getElementById('imgafter').src;

    // Định dạng giá
    updatedPrice = formatCurrency(updatedPrice);

    // Cập nhật thông tin sản phẩm trong bảng
    row.querySelector('td:nth-child(3)').textContent = updatedName;
    row.querySelector('td:nth-child(5)').textContent = updatedPrice;
    row.querySelector('td:nth-child(2) img').src = updatedImage;

    // Đóng modal
    closeChangeBox();

    // Hiển thị thông báo thành công (nếu cần)
    alert('Sản phẩm đã được chỉnh sửa thành công!');
}


// Định dạng giá
function formatCurrency(value) {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VND';
}

// Sự kiện để ẩn modal
function closeChangeBox() {
    document.getElementById("modal1").style.display = "none";
}

// Cập nhật hình ảnh xem trước khi chọn ảnh mới
function changeImagePreview(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("imgafter").src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

// Thêm sản phẩm vào danh sách sản phẩm
let nextProductId = 10045; // Đảm bảo biến này đã được khởi tạo
document.querySelector('.add-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Ngăn form submit mặc định

    // Lấy giá trị từ các trường đầu vào
    const productName = document.getElementById('new-product-name').value;
    const brand = document.getElementById('new-brand').value;
    let price = document.getElementById('price').value;
    const imageUpload = document.getElementById('image-upload').files[0];

    // Kiểm tra dữ liệu nhập vào
    if (!productName || !brand || !price || !imageUpload) {
        alert('Vui lòng điền đầy đủ thông tin sản phẩm!');
        return;
    }

    // Định dạng giá
    price = formatCurrency(price);

    // Tạo một URL cho ảnh tải lên
    const imageUrl = URL.createObjectURL(imageUpload);

    // Tạo một hàng mới cho bảng sản phẩm
    const newRow = document.createElement('tr');

    newRow.setAttribute('data-id', nextProductId);
    newRow.innerHTML = `
        <td>${nextProductId}</td>
        <td><img src="${imageUrl}" alt="Sản phẩm"></td>
        <td>${productName}</td>
        <td>${brand}</td>
        <td>${price}</td>
        <td>
            <button class="delete-btn">Xóa</button>
            <button class="change" onclick="showChangeProductBox('${nextProductId}')">Sửa</button>
        </td>
    `;

    // Thêm hàng mới vào bảng sản phẩm
    document.querySelector('.product-table tbody').appendChild(newRow);

    // Tăng ID sản phẩm cho lần tiếp theo
    nextProductId++;

    // Xóa dữ liệu trong các trường đầu vào sau khi thêm sản phẩm
    document.getElementById('new-product-name').value = '';
    document.getElementById('new-brand').value = '';
    document.getElementById('price').value = '';
    document.getElementById('image-upload').value = '';

    // Hiển thị thông báo thành công (nếu cần)
    alert('Sản phẩm đã được thêm thành công!');
});

// Xóa sản phẩm khỏi danh sách
document.querySelector('.product-table').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const row = event.target.closest('tr');
        if (confirm('Bạn có muốn xóa sản phẩm này không?')) {
            // Xóa hàng
            row.remove();

            // Hiển thị thông báo thành công (nếu cần)
            alert('Sản phẩm đã được xóa thành công!');
        }
    }
});

// Chức năng tìm kiếm sản phẩm
const searchInput = document.getElementById('product-name');
const brandFilter = document.getElementById('brand');
searchInput.addEventListener('input', filterProducts);
brandFilter.addEventListener('change', filterProducts);

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedBrand = brandFilter.value.toLowerCase();
    const productRows = document.querySelectorAll('.product-table tbody tr');
    
    productRows.forEach(row => {
        const productName = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        const productBrand = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
        
        // Kiểm tra tên sản phẩm và thương hiệu
        const nameMatches = productName.includes(searchTerm);
        const brandMatches = selectedBrand === 'all' || productBrand === selectedBrand;
        
        // Hiển thị hoặc ẩn sản phẩm dựa trên tiêu chí lọc
        if (nameMatches && brandMatches) {
            row.style.display = ''; // Hiển thị hàng sản phẩm
        } else {
            row.style.display = 'none'; // Ẩn hàng sản phẩm
        }
    });
}
