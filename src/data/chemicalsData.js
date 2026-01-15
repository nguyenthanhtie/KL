// Dữ liệu về các hóa chất phổ biến
export const chemicals = [
  {
    id: 'H2O',
    name: 'Nước',
    formula: 'H₂O',
    type: 'compound',
    state: 'liquid',
    color: 'transparent',
    molarMass: 18.015,
    description: 'Nước là dung môi phổ biến nhất',
    elements: [
      { symbol: 'H', count: 2 },
      { symbol: 'O', count: 1 }
    ],
    structure: {
      atoms: [
        { element: 'O', x: 0, y: 0, z: 0 },
        { element: 'H', x: 0.96, y: 0, z: 0 },
        { element: 'H', x: -0.24, y: 0.93, z: 0 }
      ],
      bonds: [
        { from: 0, to: 1, type: 'single' },
        { from: 0, to: 2, type: 'single' }
      ]
    }
  },
  {
    id: 'HCl',
    name: 'Axit clohidric',
    formula: 'HCl',
    type: 'acid',
    state: 'aqueous',
    color: 'colorless',
    molarMass: 36.46,
    description: 'Axit mạnh, ăn mòn kim loại',
    elements: [
      { symbol: 'H', count: 1 },
      { symbol: 'Cl', count: 1 }
    ],
    structure: {
      atoms: [
        { element: 'H', x: 0, y: 0, z: 0 },
        { element: 'Cl', x: 1.27, y: 0, z: 0 }
      ],
      bonds: [
        { from: 0, to: 1, type: 'single' }
      ]
    }
  },
  {
    id: 'NaOH',
    name: 'Natri hidroxit',
    formula: 'NaOH',
    type: 'base',
    state: 'solid',
    color: 'white',
    molarMass: 40.00,
    description: 'Bazơ mạnh, hay còn gọi là xút',
    elements: [
      { symbol: 'Na', count: 1 },
      { symbol: 'O', count: 1 },
      { symbol: 'H', count: 1 }
    ]
  },
  {
    id: 'NaCl',
    name: 'Natri clorua',
    formula: 'NaCl',
    type: 'salt',
    state: 'solid',
    color: 'white',
    molarMass: 58.44,
    description: 'Muối ăn thông thường',
    elements: [
      { symbol: 'Na', count: 1 },
      { symbol: 'Cl', count: 1 }
    ]
  },
  {
    id: 'H2SO4',
    name: 'Axit sunfuric',
    formula: 'H₂SO₄',
    type: 'acid',
    state: 'liquid',
    color: 'colorless',
    molarMass: 98.08,
    description: 'Axit mạnh, có tính háo nước',
    elements: [
      { symbol: 'H', count: 2 },
      { symbol: 'S', count: 1 },
      { symbol: 'O', count: 4 }
    ]
  },
  {
    id: 'CH4',
    name: 'Metan',
    formula: 'CH₄',
    type: 'organic',
    state: 'gas',
    color: 'colorless',
    molarMass: 16.04,
    description: 'Khí thiên nhiên chính',
    elements: [
      { symbol: 'C', count: 1 },
      { symbol: 'H', count: 4 }
    ],
    structure: {
      atoms: [
        { element: 'C', x: 0, y: 0, z: 0 },
        { element: 'H', x: 0.63, y: 0.63, z: 0.63 },
        { element: 'H', x: -0.63, y: -0.63, z: 0.63 },
        { element: 'H', x: -0.63, y: 0.63, z: -0.63 },
        { element: 'H', x: 0.63, y: -0.63, z: -0.63 }
      ],
      bonds: [
        { from: 0, to: 1, type: 'single' },
        { from: 0, to: 2, type: 'single' },
        { from: 0, to: 3, type: 'single' },
        { from: 0, to: 4, type: 'single' }
      ]
    }
  },
  {
    id: 'CO2',
    name: 'Carbon dioxide',
    formula: 'CO₂',
    type: 'compound',
    state: 'gas',
    color: 'colorless',
    molarMass: 44.01,
    description: 'Khí gây hiệu ứng nhà kính',
    elements: [
      { symbol: 'C', count: 1 },
      { symbol: 'O', count: 2 }
    ],
    structure: {
      atoms: [
        { element: 'C', x: 0, y: 0, z: 0 },
        { element: 'O', x: -1.16, y: 0, z: 0 },
        { element: 'O', x: 1.16, y: 0, z: 0 }
      ],
      bonds: [
        { from: 0, to: 1, type: 'double' },
        { from: 0, to: 2, type: 'double' }
      ]
    }
  },
  {
    id: 'NH3',
    name: 'Amoniac',
    formula: 'NH₃',
    type: 'compound',
    state: 'gas',
    color: 'colorless',
    molarMass: 17.03,
    description: 'Khí có mùi khai',
    elements: [
      { symbol: 'N', count: 1 },
      { symbol: 'H', count: 3 }
    ]
  },
  {
    id: 'O2',
    name: 'Oxy',
    formula: 'O₂',
    type: 'element',
    state: 'gas',
    color: 'colorless',
    molarMass: 32.00,
    description: 'Khí cần thiết cho sự sống',
    elements: [
      { symbol: 'O', count: 2 }
    ]
  },
  {
    id: 'H2',
    name: 'Hydro',
    formula: 'H₂',
    type: 'element',
    state: 'gas',
    color: 'colorless',
    molarMass: 2.016,
    description: 'Khí nhẹ nhất',
    elements: [
      { symbol: 'H', count: 2 }
    ]
  },
  {
    id: 'Fe',
    name: 'Sắt',
    formula: 'Fe',
    type: 'metal',
    state: 'solid',
    color: 'gray',
    molarMass: 55.845,
    description: 'Kim loại phổ biến',
    elements: [
      { symbol: 'Fe', count: 1 }
    ]
  },
  {
    id: 'Cu',
    name: 'Đồng',
    formula: 'Cu',
    type: 'metal',
    state: 'solid',
    color: 'reddish',
    molarMass: 63.546,
    description: 'Kim loại dẫn điện tốt',
    elements: [
      { symbol: 'Cu', count: 1 }
    ]
  },
  {
    id: 'Zn',
    name: 'Kẽm',
    formula: 'Zn',
    type: 'metal',
    state: 'solid',
    color: 'bluish-gray',
    molarMass: 65.38,
    description: 'Kim loại chống gỉ',
    elements: [
      { symbol: 'Zn', count: 1 }
    ]
  },
  {
    id: 'CuSO4',
    name: 'Đồng(II) sunfat',
    formula: 'CuSO₄',
    type: 'salt',
    state: 'solid',
    color: 'blue',
    molarMass: 159.61,
    description: 'Muối màu xanh lam',
    elements: [
      { symbol: 'Cu', count: 1 },
      { symbol: 'S', count: 1 },
      { symbol: 'O', count: 4 }
    ]
  },
  {
    id: 'AgNO3',
    name: 'Bạc nitrat',
    formula: 'AgNO₃',
    type: 'salt',
    state: 'solid',
    color: 'white',
    molarMass: 169.87,
    description: 'Muối bạc, dùng trong phân tích',
    elements: [
      { symbol: 'Ag', count: 1 },
      { symbol: 'N', count: 1 },
      { symbol: 'O', count: 3 }
    ]
  }
];

