// Dữ liệu phân tử 3D cho MolecularViewer
// Tọa độ xyz và các liên kết để vẽ cấu trúc phân tử

export const molecules = {
  // Phân tử đơn giản
  H2: {
    name: 'Hydro (H₂)',
    formula: 'H₂',
    description: 'Khí hydro, phân tử đơn giản nhất',
    atoms: [
      { element: 'H', position: [-0.37, 0, 0] },
      { element: 'H', position: [0.37, 0, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 }
    ]
  },
  
  O2: {
    name: 'Oxy (O₂)',
    formula: 'O₂',
    description: 'Khí oxy, cần thiết cho hô hấp',
    atoms: [
      { element: 'O', position: [-0.6, 0, 0] },
      { element: 'O', position: [0.6, 0, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 2 }
    ]
  },

  N2: {
    name: 'Nitơ (N₂)',
    formula: 'N₂',
    description: 'Khí nitơ, chiếm 78% không khí',
    atoms: [
      { element: 'N', position: [-0.55, 0, 0] },
      { element: 'N', position: [0.55, 0, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 3 }
    ]
  },

  H2O: {
    name: 'Nước (H₂O)',
    formula: 'H₂O',
    description: 'Phân tử nước, góc liên kết 104.5°',
    atoms: [
      { element: 'O', position: [0, 0, 0] },
      { element: 'H', position: [0.757, 0.586, 0] },
      { element: 'H', position: [-0.757, 0.586, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 }
    ]
  },

  CO2: {
    name: 'Carbon dioxide (CO₂)',
    formula: 'CO₂',
    description: 'Khí CO₂, cấu trúc thẳng',
    atoms: [
      { element: 'C', position: [0, 0, 0] },
      { element: 'O', position: [-1.16, 0, 0] },
      { element: 'O', position: [1.16, 0, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 2 }
    ]
  },

  CO: {
    name: 'Carbon monoxide (CO)',
    formula: 'CO',
    description: 'Khí CO, độc hại',
    atoms: [
      { element: 'C', position: [-0.56, 0, 0] },
      { element: 'O', position: [0.56, 0, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 3 }
    ]
  },

  NH3: {
    name: 'Amoniac (NH₃)',
    formula: 'NH₃',
    description: 'Phân tử amoniac, hình chóp tam giác',
    atoms: [
      { element: 'N', position: [0, 0, 0.38] },
      { element: 'H', position: [0.94, 0, -0.12] },
      { element: 'H', position: [-0.47, 0.81, -0.12] },
      { element: 'H', position: [-0.47, -0.81, -0.12] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 }
    ]
  },

  CH4: {
    name: 'Metan (CH₄)',
    formula: 'CH₄',
    description: 'Khí metan, hình tứ diện đều',
    atoms: [
      { element: 'C', position: [0, 0, 0] },
      { element: 'H', position: [0.63, 0.63, 0.63] },
      { element: 'H', position: [-0.63, -0.63, 0.63] },
      { element: 'H', position: [-0.63, 0.63, -0.63] },
      { element: 'H', position: [0.63, -0.63, -0.63] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 }
    ]
  },

  C2H6: {
    name: 'Etan (C₂H₆)',
    formula: 'C₂H₆',
    description: 'Phân tử etan, hydrocarbon no',
    atoms: [
      { element: 'C', position: [-0.76, 0, 0] },
      { element: 'C', position: [0.76, 0, 0] },
      { element: 'H', position: [-1.16, 0.51, 0.89] },
      { element: 'H', position: [-1.16, 0.51, -0.89] },
      { element: 'H', position: [-1.16, -1.03, 0] },
      { element: 'H', position: [1.16, -0.51, 0.89] },
      { element: 'H', position: [1.16, -0.51, -0.89] },
      { element: 'H', position: [1.16, 1.03, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 1, to: 5, order: 1 },
      { from: 1, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 }
    ]
  },

  C2H4: {
    name: 'Etilen (C₂H₄)',
    formula: 'C₂H₄',
    description: 'Phân tử etilen, có liên kết đôi C=C',
    atoms: [
      { element: 'C', position: [-0.66, 0, 0] },
      { element: 'C', position: [0.66, 0, 0] },
      { element: 'H', position: [-1.23, 0.92, 0] },
      { element: 'H', position: [-1.23, -0.92, 0] },
      { element: 'H', position: [1.23, 0.92, 0] },
      { element: 'H', position: [1.23, -0.92, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 1, to: 4, order: 1 },
      { from: 1, to: 5, order: 1 }
    ]
  },

  C2H2: {
    name: 'Axetilen (C₂H₂)',
    formula: 'C₂H₂',
    description: 'Phân tử axetilen, có liên kết ba C≡C',
    atoms: [
      { element: 'C', position: [-0.6, 0, 0] },
      { element: 'C', position: [0.6, 0, 0] },
      { element: 'H', position: [-1.66, 0, 0] },
      { element: 'H', position: [1.66, 0, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 3 },
      { from: 0, to: 2, order: 1 },
      { from: 1, to: 3, order: 1 }
    ]
  },

  HCl: {
    name: 'Axit clohydric (HCl)',
    formula: 'HCl',
    description: 'Phân tử HCl',
    atoms: [
      { element: 'H', position: [-0.64, 0, 0] },
      { element: 'Cl', position: [0.64, 0, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 }
    ]
  },

  H2S: {
    name: 'Hydro sulfide (H₂S)',
    formula: 'H₂S',
    description: 'Khí H₂S, mùi trứng thối',
    atoms: [
      { element: 'S', position: [0, 0, 0] },
      { element: 'H', position: [0.96, 0.59, 0] },
      { element: 'H', position: [-0.96, 0.59, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 }
    ]
  },

  SO2: {
    name: 'Lưu huỳnh dioxide (SO₂)',
    formula: 'SO₂',
    description: 'Khí SO₂, góc liên kết 119°',
    atoms: [
      { element: 'S', position: [0, 0, 0] },
      { element: 'O', position: [1.43, 0.45, 0] },
      { element: 'O', position: [-1.43, 0.45, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 2 }
    ]
  },

  SO3: {
    name: 'Lưu huỳnh trioxide (SO₃)',
    formula: 'SO₃',
    description: 'Phân tử SO₃, phẳng tam giác',
    atoms: [
      { element: 'S', position: [0, 0, 0] },
      { element: 'O', position: [1.42, 0, 0] },
      { element: 'O', position: [-0.71, 1.23, 0] },
      { element: 'O', position: [-0.71, -1.23, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 2 },
      { from: 0, to: 3, order: 2 }
    ]
  },

  H2SO4: {
    name: 'Axit sunfuric (H₂SO₄)',
    formula: 'H₂SO₄',
    description: 'Axit mạnh, cấu trúc tứ diện',
    atoms: [
      { element: 'S', position: [0, 0, 0] },
      { element: 'O', position: [1.42, 0, 0] },
      { element: 'O', position: [-1.42, 0, 0] },
      { element: 'O', position: [0, 1.42, 0] },
      { element: 'O', position: [0, -1.42, 0] },
      { element: 'H', position: [0.97, 1.89, 0] },
      { element: 'H', position: [-0.97, -1.89, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 2 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 3, to: 5, order: 1 },
      { from: 4, to: 6, order: 1 }
    ]
  },

  HNO3: {
    name: 'Axit nitric (HNO₃)',
    formula: 'HNO₃',
    description: 'Axit mạnh, oxi hóa mạnh',
    atoms: [
      { element: 'N', position: [0, 0, 0] },
      { element: 'O', position: [1.21, 0.5, 0] },
      { element: 'O', position: [-1.21, 0.5, 0] },
      { element: 'O', position: [0, -1.2, 0] },
      { element: 'H', position: [1.21, 1.47, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 2 },
      { from: 0, to: 3, order: 2 },
      { from: 1, to: 4, order: 1 }
    ]
  },

  NaCl: {
    name: 'Muối ăn (NaCl)',
    formula: 'NaCl',
    description: 'Ion Na⁺ và Cl⁻',
    atoms: [
      { element: 'Na', position: [-1.4, 0, 0] },
      { element: 'Cl', position: [1.4, 0, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 }
    ]
  },

  // Phân tử hữu cơ
  CH3OH: {
    name: 'Methanol (CH₃OH)',
    formula: 'CH₃OH',
    description: 'Rượu methyl, độc hại',
    atoms: [
      { element: 'C', position: [0, 0, 0] },
      { element: 'O', position: [1.43, 0, 0] },
      { element: 'H', position: [2.0, 0.76, 0] },
      { element: 'H', position: [-0.36, 0.51, 0.89] },
      { element: 'H', position: [-0.36, 0.51, -0.89] },
      { element: 'H', position: [-0.36, -1.03, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 0, to: 5, order: 1 }
    ]
  },

  C2H5OH: {
    name: 'Ethanol (C₂H₅OH)',
    formula: 'C₂H₅OH',
    description: 'Rượu etylic, trong đồ uống có cồn',
    atoms: [
      { element: 'C', position: [-0.76, 0, 0] },
      { element: 'C', position: [0.76, 0, 0] },
      { element: 'O', position: [1.43, 1.2, 0] },
      { element: 'H', position: [2.0, 1.5, 0.7] },
      { element: 'H', position: [-1.16, 0.51, 0.89] },
      { element: 'H', position: [-1.16, 0.51, -0.89] },
      { element: 'H', position: [-1.16, -1.03, 0] },
      { element: 'H', position: [1.16, -0.51, 0.89] },
      { element: 'H', position: [1.16, -0.51, -0.89] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 0, to: 5, order: 1 },
      { from: 0, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 1, to: 8, order: 1 }
    ]
  },

  HCHO: {
    name: 'Formaldehyde (HCHO)',
    formula: 'HCHO',
    description: 'Aldehyde đơn giản nhất',
    atoms: [
      { element: 'C', position: [0, 0, 0] },
      { element: 'O', position: [1.21, 0, 0] },
      { element: 'H', position: [-0.6, 0.94, 0] },
      { element: 'H', position: [-0.6, -0.94, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 }
    ]
  },

  CH3COOH: {
    name: 'Axit acetic (CH₃COOH)',
    formula: 'CH₃COOH',
    description: 'Axit trong giấm ăn',
    atoms: [
      { element: 'C', position: [-1.2, 0, 0] },
      { element: 'C', position: [0.3, 0, 0] },
      { element: 'O', position: [0.9, 1.1, 0] },
      { element: 'O', position: [0.9, -1.1, 0] },
      { element: 'H', position: [1.85, -1.1, 0] },
      { element: 'H', position: [-1.6, 0.51, 0.89] },
      { element: 'H', position: [-1.6, 0.51, -0.89] },
      { element: 'H', position: [-1.6, -1.03, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 2 },
      { from: 1, to: 3, order: 1 },
      { from: 3, to: 4, order: 1 },
      { from: 0, to: 5, order: 1 },
      { from: 0, to: 6, order: 1 },
      { from: 0, to: 7, order: 1 }
    ]
  },

  C6H6: {
    name: 'Benzen (C₆H₆)',
    formula: 'C₆H₆',
    description: 'Vòng benzen, thơm',
    atoms: [
      { element: 'C', position: [1.4, 0, 0] },
      { element: 'C', position: [0.7, 1.21, 0] },
      { element: 'C', position: [-0.7, 1.21, 0] },
      { element: 'C', position: [-1.4, 0, 0] },
      { element: 'C', position: [-0.7, -1.21, 0] },
      { element: 'C', position: [0.7, -1.21, 0] },
      { element: 'H', position: [2.49, 0, 0] },
      { element: 'H', position: [1.24, 2.16, 0] },
      { element: 'H', position: [-1.24, 2.16, 0] },
      { element: 'H', position: [-2.49, 0, 0] },
      { element: 'H', position: [-1.24, -2.16, 0] },
      { element: 'H', position: [1.24, -2.16, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1.5 },
      { from: 1, to: 2, order: 1.5 },
      { from: 2, to: 3, order: 1.5 },
      { from: 3, to: 4, order: 1.5 },
      { from: 4, to: 5, order: 1.5 },
      { from: 5, to: 0, order: 1.5 },
      { from: 0, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 2, to: 8, order: 1 },
      { from: 3, to: 9, order: 1 },
      { from: 4, to: 10, order: 1 },
      { from: 5, to: 11, order: 1 }
    ]
  },

  C6H12O6: {
    name: 'Glucose (C₆H₁₂O₆)',
    formula: 'C₆H₁₂O₆',
    description: 'Đường glucose, năng lượng cho cơ thể',
    atoms: [
      { element: 'C', position: [0, 0, 0] },
      { element: 'C', position: [1.5, 0, 0] },
      { element: 'C', position: [2.25, 1.3, 0] },
      { element: 'C', position: [1.5, 2.6, 0] },
      { element: 'C', position: [0, 2.6, 0] },
      { element: 'C', position: [-0.75, 1.3, 0] },
      { element: 'O', position: [0.75, 1.3, 0.8] },
      { element: 'O', position: [-0.5, -1, 0] },
      { element: 'O', position: [2, -1, 0] },
      { element: 'O', position: [3.5, 1.3, 0] },
      { element: 'O', position: [2, 3.6, 0] },
      { element: 'O', position: [-0.5, 3.6, 0] },
      { element: 'H', position: [-1, -0.8, 0.7] },
      { element: 'H', position: [2.5, -0.8, 0.7] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 1 },
      { from: 3, to: 4, order: 1 },
      { from: 4, to: 5, order: 1 },
      { from: 5, to: 6, order: 1 },
      { from: 6, to: 0, order: 1 },
      { from: 0, to: 7, order: 1 },
      { from: 1, to: 8, order: 1 },
      { from: 2, to: 9, order: 1 },
      { from: 3, to: 10, order: 1 },
      { from: 4, to: 11, order: 1 },
      { from: 7, to: 12, order: 1 },
      { from: 8, to: 13, order: 1 }
    ]
  },

  // Phân tử khí hiệu ứng nhà kính
  NO2: {
    name: 'Nitrogen dioxide (NO₂)',
    formula: 'NO₂',
    description: 'Khí ô nhiễm, màu nâu đỏ',
    atoms: [
      { element: 'N', position: [0, 0, 0] },
      { element: 'O', position: [1.2, 0.6, 0] },
      { element: 'O', position: [-1.2, 0.6, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 1 }
    ]
  },

  O3: {
    name: 'Ozon (O₃)',
    formula: 'O₃',
    description: 'Bảo vệ Trái Đất khỏi tia UV',
    atoms: [
      { element: 'O', position: [0, 0, 0] },
      { element: 'O', position: [1.28, 0.6, 0] },
      { element: 'O', position: [-1.28, 0.6, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1.5 },
      { from: 0, to: 2, order: 1.5 }
    ]
  },

  // Phân tử vô cơ bổ sung
  CaCO3: {
    name: 'Canxi carbonate (CaCO₃)',
    formula: 'CaCO₃',
    description: 'Đá vôi, thạch cao, vỏ sò',
    atoms: [
      { element: 'Ca', position: [0, 0, 0] },
      { element: 'C', position: [2.3, 0, 0] },
      { element: 'O', position: [3.2, 1.1, 0] },
      { element: 'O', position: [3.2, -1.1, 0] },
      { element: 'O', position: [2.3, 0, 1.3] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 2 },
      { from: 1, to: 3, order: 1 },
      { from: 1, to: 4, order: 1 }
    ]
  },

  CaO: {
    name: 'Canxi oxide (CaO)',
    formula: 'CaO',
    description: 'Vôi sống, tạo nhiệt cao',
    atoms: [
      { element: 'Ca', position: [-0.7, 0, 0] },
      { element: 'O', position: [0.7, 0, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 2 }
    ]
  },

  'Ca(OH)2': {
    name: 'Canxi hydroxide (Ca(OH)₂)',
    formula: 'Ca(OH)₂',
    description: 'Vôi tôi, dung dịch kiềm',
    atoms: [
      { element: 'Ca', position: [0, 0, 0] },
      { element: 'O', position: [1.4, 0.8, 0] },
      { element: 'O', position: [-1.4, 0.8, 0] },
      { element: 'H', position: [2.1, 1.4, 0] },
      { element: 'H', position: [-2.1, 1.4, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 1, to: 3, order: 1 },
      { from: 2, to: 4, order: 1 }
    ]
  },

  NaOH: {
    name: 'Natri hydroxide (NaOH)',
    formula: 'NaOH',
    description: 'Xà phòng, kiềm mạnh',
    atoms: [
      { element: 'Na', position: [-0.7, 0, 0] },
      { element: 'O', position: [0.7, 0, 0] },
      { element: 'H', position: [1.3, 0.8, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 }
    ]
  },

  KOH: {
    name: 'Kali hydroxide (KOH)',
    formula: 'KOH',
    description: 'Xà phòng mềm, kiềm mạnh',
    atoms: [
      { element: 'K', position: [-0.8, 0, 0] },
      { element: 'O', position: [0.8, 0, 0] },
      { element: 'H', position: [1.5, 0.8, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 }
    ]
  },

  H2SO3: {
    name: 'Axit sulfite (H₂SO₃)',
    formula: 'H₂SO₃',
    description: 'Axit yếu, tác nhân tẩy',
    atoms: [
      { element: 'S', position: [0, 0, 0] },
      { element: 'O', position: [1.4, 0, 0] },
      { element: 'O', position: [-0.7, 1.2, 0] },
      { element: 'O', position: [-0.7, -1.2, 0] },
      { element: 'H', position: [-1.3, 1.8, 0] },
      { element: 'H', position: [-1.3, -1.8, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 2, to: 4, order: 1 },
      { from: 3, to: 5, order: 1 }
    ]
  },

  H3PO4: {
    name: 'Axit phốt phoric (H₃PO₄)',
    formula: 'H₃PO₄',
    description: 'Axit yếu, phân bón, đồ uống',
    atoms: [
      { element: 'P', position: [0, 0, 0] },
      { element: 'O', position: [1.5, 0, 0] },
      { element: 'O', position: [-0.75, 1.3, 0] },
      { element: 'O', position: [-0.75, -1.3, 0] },
      { element: 'O', position: [0, 0, 1.5] },
      { element: 'H', position: [2.1, 0.8, 0] },
      { element: 'H', position: [-1.3, 1.9, 0] },
      { element: 'H', position: [-1.3, -1.9, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 1, to: 5, order: 1 },
      { from: 2, to: 6, order: 1 },
      { from: 3, to: 7, order: 1 }
    ]
  },

  NH4Cl: {
    name: 'Amonium chloride (NH₄Cl)',
    formula: 'NH₄Cl',
    description: 'Muối amonium, chất nổ',
    atoms: [
      { element: 'N', position: [-0.7, 0, 0] },
      { element: 'Cl', position: [0.7, 0, 0] },
      { element: 'H', position: [-1.2, 0.8, 0] },
      { element: 'H', position: [-1.2, -0.8, 0] },
      { element: 'H', position: [-0.7, 0, 0.8] },
      { element: 'H', position: [-0.7, 0, -0.8] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 0, to: 5, order: 1 }
    ]
  },

  '(NH4)2SO4': {
    name: 'Amonium sulfate ((NH₄)₂SO₄)',
    formula: '(NH₄)₂SO₄',
    description: 'Phân bón, tạo mưa',
    atoms: [
      { element: 'S', position: [0, 0, 0] },
      { element: 'O', position: [1.4, 0, 0] },
      { element: 'O', position: [-1.4, 0, 0] },
      { element: 'O', position: [0, 1.4, 0] },
      { element: 'O', position: [0, -1.4, 0] },
      { element: 'N', position: [2.2, 1.2, 0] },
      { element: 'N', position: [-2.2, 1.2, 0] },
      { element: 'H', position: [2.8, 1.9, 0] },
      { element: 'H', position: [2.8, 0.5, 0] },
      { element: 'H', position: [-2.8, 1.9, 0] },
      { element: 'H', position: [-2.8, 0.5, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 2 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 3, to: 5, order: 1 },
      { from: 4, to: 6, order: 1 },
      { from: 5, to: 7, order: 1 },
      { from: 5, to: 8, order: 1 },
      { from: 6, to: 9, order: 1 },
      { from: 6, to: 10, order: 1 }
    ]
  },

  FeCl3: {
    name: 'Sắt(III) chloride (FeCl₃)',
    formula: 'FeCl₃',
    description: 'Chất khử trùng, tẩy',
    atoms: [
      { element: 'Fe', position: [0, 0, 0] },
      { element: 'Cl', position: [1.6, 0, 0] },
      { element: 'Cl', position: [-0.8, 1.4, 0] },
      { element: 'Cl', position: [-0.8, -1.4, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 }
    ]
  },

  'Fe(OH)3': {
    name: 'Sắt(III) hydroxide (Fe(OH)₃)',
    formula: 'Fe(OH)₃',
    description: 'Kết tủa reddish-brown',
    atoms: [
      { element: 'Fe', position: [0, 0, 0] },
      { element: 'O', position: [1.6, 0, 0] },
      { element: 'O', position: [-0.8, 1.4, 0] },
      { element: 'O', position: [-0.8, -1.4, 0] },
      { element: 'H', position: [2.2, 0.8, 0] },
      { element: 'H', position: [-1.4, 2.0, 0] },
      { element: 'H', position: [-1.4, -2.0, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 1, to: 4, order: 1 },
      { from: 2, to: 5, order: 1 },
      { from: 3, to: 6, order: 1 }
    ]
  },

  CuSO4: {
    name: 'Đồng(II) sulfate (CuSO₄)',
    formula: 'CuSO₄',
    description: 'Muối đồng, màu xanh biển',
    atoms: [
      { element: 'Cu', position: [0, 0, 0] },
      { element: 'S', position: [2.0, 0, 0] },
      { element: 'O', position: [2.7, 1.0, 0] },
      { element: 'O', position: [2.7, -1.0, 0] },
      { element: 'O', position: [2.0, 0, 1.3] },
      { element: 'O', position: [2.0, 0, -1.3] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 2 },
      { from: 1, to: 3, order: 1 },
      { from: 1, to: 4, order: 1 },
      { from: 1, to: 5, order: 1 }
    ]
  },

  AgNO3: {
    name: 'Bạc nitrate (AgNO₃)',
    formula: 'AgNO₃',
    description: 'Muối bạc, nhạy sáng',
    atoms: [
      { element: 'Ag', position: [0, 0, 0] },
      { element: 'N', position: [1.8, 0, 0] },
      { element: 'O', position: [2.5, 1.0, 0] },
      { element: 'O', position: [2.5, -1.0, 0] },
      { element: 'O', position: [1.8, 0, 1.2] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 2 },
      { from: 1, to: 3, order: 1 },
      { from: 1, to: 4, order: 1 }
    ]
  },

  BaCl2: {
    name: 'Bari chloride (BaCl₂)',
    formula: 'BaCl₂',
    description: 'Muối bari, pháo hoa',
    atoms: [
      { element: 'Ba', position: [0, 0, 0] },
      { element: 'Cl', position: [1.8, 0.8, 0] },
      { element: 'Cl', position: [1.8, -0.8, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 }
    ]
  },

  K2Cr2O7: {
    name: 'Kali dichromate (K₂Cr₂O₇)',
    formula: 'K₂Cr₂O₇',
    description: 'Tác nhân oxi hóa mạnh, màu cam',
    atoms: [
      { element: 'K', position: [-3, 0, 0] },
      { element: 'K', position: [3, 0, 0] },
      { element: 'Cr', position: [-1, 0.8, 0] },
      { element: 'Cr', position: [1, 0.8, 0] },
      { element: 'O', position: [-2, 1.5, 0] },
      { element: 'O', position: [0, 1.5, 0] },
      { element: 'O', position: [2, 1.5, 0] },
      { element: 'O', position: [-1.5, -0.5, 0.7] },
      { element: 'O', position: [1.5, -0.5, 0.7] },
      { element: 'O', position: [-1.5, -0.5, -0.7] },
      { element: 'O', position: [1.5, -0.5, -0.7] }
    ],
    bonds: [
      { from: 2, to: 3, order: 1 },
      { from: 2, to: 4, order: 2 },
      { from: 2, to: 5, order: 1 },
      { from: 3, to: 5, order: 1 },
      { from: 3, to: 6, order: 2 },
      { from: 2, to: 7, order: 1 },
      { from: 2, to: 9, order: 1 },
      { from: 3, to: 8, order: 1 },
      { from: 3, to: 10, order: 1 }
    ]
  },

  // Hydrocarbon bổ sung
  C3H8: {
    name: 'Propan (C₃H₈)',
    formula: 'C₃H₈',
    description: 'Khí, gas bếp',
    atoms: [
      { element: 'C', position: [-1.5, 0, 0] },
      { element: 'C', position: [0, 0, 0] },
      { element: 'C', position: [1.5, 0, 0] },
      { element: 'H', position: [-2.0, 0.5, 0.9] },
      { element: 'H', position: [-2.0, 0.5, -0.9] },
      { element: 'H', position: [-2.0, -1.0, 0] },
      { element: 'H', position: [0, 0.5, 0.9] },
      { element: 'H', position: [0, -1.0, 0] },
      { element: 'H', position: [2.0, 0.5, 0.9] },
      { element: 'H', position: [2.0, 0.5, -0.9] },
      { element: 'H', position: [2.0, -1.0, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 0, to: 5, order: 1 },
      { from: 1, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 2, to: 8, order: 1 },
      { from: 2, to: 9, order: 1 },
      { from: 2, to: 10, order: 1 }
    ]
  },

  C3H6: {
    name: 'Propen (C₃H₆)',
    formula: 'C₃H₆',
    description: 'Chất làm chín trái cây',
    atoms: [
      { element: 'C', position: [-0.8, 0, 0] },
      { element: 'C', position: [0.6, 0, 0] },
      { element: 'C', position: [1.4, 1.0, 0] },
      { element: 'H', position: [-1.4, 0.9, 0] },
      { element: 'H', position: [-1.4, -0.9, 0] },
      { element: 'H', position: [0.6, 1.0, 0] },
      { element: 'H', position: [2.0, 1.0, 0.9] },
      { element: 'H', position: [2.0, 1.0, -0.9] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 2 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 1, to: 5, order: 1 },
      { from: 2, to: 6, order: 1 },
      { from: 2, to: 7, order: 1 }
    ]
  },

  C4H10: {
    name: 'Butan (C₄H₁₀)',
    formula: 'C₄H₁₀',
    description: 'Khí bình, nhiên liệu',
    atoms: [
      { element: 'C', position: [-2.0, 0, 0] },
      { element: 'C', position: [-0.5, 0, 0] },
      { element: 'C', position: [1.0, 0, 0] },
      { element: 'C', position: [2.5, 0, 0] },
      { element: 'H', position: [-2.5, 0.5, 0.9] },
      { element: 'H', position: [-2.5, 0.5, -0.9] },
      { element: 'H', position: [-2.5, -1.0, 0] },
      { element: 'H', position: [-0.5, 0.5, 0.9] },
      { element: 'H', position: [-0.5, -1.0, 0] },
      { element: 'H', position: [1.0, 0.5, 0.9] },
      { element: 'H', position: [1.0, -1.0, 0] },
      { element: 'H', position: [3.0, 0.5, 0.9] },
      { element: 'H', position: [3.0, 0.5, -0.9] },
      { element: 'H', position: [3.0, -1.0, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 0, to: 5, order: 1 },
      { from: 0, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 1, to: 8, order: 1 },
      { from: 2, to: 9, order: 1 },
      { from: 2, to: 10, order: 1 },
      { from: 3, to: 11, order: 1 },
      { from: 3, to: 12, order: 1 },
      { from: 3, to: 13, order: 1 }
    ]
  },

  CH2O2: {
    name: 'Formic acid (HCOOH)',
    formula: 'HCOOH',
    description: 'Axit kiến, chất ăn mòn',
    atoms: [
      { element: 'C', position: [0, 0, 0] },
      { element: 'O', position: [1.3, 0.8, 0] },
      { element: 'O', position: [1.3, -0.8, 0] },
      { element: 'H', position: [-0.8, 0.8, 0] },
      { element: 'H', position: [2.1, -1.2, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 2, to: 4, order: 1 }
    ]
  },

  C2H5Cl: {
    name: 'Ethyl chloride (C₂H₅Cl)',
    formula: 'C₂H₅Cl',
    description: 'Chất tê tức thời',
    atoms: [
      { element: 'C', position: [-0.7, 0, 0] },
      { element: 'C', position: [0.8, 0, 0] },
      { element: 'Cl', position: [1.5, 0.9, 0] },
      { element: 'H', position: [-1.3, 0.9, 0] },
      { element: 'H', position: [-1.3, -0.9, 0] },
      { element: 'H', position: [-0.7, 0, 0.9] },
      { element: 'H', position: [0.8, 0.9, 0.9] },
      { element: 'H', position: [0.8, -0.9, 0.9] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 0, to: 5, order: 1 },
      { from: 1, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 }
    ]
  },

  C2H5Br: {
    name: 'Ethyl bromide (C₂H₅Br)',
    formula: 'C₂H₅Br',
    description: 'Chất lửa, tẩy mỡ',
    atoms: [
      { element: 'C', position: [-0.7, 0, 0] },
      { element: 'C', position: [0.8, 0, 0] },
      { element: 'Br', position: [1.6, 0.9, 0] },
      { element: 'H', position: [-1.3, 0.9, 0] },
      { element: 'H', position: [-1.3, -0.9, 0] },
      { element: 'H', position: [-0.7, 0, 0.9] },
      { element: 'H', position: [0.8, 0.9, 0.9] },
      { element: 'H', position: [0.8, -0.9, 0.9] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 0, to: 5, order: 1 },
      { from: 1, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 }
    ]
  },

  C6H5OH: {
    name: 'Phenol (C₆H₅OH)',
    formula: 'C₆H₅OH',
    description: 'Diệt khuẩn, độc tính cao',
    atoms: [
      { element: 'C', position: [1.4, 0, 0] },
      { element: 'C', position: [0.7, 1.21, 0] },
      { element: 'C', position: [-0.7, 1.21, 0] },
      { element: 'C', position: [-1.4, 0, 0] },
      { element: 'C', position: [-0.7, -1.21, 0] },
      { element: 'C', position: [0.7, -1.21, 0] },
      { element: 'O', position: [2.5, 0, 0] },
      { element: 'H', position: [1.24, 2.16, 0] },
      { element: 'H', position: [-1.24, 2.16, 0] },
      { element: 'H', position: [-2.49, 0, 0] },
      { element: 'H', position: [-1.24, -2.16, 0] },
      { element: 'H', position: [1.24, -2.16, 0] },
      { element: 'H', position: [3.0, 0.8, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1.5 },
      { from: 1, to: 2, order: 1.5 },
      { from: 2, to: 3, order: 1.5 },
      { from: 3, to: 4, order: 1.5 },
      { from: 4, to: 5, order: 1.5 },
      { from: 5, to: 0, order: 1.5 },
      { from: 0, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 2, to: 8, order: 1 },
      { from: 3, to: 9, order: 1 },
      { from: 4, to: 10, order: 1 },
      { from: 5, to: 11, order: 1 },
      { from: 6, to: 12, order: 1 }
    ]
  },

  C6H5Cl: {
    name: 'Chlorobenzene (C₆H₅Cl)',
    formula: 'C₆H₅Cl',
    description: 'Chất trung gian hóa học',
    atoms: [
      { element: 'C', position: [1.4, 0, 0] },
      { element: 'C', position: [0.7, 1.21, 0] },
      { element: 'C', position: [-0.7, 1.21, 0] },
      { element: 'C', position: [-1.4, 0, 0] },
      { element: 'C', position: [-0.7, -1.21, 0] },
      { element: 'C', position: [0.7, -1.21, 0] },
      { element: 'Cl', position: [2.5, 0, 0] },
      { element: 'H', position: [1.24, 2.16, 0] },
      { element: 'H', position: [-1.24, 2.16, 0] },
      { element: 'H', position: [-2.49, 0, 0] },
      { element: 'H', position: [-1.24, -2.16, 0] },
      { element: 'H', position: [1.24, -2.16, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1.5 },
      { from: 1, to: 2, order: 1.5 },
      { from: 2, to: 3, order: 1.5 },
      { from: 3, to: 4, order: 1.5 },
      { from: 4, to: 5, order: 1.5 },
      { from: 5, to: 0, order: 1.5 },
      { from: 0, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 2, to: 8, order: 1 },
      { from: 3, to: 9, order: 1 },
      { from: 4, to: 10, order: 1 },
      { from: 5, to: 11, order: 1 }
    ]
  },

  // Phân tử khí thêm
  NO: {
    name: 'Nitrogen monoxide (NO)',
    formula: 'NO',
    description: 'Khí độc, ô nhiễm không khí',
    atoms: [
      { element: 'N', position: [-0.55, 0, 0] },
      { element: 'O', position: [0.55, 0, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 3 }
    ]
  },

  N2O: {
    name: 'Nitrous oxide (N₂O)',
    formula: 'N₂O',
    description: 'Khí cười, gây mê',
    atoms: [
      { element: 'N', position: [-0.6, 0, 0] },
      { element: 'N', position: [0.3, 0, 0] },
      { element: 'O', position: [1.2, 0, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 3 },
      { from: 1, to: 2, order: 2 }
    ]
  },

  N2O5: {
    name: 'Dinitrogen pentoxide (N₂O₅)',
    formula: 'N₂O₅',
    description: 'Axit mạnh, oxi hóa',
    atoms: [
      { element: 'N', position: [-1.0, 0, 0] },
      { element: 'N', position: [1.0, 0, 0] },
      { element: 'O', position: [0, 1.2, 0] },
      { element: 'O', position: [-1.5, 0.8, 0.8] },
      { element: 'O', position: [-1.5, 0.8, -0.8] },
      { element: 'O', position: [1.5, 0.8, 0.8] },
      { element: 'O', position: [1.5, 0.8, -0.8] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 2 },
      { from: 0, to: 4, order: 1 },
      { from: 1, to: 5, order: 2 },
      { from: 1, to: 6, order: 1 }
    ]
  },

  PCl3: {
    name: 'Phosphorus trichloride (PCl₃)',
    formula: 'PCl₃',
    description: 'Chất trung gian hóa học',
    atoms: [
      { element: 'P', position: [0, 0, 0] },
      { element: 'Cl', position: [1.5, 0, 0] },
      { element: 'Cl', position: [-0.75, 1.3, 0] },
      { element: 'Cl', position: [-0.75, -1.3, 0] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 }
    ]
  },

  Cl2O: {
    name: 'Dichlorine monoxide (Cl₂O)',
    formula: 'Cl₂O',
    description: 'Tác nhân tẩy bleach',
    atoms: [
      { element: 'Cl', position: [-0.65, 0.4, 0] },
      { element: 'Cl', position: [0.65, 0.4, 0] },
      { element: 'O', position: [0, -0.4, 0] }
    ],
    bonds: [
      { from: 0, to: 2, order: 1 },
      { from: 1, to: 2, order: 1 }
    ]
  },

  P4: {
    name: 'White phosphorus (P₄)',
    formula: 'P₄',
    description: 'Phốt phor trắng, tự cháy',
    atoms: [
      { element: 'P', position: [0.63, 0.63, 0.63] },
      { element: 'P', position: [-0.63, -0.63, 0.63] },
      { element: 'P', position: [-0.63, 0.63, -0.63] },
      { element: 'P', position: [0.63, -0.63, -0.63] }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 1, to: 3, order: 1 },
      { from: 2, to: 3, order: 1 }
    ]
  }
};

// Màu CPK cho các nguyên tử
export const atomColors = {
  H: '#FFFFFF',
  C: '#909090',
  N: '#3050F8',
  O: '#FF0D0D',
  F: '#90E050',
  Cl: '#1FF01F',
  Br: '#A62929',
  I: '#940094',
  S: '#FFFF30',
  P: '#FF8000',
  Na: '#AB5CF2',
  K: '#8F40D4',
  Ca: '#3DFF00',
  Mg: '#8AFF00',
  Fe: '#E06633',
  Cu: '#C88033',
  Zn: '#7D80B0',
  Al: '#BFA6A6',
  Si: '#F0C8A0',
  default: '#808080'
};

// Bán kính nguyên tử (Å)
export const atomRadii = {
  H: 0.31,
  C: 0.77,
  N: 0.71,
  O: 0.66,
  F: 0.64,
  Cl: 0.99,
  Br: 1.14,
  I: 1.33,
  S: 1.05,
  P: 1.07,
  Na: 1.66,
  K: 2.03,
  Ca: 1.76,
  Mg: 1.41,
  Fe: 1.26,
  Cu: 1.28,
  Zn: 1.34,
  Al: 1.21,
  Si: 1.11,
  default: 0.8
};

// Phân nhóm phân tử
export const moleculeCategories = {
  simple: {
    name: 'Phân tử đơn giản',
    molecules: ['H2', 'O2', 'N2', 'HCl', 'H2O', 'CO2', 'CO', 'NH3', 'NO', 'N2O']
  },
  hydrocarbons: {
    name: 'Hydrocarbon',
    molecules: ['CH4', 'C2H6', 'C2H4', 'C2H2', 'C3H8', 'C3H6', 'C4H10', 'C6H6']
  },
  acids: {
    name: 'Axit',
    molecules: ['HCl', 'H2SO4', 'HNO3', 'CH3COOH', 'H2SO3', 'H3PO4', 'CH2O2', 'C6H5OH']
  },
  alcohols: {
    name: 'Rượu',
    molecules: ['CH3OH', 'C2H5OH']
  },
  oxides: {
    name: 'Oxit',
    molecules: ['CO', 'CO2', 'SO2', 'SO3', 'NO2', 'H2O', 'CaO', 'NO', 'N2O5']
  },
  organic: {
    name: 'Hữu cơ',
    molecules: ['CH4', 'C2H6', 'C2H4', 'C2H2', 'C3H8', 'C3H6', 'C4H10', 'C6H6', 'CH3OH', 'C2H5OH', 'HCHO', 'CH3COOH', 'C6H12O6', 'C6H5OH', 'C6H5Cl', 'C2H5Cl', 'C2H5Br']
  },
  inorganic: {
    name: 'Vô cơ',
    molecules: ['NaCl', 'CaCO3', 'CaO', 'Ca(OH)2', 'NaOH', 'KOH', 'NH4Cl', '(NH4)2SO4', 'FeCl3', 'Fe(OH)3', 'CuSO4', 'AgNO3', 'BaCl2', 'K2Cr2O7']
  },
  greenhouse: {
    name: 'Khí nhà kính',
    molecules: ['CO2', 'CH4', 'NO2', 'O3', 'N2O']
  },
  halogenated: {
    name: 'Halogenated',
    molecules: ['HCl', 'Cl2O', 'PCl3', 'C2H5Cl', 'C2H5Br', 'C6H5Cl', 'FeCl3', 'BaCl2']
  },
  salts: {
    name: 'Muối',
    molecules: ['NaCl', 'NH4Cl', '(NH4)2SO4', 'FeCl3', 'CuSO4', 'AgNO3', 'BaCl2', 'K2Cr2O7']
  }
};
