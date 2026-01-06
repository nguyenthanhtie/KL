import { useNavigate } from 'react-router-dom';
import { ChevronRight, Sparkles, Trophy } from 'lucide-react';

const GradeSelector = () => {
  const navigate = useNavigate();

  const grades = [
    {
      id: 8,
      title: 'Lớp 8',
      description: 'Khởi đầu môn Hóa học',
      color: 'from-blue-400 to-blue-600',
      bgLight: 'from-blue-50 to-blue-100',
      icon: '🧪',
      topics: ['Chất', 'Nguyên tử', 'Phân tử', 'Phản ứng hóa học'],
      type: 'class'
    },
    {
      id: 9,
      title: 'Lớp 9',
      description: 'Hóa học vô cơ nâng cao',
      color: 'from-green-400 to-green-600',
      bgLight: 'from-green-50 to-green-100',
      icon: '⚗️',
      topics: ['Oxit', 'Axit - Bazơ', 'Muối', 'Kim loại'],
      type: 'class'
    },
    {
      id: 10,
      title: 'Lớp 10',
      description: 'Hóa học hữu cơ cơ bản',
      color: 'from-purple-400 to-purple-600',
      bgLight: 'from-purple-50 to-purple-100',
      icon: '🔬',
      topics: ['Ankan', 'Anken', 'Ankin', 'Benzen'],
      type: 'class'
    },
    {
      id: 11,
      title: 'Lớp 11',
      description: 'Hóa học nâng cao',
      color: 'from-orange-400 to-orange-600',
      bgLight: 'from-orange-50 to-orange-100',
      icon: '⚛️',
      topics: ['Điện li', 'Tốc độ phản ứng', 'Cân bằng hóa học', 'Liên kết hóa học'],
      type: 'class'
    },
    {
      id: 12,
      title: 'Lớp 12',
      description: 'Ôn thi THPT Quốc gia',
      color: 'from-pink-400 to-pink-600',
      bgLight: 'from-pink-50 to-pink-100',
      icon: '🎓',
      topics: ['Este', 'Lipit', 'Glucide', 'Protein'],
      type: 'class'
    },
    {
      id: 'challenge',
      title: 'Thử thách',
      description: 'Trò chơi Hóa học',
      color: 'from-amber-400 to-red-500',
      bgLight: 'from-amber-50 to-red-100',
      icon: '🏆',
      topics: ['Ghép nguyên tử', 'Cân bằng PT', 'Phòng thí nghiệm', 'Đuổi hình bắt chữ'],
      type: 'challenge'
    }
  ];

  const handleSelectGrade = (grade) => {
    if (grade.type === 'challenge') {
      navigate('/advanced-challenge');
    } else {
      navigate(`/class/${grade.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 md:py-12 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Chọn lớp phù hợp với bạn</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent mb-3">
            Hành trình học Hóa học
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Từ lớp 8 đến lớp 12, mỗi cấp độ là một bước tiến trên con đường chinh phục môn Hóa học
          </p>
        </div>

        {/* Grade Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-8">
          {grades.map((grade, index) => (
            <div
              key={grade.id}
              onClick={() => handleSelectGrade(grade)}
              className="group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
                {/* Gradient Header */}
                <div className={`bg-gradient-to-r ${grade.color} p-5 pb-8 relative`}>
                  {/* Background decorations */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8" />
                  
                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <span className="text-4xl filter drop-shadow-md">{grade.icon}</span>
                      <h3 className="text-xl font-bold text-white mt-2">{grade.title}</h3>
                      <p className="text-white/80 text-sm">{grade.description}</p>
                    </div>
                    {grade.type === 'challenge' && (
                      <Trophy className="w-6 h-6 text-yellow-300" />
                    )}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5 -mt-3 relative">
                  <div className={`bg-gradient-to-br ${grade.bgLight} rounded-xl p-4 mb-4`}>
                    <p className="text-xs font-medium text-gray-500 mb-2">Nội dung chính:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {grade.topics.map((topic, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r mr-2" 
                            style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
                          <span className="truncate">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Button */}
                  <button className={`
                    w-full flex items-center justify-center gap-2 
                    bg-gradient-to-r ${grade.color} text-white 
                    font-semibold py-3 px-5 rounded-xl 
                    hover:shadow-lg hover:shadow-${grade.color.split('-')[1]}-500/30
                    transition-all duration-300 group-hover:gap-3
                  `}>
                    <span>Bắt đầu học</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradeSelector;
