# CUSTOMER AND CART ARRAY

- Toàn bộ khách hàng(customer) được lưu trong customerArray. Trong đó mỗi customer là một Object
- Toàn bộ giỏ hàng(cart) của khách lưu trong cartArray. Trong đó, mỗi cart là một Object

## Về phía người dùng - User

- Tổng quan:
    > Trạng thái(status) của cart:  `0` | `1`
                            (   0 - available:      khách hàng chỉ mới thêm sản phẩm vào cart
                                1 - unavailable:    khách hàng nhấn mua và thanh toán, đẩy qua bên admin.
                            )
    > MỘT customer có thể có NHIỀU cart, chỉ có 1 cart `available`, còn lại thì  `unavailable`.
    > Mỗi cart sẽ có một customerId (username) tương ứng để biết cart này là của customer nào.

- Hoạt động: 
(!!! Chưa nghĩ ra giải pháp hợp lí khi người dùng chọn sản phẩm trong cart để thanh toán)
    + Ban đầu, khi user ấn thêm vào cart thì một cart mới được tạo, thêm vào cartArray
        và cart có status là `available`, user tiếp tục thêm sản phẩm vào cart
      Khi user nhấn mua thì thay status sang `unavailable`, coi như cart đó đã xong.
    + Khi người dùng tiếp tục quay lại, có các trường hợp:
        1. Có tồn tại cart `available` (cart còn sản phẩm chưa thanh toán) thì thêm sản phẩm mới vào cart đó.
        2. Tất cả cart đều `unavailable` thì tạo cart mới, thêm vào cartArray.