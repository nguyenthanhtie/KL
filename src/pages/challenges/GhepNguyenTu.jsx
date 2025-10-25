import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Target } from 'lucide-react';
import periodicData from '../../data/periodic.json';
import './GhepNguyenTu.css';

// Convert periodic data to elements array (first 36 elements for teaching)
const ELEMENTS = Object.values(periodicData).slice(0, 36);

// Real electron shell capacities: K(2), L(8), M(18), N(32), O(50), P(72)
const SHELL_CAPS = [2, 8, 18, 32, 50, 72];
const SHELL_NAMES = ['K', 'L', 'M', 'N', 'O', 'P'];

// Default layout constants
const DEFAULT_CONTAINER_SIZE = 384; // Giảm 20% từ 480
const DEFAULT_ELECTRON_SIZE = 19; // Giảm 20% từ 24
const DEFAULT_BASE_RADIUS = 48; // Giảm 20% từ 60

function distributeElectrons(Z){
  const out = [];
  let remaining = Z;
  for(let cap of SHELL_CAPS){
    if(remaining <= 0) break;
    const take = Math.min(cap, remaining);
    out.push(take);
    remaining -= take;
  }
  return out;
}

function getRequiredShells(Z) {
  const distribution = distributeElectrons(Z);
  return distribution.length;
}

