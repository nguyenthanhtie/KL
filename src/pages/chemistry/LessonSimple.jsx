import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config/api';
import TheoryRenderer from '../../components/TheoryRenderer';
import ModuleQuiz from '../../components/ModuleQuiz';
import { 
  BookOpen, 
  Video, 
  HelpCircle, 
  ChevronRight, 
  ChevronDown,
  CheckCircle, 
  PlayCircle, 
  FileText,
  ArrowLeft,
  Layout,
  Award,
  Clock,
  MessageCircle,
  Sparkles,
  RefreshCw,
  Lock
} from 'lucide-react';

const LessonSimple = () => {
  const { classId, chapterId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for modules
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [completedModules, setCompletedModules] = useState([]);
  const [expandedModules, setExpandedModules] = useState([0]); // Default expand first module
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  // When switching modules or items, reset quiz state
  useEffect(() => {
    setIsQuizStarted(false);
  }, [activeModuleIndex, activeItemIndex, isQuizActive]);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        const url = `${API_URL}/lessons/class/${classId}/chapter/${chapterId}/lesson/${lessonId}`;
        const response = await axios.get(url);
        setLessonData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching lesson:', err);
        setError(err.response?.data?.message || 'Không thể tải bài học');
      } finally {
        setLoading(false);
      }
    };

    if (classId && chapterId && lessonId) {
      fetchLesson();
    }
  }, [classId, chapterId, lessonId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Đang chuẩn bị học liệu...</p>
        </div>
      </div>
    );
  }

  if (error || !lessonData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowLeft className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Có lỗi xảy ra</h2>
          <p className="text-gray-600 mb-6">{error || 'Không tìm thấy bài học'}</p>
          <button 
            onClick={() => navigate('/program/chemistry/dashboard')}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  // Normalize data for the new UI
  const normalizedModules = lessonData.modules && lessonData.modules.length > 0 
    ? lessonData.modules 
    : [{
        title: 'Lý thuyết trọng tâm',
        description: lessonData.description,
        items: [{
          type: 'theory',
          title: 'Nội dung bài học',
          content: lessonData.theory,
          theoryModules: lessonData.theoryModules || [],
          duration: '15 min'
        }],
        quizzes: []
      }];
  
  const activeModule = normalizedModules[activeModuleIndex];
  const activeItem = activeModule?.items[activeItemIndex];

  const toggleModule = (index) => {
    if (expandedModules.includes(index)) {
      setExpandedModules(expandedModules.filter(i => i !== index));
    } else {
      setExpandedModules([...expandedModules, index]);
    }
  };

  const handleModuleComplete = (score) => {
    if (!completedModules.includes(activeModuleIndex)) {
      setCompletedModules([...completedModules, activeModuleIndex]);
    }
    
    if (activeModuleIndex < normalizedModules.length - 1) {
      setTimeout(() => {
        setActiveModuleIndex(activeModuleIndex + 1);
        setActiveItemIndex(0);
        setIsQuizActive(false);
        if (!expandedModules.includes(activeModuleIndex + 1)) {
          setExpandedModules([...expandedModules, activeModuleIndex + 1]);
        }
      }, 2000);
    }
  };

  const handleStartGame = () => {
    navigate(`/gameplay/${classId}/${chapterId}/${lessonId}`);
  };


  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar - Coursera Style */}
      <div className="w-full md:w-80 bg-[#F9FBFC] border-r border-gray-100 flex flex-col h-screen sticky top-0 overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-white">
          <h1 className="text-sm font-bold text-blue-700 leading-tight uppercase tracking-tight">{lessonData.title}</h1>
          <button className="text-gray-400 hover:text-gray-600 mt-1">
             <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {normalizedModules.map((module, mIdx) => {
            const isExpanded = expandedModules.includes(mIdx);
            const isLocked = mIdx > completedModules.length && mIdx > 0;

            return (
              <div key={module.id || mIdx} className="border-b border-gray-50">
                <button
                  onClick={() => toggleModule(mIdx)}
                  className={`w-full text-left p-4 transition-all flex items-start gap-3 group ${
                    activeModuleIndex === mIdx ? 'bg-blue-50/30' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="mt-1">
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Module {mIdx + 1}</p>
                    <h3 className={`text-sm font-bold leading-tight ${isLocked ? 'text-gray-400' : 'text-gray-800'}`}>
                      {module.title}
                    </h3>
                  </div>
                  {isLocked && <Lock className="w-4 h-4 text-gray-300 mt-1" />}
                </button>

                {isExpanded && !isLocked && (
                  <div className="bg-white">
                    {module.items?.map((item, iIdx) => {
                      const isActive = activeModuleIndex === mIdx && activeItemIndex === iIdx && !isQuizActive;
                      const isCompleted = completedModules.includes(mIdx) || (activeModuleIndex === mIdx && iIdx < activeItemIndex);

                      return (
                        <div key={item.id || iIdx}>
                          {item.section && (iIdx === 0 || module.items[iIdx-1].section !== item.section) && (
                            <div className="px-10 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                              {item.section}
                            </div>
                          )}
                          <button
                            onClick={() => {
                              setActiveModuleIndex(mIdx);
                              setActiveItemIndex(iIdx);
                              setIsQuizActive(false);
                            }}
                            className={`w-full text-left py-3 px-10 transition-all flex items-start gap-3 group ${
                              isActive ? 'bg-blue-50/50 border-r-4 border-blue-600' : 'hover:bg-slate-50'
                            }`}
                          >
                            <div className="mt-1">
                              {isCompleted ? (
                                <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                                  <CheckCircle className="w-3 h-3 text-white" />
                                </div>
                              ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-gray-200"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm ${isActive ? 'text-blue-700 font-bold' : 'text-gray-600'}`}>
                                {item.title}
                              </p>
                              <p className="text-[10px] text-gray-400 mt-0.5">
                                {item.type === 'video' ? 'Video' : 'Reading'} • {item.duration || '5 min'}
                              </p>
                            </div>
                          </button>
                        </div>
                      );
                    })}
                    
                    {module.quizzes?.length > 0 && (
                      <button
                        onClick={() => {
                          setActiveModuleIndex(mIdx);
                          setIsQuizActive(true);
                        }}
                        className={`w-full text-left py-3 px-10 transition-all flex items-start gap-3 group ${
                          isQuizActive && activeModuleIndex === mIdx ? 'bg-blue-50/50 border-r-4 border-blue-600' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="mt-1">
                          {completedModules.includes(mIdx) ? (
                            <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-gray-200"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm ${isQuizActive && activeModuleIndex === mIdx ? 'text-blue-700 font-bold' : 'text-gray-600'}`}>
                            {module.title.toLowerCase().includes('thử thách') || module.title.toLowerCase().includes('challenge') 
                            ? module.title 
                            : `${module.title} Challenge`}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5">Quiz • 15 min</p>
                        </div>
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-white h-screen">
        <div className="max-w-4xl mx-auto p-6 md:p-12">
          {isQuizActive ? (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">Module {activeModuleIndex + 1} Challenge</h2>
              <button className="text-blue-600 font-medium mb-10 block hover:underline">Review Learning Objectives</button>

              {!isQuizStarted && (
                <div className="bg-[#F1F6FE] rounded-2xl p-6 mb-10 border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-700 text-lg">coach</span>
                    </div>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-6">Ready to review what you've learned before starting the assignment? I'm here to help.</p>
                  <div className="flex gap-3">
                    <button className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-blue-50 transition-all">
                      <Sparkles className="w-4 h-4 text-blue-500" /> Help me practice
                    </button>
                    <button className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-blue-50 transition-all">
                      <MessageCircle className="w-4 h-4 text-blue-500" /> Let's chat
                    </button>
                  </div>
                </div>
              )}

              {/* Assignment Details Card */}
              {!isQuizStarted && (
                !completedModules.includes(activeModuleIndex) ? (
                  <div className="bg-[#E9F0FD]/40 rounded-2xl p-8 border border-blue-50/50">
                    <h3 className="font-bold text-gray-800 mb-6">Assignment details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                       <div>
                          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">Due</p>
                          <p className="text-sm text-gray-700">Dec 31, 11:59 PM +07</p>
                       </div>
                       <div>
                          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">Attempts</p>
                          <p className="text-sm text-gray-700">Unlimited</p>
                       </div>
                       <div>
                          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">Submitted</p>
                          <p className="text-sm text-gray-700">Not yet</p>
                       </div>
                       <div>
                          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">Time limit</p>
                          <p className="text-sm text-gray-700">30m per attempt</p>
                       </div>
                    </div>
                    <div className="mt-10 flex justify-end">
                      <button 
                        onClick={() => setIsQuizStarted(true)} 
                        className="px-10 py-3 bg-blue-600 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-100"
                      >
                        Start Quiz
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#E9F0FD]/40 rounded-2xl p-8 border border-blue-50/50 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">Assignment details</h3>
                      <p className="text-sm text-green-600 font-bold">Status: Completed</p>
                    </div>
                    <button 
                      onClick={() => setIsQuizStarted(true)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-all font-bold"
                    >
                      <RefreshCw className="w-4 h-4" /> Retry
                    </button>
                  </div>
                )
              )}

                {isQuizStarted && (
                  <div className="mt-12">
                    <ModuleQuiz 
                      quizzes={activeModule.quizzes} 
                      onComplete={(score) => {
                        handleModuleComplete(score);
                        setIsQuizStarted(false);
                      }}
                      autoStart={true}
                    />
                  </div>
                )}
            </div>
          ) : activeItem ? (
            <div className="animate-in fade-in duration-500">
              <div className="flex items-center gap-2 text-blue-600 mb-2 font-bold uppercase tracking-widest text-[10px]">
                {activeItem.type === 'video' ? <><Video className="w-3 h-3" /> Video</> : <><FileText className="w-3 h-3" /> Reading</>}
                <span className="text-gray-300 mx-1">•</span>
                <span>{activeItem.duration || '5 min'}</span>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">
                {activeItem.title}
              </h2>

              {activeItem.type === 'video' && activeItem.videoUrl ? (
                <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl mb-10 border-4 border-white">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${activeItem.videoUrl.split('v=')[1]?.split('&')[0] || activeItem.videoUrl.split('/').pop()}`}
                    title={activeItem.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : null}

              <div className="prose prose-lg prose-slate max-w-none">
                <TheoryRenderer 
                  modules={activeItem.theoryModules || []} 
                  fallbackHtml={activeItem.content}
                />
              </div>

              {/* Navigation buttons */}
              <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
                <button
                  disabled={activeItemIndex === 0}
                  onClick={() => setActiveItemIndex(activeItemIndex - 1)}
                  className="px-6 py-3 text-gray-400 hover:text-gray-800 disabled:opacity-0 transition-all font-medium"
                >
                  Previous
                </button>
                
                {activeItemIndex < activeModule.items.length - 1 ? (
                  <button
                    onClick={() => setActiveItemIndex(activeItemIndex + 1)}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
                  >
                    Next
                  </button>
                ) : activeModule.quizzes?.length > 0 ? (
                  <button
                    onClick={() => setIsQuizActive(true)}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
                  >
                    Go to Challenge
                  </button>
                ) : activeModuleIndex < normalizedModules.length - 1 ? (
                  <button
                    onClick={() => {
                      setActiveModuleIndex(activeModuleIndex + 1);
                      setActiveItemIndex(0);
                    }}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
                  >
                    Next Module
                  </button>
                ) : (
                  <button
                    onClick={handleStartGame}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
                  >
                    Finish Lesson
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <Layout className="w-16 h-16 text-gray-200 mb-4" />
              <h3 className="text-xl font-bold text-gray-800">Select an item to start</h3>
              <p className="text-gray-400 mt-2">Use the left menu to navigate through modules.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonSimple;
