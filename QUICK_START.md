# 🚀 Hướng dẫn nhanh - Phòng Thí Nghiệm Hóa Học

## Truy cập

1. Chạy ứng dụng: `npm run dev`
2. Truy cập: `http://localhost:5173/chemistry-lab`
3. Hoặc click vào "Phòng thí nghiệm" trong menu sidebar

## 4 Tab chính

### 1. 🎮 Phòng thí nghiệm (Mặc định)

**Mục đích:** Học hóa học qua game

**Cách chơi:**
- Xem kho nguyên liệu bên trái (các hóa chất bạn có)
- Click vào thẻ phản ứng bên phải để thực hiện
- Phản ứng tiêu tốn nguyên liệu và cho sản phẩm + EXP
- Đạt 100 EXP để lên level và mở khóa nội dung mới

**Mẹo:**
- Bắt đầu với phản ứng "Phản ứng trung hòa" (HCl + NaOH)
- Theo dõi thanh EXP ở đầu trang
- Phản ứng màu xanh = đủ nguyên liệu, màu xám = thiếu

### 2. 🔬 Bảng tuần hoàn

**Mục đích:** Tìm hiểu về 118 nguyên tố

**Cách dùng:**
- Click vào bất kỳ nguyên tố nào
- Đọc thông tin chi tiết trong popup
- Xem cấu hình electron, tính chất, ứng dụng
- Đóng popup bằng nút X hoặc click bên ngoài

**Màu sắc:**
- Vàng: Phi kim
- Xanh dương: Khí hiếm
- Đỏ: Kim loại kiềm
- Cam: Kim loại kiềm thổ
- Xanh nhạt: Kim loại chuyển tiếp

### 3. ⚗️ Mô phỏng phản ứng

**2 chế độ:**

#### A. Phản ứng có sẵn
1. Chọn hóa chất từ lưới
2. Xem danh sách phản ứng có thể thực hiện
3. Click "Thực hiện" để xem animation

#### B. Tự cân bằng
1. Chọn chất tham gia (bên trái)
2. Chọn sản phẩm (bên phải)
3. Click "Cân bằng phương trình"
4. Xem kết quả với hệ số

**Ví dụ:** H₂O + HCl + NaOH → ?

### 4. 🔮 Mô hình phân tử

**Mục đích:** Xem cấu trúc 3D của phân tử

**Cách dùng:**
1. Chọn phân tử từ lưới (H₂O, CH₄, CO₂...)
2. Chọn chế độ hiển thị:
   - **Que - Bi**: Xem rõ liên kết
   - **Đặc**: Xem kích thước thật
   - **Khung**: Đơn giản hóa
   - **Bi**: Chỉ nguyên tử
3. Tương tác với mô hình:
   - Kéo chuột trái để xoay
   - Cuộn chuột để zoom
   - Kéo chuột phải để di chuyển

**Phân tử nên thử:**
- H₂O: Xem góc liên kết 104.5°
- CH₄: Xem cấu trúc tứ diện
- CO₂: Xem liên kết đôi

## Mục tiêu học tập

### Level 1-2: Cơ bản
- Hiểu phản ứng trung hòa
- Biết công thức hóa học cơ bản
- Tổng hợp nước từ H₂ + O₂

### Level 3-4: Trung cấp
- Phản ứng đốt cháy
- Kim loại đẩy kim loại
- Hiểu cấu trúc phân tử 3D

### Level 5+: Nâng cao
- Phản ứng tạo kết tủa
- Tổng hợp amoniac
- Cân bằng phương trình phức tạp

## Tính năng đặc biệt

### 🔓 Mở khóa
- Hóa chất mới khi hoàn thành phản ứng
- Phản ứng mới khi đạt level yêu cầu

### 🎯 Gamification
- Hệ thống EXP & Level
- Kho nguyên liệu giống RPG
- Chế tạo như Minecraft

### 🎨 Animation
- 🔥 Cháy (combustion)
- 💥 Nổ (explosion)
- 🌈 Đổi màu (color-change)
- ⬇️ Kết tủa (precipitation)
- 🌊 Trộn lẫn (mix)

## Troubleshooting

### Không thấy menu "Phòng thí nghiệm"?
- Đảm bảo đã đăng nhập
- Chọn chương trình Hóa học
- Refresh trang

### Mô hình 3D không hiển thị?
- Kiểm tra Three.js đã cài đặt: `npm install three`
- Refresh trang
- Thử chuyển chế độ hiển thị khác

### Phản ứng bị khóa?
- Kiểm tra level yêu cầu
- Hoàn thành phản ứng trước đó
- Thu thập đủ hóa chất cần thiết

### Không cân bằng được phương trình?
- Đảm bảo chọn đủ chất tham gia và sản phẩm
- Một số phương trình phức tạp có thể chưa hỗ trợ
- Thử phản ứng có sẵn trước

## Phím tắt

- `Esc`: Đóng popup/modal
- `Tab`: Chuyển giữa các phần tử
- `Enter`: Xác nhận hành động

## Liên hệ & Hỗ trợ

Nếu gặp vấn đề hoặc có đề xuất, vui lòng tạo issue trên GitHub hoặc liên hệ với team phát triển.

---

**Chúc bạn học tập vui vẻ! 🧪✨**
