// ==================== AI QUESTION GENERATOR API ====================
const express = require('express');
const router = express.Router();

// Cache để lưu câu hỏi đã sinh (tránh gọi API lặp lại)
const questionCache = new Map();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 giờ

// Schema mẫu cho câu hỏi
const QUESTION_SCHEMA = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    category: { type: 'string' },
    type: { type: 'string', enum: ['multiple-choice', 'fill-blank'] },
    difficulty: { type: 'number', enum: [1, 2, 3] },
    question: { type: 'string' },
    options: { type: 'array', items: { type: 'string' } },
    correctAnswer: { type: 'string' },
    acceptedAnswers: { type: 'array', items: { type: 'string' } },
    explanation: { type: 'string' },
    hint: { type: 'string' }
  },
  required: ['id', 'category', 'type', 'difficulty', 'question', 'correctAnswer', 'explanation', 'hint']
};

// Cấu hình cho từng bài học
const LESSON_CONFIGS = {
  // ==================== LỚP 11 ====================
  'can_bang_phan_ung_11': {
    title: 'Cân bằng phản ứng nâng cao',
    grade: 11,
    categories: [
      { id: 'oxidation', name: 'Phản ứng Oxi hóa - Khử', description: 'Cân bằng electron trong phản ứng oxi hóa khử' },
      { id: 'acid-base', name: 'Phản ứng Axit - Bazơ', description: 'Phản ứng trung hòa và trao đổi ion' },
      { id: 'organic', name: 'Phản ứng Hữu cơ', description: 'Phản ứng đốt cháy và tổng hợp hữu cơ' },
      { id: 'complex', name: 'Phản ứng Phức tạp', description: 'Phản ứng nhiều chất và đa giai đoạn' }
    ],
    questionsPerCategory: 8,
    context: `
      Nội dung chính:
      - Phản ứng oxi hóa khử: Cân bằng electron, xác định chất khử/oxi hóa
      - Phản ứng axit-bazơ: Trung hòa, trao đổi ion, tạo kết tủa
      - Phản ứng đốt cháy hidrocacbon: CxHy + O2 → CO2 + H2O
      - Phản ứng nhiệt nhôm: Al + Fe2O3
      - KMnO4 trong môi trường axit, trung tính, kiềm
    `
  },
  'nito_luu_huynh_11': {
    title: 'Nitơ - Lưu huỳnh',
    grade: 11,
    categories: [
      { id: 'nitrogen', name: 'Nitơ & Hợp chất', description: 'N2, NH3, HNO3, muối nitrat' },
      { id: 'sulfur', name: 'Lưu huỳnh & Hợp chất', description: 'S, H2S, SO2, H2SO4' },
      { id: 'reactions', name: 'Phản ứng đặc trưng', description: 'Phản ứng oxi hóa-khử, nhiệt phân' },
      { id: 'applications', name: 'Ứng dụng thực tế', description: 'Công nghiệp, nông nghiệp, đời sống' }
    ],
    questionsPerCategory: 8,
    context: `
      Nitơ: N2 (liên kết ba bền), NH3 (tính bazơ yếu, tính khử), HNO3 (tính oxi hóa mạnh), muối nitrat (nhiệt phân)
      Lưu huỳnh: S (thù hình), H2S (khử mạnh, độc), SO2 (vừa oxi hóa vừa khử), H2SO4 đặc (háo nước, oxi hóa mạnh)
      Quy trình Ostwald điều chế HNO3, phương pháp tiếp xúc điều chế H2SO4
    `
  },
  'dai_cuong_hoa_huu_co_11': {
    title: 'Đại cương Hóa Hữu cơ',
    grade: 11,
    categories: [
      { id: 'concepts', name: 'Khái niệm & Phân loại', description: 'Hợp chất hữu cơ, nhóm chức, đồng đẳng' },
      { id: 'structure', name: 'Cấu trúc phân tử', description: 'Liên kết hóa học, đồng phân, cấu tạo' },
      { id: 'reactions', name: 'Phản ứng hữu cơ', description: 'Phản ứng thế, cộng, tách' },
      { id: 'analysis', name: 'Phân tích nguyên tố', description: 'Công thức đơn giản nhất, CTPT' }
    ],
    questionsPerCategory: 8,
    context: `
      Hợp chất hữu cơ (chứa C, trừ CO, CO2, muối cacbonat...), nhóm chức (-OH, -CHO, -COOH, -NH2)
      Đồng đẳng (cùng CTTQ, hơn kém CH2), đồng phân (cùng CTPT, khác CTCT)
      Liên kết sigma, pi; Cacbon hóa trị IV; CTĐGN và CTPT
    `
  },
  'hidrocacbon_11': {
    title: 'Hidrocacbon',
    grade: 11,
    categories: [
      { id: 'alkan', name: 'Ankan (Parafin)', description: 'Hidrocacbon no, mạch hở (CnH2n+2)' },
      { id: 'unsaturated', name: 'Anken & Ankin', description: 'Hidrocacbon không no (C=C, C≡C)' },
      { id: 'aromatic', name: 'Hidrocacbon Thơm', description: 'Benzen và đồng đẳng (Vòng benzen)' },
      { id: 'sources', name: 'Nguồn Hidrocacbon', description: 'Dầu mỏ, khí thiên nhiên, than đá' }
    ],
    questionsPerCategory: 8,
    context: `
      Ankan CnH2n+2: no, mạch hở, phản ứng thế, cracking
      Anken CnH2n: liên kết đôi, phản ứng cộng, trùng hợp
      Ankin CnH2n-2: liên kết ba, phản ứng cộng, phản ứng thế H linh động
      Benzen C6H6: vòng thơm, phản ứng thế, cộng khó
      Dầu mỏ: chưng cất phân đoạn, cracking, reforming
    `
  },
  'dan_xuat_halogen_ancol_phenol_11': {
    title: 'Dẫn xuất Halogen - Ancol - Phenol',
    grade: 11,
    categories: [
      { id: 'halogen', name: 'Dẫn xuất Halogen', description: 'R-X, tính chất và ứng dụng' },
      { id: 'alcohol', name: 'Ancol (Rượu)', description: 'R-OH, phân loại, đồng phân, danh pháp' },
      { id: 'phenol', name: 'Phenol', description: 'C6H5OH, tính axit, phản ứng thế' },
      { id: 'reactions', name: 'Phản ứng & Nhận biết', description: 'Phản ứng đặc trưng, thuốc thử' }
    ],
    questionsPerCategory: 8,
    context: `
      Dẫn xuất halogen R-X: phản ứng thế, tách HX
      Ancol R-OH: tính chất của nhóm -OH, oxi hóa, este hóa, tách nước
      Phenol C6H5OH: tính axit yếu (mạnh hơn ancol), phản ứng thế vòng benzen
      Nhận biết: Na (ancol), NaOH (phenol), nước brom (phenol)
    `
  },
  'hop_chat_carbonyl_carboxylic_11': {
    title: 'Hợp chất Carbonyl - Carboxylic',
    grade: 11,
    categories: [
      { id: 'carbonyl', name: 'Aldehit & Xeton', description: 'Hợp chất chứa nhóm >C=O' },
      { id: 'carboxylic', name: 'Axit Cacboxylic', description: 'Hợp chất chứa nhóm -COOH' },
      { id: 'reactions', name: 'Phản ứng đặc trưng', description: 'Tráng bạc, este hóa, oxi hóa' },
      { id: 'applications', name: 'Ứng dụng & Điều chế', description: 'Thực phẩm, dược phẩm, công nghiệp' }
    ],
    questionsPerCategory: 8,
    context: `
      Aldehit R-CHO: tính khử (tráng bạc, Fehling), tính oxi hóa yếu
      Xeton R-CO-R': không tráng bạc, cộng H2
      Axit cacboxylic R-COOH: tính axit, este hóa, phản ứng với bazơ
      HCHO, CH3CHO, CH3COOH, HCOOH là các chất quan trọng
    `
  },
  'hoa_hoc_cuoc_song_11': {
    title: 'Hóa học với cuộc sống',
    grade: 11,
    categories: [
      { id: 'environment', name: 'Hóa học & Môi trường', description: 'Ô nhiễm, xử lý chất thải, hóa học xanh' },
      { id: 'energy', name: 'Năng lượng & Nhiên liệu', description: 'Nhiên liệu hóa thạch, năng lượng tái tạo' },
      { id: 'materials', name: 'Vật liệu mới', description: 'Polime, compozit, vật liệu nano' },
      { id: 'health', name: 'Hóa học & Sức khỏe', description: 'Thuốc, thực phẩm, an toàn vệ sinh' }
    ],
    questionsPerCategory: 8,
    context: `
      Môi trường: CO2 (hiệu ứng nhà kính), SO2/NOx (mưa axit), CFC (tầng ozon)
      Năng lượng: nhiên liệu hóa thạch, năng lượng mặt trời/gió/sinh học
      Vật liệu: polime (PE, PP, PVC), compozit, vật liệu nano
      Sức khỏe: thuốc kháng sinh, vitamin, phụ gia thực phẩm
    `
  },

  // ==================== LỚP 12 ====================
  'este_lipit_12': {
    title: 'Este và Lipit',
    grade: 12,
    categories: [
      { id: 'este', name: 'Este', description: 'Cấu tạo, danh pháp, tính chất của este' },
      { id: 'reactions', name: 'Phản ứng Este', description: 'Thủy phân, xà phòng hóa, điều chế' },
      { id: 'lipid', name: 'Chất béo (Lipit)', description: 'Cấu tạo, tính chất của triglixerit' },
      { id: 'applications', name: 'Ứng dụng thực tế', description: 'Xà phòng, chất tẩy rửa, thực phẩm' }
    ],
    questionsPerCategory: 8,
    context: `
      Este R-COO-R': CTPT CnH2nO2 (no, đơn chức), thủy phân/xà phòng hóa
      Chất béo: este của glixerol và axit béo, triglixerit
      Xà phòng hóa: Este + NaOH → Muối + Ancol
      Chỉ số axit, chỉ số xà phòng hóa, chỉ số iot
    `
  },
  'cacbohidrat_12': {
    title: 'Cacbohiđrat',
    grade: 12,
    categories: [
      { id: 'glucose', name: 'Glucozơ', description: 'Cấu tạo, tính chất của glucozơ' },
      { id: 'saccharose', name: 'Saccarozơ', description: 'Đường mía - disaccarit' },
      { id: 'starch', name: 'Tinh bột', description: 'Polisaccarit dự trữ năng lượng' },
      { id: 'cellulose', name: 'Xenlulozơ', description: 'Polisaccarit cấu trúc' }
    ],
    questionsPerCategory: 8,
    context: `
      Glucozơ C6H12O6: aldozơ, tráng bạc, lên men rượu
      Fructozơ: xeton, đồng phân glucozơ
      Saccarozơ C12H22O11: đường đôi, thủy phân tạo glucozơ + fructozơ
      Tinh bột (C6H10O5)n: polisaccarit, thủy phân, phản ứng màu với I2
      Xenlulozơ: cấu trúc thực vật, điều chế tơ axetat, nitro xenlulozơ
    `
  },
  'amin_aminoaxit_protein_12': {
    title: 'Amin - Amino axit - Protein',
    grade: 12,
    categories: [
      { id: 'amin', name: 'Amin', description: 'Cấu tạo, tính chất, phân loại amin' },
      { id: 'aminoaxit', name: 'Amino axit', description: 'Cấu tạo, tính chất, phản ứng amino axit' },
      { id: 'protein', name: 'Protein', description: 'Cấu trúc, vai trò, thủy phân protein' }
    ],
    questionsPerCategory: 8,
    context: `
      Amin R-NH2: tính bazơ, phản ứng với axit, amin bậc 1/2/3
      Amino axit: lưỡng tính (có -NH2 và -COOH), tạo muối nội, trùng ngưng
      Protein: polipeptit, cấu trúc bậc 1-4, biến tính, thủy phân
      Glisin, alanin, phenylalanin là các amino axit thiết yếu
    `
  },
  'polime_12': {
    title: 'Polime',
    grade: 12,
    categories: [
      { id: 'khainiemcautruc', name: 'Khái niệm & Cấu trúc', description: 'Định nghĩa, phân loại, cấu trúc polime' },
      { id: 'phanungtonghoip', name: 'Phản ứng tổng hợp', description: 'Trùng hợp, trùng ngưng, đồng trùng hợp' },
      { id: 'chatdeo', name: 'Chất dẻo', description: 'PE, PP, PVC, PS, và các loại nhựa' },
      { id: 'tovaocaosu', name: 'Tơ & Cao su', description: 'Tơ tổng hợp, tơ bán tổng hợp, cao su' }
    ],
    questionsPerCategory: 8,
    context: `
      Polime: hệ số trùng hợp n, mắt xích, cấu trúc mạch
      Trùng hợp: nCH2=CH2 → (-CH2-CH2-)n (PE)
      Trùng ngưng: có loại phân tử nhỏ (H2O)
      PE, PP, PVC, PS, PVA, PMMA là các chất dẻo phổ biến
      Tơ: nilon-6, nilon-6,6, tơ lapsan, tơ visco
      Cao su: buna, buna-S, buna-N
    `
  },
  'dai_cuong_kim_loai_12': {
    title: 'Đại cương về Kim loại',
    grade: 12,
    categories: [
      { id: 'cautao', name: 'Cấu tạo & Tính chất vật lý', description: 'Vị trí, cấu tạo nguyên tử, tinh thể' },
      { id: 'tinhchathoahoc', name: 'Tính chất hóa học', description: 'Tác dụng với phi kim, axit, muối, nước' },
      { id: 'daydienhoa', name: 'Dãy điện hóa', description: 'Cặp oxi hóa - khử, quy tắc alpha, pin điện hóa' },
      { id: 'anmon', name: 'Ăn mòn & Điều chế', description: 'Ăn mòn hóa học, điện hóa, các phương pháp điều chế' }
    ],
    questionsPerCategory: 8,
    context: `
      Kim loại: tính dẻo, dẫn điện, dẫn nhiệt, ánh kim
      Dãy điện hóa: K Na Ca Mg Al Zn Fe Ni Sn Pb H Cu Hg Ag Pt Au
      Quy tắc alpha: Chất oxi hóa mạnh + Chất khử mạnh → Chất yếu hơn
      Ăn mòn hóa học vs điện hóa
      Điều chế: nhiệt luyện, thủy luyện, điện phân
    `
  },
  'sat_dong_hop_kim_12': {
    title: 'Sắt - Đồng và Hợp kim',
    grade: 12,
    categories: [
      { id: 'sat', name: 'Sắt (Fe)', description: 'Tính chất vật lý, hóa học, điều chế và ứng dụng' },
      { id: 'dong', name: 'Đồng (Cu)', description: 'Tính chất, hợp chất, phản ứng và ứng dụng' },
      { id: 'hopkim', name: 'Hợp kim', description: 'Gang, thép, đồng thau, bronze' },
      { id: 'ungdung', name: 'Ứng dụng thực tiễn', description: 'Ứng dụng kim loại trong đời sống' },
      { id: 'phanung', name: 'Chuỗi phản ứng & Nhận biết', description: 'Nhận biết ion, chuỗi phản ứng Fe và Cu' }
    ],
    questionsPerCategory: 8,
    context: `
      Sắt: Fe2+/Fe3+, oxit (FeO, Fe2O3, Fe3O4), muối sắt
      Gang (2-5% C), thép (<2% C), inox (Cr, Ni)
      Đồng: Cu+/Cu2+, màu đỏ ánh kim, dẫn điện tốt
      Đồng thau (Cu-Zn), đồng thiếc/bronze (Cu-Sn)
      Điều chế: lò cao, điện phân, nhiệt luyện
    `
  },
  'kim_loai_kiem_kiem_tho_nhom_12': {
    title: 'Kim loại Kiềm - Kiềm thổ - Nhôm',
    grade: 12,
    categories: [
      { id: 'kiem', name: 'Kim loại Kiềm', description: 'Nhóm IA: Li, Na, K, Rb, Cs' },
      { id: 'kiemtho', name: 'Kim loại Kiềm thổ', description: 'Nhóm IIA: Be, Mg, Ca, Sr, Ba' },
      { id: 'nhom', name: 'Nhôm & Hợp chất', description: 'Al, Al2O3, Al(OH)3, phèn chua, nhiệt nhôm' },
      { id: 'nuoc', name: 'Nước cứng & Nhận biết', description: 'Phân loại, làm mềm nước cứng, nhận biết ion' }
    ],
    questionsPerCategory: 8,
    context: `
      Kim loại kiềm IA (ns1): tính khử mạnh, điện phân nóng chảy để điều chế
      NaOH (xút), Na2CO3 (soda), NaHCO3 (baking soda)
      Kim loại kiềm thổ IIA (ns2): Ca(OH)2 (vôi), CaCO3 (đá vôi), thạch cao
      Nhôm: lưỡng tính (Al2O3, Al(OH)3), nhiệt nhôm, bauxite
      Nước cứng: tạm thời (HCO3-), vĩnh cửu (Cl-, SO42-)
    `
  }
};

