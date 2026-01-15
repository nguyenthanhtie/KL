import { useState, useMemo, useCallback } from 'react';
import periodicData from '../data/periodic.json';
import { elementExtendedData, categoryColors, categoryNames, elementCategories } from '../data/elementExtendedData';

// Bảng tuần hoàn layout - 18 cột x 7 hàng (không bao gồm Lanthanides/Actinides)
const PERIODIC_TABLE_LAYOUT = [
  ['H', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'He'],
  ['Li', 'Be', '', '', '', '', '', '', '', '', '', '', 'B', 'C', 'N', 'O', 'F', 'Ne'],
  ['Na', 'Mg', '', '', '', '', '', '', '', '', '', '', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'],
  ['K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'],
  ['Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe'],
  ['Cs', 'Ba', 'La*', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn'],
  ['Fr', 'Ra', 'Ac**', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'],
];

// Lanthanides (Hàng La series)
const LANTHANIDES = ['La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu'];

// Actinides (Hàng Ac series)
const ACTINIDES = ['Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr'];

const PeriodicTable = ({ onElementSelect }) => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showElectronShells, setShowElectronShells] = useState(false);

  const elements = useMemo(() => periodicData, []);

  const filteredElements = useMemo(() => {
    return Object.keys(elements).filter(symbol => {
      const element = elements[symbol];
      const matchesCategory = filterCategory === 'all' || elementCategories[symbol] === filterCategory;
      const matchesSearch = searchTerm === '' || 
        element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.atomicNumber.toString().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });
  }, [elements, filterCategory, searchTerm]);

  const handleElementClick = useCallback((symbol) => {
    const element = elements[symbol];
    if (element) {
      setSelectedElement(symbol);
      if (onElementSelect) {
        onElementSelect({ ...element, ...elementExtendedData[symbol] });
      }
    }
  }, [elements, onElementSelect]);

  const getElementStyle = useCallback((symbol) => {
    if (!symbol || symbol === '') return null;
    const category = elementCategories[symbol] || 'unknown';
    const color = categoryColors[category] || categoryColors.unknown;
    const isFiltered = filteredElements.includes(symbol);
    const isHovered = hoveredElement === symbol;
    const isSelected = selectedElement === symbol;

    return {
      backgroundColor: isFiltered ? color : '#2d2d2d',
      opacity: isFiltered ? 1 : 0.3,
      transform: isHovered ? 'scale(1.15)' : isSelected ? 'scale(1.1)' : 'scale(1)',
      boxShadow: isSelected ? `0 0 20px ${color}` : isHovered ? `0 0 15px ${color}50` : 'none',
      border: isSelected ? `3px solid ${color}` : '1px solid rgba(255,255,255,0.2)',
      zIndex: isHovered || isSelected ? 10 : 1,
    };
  }, [filteredElements, hoveredElement, selectedElement]);

  const renderElement = useCallback((symbol, rowIndex, colIndex) => {
    if (symbol === '') {
      return <div key={`empty-${rowIndex}-${colIndex}`} className="w-12 h-14 md:w-14 md:h-16" />;
    }

    // Xử lý các kí tự đặc biệt (La*, Ac**)
    const cleanSymbol = symbol.replace(/[\*]+/g, '');
    const element = elements[cleanSymbol];
    
    if (!element) {
      return (
        <div key={`missing-${symbol}`} className="w-12 h-14 md:w-14 md:h-16 bg-gray-700 rounded flex items-center justify-center text-gray-500 text-xs">
          {cleanSymbol}
        </div>
      );
    }

    const style = getElementStyle(cleanSymbol);
    return (
      <div
        key={symbol}
        className="w-12 h-14 md:w-14 md:h-16 rounded cursor-pointer transition-all duration-200 flex flex-col items-center justify-center p-1 relative"
        style={style}
        onClick={() => handleElementClick(cleanSymbol)}
        onMouseEnter={() => setHoveredElement(cleanSymbol)}
        onMouseLeave={() => setHoveredElement(null)}
      >
        <span className="text-[8px] text-gray-300 absolute top-0.5 left-1">{element.atomicNumber}</span>
        <span className="text-sm md:text-base font-bold text-white">{element.symbol}</span>
        <span className="text-[7px] md:text-[8px] text-gray-200 truncate w-full text-center">{element.name}</span>
        {symbol.includes('*') && <span className="text-[6px] text-yellow-400 absolute top-0.5 right-1">*</span>}
        {showElectronShells && element.electrons && (
          <span className="text-[6px] text-gray-400 absolute bottom-0.5">{element.electrons.join('-')}</span>
        )}
      </div>
    );
  }, [elements, getElementStyle, handleElementClick, showElectronShells]);

  const renderElectronShells = useCallback((electrons) => {
    if (!electrons || !Array.isArray(electrons)) return null;
    const shellColors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#9B59B6', '#E74C3C', '#1ABC9C'];
    const maxRadius = 80;
    const shellSpacing = maxRadius / (electrons.length + 1);

    return (
      <svg width="180" height="180" className="mx-auto">
        <circle cx="90" cy="90" r="12" fill="#FF6B6B" />
        <text x="90" y="94" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">+</text>
        {electrons.map((electronCount, shellIndex) => {
          const radius = (shellIndex + 1) * shellSpacing + 15;
          const electronPositions = [];
          for (let i = 0; i < electronCount; i++) {
            const angle = (2 * Math.PI * i) / electronCount - Math.PI / 2;
            electronPositions.push({ x: 90 + radius * Math.cos(angle), y: 90 + radius * Math.sin(angle) });
          }
          return (
            <g key={`shell-${shellIndex}`}>
              <circle cx="90" cy="90" r={radius} fill="none" stroke={shellColors[shellIndex % shellColors.length]} strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
              {electronPositions.map((pos, i) => (
                <g key={`electron-${shellIndex}-${i}`}>
                  <circle cx={pos.x} cy={pos.y} r="6" fill={shellColors[shellIndex % shellColors.length]} className="animate-pulse" />
                  <text x={pos.x} y={pos.y + 3} textAnchor="middle" fill="white" fontSize="7">-</text>
                </g>
              ))}
              <text x="90" y={90 - radius - 5} textAnchor="middle" fill={shellColors[shellIndex % shellColors.length]} fontSize="8">{electronCount}e⁻</text>
            </g>
          );
        })}
      </svg>
    );
  }, []);

  const selectedElementData = selectedElement ? { ...elements[selectedElement], ...elementExtendedData[selectedElement] } : null;

  return (
    <div className="bg-gray-900 rounded-xl p-4 md:p-6 overflow-x-auto">
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
        <h2 className="text-2xl font-bold text-white">🧪 Bảng Tuần Hoàn Tương Tác</h2>
        <div className="flex flex-wrap gap-3">
          <input type="text" placeholder="Tìm nguyên tố..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none w-40" />
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none">
            <option value="all">Tất cả loại</option>
            {Object.entries(categoryNames).map(([key, name]) => (<option key={key} value={key}>{name}</option>))}
          </select>
          <button onClick={() => setShowElectronShells(!showElectronShells)}
            className={`px-4 py-2 rounded-lg transition-all ${showElectronShells ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
            ⚛️ Lớp e⁻
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(categoryNames).map(([key, name]) => (
          <div key={key} className="flex items-center gap-1 px-2 py-1 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity"
            style={{ backgroundColor: categoryColors[key] + '40' }} onClick={() => setFilterCategory(filterCategory === key ? 'all' : key)}>
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: categoryColors[key] }} />
            <span className="text-white">{name}</span>
          </div>
        ))}
      </div>

      <div className="inline-block min-w-max">
        <div className="flex flex-col gap-1">
          {PERIODIC_TABLE_LAYOUT.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex gap-1">
              <span className="w-6 h-14 md:h-16 flex items-center justify-center text-gray-500 text-sm">{rowIndex + 1}</span>
              {row.map((symbol, colIndex) => renderElement(symbol, rowIndex, colIndex))}
            </div>
          ))}
        </div>

        {/* Lanthanides Series */}
        <div className="mt-6 mb-4 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-semibold w-12">* La series:</span>
            <div className="flex gap-1">
              {LANTHANIDES.map((symbol) => renderElement(symbol, 8, LANTHANIDES.indexOf(symbol)))}
            </div>
          </div>

          {/* Actinides Series */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-semibold w-12">** Ac series:</span>
            <div className="flex gap-1">
              {ACTINIDES.map((symbol) => renderElement(symbol, 9, ACTINIDES.indexOf(symbol)))}
            </div>
          </div>
        </div>

        {/* Legend & Annotations */}
        <div className="mt-6 pt-4 border-t border-gray-700 text-xs text-gray-400 space-y-2">
          <div className="flex gap-4 flex-wrap">
            <div>💧 <span className="text-gray-300">Lỏng ở T° phòng:</span> Hg, Br</div>
            <div>💨 <span className="text-gray-300">Khí ở T° phòng:</span> H, N, O, F, Cl, He, Ne, Ar, Kr, Xe, Rn</div>
          </div>
        </div>
      </div>

      {selectedElementData && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setSelectedElement(null)}>
          <div className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2"
            style={{ borderColor: categoryColors[elementCategories[selectedElement]] }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl flex flex-col items-center justify-center text-white"
                  style={{ backgroundColor: categoryColors[elementCategories[selectedElement]] }}>
                  <span className="text-3xl font-bold">{selectedElementData.symbol}</span>
                  <span className="text-xs">{selectedElementData.atomicNumber}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedElementData.name}</h3>
                  <p className="text-gray-400">{categoryNames[elementCategories[selectedElement]]} • Nhóm {selectedElementData.group} • Chu kỳ {selectedElementData.period}</p>
                  {selectedElementData.electronConfig && <p className="text-blue-400 text-sm mt-1">Cấu hình e⁻: {selectedElementData.electronConfig}</p>}
                </div>
              </div>
              <button onClick={() => setSelectedElement(null)} className="text-gray-400 hover:text-white text-2xl">×</button>
            </div>

            {selectedElementData.electrons && (
              <div className="bg-gray-800 rounded-xl p-4 mb-4">
                <h4 className="text-white font-semibold mb-2 text-center">Cấu hình electron</h4>
                {renderElectronShells(selectedElementData.electrons)}
                <p className="text-center text-gray-400 text-sm mt-2">Lớp electron: {selectedElementData.electrons.join(' - ')}</p>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-gray-400 text-xs">Khối lượng nguyên tử</p>
                <p className="text-white font-semibold">{selectedElementData.atomicMass}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-gray-400 text-xs">Độ âm điện</p>
                <p className="text-white font-semibold">{selectedElementData.electronegativity || 'N/A'}</p>
              </div>
              {selectedElementData.meltingPoint !== undefined && (
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <p className="text-gray-400 text-xs">Nhiệt độ nóng chảy</p>
                  <p className="text-white font-semibold">{selectedElementData.meltingPoint}°C</p>
                </div>
              )}
              {selectedElementData.boilingPoint !== undefined && (
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <p className="text-gray-400 text-xs">Nhiệt độ sôi</p>
                  <p className="text-white font-semibold">{selectedElementData.boilingPoint}°C</p>
                </div>
              )}
            </div>

            {selectedElementData.description && (
              <div className="bg-gray-800 rounded-xl p-4 mb-4">
                <h4 className="text-white font-semibold mb-2">📝 Mô tả</h4>
                <p className="text-gray-300 text-sm">{selectedElementData.description}</p>
              </div>
            )}

            {selectedElementData.applications && (
              <div className="bg-gray-800 rounded-xl p-4 mb-4">
                <h4 className="text-white font-semibold mb-2">🔧 Ứng dụng</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedElementData.applications.map((app, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm">{app}</span>
                  ))}
                </div>
              </div>
            )}

            {selectedElementData.facts && (
              <div className="bg-gray-800 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-2">💡 Sự thật thú vị</h4>
                <ul className="space-y-2">
                  {selectedElementData.facts.map((fact, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-yellow-400">•</span>{fact}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedElementData.discoveredBy && (
              <div className="mt-4 text-center text-gray-500 text-sm">Phát hiện bởi: {selectedElementData.discoveredBy}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodicTable;