// Dữ liệu về các phản ứng hóa học
export const reactions = [
  {
    id: 'neutralization_1',
    name: 'Phản ứng trung hòa axit-bazơ',
    type: 'neutralization',
    reactants: ['HCl', 'NaOH'],
    products: ['NaCl', 'H2O'],
    equation: 'HCl + NaOH → NaCl + H₂O',
    balancedCoefficients: [1, 1, 1, 1],
    description: 'Axit và bazơ phản ứng tạo muối và nước',
    energy: -57.32, // kJ/mol (tỏa nhiệt)
    conditions: 'Nhiệt độ thường',
    animation: 'mix'
  },
  {
    id: 'combustion_1',
    name: 'Đốt cháy metan',
    type: 'combustion',
    reactants: ['CH4', 'O2'],
    products: ['CO2', 'H2O'],
    equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
    balancedCoefficients: [1, 2, 1, 2],
    description: 'Metan cháy trong oxy tạo CO2 và nước',
    energy: -890, // kJ/mol (tỏa nhiệt)
    conditions: 'Nhiệt độ cao, có lửa',
    animation: 'burn'
  },
  {
    id: 'displacement_1',
    name: 'Kim loại đẩy kim loại',
    type: 'displacement',
    reactants: ['Fe', 'CuSO4'],
    products: ['Cu', 'FeSO4'],
    equation: 'Fe + CuSO₄ → Cu + FeSO₄',
    balancedCoefficients: [1, 1, 1, 1],
    description: 'Sắt đẩy đồng ra khỏi dung dịch muối',
    energy: -149.7,
    conditions: 'Nhiệt độ thường, dung dịch',
    animation: 'color-change'
  },
  {
    id: 'displacement_2',
    name: 'Kẽm đẩy đồng',
    type: 'displacement',
    reactants: ['Zn', 'CuSO4'],
    products: ['Cu', 'ZnSO4'],
    equation: 'Zn + CuSO₄ → Cu + ZnSO₄',
    balancedCoefficients: [1, 1, 1, 1],
    description: 'Kẽm đẩy đồng ra khỏi dung dịch muối',
    energy: -216.8,
    conditions: 'Nhiệt độ thường',
    animation: 'color-change'
  },
  {
    id: 'synthesis_1',
    name: 'Tổng hợp nước',
    type: 'synthesis',
    reactants: ['H2', 'O2'],
    products: ['H2O'],
    equation: '2H₂ + O₂ → 2H₂O',
    balancedCoefficients: [2, 1, 2],
    description: 'Hydro cháy trong oxy tạo nước',
    energy: -571.66,
    conditions: 'Nhiệt độ cao hoặc có chất xúc tác',
    animation: 'explosion'
  },
  {
    id: 'synthesis_2',
    name: 'Tổng hợp amoniac',
    type: 'synthesis',
    reactants: ['N2', 'H2'],
    products: ['NH3'],
    equation: 'N₂ + 3H₂ ⇌ 2NH₃',
    balancedCoefficients: [1, 3, 2],
    description: 'Tổng hợp amoniac (Phương pháp Haber)',
    energy: -92.4,
    conditions: 'Nhiệt độ 450-500°C, áp suất cao, xúc tác Fe',
    animation: 'synthesis',
    reversible: true
  },
  {
    id: 'precipitation_1',
    name: 'Phản ứng tạo kết tủa',
    type: 'precipitation',
    reactants: ['AgNO3', 'NaCl'],
    products: ['AgCl', 'NaNO3'],
    equation: 'AgNO₃ + NaCl → AgCl↓ + NaNO₃',
    balancedCoefficients: [1, 1, 1, 1],
    description: 'Tạo kết tủa bạc clorua màu trắng',
    energy: -65.5,
    conditions: 'Nhiệt độ thường, dung dịch',
    animation: 'precipitation'
  }
];

