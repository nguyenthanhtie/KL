// Hệ thống nguyên liệu kiến thức - Knowledge Ingredients System
// Học sinh thu thập "kiến thức" như nguyên liệu để chế tạo hóa chất

// Các loại kiến thức cơ bản (nguyên liệu)
export const knowledgeTypes = {
  ATOMIC_STRUCTURE: 'atomic_structure',       // Cấu trúc nguyên tử
  CHEMICAL_BONDS: 'chemical_bonds',           // Liên kết hóa học
  PERIODIC_TRENDS: 'periodic_trends',         // Xu hướng tuần hoàn
  REACTION_TYPES: 'reaction_types',           // Các loại phản ứng
  STOICHIOMETRY: 'stoichiometry',             // Tính toán hóa học
  THERMODYNAMICS: 'thermodynamics',           // Nhiệt động học
  ACID_BASE: 'acid_base',                     // Axit-Bazơ
  OXIDATION_REDUCTION: 'oxidation_reduction', // Oxi hóa khử
  ORGANIC_BASICS: 'organic_basics',           // Hữu cơ cơ bản
  LAB_SAFETY: 'lab_safety',                   // An toàn phòng thí nghiệm
};

// Nguyên liệu kiến thức có thể thu thập
export const knowledgeIngredients = [
  {
    id: 'atom_knowledge',
    name: 'Hiểu biết về Nguyên tử',
    type: knowledgeTypes.ATOMIC_STRUCTURE,
    icon: '⚛️',
    rarity: 'common',
    description: 'Kiến thức cơ bản về cấu trúc nguyên tử, proton, neutron, electron',
    color: '#3B82F6',
    maxStack: 99
  },
  {
    id: 'electron_config',
    name: 'Cấu hình Electron',
    type: knowledgeTypes.ATOMIC_STRUCTURE,
    icon: '🔮',
    rarity: 'uncommon',
    description: 'Hiểu về cách sắp xếp electron trong nguyên tử',
    color: '#8B5CF6',
    maxStack: 50
  },
  {
    id: 'ionic_bond',
    name: 'Liên kết Ion',
    type: knowledgeTypes.CHEMICAL_BONDS,
    icon: '⚡',
    rarity: 'common',
    description: 'Kiến thức về liên kết ion giữa kim loại và phi kim',
    color: '#F59E0B',
    maxStack: 99
  },
  {
    id: 'covalent_bond',
    name: 'Liên kết Cộng hóa trị',
    type: knowledgeTypes.CHEMICAL_BONDS,
    icon: '🔗',
    rarity: 'common',
    description: 'Kiến thức về liên kết cộng hóa trị giữa các phi kim',
    color: '#10B981',
    maxStack: 99
  },
  {
    id: 'metallic_bond',
    name: 'Liên kết Kim loại',
    type: knowledgeTypes.CHEMICAL_BONDS,
    icon: '🔩',
    rarity: 'uncommon',
    description: 'Kiến thức về liên kết trong kim loại',
    color: '#6B7280',
    maxStack: 50
  },
  {
    id: 'periodic_pattern',
    name: 'Quy luật Tuần hoàn',
    type: knowledgeTypes.PERIODIC_TRENDS,
    icon: '📊',
    rarity: 'uncommon',
    description: 'Hiểu về xu hướng trong bảng tuần hoàn',
    color: '#EC4899',
    maxStack: 50
  },
  {
    id: 'electronegativity',
    name: 'Độ âm điện',
    type: knowledgeTypes.PERIODIC_TRENDS,
    icon: '🧲',
    rarity: 'rare',
    description: 'Kiến thức về độ âm điện và ảnh hưởng của nó',
    color: '#EF4444',
    maxStack: 30
  },
  {
    id: 'synthesis_reaction',
    name: 'Phản ứng Tổng hợp',
    type: knowledgeTypes.REACTION_TYPES,
    icon: '➕',
    rarity: 'common',
    description: 'Kiến thức về phản ứng tổng hợp A + B → AB',
    color: '#22C55E',
    maxStack: 99
  },
  {
    id: 'decomposition_reaction',
    name: 'Phản ứng Phân hủy',
    type: knowledgeTypes.REACTION_TYPES,
    icon: '💥',
    rarity: 'common',
    description: 'Kiến thức về phản ứng phân hủy AB → A + B',
    color: '#EF4444',
    maxStack: 99
  },
  {
    id: 'displacement_reaction',
    name: 'Phản ứng Thế',
    type: knowledgeTypes.REACTION_TYPES,
    icon: '🔄',
    rarity: 'uncommon',
    description: 'Kiến thức về phản ứng thế giữa các chất',
    color: '#F97316',
    maxStack: 50
  },
  {
    id: 'mole_concept',
    name: 'Khái niệm Mol',
    type: knowledgeTypes.STOICHIOMETRY,
    icon: '⚖️',
    rarity: 'uncommon',
    description: 'Hiểu về số Avogadro và khái niệm mol',
    color: '#8B5CF6',
    maxStack: 50
  },
  {
    id: 'balancing_equations',
    name: 'Cân bằng Phương trình',
    type: knowledgeTypes.STOICHIOMETRY,
    icon: '📐',
    rarity: 'uncommon',
    description: 'Kỹ năng cân bằng phương trình hóa học',
    color: '#06B6D4',
    maxStack: 50
  },
  {
    id: 'heat_energy',
    name: 'Năng lượng Nhiệt',
    type: knowledgeTypes.THERMODYNAMICS,
    icon: '🔥',
    rarity: 'uncommon',
    description: 'Kiến thức về nhiệt và phản ứng tỏa/thu nhiệt',
    color: '#F97316',
    maxStack: 50
  },
  {
    id: 'enthalpy',
    name: 'Enthalpy',
    type: knowledgeTypes.THERMODYNAMICS,
    icon: '📈',
    rarity: 'rare',
    description: 'Kiến thức sâu về enthalpy và biến đổi năng lượng',
    color: '#DC2626',
    maxStack: 30
  },
  {
    id: 'acid_knowledge',
    name: 'Hiểu biết về Axit',
    type: knowledgeTypes.ACID_BASE,
    icon: '🧪',
    rarity: 'common',
    description: 'Kiến thức cơ bản về axit và tính chất',
    color: '#EF4444',
    maxStack: 99
  },
  {
    id: 'base_knowledge',
    name: 'Hiểu biết về Bazơ',
    type: knowledgeTypes.ACID_BASE,
    icon: '🔵',
    rarity: 'common',
    description: 'Kiến thức cơ bản về bazơ và tính chất',
    color: '#3B82F6',
    maxStack: 99
  },
  {
    id: 'ph_scale',
    name: 'Thang pH',
    type: knowledgeTypes.ACID_BASE,
    icon: '📏',
    rarity: 'uncommon',
    description: 'Hiểu về thang đo pH và ý nghĩa',
    color: '#10B981',
    maxStack: 50
  },
  {
    id: 'oxidation_state',
    name: 'Số Oxi hóa',
    type: knowledgeTypes.OXIDATION_REDUCTION,
    icon: '🔢',
    rarity: 'uncommon',
    description: 'Kiến thức về số oxi hóa các nguyên tố',
    color: '#6366F1',
    maxStack: 50
  },
  {
    id: 'redox_reaction',
    name: 'Phản ứng Oxi hóa-Khử',
    type: knowledgeTypes.OXIDATION_REDUCTION,
    icon: '⚡',
    rarity: 'rare',
    description: 'Hiểu sâu về phản ứng oxi hóa khử',
    color: '#8B5CF6',
    maxStack: 30
  },
  {
    id: 'hydrocarbon_basic',
    name: 'Hydrocarbon Cơ bản',
    type: knowledgeTypes.ORGANIC_BASICS,
    icon: '⛽',
    rarity: 'uncommon',
    description: 'Kiến thức về hydrocarbon đơn giản',
    color: '#78716C',
    maxStack: 50
  },
  {
    id: 'functional_groups',
    name: 'Nhóm Chức năng',
    type: knowledgeTypes.ORGANIC_BASICS,
    icon: '🔬',
    rarity: 'rare',
    description: 'Kiến thức về các nhóm chức trong hợp chất hữu cơ',
    color: '#059669',
    maxStack: 30
  },
  {
    id: 'safety_basics',
    name: 'An toàn Cơ bản',
    type: knowledgeTypes.LAB_SAFETY,
    icon: '🦺',
    rarity: 'common',
    description: 'Kiến thức an toàn phòng thí nghiệm',
    color: '#FBBF24',
    maxStack: 99
  },
  {
    id: 'hazard_handling',
    name: 'Xử lý Nguy hiểm',
    type: knowledgeTypes.LAB_SAFETY,
    icon: '⚠️',
    rarity: 'uncommon',
    description: 'Kiến thức xử lý tình huống nguy hiểm',
    color: '#F97316',
    maxStack: 50
  }
];

