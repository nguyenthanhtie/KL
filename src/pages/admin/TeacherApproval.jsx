import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../config/api';
import {
  GraduationCap, Search, ChevronLeft, ChevronRight, X,
  Clock, CheckCircle, XCircle, Eye, Download, FileText,
  Image, School, BookOpen, Award, Briefcase, User,
  AlertCircle, Check, Ban
} from 'lucide-react';

const subjectLabels = {
  chemistry: 'Hóa học',
  physics: 'Vật lý',
  biology: 'Sinh học',
  math: 'Toán học'
};

const TeacherApproval = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [activeTab, setActiveTab] = useState('pending');
  const [search, setSearch] = useState('');
  const [pendingCount, setPendingCount] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchRequests = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit: 20,
        status: activeTab,
        search
      });
      const response = await api.get(`/admin/teacher-requests?${params}`);
      if (response.data.success) {
        setRequests(response.data.data.requests || response.data.data);
        if (response.data.data.pagination) {
          setPagination(response.data.data.pagination);
        }
      }
    } catch (err) {
      console.error('Fetch teacher requests error:', err);
    } finally {
      setLoading(false);
    }
  }, [activeTab, search]);

  const fetchPendingCount = useCallback(async () => {
    try {
      const response = await api.get('/admin/teacher-requests/count');
      if (response.data.success) {
        setPendingCount(response.data.data?.pendingCount || response.data.data?.count || 0);
      }
    } catch (err) {
      console.error('Fetch pending count error:', err);
    }
  }, []);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchRequests();
    fetchPendingCount();
  }, [user, navigate, fetchRequests, fetchPendingCount]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRequests(1);
  };

  const handleApprove = async (userId) => {
    try {
      setActionLoading(true);
      const response = await api.post(`/admin/teacher-requests/${userId}/approve`);
      if (response.data.success) {
        fetchRequests(pagination.page);
        fetchPendingCount();
        setShowDetailModal(false);
        setSelectedRequest(null);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Không thể phê duyệt');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert('Vui lòng nhập lý do từ chối');
      return;
    }
    try {
      setActionLoading(true);
      const response = await api.post(`/admin/teacher-requests/${selectedRequest._id}/reject`, {
        reason: rejectReason
      });
      if (response.data.success) {
        fetchRequests(pagination.page);
        fetchPendingCount();
        setShowRejectModal(false);
        setShowDetailModal(false);
        setSelectedRequest(null);
        setRejectReason('');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Không thể từ chối');
    } finally {
      setActionLoading(false);
    }
  };

  const openDetail = (request) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const openRejectModal = (request) => {
    setSelectedRequest(request);
    setRejectReason('');
    setShowRejectModal(true);
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: { label: 'Chờ duyệt', className: 'bg-amber-100 text-amber-700', icon: Clock },
      approved: { label: 'Đã duyệt', className: 'bg-green-100 text-green-700', icon: CheckCircle },
      rejected: { label: 'Đã từ chối', className: 'bg-red-100 text-red-700', icon: XCircle }
    };
    const c = config[status] || config.pending;
    const Icon = c.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${c.className}`}>
        <Icon className="h-3 w-3" />
        {c.label}
      </span>
    );
  };

  const isImageFile = (fileType) => {
    return fileType?.startsWith('image/');
  };

  const getFileIcon = (fileType) => {
    if (isImageFile(fileType)) return <Image className="h-5 w-5 text-blue-500" />;
    return <FileText className="h-5 w-5 text-orange-500" />;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const tabs = [
    { key: 'pending', label: 'Chờ duyệt', count: pendingCount },
    { key: 'approved', label: 'Đã duyệt' },
    { key: 'rejected', label: 'Đã từ chối' },
    { key: 'all', label: 'Tất cả' }
  ];

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
                <GraduationCap className="h-6 w-6 text-indigo-600" />
                Duyệt tài khoản giáo viên
              </h1>
              <p className="text-gray-500 text-sm">Quản lý và phê duyệt yêu cầu đăng ký giáo viên</p>
            </div>
          </div>
          {pendingCount > 0 && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <span className="text-amber-700 font-medium">{pendingCount} yêu cầu chờ duyệt</span>
            </div>
          )}
        </div>

        {/* Tabs & Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Tabs */}
            <div className="flex gap-2">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => { setActiveTab(tab.key); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    activeTab === tab.key
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      activeTab === tab.key
                        ? 'bg-white/20 text-white'
                        : 'bg-amber-500 text-white'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 min-w-[250px] max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm theo tên, email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Request Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-3 text-gray-500">Đang tải...</p>
            </div>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Không có yêu cầu nào</p>
            <p className="text-gray-400 text-sm mt-1">
              {activeTab === 'pending' ? 'Hiện chưa có yêu cầu giáo viên nào chờ duyệt' : 'Không tìm thấy yêu cầu phù hợp'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map(req => (
              <div key={req._id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  {/* Left - User Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      {req.avatar ? (
                        <img src={req.avatar} alt="" className="w-12 h-12 rounded-full" />
                      ) : (
                        <span className="text-indigo-600 font-bold text-lg">
                          {req.displayName?.[0] || req.username?.[0]}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {req.displayName || req.username}
                        </h3>
                        {getStatusBadge(req.teacherStatus)}
                      </div>
                      <p className="text-gray-500 text-sm mb-3">{req.email}</p>

                      {/* Teacher Details Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {req.teacherInfo?.school && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <School className="h-4 w-4 text-gray-400" />
                            <span className="truncate">{req.teacherInfo.school}</span>
                          </div>
                        )}
                        {req.teacherInfo?.subject && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <BookOpen className="h-4 w-4 text-gray-400" />
                            <span>{subjectLabels[req.teacherInfo.subject] || req.teacherInfo.subject}</span>
                          </div>
                        )}
                        {req.teacherInfo?.qualification && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Award className="h-4 w-4 text-gray-400" />
                            <span className="truncate">{req.teacherInfo.qualification}</span>
                          </div>
                        )}
                        {req.teacherInfo?.yearsOfExperience > 0 && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Briefcase className="h-4 w-4 text-gray-400" />
                            <span>{req.teacherInfo.yearsOfExperience} năm kinh nghiệm</span>
                          </div>
                        )}
                      </div>

                      {/* Documents count */}
                      {req.teacherInfo?.documents?.length > 0 && (
                        <div className="mt-2 flex items-center gap-1 text-sm text-blue-600">
                          <FileText className="h-4 w-4" />
                          <span>{req.teacherInfo.documents.length} chứng từ đính kèm</span>
                        </div>
                      )}

                      {/* Rejection reason */}
                      {req.teacherStatus === 'rejected' && req.teacherInfo?.rejectionReason && (
                        <div className="mt-2 bg-red-50 rounded-lg p-3 text-sm text-red-600">
                          <span className="font-medium">Lý do từ chối: </span>
                          {req.teacherInfo.rejectionReason}
                        </div>
                      )}

                      <p className="text-xs text-gray-400 mt-2">
                        Đăng ký: {new Date(req.teacherInfo?.requestedAt || req.createdAt).toLocaleString('vi-VN')}
                      </p>
                    </div>
                  </div>

                  {/* Right - Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => openDetail(req)}
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-indigo-600"
                      title="Xem chi tiết"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    {req.teacherStatus === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(req._id)}
                          disabled={actionLoading}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium disabled:opacity-50 flex items-center gap-1"
                        >
                          <Check className="h-4 w-4" />
                          Duyệt
                        </button>
                        <button
                          onClick={() => openRejectModal(req)}
                          disabled={actionLoading}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium disabled:opacity-50 flex items-center gap-1"
                        >
                          <Ban className="h-4 w-4" />
                          Từ chối
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="mt-6 bg-white rounded-xl shadow-sm px-6 py-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Trang {pagination.page} / {pagination.pages} ({pagination.total} yêu cầu)
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => fetchRequests(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => fetchRequests(pagination.page + 1)}
                disabled={pagination.page >= pagination.pages}
                className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedRequest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-2xl flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Chi tiết yêu cầu giáo viên</h3>
                <button onClick={() => { setShowDetailModal(false); setSelectedRequest(null); }} className="p-1 hover:bg-gray-100 rounded">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Profile Section */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                    {selectedRequest.avatar ? (
                      <img src={selectedRequest.avatar} alt="" className="w-16 h-16 rounded-full" />
                    ) : (
                      <span className="text-indigo-600 font-bold text-2xl">
                        {selectedRequest.displayName?.[0] || selectedRequest.username?.[0]}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {selectedRequest.displayName || selectedRequest.username}
                    </h4>
                    <p className="text-gray-500">{selectedRequest.email}</p>
                    <div className="mt-1">{getStatusBadge(selectedRequest.teacherStatus)}</div>
                  </div>
                </div>

                {/* Teacher Info */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h5 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-indigo-500" />
                    Thông tin giáo viên
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoRow icon={School} label="Trường" value={selectedRequest.teacherInfo?.school} />
                    <InfoRow icon={BookOpen} label="Môn giảng dạy" value={subjectLabels[selectedRequest.teacherInfo?.subject] || selectedRequest.teacherInfo?.subject} />
                    <InfoRow icon={Award} label="Bằng cấp / Chứng chỉ" value={selectedRequest.teacherInfo?.qualification} />
                    <InfoRow icon={Briefcase} label="Kinh nghiệm" value={selectedRequest.teacherInfo?.yearsOfExperience ? `${selectedRequest.teacherInfo.yearsOfExperience} năm` : null} />
                    {selectedRequest.teacherInfo?.department && (
                      <InfoRow icon={GraduationCap} label="Tổ bộ môn" value={selectedRequest.teacherInfo.department} />
                    )}
                    <InfoRow icon={Clock} label="Ngày đăng ký" value={new Date(selectedRequest.teacherInfo?.requestedAt || selectedRequest.createdAt).toLocaleString('vi-VN')} />
                  </div>
                  {selectedRequest.teacherInfo?.bio && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm font-medium text-gray-600 mb-1">Giới thiệu bản thân</p>
                      <p className="text-gray-800 text-sm leading-relaxed">{selectedRequest.teacherInfo.bio}</p>
                    </div>
                  )}
                </div>

                {/* Documents */}
                {selectedRequest.teacherInfo?.documents?.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h5 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-indigo-500" />
                      Chứng từ xác minh ({selectedRequest.teacherInfo.documents.length} tệp)
                    </h5>
                    <div className="space-y-3">
                      {selectedRequest.teacherInfo.documents.map((doc, idx) => (
                        <div key={idx} className="border rounded-lg overflow-hidden bg-white">
                          {/* Image preview */}
                          {isImageFile(doc.fileType) && (
                            <div className="p-2 bg-gray-100 flex justify-center">
                              <img
                                src={doc.filePath}
                                alt={doc.originalName}
                                className="max-h-64 rounded object-contain"
                              />
                            </div>
                          )}
                          {/* File info bar */}
                          <div className="flex items-center justify-between p-3">
                            <div className="flex items-center gap-3 min-w-0">
                              {getFileIcon(doc.fileType)}
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-700 truncate">{doc.originalName}</p>
                                <p className="text-xs text-gray-400">
                                  {formatFileSize(doc.fileSize)}
                                  {doc.uploadedAt && ` • ${new Date(doc.uploadedAt).toLocaleDateString('vi-VN')}`}
                                </p>
                              </div>
                            </div>
                            <a
                              href={doc.filePath}
                              target="_blank"
                              rel="noopener noreferrer"
                              download={doc.originalName}
                              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-indigo-600 flex-shrink-0"
                              title="Tải xuống"
                            >
                              <Download className="h-5 w-5" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rejection reason (if rejected) */}
                {selectedRequest.teacherStatus === 'rejected' && selectedRequest.teacherInfo?.rejectionReason && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                    <h5 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                      <XCircle className="h-5 w-5" />
                      Lý do từ chối
                    </h5>
                    <p className="text-red-600 text-sm">{selectedRequest.teacherInfo.rejectionReason}</p>
                  </div>
                )}

                {/* Action Buttons */}
                {selectedRequest.teacherStatus === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={() => handleApprove(selectedRequest._id)}
                      disabled={actionLoading}
                      className="flex-1 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="h-5 w-5" />
                      {actionLoading ? 'Đang xử lý...' : 'Phê duyệt giáo viên'}
                    </button>
                    <button
                      onClick={() => openRejectModal(selectedRequest)}
                      disabled={actionLoading}
                      className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <XCircle className="h-5 w-5" />
                      Từ chối
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reject Reason Modal */}
        {showRejectModal && selectedRequest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Từ chối yêu cầu giáo viên</h3>
                <button onClick={() => { setShowRejectModal(false); setRejectReason(''); }} className="p-1 hover:bg-gray-100 rounded">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-gray-600 text-sm mb-3">
                Bạn đang từ chối yêu cầu của <strong>{selectedRequest.displayName || selectedRequest.username}</strong>.
                Tài khoản sẽ bị khóa sau khi từ chối.
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lý do từ chối <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={4}
                  placeholder="Nhập lý do từ chối (bắt buộc)..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => { setShowRejectModal(false); setRejectReason(''); }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={handleReject}
                  disabled={!rejectReason.trim() || actionLoading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <Ban className="h-4 w-4" />
                  {actionLoading ? 'Đang xử lý...' : 'Xác nhận từ chối'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoRow = ({ icon: Icon, label, value }) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default TeacherApproval;
