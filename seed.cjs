const mongoose = require('mongoose');
const Lesson = require('./models/Lesson.cjs');
require('dotenv').config();

// Dữ liệu bài học Hóa học lớp 8 - Chương 1
const lessons = [
  {
    classId: 8,
    chapterId: 1,
    lessonId: 1,
    title: 'Bài 1: Chất – Tính chất của chất',
    description: 'Level 1 - Tìm hiểu về chất, phân biệt chất tinh khiết và hỗn hợp, tính chất vật lý và hóa học',
    level: 'Beginner',
    order: 1,
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
    lessonId: 2,
    title: 'Bài 2: Nguyên tử – Phân tử',
    description: 'Level 2 - Khám phá cấu tạo nguyên tử và phân tử',
    level: 'Beginner',
    order: 2,
    theory: `
      <h2>🔬 Nguyên tử là gì?</h2>
      <p><strong>Nguyên tử</strong> là hạt nhỏ nhất của nguyên tố hóa học, không thể phân chia được trong phản ứng hóa học.</p>
      
      <h3>🏗️ Cấu tạo nguyên tử</h3>
      <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>⚛️ Hạt nhân (ở trung tâm)</h4>
        <p>• <strong>Proton (p)</strong>: Mang điện tích dương (+)</p>
        <p>• <strong>Neutron (n)</strong>: Không mang điện (0)</p>
      </div>
      
      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>🌀 Lớp vỏ (quanh hạt nhân)</h4>
        <p>• <strong>Electron (e)</strong>: Mang điện tích âm (-)</p>
        <p>• Chuyển động rất nhanh quanh hạt nhân</p>
      </div>

      <h3>🧩 Phân tử là gì?</h3>
      <p><strong>Phân tử</strong> là hạt nhỏ nhất của chất, gồm hai hay nhiều nguyên tử liên kết với nhau.</p>
      <p><strong>Ví dụ:</strong></p>
      <ul>
        <li>H₂O (nước): 2 nguyên tử H + 1 nguyên tử O</li>
        <li>CO₂ (khí cacbonic): 1 nguyên tử C + 2 nguyên tử O</li>
        <li>O₂ (khí oxi): 2 nguyên tử O</li>
      </ul>
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
    lessonId: 3,
    title: 'Bài 3: Nguyên tố hóa học',
    description: 'Level 3 - Học về ký hiệu hóa học và số nguyên tử',
    level: 'Beginner',
    order: 3,
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
    lessonId: 4,
    title: 'Bài 4: Đơn chất & Hợp chất',
    description: 'Level 4 - Phân biệt đơn chất và hợp chất',
    level: 'Beginner',
    order: 4,
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

      <h3>🎯 Cách phân biệt</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #e5e7eb;">
          <th style="border: 1px solid #9ca3af; padding: 10px;">Đơn chất</th>
          <th style="border: 1px solid #9ca3af; padding: 10px;">Hợp chất</th>
        </tr>
        <tr>
          <td style="border: 1px solid #9ca3af; padding: 10px;">
            ✅ Chỉ có 1 nguyên tố<br>
            ✅ Không phân tích được thành chất đơn giản hơn<br>
            ✅ Ví dụ: Fe, O₂, S
          </td>
          <td style="border: 1px solid #9ca3af; padding: 10px;">
            ✅ Có 2+ nguyên tố khác nhau<br>
            ✅ Có thể phân tích thành đơn chất<br>
            ✅ Ví dụ: H₂O, NaCl, CO₂
          </td>
        </tr>
      </table>
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
    lessonId: 5,
    title: 'Bài 5: Phân tử khối',
    description: 'Level 5 - Tính toán phân tử khối các chất',
    level: 'Beginner',
    order: 5,
    theory: `
      <h2>⚖️ Phân tử khối là gì?</h2>
      <p><strong>Phân tử khối (M)</strong> là khối lượng của một phân tử tính bằng đơn vị cacbon (u).</p>
      
      <h3>📊 Nguyên tử khối một số nguyên tố thường gặp</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr style="background: #e5e7eb;">
          <th style="border: 1px solid #9ca3af; padding: 10px;">Nguyên tố</th>
          <th style="border: 1px solid #9ca3af; padding: 10px;">Ký hiệu</th>
          <th style="border: 1px solid #9ca3af; padding: 10px;">Nguyên tử khối (u)</th>
        </tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Hydro</td><td style="border: 1px solid #9ca3af; padding: 8px;">H</td><td style="border: 1px solid #9ca3af; padding: 8px;">1</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Cacbon</td><td style="border: 1px solid #9ca3af; padding: 8px;">C</td><td style="border: 1px solid #9ca3af; padding: 8px;">12</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Oxi</td><td style="border: 1px solid #9ca3af; padding: 8px;">O</td><td style="border: 1px solid #9ca3af; padding: 8px;">16</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Natri</td><td style="border: 1px solid #9ca3af; padding: 8px;">Na</td><td style="border: 1px solid #9ca3af; padding: 8px;">23</td></tr>
        <tr><td style="border: 1px solid #9ca3af; padding: 8px;">Clo</td><td style="border: 1px solid #9ca3af; padding: 8px;">Cl</td><td style="border: 1px solid #9ca3af; padding: 8px;">35.5</td></tr>
      </table>

      <h3>🧮 Công thức tính phân tử khối</h3>
      <div style="background: #dcfce7; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: center;">
        <h4>M = Σ(số nguyên tử × nguyên tử khối)</h4>
      </div>

      <h3>💡 Ví dụ minh họa</h3>
      <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>🔸 Tính phân tử khối của H₂O:</h4>
        <p>M<sub>H₂O</sub> = 2 × M<sub>H</sub> + 1 × M<sub>O</sub></p>
        <p>M<sub>H₂O</sub> = 2 × 1 + 1 × 16 = 18 (u)</p>
      </div>

      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h4>🔸 Tính phân tử khối của CO₂:</h4>
        <p>M<sub>CO₂</sub> = 1 × M<sub>C</sub> + 2 × M<sub>O</sub></p>
        <p>M<sub>CO₂</sub> = 1 × 12 + 2 × 16 = 44 (u)</p>
      </div>
    `,
    game: {
      quizzes: [
        {
          type: 'fill-in-blank',
          question: '✏️ Nhập kết quả: Phân tử khối của H₂O = 2×1 + 1×16 = _____ (đơn vị: u)',
          correctAnswer: 18,
          explanation: '✅ Chính xác! M(H₂O) = 2 × 1 + 1 × 16 = 18 u',
          hint: 'Nhập một số nguyên (ví dụ: 18)',
          points: 15
        },
        {
          type: 'ordering',
          question: '📊 Sắp xếp: Sắp xếp các bước tính phân tử khối',
          options: [
            'Viết công thức hóa học',
            'Xác định số nguyên tử mỗi nguyên tố',
            'Tra nguyên tử khối các nguyên tố',
            'Áp dụng công thức M = Σ(số × khối)',
            'Tính toán và ghi đơn vị (u)'
          ],
          correctOrder: [
            'Viết công thức hóa học',
            'Xác định số nguyên tử mỗi nguyên tố',
            'Tra nguyên tử khối các nguyên tố',
            'Áp dụng công thức M = Σ(số × khối)',
            'Tính toán và ghi đơn vị (u)'
          ],
          explanation: '✅ Hoàn hảo! Đây là quy trình chuẩn tính phân tử khối.',
          points: 20
        },
        {
          type: 'matching',
          question: 'Nối cặp: Ghép chất với phân tử khối tương ứng',
          pairs: [
            { left: 'H₂O', right: '18u' },
            { left: 'CO₂', right: '44u' },
            { left: 'NaCl', right: '58.5u' },
            { left: 'O₂', right: '32u' }
          ],
          explanation: '✅ Tuyệt vời! Bạn đã nhớ đúng phân tử khối các chất.',
          points: 20
        },
        {
          type: 'ordering',
          question: '📋 Sắp xếp: Sắp xếp các chất theo phân tử khối tăng dần',
          options: ['O₂', 'H₂O', 'NaCl', 'CO₂'],
          correctOrder: ['H₂O', 'O₂', 'CO₂', 'NaCl'],
          explanation: '✅ Chính xác! 18 < 32 < 44 < 58.5',
          points: 20
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