// Điều kiện để mở khóa các phản ứng và hóa chất
export const unlockRequirements = {
  chemicals: {
    'H2O': { level: 1, required: [] },
    'HCl': { level: 1, required: [] },
    'NaOH': { level: 1, required: [] },
    'NaCl': { level: 1, required: ['neutralization_1'] },
    'O2': { level: 2, required: [] },
    'H2': { level: 2, required: [] },
    'CO2': { level: 2, required: ['combustion_1'] },
    'CH4': { level: 3, required: [] },
    'Fe': { level: 3, required: [] },
    'Cu': { level: 3, required: ['displacement_1'] },
    'Zn': { level: 4, required: [] },
    'CuSO4': { level: 4, required: [] },
    'AgNO3': { level: 5, required: [] },
    'NH3': { level: 5, required: ['synthesis_2'] },
    'H2SO4': { level: 6, required: [] }
  },
  reactions: {
    'neutralization_1': { level: 1, requiredChemicals: ['HCl', 'NaOH'] },
    'combustion_1': { level: 3, requiredChemicals: ['CH4', 'O2'] },
    'synthesis_1': { level: 2, requiredChemicals: ['H2', 'O2'] },
    'displacement_1': { level: 3, requiredChemicals: ['Fe', 'CuSO4'] },
    'displacement_2': { level: 4, requiredChemicals: ['Zn', 'CuSO4'] },
    'synthesis_2': { level: 5, requiredChemicals: ['N2', 'H2'] },
    'precipitation_1': { level: 5, requiredChemicals: ['AgNO3', 'NaCl'] }
  }
};

// Giải thưởng khi hoàn thành phản ứng
export const reactionRewards = {
  'neutralization_1': { points: 10, chemicals: ['NaCl'] },
  'combustion_1': { points: 25, chemicals: ['CO2'] },
  'synthesis_1': { points: 20, chemicals: ['H2O'] },
  'displacement_1': { points: 30, chemicals: ['Cu'] },
  'displacement_2': { points: 35, chemicals: ['Cu'] },
  'synthesis_2': { points: 50, chemicals: ['NH3'] },
  'precipitation_1': { points: 40, chemicals: ['AgCl'] }
};
