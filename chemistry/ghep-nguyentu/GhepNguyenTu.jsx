import React, { useState, useMemo, useEffect } from 'react';
import '../common-theme.css';
import './ghep-nguyentu.css';
import periodicData from '../periodic.json';

// Convert periodic data to elements array (first 36 elements for teaching)
const ELEMENTS = Object.values(periodicData).slice(0, 36);

// Real electron shell capacities: K(2), L(8), M(18), N(32), O(50), P(72)
const SHELL_CAPS = [2, 8, 18, 32, 50, 72];
const SHELL_NAMES = ['K', 'L', 'M', 'N', 'O', 'P'];

// Default layout constants (kept at module level for readability)
const DEFAULT_CONTAINER_SIZE = 480;
const DEFAULT_NUCLEUS_SIZE = 60;
const DEFAULT_ELECTRON_SIZE = 24;
const DEFAULT_BASE_RADIUS = 60;

function distributeElectrons(Z){
  const out = [];
  let remaining = Z;
  for(let cap of SHELL_CAPS){
    if(remaining <= 0) break;
    const take = Math.min(cap, remaining);
    out.push(take);
    remaining -= take;
  }
  return out; // array of electron counts per shell
}

function getRequiredShells(Z) {
  const distribution = distributeElectrons(Z);
  return distribution.length; // number of shells needed
}

