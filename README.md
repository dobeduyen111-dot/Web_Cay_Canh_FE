# Đồ án: Frontend Website Bán Cây Cảnh

Đây là mã nguồn giao diện (Frontend) cho dự án Website Bán Cây Cảnh. Dự án được xây dựng bằng thư viện ReactJS.

---

## 🛠 1. Yêu cầu hệ thống (Prerequisites)

Dự án này sử dụng ReactJS, do đó máy tính của bạn **bắt buộc phải cài đặt Node.js** (để làm môi trường chạy code) trước khi khởi chạy dự án.

Nếu máy bạn chưa có Node.js, vui lòng cài đặt theo 1 trong 2 cách sau:

* **Dành cho Windows / macOS:** Truy cập trang chủ [nodejs.org](https://nodejs.org/), tải phiên bản **LTS (Recommended For Most Users)** và cài đặt như phần mềm bình thường (Cứ nhấn Next cho đến khi Finish).
* **Dành cho Linux (Ubuntu):**
  Mở Terminal và chạy lần lượt 2 lệnh sau:

  `sudo apt update`
  
  `sudo apt install nodejs npm -y`

*(Để kiểm tra xem đã cài đặt thành công chưa, gõ lệnh `node -v` vào Terminal. Nếu hiện ra số phiên bản là OK).*

---

## 🚀 2. Hướng dẫn cài đặt và Khởi chạy

Sau khi đã đảm bảo máy tính có Node.js, bạn làm tuần tự các bước sau để chạy website:

**Bước 1: Cài đặt thư viện (Bắt buộc)**
Di chuyển vào thư mục gốc của dự án (`Web_Cay_Canh_FE`). Mở Terminal tại đây và chạy lệnh sau để tải toàn bộ thư viện lõi của React (sẽ tự động tạo ra thư mục `node_modules`):

`npm install`

*(Vui lòng đợi một lát để quá trình tải hoàn tất 100%).*

**Bước 2: Khởi chạy Server ảo**
Sau khi cài đặt xong thư viện, tiếp tục chạy lệnh:

`npm start`

**Bước 3: Xem kết quả**
Trình duyệt sẽ tự động mở trang web tại địa chỉ: **http://localhost:3000**

---

## 📚 3. Cấu trúc thư mục cơ bản

* `src/`: Chứa toàn bộ mã nguồn chính của Frontend (Components, Pages, Assets...).
* `public/`: Chứa các tài nguyên tĩnh như file `index.html`, favicon, logo.
* `package.json`: Chứa danh sách các thư viện phụ thuộc và các cấu hình chạy lệnh của dự án.
* `.gitignore`: Các file và thư mục (như `node_modules`) không được phép đẩy lên Git.

---

## 💡 4. Ghi chú thêm

* Dự án có tích hợp Tailwind CSS để hỗ trợ thiết kế giao diện nhanh chóng (xem cấu hình tại `tailwind.config.js`).
* Nếu bạn muốn kết nối với Backend API, vui lòng đảm bảo Backend đang được chạy song song ở một port khác và cấu hình lại đường dẫn gọi API trong mã nguồn nếu cần.