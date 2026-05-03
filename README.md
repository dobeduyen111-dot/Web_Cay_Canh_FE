# CayCanhMNM Frontend

Frontend cho hệ thống bán cây cảnh `CayCanhMNM`, gồm:

- Website người dùng: xem sản phẩm, tìm kiếm, giỏ hàng, wishlist, checkout, theo dõi đơn hàng.
- Khu vực quản trị: dashboard, đơn hàng, sản phẩm, khách hàng, phân tích, cấu hình.

Project đang dùng React + React Router + Redux Toolkit + Tailwind CSS và giao tiếp với backend qua cookie session `HttpOnly`.

## 1. Công nghệ sử dụng

- React `19`
- React Router DOM `7`
- Redux Toolkit + React Redux
- Axios
- React Toastify
- Tailwind CSS
- Create React App / `react-scripts`

## 2. Chức năng chính

### Website người dùng

- Trang chủ giới thiệu và hiển thị sản phẩm nổi bật.
- Danh sách sản phẩm toàn bộ và theo danh mục:
  - Cây cảnh
  - Chậu cây
  - Phụ kiện
- Chi tiết sản phẩm.
- Tìm kiếm sản phẩm và gợi ý tìm kiếm ở header.
- Đăng ký, đăng nhập, đăng xuất.
- Quên mật khẩu, đặt lại mật khẩu.
- Đăng nhập Google qua OAuth2.
- Quản lý thông tin cá nhân, đổi mật khẩu.
- Giỏ hàng, wishlist.
- Checkout với:
  - `COD`
  - `VNPAY`
- Lịch sử đơn hàng, chi tiết đơn hàng.
- Trang hướng dẫn, liên hệ, giới thiệu, xử lý trả kết quả thanh toán VNPay.

### Khu vực admin

- Đăng nhập admin.
- Kiểm tra session trước khi vào trang quản trị.
- Dashboard thống kê.
- Quản lý đơn hàng.
- Quản lý sản phẩm.
- Quản lý khách hàng.
- Trang phân tích.
- Trang cài đặt.
- Trang trợ giúp.

## 3. Cấu trúc thư mục

```text
frontend/
|-- public/                 # static assets
|-- src/
|   |-- admin/              # giao diện quản trị
|   |   |-- components/
|   |   |-- constants/
|   |   |-- pages/
|   |   `-- services/
|   |-- api/                # client gọi API phía storefront
|   |-- components/         # header, footer, shared UI
|   |-- pages/              # các trang phía người dùng
|   |-- redux/              # store và auth slice
|   `-- utils/              # event, auth helper, error mapping
|-- API.md                  # tài liệu backend tổng hợp
|-- ErrorCode.md            # mapping mã lỗi
|-- package.json
`-- README.md
```

## 4. Routing chính

### Public / storefront

- `/`
- `/product`
- `/product/cay`
- `/product/chau`
- `/product/phukien`
- `/product/:id`
- `/product/search`
- `/instruction`
- `/cart`
- `/wishlist`
- `/checkout`
- `/payment/vnpay-return`
- `/order/success`
- `/order/history`
- `/order/confirm/:orderId`
- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`
- `/profile`
- `/change-password`
- `/contact`
- `/about`
- `/403`

### Admin

- `/admin/login`
- `/admin/dashboard`
- `/admin/orders`
- `/admin/products`
- `/admin/customers`
- `/admin/analysis`
- `/admin/settings`
- `/admin/help`

## 5. Yêu cầu môi trường

- Node.js `>= 18`
- npm `>= 9`
- Backend API đang chạy tại `http://localhost:8080`

Lưu ý:

- Frontend mặc định gọi API qua `http://localhost:8080/api`.
- App dùng `withCredentials: true`, nên backend phải bật CORS và cookie/session đúng domain.
- Luồng Google OAuth và VNPay phụ thuộc cấu hình backend.

## 6. Cài đặt

```bash
npm install
```

## 7. Biến môi trường

Project hiện chỉ đọc biến môi trường:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

Biến này được dùng cho:

- Storefront API client
- Admin API client
- Tính origin cho nút đăng nhập Google

### Tạo file `.env`

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

Nếu không khai báo, code đang fallback về đúng giá trị trên.

## 8. Chạy project

### Development

```bash
npm start
```

App mặc định chạy tại:

```text
http://localhost:3000
```

### Production build

```bash
npm run build
```

### Test

```bash
npm test
```

## 9. Cách frontend kết nối backend

Base URL mặc định:

```text
http://localhost:8080/api
```

Frontend đang có 2 lớp API chính:

- `src/api/*`: cho website người dùng
- `src/admin/services/api.js`: cho khu vực admin

Một số điểm quan trọng:

- Axios đang bật `withCredentials: true`.
- Session đăng nhập được quản lý chủ yếu bằng cookie `HttpOnly` từ backend.
- Khi nhận `401`, frontend sẽ xoá state auth local và yêu cầu đăng nhập lại.
- Admin cũng kiểm tra session qua endpoint `getMe()/verifySession()`.

## 10. Các tích hợp đặc biệt

### Google OAuth

Nút đăng nhập Google redirect người dùng tới:

```text
{API_ORIGIN}/oauth2/authorization/google
```

Trong đó `API_ORIGIN` được suy ra từ `REACT_APP_API_BASE_URL`.

Ví dụ:

- `REACT_APP_API_BASE_URL=http://localhost:8080/api`
- OAuth redirect sẽ đi đến `http://localhost:8080/oauth2/authorization/google`

### VNPay

Luồng thanh toán VNPay hiện tại:

1. Checkout tạo đơn hàng.
2. Frontend gọi endpoint tạo link thanh toán.
3. Mở popup VNPay hoặc fallback cùng tab nếu popup bị chặn.
4. Nhận kết quả tại route `/payment/vnpay-return`.

## 11. Tài liệu tham khảo trong repo

- `API.md`: mô tả endpoint backend, auth, lỗi, OAuth, VNPay.
- `ErrorCode.md`: danh sách mã lỗi và diễn giải.

Nếu backend thay đổi endpoint hoặc format lỗi, nên cập nhật đồng thời:

- `src/api/*`
- `src/admin/services/api.js`
- `API.md`
- `ErrorCode.md`

## 12. Ghi chú triển khai

- Hiện trong source còn hard-code fallback `http://localhost:8080/api` ở nhiều nơi.
- Nếu deploy staging/production, nên set `REACT_APP_API_BASE_URL` rõ ràng.
- Vì app dùng cookie auth, cần kiểm tra kỹ:
  - CORS
  - `SameSite`
  - `Secure`
  - domain cookie
- Route admin và storefront đang nằm chung một frontend app.

## 13. Scripts có sẵn

```json
{
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

## 14. Đề xuất quy trình local

1. Chạy backend tại `http://localhost:8080`.
2. Tạo file `.env` với `REACT_APP_API_BASE_URL=http://localhost:8080/api`.
3. Cài dependency bằng `npm install`.
4. Chạy frontend bằng `npm start`.
5. Truy cập:
   - Storefront: `http://localhost:3000`
   - Admin: `http://localhost:3000/admin/login`

## 15. Trạng thái hiện tại của README

README này được viết lại dựa trên code frontend hiện có trong repo tại thời điểm hiện tại, không còn dùng nội dung mặc định của Create React App.
