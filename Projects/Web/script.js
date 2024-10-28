// Thay đổi trạng thái "active | disable" cho các <li>: 
// click -> active, remove active cho các <li> khác

const allSideMenu = document.querySelectorAll('#sidebar .side-menu li a');
allSideMenu.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', function(){
        // Tất cả <li> bị xóa khỏi lớp item-active
        allSideMenu.forEach(i=> {
            i.parentElement.classList.remove('item--active');
        })
        // Thêm lớp item-active  vào thẻ <li> cha 
        li.classList.add('item--active');
    })
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav #hidden-sidebar-btn');
const sideBar = document.getElementById('sidebar');

menuBar.addEventListener('click', function(){
    sideBar.classList.toggle('hide');
})