// Hàm tạo prompt cho AI
function createPrompt(lessonId, categoryId, count = 5) {
  const config = LESSON_CONFIGS[lessonId];
  if (!config) {
    throw new Error(`Unknown lesson: ${lessonId}`);
  }

  const category = config.categories.find(c => c.id === categoryId);
  if (!category) {
    throw new Error(`Unknown category: ${categoryId}`);
  }

  return `Bạn là chuyên gia Hóa học lớp ${config.grade} Việt Nam. Hãy tạo ${count} câu hỏi trắc nghiệm về chủ đề "${category.name}" (${category.description}) trong bài "${config.title}".

KIẾN THỨC THAM KHẢO:
${config.context}

YÊU CẦU:
1. Mỗi câu hỏi phải chính xác về mặt khoa học
2. Phân bố độ khó: 3 câu dễ (difficulty: 1), 3 câu trung bình (difficulty: 2), 2 câu khó (difficulty: 3)
3. Câu hỏi phải đa dạng: không lặp lại ý
4. Giải thích phải rõ ràng, ngắn gọn, giúp học sinh hiểu bài
5. Gợi ý (hint) phải hữu ích nhưng không lộ đáp án

TRẢ VỀ ĐÚNG ĐỊNH DẠNG JSON (không có text khác):
[
  {
    "id": 1,
    "category": "${categoryId}",
    "type": "multiple-choice",
    "difficulty": 1,
    "question": "Câu hỏi...",
    "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
    "correctAnswer": "Đáp án đúng (phải trùng với 1 trong 4 options)",
    "explanation": "Giải thích tại sao đáp án đó đúng...",
    "hint": "Gợi ý ngắn gọn..."
  }
]

Với câu hỏi điền khuyết (fill-blank), dùng format:
{
  "type": "fill-blank",
  "question": "Câu hỏi có chỗ trống ___",
  "correctAnswer": "đáp án",
  "acceptedAnswers": ["đáp án", "đáp án viết khác"],
  "options": null
}`;
}

