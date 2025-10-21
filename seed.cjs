const mongoose = require('mongoose');
const Lesson = require('./models/Lesson.cjs');
require('dotenv').config();

// Dữ liệu bài học Hóa học lớp 8 - Chương 1: Chất - Nguyên tử - Phân tử
const lessons = [
  {
    classId: 8,
    chapterId: 1,
    lessonId: 1,
    title: 'Bài 1: Mở đầu môn Hoá học',
    description: 'Giới thiệu về môn Hoá học, tầm quan trọng và ứng dụng trong đời sống',
    level: 'Beginner',
    order: 1,
    theory: `
      <h2>🧪 Chào mừng đến với thế giới Hóa học!</h2>
      <p><strong>Hóa học</strong> là khoa học nghiên cứu về chất, cấu tạo, tính chất và sự biến đổi của chúng.</p>
      
      <h3>🌟 Tại sao học Hóa học?</h3>
      <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 15px 0;">
        <h4>🔬 Hiểu thế giới xung quanh</h4>
        <p>• Tại sao nước lại sôi ở 100°C?</p>
        <p>• Vì sao sắt bị gỉ?</p>
        <p>• Làm thế nào để chế tạo thuốc?</p>
      </div>
      
      <div style="background: #dcfce7; padding: 15px; border-left: 4px solid #16a34a; margin: 15px 0;">
        <h4>🏭 Ứng dụng trong đời sống</h4>
        <p>• <strong>Y học:</strong> Chế tạo thuốc chữa bệnh</p>
        <p>• <strong>Nông nghiệp:</strong> Phân bón, thuốc trừ sâu</p>
        <p>• <strong>Công nghiệp:</strong> Chế tạo vật liệu mới</p>
        <p>• <strong>Môi trường:</strong> Xử lý ô nhiễm</p>
      </div>

      <h3>🎯 Phương pháp học Hóa học hiệu quả</h3>
      <ul>
        <li>📚 <strong>Học lý thuyết:</strong> Hiểu khái niệm cơ bản</li>
        <li>🧪 <strong>Thực hành:</strong> Làm thí nghiệm quan sát</li>
        <li>💪 <strong>Luyện tập:</strong> Giải bài tập thường xuyên</li>
        <li>🔗 <strong>Liên hệ thực tế:</strong> Tìm hiểu ứng dụng</li>
      </ul>

      <h3>⚠️ An toàn trong phòng thí nghiệm</h3>
      <div style="background: #fef2f2; padding: 15px; border-left: 4px solid #dc2626; margin: 15px 0;">
        <p>• Luôn đeo kính bảo hộ và áo blouse</p>
        <p>• Không được nếm thử hóa chất</p>
        <p>• Rửa tay sau khi làm thí nghiệm</p>
        <p>• Báo cáo ngay khi có sự cố</p>
      </div>
    `,
    game: {
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Hóa học là khoa học nghiên cứu về điều gì?',
          options: ['Chỉ nghiên cứu về nước', 'Chất, cấu tạo và tính chất của chúng', 'Chỉ nghiên cứu về kim loại', 'Chỉ nghiên cứu về không khí'],
          correctAnswer: 1,
          explanation: '✅ Hóa học nghiên cứu về chất, cấu tạo, tính chất và sự biến đổi của chúng.',
          points: 10
        },
        {
          type: 'matching',
          question: '🔗 Nối cặp: Ghép lĩnh vực với ứng dụng hóa học',
          pairs: [
            { left: 'Y học', right: 'Chế tạo thuốc chữa bệnh' },
            { left: 'Nông nghiệp', right: 'Sản xuất phân bón' },
            { left: 'Công nghiệp', right: 'Chế tạo vật liệu mới' },
            { left: 'Môi trường', right: 'Xử lý ô nhiễm' }
          ],
          explanation: '✅ Tuyệt vời! Hóa học có ứng dụng rộng rãi trong mọi lĩnh vực.',
          points: 20
        },
        {
          type: 'true-false',
          question: 'Trong phòng thí nghiệm, chúng ta có thể nếm thử hóa chất để biết vị.',
          correctAnswer: false,
          explanation: '❌ Tuyệt đối không được nếm thử hóa chất vì có thể độc hại!',
          points: 15
        }
      ]
    }
  },

  {
    classId: 8,
    chapterId: 1,
    lessonId: 2,
    title: 'Bài 2: Chất',
    description: 'Tìm hiểu về chất, phân biệt chất tinh khiết và hỗn hợp, tính chất vật lý và hóa học',
    level: 'Beginner',
    order: 2,
    theory: `
      <h2>Thế nào là chất?</h2>
      <p><strong>Chất</strong> là những gì cấu tạo nên các vật thể xung quanh chúng ta.</p>
      <p><em>Ví dụ:</em> Nước, muối ăn, sắt, nhôm, đường, không khí...</p>
      
      <h3>Phân loại chất</h3>
      <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 15px 0;">
        <h4>Chất tinh khiết</h4>
        <p>Là chất chỉ gồm một loại chất duy nhất.</p>
        <p><strong>Ví dụ:</strong> Nước cất, muối ăn nguyên chất, vàng 24k</p>
      </div>
      
      <div style="background: #fef3c7; padding: 15px; border-left: 4px solid #d97706; margin: 15px 0;">
        <h4>Hỗn hợp</h4>
        <p>Là chất gồm hai hay nhiều chất tinh khiết trộn lẫn với nhau.</p>
        <p><strong>Ví dụ:</strong> Không khí, nước biển, nước đường, đất</p>
      </div>

      <h3>Tính chất của chất</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #e5e7eb;">
          <th style="border: 1px solid #9ca3af; padding: 10px;">Tính chất vật lý</th>
          <th style="border: 1px solid #9ca3af; padding: 10px;">Tính chất hóa học</th>
        </tr>
        <tr>
          <td style="border: 1px solid #9ca3af; padding: 10px;">
            • Màu sắc, mùi vị<br>
            • Trạng thái (rắn, lỏng, khí)<br>
            • Nhiệt độ nóng chảy, sôi<br>
            • Tính dẫn điện, dẫn nhiệt
          </td>
          <td style="border: 1px solid #9ca3af; padding: 10px;">
            • Khả năng tham gia phản ứng<br>
            • Tính oxi hóa, khử<br>
            • Tính axit, bazơ<br>
            • Khả năng cháy
          </td>
        </tr>
      </table>
    `,
    game: {
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Chất nào sau đây là chất tinh khiết?',
          options: ['Nước cất', 'Nước biển', 'Không khí', 'Đất'],
          correctAnswer: 0,
          explanation: '✅ Nước cất là chất tinh khiết vì chỉ chứa H₂O. Các chất khác đều là hỗn hợp của nhiều chất.',
          points: 10
        },
        {
          type: 'true-false',
          question: ' "Màu sắc của chất là tính chất hóa học"',
          correctAnswer: false,
          explanation: '❌ Sai! Màu sắc là tính chất vật lý vì có thể quan sát được mà không làm thay đổi bản chất của chất.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: '🔬 Hỗn hợp là chất gồm bao nhiêu chất tinh khiết?',
          options: ['Một chất duy nhất', 'Hai hay nhiều chất', 'Không có chất nào', 'Chỉ có chất lỏng'],
          correctAnswer: 1,
          explanation: '✅ Đúng rồi! Hỗn hợp gồm hai hay nhiều chất tinh khiết trộn lẫn với nhau.',
          points: 15
        },
        {
          type: 'matching',
          question: '🔗 Nối cặp: Ghép loại chất với ví dụ tương ứng',
          pairs: [
            { left: 'Chất tinh khiết', right: 'Nước cất' },
            { left: 'Hỗn hợp đồng nhất', right: 'Nước đường' },
            { left: 'Hỗn hợp không đồng nhất', right: 'Nước đất' },
            { left: 'Tính chất vật lý', right: 'Màu sắc' }
          ],
          explanation: '✅ Tuyệt vời! Bạn đã nối đúng tất cả các cặp!',
          points: 20
        },
        {
          type: 'ordering',
          question: '📊 Sắp xếp: Sắp xếp các bước phân loại chất theo thứ tự đúng',
          options: [
            'Xác định chất cần phân loại',
            'Quan sát và phân tích thành phần',
            'Xác định số loại chất trong mẫu',
            'Kết luận: Chất tinh khiết hay hỗn hợp'
          ],
          correctOrder: [
            'Xác định chất cần phân loại',
            'Quan sát và phân tích thành phần',
            'Xác định số loại chất trong mẫu',
            'Kết luận: Chất tinh khiết hay hỗn hợp'
          ],
          explanation: '✅ Chính xác! Đây là quy trình phân loại chất khoa học.',
          points: 20
        }
      ]
    }
  },
  
  {
    classId: 8,
    chapterId: 1,
    lessonId: 3,
    title: 'Bài 3: Bài thực hành 1 - Tính chất nóng chảy của chất',
    description: 'Thực hành mô phỏng quan sát tính chất nóng chảy của các chất khác nhau',
    level: 'Beginner',
    order: 3,
    type: 'lab',
    theory: `
      <h2>🧪 Thực hành: Tính chất nóng chảy của chất</h2>
      <p><strong>Mục tiêu:</strong> Quan sát và so sánh nhiệt độ nóng chảy của các chất khác nhau.</p>
      
      <h3>🔬 Dụng cụ và hóa chất</h3>
      <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>Dụng cụ:</h4>
        <p>• Đèn cồn • Ống nghiệm • Giá đỡ ống nghiệm • Nhiệt kế</p>
        <h4>Hóa chất:</h4>
        <p>• Nước đá • Parafin • Muối ăn • Đường phèn</p>
      </div>

      <h3>📋 Các bước tiến hành</h3>
      <div style="background: #dcfce7; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <p><strong>Bước 1:</strong> Chuẩn bị 4 ống nghiệm, mỗi ống đựng một loại chất</p>
        <p><strong>Bước 2:</strong> Đặt nhiệt kế vào từng ống nghiệm</p>
        <p><strong>Bước 3:</strong> Nung nóng từ từ và ghi lại nhiệt độ khi chất bắt đầu nóng chảy</p>
        <p><strong>Bước 4:</strong> Quan sát và ghi chép hiện tượng</p>
      </div>

      <h3>📊 Bảng kết quả mẫu</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #e5e7eb;">
          <th style="border: 1px solid #9ca3af; padding: 10px;">Chất</th>
          <th style="border: 1px solid #9ca3af; padding: 10px;">Nhiệt độ nóng chảy (°C)</th>
          <th style="border: 1px solid #9ca3af; padding: 10px;">Hiện tượng quan sát</th>
        </tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Nước đá</td><td style="border: 1px solid #9ca3af; padding: 8px;">0°C</td><td style="border: 1px solid #9ca3af; padding: 8px;">Chảy nhanh thành nước</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Parafin</td><td style="border: 1px solid #9ca3af; padding: 8px;">50-60°C</td><td style="border: 1px solid #9ca3af; padding: 8px;">Chảy thành chất lỏng trong suốt</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Đường phèn</td><td style="border: 1px solid #9ca3af; padding: 8px;">185°C</td><td style="border: 1px solid #9ca3af; padding: 8px;">Chảy và có mùi caramel</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Muối ăn</td><td style="border: 1px solid #9ca3af; padding: 8px;">801°C</td><td style="border: 1px solid #9ca3af; padding: 8px;">Rất khó nóng chảy</td></tr>
      </table>

      <h3>🎯 Kết luận</h3>
      <p>Mỗi chất có nhiệt độ nóng chảy riêng, đây là tính chất đặc trưng giúp nhận biết chất.</p>
    `,
    game: {
      type: 'lab-simulation',
      title: 'Mô phỏng thí nghiệm nóng chảy',
      simulation: {
        scene: 'laboratory',
        equipment: ['bunsen_burner', 'test_tubes', 'thermometer', 'stand'],
        substances: [
          { name: 'Nước đá', meltingPoint: 0, color: 'lightblue' },
          { name: 'Parafin', meltingPoint: 55, color: 'white' },
          { name: 'Đường phèn', meltingPoint: 185, color: 'brown' },
          { name: 'Muối ăn', meltingPoint: 801, color: 'white' }
        ]
      },
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Chất nào có nhiệt độ nóng chảy thấp nhất?',
          options: ['Nước đá', 'Parafin', 'Đường phèn', 'Muối ăn'],
          correctAnswer: 0,
          explanation: '✅ Nước đá nóng chảy ở 0°C, thấp nhất trong các chất đã thí nghiệm.',
          points: 15
        },
        {
          type: 'ordering',
          question: '📊 Sắp xếp các chất theo nhiệt độ nóng chảy tăng dần',
          options: ['Muối ăn', 'Đường phèn', 'Parafin', 'Nước đá'],
          correctOrder: ['Nước đá', 'Parafin', 'Đường phèn', 'Muối ăn'],
          explanation: '✅ Đúng! 0°C < 55°C < 185°C < 801°C',
          points: 20
        },
        {
          type: 'true-false',
          question: 'Nhiệt độ nóng chảy là tính chất đặc trưng của mỗi chất.',
          correctAnswer: true,
          explanation: '✅ Đúng! Mỗi chất tinh khiết có nhiệt độ nóng chảy xác định.',
          points: 10
        }
      ]
    }
  },

  {
    classId: 8,
    chapterId: 1,
    lessonId: 4,
    title: 'Bài 4: Nguyên tử',
    description: 'Khám phá cấu tạo nguyên tử và các hạt cơ bản',
    level: 'Beginner',
    order: 4,
    theory: `
      <h2>⚛️ Nguyên tử là gì?</h2>
      <p><strong>Nguyên tử</strong> là hạt nhỏ nhất của nguyên tố hóa học, không thể phân chia được trong phản ứng hóa học.</p>
      
      <h3>🏗️ Cấu tạo nguyên tử</h3>
      <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>⚛️ Hạt nhân (ở trung tâm)</h4>
        <p>• <strong>Proton (p+)</strong>: Mang điện tích dương (+)</p>
        <p>• <strong>Neutron (n)</strong>: Không mang điện (0)</p>
        <p>• Kích thước rất nhỏ nhưng chứa hầu hết khối lượng nguyên tử</p>
      </div>
      
      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>🌀 Lớp vỏ electron (quanh hạt nhân)</h4>
        <p>• <strong>Electron (e-)</strong>: Mang điện tích âm (-)</p>
        <p>• Chuyển động rất nhanh quanh hạt nhân theo quỹ đạo</p>
        <p>• Khối lượng rất nhỏ so với proton và neutron</p>
      </div>

      <h3>⚡ Tính chất điện của nguyên tử</h3>
      <div style="background: #dcfce7; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <p>• Nguyên tử trung hòa về điện: Số proton = Số electron</p>
        <p>• Điện tích dương của hạt nhân = Điện tích âm của lớp vỏ</p>
        <p>• Ví dụ: Nguyên tử hydro có 1 proton và 1 electron</p>
      </div>

      <h3>📏 Kích thước nguyên tử</h3>
      <p>• Nguyên tử rất nhỏ: đường kính khoảng 10⁻¹⁰ m</p>
      <p>• Hạt nhân nhỏ hơn nguyên tử 100.000 lần</p>
      <p>• Phần lớn thể tích nguyên tử là khoảng không</p>
    `,
    game: {
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Hạt nào trong nguyên tử mang điện tích âm?',
          options: ['Proton', 'Neutron', 'Electron', 'Hạt nhân'],
          correctAnswer: 2,
          explanation: '✅ Electron (e) là hạt mang điện tích âm, quay quanh hạt nhân.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: "Phân tử nước (H₂O) chứa bao nhiêu nguyên tử H và O?",
          options: ['1-3', '2-1', '3-1', '1-2'],
          correctAnswer: 1,
          explanation: '✅ Phân tử nước H₂O có 2 nguyên tử Hydro (H) và 1 nguyên tử Oxy (O), nên đáp án đúng là 2-1.',
          points: 20,
        },
        {
          type: 'true-false',
          question: 'Hạt nhân nguyên tử chỉ chứa proton.',
          correctAnswer: false,
          explanation: '❌ Sai! Hạt nhân nguyên tử chứa proton (điện tích dương) và neutron (không có điện tích).',
          points: 10
        },
        {
          type: 'matching',
          question: '🔗 Nối cặp: Ghép hạt với điện tích của nó',
          pairs: [
            { left: 'Proton', right: 'Điện tích dương (+)' },
            { left: 'Electron', right: 'Điện tích âm (-)' },
            { left: 'Neutron', right: 'Không mang điện (0)' }
          ],
          explanation: '✅ Xuất sắc! Bạn đã nắm vững điện tích các hạt.',
          points: 15
        },
        {
          type: 'ordering',
          question: '📊 Sắp xếp: Sắp xếp các phân tử theo số nguyên tử tăng dần',
          options: ['O₂ (2 nguyên tử)', 'H₂O (3 nguyên tử)', 'CO₂ (3 nguyên tử)', 'H₂SO₄ (7 nguyên tử)'],
          correctOrder: ['O₂ (2 nguyên tử)', 'H₂O (3 nguyên tử)', 'CO₂ (3 nguyên tử)', 'H₂SO₄ (7 nguyên tử)'],
          explanation: '✅ Đúng rồi! O₂ < H₂O = CO₂ < H₂SO₄',
          points: 20
        }
      ]
    }
  },

  {
    classId: 8,
    chapterId: 1,
    lessonId: 5,
    title: 'Bài 5: Nguyên tố hoá học',
    description: 'Học về nguyên tố hóa học, ký hiệu hóa học và số hiệu nguyên tử',
    level: 'Beginner',
    order: 5,
    theory: `
      <h2>⚛️ Nguyên tố hóa học là gì?</h2>
      <p><strong>Nguyên tố hóa học</strong> là tập hợp những nguyên tử có cùng số proton trong hạt nhân.</p>
      
      <h3>🔤 Ký hiệu hóa học</h3>
      <p>Mỗi nguyên tố được ký hiệu bằng 1 hoặc 2 chữ cái Latin:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #e5e7eb;">
          <th style="border: 1px solid #9ca3af; padding: 10px;">Nguyên tố</th>
          <th style="border: 1px solid #9ca3af; padding: 10px;">Ký hiệu</th>
          <th style="border: 1px solid #9ca3af; padding: 10px;">Tên tiếng Latin</th>
        </tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Hydro</td><td style="border: 1px solid #9ca3af; padding: 8px;"><strong>H</strong></td><td style="border: 1px solid #9ca3af; padding: 8px;">Hydrogenium</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Oxi</td><td style="border: 1px solid #9ca3af; padding: 8px;"><strong>O</strong></td><td style="border: 1px solid #9ca3af; padding: 8px;">Oxygenium</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Natri</td><td style="border: 1px solid #9ca3af; padding: 8px;"><strong>Na</strong></td><td style="border: 1px solid #9ca3af; padding: 8px;">Natrium</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Clo</td><td style="border: 1px solid #9ca3af; padding: 8px;"><strong>Cl</strong></td><td style="border: 1px solid #9ca3af; padding: 8px;">Chlorum</td></tr>
      </table>

      <h3>🧮 Đọc công thức hóa học</h3>
      <p><strong>Ví dụ:</strong> H₂SO₄</p>
      <ul>
        <li>2 nguyên tử Hydro (H)</li>
        <li>1 nguyên tử Lưu huỳnh (S)</li>
        <li>4 nguyên tử Oxi (O)</li>
        <li><strong>Tổng:</strong> 7 nguyên tử</li>
      </ul>
    `,
    game: {
      quizzes: [
        {
          type: 'matching',
          question: 'Nối cặp: Ghép nguyên tố với ký hiệu đúng',
          pairs: [
            { left: 'Hydro', right: 'H' },
            { left: 'Oxi', right: 'O' },
            { left: 'Natri', right: 'Na' },
            { left: 'Clo', right: 'Cl' },
            { left: 'Cacbon', right: 'C' },
          ],
          explanation: '✅ Tuyệt vời! Bạn đã nhớ đúng tất cả ký hiệu hóa học.',
          points: 20
        },
        {
          type: 'fill-in-blank',
          question: 'Điền ký hiệu: Công thức muối ăn là ___Cl (___: Natri)',
          correctAnswer: 'Na',
          explanation: '✅ Đúng! NaCl = Natri (Na) + Clo (Cl)',
          hint: 'Xem bảng ký hiệu nguyên tố ở trên',
          points: 15
        },
        {
          type: 'ordering',
          question: 'Sắp xếp: Sắp xếp các bước đọc công thức hóa học',
          options: [
            'Xác định các ký hiệu nguyên tố',
            'Đọc tên từng nguyên tố',
            'Đếm số nguyên tử của mỗi nguyên tố',
            'Tính tổng số nguyên tử'
          ],
          correctOrder: [
            'Xác định các ký hiệu nguyên tố',
            'Đọc tên từng nguyên tố',
            'Đếm số nguyên tử của mỗi nguyên tố',
            'Tính tổng số nguyên tử'
          ],
          explanation: '✅ Chính xác! Đây là quy trình đọc công thức hóa học.',
          points: 20
        },
        {
          type: 'drag-drop',
          question: '🎯 Kéo thả: Phân loại nguyên tố theo số chữ cái trong ký hiệu',
          pairs: [
            { left: 'H, O, C', right: '1 chữ cái' },
            { left: 'Na, Cl, Fe', right: '2 chữ cái' }
          ],
          explanation: '✅ Đúng rồi! Một số nguyên tố dùng 1 chữ, số khác dùng 2 chữ.',
          points: 15
        }
      ]
    }
  },

  {
    classId: 8,
    chapterId: 1,
    lessonId: 6,
    title: 'Bài 6: Đơn chất và Hợp chất - Phân tử',
    description: 'Phân biệt đơn chất và hợp chất, tìm hiểu về phân tử',
    level: 'Beginner',
    order: 6,
    theory: `
      <h2>🔬 Phân loại chất tinh khiết</h2>
      
      <div style="background: #dcfce7; padding: 15px; border-left: 4px solid #16a34a; margin: 15px 0;">
        <h3>📝 Đơn chất</h3>
        <p>Là chất tinh khiết được tạo nên từ <strong>một nguyên tố hóa học</strong>.</p>
        <p><strong>Ví dụ:</strong></p>
        <ul>
          <li>O₂, O₃ (các dạng thù hình của Oxi)</li>
          <li>Fe (sắt), Cu (đồng), Au (vàng)</li>
          <li>H₂ (khí hydro), N₂ (khí nitơ)</li>
        </ul>
      </div>

      <div style="background: #fef3c7; padding: 15px; border-left: 4px solid #d97706; margin: 15px 0;">
        <h3>🧪 Hợp chất</h3>
        <p>Là chất tinh khiết được tạo nên từ <strong>hai hay nhiều nguyên tố hóa học</strong> khác nhau.</p>
        <p><strong>Ví dụ:</strong></p>
        <ul>
          <li>H₂O (nước): từ H và O</li>
          <li>NaCl (muối ăn): từ Na và Cl</li>
          <li>CO₂ (khí cacbonic): từ C và O</li>
          <li>CaCO₃ (đá vôi): từ Ca, C và O</li>
        </ul>
      </div>

      <h2>🧩 Phân tử</h2>
      <p><strong>Phân tử</strong> là hạt nhỏ nhất của chất, gồm hai hay nhiều nguyên tử liên kết với nhau.</p>
      
      <h3>🔗 Đặc điểm phân tử</h3>
      <ul>
        <li>Phân tử chuyển động không ngừng</li>
        <li>Giữa các phân tử có khoảng cách</li>
        <li>Phân tử rất nhỏ, không thể nhìn thấy bằng mắt thường</li>
      </ul>

      <h3>📋 Ví dụ về phân tử</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #e5e7eb;">
          <th style="border: 1px solid #9ca3af; padding: 10px;">Phân tử</th>
          <th style="border: 1px solid #9ca3af; padding: 10px;">Cấu tạo</th>
          <th style="border: 1px solid #9ca3af; padding: 10px;">Loại chất</th>
        </tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">H₂O</td><td style="border: 1px solid #9ca3af; padding: 8px;">2H + 1O</td><td style="border: 1px solid #9ca3af; padding: 8px;">Hợp chất</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">O₂</td><td style="border: 1px solid #9ca3af; padding: 8px;">2O</td><td style="border: 1px solid #9ca3af; padding: 8px;">Đơn chất</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">CO₂</td><td style="border: 1px solid #9ca3af; padding: 8px;">1C + 2O</td><td style="border: 1px solid #9ca3af; padding: 8px;">Hợp chất</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">N₂</td><td style="border: 1px solid #9ca3af; padding: 8px;">2N</td><td style="border: 1px solid #9ca3af; padding: 8px;">Đơn chất</td></tr>
      </table>

      <h3>🎯 Cách phân biệt đơn chất và hợp chất</h3>
      <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <p><strong>Bước 1:</strong> Xác định công thức hóa học</p>
        <p><strong>Bước 2:</strong> Đếm số loại nguyên tố</p>
        <p><strong>Bước 3:</strong> 1 nguyên tố → Đơn chất; 2+ nguyên tố → Hợp chất</p>
      </div>
    `,
    game: {
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Nhóm nào dưới đây chứa các chất O₂, Fe, Au?',
          options: ['Đơn chất', 'Hợp chất', 'Dung dịch', 'Hỗn hợp'],
          correctAnswer: 0,
          explanation: '✅ O₂, Fe, Au đều là đơn chất vì mỗi chất chỉ gồm một nguyên tố.',
          points: 20
        },
        {
          type: 'multiple-choice',
          question: 'Trong các chất sau, chất nào là hợp chất?',
          options: ['O₂', 'H₂O', 'Fe', 'Au'],
          correctAnswer: 1,
          explanation: '✅ H₂O (nước) là hợp chất vì được tạo từ hai nguyên tố H và O.',
          points: 20
        },
        {
          type: 'multiple-choice',
          question: 'Đơn chất là chất được tạo từ bao nhiêu nguyên tố hóa học?',
          options: ['Một', 'Hai', 'Ba', 'Nhiều (không xác định)'],
          correctAnswer: 0,
          explanation: '✅ Đơn chất chỉ gồm MỘT nguyên tố hóa học.',
          points: 15
        },
        {
          type: 'ordering',
          question: '📊 Sắp xếp: Sắp xếp các bước phân biệt đơn chất và hợp chất',
          options: [
            'Viết công thức hóa học của chất',
            'Đếm số loại nguyên tố trong công thức',
            'Nếu có 1 nguyên tố → Đơn chất',
            'Nếu có 2+ nguyên tố → Hợp chất'
          ],
          correctOrder: [
            'Viết công thức hóa học của chất',
            'Đếm số loại nguyên tố trong công thức',
            'Nếu có 1 nguyên tố → Đơn chất',
            'Nếu có 2+ nguyên tố → Hợp chất'
          ],
          explanation: '✅ Hoàn hảo! Đây là cách phân biệt nhanh nhất.',
          points: 20
        }
      ]
    }
  },

  {
    classId: 8,
    chapterId: 1,
    lessonId: 7,
    title: 'Bài 7: Bài thực hành 2 - Sự lan toả của chất',
    description: 'Thực hành mô phỏng quan sát sự lan toả của chất trong môi trường khác nhau',
    level: 'Beginner',
    order: 7,
    type: 'lab',
    theory: `
      <h2>🧪 Thực hành: Sự lan toả của chất</h2>
      <p><strong>Mục tiêu:</strong> Quan sát sự lan toả của chất trong chất lỏng và chất khí, rút ra nhận xét về chuyển động của phân tử.</p>
      
      <h3>🔬 Thí nghiệm 1: Sự lan toả trong chất lỏng</h3>
      <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>Dụng cụ và hóa chất:</h4>
        <p>• Cốc thủy tinh • Nước • Thuốc tím (KMnO₄) • Đũa thủy tinh</p>
        <h4>Cách làm:</h4>
        <p>1. Đổ nước vào cốc thủy tinh</p>
        <p>2. Thả nhẹ vài tinh thể thuốc tím vào nước</p>
        <p>3. Quan sát hiện tượng xảy ra</p>
        <p>4. Khuấy nhẹ và quan sát sự thay đổi</p>
      </div>

      <h3>🌬️ Thí nghiệm 2: Sự lan toả trong chất khí</h3>
      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>Dụng cụ và hóa chất:</h4>
        <p>• Lọ thủy tinh • Bông tẩy • Amoniac (NH₃) • Không khí</p>
        <h4>Cách làm:</h4>
        <p>1. Nhúng bông vào dung dịch amoniac</p>
        <p>2. Đặt bông đã nhúng vào góc phòng</p>
        <p>3. Quan sát mùi lan toả trong phòng</p>
        <p>4. So sánh tốc độ lan toả ở nhiệt độ khác nhau</p>
      </div>

      <h3>📊 Kết quả quan sát</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #e5e7eb;">
          <th style="border: 1px solid #9ca3af; padding: 10px;">Môi trường</th>
          <th style="border: 1px solid #9ca3af; padding: 10px;">Hiện tượng</th>
          <th style="border: 1px solid #9ca3af; padding: 10px;">Tốc độ lan toả</th>
        </tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Nước lạnh</td><td style="border: 1px solid #9ca3af; padding: 8px;">Thuốc tím lan toả chậm</td><td style="border: 1px solid #9ca3af; padding: 8px;">Chậm</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Nước nóng</td><td style="border: 1px solid #9ca3af; padding: 8px;">Thuốc tím lan toả nhanh</td><td style="border: 1px solid #9ca3af; padding: 8px;">Nhanh</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Không khí</td><td style="border: 1px solid #9ca3af; padding: 8px;">Mùi amoniac lan toả</td><td style="border: 1px solid #9ca3af; padding: 8px;">Rất nhanh</td></tr>
      </table>

      <h3>🎯 Kết luận</h3>
      <div style="background: #dcfce7; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <p>• Các phân tử chuyển động không ngừng</p>
        <p>• Nhiệt độ càng cao, phân tử chuyển động càng nhanh</p>
        <p>• Sự lan toả trong chất khí nhanh hơn trong chất lỏng</p>
        <p>• Giữa các phân tử có khoảng cách</p>
      </div>
    `,
    game: {
      type: 'lab-simulation',
      title: 'Mô phỏng thí nghiệm lan toả',
      simulation: {
        scene: 'laboratory',
        experiments: [
          {
            name: 'Lan toả trong nước',
            equipment: ['beaker', 'water', 'kmno4', 'stirrer'],
            animation: 'diffusion_liquid'
          },
          {
            name: 'Lan toả trong không khí',
            equipment: ['bottle', 'cotton', 'ammonia'],
            animation: 'diffusion_gas'
          }
        ]
      },
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Sự lan toả xảy ra nhanh nhất trong môi trường nào?',
          options: ['Chất rắn', 'Chất lỏng', 'Chất khí', 'Chân không'],
          correctAnswer: 2,
          explanation: '✅ Chất khí có khoảng cách giữa các phân tử lớn nhất nên lan toả nhanh nhất.',
          points: 15
        },
        {
          type: 'true-false',
          question: 'Nhiệt độ cao làm tăng tốc độ lan toả của chất.',
          correctAnswer: true,
          explanation: '✅ Đúng! Nhiệt độ cao làm phân tử chuyển động nhanh hơn.',
          points: 10
        },
        {
          type: 'matching',
          question: '🔗 Nối cặp: Ghép môi trường với tốc độ lan toả',
          pairs: [
            { left: 'Nước lạnh', right: 'Chậm' },
            { left: 'Nước nóng', right: 'Nhanh' },
            { left: 'Không khí', right: 'Rất nhanh' }
          ],
          explanation: '✅ Tuyệt vời! Bạn đã hiểu mối quan hệ giữa môi trường và tốc độ lan toả.',
          points: 20
        }
      ]
    }
  },

  {
    classId: 8,
    chapterId: 1,
    lessonId: 8,
    title: 'Bài 8: Bài luyện tập 1',
    description: 'Luyện tập tổng hợp kiến thức về chất, nguyên tử, nguyên tố và phân tử',
    level: 'Beginner',
    order: 8,
    type: 'exercise',
    theory: `
      <h2>📚 Ôn tập kiến thức đã học</h2>
      
      <h3>🔍 Tóm tắt các khái niệm cơ bản</h3>
      <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>1. Chất</h4>
        <p>• <strong>Chất tinh khiết:</strong> Chỉ gồm một loại chất</p>
        <p>• <strong>Hỗn hợp:</strong> Gồm hai hay nhiều chất trộn lẫn</p>
      </div>

      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>2. Nguyên tử</h4>
        <p>• Hạt nhỏ nhất của nguyên tố hóa học</p>
        <p>• Gồm hạt nhân (p+, n) và lớp vỏ (e-)</p>
      </div>

      <div style="background: #dcfce7; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>3. Nguyên tố hóa học</h4>
        <p>• Tập hợp các nguyên tử có cùng số proton</p>
        <p>• Được ký hiệu bằng 1-2 chữ cái Latin</p>
      </div>

      <div style="background: #fecaca; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>4. Đơn chất và Hợp chất</h4>
        <p>• <strong>Đơn chất:</strong> Từ 1 nguyên tố (O₂, Fe, Au)</p>
        <p>• <strong>Hợp chất:</strong> Từ 2+ nguyên tố (H₂O, NaCl)</p>
      </div>

      <div style="background: #e0e7ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>5. Phân tử</h4>
        <p>• Hạt nhỏ nhất của chất</p>
        <p>• Gồm 2+ nguyên tử liên kết với nhau</p>
      </div>

      <h3>🎯 Mẹo ghi nhớ</h3>
      <ul>
        <li>🔬 <strong>Chất tinh khiết:</strong> "Một mình một cõi"</li>
        <li>⚛️ <strong>Nguyên tử:</strong> "Hạt nhân + Electron"</li>
        <li>🧪 <strong>Đơn chất:</strong> "Đơn = Một nguyên tố"</li>
        <li>🧩 <strong>Hợp chất:</strong> "Hợp = Nhiều nguyên tố"</li>
      </ul>
    `,
    game: {
      quizzes: [
        {
          type: 'multiple-choice',
          question: '🧪 Chất nào sau đây là hợp chất?',
          options: ['O₂', 'Fe', 'H₂O', 'Au'],
          correctAnswer: 2,
          explanation: '✅ H₂O là hợp chất vì được tạo từ 2 nguyên tố H và O.',
          points: 10
        },
        {
          type: 'matching',
          question: '🔗 Ghép khái niệm với định nghĩa đúng',
          pairs: [
            { left: 'Nguyên tử', right: 'Hạt nhỏ nhất của nguyên tố' },
            { left: 'Phân tử', right: 'Hạt nhỏ nhất của chất' },
            { left: 'Đơn chất', right: 'Từ một nguyên tố' },
            { left: 'Hợp chất', right: 'Từ nhiều nguyên tố' }
          ],
          explanation: '✅ Hoàn hảo! Bạn đã nắm vững các khái niệm cơ bản.',
          points: 20
        },
        {
          type: 'drag-drop',
          question: '🎯 Phân loại các chất sau vào đúng nhóm',
          categories: ['Đơn chất', 'Hợp chất'],
          items: [
            { text: 'O₂', category: 'Đơn chất' },
            { text: 'H₂O', category: 'Hợp chất' },
            { text: 'Fe', category: 'Đơn chất' },
            { text: 'NaCl', category: 'Hợp chất' },
            { text: 'N₂', category: 'Đơn chất' },
            { text: 'CO₂', category: 'Hợp chất' }
          ],
          explanation: '✅ Tuyệt vời! Bạn đã phân loại đúng tất cả.',
          points: 25
        },
        {
          type: 'ordering',
          question: '📊 Sắp xếp theo thứ tự: Từ nhỏ nhất đến lớn nhất',
          options: ['Phân tử', 'Nguyên tử', 'Electron', 'Hạt nhân'],
          correctOrder: ['Electron', 'Hạt nhân', 'Nguyên tử', 'Phân tử'],
          explanation: '✅ Chính xác! Electron < Hạt nhân < Nguyên tử < Phân tử',
          points: 20
        }
      ]
    }
  },

  {
    classId: 8,
    chapterId: 1,
    lessonId: 9,
    title: 'Bài 9: Công thức hoá học',
    description: 'Học cách viết và đọc công thức hóa học',
    level: 'Beginner',
    order: 9,
    theory: `
      <h2>📝 Công thức hóa học là gì?</h2>
      <p><strong>Công thức hóa học</strong> là cách biểu diễn chất bằng các ký hiệu hóa học của các nguyên tố và chỉ số.</p>
      
      <h3>🔤 Cấu tạo công thức hóa học</h3>
      <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>Ví dụ: H₂SO₄</h4>
        <p>• <strong>H₂</strong>: 2 nguyên tử Hydro</p>
        <p>• <strong>S</strong>: 1 nguyên tử Lưu huỳnh (không ghi chỉ số 1)</p>
        <p>• <strong>O₄</strong>: 4 nguyên tử Oxi</p>
      </div>

      <h3>📖 Cách đọc công thức hóa học</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #e5e7eb;">
          <th style="border: 1px solid #9ca3af; padding: 10px;">Công thức</th>
          <th style="border: 1px solid #9ca3af; padding: 10px;">Đọc</th>
          <th style="border: 1px solid #9ca3af; padding: 10px;">Thành phần</th>
        </tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">H₂O</td><td style="border: 1px solid #9ca3af; padding: 8px;">Ha-hai-O</td><td style="border: 1px solid #9ca3af; padding: 8px;">2H + 1O</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">CO₂</td><td style="border: 1px solid #9ca3af; padding: 8px;">Ce-O-hai</td><td style="border: 1px solid #9ca3af; padding: 8px;">1C + 2O</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">NaCl</td><td style="border: 1px solid #9ca3af; padding: 8px;">Na-Clo</td><td style="border: 1px solid #9ca3af; padding: 8px;">1Na + 1Cl</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">CaCO₃</td><td style="border: 1px solid #9ca3af; padding: 8px;">Can-xi-Ce-O-ba</td><td style="border: 1px solid #9ca3af; padding: 8px;">1Ca + 1C + 3O</td></tr>
      </table>

      <h3>✍️ Cách viết công thức hóa học</h3>
      <div style="background: #dcfce7; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>Quy tắc viết:</h4>
        <p>1. Viết ký hiệu các nguyên tố</p>
        <p>2. Viết chỉ số ở dưới, bên phải ký hiệu</p>
        <p>3. Chỉ số 1 không cần viết</p>
        <p>4. Chỉ số > 1 phải viết rõ</p>
      </div>

      <h3>🎯 Ý nghĩa của công thức hóa học</h3>
      <ul>
        <li>📍 Cho biết chất gồm những nguyên tố nào</li>
        <li>🔢 Cho biết số nguyên tử của mỗi nguyên tố</li>
        <li>⚖️ Tính được phân tử khối của chất</li>
        <li>🧮 Tính được thành phần phần trăm các nguyên tố</li>
      </ul>

      <h3>💡 Ví dụ minh họa</h3>
      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>Phân tích công thức H₂SO₄:</h4>
        <p>• Gồm 3 nguyên tố: H, S, O</p>
        <p>• Tổng cộng: 2 + 1 + 4 = 7 nguyên tử</p>
        <p>• Là hợp chất (có nhiều nguyên tố)</p>
      </div>
    `,
    game: {
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Công thức H₂SO₄ cho biết có bao nhiêu nguyên tử Oxi?',
          options: ['1', '2', '3', '4'],
          correctAnswer: 3,
          explanation: '✅ Chỉ số 4 trong O₄ cho biết có 4 nguyên tử Oxi.',
          points: 10
        },
        {
          type: 'fill-in-blank',
          question: '✏️ Điền số: Công thức nước là H___O (bao nhiêu nguyên tử H?)',
          correctAnswer: '2',
          explanation: '✅ Nước có công thức H₂O với 2 nguyên tử Hydro.',
          hint: 'Nhập một chữ số',
          points: 10
        },
        {
          type: 'matching',
          question: '� Nối cặp: Ghép công thức với cách đọc',
          pairs: [
            { left: 'H₂O', right: 'Ha-hai-O' },
            { left: 'CO₂', right: 'Ce-O-hai' },
            { left: 'NaCl', right: 'Na-Clo' },
            { left: 'CaCO₃', right: 'Can-xi-Ce-O-ba' }
          ],
          explanation: '✅ Tuyệt vời! Bạn đã đọc đúng các công thức hóa học.',
          points: 20
        },
        {
          type: 'drag-drop',
          question: '🎯 Phân tích: Phân tích thành phần của H₂SO₄',
          categories: ['H', 'S', 'O'],
          items: [
            { text: '2 nguyên tử', category: 'H' },
            { text: '1 nguyên tử', category: 'S' },
            { text: '4 nguyên tử', category: 'O' }
          ],
          explanation: '✅ Chính xác! H₂SO₄ có 2H + 1S + 4O = 7 nguyên tử.',
          points: 20
        },
        {
          type: 'true-false',
          question: 'Trong công thức hóa học, chỉ số 1 luôn phải viết rõ.',
          correctAnswer: false,
          explanation: '❌ Sai! Chỉ số 1 không cần viết, chỉ viết chỉ số > 1.',
          points: 10
        }
      ]
    }
  },

  {
    classId: 8,
    chapterId: 1,
    lessonId: 10,
    title: 'Bài 10: Hoá trị',
    description: 'Tìm hiểu về hóa trị và cách xác định hóa trị của các nguyên tố',
    level: 'Beginner',
    order: 10,
    theory: `
      <h2>⚡ Hóa trị là gì?</h2>
      <p><strong>Hóa trị</strong> là con số biểu thị khả năng liên kết của nguyên tử một nguyên tố với nguyên tử của nguyên tố khác.</p>
      
      <h3>📊 Hóa trị của một số nguyên tố thường gặp</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #e5e7eb;">
          <th style="border: 1px solid #9ca3af; padding: 10px;">Nguyên tố</th>
          <th style="border: 1px solid #9ca3af; padding: 10px;">Ký hiệu</th>
          <th style="border: 1px solid #9ca3af; padding: 10px;">Hóa trị</th>
        </tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Hydro</td><td style="border: 1px solid #9ca3af; padding: 8px;">H</td><td style="border: 1px solid #9ca3af; padding: 8px;">I</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Oxi</td><td style="border: 1px solid #9ca3af; padding: 8px;">O</td><td style="border: 1px solid #9ca3af; padding: 8px;">II</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Natri</td><td style="border: 1px solid #9ca3af; padding: 8px;">Na</td><td style="border: 1px solid #9ca3af; padding: 8px;">I</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Magiê</td><td style="border: 1px solid #9ca3af; padding: 8px;">Mg</td><td style="border: 1px solid #9ca3af; padding: 8px;">II</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Nhôm</td><td style="border: 1px solid #9ca3af; padding: 8px;">Al</td><td style="border: 1px solid #9ca3af; padding: 8px;">III</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Cacbon</td><td style="border: 1px solid #9ca3af; padding: 8px;">C</td><td style="border: 1px solid #9ca3af; padding: 8px;">IV</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Clo</td><td style="border: 1px solid #9ca3af; padding: 8px;">Cl</td><td style="border: 1px solid #9ca3af; padding: 8px;">I</td></tr>
      </table>

      <h3>🧮 Quy tắc hóa trị</h3>
      <div style="background: #dcfce7; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: center;">
        <h4>Trong hợp chất: Tổng hóa trị dương = Tổng hóa trị âm</h4>
      </div>

      <h3>💡 Ví dụ minh họa</h3>
      <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>🔸 Xác định hóa trị trong H₂O:</h4>
        <p>• H có hóa trị I, có 2 nguyên tử → 2 × I = II</p>
        <p>• O có hóa trị II, có 1 nguyên tử → 1 × II = II</p>
        <p>• Tổng hóa trị: II = II ✅</p>
      </div>

      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>🔸 Tìm hóa trị của S trong SO₂:</h4>
        <p>• O có hóa trị II, có 2 nguyên tử → 2 × II = IV</p>
        <p>• S có hóa trị ?, có 1 nguyên tử → 1 × ? = ?</p>
        <p>• Theo quy tắc: ? = IV</p>
        <p>• Vậy S có hóa trị IV trong SO₂</p>
      </div>

      <h3>📝 Cách viết công thức từ hóa trị</h3>
      <div style="background: #fecaca; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>Ví dụ: Viết công thức hợp chất của Al (III) và O (II)</h4>
        <p><strong>Bước 1:</strong> Viết ký hiệu: Al O</p>
        <p><strong>Bước 2:</strong> Viết hóa trị: Al^III O^II</p>
        <p><strong>Bước 3:</strong> Hoán đổi chỉ số: Al₂O₃</p>
        <p><strong>Kiểm tra:</strong> 2×III = 3×II = VI ✅</p>
      </div>
    `,
    game: {
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Hóa trị của Oxi trong hầu hết các hợp chất là?',
          options: ['I', 'II', 'III', 'IV'],
          correctAnswer: 1,
          explanation: '✅ Oxi có hóa trị II trong hầu hết các hợp chất.',
          points: 10
        },
        {
          type: 'fill-in-blank',
          question: '✏️ Điền hóa trị: Trong H₂SO₄, nếu H(I), O(II) thì S có hóa trị ___',
          correctAnswer: 'VI',
          explanation: '✅ Đúng! 2×I + 1×VI = 4×II → VI = VI',
          hint: 'Ghi bằng số La Mã (I, II, III, IV, V, VI)',
          points: 20
        },
        {
          type: 'matching',
          question: '🔗 Nối cặp: Ghép nguyên tố với hóa trị thường gặp',
          pairs: [
            { left: 'H', right: 'I' },
            { left: 'O', right: 'II' },
            { left: 'Al', right: 'III' },
            { left: 'C', right: 'IV' }
          ],
          explanation: '✅ Tuyệt vời! Bạn đã nhớ đúng hóa trị các nguyên tố.',
          points: 20
        },
        {
          type: 'true-false',
          question: 'Trong hợp chất, tổng hóa trị dương luôn bằng tổng hóa trị âm.',
          correctAnswer: true,
          explanation: '✅ Đúng! Đây là quy tắc cơ bản của hóa trị.',
          points: 15
        }
      ]
    }
  },

  {
    classId: 8,
    chapterId: 1,
    lessonId: 11,
    title: 'Bài 11: Bài luyện tập 2',
    description: 'Luyện tập tổng hợp về công thức hóa học và hóa trị',
    level: 'Beginner',
    order: 11,
    type: 'exercise',
    theory: `
      <h2>� Ôn tập tổng hợp Chương 1</h2>
      
      <h3>🎯 Kiến thức cần nhớ</h3>
      <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>1. Công thức hóa học</h4>
        <p>• Biểu diễn chất bằng ký hiệu và chỉ số</p>
        <p>• Cho biết thành phần nguyên tố và số lượng nguyên tử</p>
        <p>• Ví dụ: H₂SO₄ = 2H + 1S + 4O</p>
      </div>

      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>2. Hóa trị</h4>
        <p>• Khả năng liên kết của nguyên tử</p>
        <p>• Quy tắc: Tổng hóa trị dương = Tổng hóa trị âm</p>
        <p>• Dùng để viết công thức hợp chất</p>
      </div>

      <h3>🔄 Mối liên hệ các khái niệm</h3>
      <div style="text-align: center; background: #dcfce7; padding: 20px; border-radius: 8px; margin: 15px 0;">
        <p><strong>Nguyên tố</strong> → <strong>Nguyên tử</strong> → <strong>Phân tử</strong> → <strong>Chất</strong></p>
        <p>↓</p>
        <p><strong>Ký hiệu</strong> → <strong>Công thức</strong> → <strong>Hóa trị</strong></p>
      </div>

      <h3>💡 Bài tập mẫu</h3>
      <div style="background: #e0e7ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>🔸 Bài 1: Phân tích công thức Ca(OH)₂</h4>
        <p><strong>Giải:</strong></p>
        <p>• Gồm 2 nguyên tố: Ca và O, H</p>
        <p>• Thành phần: 1Ca + 2O + 2H</p>
        <p>• Tổng: 5 nguyên tử</p>
        <p>• Loại: Hợp chất (có nhiều nguyên tố)</p>
      </div>

      <div style="background: #fecaca; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>🔸 Bài 2: Viết công thức hợp chất của Mg(II) và Cl(I)</h4>
        <p><strong>Giải:</strong></p>
        <p>• Bước 1: Mg Cl</p>
        <p>• Bước 2: Mg^II Cl^I</p>
        <p>• Bước 3: MgCl₂</p>
        <p>• Kiểm tra: 1×II = 2×I = II ✅</p>
      </div>

      <h3>🎯 Chiến lược làm bài</h3>
      <ul>
        <li>📖 <strong>Đọc kỹ đề:</strong> Xác định yêu cầu</li>
        <li>🔍 <strong>Phân tích:</strong> Tìm dữ liệu cho sẵn</li>
        <li>📝 <strong>Áp dụng:</strong> Sử dụng công thức, quy tắc</li>
        <li>✅ <strong>Kiểm tra:</strong> Xem kết quả có hợp lý không</li>
      </ul>
    `,
    game: {
      quizzes: [
        {
          type: 'multiple-choice',
          question: '🧪 Hợp chất của Al(III) và SO₄(II) có công thức là?',
          options: ['AlSO₄', 'Al₂SO₄', 'Al₂(SO₄)₃', 'Al₃(SO₄)₂'],
          correctAnswer: 2,
          explanation: '✅ Al₂(SO₄)₃: 2×III = 3×II = VI',
          points: 20
        },
        {
          type: 'drag-drop',
          question: '🎯 Phân loại các công thức sau',
          categories: ['Đơn chất', 'Hợp chất'],
          items: [
            { text: 'H₂', category: 'Đơn chất' },
            { text: 'H₂O', category: 'Hợp chất' },
            { text: 'O₂', category: 'Đơn chất' },
            { text: 'CO₂', category: 'Hợp chất' },
            { text: 'N₂', category: 'Đơn chất' },
            { text: 'NH₃', category: 'Hợp chất' }
          ],
          explanation: '✅ Hoàn hảo! Đơn chất: 1 nguyên tố, Hợp chất: 2+ nguyên tố.',
          points: 25
        },
        {
          type: 'fill-in-blank',
          question: '✏️ Tính tổng nguyên tử trong Ca(OH)₂: 1Ca + ___O + ___H = ___ nguyên tử',
          correctAnswer: '2,2,5',
          explanation: '✅ Đúng! Ca(OH)₂ có 1Ca + 2O + 2H = 5 nguyên tử.',
          hint: 'Ghi dạng: số,số,số (ví dụ: 1,2,3)',
          points: 20
        },
        {
          type: 'ordering',
          question: '📊 Sắp xếp: Các bước viết công thức từ hóa trị',
          options: [
            'Viết ký hiệu các nguyên tố',
            'Ghi hóa trị của từng nguyên tố',
            'Hoán đổi chỉ số (hóa trị thành chỉ số)',
            'Kiểm tra quy tắc hóa trị',
            'Rút gọn chỉ số nếu cần'
          ],
          correctOrder: [
            'Viết ký hiệu các nguyên tố',
            'Ghi hóa trị của từng nguyên tố',
            'Hoán đổi chỉ số (hóa trị thành chỉ số)',
            'Rút gọn chỉ số nếu cần',
            'Kiểm tra quy tắc hóa trị'
          ],
          explanation: '✅ Xuất sắc! Đây là quy trình chuẩn viết công thức hóa học.',
          points: 25
        }
      ]
    }
  }
];

async function seedDatabase() {
  try {
    // Kết nối MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chemistry-learning');
    console.log('✅ Đã kết nối MongoDB');

    // Xóa dữ liệu cũ
    await Lesson.deleteMany({});
    console.log('🗑️ Đã xóa dữ liệu cũ');

    // Thêm dữ liệu mới
    await Lesson.insertMany(lessons);
    console.log('📚 Đã thêm', lessons.length, 'bài học Hóa 8');

    console.log('🎉 Seed database thành công!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi seed database:', error);
    process.exit(1);
  }
}

seedDatabase();
