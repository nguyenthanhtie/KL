import React from 'react';

const ChemistryLabIntro = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white rounded-t-2xl">
          <h2 className="text-3xl font-bold mb-2">🧪 Chào mừng đến Phòng Thí Nghiệm Hóa Học!</h2>
          <p className="text-indigo-100">Khám phá hóa học qua trải nghiệm tương tác và gamification</p>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Feature 1 */}
            <div className="feature-card p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
              <div className="text-4xl mb-3">🎮</div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">Phòng thí nghiệm Game</h3>
              <p className="text-gray-700 text-sm mb-3">
                Thu thập hóa chất, thực hiện phản ứng, nâng cấp và mở khóa nội dung mới!
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Hệ thống Level & EXP</li>
                <li>✓ Kho nguyên liệu</li>
                <li>✓ Bảng chế tạo</li>
                <li>✓ Phần thưởng hấp dẫn</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="feature-card p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
              <div className="text-4xl mb-3">🔬</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Bảng Tuần Hoàn</h3>
              <p className="text-gray-700 text-sm mb-3">
                Khám phá 118 nguyên tố với thông tin chi tiết và thú vị
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Cấu hình electron</li>
                <li>✓ Tính chất hóa học</li>
                <li>✓ Ứng dụng thực tế</li>
                <li>✓ Video & hình ảnh</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="feature-card p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
              <div className="text-4xl mb-3">⚗️</div>
              <h3 className="text-xl font-bold text-green-900 mb-2">Mô Phỏng Phản Ứng</h3>
              <p className="text-gray-700 text-sm mb-3">
                Thực hiện phản ứng hóa học với animation sinh động
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Phản ứng có sẵn</li>
                <li>✓ Tự cân bằng phương trình</li>
                <li>✓ Animation đặc biệt</li>
                <li>✓ Thông tin năng lượng</li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="feature-card p-5 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
              <div className="text-4xl mb-3">🔮</div>
              <h3 className="text-xl font-bold text-orange-900 mb-2">Mô Hình 3D</h3>
              <p className="text-gray-700 text-sm mb-3">
                Xem và tương tác với cấu trúc phân tử 3D
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ 4 chế độ hiển thị</li>
                <li>✓ Xoay & zoom tự do</li>
                <li>✓ Màu sắc chuẩn CPK</li>
                <li>✓ Hiểu rõ liên kết</li>
              </ul>
            </div>
          </div>

          {/* Quick Guide */}
          <div className="quick-guide p-5 bg-yellow-50 border-2 border-yellow-300 rounded-xl mb-6">
            <h3 className="text-lg font-bold text-yellow-900 mb-3 flex items-center gap-2">
              💡 Bắt đầu nhanh
            </h3>
            <ol className="text-sm text-gray-700 space-y-2">
              <li className="flex gap-2">
                <span className="font-bold text-yellow-700">1.</span>
                <span>Bắt đầu với tab "Phòng thí nghiệm" để làm quen với hệ thống game</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-yellow-700">2.</span>
                <span>Thực hiện các phản ứng đầu tiên để thu thập EXP và hóa chất mới</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-yellow-700">3.</span>
                <span>Khám phá Bảng tuần hoàn để tìm hiểu về các nguyên tố</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-yellow-700">4.</span>
                <span>Thử nghiệm với Mô phỏng phản ứng và Mô hình 3D</span>
              </li>
            </ol>
          </div>

          {/* Tips */}
          <div className="tips p-5 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl">
            <h3 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2">
              ✨ Mẹo học tập
            </h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
              <div>
                <strong className="text-indigo-700">• Học qua làm:</strong> Thực hành nhiều phản ứng để ghi nhớ tốt hơn
              </div>
              <div>
                <strong className="text-indigo-700">• Khám phá:</strong> Click vào mọi thứ để học thêm
              </div>
              <div>
                <strong className="text-indigo-700">• Kiên trì:</strong> Nâng level để mở khóa nội dung mới
              </div>
              <div>
                <strong className="text-indigo-700">• Quan sát:</strong> Chú ý animation và màu sắc phản ứng
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-semibold text-lg"
          >
            🚀 Bắt đầu khám phá!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChemistryLabIntro;
