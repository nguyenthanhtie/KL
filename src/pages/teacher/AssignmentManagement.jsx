import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../config/api';
import {
  ClipboardList,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Check,
  X,
  Calendar,
  Users,
  Star,
  Clock,
  Filter,
  BookOpen,
  CheckCircle,
  FileText,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Upload,
  Paperclip,
  Download,
  Image
} from 'lucide-react';

// Assignment type options
const ASSIGNMENT_TYPES = [
  { value: 'homework', label: 'Bài tập về nhà' },
  { value: 'quiz', label: 'Kiểm tra' },
  { value: 'practice', label: 'Luyện tập' },
  { value: 'exam', label: 'Thi' },
  { value: 'lesson', label: 'Bài học' },
  { value: 'challenge', label: 'Thử thách' }
];

const STATUS_OPTIONS = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 'draft', label: 'Bản nháp' },
  { value: 'active', label: 'Đang hoạt động' },
  { value: 'closed', label: 'Đã đóng' },
  { value: 'archived', label: 'Lưu trữ' }
];

const AssignmentManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const itemsPerPage = 10;
  
  // Modals
  const [deleteModal, setDeleteModal] = useState({ open: false, assignment: null });
  const [deleting, setDeleting] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState({ open: false, assignment: null });
  const [gradeModal, setGradeModal] = useState({ open: false, assignment: null, submission: null });
  
  // Classes list for filter and create form
  const [classes, setClasses] = useState([]);
  
  // Create form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'homework',
    classRoomId: '',
    schedule: {
      dueDate: '',
      timeLimit: '',
      lateSubmissionAllowed: false
    },
    grading: {
      maxPoints: 100,
      passingScore: 50,
      allowRetry: true,
      maxRetries: 3,
      showAnswersAfter: 'immediately'
    }
  });
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Content tab
  const [contentTab, setContentTab] = useState('info'); // 'info' | 'questions' | 'files'
  
  // Custom questions
  const [questions, setQuestions] = useState([]);
  
  // File uploads
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [parsing, setParsing] = useState(false);
  
  // Grading form
  const [gradeData, setGradeData] = useState({ score: '', feedback: '' });
  const [grading, setGrading] = useState(false);
  
  // Fetch assignments
  useEffect(() => {
    fetchAssignments();
  }, [currentPage, statusFilter, classFilter]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await api.get('/teacher/classes');
      if (response.data.success) {
        setClasses(response.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching classes:', err);
    }
  };

  const fetchAssignments = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('limit', itemsPerPage);
      
      if (statusFilter) params.append('status', statusFilter);
      if (classFilter) params.append('classId', classFilter);
      
      const response = await api.get(`/teacher/assignments?${params.toString()}`);
      
      if (response.data.success) {
        setAssignments(response.data.data.assignments);
        setTotalPages(response.data.data.pagination.pages);
        setTotalAssignments(response.data.data.pagination.total);
      }
    } catch (err) {
      console.error('Error fetching assignments:', err);
      setError('Không thể tải danh sách bài tập');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.title.trim()) {
      setError('Vui lòng nhập tiêu đề bài tập');
      return;
    }
    
    setSaving(true);
    setError(null);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        classRoomId: formData.classRoomId || undefined,
        content: {
          customQuestions: questions.length > 0 ? questions : undefined
        },
        schedule: {
          dueDate: formData.schedule.dueDate ? new Date(formData.schedule.dueDate).toISOString() : undefined,
          timeLimit: formData.schedule.timeLimit ? parseInt(formData.schedule.timeLimit) : undefined,
          lateSubmissionAllowed: formData.schedule.lateSubmissionAllowed
        },
        grading: formData.grading
      };
      
      let response;
      if (editingId) {
        response = await api.put(`/teacher/assignments/${editingId}`, payload);
      } else {
        response = await api.post('/teacher/assignments', payload);
      }
      
      if (response.data.success) {
        setSuccess(editingId ? 'Cập nhật bài tập thành công!' : 'Tạo bài tập thành công!');
        setCreateModal(false);
        resetForm();
        fetchAssignments();
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      console.error('Error saving assignment:', err);
      setError(err.response?.data?.message || 'Không thể lưu bài tập');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (assignment) => {
    setEditingId(assignment._id);
    setFormData({
      title: assignment.title || '',
      description: assignment.description || '',
      type: assignment.type || 'homework',
      classRoomId: assignment.assignedTo?.classRoom?._id || assignment.assignedTo?.classRoom || '',
      schedule: {
        dueDate: assignment.schedule?.dueDate ? new Date(assignment.schedule.dueDate).toISOString().slice(0, 16) : '',
        timeLimit: assignment.schedule?.timeLimit || '',
        lateSubmissionAllowed: assignment.schedule?.lateSubmissionAllowed || false
      },
      grading: {
        maxPoints: assignment.grading?.maxPoints || 100,
        passingScore: assignment.grading?.passingScore || 50,
        allowRetry: assignment.grading?.allowRetry !== false,
        maxRetries: assignment.grading?.maxRetries || 3,
        showAnswersAfter: assignment.grading?.showAnswersAfter || 'immediately'
      }
    });
    setQuestions(assignment.content?.customQuestions || []);
    setUploadedFiles(assignment.content?.attachments || []);
    setContentTab('info');
    setCreateModal(true);
  };

  const handleDelete = async () => {
    if (!deleteModal.assignment) return;
    
    setDeleting(true);
    try {
      // Use PUT to archive instead of DELETE
      await api.put(`/teacher/assignments/${deleteModal.assignment._id}`, { status: 'archived' });
      setDeleteModal({ open: false, assignment: null });
      setSuccess('Đã lưu trữ bài tập');
      fetchAssignments();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error archiving assignment:', err);
      setError('Không thể lưu trữ bài tập');
    } finally {
      setDeleting(false);
    }
  };

  const handleViewDetail = async (assignment) => {
    try {
      const response = await api.get(`/teacher/assignments/${assignment._id}`);
      if (response.data.success) {
        setDetailModal({ open: true, assignment: response.data.data });
      }
    } catch (err) {
      console.error('Error fetching assignment detail:', err);
      setError('Không thể tải chi tiết bài tập');
    }
  };

  const handleGrade = async () => {
    if (!gradeModal.submission || !gradeData.score) {
      setError('Vui lòng nhập điểm');
      return;
    }
    
    setGrading(true);
    try {
      const response = await api.post(`/teacher/assignments/${gradeModal.assignment._id}/grade`, {
        studentId: gradeModal.submission.student._id || gradeModal.submission.student,
        score: parseFloat(gradeData.score),
        feedback: gradeData.feedback
      });
      
      if (response.data.success) {
        setSuccess('Chấm điểm thành công!');
        setGradeModal({ open: false, assignment: null, submission: null });
        setGradeData({ score: '', feedback: '' });
        // Refresh the detail modal
        if (detailModal.open) {
          handleViewDetail(detailModal.assignment);
        }
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      console.error('Error grading:', err);
      setError(err.response?.data?.message || 'Không thể chấm điểm');
    } finally {
      setGrading(false);
    }
  };

  const handleStatusChange = async (assignmentId, newStatus) => {
    try {
      const response = await api.put(`/teacher/assignments/${assignmentId}`, { status: newStatus });
      if (response.data.success) {
        setSuccess('Cập nhật trạng thái thành công!');
        fetchAssignments();
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Không thể cập nhật trạng thái');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      type: 'homework',
      classRoomId: '',
      schedule: {
        dueDate: '',
        timeLimit: '',
        lateSubmissionAllowed: false
      },
      grading: {
        maxPoints: 100,
        passingScore: 50,
        allowRetry: true,
        maxRetries: 3,
        showAnswersAfter: 'immediately'
      }
    });
    setQuestions([]);
    setUploadedFiles([]);
    setContentTab('info');
  };

  // Question helpers
  const addQuestion = () => {
    setQuestions(prev => [...prev, {
      question: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 10,
      explanation: ''
    }]);
  };

  const updateQuestion = (idx, field, value) => {
    setQuestions(prev => prev.map((q, i) => i === idx ? { ...q, [field]: value } : q));
  };

  const removeQuestion = (idx) => {
    setQuestions(prev => prev.filter((_, i) => i !== idx));
  };

  const updateOption = (qIdx, oIdx, value) => {
    setQuestions(prev => prev.map((q, i) => {
      if (i !== qIdx) return q;
      const newOpts = [...q.options];
      newOpts[oIdx] = value;
      return { ...q, options: newOpts };
    }));
  };

  const addOption = (qIdx) => {
    setQuestions(prev => prev.map((q, i) => i === qIdx ? { ...q, options: [...q.options, ''] } : q));
  };

  const removeOption = (qIdx, oIdx) => {
    setQuestions(prev => prev.map((q, i) => i === qIdx ? { ...q, options: q.options.filter((_, j) => j !== oIdx) } : q));
  };

  // File upload
  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    if (!editingId) {
      setError('Vui lòng lưu bài tập trước khi tải file');
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const formDataUpload = new FormData();
      for (let i = 0; i < files.length; i++) {
        formDataUpload.append('files', files[i]);
      }
      const response = await api.post(`/teacher/assignments/${editingId}/upload`, formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        setUploadedFiles(prev => [...prev, ...response.data.data]);
        setSuccess('Tải file thành công!');
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tải file');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDeleteFile = async (fileName) => {
    if (!editingId) return;
    try {
      await api.delete(`/teacher/assignments/${editingId}/attachments/${fileName}`);
      setUploadedFiles(prev => prev.filter(f => f.fileName !== fileName));
      setSuccess('Đã xóa file');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Không thể xóa file');
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType?.startsWith('image/')) return <Image className="w-5 h-5 text-green-500" />;
    if (fileType?.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
    if (fileType?.includes('word') || fileType?.includes('document')) return <FileText className="w-5 h-5 text-blue-500" />;
    return <Paperclip className="w-5 h-5 text-gray-500" />;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Parse file into questions
  const handleParseFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setParsing(true);
    setError(null);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      const response = await api.post('/teacher/assignments/parse-file', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success && response.data.data.questions.length > 0) {
        setQuestions(prev => [...prev, ...response.data.data.questions]);
        setSuccess(`Đã phân tích ${response.data.data.questions.length} câu hỏi từ file!`);
        setContentTab('questions');
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError('Không tìm thấy câu hỏi nào trong file. Hãy đảm bảo file có định dạng: Câu 1: ... A. ... B. ...');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể phân tích file');
    } finally {
      setParsing(false);
      e.target.value = '';
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      'draft': 'bg-gray-100 text-gray-700',
      'scheduled': 'bg-blue-100 text-blue-700',
      'active': 'bg-green-100 text-green-700',
      'closed': 'bg-red-100 text-red-700',
      'archived': 'bg-yellow-100 text-yellow-700'
    };
    const labels = {
      'draft': 'Bản nháp',
      'scheduled': 'Đã lên lịch',
      'active': 'Đang hoạt động',
      'closed': 'Đã đóng',
      'archived': 'Lưu trữ'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    const labels = ASSIGNMENT_TYPES.find(t => t.value === type)?.label || type;
    const styles = {
      'homework': 'bg-indigo-100 text-indigo-700',
      'quiz': 'bg-purple-100 text-purple-700',
      'practice': 'bg-cyan-100 text-cyan-700',
      'exam': 'bg-red-100 text-red-700',
      'lesson': 'bg-green-100 text-green-700',
      'challenge': 'bg-orange-100 text-orange-700'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[type] || 'bg-gray-100 text-gray-700'}`}>
        {labels}
      </span>
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date() > new Date(dueDate);
  };

  // Filter assignments by search query (client-side)
  const filteredAssignments = assignments.filter(a => 
    !searchQuery || a.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <ClipboardList className="w-7 h-7 text-blue-600" />
              Quản lý bài tập
            </h1>
            <p className="text-gray-600 mt-1">
              Tổng cộng {totalAssignments} bài tập
            </p>
          </div>
          
          <button
            onClick={() => { resetForm(); setCreateModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Tạo bài tập mới
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <span className="text-red-700">{error}</span>
            <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-green-700">{success}</span>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài tập..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            
            {/* Class filter */}
            <select
              value={classFilter}
              onChange={(e) => { setClassFilter(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tất cả lớp</option>
              {classes.map(cls => (
                <option key={cls._id} value={cls._id}>{cls.name} ({cls.code})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Assignments table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-500">Đang tải...</p>
            </div>
          ) : filteredAssignments.length === 0 ? (
            <div className="p-8 text-center">
              <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Chưa có bài tập nào</p>
              <button
                onClick={() => { resetForm(); setCreateModal(true); }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Tạo bài tập đầu tiên
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Bài tập</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Loại</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Lớp</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Hạn nộp</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Nộp bài</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Trạng thái</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredAssignments.map((assignment) => (
                      <tr key={assignment._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-800">{assignment.title}</p>
                            {assignment.description && (
                              <p className="text-sm text-gray-500 truncate max-w-xs">{assignment.description}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {getTypeBadge(assignment.type)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {assignment.assignedTo?.classRoom?.name || 'Chưa gán'}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {assignment.schedule?.dueDate ? (
                            <span className={isOverdue(assignment.schedule.dueDate) ? 'text-red-600 font-medium' : 'text-gray-600'}>
                              {formatDate(assignment.schedule.dueDate)}
                              {isOverdue(assignment.schedule.dueDate) && (
                                <span className="block text-xs text-red-500">Đã hết hạn</span>
                              )}
                            </span>
                          ) : (
                            <span className="text-gray-400">Không giới hạn</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                            {assignment.statistics?.totalSubmissions || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(assignment.status)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleViewDetail(assignment)}
                              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Xem chi tiết"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEdit(assignment)}
                              className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Chỉnh sửa"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            {assignment.status === 'draft' && (
                              <button
                                onClick={() => handleStatusChange(assignment._id, 'active')}
                                className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                title="Kích hoạt"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            {assignment.status === 'active' && (
                              <button
                                onClick={() => handleStatusChange(assignment._id, 'closed')}
                                className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                title="Đóng"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => setDeleteModal({ open: true, assignment })}
                              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Lưu trữ"
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
                    Trang {currentPage} / {totalPages} ({totalAssignments} bài tập)
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

      {/* Create/Edit Modal */}
      {createModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingId ? 'Chỉnh sửa bài tập' : 'Tạo bài tập mới'}
              </h3>
              {/* Tabs */}
              <div className="flex gap-1 mt-4">
                {[
                  { key: 'info', label: 'Thông tin', icon: FileText },
                  { key: 'questions', label: `Câu hỏi (${questions.length})`, icon: ClipboardList },
                  { key: 'files', label: `File (${uploadedFiles.length})`, icon: Paperclip }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setContentTab(tab.key)}
                    className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      contentTab === tab.key
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {/* === INFO TAB === */}
              {contentTab === 'info' && (<>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề *</label>
                <input type="text" value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: Kiểm tra 15 phút Chương 1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Mô tả ngắn về bài tập..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại bài tập *</label>
                  <select value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                    {ASSIGNMENT_TYPES.map(t => (<option key={t.value} value={t.value}>{t.label}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gán cho lớp</label>
                  <select value={formData.classRoomId}
                    onChange={(e) => setFormData(prev => ({ ...prev, classRoomId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Chọn lớp...</option>
                    {classes.map(cls => (<option key={cls._id} value={cls._id}>{cls.name} ({cls.code})</option>))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hạn nộp</label>
                  <input type="datetime-local" value={formData.schedule.dueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, schedule: { ...prev.schedule, dueDate: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian làm bài (phút)</label>
                  <input type="number" value={formData.schedule.timeLimit}
                    onChange={(e) => setFormData(prev => ({ ...prev, schedule: { ...prev.schedule, timeLimit: e.target.value } }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Để trống = không giới hạn" min="1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Điểm tối đa</label>
                  <input type="number" value={formData.grading.maxPoints}
                    onChange={(e) => setFormData(prev => ({ ...prev, grading: { ...prev.grading, maxPoints: parseInt(e.target.value) || 100 } }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" min="1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Điểm đạt (%)</label>
                  <input type="number" value={formData.grading.passingScore}
                    onChange={(e) => setFormData(prev => ({ ...prev, grading: { ...prev.grading, passingScore: parseInt(e.target.value) || 50 } }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" min="0" max="100" />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.schedule.lateSubmissionAllowed}
                    onChange={(e) => setFormData(prev => ({ ...prev, schedule: { ...prev.schedule, lateSubmissionAllowed: e.target.checked } }))}
                    className="w-4 h-4 rounded text-blue-600" />
                  <span className="text-sm text-gray-700">Cho phép nộp muộn</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.grading.allowRetry}
                    onChange={(e) => setFormData(prev => ({ ...prev, grading: { ...prev.grading, allowRetry: e.target.checked } }))}
                    className="w-4 h-4 rounded text-blue-600" />
                  <span className="text-sm text-gray-700">Cho phép làm lại</span>
                </label>
              </div>
              </>)}

              {/* === QUESTIONS TAB === */}
              {contentTab === 'questions' && (<>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Thêm câu hỏi trắc nghiệm, tự luận, đúng/sai...</p>
                <button onClick={addQuestion}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                  <Plus className="w-4 h-4" /> Thêm câu hỏi
                </button>
              </div>
              {questions.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <ClipboardList className="w-10 h-10 mx-auto mb-2" />
                  <p>Chưa có câu hỏi nào. Bấm "Thêm câu hỏi" để bắt đầu.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                  {questions.map((q, qIdx) => (
                    <div key={qIdx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-blue-600">Câu {qIdx + 1}</span>
                        <div className="flex items-center gap-2">
                          <select value={q.type} onChange={(e) => updateQuestion(qIdx, 'type', e.target.value)}
                            className="text-xs px-2 py-1 border rounded-lg">
                            <option value="multiple-choice">Trắc nghiệm</option>
                            <option value="true-false">Đúng/Sai</option>
                            <option value="fill-in">Điền vào chỗ trống</option>
                            <option value="essay">Tự luận</option>
                          </select>
                          <input type="number" value={q.points} onChange={(e) => updateQuestion(qIdx, 'points', parseInt(e.target.value) || 10)}
                            className="w-16 text-xs px-2 py-1 border rounded-lg" min="1" title="Điểm" />
                          <button onClick={() => removeQuestion(qIdx)}
                            className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"><X className="w-4 h-4" /></button>
                        </div>
                      </div>
                      <textarea value={q.question} onChange={(e) => updateQuestion(qIdx, 'question', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm mb-2" rows={2}
                        placeholder="Nhập nội dung câu hỏi..." />
                      
                      {(q.type === 'multiple-choice' || q.type === 'true-false') && (
                        <div className="space-y-1.5 mt-2">
                          <p className="text-xs text-gray-500 font-medium">Đáp án (chọn đáp án đúng):</p>
                          {q.options.map((opt, oIdx) => (
                            <div key={oIdx} className="flex items-center gap-2">
                              <input type="radio" name={`correct-${qIdx}`} checked={q.correctAnswer === oIdx}
                                onChange={() => updateQuestion(qIdx, 'correctAnswer', oIdx)}
                                className="w-4 h-4 text-blue-600" />
                              <input type="text" value={opt}
                                onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                                className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg text-sm"
                                placeholder={`Đáp án ${String.fromCharCode(65 + oIdx)}`} />
                              {q.options.length > 2 && (
                                <button onClick={() => removeOption(qIdx, oIdx)}
                                  className="p-1 text-gray-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                              )}
                            </div>
                          ))}
                          {q.options.length < 6 && (
                            <button onClick={() => addOption(qIdx)}
                              className="text-xs text-blue-600 hover:text-blue-700 mt-1">+ Thêm đáp án</button>
                          )}
                        </div>
                      )}
                      {q.type === 'fill-in' && (
                        <div className="mt-2">
                          <label className="text-xs text-gray-500 font-medium">Đáp án đúng:</label>
                          <input type="text" value={q.correctAnswer || ''}
                            onChange={(e) => updateQuestion(qIdx, 'correctAnswer', e.target.value)}
                            className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-sm mt-1"
                            placeholder="Nhập đáp án đúng..." />
                        </div>
                      )}
                      <div className="mt-2">
                        <input type="text" value={q.explanation || ''}
                          onChange={(e) => updateQuestion(qIdx, 'explanation', e.target.value)}
                          className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-500"
                          placeholder="Giải thích đáp án (tùy chọn)" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              </>)}

              {/* === FILES TAB === */}
              {contentTab === 'files' && (<>
                {/* Parse file into questions - always available */}
                <div className="border-2 border-dashed border-emerald-300 rounded-xl p-6 text-center bg-emerald-50/50 hover:border-emerald-400 transition-colors">
                  <BookOpen className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-emerald-700 mb-1">📄 Tải file & tự động phân tích câu hỏi</p>
                  <p className="text-xs text-gray-500 mb-3">Upload file PDF, Word, TXT chứa đề bài → hệ thống sẽ tự nhận diện và tạo câu hỏi</p>
                  <p className="text-xs text-gray-400 mb-3">Định dạng mẫu: Câu 1: ... A. ... B. ... C. ... D. ... Đáp án: A</p>
                  <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    {parsing ? 'Đang phân tích...' : 'Chọn file để phân tích'}
                    <input type="file" accept=".pdf,.doc,.docx,.txt"
                      onChange={handleParseFile} className="hidden" disabled={parsing} />
                  </label>
                </div>

                {/* Regular file upload (attachments) - requires saved assignment */}
                {!editingId ? (
                  <div className="text-center py-4 text-gray-400 border border-gray-200 rounded-xl">
                    <Paperclip className="w-6 h-6 mx-auto mb-1" />
                    <p className="text-sm">Lưu bài tập trước để đính kèm file</p>
                  </div>
                ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                  <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-600 mb-1">📎 Đính kèm file (không phân tích)</p>
                  <p className="text-xs text-gray-400 mb-3">PDF, Word, Excel, PowerPoint, hình ảnh (tối đa 10MB/file)</p>
                  <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    {uploading ? 'Đang tải...' : 'Chọn file đính kèm'}
                    <input type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.webp,.txt"
                      onChange={handleFileUpload} className="hidden" disabled={uploading} />
                  </label>
                </div>
                )}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <p className="text-sm font-medium text-gray-700">File đã tải ({uploadedFiles.length}):</p>
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3 min-w-0">
                          {getFileIcon(file.fileType)}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{file.originalName}</p>
                            <p className="text-xs text-gray-400">{formatFileSize(file.fileSize)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <a href={`${api.defaults.baseURL?.replace('/api', '')}${file.filePath}`} target="_blank" rel="noopener noreferrer"
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="Tải xuống">
                            <Download className="w-4 h-4" />
                          </a>
                          <button onClick={() => handleDeleteFile(file.fileName)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Xóa">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>)}
            </div>
            
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => { setCreateModal(false); resetForm(); }}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                disabled={saving}
              >
                Hủy
              </button>
              <button
                onClick={handleCreate}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Đang lưu...' : (editingId ? 'Cập nhật' : 'Tạo bài tập')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {detailModal.open && detailModal.assignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{detailModal.assignment.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {getTypeBadge(detailModal.assignment.type)}
                  {getStatusBadge(detailModal.assignment.status)}
                </div>
              </div>
              <button
                onClick={() => setDetailModal({ open: false, assignment: null })}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Info */}
              {detailModal.assignment.description && (
                <p className="text-gray-600 mb-4">{detailModal.assignment.description}</p>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Lớp</p>
                  <p className="font-medium text-gray-800">
                    {detailModal.assignment.assignedTo?.classRoom?.name || 'Chưa gán'}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Điểm tối đa</p>
                  <p className="font-medium text-gray-800">{detailModal.assignment.grading?.maxPoints || 100}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Đã nộp</p>
                  <p className="font-medium text-gray-800">{detailModal.assignment.statistics?.totalSubmissions || 0}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Điểm TB</p>
                  <p className="font-medium text-gray-800">{detailModal.assignment.statistics?.averageScore || 0}</p>
                </div>
              </div>
              
              {/* Submissions */}
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Bài nộp ({detailModal.assignment.submissions?.length || 0})
              </h4>
              
              {(!detailModal.assignment.submissions || detailModal.assignment.submissions.length === 0) ? (
                <p className="text-gray-500 text-sm">Chưa có bài nộp nào</p>
              ) : (
                <div className="space-y-2">
                  {detailModal.assignment.submissions.map((sub, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            {(sub.student?.displayName || sub.student?.username || '?')[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">
                            {sub.student?.displayName || sub.student?.username || 'Học sinh'}
                          </p>
                          <p className="text-xs text-gray-500">
                            Nộp lúc: {formatDate(sub.submittedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {sub.status === 'graded' ? (
                          <div className="text-right">
                            <p className="font-medium text-green-600">
                              {sub.score}/{detailModal.assignment.grading?.maxPoints || 100}
                            </p>
                            <div className="flex">
                              {[...Array(sub.stars || 0)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-orange-600 font-medium">Chưa chấm</span>
                        )}
                        <button
                          onClick={() => {
                            setGradeData({ 
                              score: sub.score || '', 
                              feedback: sub.feedback?.comment || '' 
                            });
                            setGradeModal({ 
                              open: true, 
                              assignment: detailModal.assignment, 
                              submission: sub 
                            });
                          }}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          {sub.status === 'graded' ? 'Sửa điểm' : 'Chấm điểm'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grade Modal */}
      {gradeModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Chấm điểm</h3>
              <p className="text-sm text-gray-500 mt-1">
                Học sinh: {gradeModal.submission?.student?.displayName || gradeModal.submission?.student?.username || 'N/A'}
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Điểm (tối đa {gradeModal.assignment?.grading?.maxPoints || 100})
                </label>
                <input
                  type="number"
                  value={gradeData.score}
                  onChange={(e) => setGradeData(prev => ({ ...prev, score: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max={gradeModal.assignment?.grading?.maxPoints || 100}
                  placeholder="Nhập điểm..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nhận xét</label>
                <textarea
                  value={gradeData.feedback}
                  onChange={(e) => setGradeData(prev => ({ ...prev, feedback: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhận xét cho học sinh..."
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => { setGradeModal({ open: false, assignment: null, submission: null }); setGradeData({ score: '', feedback: '' }); }}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                disabled={grading}
              >
                Hủy
              </button>
              <button
                onClick={handleGrade}
                disabled={grading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {grading ? 'Đang lưu...' : 'Lưu điểm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Xác nhận lưu trữ</h3>
            <p className="text-gray-600 mb-4">
              Bạn có chắc muốn lưu trữ bài tập "<span className="font-medium">{deleteModal.assignment?.title}</span>"? 
              Bài tập sẽ được chuyển sang trạng thái lưu trữ.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal({ open: false, assignment: null })}
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
                {deleting ? 'Đang xử lý...' : 'Lưu trữ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentManagement;