// Hàm gọi AI API (hỗ trợ nhiều provider)
async function callAI(prompt, provider = 'aimlapi') {
  const providers = {
    // AIML API - OpenAI SDK compatible (aimlapi.com)
    aimlapi: async () => {
      const apiKey = process.env.AIML_API_KEY;
      if (!apiKey) throw new Error('AIML_API_KEY not configured');

      // Try multiple models for fallback
      const models = ['gpt-4o-mini', 'gpt-4o', 'deepseek-chat', 'mistralai/Mistral-7B-Instruct-v0.2'];
      
      for (const modelName of models) {
        try {
          const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: modelName,
              messages: [
                { role: 'system', content: 'Bạn là trợ lý tạo câu hỏi Hóa học chính xác. Chỉ trả về JSON, không có text khác.' },
                { role: 'user', content: prompt }
              ],
              temperature: 0.3,
              max_tokens: 3000
            })
          });

          if (response.ok) {
            const data = await response.json();
            console.log(`✅ AIML API model ${modelName} succeeded`);
            return data.choices[0].message.content;
          }
          
          const error = await response.json();
          const errorMsg = error.error?.message || response.statusText;
          
          // If quota/rate limit exceeded, try next model
          if (errorMsg.includes('quota') || errorMsg.includes('limit') || errorMsg.includes('rate')) {
            console.log(`⚠️ Model ${modelName} limit reached, trying next...`);
            continue;
          }
          
          // If model not found, try next
          if (errorMsg.includes('not found') || errorMsg.includes('not supported') || errorMsg.includes('invalid')) {
            console.log(`⚠️ Model ${modelName} not available, trying next...`);
            continue;
          }
          
          // Other errors, throw
          throw new Error(`AIML API error: ${errorMsg}`);
        } catch (fetchError) {
          if (fetchError.message.includes('AIML API error')) {
            throw fetchError;
          }
          // Network error, try next model
          console.log(`⚠️ Model ${modelName} fetch error:`, fetchError.message);
          continue;
        }
      }
      
      // All models failed
      throw new Error('All AIML API models failed. Please check your API key or try again later.');
    },

    openai: async () => {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) throw new Error('OPENAI_API_KEY not configured');

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'Bạn là trợ lý tạo câu hỏi Hóa học chính xác. Chỉ trả về JSON, không có text khác.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.3,
          max_tokens: 2500
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    },

    gemini: async () => {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

      // Try multiple models if quota exceeded - using latest available models
      const models = ['gemini-2.5-flash-lite', 'gemini-2.5-flash', 'gemini-3-flash', 'gemini-2.0-flash'];
      
      for (const modelName of models) {
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { 
                temperature: 0.2, 
                maxOutputTokens: 4096,
                responseMimeType: "application/json"
              }
            })
          });

          if (response.ok) {
            const data = await response.json();
            console.log(`✅ Gemini model ${modelName} succeeded`);
            return data.candidates[0].content.parts[0].text;
          }
          
          const error = await response.json();
          const errorMsg = error.error?.message || response.statusText;
          
          // If quota exceeded, try next model
          if (errorMsg.includes('quota') || errorMsg.includes('Quota')) {
            console.log(`⚠️ Model ${modelName} quota exceeded, trying next...`);
            continue;
          }
          
          // If model not found, try next
          if (errorMsg.includes('not found') || errorMsg.includes('not supported')) {
            console.log(`⚠️ Model ${modelName} not available, trying next...`);
            continue;
          }
          
          // Other errors, throw
          throw new Error(`Gemini API error: ${errorMsg}`);
        } catch (fetchError) {
          if (fetchError.message.includes('Gemini API error')) {
            throw fetchError;
          }
          // Network error, try next model
          console.log(`⚠️ Model ${modelName} fetch error:`, fetchError.message);
          continue;
        }
      }
      
      // All models failed
      throw new Error('All Gemini models quota exceeded. Please try again later or use a different API provider.');
    },

    // Fallback: trả về câu hỏi mẫu nếu không có API key
    fallback: async () => {
      return JSON.stringify(generateFallbackQuestions(prompt));
    }
  };

  const providerFn = providers[provider] || providers.fallback;
  return await providerFn();
}

