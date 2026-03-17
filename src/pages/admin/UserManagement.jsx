import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../config/api';
import {
  Users, Search, Filter, MoreVertical, Edit2, Trash2,
  Shield, UserCheck, GraduationCap, ChevronLeft, ChevronRight,
  AlertCircle, X, Check, Lock, Unlock
} from 'lucide-react';

const UserManagement = ({ initialRole = 'all' }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters] = useState({
    role: initialRole,
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'edit', 'delete', 'changeRole'
  const [editForm, setEditForm] = useState({ displayName: '', email: '' });

  const fetchUsers = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit: 20,
        ...filters
      });
      
      const response = await api.get(`/admin/users?${params}`);
      if (response.data.success) {
        setUsers(response.data.data.users);
        setPagination(response.data.data.pagination);
      }
    } catch (err) {
      console.error('Fetch users error:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchUsers();
  }, [user, navigate, fetchUsers]);

  useEffect(() => {
    setFilters(prev => ({ ...prev, role: initialRole }));
  }, [initialRole]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(1);
  };

  const handleRoleFilter = (role) => {
    setFilters(prev => ({ ...prev, role }));
  };

  const openModal = (type, userData) => {
    setSelectedUser(userData);
    setModalType(type);
    if (type === 'edit') {
      setEditForm({
        displayName: userData.displayName || '',
        email: userData.email || ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType('');
    setShowModal(false);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      const response = await api.delete(`/admin/users/${selectedUser._id}`);
      if (response.data.success) {
        fetchUsers(pagination.page);
        closeModal();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Không thể xóa người dùng');
    }
  };

  const handleChangeRole = async (newRole) => {
    if (!selectedUser) return;
    
    try {
      const response = await api.post(`/admin/users/${selectedUser._id}/change-role`, {
        role: newRole
      });
      if (response.data.success) {
        fetchUsers(pagination.page);
        closeModal();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Không thể thay đổi role');
    }
  };

  const handleEditUser = async () => {
    if (!selectedUser) return;
    try {
      const response = await api.put(`/admin/users/${selectedUser._id}`, editForm);
      if (response.data.success) {
        fetchUsers(pagination.page);
        closeModal();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Không thể cập nhật người dùng');
    }
  };

  const handleUnlockUser = async (userId) => {
    try {
      const response = await api.post(`/admin/users/${userId}/unlock`);
      if (response.data.success) {
        fetchUsers(pagination.page);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Không thể mở khóa tài khoản');
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4 text-red-500" />;
      case 'teacher': return <GraduationCap className="h-4 w-4 text-purple-500" />;
      default: return <UserCheck className="h-4 w-4 text-green-500" />;
    }
  };

  const getRoleBadge = (role) => {
    const styles = {
      admin: 'bg-red-100 text-red-700',
      teacher: 'bg-purple-100 text-purple-700',
      student: 'bg-green-100 text-green-700'
    };
    const labels = {
      admin: 'Admin',
      teacher: 'Giáo viên',
      student: 'Học sinh'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[role] || styles.student}`}>
        {labels[role] || 'Học sinh'}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/admin')} className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="h-6 w-6 text-indigo-600" />
                Quản lý người dùng
              </h1>
              <p className="text-gray-500 text-sm">{pagination.total} người dùng</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm theo tên, email..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* Role Filter */}
            <div className="flex gap-2">
              {['all', 'student', 'teacher', 'admin'].map(role => (
                <button
                  key={role}
                  onClick={() => handleRoleFilter(role)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.role === role
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {role === 'all' ? 'Tất cả' : 
                   role === 'student' ? 'Học sinh' :
                   role === 'teacher' ? 'Giáo viên' : 'Admin'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Người dùng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    XP / Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                      <p className="mt-2">Đang tải...</p>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      Không tìm thấy người dùng
                    </td>
                  </tr>
                ) : (
                  users.map(u => (
                    <tr key={u._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            {u.avatar ? (
                              <img src={u.avatar} alt="" className="w-10 h-10 rounded-full" />
                            ) : (
                              <span className="text-indigo-600 font-medium">
                                {u.displayName?.[0] || u.username?.[0]}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{u.displayName || u.username}</p>
                            <p className="text-sm text-gray-500">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getRoleIcon(u.role)}
                          {getRoleBadge(u.role)}
                          {u.role === 'teacher' && u.teacherStatus && u.teacherStatus !== 'none' && (
                            <span className={`px-1.5 py-0.5 rounded text-xs ${
                              u.teacherStatus === 'pending' ? 'bg-amber-100 text-amber-700' :
                              u.teacherStatus === 'approved' ? 'bg-green-100 text-green-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {u.teacherStatus === 'pending' ? 'Chờ duyệt' :
                               u.teacherStatus === 'approved' ? 'Đã duyệt' : 'Từ chối'}
                            </span>
                          )}
                          {u.isLocked && (
                            <span className="px-1.5 py-0.5 rounded text-xs bg-red-100 text-red-700 flex items-center gap-1">
                              <Lock className="h-3 w-3" />
                              Khóa
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{u.xp?.toLocaleString() || 0} XP</p>
                        <p className="text-sm text-gray-500">Level {u.level || 1}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {new Date(u.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openModal('edit', u)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-indigo-600"
                            title="Chỉnh sửa"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => openModal('changeRole', u)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-purple-600"
                            title="Đổi role"
                          >
                            <Shield className="h-4 w-4" />
                          </button>
                          {u.isLocked && (
                            <button
                              onClick={() => handleUnlockUser(u._id)}
                              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-green-600"
                              title="Mở khóa"
                            >
                              <Unlock className="h-4 w-4" />
                            </button>
                          )}
                          {u._id !== user.id && (
                            <button
                              onClick={() => openModal('delete', u)}
                              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-red-600"
                              title="Xóa"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="px-6 py-4 border-t flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Trang {pagination.page} / {pagination.pages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchUsers(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => fetchUsers(pagination.page + 1)}
                  disabled={pagination.page >= pagination.pages}
                  className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {modalType === 'delete' && 'Xác nhận xóa'}
                  {modalType === 'changeRole' && 'Thay đổi role'}
                  {modalType === 'edit' && 'Chỉnh sửa người dùng'}
                </h3>
                <button onClick={closeModal} className="p-1 hover:bg-gray-100 rounded">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {modalType === 'delete' && (
                <>
                  <p className="text-gray-600 mb-4">
                    Bạn có chắc muốn xóa người dùng <strong>{selectedUser.displayName || selectedUser.username}</strong>?
                    Hành động này không thể hoàn tác.
                  </p>
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleDeleteUser}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Xóa
                    </button>
                  </div>
                </>
              )}

              {modalType === 'changeRole' && (
                <>
                  <p className="text-gray-600 mb-4">
                    Chọn role mới cho <strong>{selectedUser.displayName || selectedUser.username}</strong>:
                  </p>
                  <div className="space-y-2">
                    {['student', 'teacher', 'admin'].map(role => (
                      <button
                        key={role}
                        onClick={() => handleChangeRole(role)}
                        disabled={selectedUser.role === role}
                        className={`w-full p-3 rounded-lg border text-left flex items-center justify-between ${
                          selectedUser.role === role 
                            ? 'bg-indigo-50 border-indigo-300' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {getRoleIcon(role)}
                          <span className="font-medium">
                            {role === 'student' ? 'Học sinh' :
                             role === 'teacher' ? 'Giáo viên' : 'Admin'}
                          </span>
                        </div>
                        {selectedUser.role === role && (
                          <Check className="h-5 w-5 text-indigo-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {modalType === 'edit' && (
                <>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tên hiển thị</label>
                      <input
                        type="text"
                        value={editForm.displayName}
                        onChange={(e) => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    {/* Lock status info */}
                    {selectedUser.isLocked && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-red-700 text-sm font-medium mb-1">
                          <Lock className="h-4 w-4" />
                          Tài khoản đang bị khóa
                        </div>
                        {selectedUser.lockReason && (
                          <p className="text-red-600 text-sm">{selectedUser.lockReason}</p>
                        )}
                        <button
                          onClick={() => { handleUnlockUser(selectedUser._id); closeModal(); }}
                          className="mt-2 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 flex items-center gap-1"
                        >
                          <Unlock className="h-3 w-3" />
                          Mở khóa tài khoản
                        </button>
                      </div>
                    )}

                    {/* Teacher status info */}
                    {selectedUser.role === 'teacher' && selectedUser.teacherStatus && selectedUser.teacherStatus !== 'none' && (
                      <div className={`rounded-lg p-3 text-sm ${
                        selectedUser.teacherStatus === 'pending' ? 'bg-amber-50 border border-amber-200 text-amber-700' :
                        selectedUser.teacherStatus === 'approved' ? 'bg-green-50 border border-green-200 text-green-700' :
                        'bg-red-50 border border-red-200 text-red-700'
                      }`}>
                        Trạng thái giáo viên: {
                          selectedUser.teacherStatus === 'pending' ? 'Chờ duyệt' :
                          selectedUser.teacherStatus === 'approved' ? 'Đã duyệt' : 'Đã từ chối'
                        }
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 justify-end mt-4">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleEditUser}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
