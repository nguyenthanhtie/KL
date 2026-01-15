import React from 'react';
import { Link } from 'react-router-dom';

const LabAdventureIntro = () => {
  return (
    <div className="lab-adventure-intro bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 shadow-2xl overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      {/* Floating icons */}
      <div className="absolute top-4 right-4 text-4xl animate-bounce">🧪</div>
      <div className="absolute top-1/2 right-8 text-3xl animate-pulse">⚗️</div>
      <div className="absolute bottom-4 right-12 text-2xl animate-bounce delay-300">📚</div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <span className="text-4xl">🎮</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              Phòng Thí Nghiệm Phiêu Lưu
            </h3>
            <p className="text-purple-200">
              Học hóa học như chơi game!
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <div className="text-3xl mb-2">📜</div>
            <h4 className="font-bold text-white mb-1">Thu thập Kiến thức</h4>
            <p className="text-sm text-purple-200">
              Hoàn thành nhiệm vụ học tập để thu thập nguyên liệu kiến thức
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <div className="text-3xl mb-2">⚗️</div>
            <h4 className="font-bold text-white mb-1">Chế tạo Hóa chất</h4>
            <p className="text-sm text-purple-200">
              Sử dụng kiến thức để chế tạo các hóa chất mới
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <div className="text-3xl mb-2">🧪</div>
            <h4 className="font-bold text-white mb-1">Thực hiện Phản ứng</h4>
            <p className="text-sm text-purple-200">
              Kết hợp hóa chất để tạo ra phản ứng và nhận phần thưởng
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Link 
            to="/lab-adventure"
            className="px-8 py-3 bg-white text-purple-700 font-bold rounded-xl hover:bg-purple-100 transition-all hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <span>🚀</span>
            Bắt đầu phiêu lưu
          </Link>
          
          <div className="flex items-center gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1">
              <span>⭐</span> Level up
            </span>
            <span className="flex items-center gap-1">
              <span>🏆</span> Thành tựu
            </span>
            <span className="flex items-center gap-1">
              <span>📊</span> Theo dõi tiến trình
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabAdventureIntro;
