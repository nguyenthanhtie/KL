import React, { useState, useEffect } from 'react';
import { ArrowLeft, BarChart3, TrendingUp, Users, Clock, Award, BookOpen, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';

const AdminReports = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('learning'); // 'learning' | 'activity'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const fetchData = async (tab) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/admin/reports/${tab}`);
      setData(res.data.data);
    } catch (err) {
      console.error(`Error fetching ${tab} report:`, err);
      setError('Không thể tải dữ liệu báo cáo');
    } finally {
      setLoading(false);
    }
  };

  const renderLearningReport = () => {
    if (!data) return null;
    const { lessonStats, xpDistribution, levelDistribution } = data;

    return (
      <div className="space-y-6">
        {/* Lesson Stats Table */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            Thống kê học tập theo khối
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-3 font-semibold text-gray-600">Khối lớp</th>
                  <th className="p-3 font-semibold text-gray-600">Số lượng HS</th>
                  <th className="p-3 font-semibold text-gray-600">Bài học HT (TB)</th>
                  <th className="p-3 font-semibold text-gray-600">Thời gian học (TB)</th>
                  <th className="p-3 font-semibold text-gray-600">Chuỗi ngày (TB)</th>
                </tr>
              </thead>
              <tbody>
                {lessonStats?.map(stat => (
                  <tr key={stat._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-800">Lớp {stat._id}</td>
                    <td className="p-3 text-gray-600">{stat.totalStudents}</td>
                    <td className="p-3 text-gray-600">{Math.round((stat.avgCompletedLessons || 0) * 10) / 10}</td>
                    <td className="p-3 text-gray-600">{Math.round((stat.avgStudyTime || 0) / 60)} phút</td>
                    <td className="p-3 text-gray-600">{Math.round((stat.avgStreak || 0) * 10) / 10} ngày</td>
                  </tr>
                ))}
                {(!lessonStats || lessonStats.length === 0) && (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">Chưa có dữ liệu</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Level Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Phân bố Cấp độ (Level)
            </h3>
            <div className="flex items-end gap-2 h-48 mt-4">
              {levelDistribution?.length > 0 ? levelDistribution.map(item => {
                const maxCount = Math.max(...levelDistribution.map(i => i.count));
                const height = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                return (
                  <div key={item._id} className="flex-1 flex flex-col items-center group relative">
                    <div className="absolute -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {item.count} HS
                    </div>
                    <div 
                      className="w-full bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t-md transition-all duration-500 min-h-[4px]"
                      style={{ height: `${Math.max(height, 2)}%` }}
                    ></div>
                    <span className="text-xs font-medium text-gray-600 mt-2 truncate max-w-full">
                      Lv.{item._id}
                    </span>
                  </div>
                );
              }) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">Không có dữ liệu</div>
              )}
            </div>
          </div>

          {/* XP Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Phân bố Điểm kinh nghiệm (XP)
            </h3>
            <div className="flex items-end gap-2 h-48 mt-4">
              {xpDistribution?.length > 0 ? xpDistribution.map((item, idx) => {
                const maxCount = Math.max(...xpDistribution.map(i => i.count));
                const height = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                const label = item._id === 'Other' ? 'Khác' : `>= ${item._id}`;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center group relative">
                    <div className="absolute -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {item.count} HS
                    </div>
                    <div 
                      className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t-md transition-all duration-500 min-h-[4px]"
                      style={{ height: `${Math.max(height, 2)}%` }}
                    ></div>
                    <span className="text-xs font-medium text-gray-600 mt-2 truncate w-full text-center" title={label}>
                      {label}
                    </span>
                  </div>
                );
              }) : (
                 <div className="w-full h-full flex items-center justify-center text-gray-400">Không có dữ liệu</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderActivityReport = () => {
    if (!data) return null;
    const { dailyActivity } = data;

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Hoạt động 30 ngày gần đây
          </h3>
          
          <div className="mb-6 flex gap-4 md:gap-8 flex-col md:flex-row">
            <div className="bg-blue-50 p-4 rounded-xl flex-1 border border-blue-100">
              <div className="text-sm text-blue-600 font-medium mb-1">Người dùng tích cực trung bình/ngày</div>
              <div className="text-3xl font-bold text-blue-700">
                {dailyActivity?.length > 0 
                  ? Math.round(dailyActivity.reduce((acc, curr) => acc + curr.activeUsers, 0) / dailyActivity.length) 
                  : 0}
              </div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl flex-1 border border-emerald-100">
              <div className="text-sm text-emerald-600 font-medium mb-1">Giờ học trung bình/ngày</div>
              <div className="text-3xl font-bold text-emerald-700">
                {dailyActivity?.length > 0 
                  ? Math.round(dailyActivity.reduce((acc, curr) => acc + curr.totalMinutes, 0) / 60 / dailyActivity.length * 10) / 10
                  : 0} <span className="text-lg font-medium">giờ</span>
              </div>
            </div>
          </div>

          <div className="h-64 mt-8 flex items-end gap-1 px-2">
            {dailyActivity?.length > 0 ? dailyActivity.map((item, idx) => {
              const maxActive = Math.max(...dailyActivity.map(i => i.activeUsers));
              const height = maxActive > 0 ? (item.activeUsers / maxActive) * 100 : 0;
              const dateObj = new Date(item.date);
              const label = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`;
              
              return (
                <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                  <div className="absolute -top-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap text-center">
                    {item.date}<br/>{item.activeUsers} users<br/>{Math.round(item.totalMinutes/60)}h
                  </div>
                  <div 
                    className="w-full bg-blue-500 rounded-t-sm transition-all duration-500 min-h-[4px]"
                    style={{ height: `${height}%` }}
                  ></div>
                  {idx % Math.ceil(dailyActivity.length / 10) === 0 && (
                    <span className="text-[10px] text-gray-400 mt-2 truncate w-full text-center hidden md:block">
                      {label}
                    </span>
                  )}
                </div>
              );
            }) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 border-t border-dashed border-gray-200">Không có dữ liệu hoạt động trong 30 ngày qua</div>
            )}
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">Biểu đồ thể hiện số lượng người dùng hoạt động mỗi ngày</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/admin')}
            className="p-2 bg-white rounded-lg shadow-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-gray-200 self-start"
            title="Quay lại Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-7 h-7 text-indigo-600" />
              Báo cáo Hệ thống
            </h1>
            <p className="text-gray-500 text-sm mt-1">Xem thống kê tình hình học tập và hoạt động của người dùng</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-xl border-b border-gray-200 px-6 pt-4 flex gap-6 overflow-x-auto">
          <button
            className={`pb-4 px-2 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'learning' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('learning')}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Thống kê Học tập
            </div>
          </button>
          <button
            className={`pb-4 px-2 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'activity' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('activity')}
          >
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Hoạt động Người dùng
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="mt-6">
          {loading ? (
             <div className="flex justify-center items-center py-20 bg-white rounded-xl shadow-sm">
               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
             </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 flex items-center justify-center">
              {error}
            </div>
          ) : (
             activeTab === 'learning' ? renderLearningReport() : renderActivityReport()
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminReports;