export default function GhepNguyenTu(){
  const [completedCount, setCompletedCount] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const maxCompletions = 6;

  const getRandomElement = () => ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
  const [selected, setSelected] = useState(() => getRandomElement());
  
  const electrons = useMemo(()=>Array.from({length:selected.Z},(_,i)=>`e${i+1}`),[selected]);
  const expected = useMemo(()=>distributeElectrons(selected.Z),[selected]);

  const [placements, setPlacements] = useState({});
  const [status, setStatus] = useState('');
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    if (!gameCompleted) {
      setStatus(`Thử thách ${completedCount + 1}/${maxCompletions}: Kéo electron vào lớp đúng cho ${selected.name} (${selected.symbol}).`);
    }
  }, [selected, completedCount, gameCompleted, maxCompletions]);

  const containerSize = DEFAULT_CONTAINER_SIZE;
  const center = containerSize / 2;
  const electronSize = DEFAULT_ELECTRON_SIZE;
  const numShells = getRequiredShells(selected.Z);
  const baseRadius = DEFAULT_BASE_RADIUS;
  const radiusStep = Math.min(48, (containerSize/2 - baseRadius - 32) / Math.max(1, numShells - 1)); // Giảm 20%
  const radii = Array.from({length: numShells}, (_, i) => baseRadius + i * radiusStep);

  const startDrag = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
    setDragging(id);
  };

  const onDrop = (e, shellIndex) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
    
    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;

    let targetShell = shellIndex;
    
    if (typeof shellIndex === 'undefined') {
      const atomAreaEl = e.currentTarget.closest('.atom-area') || e.currentTarget;
      const atomArea = atomAreaEl.getBoundingClientRect();
      const centerX = atomArea.left + atomArea.width / 2;
      const centerY = atomArea.top + atomArea.height / 2;
      const dropX = e.clientX;
      const dropY = e.clientY;
      const distanceFromCenter = Math.sqrt((dropX - centerX) ** 2 + (dropY - centerY) ** 2);

      if (radii && radii.length > 0) {
        const mids = [];
        for (let i = 0; i < radii.length - 1; i++) mids.push((radii[i] + radii[i + 1]) / 2);

        if (distanceFromCenter <= (mids[0] ?? radii[0])) {
          targetShell = 0;
        } else {
          let assigned = false;
          for (let i = 0; i < mids.length - 1; i++) {
            if (distanceFromCenter > mids[i] && distanceFromCenter <= mids[i + 1]) {
              targetShell = i + 1;
              assigned = true;
              break;
            }
          }
          if (!assigned) {
            targetShell = radii.length - 1;
          }
        }
      } else {
        targetShell = 0;
      }
    }

    setPlacements(prev => ({ ...prev, [id]: targetShell }));
  };

  const onDragOver = (e) => {
    e.preventDefault();
    if (e.currentTarget.classList.contains('shell')) {
      e.currentTarget.classList.add('drag-over');
    }
  };

  const onDragLeave = (e) => {
    if (e.currentTarget.classList.contains('shell')) {
      e.currentTarget.classList.remove('drag-over');
    }
  };

  const onDragEnd = () => {
    setDragging(null);
    document.querySelectorAll('.shell.drag-over').forEach(el => {
      el.classList.remove('drag-over');
    });
  };

  const onBankDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;
    setPlacements(prev => { const n = {...prev}; delete n[id]; return n; });
    setDragging(null);
  };

  const nextElement = () => {
    if (completedCount >= maxCompletions) {
      setGameCompleted(true);
      setStatus('🎉 Chúc mừng! Bạn đã hoàn thành tất cả 6 thử thách!');
      return;
    }

    const newElement = getRandomElement();
    setSelected(newElement);
    setPlacements({});
    setCompletedCount(prev => prev + 1);
    setStatus(`Thử thách ${completedCount + 1}/${maxCompletions}: Kéo electron vào lớp đúng cho ${newElement.name} (${newElement.symbol}).`);
  };

  const validate = ()=>{
    if (gameCompleted) return;
    
    const counts = [];
    for(const id of electrons){ const idx = placements[id]; if(typeof idx === 'number') counts[idx] = (counts[idx]||0)+1; }
    while(counts.length < expected.length) counts.push(0);
    const ok = counts.slice(0, expected.length).every((c,i)=> (c||0) === expected[i]);
    
    if(ok){ 
      if (completedCount + 1 >= maxCompletions) {
        setGameCompleted(true);
        setStatus('🎉 Chúc mừng! Bạn đã hoàn thành tất cả 6 thử thách!');
      } else {
        setStatus(`✅ Chính xác! Cấu tạo nguyên tử ${selected.name} đúng. Chuyển sang chất tiếp theo...`);
        setTimeout(() => {
          nextElement();
        }, 2000);
      }
    } else { 
      const expectedStr = expected.map((count, i) => `${SHELL_NAMES[i] || `S${i+1}`}=${count}`).join(' ');
      setStatus(`❌ Sai. Kỳ vọng: ${expectedStr}`); 
    }
  };

  const inShell = (shellIndex) => electrons.filter(id => placements[id]===shellIndex);
  const inBank = () => electrons.filter(id => !(id in placements));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/advanced-challenge" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Quay lại
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="mr-2">⚛️</span>
              Ghép Nguyên Tử
            </h1>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-lg">Thử thách: {completedCount + 1}/{maxCompletions}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-xl">{selected.symbol}</span> • {selected.name} • Z = {selected.Z} • Khối lượng: {selected.mass?.toFixed(1) || 'N/A'}
              </div>
            </div>
            {gameCompleted && (
              <div className="flex items-center gap-2 text-yellow-600">
                <Trophy className="w-8 h-8" />
                <span className="font-bold">Hoàn thành!</span>
              </div>
            )}
          </div>

          {/* Game Area */}
          <div className="flex gap-6 flex-wrap lg:flex-nowrap">
            {/* Atom Visualization */}
            <div className="flex-1 flex justify-center items-center min-h-[400px]">
              <div 
                className="atom-area relative"
                onDragOver={onDragOver} 
                onDrop={(e)=>onDrop(e)} 
                style={{width:containerSize, height:containerSize}}
              >
                {/* Nucleus */}
                <div 
                  className="nucleus absolute flex items-center justify-center"
                  style={{
                    left: center - 24,
                    top: center - 24,
                    width: 48,
                    height: 48
                  }}
                >
                  <span className="text-white font-bold text-xs">Hạt nhân</span>
                </div>

                {/* Shells */}
                {radii.map((r, si)=>{
                  const items = inShell(si);
                  const shellName = SHELL_NAMES[si] || `Shell-${si+1}`;
                  return (
                    <div key={si}
                      className="shell absolute rounded-full border-2 border-blue-400 border-dashed"
                      onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      onDrop={(e)=>onDrop(e,si)}
                      style={{ 
                        width: r*2, 
                        height: r*2, 
                        left: center - r, 
                        top: center - r,
                        zIndex: 100 - si 
                      }}
                    >
                      <div className="shell-label absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-bold">
                        {shellName}
                      </div>

                      {items.map((id, idx)=>{
                        const n = items.length;
                        if(n === 0) return null;
                        const angle = (idx / n) * Math.PI * 2 - Math.PI/2;
                        const localX = r + r * Math.cos(angle) - electronSize/2;
                        const localY = r + r * Math.sin(angle) - electronSize/2;
                        return (
                          <div key={id}
                            draggable
                            onDragStart={(e)=>startDrag(e,id)}
                            onDragEnd={onDragEnd}
                            onClick={()=>setPlacements(prev=>{ const n = {...prev}; delete n[id]; return n; })}
                            className="electron absolute rounded-full bg-blue-500 hover:bg-blue-600 cursor-grab active:cursor-grabbing flex items-center justify-center text-white text-xs font-bold"
                            style={{ 
                              left: localX, 
                              top: localY, 
                              width: electronSize, 
                              height: electronSize 
                            }}
                          >
                            e⁻
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Control Panel */}
            <div className="w-full lg:w-64 bg-gray-50 rounded-xl p-5">
              <h3 className="font-bold text-base mb-3">Kho electron (kéo vào lớp)</h3>
              
              {/* Electron Bank */}
              <div className="flex flex-wrap gap-2 mb-5 min-h-[80px] p-3 bg-white rounded-lg border-2 border-dashed border-gray-300"
                onDragOver={onDragOver} 
                onDrop={onBankDrop}
              >
                {inBank().map((id)=>(
                  <button 
                    key={id} 
                    draggable 
                    className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold cursor-grab active:cursor-grabbing flex items-center justify-center text-xs"
                    onDragStart={(e)=>startDrag(e,id)} 
                    onDragEnd={onDragEnd}
                  >
                    e⁻
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="space-y-3">
                <button 
                  onClick={validate}
                  disabled={gameCompleted}
                  className={`w-full py-2.5 rounded-lg font-semibold transition-colors ${
                    gameCompleted 
                      ? 'bg-gray-400 cursor-not-allowed text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {gameCompleted ? 'Hoàn thành' : 'Kiểm tra'}
                </button>
              </div>

              {/* Status */}
              <div className={`mt-4 p-3 rounded-lg text-sm ${
                status.includes('✅') ? 'bg-green-100 text-green-800' :
                status.includes('❌') ? 'bg-red-100 text-red-800' :
                status.includes('🎉') ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {status}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
