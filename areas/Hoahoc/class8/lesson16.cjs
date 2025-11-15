module.exports = {
  classId: 8,
  chapterId: 3,
  lessonId: 16,
  title: "Bài 16: Phương trình hóa học",
  description: "Học cách lập và cân bằng phương trình hóa học, hiểu ý nghĩa của phương trình",
  level: "Advanced",
  order: 16,
  theory: `
  
    <h3>📌 I. Định nghĩa</h3>
    <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 15px 0;">
      <p><strong>Phương trình hóa học</strong> là phương trình biểu diễn ngắn gọn phản ứng hóa học, sử dụng các công thức hóa học thay cho tên gọi của các chất. Ví dụ, phản ứng giữa khí hiđro và khí oxi tạo ra nước có thể viết dưới dạng phương trình chữ là "Khí hiđro + Khí oxi → Nước", sau đó thay tên bằng công thức hóa học ta được sơ đồ phản ứng "H₂ + O₂ → H₂O", và cuối cùng sau khi cân bằng số nguyên tử ta có phương trình hóa học hoàn chỉnh: <strong>2H₂ + O₂ → 2H₂O</strong>.</p>
    </div>

    <h3>🔧 II. Các bước lập phương trình hóa học</h3>
    <div style="background: #fef3c7; padding: 20px; border-radius: 10px; margin: 15px 0;">
      <p>Để lập một phương trình hóa học, ta thực hiện theo ba bước cơ bản. <strong>Bước 1</strong> là viết sơ đồ phản ứng bằng cách viết công thức hóa học của các chất tham gia ở bên trái mũi tên và sản phẩm ở bên phải mũi tên, ví dụ: P + O₂ → P₂O₅. <strong>Bước 2</strong> là cân bằng số nguyên tử của mỗi nguyên tố bằng cách tìm hệ số thích hợp đặt trước các công thức sao cho số nguyên tử của mỗi nguyên tố ở hai vế bằng nhau, trong đó nên ưu tiên cân bằng nguyên tố có số nguyên tử lẻ trước. <strong>Bước 3</strong> là viết lại phương trình với đầy đủ hệ số đã tìm được, chẳng hạn: 4P + 5O₂ → 2P₂O₅.</p>
    </div>

    <div style="background: #dcfce7; padding: 20px; border-radius: 10px; margin: 15px 0;">
      <h4 style="color: #16a34a;">📝 Ví dụ chi tiết: Cân bằng phản ứng P + O₂ → P₂O₅</h4>
      <p>Đầu tiên ta viết sơ đồ P + O₂ → P₂O₅, sau đó đếm số nguyên tử thấy bên trái có 1 P và 2 O, bên phải có 2 P và 5 O. Ta cân bằng P bằng cách đặt hệ số 2 trước P₂O₅, lúc này bên phải có 4 P và 10 O, do đó cần đặt hệ số 4 trước P để cân bằng P và đặt hệ số 5 trước O₂ để cân bằng O. Phương trình hoàn chỉnh là: <strong>4P + 5O₂ → 2P₂O₅</strong>.</p>
    </div>

    <div style="background: #fee2e2; padding: 15px; border-left: 4px solid #ef4444; margin: 15px 0;">
      <h4>⚠️ Chú ý quan trọng:</h4>
      <p>Khi cân bằng phương trình cần nhớ: <strong>KHÔNG được</strong> thay đổi các chỉ số trong công thức hóa học đã viết đúng (ví dụ không được viết 3O₂ thành 6O), chỉ được đặt hệ số trước công thức. Hệ số phải được viết <strong>ngang bằng</strong> với ký hiệu hóa học (2Al, 3Fe chứ không phải ₂Al, ₃Fe). Với các nhóm nguyên tử như OH, SO₄, NO₃ nên coi <strong>cả nhóm như một đơn vị</strong> để cân bằng cho nhanh, ví dụ Ca(OH)₂ có 2 nhóm OH.</p>
    </div>

    <h3>🎯 III. Ý nghĩa của phương trình hóa học</h3>
    <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin: 15px 0;">
      <p>Phương trình hóa học cho biết <strong>tỉ lệ về số nguyên tử, số phân tử</strong> giữa các chất trong phản ứng, và tỉ lệ này bằng đúng <strong>tỉ lệ hệ số</strong> của mỗi chất trong phương trình. Ví dụ, phương trình <strong>4P + 5O₂ → 2P₂O₅</strong> cho biết 4 nguyên tử P phản ứng với 5 phân tử O₂ tạo thành 2 phân tử P₂O₅, hay tỉ lệ mol n<sub>P</sub> : n<sub>O₂</sub> : n<sub>P₂O₅</sub> = 4 : 5 : 2. Điều này có nghĩa là nếu có 8 nguyên tử P thì cần 10 phân tử O₂ và tạo ra 4 phân tử P₂O₅, hoặc nếu có 0,4 mol P thì cần 0,5 mol O₂ và tạo ra 0,2 mol P₂O₅.</p>
    </div>

    <h3>🗺️ Sơ đồ tư duy: Phương trình hóa học</h3>
    <div style="background: white; padding: 25px; border-radius: 15px; margin: 20px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; border-radius: 50px; display: inline-block; font-size: 22px; font-weight: bold; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
          TÓM TẮT NỘI DUNG VỀ PHƯƠNG TRÌNH HÓA HỌC
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px;">
        <!-- Cột 1: LẬP PHƯƠNG TRÌNH -->
        <div style="flex: 1; min-width: 280px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 15px; border: 3px solid #f59e0b;">
          <h4 style="text-align: center; color: #f59e0b; margin-top: 0; font-size: 18px;">📋 LẬP PHƯƠNG TRÌNH</h4>
          
          <div style="background: white; padding: 12px; border-radius: 8px; margin: 10px 0;">
            <p style="margin: 5px 0; font-size: 14px;"><strong>Bước 1 ✍️</strong></p>
            <p style="margin: 5px 0; font-size: 13px;">Viết sơ đồ phản ứng</p>
            <p style="margin: 5px 0; font-size: 12px; color: #666; font-style: italic;">VD: P + O₂ → P₂O₅</p>
          </div>

          <div style="background: white; padding: 12px; border-radius: 8px; margin: 10px 0;">
            <p style="margin: 5px 0; font-size: 14px;"><strong>Bước 2 ⚖️</strong></p>
            <p style="margin: 5px 0; font-size: 13px;">Cân bằng số nguyên tử</p>
            <p style="margin: 5px 0; font-size: 12px; color: #666; font-style: italic;">Đặt hệ số thích hợp</p>
          </div>

          <div style="background: white; padding: 12px; border-radius: 8px; margin: 10px 0;">
            <p style="margin: 5px 0; font-size: 14px;"><strong>Bước 3 ✅</strong></p>
            <p style="margin: 5px 0; font-size: 13px;">Viết phương trình</p>
            <p style="margin: 5px 0; font-size: 12px; color: #666; font-style: italic;">4P + 5O₂ → 2P₂O₅</p>
          </div>
        </div>

        <!-- Cột 2: Ý NGHĨA -->
        <div style="flex: 1; min-width: 280px; background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%); padding: 20px; border-radius: 15px; border: 3px solid #0284c7;">
          <h4 style="text-align: center; color: #0284c7; margin-top: 0; font-size: 18px;">🎯 Ý NGHĨA</h4>
          
          <div style="background: white; padding: 12px; border-radius: 8px; margin: 10px 0;">
            <p style="margin: 5px 0; font-size: 14px;"><strong>Tỉ lệ số phân tử:</strong></p>
            <p style="margin: 5px 0; font-size: 13px;">Bằng tỉ lệ hệ số</p>
            <p style="margin: 5px 0; font-size: 12px; color: #666;">4 : 5 : 2</p>
          </div>

          <div style="background: white; padding: 12px; border-radius: 8px; margin: 10px 0;">
            <p style="margin: 5px 0; font-size: 14px;"><strong>Tỉ lệ số mol:</strong></p>
            <p style="margin: 5px 0; font-size: 13px;">Bằng tỉ lệ hệ số</p>
            <p style="margin: 5px 0; font-size: 12px; color: #666;">n_P : n_O₂ : n_P₂O₅</p>
          </div>

          <div style="background: #0284c7; color: white; padding: 10px; border-radius: 8px; text-align: center; margin-top: 10px; font-weight: bold; font-size: 13px;">
            Cơ sở tính toán hóa học
          </div>
        </div>

        <!-- Cột 3: CHÚ Ý -->
        <div style="flex: 1; min-width: 280px; background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); padding: 20px; border-radius: 15px; border: 3px solid #ef4444;">
          <h4 style="text-align: center; color: #ef4444; margin-top: 0; font-size: 18px;">⚠️ CHÚ Ý</h4>
          
          <div style="background: white; padding: 10px; border-radius: 8px; margin: 8px 0;">
            <p style="margin: 3px 0; font-size: 13px;">❌ Không đổi chỉ số</p>
            <p style="margin: 3px 0; font-size: 11px; color: #666;">O₂ ≠ O</p>
          </div>

          <div style="background: white; padding: 10px; border-radius: 8px; margin: 8px 0;">
            <p style="margin: 3px 0; font-size: 13px;">✅ Hệ số ngang bằng</p>
            <p style="margin: 3px 0; font-size: 11px; color: #666;">2Al, 3Fe</p>
          </div>

          <div style="background: white; padding: 10px; border-radius: 8px; margin: 8px 0;">
            <p style="margin: 3px 0; font-size: 13px;">🔢 Cân bằng nhóm NT</p>
            <p style="margin: 3px 0; font-size: 11px; color: #666;">OH, SO₄, NO₃...</p>
          </div>

          <div style="background: white; padding: 10px; border-radius: 8px; margin: 8px 0;">
            <p style="margin: 3px 0; font-size: 13px;">🎯 Ưu tiên số lẻ</p>
            <p style="margin: 3px 0; font-size: 11px; color: #666;">Cân bằng trước</p>
          </div>
        </div>
      </div>

      <div style="margin-top: 30px; text-align: center;">
        <div style="display: inline-block; background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 15px 30px; border-radius: 15px; border: 2px solid #16a34a; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <p style="margin: 0; font-weight: bold; color: #15803d; font-size: 15px;">
            💡 Số nguyên tử mỗi nguyên tố <span style="color: #dc2626;">2 vế phải bằng nhau</span>
          </p>
        </div>
      </div>
    </div>
  `,
  game: {
    // 🌱 CẤP ĐỘ CƠ BẢN
    basic: [
      {
        type: "true-false",
        question: "Phương trình hóa học là phương trình biểu diễn ngắn gọn phản ứng hóa học.",
        correctAnswer: true,
        explanation: "✅ Đúng! Phương trình hóa học dùng công thức thay cho tên gọi các chất.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Bước đầu tiên khi lập phương trình hóa học là gì?",
        options: [
          "Cân bằng số nguyên tử",
          "Viết sơ đồ phản ứng",
          "Tính khối lượng mol",
          "Đặt hệ số"
        ],
        correctAnswer: 1,
        explanation: "✅ Bước 1 là viết sơ đồ phản ứng với công thức hóa học các chất.",
        points: 10
      },
      {
        type: "true-false",
        question: "Khi cân bằng phương trình, ta có thể thay đổi chỉ số trong công thức hóa học.",
        correctAnswer: false,
        explanation: "❌ Sai! KHÔNG được thay đổi chỉ số, chỉ được đặt hệ số trước công thức.",
        points: 10
      },
      {
        type: "multiple-choice",
        question: "Hệ số trong phương trình hóa học được viết ở đâu?",
        options: [
          "Viết nhỏ phía dưới",
          "Viết ngang bằng phía trước",
          "Viết nhỏ phía trên",
          "Viết trong ngoặc"
        ],
        correctAnswer: 1,
        explanation: "✅ Hệ số viết ngang bằng phía trước ký hiệu. VD: 2H₂O",
        points: 10
      },
      {
        type: "fill-in-blank",
        question: "Trong phương trình 2H₂ + O₂ → 2H₂O, tỉ lệ số mol H₂ : O₂ : H₂O = ___ : ___ : ___",
        correctAnswer: "2#1#2",
        hint: "💡 Tỉ lệ mol bằng tỉ lệ hệ số",
        explanation: "✅ Tỉ lệ mol = 2 : 1 : 2 (theo hệ số của phương trình)",
        points: 10
      }
    ],
    // 🔥 CẤP ĐỘ TRUNG BÌNH
    intermediate: [
      {
        type: "matching",
        question: "🔗 Ghép sơ đồ với phương trình đã cân bằng",
        pairs: [
          { left: "Fe + O₂ → Fe₃O₄", right: "3Fe + 2O₂ → Fe₃O₄" },
          { left: "Al + O₂ → Al₂O₃", right: "4Al + 3O₂ → 2Al₂O₃" },
          { left: "H₂ + O₂ → H₂O", right: "2H₂ + O₂ → 2H₂O" }
        ],
        explanation: "✅ Chính xác! Bạn đã cân bằng đúng các phương trình.",
        points: 15
      },
      {
        type: "ordering",
        question: "📋 Sắp xếp các bước lập phương trình hóa học",
        options: [
          "Viết sơ đồ phản ứng",
          "Cân bằng số nguyên tử mỗi nguyên tố",
          "Viết thành phương trình hóa học hoàn chỉnh"
        ],
        correctOrder: [
          "Viết sơ đồ phản ứng",
          "Cân bằng số nguyên tử mỗi nguyên tố",
          "Viết thành phương trình hóa học hoàn chỉnh"
        ],
        explanation: "✅ Đúng rồi! Đây là quy trình chuẩn để lập phương trình.",
        points: 15
      },
      {
        type: "multiple-choice",
        question: "Phương trình nào sau đây đã được cân bằng đúng?",
        options: [
          "P + O₂ → P₂O₅",
          "2P + O₂ → P₂O₅",
          "4P + 5O₂ → 2P₂O₅",
          "P + 5O₂ → 2P₂O₅"
        ],
        correctAnswer: 2,
        explanation: "✅ 4P + 5O₂ → 2P₂O₅ có số nguyên tử mỗi nguyên tố 2 vế bằng nhau.",
        points: 15
      },
      {
        type: "true-false",
        question: "Khi cân bằng phương trình, nên ưu tiên cân bằng nguyên tố có số nguyên tử lẻ trước.",
        correctAnswer: true,
        explanation: "✅ Đúng! Cân bằng số lẻ trước giúp tìm hệ số dễ dàng hơn.",
        points: 15
      },
      {
        type: "fill-in-blank",
        question: "Trong phương trình 4P + 5O₂ → 2P₂O₅, nếu có 0,8 mol P thì cần ___ mol O₂",
        correctAnswer: "1",
        hint: "💡 Tỉ lệ n_P : n_O₂ = 4 : 5",
        explanation: "✅ Theo tỉ lệ: 0,8/4 = n_O₂/5 → n_O₂ = 1 mol",
        points: 15
      }
    ],
    // ⚡ CẤP ĐỘ NÂNG CAO
    advanced: [
      {
        type: "drag-drop",
        question: "🧩 Phân loại các hành động khi cân bằng phương trình",
        inline: false,
        categories: ["Được phép", "KHÔNG được phép"],
        items: [
          { id: 1, text: "Đặt hệ số trước công thức", category: "Được phép" },
          { id: 2, text: "Thay đổi chỉ số trong công thức", category: "KHÔNG được phép" },
          { id: 3, text: "Cân bằng theo nhóm nguyên tử", category: "Được phép" },
          { id: 4, text: "Viết O₂ thành 2O", category: "KHÔNG được phép" }
        ],
        explanation: "✅ Xuất sắc! Bạn phân biệt rõ quy tắc cân bằng phương trình.",
        points: 20
      },
      {
        type: "multiple-choice",
        question: "Cân bằng phương trình: Fe + HCl → FeCl₃ + H₂. Hệ số của HCl là:",
        options: [
          "2",
          "3",
          "4",
          "6"
        ],
        correctAnswer: 3,
        explanation: "✅ 2Fe + 6HCl → 2FeCl₃ + 3H₂. Hệ số HCl = 6",
        points: 20
      },
      {
        type: "matching",
        question: "🧠 Ghép phương trình với tỉ lệ mol đúng",
        pairs: [
          { left: "N₂ + 3H₂ → 2NH₃", right: "n_N₂ : n_H₂ : n_NH₃ = 1:3:2" },
          { left: "4Al + 3O₂ → 2Al₂O₃", right: "n_Al : n_O₂ : n_Al₂O₃ = 4:3:2" },
          { left: "2Mg + O₂ → 2MgO", right: "n_Mg : n_O₂ : n_MgO = 2:1:2" }
        ],
        explanation: "✅ Tuyệt vời! Bạn hiểu rõ ý nghĩa của phương trình hóa học.",
        points: 20
      },
      {
        type: "fill-in-blank",
        question: "Cân bằng: C₃H₈ + O₂ → CO₂ + H₂O. Hệ số của O₂ là ___",
        correctAnswer: "5",
        hint: "💡 C₃H₈ + 5O₂ → 3CO₂ + 4H₂O",
        explanation: "✅ Phương trình: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O",
        points: 20
      },
      {
        type: "multiple-choice",
        question: "Trong phản ứng: 2Al + 3H₂SO₄ → Al₂(SO₄)₃ + 3H₂. Nếu dùng 5,4g Al thì thu được bao nhiêu lít H₂ (đktc)?",
        options: [
          "2,24 lít",
          "4,48 lít",
          "6,72 lít",
          "8,96 lít"
        ],
        correctAnswer: 2,
        explanation: "✅ n_Al = 5,4/27 = 0,2 mol → n_H₂ = 0,3 mol → V = 6,72 lít",
        points: 20
      }
    ]
  }
};