// Câu hỏi mẫu fallback khi không có API key
function generateFallbackQuestions(prompt) {
  // Extract category từ prompt
  const categoryMatch = prompt.match(/"category": "([^"]+)"/);
  const category = categoryMatch ? categoryMatch[1] : 'concepts';

  return [
    {
      id: 1,
      category,
      type: 'multiple-choice',
      difficulty: 1,
      question: 'Đây là câu hỏi mẫu. Vui lòng cấu hình OPENAI_API_KEY hoặc GEMINI_API_KEY để sinh câu hỏi bằng AI.',
      options: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'],
      correctAnswer: 'Đáp án A',
      explanation: 'Cần cấu hình API key trong file .env để sử dụng tính năng sinh câu hỏi AI.',
      hint: 'Kiểm tra file .env'
    }
  ];
}

// Validate và clean dữ liệu từ AI
function validateAndCleanQuestions(questions, categoryId) {
  if (!Array.isArray(questions)) {
    throw new Error('AI response is not an array');
  }

  return questions.map((q, index) => {
    // Validate required fields
    if (!q.question || !q.correctAnswer) {
      throw new Error(`Question ${index + 1} missing required fields`);
    }

    // Validate multiple-choice có correctAnswer trong options
    if (q.type === 'multiple-choice' && q.options) {
      if (!q.options.includes(q.correctAnswer)) {
        // Tự động sửa: thêm correctAnswer vào options
        q.options[0] = q.correctAnswer;
      }
      // Đảm bảo có 4 options
      while (q.options.length < 4) {
        q.options.push(`Đáp án ${String.fromCharCode(65 + q.options.length)}`);
      }
    }

    return {
      id: index + 1,
      category: categoryId,
      type: q.type || 'multiple-choice',
      difficulty: Math.min(3, Math.max(1, q.difficulty || 1)),
      question: q.question.trim(),
      options: q.options || null,
      correctAnswer: q.correctAnswer.trim(),
      acceptedAnswers: q.acceptedAnswers || [q.correctAnswer.trim()],
      explanation: q.explanation?.trim() || 'Xem lại kiến thức trong bài học.',
      hint: q.hint?.trim() || 'Hãy suy nghĩ kỹ.'
    };
  });
}

