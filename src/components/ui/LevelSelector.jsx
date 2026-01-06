import { useState } from 'react';
import { Star, Lock, Zap, Flame, Leaf, Info, ChevronRight } from 'lucide-react';
import Card from './Card';
import Button from './Button';

const LevelSelector = ({ onSelectLevel, progress }) => {
  const [selectedLevel, setSelectedLevel] = useState('basic');

  const levels = [
    {
      id: 'basic',
      name: 'Cơ bản',
      icon: Leaf,
      color: 'from-green-400 to-emerald-500',
      bgLight: 'bg-green-50',
      borderColor: 'border-green-500',
      description: 'Dành cho người mới bắt đầu',
      star: progress?.stars?.basic,
      score: progress?.levelScores?.basic || 0,
      unlocked: true
    },
    {
      id: 'intermediate',
      name: 'Trung bình',
      icon: Flame,
      color: 'from-orange-400 to-red-500',
      bgLight: 'bg-orange-50',
      borderColor: 'border-orange-500',
      description: 'Nâng cao độ khó, thử thách hơn',
      star: progress?.stars?.intermediate,
      score: progress?.levelScores?.intermediate || 0,
      unlocked: progress?.stars?.basic || false
    },
    {
      id: 'advanced',
      name: 'Nâng cao',
      icon: Zap,
      color: 'from-purple-400 to-pink-500',
      bgLight: 'bg-purple-50',
      borderColor: 'border-purple-500',
      description: 'Dành cho học sinh giỏi',
      star: progress?.stars?.advanced,
      score: progress?.levelScores?.advanced || 0,
      unlocked: progress?.stars?.intermediate || false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
          Chọn cấp độ
        </h2>
        <p className="text-gray-500">Chọn độ khó phù hợp với trình độ của bạn</p>
      </div>

      {/* Level Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {levels.map((level) => {
          const IconComponent = level.icon;
          const isSelected = selectedLevel === level.id;
          
          return (
            <div
              key={level.id}
              onClick={() => level.unlocked && setSelectedLevel(level.id)}
              className={`
                relative group cursor-pointer transition-all duration-300
                ${!level.unlocked ? 'opacity-60 cursor-not-allowed' : 'hover:-translate-y-1'}
              `}
            >
              <div className={`
                relative bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300
                ${isSelected ? `${level.borderColor} shadow-lg` : 'border-gray-100 hover:border-gray-200'}
              `}>
                {/* Header */}
                <div className={`bg-gradient-to-r ${level.color} p-4 text-white relative`}>
                  <div className="absolute inset-0 bg-black/5" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{level.name}</h3>
                        <p className="text-sm text-white/80">{level.description}</p>
                      </div>
                    </div>
                    {level.unlocked ? (
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center
                        ${level.star ? 'bg-yellow-400/30' : 'bg-white/10'}
                      `}>
                        <Star className={`w-5 h-5 ${level.star ? 'text-yellow-300 fill-yellow-300' : 'text-white/50'}`} />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <Lock className="w-5 h-5 text-white/70" />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Body */}
                <div className="p-4 space-y-3">
                  {level.unlocked ? (
                    <>
                      <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Điểm cao nhất</span>
                        <span className="font-bold text-gray-800">{level.score}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Trạng thái</span>
                        <span className={`
                          flex items-center gap-1 font-medium text-sm
                          ${level.star ? 'text-green-600' : 'text-gray-500'}
                        `}>
                          {level.star ? (
                            <>
                              <Star className="w-4 h-4 fill-green-500" />
                              Đạt sao
                            </>
                          ) : (
                            'Chưa đạt'
                          )}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className={`flex items-center gap-2 py-3 px-4 ${level.bgLight} rounded-lg`}>
                      <Lock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Hoàn thành cấp {level.id === 'intermediate' ? 'Cơ bản' : 'Trung bình'} để mở khóa
                      </span>
                    </div>
                  )}
                </div>

                {/* Selection indicator */}
                {isSelected && level.unlocked && (
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${level.color}`} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Start Button */}
      <div className="text-center pt-2">
        <Button
          onClick={() => {
            const level = levels.find(l => l.id === selectedLevel);
            if (level?.unlocked) {
              onSelectLevel(selectedLevel);
            }
          }}
          disabled={!levels.find(l => l.id === selectedLevel)?.unlocked}
          size="lg"
          icon={ChevronRight}
          iconPosition="right"
          className="px-10"
        >
          Bắt đầu chơi
        </Button>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Hướng dẫn</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Hoàn thành ≥80% số câu hỏi để đạt sao ⭐
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Mở khóa cấp độ cao hơn bằng cách đạt sao ở cấp trước
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Mỗi bài học có thể đạt tối đa 3 sao (1 sao/cấp độ)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSelector;
