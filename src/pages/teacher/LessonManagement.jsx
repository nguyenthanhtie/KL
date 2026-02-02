import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../config/api';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  FileText,
  Beaker,
  GraduationCap,
  AlertCircle,
  Check,
  X,
  Copy
} from 'lucide-react';

const LessonManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedCurriculum, setSelectedCurriculum] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLessons, setTotalLessons] = useState(0);
  const itemsPerPage = 10;
  
  // Delete modal
  const [deleteModal, setDeleteModal] = useState({ open: false, lesson: null });
  const [deleting, setDeleting] = useState(false);

  // Fetch lessons
  useEffect(() => {
    fetchLessons();
  }, [currentPage, selectedClass, selectedCurriculum, selectedChapter, searchQuery]);

  const fetchLessons = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('limit', itemsPerPage);
      
      if (selectedClass) params.append('classId', selectedClass);
      if (selectedCurriculum) params.append('curriculumType', selectedCurriculum);
      if (selectedChapter) params.append('chapterId', selectedChapter);
      if (searchQuery) params.append('search', searchQuery);
      
      const response = await api.get(`/teacher/lessons?${params.toString()}`);
      
      if (response.data.success) {
        setLessons(response.data.lessons);
        setTotalPages(response.data.pagination.totalPages);
        setTotalLessons(response.data.pagination.total);
      }
    } catch (err) {
      console.error('Error fetching lessons:', err);
      setError('Không thể tải danh sách bài học');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.lesson) return;
    
    setDeleting(true);
    try {
      await api.delete(`/teacher/lessons/${deleteModal.lesson._id}`);
      setDeleteModal({ open: false, lesson: null });
      fetchLessons();
    } catch (err) {
      console.error('Error deleting lesson:', err);
      setError('Không thể xóa bài học');
    } finally {
      setDeleting(false);
    }
  };

  const handleDuplicate = async (lesson) => {
    try {
      const response = await api.post(`/teacher/lessons/${lesson._id}/duplicate`);
      if (response.data.success) {
        fetchLessons();
      }
    } catch (err) {
      console.error('Error duplicating lesson:', err);
      setError('Không thể sao chép bài học');
    }
  };

  const getCurriculumLabel = (type) => {
    const labels = {
      'ketnoi': 'Kết nối tri thức',
      'canhdieu': 'Cánh diều',
      'chantroicangtao': 'Chân trời sáng tạo'
    };
    return labels[type] || type;
  };

  const getLevelBadge = (level) => {
    const styles = {
      'Beginner': 'bg-green-100 text-green-700',
      'Intermediate': 'bg-yellow-100 text-yellow-700',
      'Advanced': 'bg-red-100 text-red-700'
    };
    const labels = {
      'Beginner': 'Cơ bản',
      'Intermediate': 'Trung bình',
      'Advanced': 'Nâng cao'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[level] || 'bg-gray-100 text-gray-700'}`}>
        {labels[level] || level}
      </span>
    );
  };

  const getQuizCount = (lesson) => {
    let count = 0;
    if (lesson.game) {
      // Check basic/intermediate/advanced first (preferred structure)
      const hasLeveledQuizzes = (lesson.game.basic?.length > 0) || 
                                (lesson.game.intermediate?.length > 0) || 
                                (lesson.game.advanced?.length > 0);
      
      if (hasLeveledQuizzes) {
        // Count from leveled structure
        count += lesson.game.basic?.length || 0;
        count += lesson.game.intermediate?.length || 0;
        count += lesson.game.advanced?.length || 0;
      } else if (lesson.game.quizzes) {
        // Fallback to quizzes array
        count += lesson.game.quizzes.length;
      }
    }
    return count;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-blue-600" />
              Quản lý bài học
            </h1>
            <p className="text-gray-600 mt-1">
              Tổng cộng {totalLessons} bài học
            </p>
          </div>
          
          <button
            onClick={() => navigate('/teacher/lessons/new')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Tạo bài học mới
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài học..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Class filter */}
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tất cả lớp</option>
              <option value="8">Lớp 8</option>
              <option value="9">Lớp 9</option>
              <option value="10">Lớp 10</option>
              <option value="11">Lớp 11</option>
              <option value="12">Lớp 12</option>
            </select>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Lessons table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-500">Đang tải...</p>
            </div>
          ) : lessons.length === 0 ? (
            <div className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Chưa có bài học nào</p>
              <button
                onClick={() => navigate('/teacher/lessons/new')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Tạo bài học đầu tiên
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="w-[25%] px-4 py-3 text-left text-sm font-semibold text-gray-600">Bài học</th>
                      <th className="w-[8%] px-4 py-3 text-left text-sm font-semibold text-gray-600">Lớp</th>
                      <th className="w-[12%] px-4 py-3 text-left text-sm font-semibold text-gray-600">Bộ sách</th>
                      <th className="w-[20%] px-4 py-3 text-left text-sm font-semibold text-gray-600">Chương</th>
                      <th className="w-[10%] px-4 py-3 text-left text-sm font-semibold text-gray-600">Độ khó</th>
                      <th className="w-[10%] px-4 py-3 text-center text-sm font-semibold text-gray-600">Câu hỏi</th>
                      <th className="w-[15%] px-4 py-3 text-right text-sm font-semibold text-gray-600">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {lessons.map((lesson) => (
                      <tr key={lesson._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="truncate">
                            <p className="font-medium text-gray-800 truncate">{lesson.title}</p>
                            <p className="text-sm text-gray-500 truncate">{lesson.description}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium whitespace-nowrap">
                            Lớp {lesson.classId}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 truncate">
                          {getCurriculumLabel(lesson.curriculumType)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 truncate">
                          {lesson.chapterName || `Chương ${lesson.chapterId}`}
                        </td>
                        <td className="px-4 py-3">
                          {getLevelBadge(lesson.level)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium whitespace-nowrap">
                            {getQuizCount(lesson)} câu
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => navigate(`/lesson/${lesson.classId}/${lesson.chapterId}/${lesson.lessonId}`)}
                              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Xem trước"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => navigate(`/teacher/lessons/${lesson._id}/edit`)}
                              className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Chỉnh sửa"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDuplicate(lesson)}
                              className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                              title="Sao chép"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteModal({ open: true, lesson })}
                              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Xóa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Hiển thị {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalLessons)} / {totalLessons} bài học
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let page;
                      if (totalPages <= 5) {
                        page = i + 1;
                      } else if (currentPage <= 3) {
                        page = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        page = totalPages - 4 + i;
                      } else {
                        page = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Xác nhận xóa</h3>
            <p className="text-gray-600 mb-4">
              Bạn có chắc muốn xóa bài học "<span className="font-medium">{deleteModal.lesson?.title}</span>"? 
              Hành động này không thể hoàn tác.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal({ open: false, lesson: null })}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                disabled={deleting}
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? 'Đang xóa...' : 'Xóa'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonManagement;
