import { useState, useEffect } from 'react';
import PeriodicTable from '../components/PeriodicTable';
import ChemicalReactionSimulator from '../components/ChemicalReactionSimulator';
import MolecularViewer from '../components/MolecularViewer';
import ChemistryLabGame from '../components/ChemistryLabGame';
import ChemistryLabIntro from '../components/ChemistryLabIntro';

const ChemistryLab = () => {
  const [activeTab, setActiveTab] = useState('lab');
  const [showIntro, setShowIntro] = useState(false);

  // Kiểm tra xem người dùng đã xem intro chưa
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('chemistryLabIntroSeen');
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  const handleCloseIntro = () => {
    localStorage.setItem('chemistryLabIntroSeen', 'true');
    setShowIntro(false);
  };

  const tabs = [
    { id: 'lab', name: 'Phòng thí nghiệm', icon: '🧪' },
    { id: 'periodic', name: 'Bảng tuần hoàn', icon: '🔬' },
    { id: 'reaction', name: 'Mô phỏng phản ứng', icon: '⚗️' },
    { id: 'molecule', name: 'Mô hình phân tử 3D', icon: '🔮' }
  ];

  return (
    <div className="chemistry-lab-page min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Intro Modal */}
      {showIntro && <ChemistryLabIntro onClose={handleCloseIntro} />}

      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            🧬 Phòng Thí Nghiệm Hóa Học Tương Tác
          </h1>
          <p className="text-white/80">
            Khám phá, thực hành và học hỏi hóa học qua trải nghiệm tương tác
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="container mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 md:px-6 py-6">
        {activeTab === 'lab' && (
          <div className="animate-fadeIn">
            <ChemistryLabGame />
          </div>
        )}

        {activeTab === 'periodic' && (
          <div className="animate-fadeIn">
            <PeriodicTable />
          </div>
        )}

        {activeTab === 'reaction' && (
          <div className="animate-fadeIn">
            <ChemicalReactionSimulator />
          </div>
        )}

        {activeTab === 'molecule' && (
          <div className="animate-fadeIn">
            <MolecularViewer />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 mt-8">
        <div className="container mx-auto px-6 py-6 text-center text-white">
          <p className="mb-1">🧪 Phòng Thí Nghiệm Hóa Học Tương Tác</p>
          <p className="text-sm text-white/60">
            Học hóa học qua trải nghiệm - Khám phá • Thực hành • Chinh phục
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ChemistryLab;
