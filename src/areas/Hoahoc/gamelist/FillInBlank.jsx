const FillInBlank = ({ quiz, userAnswer, isAnswered, onAnswer }) => {
  // Parse question text to render input at blank position
  const renderQuestionWithInput = () => {
    const questionText = quiz.question || '';
    // Split by blank marker (____)
    const parts = questionText.split(/(_{2,}|\.\.\.|\[\s*\])/);
    
    if (parts.length <= 1) {
      // No blank found, show input below question
      return (
        <div className="fill-in-blank-container">
          <p className="fill-in-blank-question">{questionText}</p>
          <input
            type="text"
            value={userAnswer || ''}
            onChange={(e) => onAnswer(e.target.value)}
            disabled={isAnswered}
            placeholder="Nhập câu trả lời..."
            className="fill-in-blank-input standalone"
            autoFocus
          />
        </div>
      );
    }
    
    // Render question with inline input
    let hasInsertedInput = false;
    return (
      <div className="fill-in-blank-container">
        <p className="fill-in-blank-question">
          {parts.map((part, index) => {
            // Check if this part is a blank marker
            if (!hasInsertedInput && /^(_{2,}|\.\.\.|\[\s*\])$/.test(part)) {
              hasInsertedInput = true;
              return (
                <span key={index} className="fill-in-blank-input-wrapper">
                  <input
                    type="text"
                    value={userAnswer || ''}
                    onChange={(e) => onAnswer(e.target.value)}
                    disabled={isAnswered}
                    placeholder="..."
                    className={`fill-in-blank-input inline ${
                      isAnswered 
                        ? userAnswer?.toString().trim().toLowerCase() === quiz.correctAnswer?.toString().trim().toLowerCase()
                          ? 'correct'
                          : 'wrong'
                        : ''
                    }`}
                    autoFocus
                    style={{ width: `${Math.max(80, (userAnswer?.length || 3) * 14 + 30)}px` }}
                  />
                </span>
              );
            }
            return <span key={index}>{part}</span>;
          })}
        </p>
      </div>
    );
  };

  return (
    <div className="fill-in-blank-wrapper">
      {renderQuestionWithInput()}
      
      {isAnswered && (
        <div className={`fill-in-blank-result ${
          userAnswer?.toString().trim().toLowerCase() === quiz.correctAnswer?.toString().trim().toLowerCase()
            ? 'correct'
            : 'wrong'
        }`}>
          Đáp án đúng: <strong>{quiz.correctAnswer}</strong>
        </div>
      )}
      {quiz.hint && !isAnswered && (
        <div className="fill-in-blank-hint">
          💡 Gợi ý: {quiz.hint}
        </div>
      )}
    </div>
  );
};

export default FillInBlank;