// Parse JSON từ response AI (xử lý các trường hợp AI trả về không clean)
function parseAIResponse(text) {
  // Bước 1: Clean up text
  let cleaned = text.trim();
  
  // Remove markdown code blocks
  cleaned = cleaned.replace(/```json\s*/gi, '').replace(/```\s*/g, '');
  
  // Remove any leading/trailing non-JSON text
  cleaned = cleaned.replace(/^[^[\{]*/, ''); // Remove text before [ or {
  cleaned = cleaned.replace(/[^\]\}]*$/, ''); // Remove text after ] or }
  
  // Thử parse trực tiếp
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    // Bước 2: Tìm JSON array trong text
    const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      let jsonStr = jsonMatch[0];
      
      // Fix common JSON issues
      // Remove trailing commas before ] or }
      jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');
      // Fix unescaped newlines in strings
      jsonStr = jsonStr.replace(/([^\\])\n/g, '$1\\n');
      // Fix control characters
      jsonStr = jsonStr.replace(/[\x00-\x1F\x7F]/g, (c) => {
        if (c === '\n') return '\\n';
        if (c === '\t') return '\\t';
        if (c === '\r') return '';
        return '';
      });
      
      try {
        return JSON.parse(jsonStr);
      } catch (e2) {
        // Try a more aggressive cleanup
        // Remove any invalid escape sequences
        jsonStr = jsonStr.replace(/\\(?!["\\/bfnrtu])/g, '\\\\');
        
        try {
          return JSON.parse(jsonStr);
        } catch (e3) {
          // Last resort: try to extract individual objects
          const objMatches = jsonStr.matchAll(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g);
          const objects = [];
          for (const match of objMatches) {
            try {
              objects.push(JSON.parse(match[0]));
            } catch {}
          }
          if (objects.length > 0) return objects;
        }
      }
    }

    throw new Error('Cannot parse AI response as JSON: ' + e.message);
  }
}

// ==================== API ENDPOINTS ====================

// GET /api/ai-questions/lessons - Danh sách bài học có hỗ trợ AI
router.get('/lessons', (req, res) => {
  const lessons = Object.entries(LESSON_CONFIGS).map(([id, config]) => ({
    id,
    title: config.title,
    grade: config.grade,
    categories: config.categories
  }));
  res.json({ success: true, lessons });
});

// GET /api/ai-questions/generate/:lessonId/:categoryId - Sinh câu hỏi cho 1 category
router.get('/generate/:lessonId/:categoryId', async (req, res) => {
  try {
    const { lessonId, categoryId } = req.params;
    const count = parseInt(req.query.count) || 5;
    const forceRefresh = req.query.refresh === 'true';
    const provider = req.query.provider || process.env.AI_PROVIDER || 'openai';

    // Check cache
    const cacheKey = `${lessonId}_${categoryId}_${count}`;
    if (!forceRefresh && questionCache.has(cacheKey)) {
      const cached = questionCache.get(cacheKey);
      if (Date.now() - cached.timestamp < CACHE_DURATION) {
        return res.json({ 
          success: true, 
          questions: cached.questions,
          cached: true,
          generatedAt: new Date(cached.timestamp).toISOString()
        });
      }
    }

    // Generate new questions
    const prompt = createPrompt(lessonId, categoryId, count);
    const aiResponse = await callAI(prompt, provider);
    const rawQuestions = parseAIResponse(aiResponse);
    const questions = validateAndCleanQuestions(rawQuestions, categoryId);

    // Cache results
    questionCache.set(cacheKey, {
      questions,
      timestamp: Date.now()
    });

    res.json({ 
      success: true, 
      questions,
      cached: false,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Question Generation Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      hint: 'Kiểm tra API key trong .env hoặc thử lại sau.'
    });
  }
});

// GET /api/ai-questions/generate/:lessonId - Sinh câu hỏi cho tất cả categories
router.get('/generate/:lessonId', async (req, res) => {
  try {
    const { lessonId } = req.params;
    const forceRefresh = req.query.refresh === 'true';
    const provider = req.query.provider || process.env.AI_PROVIDER || 'openai';

    const config = LESSON_CONFIGS[lessonId];
    if (!config) {
      return res.status(404).json({ success: false, error: `Unknown lesson: ${lessonId}` });
    }

    const allQuestions = [];
    let questionId = 1;
    const errors = [];

    for (const category of config.categories) {
      const cacheKey = `${lessonId}_${category.id}_5`;
      
      let questions;
      if (!forceRefresh && questionCache.has(cacheKey)) {
        const cached = questionCache.get(cacheKey);
        if (Date.now() - cached.timestamp < CACHE_DURATION) {
          questions = cached.questions;
        }
      }

      if (!questions) {
        try {
          const prompt = createPrompt(lessonId, category.id, config.questionsPerCategory);
          const aiResponse = await callAI(prompt, provider);
          const rawQuestions = parseAIResponse(aiResponse);
          questions = validateAndCleanQuestions(rawQuestions, category.id);

          questionCache.set(cacheKey, {
            questions,
            timestamp: Date.now()
          });
        } catch (catError) {
          console.error(`Error generating category ${category.id}:`, catError.message);
          errors.push({ category: category.id, error: catError.message });
          continue; // Skip this category, continue with others
        }
      }

      // Re-number questions
      questions.forEach(q => {
        q.id = questionId++;
        allQuestions.push(q);
      });
    }

    // Return success even if some categories failed (as long as we have some questions)
    if (allQuestions.length > 0) {
      res.json({ 
        success: true, 
        questions: allQuestions,
        totalQuestions: allQuestions.length,
        categories: config.categories,
        generatedAt: new Date().toISOString(),
        errors: errors.length > 0 ? errors : undefined
      });
    } else {
      // All categories failed - return empty with flag so frontend uses fallback
      res.json({ 
        success: true,
        questions: [],
        totalQuestions: 0,
        categories: config.categories,
        generatedAt: new Date().toISOString(),
        aiUnavailable: true,
        message: 'AI service temporarily unavailable. Please use offline questions.',
        errors: errors
      });
    }

  } catch (error) {
    console.error('AI Question Generation Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// POST /api/ai-questions/clear-cache - Xóa cache
router.post('/clear-cache', (req, res) => {
  const { lessonId } = req.body;
  
  if (lessonId) {
    // Xóa cache của 1 lesson
    for (const key of questionCache.keys()) {
      if (key.startsWith(lessonId)) {
        questionCache.delete(key);
      }
    }
  } else {
    // Xóa tất cả
    questionCache.clear();
  }

  res.json({ success: true, message: 'Cache cleared' });
});

// ==================== DỰ ĐOÁN SẢN PHẨM PHẢN ỨNG HÓA HỌC BẰNG AI ====================
router.post('/predict-products', async (req, res) => {
  try {
    const { reactants } = req.body;
    
    if (!reactants || reactants.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Vui lòng nhập chất tham gia' 
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        success: false, 
        error: 'API key chưa được cấu hình' 
      });
    }

    const prompt = `Bạn là chuyên gia hóa học. Cho các chất tham gia sau: ${reactants}

Hãy dự đoán sản phẩm của phản ứng hóa học này.

QUY TẮC:
1. Chỉ trả về sản phẩm, KHÔNG cân bằng hệ số
2. Nếu có nhiều sản phẩm, ngăn cách bằng dấu +
3. Viết công thức hóa học chuẩn (ví dụ: H2O, CO2, NaCl, Fe2O3)
4. Nếu không có phản ứng hoặc không xác định được, trả về "NONE"
5. Chỉ trả về công thức sản phẩm, KHÔNG giải thích

VÍ DỤ:
- Input: Fe + O2 → Output: Fe2O3
- Input: NaOH + HCl → Output: NaCl + H2O
- Input: CaCO3 + HCl → Output: CaCl2 + H2O + CO2
- Input: CH4 + O2 → Output: CO2 + H2O
- Input: Au + HCl → Output: NONE

Trả lời (CHỈ công thức sản phẩm hoặc NONE):`;

    console.log('Calling Gemini API with reactants:', reactants);
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { 
            temperature: 0.1, 
            maxOutputTokens: 100 
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error status:', response.status);
      console.error('Gemini API error details:', JSON.stringify(errorData, null, 2));
      return res.status(500).json({ 
        success: false, 
        error: 'Lỗi khi gọi AI API',
        details: errorData.error?.message || 'Unknown error'
      });
    }

    const data = await response.json();
    console.log('Gemini API response:', JSON.stringify(data, null, 2));
    let products = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!products || products === 'NONE' || products.toLowerCase().includes('none')) {
      return res.json({ 
        success: false, 
        error: 'Không tìm thấy phản ứng phù hợp',
        notFound: true
      });
    }

    // Làm sạch kết quả (loại bỏ text thừa nếu có)
    products = products
      .replace(/^(Output:|Sản phẩm:|Products:)/i, '')
      .replace(/\n.*/g, '') // Chỉ lấy dòng đầu
      .trim();

    res.json({ 
      success: true, 
      products,
      source: 'ai'
    });

  } catch (error) {
    console.error('Predict products error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Lỗi server khi dự đoán sản phẩm' 
    });
  }
});

module.exports = router;
