# Chemistry Learning App

## 🚀 Quick Start

Để chạy ứng dụng, chỉ cần một lệnh:

```bash
npm run dev
```

Lệnh này sẽ:
- ✅ Khởi động backend server (port 5000)
- ✅ Khởi động frontend client (port 3000 hoặc port khả dụng tiếp theo)
- ✅ Tự động kết nối MongoDB
- ✅ Thiết lập proxy để tránh CORS issues

## 📋 Scripts khả dụng

- `npm run dev` - Chạy cả frontend và backend
- `npm run client:dev` - Chỉ chạy frontend (Vite)
- `npm run server:dev` - Chỉ chạy backend (với nodemon)
- `npm run seed` - Tạo dữ liệu mẫu cho database
- `npm run setup` - Cài đặt dependencies và seed database
- `npm run build` - Build production
- `npm run lint` - Kiểm tra code style

## 🔧 Thiết lập lần đầu

1. Clone project
2. Chạy `npm run setup` (hoặc `npm install` rồi `npm run seed`)
3. Chạy `npm run dev`
4. Mở browser tại địa chỉ được hiển thị (thường là http://localhost:3001)

## 🌐 URLs

- Frontend: http://localhost:3001 (hoặc port khả dụng)
- Backend API: http://localhost:5000/api
- Health check: http://localhost:5000/api/health

## 🔒 Environment Variables

Tạo file `.env` với các biến:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
PORT=5000
```

## 🏗️ Architecture

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Express.js + MongoDB + Mongoose
- **Auth**: JWT tokens
- **Deployment**: Optimized for single command development