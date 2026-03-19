import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight, RefreshCw, HelpCircle, BookOpen } from 'lucide-react';

const ModuleQuiz = ({ quizzes, onComplete, autoStart = false }) => {
  const [currentStep, setCurrentStep] = useState(autoStart ? 1 : 0); // 0: intro, 1: questions, 2: results
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState('');

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center text-yellow-700">
        Module này không có bài kiểm tra.
      </div>
    );
  }

  const startQuiz = () => {
    setCurrentStep(1);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setShowExplanation(false);
    setInputValue('');
  };

  const handleAnswer = (answer) => {
    if (showExplanation) return;

    const currentQuestion = quizzes[currentQuestionIndex];
    let isCorrect = false;

    if (currentQuestion.type === 'multiple-choice') {
      isCorrect = answer === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'true-false') {
      isCorrect = answer === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'fill-in-blank') {
      isCorrect = answer.toString().trim().toLowerCase() === currentQuestion.correctAnswer.toString().trim().toLowerCase();
    }
    
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      selected: answer,
      isCorrect
    };
    setAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
      setInputValue('');
    } else {
      setCurrentStep(2);
    }
  };

  const finishQuiz = () => {
    if (onComplete) {
      onComplete(score);
    }
  };

  if (currentStep === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Kiểm tra nhanh</h3>
        <p className="text-gray-500 mb-8">
          Hoàn thành {quizzes.length} câu hỏi để ôn lại kiến thức trong module này.
        </p>
        <button
          onClick={startQuiz}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all transform hover:scale-105"
        >
          Bắt đầu ngay
        </button>
      </div>
    );
  }

  if (currentStep === 1) {
    const question = quizzes[currentQuestionIndex];
    const userAnswer = answers[currentQuestionIndex];

    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden max-w-3xl mx-auto">
        {/* Progress bar */}
        <div className="h-2 bg-gray-100">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / quizzes.length) * 100}%` }}
          ></div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">
              Câu hỏi {currentQuestionIndex + 1} / {quizzes.length}
            </span>
            <span className="text-sm text-gray-400">
              Đúng: {score}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-8 leading-relaxed">
            {question.question}
          </h3>

          <div className="space-y-3 mb-8">
            {question.type === 'multiple-choice' && question.options?.map((option, idx) => {
              let className = "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ";
              
              if (showExplanation) {
                if (idx === question.correctAnswer) {
                  className += "border-green-500 bg-green-50 text-green-700 font-medium";
                } else if (userAnswer?.selected === idx) {
                  className += "border-red-500 bg-red-50 text-red-700";
                } else {
                  className += "border-gray-100 text-gray-400 opacity-50";
                }
              } else {
                className += "border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 text-gray-700";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showExplanation}
                  className={className}
                >
                  <span>{option}</span>
                  {showExplanation && idx === question.correctAnswer && <CheckCircle2 className="w-5 h-5" />}
                  {showExplanation && userAnswer?.selected === idx && idx !== question.correctAnswer && <XCircle className="w-5 h-5" />}
                </button>
              );
            })}

            {question.type === 'true-false' && (
              <div className="flex gap-4">
                {[true, false].map((val) => {
                  let className = "flex-1 py-6 rounded-2xl border-2 font-bold text-lg transition-all flex flex-col items-center gap-2 ";
                  const label = val ? "Đúng" : "Sai";
                  
                  if (showExplanation) {
                    if (val === question.correctAnswer) {
                      className += "border-green-500 bg-green-50 text-green-700";
                    } else if (userAnswer?.selected === val) {
                      className += "border-red-500 bg-red-50 text-red-700";
                    } else {
                      className += "border-gray-100 text-gray-400 opacity-50";
                    }
                  } else {
                    className += "border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 text-gray-700";
                  }

                  return (
                    <button
                      key={val.toString()}
                      onClick={() => handleAnswer(val)}
                      disabled={showExplanation}
                      className={className}
                    >
                      {val ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                      {label}
                    </button>
                  );
                })}
              </div>
            )}

            {question.type === 'fill-in-blank' && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={showExplanation}
                  placeholder="Nhập câu trả lời của bạn..."
                  className={`w-full p-4 rounded-xl border-2 outline-none transition-all text-lg ${
                    showExplanation 
                      ? (userAnswer?.isCorrect ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700')
                      : 'border-gray-100 focus:border-blue-500'
                  }`}
                />
                {!showExplanation && (
                  <button
                    onClick={() => handleAnswer(inputValue)}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
                  >
                    Kiểm tra
                  </button>
                )}
                {showExplanation && !userAnswer?.isCorrect && (
                  <p className="text-sm font-bold text-green-600 pl-2">Đáp án đúng: {question.correctAnswer}</p>
                )}
              </div>
            )}
          </div>

          {showExplanation && (
            <div className="bg-blue-50 rounded-xl p-6 mb-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex gap-3">
                <div className="mt-1">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-800 mb-1">Giải thích</h4>
                  <p className="text-blue-700 leading-relaxed">
                    {question.explanation || "Chúc mừng bạn đã hoàn thành câu hỏi này!"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {showExplanation && (
            <button
              onClick={nextQuestion}
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2"
            >
              Cánh cửa tiếp theo
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  const percentage = (score / quizzes.length) * 100;
  const isPassed = percentage >= 60;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-2xl mx-auto">
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
        isPassed ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
      }`}>
        {isPassed ? <CheckCircle2 className="w-10 h-10" /> : <RefreshCw className="w-10 h-10" />}
      </div>
      
      <h3 className="text-3xl font-bold text-gray-800 mb-2">
        {isPassed ? 'Tuyệt vời!' : 'Hố đen kiến thức!'}
      </h3>
      
      <p className="text-gray-500 mb-8">
        Bạn đã trả lời đúng <span className="font-bold text-blue-600">{score}/{quizzes.length}</span> câu hỏi.
      </p>

      <div className="flex gap-4 justify-center">
        <button
          onClick={startQuiz}
          className="px-6 py-3 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all"
        >
          Thử lại
        </button>
        <button
          onClick={finishQuiz}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all transform hover:scale-105"
        >
          Hoàn thành Module
        </button>
      </div>
    </div>
  );
};

export default ModuleQuiz;
