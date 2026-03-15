import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../config/api';
import { ArrowLeft, Search, Filter, Clock, User, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

const ACTION_LABELS = {
  delete_user: { text: 'Xóa người dùng', color: 'bg-red-100 text-red-700' },
  change_role: { text: 'Thay đổi vai trò', color: 'bg-purple-100 text-purple-700' },
  verify_teacher: { text: 'Xác minh giáo viên', color: 'bg-green-100 text-green-700' },
  update_user: { text: 'Cập nhật người dùng', color: 'bg-blue-100 text-blue-700' },
  transfer_class: { text: 'Chuyển lớp', color: 'bg-yellow-100 text-yellow-700' },
  approve_teacher: { text: 'Phê duyệt giáo viên', color: 'bg-emerald-100 text-emerald-700' },
  reject_teacher: { text: 'Từ chối giáo viên', color: 'bg-red-100 text-red-700' },
  system_settings_change: { text: 'Thay đổi cài đặt', color: 'bg-orange-100 text-orange-700' },
  resubmit_teacher: { text: 'Nộp lại hồ sơ GV', color: 'bg-cyan-100 text-cyan-700' }
};

export default function AuditLogViewer() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 0 });
  const [filters, setFilters] = useState({ action: 'all', search: '', startDate: '', endDate: '' });
  const [expandedLog, setExpandedLog] = useState(null);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchLogs();
  }, [pagination.page, filters]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        ...(filters.action !== 'all' && { action: filters.action }),
        ...(filters.search && { search: filters.search }),
        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate })
      });
      const res = await api.get(`/admin/audit-logs?${params}`);
      if (res.data.success) {
        setLogs(res.data.data.logs);
        setPagination(prev => ({ ...prev, ...res.data.data.pagination }));
      }
    } catch (err) {
      console.error('Fetch audit logs error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return '—';
    return new Date(date).toLocaleString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchLogs();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate('/admin')} className="p-2 hover:bg-gray-200 rounded-lg">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Nhật ký hoạt động</h1>
            <p className="text-sm text-gray-500">Theo dõi tất cả hành động quản trị trong hệ thống</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <form onSubmit={handleSearch} className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-600 mb-1">Tìm kiếm</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm theo tên, email..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="min-w-[180px]">
              <label className="block text-sm font-medium text-gray-600 mb-1">Hành động</label>
              <select
                value={filters.action}
                onChange={(e) => { setFilters(prev => ({ ...prev, action: e.target.value })); setPagination(prev => ({ ...prev, page: 1 })); }}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả</option>
                {Object.entries(ACTION_LABELS).map(([key, val]) => (
                  <option key={key} value={key}>{val.text}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Từ ngày</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => { setFilters(prev => ({ ...prev, startDate: e.target.value })); setPagination(prev => ({ ...prev, page: 1 })); }}
                className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Đến ngày</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => { setFilters(prev => ({ ...prev, endDate: e.target.value })); setPagination(prev => ({ ...prev, page: 1 })); }}
                className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-1">
              <Filter size={14} /> Lọc
            </button>
          </form>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-400">Đang tải...</div>
          ) : logs.length === 0 ? (
            <div className="p-12 text-center text-gray-400">Không có nhật ký nào</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Thời gian</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Admin</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Hành động</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Đối tượng</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Chi tiết</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {logs.map((log) => {
                    const actionLabel = ACTION_LABELS[log.action] || { text: log.action, color: 'bg-gray-100 text-gray-700' };
                    return (
                      <tr key={log._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-gray-500">
                            <Clock size={14} />
                            <span>{formatDate(log.timestamp)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                              <Shield size={14} className="text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 text-xs">
                                {log.performedBy?.displayName || log.performedBy?.username || '—'}
                              </p>
                              <p className="text-xs text-gray-400">{log.performedBy?.email || ''}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${actionLabel.color}`}>
                            {actionLabel.text}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                              <User size={14} className="text-gray-500" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 text-xs">
                                {log.targetUser?.displayName || log.targetUser?.username || '—'}
                              </p>
                              <p className="text-xs text-gray-400">{log.targetUser?.email || ''}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {log.details && Object.keys(log.details).length > 0 ? (
                            <button
                              onClick={() => setExpandedLog(expandedLog === log._id ? null : log._id)}
                              className="text-blue-600 hover:text-blue-800 text-xs underline"
                            >
                              {expandedLog === log._id ? 'Ẩn' : 'Xem'}
                            </button>
                          ) : (
                            <span className="text-gray-300 text-xs">—</span>
                          )}
                          {expandedLog === log._id && (
                            <pre className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600 max-w-xs overflow-auto">
                              {JSON.stringify(log.details, null, 2)}
                            </pre>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
              <p className="text-sm text-gray-500">
                Hiển thị {(pagination.page - 1) * pagination.limit + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} / {pagination.total}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page <= 1}
                  className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="px-3 py-1 text-sm font-medium">{pagination.page} / {pagination.pages}</span>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page >= pagination.pages}
                  className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-40"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