// Công thức chế tạo hóa chất từ kiến thức
export const craftingRecipes = [
  {
    id: 'craft_h2o',
    resultChemical: 'H2O',
    resultAmount: 3,
    ingredients: [
      { ingredientId: 'atom_knowledge', amount: 2 },
      { ingredientId: 'covalent_bond', amount: 1 },
      { ingredientId: 'synthesis_reaction', amount: 1 }
    ],
    requiredLevel: 1,
    expReward: 15,
    description: 'Chế tạo nước từ kiến thức về liên kết cộng hóa trị',
    craftTime: 1000 // ms
  },
  {
    id: 'craft_hcl',
    resultChemical: 'HCl',
    resultAmount: 3,
    ingredients: [
      { ingredientId: 'atom_knowledge', amount: 2 },
      { ingredientId: 'covalent_bond', amount: 2 },
      { ingredientId: 'acid_knowledge', amount: 1 }
    ],
    requiredLevel: 1,
    expReward: 20,
    description: 'Chế tạo axit clohidric với kiến thức về axit',
    craftTime: 1500
  },
  {
    id: 'craft_naoh',
    resultChemical: 'NaOH',
    resultAmount: 3,
    ingredients: [
      { ingredientId: 'atom_knowledge', amount: 2 },
      { ingredientId: 'ionic_bond', amount: 2 },
      { ingredientId: 'base_knowledge', amount: 1 }
    ],
    requiredLevel: 1,
    expReward: 20,
    description: 'Chế tạo natri hidroxit với kiến thức về bazơ',
    craftTime: 1500
  },
  {
    id: 'craft_o2',
    resultChemical: 'O2',
    resultAmount: 5,
    ingredients: [
      { ingredientId: 'atom_knowledge', amount: 2 },
      { ingredientId: 'covalent_bond', amount: 1 }
    ],
    requiredLevel: 1,
    expReward: 10,
    description: 'Chế tạo khí oxy cơ bản',
    craftTime: 800
  },
  {
    id: 'craft_h2',
    resultChemical: 'H2',
    resultAmount: 5,
    ingredients: [
      { ingredientId: 'atom_knowledge', amount: 2 },
      { ingredientId: 'covalent_bond', amount: 1 }
    ],
    requiredLevel: 1,
    expReward: 10,
    description: 'Chế tạo khí hydro cơ bản',
    craftTime: 800
  },
  {
    id: 'craft_nacl',
    resultChemical: 'NaCl',
    resultAmount: 2,
    ingredients: [
      { ingredientId: 'atom_knowledge', amount: 3 },
      { ingredientId: 'ionic_bond', amount: 2 },
      { ingredientId: 'synthesis_reaction', amount: 1 }
    ],
    requiredLevel: 2,
    expReward: 25,
    description: 'Chế tạo muối ăn với liên kết ion',
    craftTime: 2000
  },
  {
    id: 'craft_h2so4',
    resultChemical: 'H2SO4',
    resultAmount: 2,
    ingredients: [
      { ingredientId: 'atom_knowledge', amount: 3 },
      { ingredientId: 'covalent_bond', amount: 3 },
      { ingredientId: 'acid_knowledge', amount: 2 },
      { ingredientId: 'oxidation_state', amount: 1 }
    ],
    requiredLevel: 3,
    expReward: 40,
    description: 'Chế tạo axit sunfuric mạnh',
    craftTime: 3000
  },
  {
    id: 'craft_ch4',
    resultChemical: 'CH4',
    resultAmount: 3,
    ingredients: [
      { ingredientId: 'atom_knowledge', amount: 2 },
      { ingredientId: 'covalent_bond', amount: 4 },
      { ingredientId: 'hydrocarbon_basic', amount: 1 }
    ],
    requiredLevel: 3,
    expReward: 30,
    description: 'Chế tạo khí metan - hydrocarbon đơn giản nhất',
    craftTime: 2500
  },
  {
    id: 'craft_nh3',
    resultChemical: 'NH3',
    resultAmount: 2,
    ingredients: [
      { ingredientId: 'atom_knowledge', amount: 3 },
      { ingredientId: 'covalent_bond', amount: 3 },
      { ingredientId: 'synthesis_reaction', amount: 2 },
      { ingredientId: 'heat_energy', amount: 1 }
    ],
    requiredLevel: 4,
    expReward: 45,
    description: 'Chế tạo amoniac - cần điều kiện nhiệt độ cao',
    craftTime: 3500
  },
  {
    id: 'craft_co2',
    resultChemical: 'CO2',
    resultAmount: 3,
    ingredients: [
      { ingredientId: 'atom_knowledge', amount: 2 },
      { ingredientId: 'covalent_bond', amount: 2 },
      { ingredientId: 'decomposition_reaction', amount: 1 },
      { ingredientId: 'oxidation_state', amount: 1 }
    ],
    requiredLevel: 2,
    expReward: 25,
    description: 'Chế tạo khí carbon dioxide',
    craftTime: 2000
  },
  {
    id: 'craft_fe',
    resultChemical: 'Fe',
    resultAmount: 2,
    ingredients: [
      { ingredientId: 'atom_knowledge', amount: 3 },
      { ingredientId: 'metallic_bond', amount: 2 },
      { ingredientId: 'periodic_pattern', amount: 1 }
    ],
    requiredLevel: 3,
    expReward: 35,
    description: 'Chế tạo sắt nguyên chất',
    craftTime: 2500
  },
  {
    id: 'craft_cu',
    resultChemical: 'Cu',
    resultAmount: 2,
    ingredients: [
      { ingredientId: 'atom_knowledge', amount: 3 },
      { ingredientId: 'metallic_bond', amount: 2 },
      { ingredientId: 'periodic_pattern', amount: 1 }
    ],
    requiredLevel: 3,
    expReward: 35,
    description: 'Chế tạo đồng nguyên chất',
    craftTime: 2500
  },
  {
    id: 'craft_zn',
    resultChemical: 'Zn',
    resultAmount: 2,
    ingredients: [
      { ingredientId: 'atom_knowledge', amount: 3 },
      { ingredientId: 'metallic_bond', amount: 2 },
      { ingredientId: 'periodic_pattern', amount: 1 }
    ],
    requiredLevel: 4,
    expReward: 40,
    description: 'Chế tạo kẽm nguyên chất',
    craftTime: 3000
  },
  {
    id: 'craft_cuso4',
    resultChemical: 'CuSO4',
    resultAmount: 2,
    ingredients: [
      { ingredientId: 'atom_knowledge', amount: 4 },
      { ingredientId: 'ionic_bond', amount: 2 },
      { ingredientId: 'oxidation_state', amount: 2 },
      { ingredientId: 'redox_reaction', amount: 1 }
    ],
    requiredLevel: 4,
    expReward: 50,
    description: 'Chế tạo đồng sunfat xanh lam',
    craftTime: 4000
  },
  {
    id: 'craft_agno3',
    resultChemical: 'AgNO3',
    resultAmount: 2,
    ingredients: [
      { ingredientId: 'atom_knowledge', amount: 4 },
      { ingredientId: 'ionic_bond', amount: 3 },
      { ingredientId: 'oxidation_state', amount: 2 },
      { ingredientId: 'hazard_handling', amount: 1 }
    ],
    requiredLevel: 5,
    expReward: 60,
    description: 'Chế tạo bạc nitrat - hóa chất nguy hiểm',
    craftTime: 5000
  }
];

