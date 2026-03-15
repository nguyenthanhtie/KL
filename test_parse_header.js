const text = `ADVANCED ENGLISH OLYMPIAD MCQ
Level: Grade 12 Gifted Students

1
The city’s rapid expansion has led to ______ environmental degradation and the loss of natural habitats.
A. widespreadB. extendedC. stretchedD. expanded
Đáp án: A`;

function parseTextToQuestions(text) {
  const qs = [];
  const blocks = text.split(/(?=^C[aâ]u\s*\d+|^Bài\s*\d+|^\d+[.:)\/]?\s|^(?:[A-Z]{2,}\s*)?\d+\r?\n)/gmi);
  
  for (let b of blocks) {
    b = b.trim();
    if (!b) continue;
    
    // Check if the block actually starts with a question identifier.
    // If it doesn't, it's a header/title.
    const isQuestionBlock = /^(?:C[aâ]u\s*\d+|Bài\s*\d+|^\d+[.:)\/]?\s|^(?:[A-Z]{2,}\s*)?\d+\r?\n)/i.test(b);
    if (!isQuestionBlock) {
      console.log('Skipping header block:', b.substring(0, 50).replace(/\n/g, ' '));
      continue;
    }
    
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
    
    // Phần trước lựa chọn đầu tiên là nội dung câu hỏi
    if (firstOptIdx < b.length) {
      qText = b.substring(0, firstOptIdx).trim();
    }
    
    // Bỏ tiếp đầu ngữ
    qText = qText.replace(/^(?:C[aâ]u\s*\d+|Bài\s*\d+|^\d+)[.:)\/]?\s*/i, '').trim();
    
    if (!qText) continue;

    const currentQ = {
      question: qText,
      type: 'multiple-choice',
      options: options,
      correctAnswer: ans ? ans.charCodeAt(0) - 65 : 0,
      points: 10,
      explanation: ''
    };

    qs.push(currentQ);
  }
  
  return qs;
}

console.dir(parseTextToQuestions(text), {depth: null});
