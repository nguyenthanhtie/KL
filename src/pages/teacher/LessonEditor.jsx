import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../config/api';
import TheoryEditor from '../../components/teacher/TheoryEditor';
import {
  BookOpen,
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  FileText,
  Gamepad2,
  AlertCircle,
  Check,
  HelpCircle,
  ListOrdered,
  ToggleLeft,
  Type,
  Columns,
  ArrowUpDown,
  Video,
  Layout,
  Settings,
  List,
  Clock,
  Tag,
  ChevronRight
} from 'lucide-react';

// Quiz type options
const QUIZ_TYPES = [
  { value: 'multiple-choice', label: 'Trắc nghiệm', icon: ListOrdered },
  { value: 'true-false', label: 'Đúng/Sai', icon: ToggleLeft },
  { value: 'fill-in-blank', label: 'Điền vào chỗ trống', icon: Type },
  { value: 'matching', label: 'Nối cặp', icon: Columns },
  { value: 'ordering', label: 'Sắp xếp', icon: ArrowUpDown }
];

// Quiz level tabs
const QUIZ_LEVELS = [
  { key: 'basic', label: 'Cơ bản', points: 10 },
  { key: 'intermediate', label: 'Trung bình', points: 15 },
  { key: 'advanced', label: 'Nâng cao', points: 20 }
];

