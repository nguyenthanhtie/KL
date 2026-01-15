import React, { useState, useEffect } from 'react';
import { chemicals, reactions } from '../data/chemicalsData';
import { balanceEquation, formatEquation } from '../utils/chemistryCalculations';

const ChemicalReactionSimulator = () => {
  const [selectedReactants, setSelectedReactants] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [availableReactions, setAvailableReactions] = useState([]);
  const [currentReaction, setCurrentReaction] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [balanceResult, setBalanceResult] = useState(null);
  const [mode, setMode] = useState('predefined'); // 'predefined' or 'custom'

  useEffect(() => {
    // Lọc các phản ứng có thể thực hiện với các chất đã chọn
    if (selectedReactants.length > 0) {
      const possible = reactions.filter(reaction => 
        reaction.reactants.every(r => selectedReactants.includes(r))
      );
      setAvailableReactions(possible);
    } else {
      setAvailableReactions([]);
    }
  }, [selectedReactants]);

  const handleReactantSelect = (chemicalId) => {
    if (selectedReactants.includes(chemicalId)) {
      setSelectedReactants(selectedReactants.filter(id => id !== chemicalId));
    } else {
      setSelectedReactants([...selectedReactants, chemicalId]);
    }
  };

  const handleProductSelect = (chemicalId) => {
    if (selectedProducts.includes(chemicalId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== chemicalId));
    } else {
      setSelectedProducts([...selectedProducts, chemicalId]);
    }
  };

  const startReaction = (reaction) => {
    setCurrentReaction(reaction);
    setIsAnimating(true);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 3000);
  };

  const calculateBalance = () => {
    if (selectedReactants.length === 0 || selectedProducts.length === 0) {
      setBalanceResult({ success: false, message: 'Vui lòng chọn chất tham gia và sản phẩm' });
      return;
    }

    try {
      const reactantFormulas = selectedReactants.map(id => {
        const chem = chemicals.find(c => c.id === id);
        return chem ? chem.formula : id;
      });
      
      const productFormulas = selectedProducts.map(id => {
        const chem = chemicals.find(c => c.id === id);
        return chem ? chem.formula : id;
      });

      const coefficients = balanceEquation(reactantFormulas, productFormulas);
      const equation = formatEquation(reactantFormulas, productFormulas, coefficients);
      
      setBalanceResult({
        success: true,
        equation,
        coefficients
      });
    } catch {
      setBalanceResult({
        success: false,
        message: 'Không thể cân bằng phương trình này'
      });
    }
  };

  const resetSimulator = () => {
    setSelectedReactants([]);
    setSelectedProducts([]);
    setCurrentReaction(null);
    setBalanceResult(null);
  };

  const getChemicalById = (id) => {
    return chemicals.find(c => c.id === id);
  };

  return (
    <div className="chemical-reaction-simulator p-6 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-900">
        Mô Phỏng Phản Ứng Hóa Học
      </h2>

      {/* Chọn chế độ */}
      <div className="mode-selector mb-6 flex gap-4 justify-center">
        <button
          onClick={() => setMode('predefined')}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            mode === 'predefined' 
              ? 'bg-purple-600 text-white' 
              : 'bg-white text-purple-600 border-2 border-purple-600'
          }`}
        >
          Phản ứng có sẵn
        </button>
        <button
          onClick={() => setMode('custom')}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            mode === 'custom' 
              ? 'bg-purple-600 text-white' 
              : 'bg-white text-purple-600 border-2 border-purple-600'
          }`}
        >
          Tự cân bằng phương trình
        </button>
      </div>

      {mode === 'predefined' ? (
        // Chế độ phản ứng có sẵn
        <div className="predefined-mode">
          <div className="chemical-selection mb-6">
            <h3 className="text-xl font-bold mb-4 text-purple-800">Chọn chất tham gia</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {chemicals.map((chemical) => (
                <button
                  key={chemical.id}
                  onClick={() => handleReactantSelect(chemical.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedReactants.includes(chemical.id)
                      ? 'border-purple-600 bg-purple-100 scale-105'
                      : 'border-gray-300 bg-white hover:border-purple-400'
                  }`}
                >
                  <div className="text-2xl font-bold">{chemical.formula}</div>
                  <div className="text-sm text-gray-600">{chemical.name}</div>
                  <div 
                    className="w-4 h-4 rounded-full mx-auto mt-2"
                    style={{ 
                      backgroundColor: chemical.color === 'transparent' || chemical.color === 'colorless' 
                        ? '#e5e7eb' 
                        : chemical.color 
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Hiển thị phản ứng có thể thực hiện */}
          {availableReactions.length > 0 && (
            <div className="available-reactions mb-6">
              <h3 className="text-xl font-bold mb-4 text-purple-800">Phản ứng có thể thực hiện</h3>
              <div className="space-y-3">
                {availableReactions.map((reaction) => (
                  <div
                    key={reaction.id}
                    className="reaction-card p-4 bg-white rounded-lg border-2 border-purple-200 hover:border-purple-400 transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-lg text-purple-900">{reaction.name}</h4>
                        <p className="text-sm text-gray-600">{reaction.type}</p>
                      </div>
                      <button
                        onClick={() => startReaction(reaction)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                      >
                        Thực hiện
                      </button>
                    </div>
                    <div className="equation text-xl font-mono mb-2">
                      {reaction.equation}
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>{reaction.description}</p>
                      <p className="mt-1"><strong>Điều kiện:</strong> {reaction.conditions}</p>
                      <p className="mt-1">
                        <strong>Năng lượng:</strong> {reaction.energy} kJ/mol 
                        {reaction.energy < 0 ? ' (tỏa nhiệt 🔥)' : ' (thu nhiệt ❄️)'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Khu vực mô phỏng phản ứng */}
          {currentReaction && (
            <div className="reaction-visualization p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-center text-purple-900">
                {currentReaction.name}
              </h3>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                {/* Chất tham gia */}
                <div className="reactants flex gap-2">
                  {currentReaction.reactants.map((reactantId, index) => {
                    const chemical = getChemicalById(reactantId);
                    return (
                      <React.Fragment key={reactantId}>
                        {index > 0 && <span className="text-2xl">+</span>}
                        <div className={`chemical-container p-4 rounded-lg border-2 ${
                          isAnimating ? 'animate-bounce' : ''
                        }`}>
                          <div className="text-2xl font-bold">{chemical.formula}</div>
                          <div 
                            className="w-12 h-12 rounded-full mx-auto mt-2"
                            style={{ 
                              backgroundColor: chemical.color === 'transparent' || chemical.color === 'colorless' 
                                ? '#e5e7eb' 
                                : chemical.color 
                            }}
                          />
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Mũi tên */}
                <div className="arrow text-4xl">
                  {currentReaction.reversible ? '⇌' : '→'}
                </div>

                {/* Sản phẩm */}
                <div className="products flex gap-2">
                  {currentReaction.products.map((productId, index) => {
                    const chemical = getChemicalById(productId);
                    return (
                      <React.Fragment key={productId}>
                        {index > 0 && <span className="text-2xl">+</span>}
                        <div className={`chemical-container p-4 rounded-lg border-2 ${
                          isAnimating ? 'animate-pulse' : ''
                        }`}>
                          <div className="text-2xl font-bold">{chemical.formula}</div>
                          <div 
                            className="w-12 h-12 rounded-full mx-auto mt-2"
                            style={{ 
                              backgroundColor: chemical.color === 'transparent' || chemical.color === 'colorless' 
                                ? '#e5e7eb' 
                                : chemical.color 
                            }}
                          />
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {isAnimating && (
                <div className="animation-effects text-center">
                  <div className="text-6xl mb-2">
                    {currentReaction.animation === 'burn' && '🔥'}
                    {currentReaction.animation === 'explosion' && '💥'}
                    {currentReaction.animation === 'color-change' && '🌈'}
                    {currentReaction.animation === 'precipitation' && '⬇️'}
                    {currentReaction.animation === 'mix' && '🌊'}
                  </div>
                  <p className="text-lg font-semibold text-purple-700">
                    Phản ứng đang diễn ra...
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        // Chế độ tự cân bằng phương trình
        <div className="custom-mode">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="reactants-section">
              <h3 className="text-xl font-bold mb-4 text-purple-800">Chất tham gia</h3>
              <div className="grid grid-cols-2 gap-3">
                {chemicals.map((chemical) => (
                  <button
                    key={chemical.id}
                    onClick={() => handleReactantSelect(chemical.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedReactants.includes(chemical.id)
                        ? 'border-purple-600 bg-purple-100'
                        : 'border-gray-300 bg-white hover:border-purple-400'
                    }`}
                  >
                    <div className="text-lg font-bold">{chemical.formula}</div>
                    <div className="text-xs text-gray-600">{chemical.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="products-section">
              <h3 className="text-xl font-bold mb-4 text-purple-800">Sản phẩm</h3>
              <div className="grid grid-cols-2 gap-3">
                {chemicals.map((chemical) => (
                  <button
                    key={chemical.id}
                    onClick={() => handleProductSelect(chemical.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedProducts.includes(chemical.id)
                        ? 'border-pink-600 bg-pink-100'
                        : 'border-gray-300 bg-white hover:border-pink-400'
                    }`}
                  >
                    <div className="text-lg font-bold">{chemical.formula}</div>
                    <div className="text-xs text-gray-600">{chemical.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Nút cân bằng */}
          <div className="balance-controls flex justify-center gap-4 mb-6">
            <button
              onClick={calculateBalance}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              Cân bằng phương trình
            </button>
            <button
              onClick={resetSimulator}
              className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-semibold"
            >
              Đặt lại
            </button>
          </div>

          {/* Kết quả cân bằng */}
          {balanceResult && (
            <div className={`balance-result p-6 rounded-lg ${
              balanceResult.success ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
            }`}>
              {balanceResult.success ? (
                <>
                  <h3 className="text-xl font-bold mb-3 text-green-800">
                    ✓ Phương trình đã cân bằng
                  </h3>
                  <div className="equation text-2xl font-mono text-center mb-4">
                    {balanceResult.equation}
                  </div>
                  <div className="coefficients text-sm text-gray-700">
                    <strong>Hệ số:</strong> {balanceResult.coefficients.join(', ')}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-3 text-red-800">
                    ✗ Lỗi
                  </h3>
                  <p className="text-gray-700">{balanceResult.message}</p>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChemicalReactionSimulator;