// Thông tin về độ hiếm
export const rarityInfo = {
  common: {
    name: 'Thông thường',
    color: '#9CA3AF',
    dropRate: 0.6,
    glowColor: 'rgba(156, 163, 175, 0.3)'
  },
  uncommon: {
    name: 'Không phổ biến',
    color: '#22C55E',
    dropRate: 0.25,
    glowColor: 'rgba(34, 197, 94, 0.3)'
  },
  rare: {
    name: 'Hiếm',
    color: '#3B82F6',
    dropRate: 0.12,
    glowColor: 'rgba(59, 130, 246, 0.4)'
  },
  epic: {
    name: 'Sử thi',
    color: '#A855F7',
    dropRate: 0.025,
    glowColor: 'rgba(168, 85, 247, 0.5)'
  },
  legendary: {
    name: 'Huyền thoại',
    color: '#F97316',
    dropRate: 0.005,
    glowColor: 'rgba(249, 115, 22, 0.6)'
  }
};

// Helper functions
export const getIngredientById = (id) => {
  return knowledgeIngredients.find(i => i.id === id);
};

export const getRecipeById = (id) => {
  return craftingRecipes.find(r => r.id === id);
};

export const getRecipeByChemical = (chemicalId) => {
  return craftingRecipes.find(r => r.resultChemical === chemicalId);
};

export const canCraftRecipe = (recipe, ingredientInventory, playerLevel) => {
  if (playerLevel < recipe.requiredLevel) {
    return { canCraft: false, reason: `Cần level ${recipe.requiredLevel}` };
  }
  
  for (const ing of recipe.ingredients) {
    const owned = ingredientInventory[ing.ingredientId] || 0;
    if (owned < ing.amount) {
      const ingredient = getIngredientById(ing.ingredientId);
      return { 
        canCraft: false, 
        reason: `Thiếu ${ingredient.name} (${owned}/${ing.amount})` 
      };
    }
  }
  
  return { canCraft: true, reason: null };
};