export default function GhepNguyenTu(){
  // Game state
  const [completedCount, setCompletedCount] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const maxCompletions = 6;

  // Initialize with random element
  const getRandomElement = () => ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
  const [selected, setSelected] = useState(() => getRandomElement());
  
  const electrons = useMemo(()=>Array.from({length:selected.Z},(_,i)=>`e${i+1}`),[selected]);
  const expected = useMemo(()=>distributeElectrons(selected.Z),[selected]);

  // placement: map electronId -> shellIndex (0=K,1=L,2=M,...)
  const [placements, setPlacements] = useState({});
  const [status, setStatus] = useState('');
  // id of electron currently being dragged (null when none)
  const [dragging, setDragging] = useState(null);

  // Update status when selected element changes
  useEffect(() => {
    if (!gameCompleted) {
      setStatus(`Thử thách ${completedCount + 1}/${maxCompletions}: Kéo electron vào lớp đúng cho ${selected.name} (${selected.symbol}).`);
    }
  }, [selected, completedCount, gameCompleted, maxCompletions]);

  // layout constants (derived from defaults)
  const containerSize = DEFAULT_CONTAINER_SIZE;
  const center = containerSize / 2;
  const electronSize = DEFAULT_ELECTRON_SIZE;
  const numShells = getRequiredShells(selected.Z);
  const baseRadius = DEFAULT_BASE_RADIUS;
  const radiusStep = Math.min(60, (containerSize/2 - baseRadius - 40) / Math.max(1, numShells - 1));
  const radii = Array.from({length: numShells}, (_, i) => baseRadius + i * radiusStep);

  // unified drag start for bank or placed electrons
  const startDrag = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
    setDragging(id);
  };

  const onDrop = (e, shellIndex) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Remove drag-over visual feedback
    e.currentTarget.classList.remove('drag-over');
    
    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;

    // If shellIndex is provided (dropped directly on a shell), use it
    // Otherwise, calculate based on drop position
    let targetShell = shellIndex;
    
    if (typeof shellIndex === 'undefined') {
      // Calculate shell based on drop position (for atom-area drops)
      const atomAreaEl = e.currentTarget.closest('.atom-area') || e.currentTarget;
      const atomArea = atomAreaEl.getBoundingClientRect();
      const centerX = atomArea.left + atomArea.width / 2;
      const centerY = atomArea.top + atomArea.height / 2;
      const dropX = e.clientX;
      const dropY = e.clientY;
      const distanceFromCenter = Math.sqrt((dropX - centerX) ** 2 + (dropY - centerY) ** 2);

      // Build midpoint boundaries between shells for deterministic assignment
      if (radii && radii.length > 0) {
        const mids = [];
        for (let i = 0; i < radii.length - 1; i++) mids.push((radii[i] + radii[i + 1]) / 2);

        // decide shell by comparing to midpoints
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

    console.log('[GhepNguyenTu] drop:', { id, shellIndex, targetShell });
    setPlacements(prev => ({ ...prev, [id]: targetShell }));
  };

  const onDragOver = (e) => {
    e.preventDefault();
    // Add visual feedback for drag over
    if (e.currentTarget.classList.contains('shell')) {
      e.currentTarget.classList.add('drag-over');
    }
  };

  const onDragLeave = (e) => {
    // Remove visual feedback when drag leaves
    if (e.currentTarget.classList.contains('shell')) {
      e.currentTarget.classList.remove('drag-over');
    }
  };

  const onDragEnd = (e) => {
    // clear dragging state when drag ends (drop or cancelled)
    setDragging(null);
    // Remove all drag-over classes
    document.querySelectorAll('.shell.drag-over').forEach(el => {
      el.classList.remove('drag-over');
    });
  };

  // allow dropping onto the bank to return electrons
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
    
    // count electrons per shell
    const counts = [];
    for(const id of electrons){ const idx = placements[id]; if(typeof idx === 'number') counts[idx] = (counts[idx]||0)+1; }
    // normalize to match expected shells
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

  // helpers to render
  const inShell = (shellIndex) => electrons.filter(id => placements[id]===shellIndex);
  const inBank = () => electrons.filter(id => !(id in placements));

  // combine with startDrag
  const handleElectronDragStart = startDrag;

  const handleElectronClick = (id) => {
    // put back to bank
    setPlacements(prev=>{ const n = {...prev}; delete n[id]; return n; });
  };

  // compute protons/neutrons for display (approx neutrons = round(mass) - Z)
  const approxMass = selected.mass || Math.round(selected.Z * 1.2);
  const protons = selected.Z;
  const neutrons = Math.max(0, Math.round(approxMass) - selected.Z);
  const protonDots = Math.min(protons, 8);
  const neutronDots = Math.min(neutrons, 8);

  return (
    <div className="game-container">
      <header className="game-header">
        <h1>🔬 Ghép Nguyên Tử — Atom Builder</h1>
        <p className="subtitle">Học cấu tạo nguyên tử: kéo electron vào lớp đúng.</p>
      </header>

      <main className="game-main">
        <div className="game-board">
          <section className="controls">
            <div className="game-progress">
              <div className="progress-info">
                <span className="challenge-counter">Thử thách: {completedCount + 1}/{maxCompletions}</span>
                <div className="element-info">
                  <span className="element-main">Z = {selected.Z} • {selected.symbol} • {selected.name}</span>
                  <span className="element-detail">Khối lượng: {selected.mass?.toFixed(1) || 'N/A'}</span>
                </div>
              </div>
              {gameCompleted && (
                <div className="game-completed">
                  <h3>🏆 Game Hoàn Thành!</h3>
                  <p>Bạn đã thành thạo cấu tạo nguyên tử!</p>
                </div>
              )}
            </div>
          </section>

          <div className="game-middle">
            <section className="atom-area" onDragOver={onDragOver} onDrop={(e)=>onDrop(e)} style={{width:containerSize,height:containerSize,position:'relative'}}>
              {(() => {
                const nucleusSize = 60;
                const nucLeft = center - nucleusSize/2;
                const nucTop = center - nucleusSize/2;
                return (
                  <div className="nucleus" style={{position:'absolute', left: nucLeft, top: nucTop, width: nucleusSize, height: nucleusSize}}>
                    <div className="nucleus-label">Nucleus</div>
                  </div>
                );
              })()}

              {radii.map((r, si)=>{
                const items = inShell(si);
                const shellName = SHELL_NAMES[si] || `Shell-${si+1}`;
                return (
                  <div key={si}
                    className="shell"
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={(e)=>onDrop(e,si)}
                    data-shell-index={si}
                    style={{ width: r*2, height: r*2, left: center - r, top: center - r, zIndex: 100 - si }}>
                    <div className="shell-label">{shellName}</div>

                    {items.length > 0 && (
                      <>
                        <div className="orbital-arrow orbital-arrow-1" style={{ left: r - 10, top: 10 }}>→</div>
                        <div className="orbital-arrow orbital-arrow-2" style={{ left: r * 2 - 20, top: r + 10 }}>↓</div>
                      </>
                    )}

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
                          onClick={()=>handleElectronClick(id)}
                          className="electron"
                          style={{ left: localX, top: localY, width: electronSize, height: electronSize }}>
                          <div className="electron-label">Electron</div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </section>

            <section className="bank" onDragOver={onDragOver} onDrop={onBankDrop}>
              <h3>Electron (kéo vào lớp)</h3>
              <div className="tiles">
                {inBank().map((id, idx)=>(
                  <button key={id} draggable className="tile electron-tile" onDragStart={(e)=>startDrag(e,id)} onDragEnd={onDragEnd}>{'e'}</button>
                ))}
              </div>

              <div style={{marginTop:12,display:'flex',gap:8}}>
                <button 
                  className="btn" 
                  onClick={validate}
                  disabled={gameCompleted}
                  style={{
                    background: gameCompleted ? '#666' : '#007bff',
                    cursor: gameCompleted ? 'not-allowed' : 'pointer'
                  }}
                >
                  {gameCompleted ? 'Hoàn thành' : 'Kiểm tra'}
                </button>
              </div>
              <div style={{marginTop:10}} className="status">{status}</div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
