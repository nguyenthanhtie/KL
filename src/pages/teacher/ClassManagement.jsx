import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../config/api';
import { 
  School, Users, Plus, Settings, ChevronLeft, Copy, 
  UserPlus, Trash2, BarChart3, Bell, ClipboardList,
  CheckCircle, AlertCircle, X, Swords, Clock, Calendar,
  BookOpen, Trophy, Edit, Eye
} from 'lucide-react';

const ClassManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { classId } = useParams();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [pendingStudents, setPendingStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showPKModal, setShowPKModal] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    description: '',
    grade: 10,
    curriculumType: 'ketnoi'
  });
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    type: 'homework',
    lessonId: '',
    challengeSlug: '',
    dueDate: '',
    dueTime: '',
    points: 100
  });
  const [newPKRoom, setNewPKRoom] = useState({
    name: '',
    questionCount: 10,
    timePerQuestion: 30
  });
  const [studentEmails, setStudentEmails] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('students');

  const fetchClasses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/teacher/classes');
      if (response.data.success) {
        setClasses(response.data.data);
      }
    } catch (err) {
      console.error('Fetch classes error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchClassDetail = useCallback(async (id) => {
    try {
      const response = await api.get(`/teacher/classes/${id}`);
      if (response.data.success) {
        setSelectedClass(response.data.data);
      }
    } catch (err) {
      console.error('Fetch class detail error:', err);
    }
  }, []);

  const fetchStudents = useCallback(async (id) => {
    try {
      const response = await api.get(`/teacher/classes/${id}/students`);
      if (response.data.success) {
        setStudents(response.data.data);
      }
      
      const pendingResponse = await api.get(`/teacher/classes/${id}/pending-students`);
      if (pendingResponse.data.success) {
        setPendingStudents(pendingResponse.data.data);
      }
    } catch (err) {
      console.error('Fetch students error:', err);
    }
  }, []);

  const fetchAssignments = useCallback(async (id) => {
    try {
      const response = await api.get(`/teacher/classes/${id}/assignments`);
      if (response.data.success) {
        setAssignments(response.data.data);
      }
    } catch (err) {
      console.error('Fetch assignments error:', err);
    }
  }, []);

  useEffect(() => {
    if (!user || (user.role !== 'teacher' && user.role !== 'admin')) {
      navigate('/');
      return;
    }
    fetchClasses();
  }, [user, navigate, fetchClasses]);

  useEffect(() => {
    if (classId) {
      fetchClassDetail(classId);
      fetchStudents(classId);
      fetchAssignments(classId);
    }
  }, [classId, fetchClassDetail, fetchStudents, fetchAssignments]);

  const handleCreateClass = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/teacher/classes', newClass);
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Tạo lớp học thành công!' });
        setShowCreateModal(false);
        setNewClass({ name: '', description: '', grade: 10, curriculumType: 'ketnoi' });
        fetchClasses();
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Không thể tạo lớp' });
    }
  };

  const handleAddStudents = async (e) => {
    e.preventDefault();
    if (!selectedClass) return;
    
    try {
      const emails = studentEmails.split(/[,\n]/).map(e => e.trim()).filter(e => e);
      const response = await api.post(`/teacher/classes/${selectedClass._id}/students`, {
        studentEmails: emails
      });
      
      if (response.data.success) {
        setMessage({ 
          type: 'success', 
          text: `Đã thêm ${response.data.data.added.length} học sinh${
            response.data.data.errors.length > 0 
              ? `. Lỗi: ${response.data.data.errors.join(', ')}` 
              : ''
          }` 
        });
        setShowAddStudentModal(false);
        setStudentEmails('');
        fetchStudents(selectedClass._id);
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Không thể thêm học sinh' });
    }
  };

  // Giao bài tập
  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    if (!selectedClass) return;
    
    try {
      const response = await api.post(`/teacher/classes/${selectedClass._id}/quick-assignment`, newAssignment);
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Giao bài tập thành công!' });
        setShowAssignmentModal(false);
        setNewAssignment({
          title: '',
          description: '',
          type: 'homework',
          lessonId: '',
          challengeSlug: '',
          dueDate: '',
          dueTime: '',
          points: 100
        });
        fetchAssignments(selectedClass._id);
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Không thể giao bài tập' });
    }
  };

  // Tạo phòng PK
  const handleCreatePKRoom = async (e) => {
    e.preventDefault();
    if (!selectedClass) return;
    
    try {
      const response = await api.post(`/teacher/classes/${selectedClass._id}/pk-room`, newPKRoom);
      if (response.data.success) {
        const { roomCode, spectatorUrl } = response.data.data;
        setMessage({ type: 'success', text: `Tạo phòng PK thành công! Mã phòng: ${roomCode}` });
        setShowPKModal(false);
        
        // Copy mã phòng vào clipboard
        navigator.clipboard.writeText(roomCode);
        
        // Hỏi có muốn vào quan sát phòng ngay không
        if (window.confirm(`Phòng PK đã được tạo!\nMã phòng: ${roomCode} (đã copy)\n\nBạn là người quan sát và sẽ theo dõi quá trình chơi của học sinh.\n\nBạn có muốn vào quan sát ngay?`)) {
          navigate(spectatorUrl);
        }
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Không thể tạo phòng PK' });
    }
  };

  // Xóa bài tập
  const handleDeleteAssignment = async (assignmentId) => {
    if (!window.confirm('Bạn có chắc muốn xóa bài tập này?')) return;
    
    try {
      const response = await api.delete(`/teacher/classes/${selectedClass._id}/assignments/${assignmentId}`);
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Đã xóa bài tập' });
        fetchAssignments(selectedClass._id);
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Không thể xóa bài tập' });
    }
  };

  const handleRemoveStudent = async (studentId) => {
    if (!selectedClass || !window.confirm('Bạn có chắc muốn xóa học sinh này khỏi lớp?')) return;
    
    try {
      const response = await api.delete(`/teacher/classes/${selectedClass._id}/students/${studentId}`);
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Đã xóa học sinh khỏi lớp' });
        fetchStudents(selectedClass._id);
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Không thể xóa học sinh' });
    }
  };

  const handleApproveStudent = async (studentId) => {
    if (!selectedClass) return;
    try {
      const response = await api.put(`/teacher/classes/${selectedClass._id}/students/${studentId}/approve`);
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Đã duyệt học sinh thành công' });
        fetchStudents(selectedClass._id);
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Không thể duyệt học sinh' });
    }
  };

  const handleRejectStudent = async (studentId) => {
    if (!selectedClass || !window.confirm('Bạn có chắc muốn từ chối học sinh này?')) return;
    try {
      const response = await api.put(`/teacher/classes/${selectedClass._id}/students/${studentId}/reject`);
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Đã từ chối học sinh' });
        fetchStudents(selectedClass._id);
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Không thể từ chối học sinh' });
    }
  };

  const copyClassCode = (code) => {
    navigator.clipboard.writeText(code);
    setMessage({ type: 'success', text: 'Đã sao chép mã lớp!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 2000);
  };

  // List view when no class selected
  if (!classId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/teacher')} className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Quản lý lớp học</h1>
                <p className="text-gray-500 text-sm">{classes.length} lớp học</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <Plus className="h-5 w-5" />
              Tạo lớp mới
            </button>
          </div>

          {/* Message */}
          {message.text && (
            <div className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
              message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {message.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              {message.text}
            </div>
          )}

          {/* Classes Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-2 text-gray-500">Đang tải...</p>
            </div>
          ) : classes.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <School className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">Chưa có lớp học nào</h3>
              <p className="text-gray-500 mb-4">Tạo lớp học đầu tiên để bắt đầu quản lý học sinh</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Tạo lớp học
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map(cls => (
                <div
                  key={cls._id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/teacher/classes/${cls._id}`)}
                >
                  <div className="h-3 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{cls.name}</h3>
                        <p className="text-gray-500 text-sm">Lớp {cls.grade}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyClassCode(cls.code);
                        }}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm font-mono hover:bg-gray-200"
                      >
                        {cls.code}
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {cls.studentCount} học sinh
                      </div>
                      <div className="flex items-center gap-1">
                        <ClipboardList className="h-4 w-4" />
                        {cls.assignmentCount || 0} bài tập
                      </div>
                    </div>
                    
                    {cls.status !== 'active' && (
                      <span className={`mt-3 inline-block px-2 py-1 rounded text-xs ${
                        cls.status === 'archived' ? 'bg-gray-100 text-gray-600' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {cls.status === 'archived' ? 'Đã lưu trữ' : 'Chờ duyệt'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Class Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Tạo lớp học mới</h3>
                <button onClick={() => setShowCreateModal(false)} className="p-1 hover:bg-gray-100 rounded">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleCreateClass} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên lớp *</label>
                  <input
                    type="text"
                    value={newClass.name}
                    onChange={(e) => setNewClass(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="VD: 10A1 - Hóa học"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                  <textarea
                    value={newClass.description}
                    onChange={(e) => setNewClass(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    rows="2"
                    placeholder="Mô tả ngắn về lớp học"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Khối lớp *</label>
                    <select
                      value={newClass.grade}
                      onChange={(e) => setNewClass(prev => ({ ...prev, grade: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value={8}>Lớp 8</option>
                      <option value={9}>Lớp 9</option>
                      <option value={10}>Lớp 10</option>
                      <option value={11}>Lớp 11</option>
                      <option value={12}>Lớp 12</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chương trình</label>
                    <select
                      value={newClass.curriculumType}
                      onChange={(e) => setNewClass(prev => ({ ...prev, curriculumType: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="ketnoi">Kết nối tri thức</option>
                      <option value="canhdieu">Cánh diều</option>
                      <option value="chantroicangtao">Chân trời sáng tạo</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Tạo lớp
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Class detail view
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/teacher/classes')} className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedClass?.name || 'Chi tiết lớp'}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-500 text-sm">Mã lớp:</span>
                <button
                  onClick={() => copyClassCode(selectedClass?.code)}
                  className="flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded font-mono text-sm hover:bg-purple-200"
                >
                  {selectedClass?.code}
                  <Copy className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddStudentModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <UserPlus className="h-5 w-5" />
              Thêm học sinh
            </button>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            {message.text}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-gray-500 text-sm">Học sinh</p>
            <p className="text-2xl font-bold text-gray-800">{students.length}</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-gray-500 text-sm">Điểm trung bình</p>
            <p className="text-2xl font-bold text-blue-600">{selectedClass?.statistics?.averageScore || 0}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <button 
            onClick={() => setShowAssignmentModal(true)}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left border-2 border-transparent hover:border-purple-500"
          >
            <ClipboardList className="h-6 w-6 text-purple-600 mb-2" />
            <p className="font-medium text-gray-800">Giao bài tập</p>
            <p className="text-xs text-gray-500">Tạo bài tập mới</p>
          </button>
          <button 
            onClick={() => setShowPKModal(true)}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left border-2 border-transparent hover:border-red-500"
          >
            <Swords className="h-6 w-6 text-red-600 mb-2" />
            <p className="font-medium text-gray-800">Tạo phòng PK</p>
            <p className="text-xs text-gray-500">PK trực tiếp cho lớp</p>
          </button>
          <button 
            onClick={() => navigate(`/teacher/classes/${classId}/report`)}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <BarChart3 className="h-6 w-6 text-green-600 mb-2" />
            <p className="font-medium text-gray-800">Báo cáo</p>
            <p className="text-xs text-gray-500">Xem thống kê</p>
          </button>
          <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left">
            <Bell className="h-6 w-6 text-orange-600 mb-2" />
            <p className="font-medium text-gray-800">Thông báo</p>
            <p className="text-xs text-gray-500">Gửi thông báo</p>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('students')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'students' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users className="h-4 w-4" />
            Học sinh ({students.length})
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'assignments' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ClipboardList className="h-4 w-4" />
            Bài tập ({assignments.length})
          </button>
        </div>

        {/* Pending Students List */}
        {activeTab === 'students' && pendingStudents.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 border border-yellow-200">
            <div className="px-6 py-4 border-b bg-yellow-50 flex items-center justify-between">
              <h2 className="font-semibold text-yellow-800 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Học sinh chờ duyệt
              </h2>
              <span className="text-sm text-yellow-700 bg-yellow-200 px-2 py-0.5 rounded-full font-medium">
                {pendingStudents.length} học sinh
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Học sinh</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thời gian yêu cầu</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {pendingStudents.map(student => (
                    <tr key={student._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                            {student.avatar ? (
                              <img src={student.avatar} alt="" className="w-10 h-10 rounded-full" />
                            ) : (
                              <span className="text-yellow-600 font-medium">
                                {student.displayName?.[0] || student.username?.[0]}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{student.displayName || student.username}</p>
                            <p className="text-sm text-gray-500">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {student.requestedAt ? new Date(student.requestedAt).toLocaleDateString('vi-VN') : '-'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleApproveStudent(student._id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg text-sm font-medium transition-colors"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Duyệt
                          </button>
                          <button
                            onClick={() => handleRejectStudent(student._id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-sm font-medium transition-colors"
                          >
                            <X className="h-4 w-4" />
                            Từ chối
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Students List */}
        {activeTab === 'students' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Danh sách học sinh</h2>
            <span className="text-sm text-gray-500">{students.length} học sinh</span>
          </div>
          
          {students.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Chưa có học sinh trong lớp</p>
              <button
                onClick={() => setShowAddStudentModal(true)}
                className="mt-3 text-purple-600 hover:text-purple-700 font-medium"
              >
                Thêm học sinh đầu tiên
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Học sinh</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">XP / Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiến trình</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hoạt động</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {students.map(student => (
                    <tr key={student._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            {student.avatar ? (
                              <img src={student.avatar} alt="" className="w-10 h-10 rounded-full" />
                            ) : (
                              <span className="text-purple-600 font-medium">
                                {student.displayName?.[0] || student.username?.[0]}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{student.displayName || student.username}</p>
                            <p className="text-sm text-gray-500">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800">{student.xp?.toLocaleString() || 0} XP</p>
                        <p className="text-sm text-gray-500">Level {student.level || 1}</p>
                      </td>
                      <td className="px-6 py-4">
                        {student.progress ? (
                          <div className="text-sm">
                            <p className="text-gray-600">{student.progress.completedLessons} bài học</p>
                            <p className="text-gray-600">{student.progress.completedChallenges} thử thách</p>
                          </div>
                        ) : (
                          <span className="text-gray-400">Chưa có dữ liệu</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {student.progress?.lastStudyDate ? (
                          <p className="text-sm text-gray-600">
                            {new Date(student.progress.lastStudyDate).toLocaleDateString('vi-VN')}
                          </p>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleRemoveStudent(student._id)}
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-600"
                          title="Xóa khỏi lớp"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        )}

        {/* Assignments List */}
        {activeTab === 'assignments' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">Danh sách bài tập</h2>
              <button
                onClick={() => setShowAssignmentModal(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
              >
                <Plus className="h-4 w-4" />
                Giao bài mới
              </button>
            </div>
            
            {assignments.length === 0 ? (
              <div className="p-12 text-center">
                <ClipboardList className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Chưa có bài tập nào</p>
                <button
                  onClick={() => setShowAssignmentModal(true)}
                  className="mt-3 text-purple-600 hover:text-purple-700 font-medium"
                >
                  Giao bài tập đầu tiên
                </button>
              </div>
            ) : (
              <div className="divide-y">
                {assignments.map(assignment => (
                  <div key={assignment._id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-800">{assignment.title}</h3>
                          {assignment.isOverdue && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">Quá hạn</span>
                          )}
                          {!assignment.isActive && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">Đã đóng</span>
                          )}
                        </div>
                        {assignment.description && (
                          <p className="text-sm text-gray-500 mb-2">{assignment.description}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            {assignment.type === 'lesson' ? <BookOpen className="h-4 w-4" /> : 
                             assignment.type === 'challenge' ? <Trophy className="h-4 w-4" /> :
                             <ClipboardList className="h-4 w-4" />}
                            {assignment.type === 'lesson' ? 'Bài học' : 
                             assignment.type === 'challenge' ? 'Thử thách' : 'Bài tập'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Trophy className="h-4 w-4" />
                            {assignment.points} điểm
                          </span>
                          {assignment.dueDate && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {new Date(assignment.dueDate).toLocaleString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-bold text-purple-600">
                            {assignment.completedCount}/{assignment.totalStudents}
                          </p>
                          <p className="text-xs text-gray-500">đã hoàn thành</p>
                          <div className="w-20 h-1.5 bg-gray-200 rounded-full mt-1">
                            <div 
                              className="h-full bg-purple-600 rounded-full"
                              style={{ width: `${assignment.completionRate}%` }}
                            />
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleDeleteAssignment(assignment._id)}
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-red-600"
                          title="Xóa bài tập"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add Student Modal */}
        {showAddStudentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Thêm học sinh</h3>
                <button onClick={() => setShowAddStudentModal(false)} className="p-1 hover:bg-gray-100 rounded">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleAddStudents} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email học sinh
                  </label>
                  <textarea
                    value={studentEmails}
                    onChange={(e) => setStudentEmails(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    rows="4"
                    placeholder="Nhập email học sinh, mỗi email một dòng hoặc cách nhau bằng dấu phẩy"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Học sinh phải đã có tài khoản trên hệ thống
                  </p>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddStudentModal(false)}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Thêm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Assignment Modal */}
        {showAssignmentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Giao bài tập mới</h3>
                <button onClick={() => setShowAssignmentModal(false)} className="p-1 hover:bg-gray-100 rounded">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleCreateAssignment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề *</label>
                  <input
                    type="text"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="VD: Hoàn thành bài 5 chương 2"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                  <textarea
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    rows="2"
                    placeholder="Mô tả chi tiết về bài tập..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Loại bài tập</label>
                    <select
                      value={newAssignment.type}
                      onChange={(e) => setNewAssignment(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="homework">Bài tập về nhà</option>
                      <option value="lesson">Bài học</option>
                      <option value="challenge">Thử thách</option>
                      <option value="quiz">Quiz</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Điểm tối đa</label>
                    <input
                      type="number"
                      value={newAssignment.points}
                      onChange={(e) => setNewAssignment(prev => ({ ...prev, points: parseInt(e.target.value) || 100 }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      min="10"
                      max="1000"
                    />
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Hạn nộp
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Ngày</label>
                      <input
                        type="date"
                        value={newAssignment.dueDate}
                        onChange={(e) => setNewAssignment(prev => ({ ...prev, dueDate: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Giờ</label>
                      <input
                        type="time"
                        value={newAssignment.dueTime}
                        onChange={(e) => setNewAssignment(prev => ({ ...prev, dueTime: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Nếu không chọn giờ, deadline sẽ là 23:59:59 của ngày đã chọn
                  </p>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAssignmentModal(false)}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Giao bài
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* PK Room Modal */}
        {showPKModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Swords className="h-5 w-5 text-red-500" />
                  Tạo phòng PK cho lớp
                </h3>
                <button onClick={() => setShowPKModal(false)} className="p-1 hover:bg-gray-100 rounded">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleCreatePKRoom} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên phòng</label>
                  <input
                    type="text"
                    value={newPKRoom.name}
                    onChange={(e) => setNewPKRoom(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder={`PK Lớp ${selectedClass?.name || ''}`}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số câu hỏi</label>
                    <select
                      value={newPKRoom.questionCount}
                      onChange={(e) => setNewPKRoom(prev => ({ ...prev, questionCount: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value={5}>5 câu</option>
                      <option value={10}>10 câu</option>
                      <option value={15}>15 câu</option>
                      <option value={20}>20 câu</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian/câu</label>
                    <select
                      value={newPKRoom.timePerQuestion}
                      onChange={(e) => setNewPKRoom(prev => ({ ...prev, timePerQuestion: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value={15}>15 giây</option>
                      <option value={20}>20 giây</option>
                      <option value={30}>30 giây</option>
                      <option value={45}>45 giây</option>
                      <option value={60}>60 giây</option>
                    </select>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                  <p>� <strong>Bạn sẽ là người quan sát</strong> - không tham gia chơi cùng học sinh.</p>
                  <p className="mt-1">💡 Sau khi tạo phòng, bạn sẽ nhận được mã phòng để chia sẻ cho học sinh.</p>
                  <p className="mt-1">📱 Học sinh vào <strong>PK Đối kháng</strong> và nhập mã để tham gia.</p>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPKModal(false)}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600"
                  >
                    Tạo phòng PK
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassManagement;
