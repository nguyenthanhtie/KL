const text1 = `Câu 1: Nguyên tử khối của Oxi là bao nhiêu?
A. 8 B. 16
C. 32 D. 1
Đáp án: B

Câu 2: Công thức hóa học của nước là gì? A. H2O2 B. HO2 C. H2O D. OH Đáp án: C`;

const text2 = `1
The city’s rapid expansion has led to ______ environmental degradation and the loss of natural habitats.
A. widespreadB. extendedC. stretchedD. expanded

4
Hardly ______ the lecture when the fire alarm went off.
A. had the professor begun B. the professor began C. began the professor D. the professor had begun`;

function parseTextToQuestions(text) {
  const qs = [];
  // Split blocks
  const blocks = text.split(/(?=^C[aâ]u\s*\d+|^Bài\s*\d+|^\d+[.:)\/]?\s|^(?:[A-Z]{2,}\s*)?\d+\r?\n)/gmi);
  
  for (let b of blocks) {
    b = b.trim();
    if (!b) continue;
    
    // Extract answer
    const ansMatch = b.match(/(?:Đ[aá]p\s*[aá]n|ĐA|=>|Trả lời|Key)[.:)\s]*([A-Da-d])/i);
    let ans = ansMatch ? ansMatch[1].toUpperCase() : null;
    if (ansMatch) b = b.replace(ansMatch[0], '').trim();
    
    // Extract options
    const optRegex = /([A-Da-d])[.)]\s+([\s\S]*?)(?=\s*[A-Da-d][.)]\s+|$)/gi;
    const options = [];
    let qText = b;
    let firstOptIdx = b.length;
    let m;
    
    while ((m = optRegex.exec(b)) !== null) {
      if (firstOptIdx === b.length) firstOptIdx = m.index;
      options.push(m[2].trim());
    }
    
    if (firstOptIdx < b.length) {
      qText = b.substring(0, firstOptIdx).trim();
    }
    
    // Strip prefixes like "Câu 1:", "1.", or "1\n"
    qText = qText.replace(/^(?:C[aâ]u\s*\d+|Bài\s*\d+|^\d+)[.:)\/]?\s*/i, '').trim();
    
    if (!qText) continue;

    const currentQ = {
      question: qText,
      type: 'multiple-choice',
      options: options,
      correctAnswer: ans ? ans.charCodeAt(0) - 65 : 0,
    };

    qs.push(currentQ);
  }
  
  return qs;
}

console.log("TEXT 1:");
console.dir(parseTextToQuestions(text1), {depth: null});
console.log("TEXT 2:");
console.dir(parseTextToQuestions(text2), {depth: null});
