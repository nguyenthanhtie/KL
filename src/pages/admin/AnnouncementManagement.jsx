import { useState, useEffect } from 'react';
import api from '../../config/api';
import { 
  Megaphone, Plus, Edit3, Trash2, Search, 
  AlertTriangle, Info, Bell, X, Check, ChevronDown
} from 'lucide-react';

const priorityConfig = {
  low: { label: 'Thấp', color: 'bg-gray-100 text-gray-700', dot: 'bg-gray-400' },
  normal: { label: 'Bình thường', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-400' },
  high: { label: 'Cao', color: 'bg-orange-100 text-orange-700', dot: 'bg-orange-400' },
  urgent: { label: 'Khẩn cấp', color: 'bg-red-100 text-red-700', dot: 'bg-red-400' }
};

const AnnouncementManagement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', priority: 'normal', isActive: true });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/announcements', { params: { search } });
      setAnnouncements(res.data.data.announcements || []);
    } catch (err) {
      console.error('Fetch announcements error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchAnnouncements(), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const openCreate = () => {
    setEditingAnnouncement(null);
    setForm({ title: '', content: '', priority: 'normal', isActive: true });
    setShowModal(true);
  };

  const openEdit = (ann) => {
    setEditingAnnouncement(ann);
    setForm({ title: ann.title, content: ann.content, priority: ann.priority, isActive: ann.isActive });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      alert('Vui lòng nhập đầy đủ tiêu đề và nội dung');
      return;
    }
    setSaving(true);
    try {
      if (editingAnnouncement) {
        await api.put(`/admin/announcements/${editingAnnouncement._id}`, form);
      } else {
        await api.post('/admin/announcements', form);
      }
      setShowModal(false);
      fetchAnnouncements();
    } catch (err) {
      console.error('Save announcement error:', err);
      alert('Có lỗi xảy ra khi lưu thông báo');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa thông báo này?')) return;
    try {
      await api.delete(`/admin/announcements/${id}`);
      fetchAnnouncements();
    } catch (err) {
      console.error('Delete announcement error:', err);
      alert('Có lỗi xảy ra khi xóa thông báo');
    }
  };

  const toggleActive = async (ann) => {
    try {
      await api.put(`/admin/announcements/${ann._id}`, { isActive: !ann.isActive });
      fetchAnnouncements();
    } catch (err) {
      console.error('Toggle active error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Megaphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Quản lý Thông báo</h1>
              <p className="text-sm text-gray-500">Đăng thông báo cho toàn hệ thống</p>
            </div>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
          >
            <Plus className="w-5 h-5" />
            Tạo thông báo mới
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm thông báo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
          />
        </div>

        {/* Announcements List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Chưa có thông báo nào</p>
            <p className="text-gray-400 text-sm mt-1">Nhấn "Tạo thông báo mới" để bắt đầu</p>
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((ann) => {
              const pc = priorityConfig[ann.priority] || priorityConfig.normal;
              return (
                <div
                  key={ann._id}
                  className={`bg-white rounded-2xl border transition-all hover:shadow-md ${
                    ann.isActive ? 'border-gray-200' : 'border-gray-100 opacity-60'
                  }`}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-800 truncate">{ann.title}</h3>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${pc.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${pc.dot}`} />
                            {pc.label}
                          </span>
                          {!ann.isActive && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
                              Đã ẩn
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{ann.content}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span>Bởi: {ann.author?.displayName || 'Admin'}</span>
                          <span>{new Date(ann.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => toggleActive(ann)}
                          title={ann.isActive ? 'Ẩn thông báo' : 'Hiện thông báo'}
                          className={`p-2 rounded-lg transition-colors ${
                            ann.isActive
                              ? 'text-green-600 bg-green-50 hover:bg-green-100'
                              : 'text-gray-400 bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          {ann.isActive ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => openEdit(ann)}
                          className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(ann._id)}
                          className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">
                {editingAnnouncement ? 'Sửa thông báo' : 'Tạo thông báo mới'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tiêu đề *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Nhập tiêu đề thông báo..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nội dung *</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Nhập nội dung thông báo..."
                  rows={5}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mức độ</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  >
                    <option value="low">Thấp</option>
                    <option value="normal">Bình thường</option>
                    <option value="high">Cao</option>
                    <option value="urgent">Khẩn cấp</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Trạng thái</label>
                  <select
                    value={form.isActive ? 'active' : 'hidden'}
                    onChange={(e) => setForm({ ...form, isActive: e.target.value === 'active' })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  >
                    <option value="active">Đang hiện</option>
                    <option value="hidden">Đã ẩn</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-gray-600 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:transform-none"
              >
                {saving ? 'Đang lưu...' : editingAnnouncement ? 'Cập nhật' : 'Đăng thông báo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementManagement;
