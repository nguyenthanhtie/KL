import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../config/api';
import {
  Trophy, Search, Filter, ChevronLeft, ChevronRight,
  Target, Clock, Star, AlertCircle, PlayCircle, Eye, EyeOff
} from 'lucide-react';

const ChallengeManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters] = useState({
    grade: '',
    category: '',
    status: '',
    search: ''
  });

  const fetchChallenges = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit: 20,
        ...(filters.grade && { grade: filters.grade }),
        ...(filters.category && { category: filters.category }),
        ...(filters.status && { status: filters.status }),
        ...(filters.search && { search: filters.search })
      });
      
      const response = await api.get(`/admin/content/challenges?${params}`);
      if (response.data.success) {
        setChallenges(response.data.data.challenges);
        setPagination(response.data.data.pagination);
      }
    } catch (err) {
      console.error('Fetch challenges error:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchChallenges();
  }, [user, navigate, fetchChallenges]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchChallenges(1);
  };

  const handleToggleStatus = async (challengeId, currentStatus) => {
    try {
      const newStatus = (currentStatus === 'active' || currentStatus === 'available') ? 'draft' : 'active';
      const response = await api.put(`/admin/content/challenges/${challengeId}/status`, {
        status: newStatus
      });
      if (response.data.success) {
        // Cập nhật state nội bộ để UI phản hồi nhanh
        setChallenges(prev => 
          prev.map(c => 
            (c._id === challengeId || c.id === challengeId) ? { ...c, status: newStatus } : c
          )
        );
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Không thể cập nhật trạng thái thử thách');
    }
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'easy': return <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700 font-medium">Dễ</span>;
      case 'medium': return <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700 font-medium">Trung bình</span>;
      case 'hard': return <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-700 font-medium">Khó</span>;
      default: return <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700 font-medium">{difficulty}</span>;
    }
  };

  const getStatusBadge = (status) => {
    return (status === 'active' || status === 'available')
      ? <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700 font-medium">Hoạt động</span>
      : <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700 font-medium">Bản nháp</span>;
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
                <Trophy className="h-6 w-6 text-yellow-500" />
                Quản lý Thử thách
              </h1>
              <p className="text-gray-500 text-sm">{pagination.total} thử thách trong hệ thống</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm theo tên thử thách..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* Quick Filters */}
            <div className="flex gap-3">
              <select
                value={filters.grade}
                onChange={(e) => setFilters(prev => ({ ...prev, grade: e.target.value }))}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              >
                <option value="">Tất cả khối lớp</option>
                <option value="8">Lớp 8</option>
                <option value="9">Lớp 9</option>
                <option value="10">Lớp 10</option>
                <option value="11">Lớp 11</option>
                <option value="12">Lớp 12</option>
              </select>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              >
                <option value="">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="draft">Bản nháp</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Thử thách
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Phân loại
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Độ khó
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Phần thưởng
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto"></div>
                      <p className="mt-2 text-sm">Đang tải dữ liệu...</p>
                    </td>
                  </tr>
                ) : challenges.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <AlertCircle className="h-10 w-10 text-gray-300 mb-2" />
                        <p>Không tìm thấy thử thách nào phù hợp.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  challenges.map((challenge) => (
                    <tr key={challenge._id || challenge.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
                            <PlayCircle className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 line-clamp-1">{challenge.name}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Tạo ngày: {new Date(challenge.createdAt).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-gray-900 font-medium flex items-center gap-1">
                            <Target className="h-3 w-3 text-indigo-500" />
                            Lớp {challenge.grade}
                          </span>
                          <span className="text-xs text-gray-500 capitalize">{challenge.category || 'Mặc định'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getDifficultyBadge(challenge.difficulty || 'medium')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-1 text-yellow-600 font-medium">
                            <Trophy className="h-4 w-4" />
                            {challenge.points || 0}
                          </div>
                          {challenge.time && (
                            <div className="flex items-center gap-1 text-gray-500">
                              <Clock className="h-4 w-4" />
                              {challenge.time}p
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(challenge.status)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleToggleStatus(challenge._id || challenge.id, challenge.status)}
                          className={`p-2 rounded-lg transition-colors ${
                            (challenge.status === 'active' || challenge.status === 'available')
                              ? 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                              : 'text-gray-400 hover:text-green-500 hover:bg-green-50'
                          }`}
                          title={(challenge.status === 'active' || challenge.status === 'available') ? "Ẩn thử thách (Chuyển sang bản nháp)" : "Hiện thử thách (Kích hoạt)"}
                        >
                          {(challenge.status === 'active' || challenge.status === 'available') 
                            ? <EyeOff className="h-5 w-5" /> 
                            : <Eye className="h-5 w-5" />
                          }
                        </button>
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
                Hiển thị trang {pagination.page} / {pagination.pages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchChallenges(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="px-3 py-1 border border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:bg-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => fetchChallenges(pagination.page + 1)}
                  disabled={pagination.page >= pagination.pages}
                  className="px-3 py-1 border border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:bg-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeManagement;