const LessonEditor = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditing = !!lessonId;
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('info'); // info, theory, quiz, modules
  const [activeQuizLevel, setActiveQuizLevel] = useState('basic');
  
  // Form data
  const [formData, setFormData] = useState({
    classId: 10,
    curriculumType: 'ketnoi',
    chapterId: 1,
    chapterName: '',
    lessonId: 1,
    title: '',
    description: '',
    level: 'Beginner',
    order: 1,
    theoryModules: [],
    game: {
      basic: [],
      intermediate: [],
      advanced: []
    },
    modules: []
  });

  // Load lesson data if editing
  useEffect(() => {
    if (isEditing) {
      fetchLesson();
    }
  }, [lessonId]);

  const fetchLesson = async () => {
    try {
      const response = await api.get(`/teacher/lessons/${lessonId}`);
      if (response.data.success) {
        const lesson = response.data.lesson;
        
        // Handle different game structures
        // Some lessons use game.quizzes (single level), others use game.basic/intermediate/advanced
        let gameData = {
          basic: [],
          intermediate: [],
          advanced: []
        };
        
        if (lesson.game) {
          // If lesson uses quizzes array (single level structure)
          if (lesson.game.quizzes && lesson.game.quizzes.length > 0) {
            gameData.basic = lesson.game.quizzes;
          }
          // If lesson uses basic/intermediate/advanced structure
          if (lesson.game.basic && lesson.game.basic.length > 0) {
            gameData.basic = lesson.game.basic;
          }
          if (lesson.game.intermediate && lesson.game.intermediate.length > 0) {
            gameData.intermediate = lesson.game.intermediate;
          }
          if (lesson.game.advanced && lesson.game.advanced.length > 0) {
            gameData.advanced = lesson.game.advanced;
          }
        }
        
        // Load theoryModules - không tự động tạo từ HTML cũ
        let theoryModulesData = lesson.theoryModules || [];
        
        setFormData({
          classId: lesson.classId || 10,
          curriculumType: lesson.curriculumType || 'ketnoi',
          chapterId: lesson.chapterId || 1,
          chapterName: lesson.chapterName || '',
          lessonId: lesson.lessonId || 1,
          title: lesson.title || '',
          description: lesson.description || '',
          level: lesson.level || 'Beginner',
          order: lesson.order || 1,
          theoryModules: theoryModulesData,
          game: gameData,
          modules: lesson.modules || []
        });
      }
    } catch (err) {
      console.error('Error fetching lesson:', err);
      setError('Không thể tải bài học');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      setError('Vui lòng nhập tiêu đề bài học');
      return;
    }

    setSaving(true);
    setError(null);
    
    try {
      const payload = {
        ...formData,
        classId: parseInt(formData.classId),
        chapterId: parseInt(formData.chapterId),
        lessonId: parseInt(formData.lessonId),
        order: parseInt(formData.order)
      };

      let response;
      if (isEditing) {
        response = await api.put(`/teacher/lessons/${lessonId}`, payload);
      } else {
        response = await api.post('/teacher/lessons', payload);
      }

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/teacher/lessons');
        }, 1500);
      }
    } catch (err) {
      console.error('Error saving lesson:', err);
      setError(err.response?.data?.message || 'Không thể lưu bài học');
    } finally {
      setSaving(false);
    }
  };

  // Quiz management functions
  const addQuiz = (level) => {
    const newQuiz = {
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      points: QUIZ_LEVELS.find(l => l.key === level)?.points || 10,
      hint: ''
    };
    
    setFormData(prev => ({
      ...prev,
      game: {
        ...prev.game,
        [level]: [...prev.game[level], newQuiz]
      }
    }));
  };

  const updateQuiz = (level, index, field, value) => {
    setFormData(prev => {
      const newQuizzes = [...prev.game[level]];
      newQuizzes[index] = {
        ...newQuizzes[index],
        [field]: value
      };
      return {
        ...prev,
        game: {
          ...prev.game,
          [level]: newQuizzes
        }
      };
    });
  };

  const removeQuiz = (level, index) => {
    setFormData(prev => ({
      ...prev,
      game: {
        ...prev.game,
        [level]: prev.game[level].filter((_, i) => i !== index)
      }
    }));
  };

  const moveQuiz = (level, index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= formData.game[level].length) return;
    
    setFormData(prev => {
      const newQuizzes = [...prev.game[level]];
      [newQuizzes[index], newQuizzes[newIndex]] = [newQuizzes[newIndex], newQuizzes[index]];
      return {
        ...prev,
        game: {
          ...prev.game,
          [level]: newQuizzes
        }
      };
    });
  };

  // Quiz type change handler
  const handleQuizTypeChange = (level, index, newType) => {
    setFormData(prev => {
      const newQuizzes = [...prev.game[level]];
      const quiz = { ...newQuizzes[index], type: newType };
      
      // Reset type-specific fields
      switch (newType) {
        case 'multiple-choice':
          quiz.options = quiz.options?.length ? quiz.options : ['', '', '', ''];
          quiz.correctAnswer = 0;
          delete quiz.pairs;
          delete quiz.correctOrder;
          break;
        case 'true-false':
          quiz.correctAnswer = true;
          delete quiz.options;
          delete quiz.pairs;
          delete quiz.correctOrder;
          break;
        case 'fill-in-blank':
          quiz.correctAnswer = '';
          delete quiz.options;
          delete quiz.pairs;
          delete quiz.correctOrder;
          break;
        case 'matching':
          quiz.pairs = quiz.pairs?.length ? quiz.pairs : [
            { left: '', right: '' },
            { left: '', right: '' }
          ];
          delete quiz.options;
          delete quiz.correctAnswer;
          delete quiz.correctOrder;
          break;
        case 'ordering':
          quiz.correctOrder = quiz.correctOrder?.length ? quiz.correctOrder : ['', '', ''];
          delete quiz.options;
          delete quiz.correctAnswer;
          delete quiz.pairs;
          break;
      }
      
      newQuizzes[index] = quiz;
      return {
        ...prev,
        game: {
          ...prev.game,
          [level]: newQuizzes
        }
      };
    });
  };
  
  // Module management functions
  const addModule = () => {
    const newModule = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Mô đun mới',
      description: '',
      items: [
        { id: Math.random().toString(36).substr(2, 9), type: 'theory', title: 'Lý thuyết', theoryModules: [] }
      ],
      quizzes: [],
      order: formData.modules.length + 1
    };
    
    setFormData(prev => ({
      ...prev,
      modules: [...prev.modules, newModule]
    }));
  };
  
  const updateModule = (index, field, value) => {
    setFormData(prev => {
      const newModules = [...prev.modules];
      newModules[index] = { ...newModules[index], [field]: value };
      return { ...prev, modules: newModules };
    });
  };
  
  const removeModule = (index) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== index)
    }));
  };
  
  const moveModule = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= formData.modules.length) return;
    
    setFormData(prev => {
      const newModules = [...prev.modules];
      [newModules[index], newModules[newIndex]] = [newModules[newIndex], newModules[index]];
      return { ...prev, modules: newModules };
    });
  };
  
  const addModuleItem = (moduleIndex, type) => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title: type === 'theory' ? 'Lý thuyết' : 'Video bài giảng',
      theoryModules: [],
      videoUrl: ''
    };
    
    setFormData(prev => {
      const newModules = [...prev.modules];
      newModules[moduleIndex].items = [...newModules[moduleIndex].items, newItem];
      return { ...prev, modules: newModules };
    });
  };
  
  const updateModuleItem = (moduleIndex, itemIndex, field, value) => {
    setFormData(prev => {
      const newModules = [...prev.modules];
      const newItems = [...newModules[moduleIndex].items];
      newItems[itemIndex] = { ...newItems[itemIndex], [field]: value };
      newModules[moduleIndex].items = newItems;
      return { ...prev, modules: newModules };
    });
  };
  
  const removeModuleItem = (moduleIndex, itemIndex) => {
    setFormData(prev => {
      const newModules = [...prev.modules];
      newModules[moduleIndex].items = newModules[moduleIndex].items.filter((_, i) => i !== itemIndex);
      return { ...prev, modules: newModules };
    });
  };
  
  const addModuleQuiz = (moduleIndex) => {
    const newQuiz = {
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      points: 10,
      hint: ''
    };
    
    setFormData(prev => {
      const newModules = [...prev.modules];
      newModules[moduleIndex].quizzes = [...newModules[moduleIndex].quizzes, newQuiz];
      return { ...prev, modules: newModules };
    });
  };
  
  const updateModuleQuiz = (moduleIndex, quizIndex, field, value) => {
    setFormData(prev => {
      const newModules = [...prev.modules];
      const newQuizzes = [...newModules[moduleIndex].quizzes];
      newQuizzes[quizIndex] = { ...newQuizzes[quizIndex], [field]: value };
      newModules[moduleIndex].quizzes = newQuizzes;
      return { ...prev, modules: newModules };
    });
  };
  
  const removeModuleQuiz = (moduleIndex, quizIndex) => {
    setFormData(prev => {
      const newModules = [...prev.modules];
      newModules[moduleIndex].quizzes = newModules[moduleIndex].quizzes.filter((_, i) => i !== quizIndex);
      return { ...prev, modules: newModules };
    });
  };

  // Render quiz editor based on type
  const renderQuizEditor = (quiz, level, index) => {
    const QuizIcon = QUIZ_TYPES.find(t => t.value === quiz.type)?.icon || HelpCircle;
    
    return (
      <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        {/* Quiz header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button className="p-1 text-gray-400 cursor-grab">
              <GripVertical className="w-5 h-5" />
            </button>
            <span className="font-medium text-gray-700">Câu {index + 1}</span>
            <QuizIcon className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => moveQuiz(level, index, -1)}
              disabled={index === 0}
              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => moveQuiz(level, index, 1)}
              disabled={index === formData.game[level].length - 1}
              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => removeQuiz(level, index)}
              className="p-1 text-red-400 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quiz type selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Loại câu hỏi</label>
          <select
            value={quiz.type}
            onChange={(e) => handleQuizTypeChange(level, index, e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {QUIZ_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Question */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Câu hỏi *</label>
          <textarea
            value={quiz.question}
            onChange={(e) => updateQuiz(level, index, 'question', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập câu hỏi..."
          />
        </div>

        {/* Type-specific fields */}
        {quiz.type === 'multiple-choice' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Đáp án (chọn đáp án đúng)</label>
            <div className="space-y-2">
              {quiz.options?.map((option, optIdx) => (
                <div key={optIdx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`quiz-${level}-${index}`}
                    checked={quiz.correctAnswer === optIdx}
                    onChange={() => updateQuiz(level, index, 'correctAnswer', optIdx)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...quiz.options];
                      newOptions[optIdx] = e.target.value;
                      updateQuiz(level, index, 'options', newOptions);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={`Đáp án ${String.fromCharCode(65 + optIdx)}`}
                  />
                  {quiz.options.length > 2 && (
                    <button
                      onClick={() => {
                        const newOptions = quiz.options.filter((_, i) => i !== optIdx);
                        updateQuiz(level, index, 'options', newOptions);
                        if (quiz.correctAnswer >= newOptions.length) {
                          updateQuiz(level, index, 'correctAnswer', 0);
                        }
                      }}
                      className="p-1 text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {quiz.options?.length < 6 && (
                <button
                  onClick={() => updateQuiz(level, index, 'options', [...quiz.options, ''])}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  + Thêm đáp án
                </button>
              )}
            </div>
          </div>
        )}

        {quiz.type === 'true-false' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Đáp án đúng</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`tf-${level}-${index}`}
                  checked={quiz.correctAnswer === true}
                  onChange={() => updateQuiz(level, index, 'correctAnswer', true)}
                  className="w-4 h-4 text-blue-600"
                />
                <span>Đúng</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`tf-${level}-${index}`}
                  checked={quiz.correctAnswer === false}
                  onChange={() => updateQuiz(level, index, 'correctAnswer', false)}
                  className="w-4 h-4 text-blue-600"
                />
                <span>Sai</span>
              </label>
            </div>
          </div>
        )}

        {quiz.type === 'fill-in-blank' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Đáp án đúng</label>
            <input
              type="text"
              value={quiz.correctAnswer || ''}
              onChange={(e) => updateQuiz(level, index, 'correctAnswer', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập đáp án đúng..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Tip: Dùng dấu _____ trong câu hỏi để đánh dấu chỗ trống
            </p>
          </div>
        )}

        {quiz.type === 'matching' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Các cặp nối</label>
            <div className="space-y-2">
              {quiz.pairs?.map((pair, pairIdx) => (
                <div key={pairIdx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={pair.left}
                    onChange={(e) => {
                      const newPairs = [...quiz.pairs];
                      newPairs[pairIdx] = { ...pair, left: e.target.value };
                      updateQuiz(level, index, 'pairs', newPairs);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Vế trái"
                  />
                  <span className="text-gray-400">↔</span>
                  <input
                    type="text"
                    value={pair.right}
                    onChange={(e) => {
                      const newPairs = [...quiz.pairs];
                      newPairs[pairIdx] = { ...pair, right: e.target.value };
                      updateQuiz(level, index, 'pairs', newPairs);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Vế phải"
                  />
                  {quiz.pairs.length > 2 && (
                    <button
                      onClick={() => {
                        const newPairs = quiz.pairs.filter((_, i) => i !== pairIdx);
                        updateQuiz(level, index, 'pairs', newPairs);
                      }}
                      className="p-1 text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => updateQuiz(level, index, 'pairs', [...quiz.pairs, { left: '', right: '' }])}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                + Thêm cặp
              </button>
            </div>
          </div>
        )}

        {quiz.type === 'ordering' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Thứ tự đúng (từ trên xuống)</label>
            <div className="space-y-2">
              {quiz.correctOrder?.map((item, itemIdx) => (
                <div key={itemIdx} className="flex items-center gap-2">
                  <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-700 rounded text-sm font-medium">
                    {itemIdx + 1}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newOrder = [...quiz.correctOrder];
                      newOrder[itemIdx] = e.target.value;
                      updateQuiz(level, index, 'correctOrder', newOrder);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={`Mục ${itemIdx + 1}`}
                  />
                  {quiz.correctOrder.length > 2 && (
                    <button
                      onClick={() => {
                        const newOrder = quiz.correctOrder.filter((_, i) => i !== itemIdx);
                        updateQuiz(level, index, 'correctOrder', newOrder);
                      }}
                      className="p-1 text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => updateQuiz(level, index, 'correctOrder', [...quiz.correctOrder, ''])}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                + Thêm mục
              </button>
            </div>
          </div>
        )}

        {/* Explanation */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Giải thích (hiện sau khi trả lời)</label>
          <textarea
            value={quiz.explanation || ''}
            onChange={(e) => updateQuiz(level, index, 'explanation', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Giải thích đáp án..."
          />
        </div>

        {/* Points and hint */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Điểm</label>
            <input
              type="number"
              value={quiz.points || 10}
              onChange={(e) => updateQuiz(level, index, 'points', parseInt(e.target.value) || 10)}
              min="1"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gợi ý (tùy chọn)</label>
            <input
              type="text"
              value={quiz.hint || ''}
              onChange={(e) => updateQuiz(level, index, 'hint', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Gợi ý cho học sinh..."
            />
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/teacher/lessons')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  {isEditing ? 'Chỉnh sửa bài học' : 'Tạo bài học mới'}
                </h1>
                <p className="text-sm text-gray-500">
                  {formData.title || 'Chưa có tiêu đề'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/teacher/lessons')}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Lưu bài học
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="max-w-5xl mx-auto px-6 mt-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}
      
      {success && (
        <div className="max-w-5xl mx-auto px-6 mt-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            <span className="text-green-700">Lưu bài học thành công! Đang chuyển hướng...</span>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-6 mt-6">
        <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm border border-gray-100 w-fit">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === 'info' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            Thông tin
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === 'theory' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Lý thuyết
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === 'quiz' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            Câu hỏi ({formData.game.basic.length + formData.game.intermediate.length + formData.game.advanced.length})
          </button>
          <button
            onClick={() => setActiveTab('modules')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === 'modules' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
            }`}
          >
            <Layout className="w-4 h-4" />
            Cấu trúc Module ({formData.modules?.length || 0})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Info Tab */}
        {activeTab === 'info' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Thông tin bài học</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: Bài 1: Cấu tạo nguyên tử"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Độ khó</label>
                <select
                  value={formData.level}
                  onChange={(e) => handleInputChange('level', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Beginner">Cơ bản</option>
                  <option value="Intermediate">Trung bình</option>
                  <option value="Advanced">Nâng cao</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Mô tả ngắn về nội dung bài học..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lớp</label>
                <select
                  value={formData.classId}
                  onChange={(e) => handleInputChange('classId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="8">Lớp 8</option>
                  <option value="9">Lớp 9</option>
                  <option value="10">Lớp 10</option>
                  <option value="11">Lớp 11</option>
                  <option value="12">Lớp 12</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bộ sách</label>
                <select
                  value={formData.curriculumType}
                  onChange={(e) => handleInputChange('curriculumType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ketnoi">Kết nối tri thức</option>
                  <option value="canhdieu">Cánh diều</option>
                  <option value="chantroicangtao">Chân trời sáng tạo</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chương</label>
                <select
                  value={formData.chapterId}
                  onChange={(e) => handleInputChange('chapterId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(ch => (
                    <option key={ch} value={ch}>Chương {ch}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên chương</label>
                <input
                  type="text"
                  value={formData.chapterName}
                  onChange={(e) => handleInputChange('chapterName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: Cấu tạo nguyên tử"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số bài</label>
                <input
                  type="number"
                  value={formData.lessonId}
                  onChange={(e) => handleInputChange('lessonId', e.target.value)}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự hiển thị</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => handleInputChange('order', e.target.value)}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Theory Tab */}
        {activeTab === 'theory' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <TheoryEditor
              value={formData.theoryModules || []}
              onChange={(data) => {
                setFormData(prev => ({
                  ...prev,
                  theoryModules: data.modules
                }));
              }}
            />
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Câu hỏi trắc nghiệm</h2>
            
            {/* Level tabs */}
            <div className="flex gap-2 mb-6">
              {QUIZ_LEVELS.map(level => (
                <button
                  key={level.key}
                  onClick={() => setActiveQuizLevel(level.key)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeQuizLevel === level.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {level.label} ({formData.game[level.key]?.length || 0})
                </button>
              ))}
            </div>
            
            {/* Quiz list */}
            <div className="space-y-4">
              {formData.game[activeQuizLevel]?.map((quiz, index) => 
                renderQuizEditor(quiz, activeQuizLevel, index)
              )}
            </div>
            
            {/* Add quiz button */}
            <button
              onClick={() => addQuiz(activeQuizLevel)}
              className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Thêm câu hỏi {QUIZ_LEVELS.find(l => l.key === activeQuizLevel)?.label.toLowerCase()}
            </button>
          </div>
        )}

        {/* Modules Tab */}
        {activeTab === 'modules' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-gray-800">Cấu trúc bài học theo Module</h2>
              <button
                onClick={addModule}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Thêm Module
              </button>
            </div>

            {formData.modules.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
                <Layout className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600">Chưa có module nào</h3>
                <p className="text-gray-400 mb-6">Chia nhỏ bài học thành các module để giúp học sinh dễ tiếp thu hơn.</p>
                <button
                  onClick={addModule}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Tạo Module đầu tiên
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {formData.modules.map((module, mIdx) => (
                  <div key={module.id || mIdx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Module Header */}
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                          {mIdx + 1}
                        </div>
                        <input
                          type="text"
                          value={module.title}
                          onChange={(e) => updateModule(mIdx, 'title', e.target.value)}
                          className="bg-transparent border-none text-lg font-bold text-gray-800 focus:ring-0 p-0 w-64"
                          placeholder="Tiêu đề module..."
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => moveModule(mIdx, -1)}
                          disabled={mIdx === 0}
                          className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-20"
                        >
                          <ChevronUp className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => moveModule(mIdx, 1)}
                          disabled={mIdx === formData.modules.length - 1}
                          className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-20"
                        >
                          <ChevronDown className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => removeModule(mIdx)}
                          className="p-1.5 text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6 space-y-8">
                      {/* Items List */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            Nội dung bài học
                          </h3>
                        </div>
                        
                        <div className="space-y-4">
                          {module.items?.map((item, iIdx) => (
                            <div key={item.id || iIdx} className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                  {item.type === 'video' ? <Video className="w-4 h-4 text-red-500" /> : <FileText className="w-4 h-4 text-blue-500" />}
                                  <input
                                    type="text"
                                    value={item.title || ''}
                                    onChange={(e) => updateModuleItem(mIdx, iIdx, 'title', e.target.value)}
                                    className="bg-transparent border-none font-medium text-gray-700 focus:ring-0 p-0 w-64"
                                    placeholder={item.type === 'video' ? 'Tiêu đề video...' : 'Tiêu đề lý thuyết...'}
                                  />
                                </div>
                                <button
                                  onClick={() => removeModuleItem(mIdx, iIdx)}
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm text-gray-500 mb-1 flex items-center gap-1">
                                      <Tag className="w-3 h-3" /> Đề mục (Section)
                                    </label>
                                    <input
                                      type="text"
                                      value={item.section || ''}
                                      onChange={(e) => updateModuleItem(mIdx, iIdx, 'section', e.target.value)}
                                      className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                      placeholder="VD: Giới thiệu khóa học"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm text-gray-500 mb-1 flex items-center gap-1">
                                      <Clock className="w-3 h-3" /> Thời lượng
                                    </label>
                                    <input
                                      type="text"
                                      value={item.duration || ''}
                                      onChange={(e) => updateModuleItem(mIdx, iIdx, 'duration', e.target.value)}
                                      className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                      placeholder="VD: 5 phút"
                                    />
                                  </div>
                                </div>

                                {item.type === 'video' ? (
                                <div>
                                  <label className="block text-sm text-gray-500 mb-1">YouTube Video URL</label>
                                  <input
                                    type="text"
                                    value={item.videoUrl || ''}
                                    onChange={(e) => updateModuleItem(mIdx, iIdx, 'videoUrl', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                  />
                                </div>
                              ) : (
                                <TheoryEditor
                                  value={item.theoryModules || []}
                                  onChange={(data) => {
                                    updateModuleItem(mIdx, iIdx, 'theoryModules', data.modules);
                                  }}
                                />
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-3 mt-4">
                          <button
                            onClick={() => addModuleItem(mIdx, 'theory')}
                            className="flex-1 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                          >
                            <Plus className="w-4 h-4" /> Thêm Lý thuyết
                          </button>
                          <button
                            onClick={() => addModuleItem(mIdx, 'video')}
                            className="flex-1 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-red-400 hover:text-red-600 transition-colors flex items-center justify-center gap-2"
                          >
                            <Plus className="w-4 h-4" /> Thêm Video
                          </button>
                        </div>
                      </div>

                      {/* Quiz Section */}
                      <div className="pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                            <Gamepad2 className="w-4 h-4" />
                            Kiểm tra nhanh (Module Quiz)
                          </h3>
                          <span className="text-xs text-gray-500">Nên có từ 3-5 câu hỏi cho mỗi module</span>
                        </div>

                        <div className="space-y-4 mb-4">
                          {module.quizzes?.map((quiz, qIdx) => (
                            <div key={qIdx} className="pl-4 border-l-2 border-blue-100">
                              {/* Reusing existing renderQuizEditor logic but modified for module context */}
                              <div className="bg-gray-50 rounded-lg p-4 mb-4 relative">
                                <button
                                  onClick={() => removeModuleQuiz(mIdx, qIdx)}
                                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                
                                <div className="space-y-3">
                                  <input
                                    type="text"
                                    value={quiz.question}
                                    onChange={(e) => updateModuleQuiz(mIdx, qIdx, 'question', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                                    placeholder={`Câu hỏi ${qIdx + 1}...`}
                                  />
                                  
                                  <div className="grid grid-cols-1 gap-2">
                                    {quiz.options?.map((opt, oIdx) => (
                                      <div key={oIdx} className="flex items-center gap-2">
                                        <input
                                          type="radio"
                                          name={`mod-quiz-${mIdx}-${qIdx}`}
                                          checked={quiz.correctAnswer === oIdx}
                                          onChange={() => updateModuleQuiz(mIdx, qIdx, 'correctAnswer', oIdx)}
                                        />
                                        <input
                                          type="text"
                                          value={opt}
                                          onChange={(e) => {
                                            const newOpts = [...quiz.options];
                                            newOpts[oIdx] = e.target.value;
                                            updateModuleQuiz(mIdx, qIdx, 'options', newOpts);
                                          }}
                                          className="flex-1 px-3 py-1 text-sm border border-gray-100 rounded"
                                          placeholder={`Đáp án ${String.fromCharCode(65 + oIdx)}`}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => addModuleQuiz(mIdx)}
                          className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-green-400 hover:text-green-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" /> Thêm câu hỏi trắc nghiệm
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonEditor;
