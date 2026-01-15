# 🧪 Phòng Thí Nghiệm Hóa Học Tương Tác

## Tổng quan

Hệ thống Phòng Thí Nghiệm Hóa Học Tương Tác là một nền tảng học tập hóa học với nhiều tính năng mô phỏng và gamification, giúp học sinh hiểu sâu hơn về hóa học thông qua trải nghiệm tương tác.

## Tính năng chính

### 1. 🎮 Phòng Thí Nghiệm Game (Chemistry Lab Game)

Hệ thống gamification hoàn chỉnh với:

- **Hệ thống Level & EXP**: Người chơi nâng cấp qua việc hoàn thành phản ứng
- **Kho nguyên liệu (Inventory)**: Thu thập và quản lý các hóa chất
- **Bảng chế tạo (Crafting)**: Kết hợp hóa chất để tạo ra sản phẩm mới
- **Hệ thống mở khóa**: Phản ứng và hóa chất mới được mở khóa khi đạt level

**Cách chơi:**
1. Bắt đầu với một số hóa chất cơ bản
2. Thực hiện phản ứng để tạo ra hóa chất mới và nhận EXP
3. Nâng level để mở khóa phản ứng và hóa chất phức tạp hơn
4. Thu thập đầy đủ các hóa chất trong game

### 2. 🔬 Bảng Tuần Hoàn Tương Tác

Bảng tuần hoàn các nguyên tố hóa học với thông tin chi tiết:

- **Hiển thị đầy đủ**: 118 nguyên tố với màu sắc phân loại
- **Thông tin chi tiết** khi click vào nguyên tố:
  - Cấu hình electron
  - Độ âm điện
  - Nhiệt độ nóng chảy/sôi
  - Ứng dụng thực tế
  - Lịch sử phát hiện
  - Sự thật thú vị
  - Video/Hình ảnh minh họa

**Cách sử dụng:**
- Click vào bất kỳ nguyên tố nào để xem thông tin chi tiết
- Sử dụng chú thích màu sắc để phân biệt các nhóm nguyên tố

### 3. ⚗️ Mô Phỏng Phản Ứng Hóa Học

Hai chế độ mô phỏng:

#### Chế độ 1: Phản ứng có sẵn
- Chọn các hóa chất từ danh sách
- Hệ thống tự động gợi ý các phản ứng có thể thực hiện
- Xem animation phản ứng với hiệu ứng đặc biệt
- Hiển thị thông tin về năng lượng, điều kiện phản ứng

#### Chế độ 2: Tự cân bằng phương trình
- Chọn chất tham gia (reactants)
- Chọn sản phẩm (products)
- Hệ thống tự động tính toán hệ số cân bằng
- Hiển thị phương trình đã cân bằng

**Các loại phản ứng:**
- Phản ứng trung hòa
- Phản ứng đốt cháy
- Phản ứng thế
- Phản ứng tổng hợp
- Phản ứng tạo kết tủa

### 4. 🔮 Mô Hình Phân Tử 3D

Hiển thị cấu trúc 3D của các phân tử hóa học:

**Các chế độ hiển thị:**
- **Ball & Stick (Que - Bi)**: Hiển thị nguyên tử và liên kết rõ ràng
- **Space-Filling (Đặc)**: Hiển thị kích thước thực tế của nguyên tử
- **Wireframe (Khung)**: Hiển thị cấu trúc khung đơn giản
- **Ball (Bi)**: Chỉ hiển thị nguyên tử

**Tương tác:**
- Xoay mô hình: Kéo chuột trái
- Zoom: Cuộn chuột
- Di chuyển: Kéo chuột phải

**Màu sắc nguyên tố:**
- Theo chuẩn CPK (Corey-Pauling-Koltun)
- Mỗi nguyên tố có màu đặc trưng riêng

## Cấu trúc File

```
src/
├── components/
│   ├── PeriodicTable.jsx          # Bảng tuần hoàn tương tác
│   ├── ChemicalReactionSimulator.jsx  # Mô phỏng phản ứng
│   ├── MolecularViewer.jsx        # Hiển thị mô hình 3D
│   └── ChemistryLabGame.jsx       # Game phòng thí nghiệm
├── data/
│   ├── chemicalsData.js           # Dữ liệu hóa chất & phản ứng
│   └── elementsData.js            # Dữ liệu bảng tuần hoàn
├── utils/
│   └── chemistryCalculations.js   # Công cụ tính toán hóa học
└── pages/
    └── ChemistryLab.jsx           # Trang chính
```

## Công nghệ sử dụng

- **React**: Framework UI
- **Three.js**: Render 3D
- **Tailwind CSS**: Styling
- **React Router**: Routing

## Hướng dẫn phát triển thêm

### Thêm hóa chất mới

Chỉnh sửa file [src/data/chemicalsData.js](src/data/chemicalsData.js):

```javascript
{
  id: 'NEW_CHEM',
  name: 'Tên hóa chất',
  formula: 'Công thức',
  type: 'loại',
  state: 'trạng thái',
  color: 'màu',
  molarMass: 0,
  description: 'Mô tả',
  elements: [
    { symbol: 'H', count: 2 }
  ],
  structure: {
    atoms: [
      { element: 'H', x: 0, y: 0, z: 0 }
    ],
    bonds: [
      { from: 0, to: 1, type: 'single' }
    ]
  }
}
```

### Thêm phản ứng mới

```javascript
{
  id: 'reaction_id',
  name: 'Tên phản ứng',
  type: 'loại',
  reactants: ['CHEM1', 'CHEM2'],
  products: ['CHEM3', 'CHEM4'],
  equation: 'Phương trình',
  balancedCoefficients: [1, 1, 1, 1],
  description: 'Mô tả',
  energy: -100,
  conditions: 'Điều kiện',
  animation: 'loại animation'
}
```

### Thêm nguyên tố mới

Chỉnh sửa file [src/data/elementsData.js](src/data/elementsData.js):

```javascript
{
  number: 1,
  symbol: 'H',
  name: 'Hydro',
  atomicMass: 1.008,
  category: 'nonmetal',
  group: 1,
  period: 1,
  electronConfig: '1s¹',
  // ... thêm các thuộc tính khác
}
```

## Truy cập

Truy cập phòng thí nghiệm tại: `http://localhost:5173/chemistry-lab`

## Tính năng sắp tới

- [ ] Thêm nhiều phản ứng hóa học
- [ ] Mở rộng thư viện mô hình 3D
- [ ] Thêm quiz tương tác
- [ ] Hệ thống thành tựu (achievements)
- [ ] Bảng xếp hạng
- [ ] Chế độ multiplayer
- [ ] Video hướng dẫn cho mỗi phản ứng
- [ ] AR/VR support
- [ ] Export/Import tiến trình game

## Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng tạo pull request hoặc mở issue để thảo luận.

## License

MIT License
