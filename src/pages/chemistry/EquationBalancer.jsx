import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Scale, ArrowRight, Atom, Beaker, CheckCircle2, AlertCircle, 
  RefreshCw, Lightbulb, ChevronDown, ChevronUp, Sparkles,
  FlaskConical, Info, Zap, BookOpen, History, X, Copy, Check, Wand2
} from 'lucide-react';

// Danh sách các nguyên tố phổ biến và khối lượng mol
const ELEMENTS = {
  H: { name: 'Hiđro', mass: 1 },
  He: { name: 'Heli', mass: 4 },
  Li: { name: 'Liti', mass: 7 },
  Be: { name: 'Berili', mass: 9 },
  B: { name: 'Bo', mass: 11 },
  C: { name: 'Cacbon', mass: 12 },
  N: { name: 'Nitơ', mass: 14 },
  O: { name: 'Oxi', mass: 16 },
  F: { name: 'Flo', mass: 19 },
  Ne: { name: 'Neon', mass: 20 },
  Na: { name: 'Natri', mass: 23 },
  Mg: { name: 'Magiê', mass: 24 },
  Al: { name: 'Nhôm', mass: 27 },
  Si: { name: 'Silic', mass: 28 },
  P: { name: 'Photpho', mass: 31 },
  S: { name: 'Lưu huỳnh', mass: 32 },
  Cl: { name: 'Clo', mass: 35.5 },
  Ar: { name: 'Argon', mass: 40 },
  K: { name: 'Kali', mass: 39 },
  Ca: { name: 'Canxi', mass: 40 },
  Sc: { name: 'Scandi', mass: 45 },
  Ti: { name: 'Titan', mass: 48 },
  V: { name: 'Vanadi', mass: 51 },
  Cr: { name: 'Crom', mass: 52 },
  Mn: { name: 'Mangan', mass: 55 },
  Fe: { name: 'Sắt', mass: 56 },
  Co: { name: 'Coban', mass: 59 },
  Ni: { name: 'Niken', mass: 59 },
  Cu: { name: 'Đồng', mass: 64 },
  Zn: { name: 'Kẽm', mass: 65 },
  Ga: { name: 'Gali', mass: 70 },
  Ge: { name: 'Gecmani', mass: 73 },
  As: { name: 'Asen', mass: 75 },
  Se: { name: 'Selen', mass: 79 },
  Br: { name: 'Brom', mass: 80 },
  Kr: { name: 'Kripton', mass: 84 },
  Rb: { name: 'Rubidi', mass: 85 },
  Sr: { name: 'Stronti', mass: 88 },
  Y: { name: 'Ytri', mass: 89 },
  Zr: { name: 'Zirconi', mass: 91 },
  Nb: { name: 'Niobi', mass: 93 },
  Mo: { name: 'Molipden', mass: 96 },
  Ag: { name: 'Bạc', mass: 108 },
  Cd: { name: 'Cadimi', mass: 112 },
  Sn: { name: 'Thiếc', mass: 119 },
  Sb: { name: 'Antimon', mass: 122 },
  I: { name: 'Iot', mass: 127 },
  Xe: { name: 'Xenon', mass: 131 },
  Cs: { name: 'Xesi', mass: 133 },
  Ba: { name: 'Bari', mass: 137 },
  La: { name: 'Lantan', mass: 139 },
  Au: { name: 'Vàng', mass: 197 },
  Hg: { name: 'Thủy ngân', mass: 201 },
  Pb: { name: 'Chì', mass: 207 },
  Bi: { name: 'Bitmut', mass: 209 },
  Po: { name: 'Poloni', mass: 209 },
  At: { name: 'Atatin', mass: 210 },
  Rn: { name: 'Radon', mass: 222 },
  Fr: { name: 'Franxi', mass: 223 },
  Ra: { name: 'Rađi', mass: 226 },
  U: { name: 'Urani', mass: 238 }
};

// Danh sách các nguyên tố để nhận diện (sắp xếp theo độ dài giảm dần để ưu tiên match nguyên tố 2 ký tự trước)
const ELEMENT_SYMBOLS = Object.keys(ELEMENTS).sort((a, b) => b.length - a.length);

// Chuẩn hóa công thức hóa học - làm cho thân thiện với người dùng
const normalizeFormula = (input) => {
  if (!input) return '';
  
  let formula = input.trim();
  
  // Loại bỏ khoảng trắng
  formula = formula.replace(/\s+/g, '');
  
  // Sửa lỗi phổ biến: số 0 thành chữ O (ví dụ: Fe203 → Fe2O3, H20 → H2O)
  // Chỉ sửa khi số 0 đứng sau số khác hoặc đầu chuỗi nguyên tố
  formula = formula.replace(/([A-Za-z])(\d*)0(\d*)/g, (match, letter, num1, num2) => {
    // Nếu là dạng như "H20" → "H2O", "Fe203" → "Fe2O3"
    if (num1 === '' && num2 !== '') {
      return letter + 'O' + num2;
    }
    if (num1 !== '' && num2 === '') {
      return letter + num1 + 'O';
    }
    if (num1 !== '' && num2 !== '') {
      return letter + num1 + 'O' + num2;
    }
    return letter + 'O';
  });
  
  // Chuẩn hóa chữ hoa/thường cho nguyên tố
  // Chuyển toàn bộ sang lowercase trước
  let normalized = '';
  let i = 0;
  
  while (i < formula.length) {
    // Kiểm tra ngoặc và số
    if (formula[i] === '(' || formula[i] === ')' || /\d/.test(formula[i])) {
      normalized += formula[i];
      i++;
      continue;
    }
    
    // Thử match nguyên tố (ưu tiên 2 ký tự trước)
    let matched = false;
    
    // Lấy 2 ký tự tiếp theo để kiểm tra
    const twoChars = formula.slice(i, i + 2).toLowerCase();
    const oneChar = formula[i].toLowerCase();
    
    // Kiểm tra nguyên tố 2 ký tự
    for (const elem of ELEMENT_SYMBOLS) {
      if (elem.length === 2 && twoChars === elem.toLowerCase()) {
        normalized += elem; // Thêm nguyên tố đúng định dạng
        i += 2;
        matched = true;
        break;
      }
    }
    
    if (!matched) {
      // Kiểm tra nguyên tố 1 ký tự
      for (const elem of ELEMENT_SYMBOLS) {
        if (elem.length === 1 && oneChar === elem.toLowerCase()) {
          normalized += elem;
          i += 1;
          matched = true;
          break;
        }
      }
    }
    
    if (!matched) {
      // Không match được, giữ nguyên ký tự (viết hoa chữ cái đầu nếu là chữ)
      if (/[a-zA-Z]/.test(formula[i])) {
        // Kiểm tra xem có phải đầu nguyên tố không
        if (i === 0 || /[\d()]/.test(formula[i-1])) {
          normalized += formula[i].toUpperCase();
        } else {
          normalized += formula[i].toLowerCase();
        }
      } else {
        normalized += formula[i];
      }
      i++;
    }
  }
  
  return normalized;
};

// Parse công thức hóa học thành object {nguyên tố: số lượng}
const parseFormula = (formula) => {
  // Chuẩn hóa công thức trước
  const normalizedFormula = normalizeFormula(formula);
  const elements = {};
  
  // Xử lý các nhóm trong ngoặc đơn trước
  let processedFormula = normalizedFormula;
  const groupRegex = /\(([^()]+)\)(\d*)/g;
  
  // Xử lý nested parentheses từ trong ra ngoài
  while (groupRegex.test(processedFormula)) {
    processedFormula = processedFormula.replace(groupRegex, (match, group, multiplier) => {
      const mult = parseInt(multiplier) || 1;
      const groupElements = parseFormulaSimple(group);
      let result = '';
      for (const [elem, count] of Object.entries(groupElements)) {
        result += elem + (count * mult > 1 ? count * mult : '');
      }
      return result;
    });
  }
  
  // Parse công thức đã xử lý
  const simpleElements = parseFormulaSimple(processedFormula);
  for (const [elem, count] of Object.entries(simpleElements)) {
    elements[elem] = (elements[elem] || 0) + count;
  }
  
  return elements;
};

// Parse công thức đơn giản (không có ngoặc)
const parseFormulaSimple = (formula) => {
  const elements = {};
  const regex = /([A-Z][a-z]?)(\d*)/g;
  let match;
  
  while ((match = regex.exec(formula)) !== null) {
    const element = match[1];
    const count = parseInt(match[2]) || 1;
    
    if (element && ELEMENTS[element]) {
      elements[element] = (elements[element] || 0) + count;
    } else if (element && element.length > 0) {
      // Có thể là nguyên tố chưa được thêm vào danh sách
      elements[element] = (elements[element] || 0) + count;
    }
  }
  
  return elements;
};

// Validate công thức hóa học
const validateFormula = (formula) => {
  if (!formula || formula.trim().length === 0) {
    return { valid: false, error: 'Vui lòng nhập công thức hóa học' };
  }
  
  // Chuẩn hóa công thức trước khi validate
  const normalized = normalizeFormula(formula);
  
  // Kiểm tra ký tự không hợp lệ (sau khi loại bỏ khoảng trắng)
  const cleanFormula = formula.replace(/\s+/g, '');
  const invalidChars = cleanFormula.match(/[^A-Za-z0-9()]/g);
  if (invalidChars) {
    return { valid: false, error: `Ký tự không hợp lệ: ${invalidChars.join(', ')}` };
  }
  
  // Kiểm tra ngoặc đóng mở
  let parenCount = 0;
  for (const char of normalized) {
    if (char === '(') parenCount++;
    if (char === ')') parenCount--;
    if (parenCount < 0) {
      return { valid: false, error: 'Ngoặc đóng mở không hợp lệ' };
    }
  }
  if (parenCount !== 0) {
    return { valid: false, error: 'Ngoặc đóng mở không hợp lệ' };
  }
  
  // Parse và kiểm tra nguyên tố (parseFormula đã tự động normalize)
  const elements = parseFormula(formula);
  if (Object.keys(elements).length === 0) {
    return { valid: false, error: 'Không tìm thấy nguyên tố hợp lệ' };
  }
  
  // Kiểm tra nguyên tố không xác định
  for (const elem of Object.keys(elements)) {
    if (!ELEMENTS[elem]) {
      return { valid: false, error: `Nguyên tố không xác định: ${elem}`, warning: true };
    }
  }
  
  return { valid: true, elements, normalized };
};

// Tìm UCLN của một mảng số
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
const gcdArray = (arr) => arr.reduce((a, b) => gcd(a, b));

// Tìm BCNN của một mảng số
const lcm = (a, b) => (a * b) / gcd(a, b);
const lcmArray = (arr) => arr.reduce((a, b) => lcm(a, b));

// Thuật toán cân bằng phương trình bằng phương pháp đại số (Gauss-Jordan)
const balanceEquation = (reactants, products) => {
  // Thu thập tất cả các chất
  const allCompounds = [...reactants, ...products];
  const numCompounds = allCompounds.length;
  const numReactants = reactants.length;
  
  // Thu thập tất cả các nguyên tố
  const allElements = new Set();
  allCompounds.forEach(compound => {
    const elements = parseFormula(compound);
    Object.keys(elements).forEach(elem => allElements.add(elem));
  });
  const elementsArray = Array.from(allElements);
  const numElements = elementsArray.length;
  
  // Xây dựng ma trận hệ số
  // Mỗi hàng là một nguyên tố
  // Mỗi cột là một chất (reactants có hệ số dương, products có hệ số âm)
  const matrix = [];
  
  for (let i = 0; i < numElements; i++) {
    const row = [];
    const element = elementsArray[i];
    
    for (let j = 0; j < numCompounds; j++) {
      const compound = allCompounds[j];
      const elements = parseFormula(compound);
      const count = elements[element] || 0;
      
      // Reactants có hệ số dương, products có hệ số âm
      if (j < numReactants) {
        row.push(count);
      } else {
        row.push(-count);
      }
    }
    
    matrix.push(row);
  }
  
  // Gaussian elimination với pivoting
  const augmentedMatrix = matrix.map(row => [...row, 0]); // Thêm cột 0
  
  let pivotRow = 0;
  for (let col = 0; col < numCompounds && pivotRow < numElements; col++) {
    // Tìm pivot lớn nhất
    let maxRow = pivotRow;
    for (let row = pivotRow + 1; row < numElements; row++) {
      if (Math.abs(augmentedMatrix[row][col]) > Math.abs(augmentedMatrix[maxRow][col])) {
        maxRow = row;
      }
    }
    
    if (Math.abs(augmentedMatrix[maxRow][col]) < 1e-10) {
      continue; // Cột này không có pivot
    }
    
    // Hoán đổi hàng
    [augmentedMatrix[pivotRow], augmentedMatrix[maxRow]] = [augmentedMatrix[maxRow], augmentedMatrix[pivotRow]];
    
    // Khử Gauss
    const pivot = augmentedMatrix[pivotRow][col];
    for (let row = 0; row < numElements; row++) {
      if (row !== pivotRow) {
        const factor = augmentedMatrix[row][col] / pivot;
        for (let c = col; c <= numCompounds; c++) {
          augmentedMatrix[row][c] -= factor * augmentedMatrix[pivotRow][c];
        }
      }
    }
    
    pivotRow++;
  }
  
  // Tìm nghiệm cơ bản (đặt biến tự do = 1)
  const solution = new Array(numCompounds).fill(1);
  
  // Back substitution với free variables
  for (let row = Math.min(numElements, numCompounds) - 1; row >= 0; row--) {
    // Tìm cột pivot
    let pivotCol = -1;
    for (let col = 0; col < numCompounds; col++) {
      if (Math.abs(augmentedMatrix[row][col]) > 1e-10) {
        pivotCol = col;
        break;
      }
    }
    
    if (pivotCol === -1) continue;
    
    // Tính giá trị từ các biến đã biết
    let sum = 0;
    for (let col = pivotCol + 1; col < numCompounds; col++) {
      sum += augmentedMatrix[row][col] * solution[col];
    }
    
    if (Math.abs(augmentedMatrix[row][pivotCol]) > 1e-10) {
      solution[pivotCol] = -sum / augmentedMatrix[row][pivotCol];
    }
  }
  
  // Đảm bảo tất cả hệ số dương
  const minValue = Math.min(...solution);
  if (minValue <= 0) {
    for (let i = 0; i < solution.length; i++) {
      solution[i] = solution[i] - minValue + 1;
    }
  }
  
  // Chuyển về số nguyên
  // Tìm mẫu số chung
  const fractions = solution.map(x => {
    const tolerance = 1e-6;
    for (let denom = 1; denom <= 100; denom++) {
      const numer = Math.round(x * denom);
      if (Math.abs(x - numer / denom) < tolerance) {
        return { numer, denom };
      }
    }
    return { numer: Math.round(x * 100), denom: 100 };
  });
  
  const commonDenom = lcmArray(fractions.map(f => f.denom));
  const integerSolution = fractions.map(f => Math.round(f.numer * (commonDenom / f.denom)));
  
  // Chia cho UCLN
  const commonGcd = gcdArray(integerSolution.filter(x => x > 0));
  const finalSolution = integerSolution.map(x => Math.round(x / commonGcd));
  
  // Đảm bảo tất cả hệ số >= 1
  const minFinal = Math.min(...finalSolution);
  if (minFinal < 1) {
    for (let i = 0; i < finalSolution.length; i++) {
      finalSolution[i] = finalSolution[i] - minFinal + 1;
    }
  }
  
  return {
    reactantCoefficients: finalSolution.slice(0, numReactants),
    productCoefficients: finalSolution.slice(numReactants),
    elements: elementsArray
  };
};

// Kiểm tra phương trình đã cân bằng
const verifyBalance = (reactants, products, reactantCoeffs, productCoeffs) => {
  const elementCounts = {};
  
  // Đếm nguyên tử bên trái
  reactants.forEach((compound, i) => {
    const elements = parseFormula(compound);
    const coeff = reactantCoeffs[i];
    for (const [elem, count] of Object.entries(elements)) {
      elementCounts[elem] = elementCounts[elem] || { left: 0, right: 0 };
      elementCounts[elem].left += count * coeff;
    }
  });
  
  // Đếm nguyên tử bên phải
  products.forEach((compound, i) => {
    const elements = parseFormula(compound);
    const coeff = productCoeffs[i];
    for (const [elem, count] of Object.entries(elements)) {
      elementCounts[elem] = elementCounts[elem] || { left: 0, right: 0 };
      elementCounts[elem].right += count * coeff;
    }
  });
  
  // Kiểm tra cân bằng
  let isBalanced = true;
  for (const elem of Object.keys(elementCounts)) {
    if (elementCounts[elem].left !== elementCounts[elem].right) {
      isBalanced = false;
      break;
    }
  }
  
  return { isBalanced, elementCounts };
};

// Format công thức với subscript
const formatFormula = (formula) => {
  return formula.replace(/(\d+)/g, '<sub>$1</sub>');
};

// Database các phản ứng hóa học phổ biến để dự đoán sản phẩm
const REACTION_DATABASE = [
  // Kim loại + O2 → Oxit kim loại
  { pattern: ['Fe', 'O2'], products: 'Fe2O3', type: 'oxidation' },
  { pattern: ['Al', 'O2'], products: 'Al2O3', type: 'oxidation' },
  { pattern: ['Mg', 'O2'], products: 'MgO', type: 'oxidation' },
  { pattern: ['Ca', 'O2'], products: 'CaO', type: 'oxidation' },
  { pattern: ['Na', 'O2'], products: 'Na2O', type: 'oxidation' },
  { pattern: ['K', 'O2'], products: 'K2O', type: 'oxidation' },
  { pattern: ['Cu', 'O2'], products: 'CuO', type: 'oxidation' },
  { pattern: ['Zn', 'O2'], products: 'ZnO', type: 'oxidation' },
  { pattern: ['P', 'O2'], products: 'P2O5', type: 'oxidation' },
  { pattern: ['S', 'O2'], products: 'SO2', type: 'oxidation' },
  { pattern: ['C', 'O2'], products: 'CO2', type: 'oxidation' },
  
  // Phi kim + H2 → Hợp chất khí
  { pattern: ['H2', 'O2'], products: 'H2O', type: 'synthesis' },
  { pattern: ['H2', 'Cl2'], products: 'HCl', type: 'synthesis' },
  { pattern: ['H2', 'N2'], products: 'NH3', type: 'synthesis' },
  { pattern: ['H2', 'S'], products: 'H2S', type: 'synthesis' },
  
  // Kim loại + Axit → Muối + H2
  { pattern: ['Fe', 'HCl'], products: 'FeCl2 + H2', type: 'acid-metal' },
  { pattern: ['Fe', 'H2SO4'], products: 'FeSO4 + H2', type: 'acid-metal' },
  { pattern: ['Zn', 'HCl'], products: 'ZnCl2 + H2', type: 'acid-metal' },
  { pattern: ['Zn', 'H2SO4'], products: 'ZnSO4 + H2', type: 'acid-metal' },
  { pattern: ['Mg', 'HCl'], products: 'MgCl2 + H2', type: 'acid-metal' },
  { pattern: ['Mg', 'H2SO4'], products: 'MgSO4 + H2', type: 'acid-metal' },
  { pattern: ['Al', 'HCl'], products: 'AlCl3 + H2', type: 'acid-metal' },
  { pattern: ['Al', 'H2SO4'], products: 'Al2(SO4)3 + H2', type: 'acid-metal' },
  { pattern: ['Na', 'HCl'], products: 'NaCl + H2', type: 'acid-metal' },
  { pattern: ['Ca', 'HCl'], products: 'CaCl2 + H2', type: 'acid-metal' },
  { pattern: ['Cu', 'HNO3'], products: 'Cu(NO3)2 + NO2 + H2O', type: 'acid-metal' },
  { pattern: ['Fe', 'HNO3'], products: 'Fe(NO3)3 + NO2 + H2O', type: 'acid-metal' },
  
  // Oxit bazơ + Axit → Muối + H2O
  { pattern: ['CaO', 'HCl'], products: 'CaCl2 + H2O', type: 'acid-base' },
  { pattern: ['CaO', 'H2SO4'], products: 'CaSO4 + H2O', type: 'acid-base' },
  { pattern: ['MgO', 'HCl'], products: 'MgCl2 + H2O', type: 'acid-base' },
  { pattern: ['FeO', 'HCl'], products: 'FeCl2 + H2O', type: 'acid-base' },
  { pattern: ['Fe2O3', 'HCl'], products: 'FeCl3 + H2O', type: 'acid-base' },
  { pattern: ['CuO', 'HCl'], products: 'CuCl2 + H2O', type: 'acid-base' },
  { pattern: ['CuO', 'H2SO4'], products: 'CuSO4 + H2O', type: 'acid-base' },
  { pattern: ['Na2O', 'HCl'], products: 'NaCl + H2O', type: 'acid-base' },
  { pattern: ['Na2O', 'H2SO4'], products: 'Na2SO4 + H2O', type: 'acid-base' },
  
  // Bazơ + Axit → Muối + H2O (trung hòa)
  { pattern: ['NaOH', 'HCl'], products: 'NaCl + H2O', type: 'neutralization' },
  { pattern: ['NaOH', 'H2SO4'], products: 'Na2SO4 + H2O', type: 'neutralization' },
  { pattern: ['NaOH', 'HNO3'], products: 'NaNO3 + H2O', type: 'neutralization' },
  { pattern: ['KOH', 'HCl'], products: 'KCl + H2O', type: 'neutralization' },
  { pattern: ['KOH', 'H2SO4'], products: 'K2SO4 + H2O', type: 'neutralization' },
  { pattern: ['Ca(OH)2', 'HCl'], products: 'CaCl2 + H2O', type: 'neutralization' },
  { pattern: ['Ca(OH)2', 'H2SO4'], products: 'CaSO4 + H2O', type: 'neutralization' },
  { pattern: ['Ca(OH)2', 'CO2'], products: 'CaCO3 + H2O', type: 'neutralization' },
  { pattern: ['Ba(OH)2', 'H2SO4'], products: 'BaSO4 + H2O', type: 'neutralization' },
  { pattern: ['Fe(OH)3', 'HCl'], products: 'FeCl3 + H2O', type: 'neutralization' },
  { pattern: ['Al(OH)3', 'HCl'], products: 'AlCl3 + H2O', type: 'neutralization' },
  
  // Đốt cháy hydrocacbon
  { pattern: ['CH4', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  { pattern: ['C2H6', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  { pattern: ['C3H8', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  { pattern: ['C2H4', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  { pattern: ['C2H2', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  { pattern: ['C6H6', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  { pattern: ['C2H5OH', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  { pattern: ['CH3OH', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  
  // Khử oxit bằng H2 hoặc CO
  { pattern: ['CuO', 'H2'], products: 'Cu + H2O', type: 'reduction' },
  { pattern: ['Fe2O3', 'H2'], products: 'Fe + H2O', type: 'reduction' },
  { pattern: ['Fe2O3', 'CO'], products: 'Fe + CO2', type: 'reduction' },
  { pattern: ['Fe3O4', 'CO'], products: 'Fe + CO2', type: 'reduction' },
  { pattern: ['Fe3O4', 'H2'], products: 'Fe + H2O', type: 'reduction' },
  { pattern: ['FeO', 'CO'], products: 'Fe + CO2', type: 'reduction' },
  { pattern: ['PbO', 'H2'], products: 'Pb + H2O', type: 'reduction' },
  { pattern: ['ZnO', 'C'], products: 'Zn + CO', type: 'reduction' },
  
  // Phản ứng nhiệt phân
  { pattern: ['CaCO3'], products: 'CaO + CO2', type: 'decomposition' },
  { pattern: ['KClO3'], products: 'KCl + O2', type: 'decomposition' },
  { pattern: ['KMnO4'], products: 'K2MnO4 + MnO2 + O2', type: 'decomposition' },
  { pattern: ['H2O2'], products: 'H2O + O2', type: 'decomposition' },
  { pattern: ['NaHCO3'], products: 'Na2CO3 + H2O + CO2', type: 'decomposition' },
  { pattern: ['Cu(OH)2'], products: 'CuO + H2O', type: 'decomposition' },
  { pattern: ['Fe(OH)3'], products: 'Fe2O3 + H2O', type: 'decomposition' },
  
  // Điều chế Clo, Halogen
  { pattern: ['KMnO4', 'HCl'], products: 'KCl + MnCl2 + Cl2 + H2O', type: 'halogen' },
  { pattern: ['MnO2', 'HCl'], products: 'MnCl2 + Cl2 + H2O', type: 'halogen' },
  
  // Kim loại + Nước
  { pattern: ['Na', 'H2O'], products: 'NaOH + H2', type: 'metal-water' },
  { pattern: ['K', 'H2O'], products: 'KOH + H2', type: 'metal-water' },
  { pattern: ['Ca', 'H2O'], products: 'Ca(OH)2 + H2', type: 'metal-water' },
  { pattern: ['Ba', 'H2O'], products: 'Ba(OH)2 + H2', type: 'metal-water' },
  
  // Oxit axit + Nước
  { pattern: ['SO2', 'H2O'], products: 'H2SO3', type: 'oxide-water' },
  { pattern: ['SO3', 'H2O'], products: 'H2SO4', type: 'oxide-water' },
  { pattern: ['CO2', 'H2O'], products: 'H2CO3', type: 'oxide-water' },
  { pattern: ['N2O5', 'H2O'], products: 'HNO3', type: 'oxide-water' },
  { pattern: ['P2O5', 'H2O'], products: 'H3PO4', type: 'oxide-water' },
  
  // Oxit bazơ + Nước
  { pattern: ['CaO', 'H2O'], products: 'Ca(OH)2', type: 'oxide-water' },
  { pattern: ['Na2O', 'H2O'], products: 'NaOH', type: 'oxide-water' },
  { pattern: ['K2O', 'H2O'], products: 'KOH', type: 'oxide-water' },
  { pattern: ['BaO', 'H2O'], products: 'Ba(OH)2', type: 'oxide-water' },
  
  // Oxi hóa amoniac
  { pattern: ['NH3', 'O2'], products: 'NO + H2O', type: 'oxidation' },
  
  // Muối + Bazơ
  { pattern: ['FeCl3', 'NaOH'], products: 'Fe(OH)3 + NaCl', type: 'precipitation' },
  { pattern: ['CuSO4', 'NaOH'], products: 'Cu(OH)2 + Na2SO4', type: 'precipitation' },
  { pattern: ['FeSO4', 'NaOH'], products: 'Fe(OH)2 + Na2SO4', type: 'precipitation' },
  { pattern: ['AlCl3', 'NaOH'], products: 'Al(OH)3 + NaCl', type: 'precipitation' },
  
  // Phản ứng trao đổi muối
  { pattern: ['BaCl2', 'H2SO4'], products: 'BaSO4 + HCl', type: 'exchange' },
  { pattern: ['AgNO3', 'NaCl'], products: 'AgCl + NaNO3', type: 'exchange' },
  { pattern: ['Na2CO3', 'HCl'], products: 'NaCl + H2O + CO2', type: 'exchange' },
  { pattern: ['Na2CO3', 'CaCl2'], products: 'CaCO3 + NaCl', type: 'exchange' },
  
  // Muối cacbonat + Axit → Muối + H2O + CO2
  { pattern: ['CaCO3', 'HCl'], products: 'CaCl2 + H2O + CO2', type: 'carbonate-acid' },
  { pattern: ['CaCO3', 'H2SO4'], products: 'CaSO4 + H2O + CO2', type: 'carbonate-acid' },
  { pattern: ['CaCO3', 'HNO3'], products: 'Ca(NO3)2 + H2O + CO2', type: 'carbonate-acid' },
  { pattern: ['K2CO3', 'HCl'], products: 'KCl + H2O + CO2', type: 'carbonate-acid' },
  { pattern: ['K2CO3', 'H2SO4'], products: 'K2SO4 + H2O + CO2', type: 'carbonate-acid' },
  { pattern: ['MgCO3', 'HCl'], products: 'MgCl2 + H2O + CO2', type: 'carbonate-acid' },
  { pattern: ['BaCO3', 'HCl'], products: 'BaCl2 + H2O + CO2', type: 'carbonate-acid' },
  { pattern: ['FeCO3', 'HCl'], products: 'FeCl2 + H2O + CO2', type: 'carbonate-acid' },
  { pattern: ['ZnCO3', 'HCl'], products: 'ZnCl2 + H2O + CO2', type: 'carbonate-acid' },
  { pattern: ['CuCO3', 'HCl'], products: 'CuCl2 + H2O + CO2', type: 'carbonate-acid' },
  
  // Muối sunfit + Axit → Muối + H2O + SO2  
  { pattern: ['Na2SO3', 'HCl'], products: 'NaCl + H2O + SO2', type: 'sulfite-acid' },
  { pattern: ['Na2SO3', 'H2SO4'], products: 'Na2SO4 + H2O + SO2', type: 'sulfite-acid' },
  
  // Muối sunfua + Axit → Muối + H2S
  { pattern: ['FeS', 'HCl'], products: 'FeCl2 + H2S', type: 'sulfide-acid' },
  { pattern: ['ZnS', 'HCl'], products: 'ZnCl2 + H2S', type: 'sulfide-acid' },
  { pattern: ['Na2S', 'HCl'], products: 'NaCl + H2S', type: 'sulfide-acid' },
  
  // Magie với nitơ
  { pattern: ['Mg', 'N2'], products: 'Mg3N2', type: 'synthesis' },
  
  // ==================== PHẢN ỨNG KIM LOẠI ĐẨY KIM LOẠI (dãy điện hóa) ====================
  // Fe đẩy kim loại yếu hơn
  { pattern: ['Fe', 'CuSO4'], products: 'FeSO4 + Cu', type: 'displacement' },
  { pattern: ['Fe', 'CuCl2'], products: 'FeCl2 + Cu', type: 'displacement' },
  { pattern: ['Fe', 'Cu(NO3)2'], products: 'Fe(NO3)2 + Cu', type: 'displacement' },
  { pattern: ['Fe', 'AgNO3'], products: 'Fe(NO3)2 + Ag', type: 'displacement' },
  { pattern: ['Fe', 'Pb(NO3)2'], products: 'Fe(NO3)2 + Pb', type: 'displacement' },
  
  // Zn đẩy kim loại yếu hơn
  { pattern: ['Zn', 'CuSO4'], products: 'ZnSO4 + Cu', type: 'displacement' },
  { pattern: ['Zn', 'CuCl2'], products: 'ZnCl2 + Cu', type: 'displacement' },
  { pattern: ['Zn', 'FeSO4'], products: 'ZnSO4 + Fe', type: 'displacement' },
  { pattern: ['Zn', 'FeCl2'], products: 'ZnCl2 + Fe', type: 'displacement' },
  { pattern: ['Zn', 'AgNO3'], products: 'Zn(NO3)2 + Ag', type: 'displacement' },
  { pattern: ['Zn', 'Pb(NO3)2'], products: 'Zn(NO3)2 + Pb', type: 'displacement' },
  
  // Mg đẩy kim loại yếu hơn
  { pattern: ['Mg', 'CuSO4'], products: 'MgSO4 + Cu', type: 'displacement' },
  { pattern: ['Mg', 'CuCl2'], products: 'MgCl2 + Cu', type: 'displacement' },
  { pattern: ['Mg', 'FeSO4'], products: 'MgSO4 + Fe', type: 'displacement' },
  { pattern: ['Mg', 'FeCl2'], products: 'MgCl2 + Fe', type: 'displacement' },
  { pattern: ['Mg', 'ZnSO4'], products: 'MgSO4 + Zn', type: 'displacement' },
  { pattern: ['Mg', 'AgNO3'], products: 'Mg(NO3)2 + Ag', type: 'displacement' },
  
  // Al đẩy kim loại yếu hơn
  { pattern: ['Al', 'CuSO4'], products: 'Al2(SO4)3 + Cu', type: 'displacement' },
  { pattern: ['Al', 'CuCl2'], products: 'AlCl3 + Cu', type: 'displacement' },
  { pattern: ['Al', 'FeSO4'], products: 'Al2(SO4)3 + Fe', type: 'displacement' },
  { pattern: ['Al', 'FeCl3'], products: 'AlCl3 + Fe', type: 'displacement' },
  { pattern: ['Al', 'AgNO3'], products: 'Al(NO3)3 + Ag', type: 'displacement' },
  { pattern: ['Al', 'Fe2O3'], products: 'Al2O3 + Fe', type: 'thermite' },
  { pattern: ['Al', 'Fe3O4'], products: 'Al2O3 + Fe', type: 'thermite' },
  { pattern: ['Al', 'Cr2O3'], products: 'Al2O3 + Cr', type: 'thermite' },
  
  // Cu đẩy kim loại yếu hơn
  { pattern: ['Cu', 'AgNO3'], products: 'Cu(NO3)2 + Ag', type: 'displacement' },
  { pattern: ['Cu', 'Hg(NO3)2'], products: 'Cu(NO3)2 + Hg', type: 'displacement' },
  
  // Na, K đẩy kim loại (trong dung dịch - tác dụng nước trước)
  { pattern: ['Na', 'CuSO4'], products: 'Na2SO4 + Cu(OH)2 + H2', type: 'displacement' },
  
  // ==================== PHẢN ỨNG BAZƠ VỚI OXIT AXIT ====================
  { pattern: ['NaOH', 'CO2'], products: 'Na2CO3 + H2O', type: 'base-oxide' },
  { pattern: ['NaOH', 'SO2'], products: 'Na2SO3 + H2O', type: 'base-oxide' },
  { pattern: ['NaOH', 'SO3'], products: 'Na2SO4 + H2O', type: 'base-oxide' },
  { pattern: ['KOH', 'CO2'], products: 'K2CO3 + H2O', type: 'base-oxide' },
  { pattern: ['KOH', 'SO2'], products: 'K2SO3 + H2O', type: 'base-oxide' },
  { pattern: ['Ba(OH)2', 'CO2'], products: 'BaCO3 + H2O', type: 'base-oxide' },
  { pattern: ['Ba(OH)2', 'SO2'], products: 'BaSO3 + H2O', type: 'base-oxide' },
  
  // ==================== PHẢN ỨNG OXIT BAZƠ VỚI OXIT AXIT ====================
  { pattern: ['CaO', 'CO2'], products: 'CaCO3', type: 'oxide-oxide' },
  { pattern: ['CaO', 'SO2'], products: 'CaSO3', type: 'oxide-oxide' },
  { pattern: ['Na2O', 'CO2'], products: 'Na2CO3', type: 'oxide-oxide' },
  { pattern: ['Na2O', 'SO2'], products: 'Na2SO3', type: 'oxide-oxide' },
  { pattern: ['BaO', 'CO2'], products: 'BaCO3', type: 'oxide-oxide' },
  
  // ==================== ĐIỆN PHÂN ====================
  { pattern: ['NaCl'], products: 'Na + Cl2', type: 'electrolysis' },
  { pattern: ['H2O'], products: 'H2 + O2', type: 'electrolysis' },
  { pattern: ['Al2O3'], products: 'Al + O2', type: 'electrolysis' },
  { pattern: ['CuCl2'], products: 'Cu + Cl2', type: 'electrolysis' },
  { pattern: ['CuSO4', 'H2O'], products: 'Cu + H2SO4 + O2', type: 'electrolysis' },
  
  // ==================== PHẢN ỨNG HỮU CƠ BỔ SUNG ====================
  // Đốt cháy ankan
  { pattern: ['C4H10', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  { pattern: ['C5H12', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  { pattern: ['C6H14', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  { pattern: ['C7H16', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  { pattern: ['C8H18', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  
  // Đốt cháy anken
  { pattern: ['C3H6', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  { pattern: ['C4H8', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  
  // Đốt cháy ankin
  { pattern: ['C3H4', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  { pattern: ['C4H6', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  
  // Đốt cháy ancol
  { pattern: ['C3H7OH', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  { pattern: ['C4H9OH', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  
  // Đốt cháy axit hữu cơ
  { pattern: ['CH3COOH', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  { pattern: ['HCOOH', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  
  // Đốt cháy glucozơ, đường
  { pattern: ['C6H12O6', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  { pattern: ['C12H22O11', 'O2'], products: 'CO2 + H2O', type: 'combustion' },
  
  // Phản ứng este hóa
  { pattern: ['CH3COOH', 'C2H5OH'], products: 'CH3COOC2H5 + H2O', type: 'esterification' },
  { pattern: ['CH3COOH', 'CH3OH'], products: 'CH3COOCH3 + H2O', type: 'esterification' },
  { pattern: ['HCOOH', 'CH3OH'], products: 'HCOOCH3 + H2O', type: 'esterification' },
  { pattern: ['HCOOH', 'C2H5OH'], products: 'HCOOC2H5 + H2O', type: 'esterification' },
  
  // Thủy phân este
  { pattern: ['CH3COOC2H5', 'NaOH'], products: 'CH3COONa + C2H5OH', type: 'saponification' },
  { pattern: ['CH3COOC2H5', 'H2O'], products: 'CH3COOH + C2H5OH', type: 'hydrolysis' },
  
  // Phản ứng cộng (anken + X2, HX, H2O)
  { pattern: ['C2H4', 'Br2'], products: 'C2H4Br2', type: 'addition' },
  { pattern: ['C2H4', 'Cl2'], products: 'C2H4Cl2', type: 'addition' },
  { pattern: ['C2H4', 'HCl'], products: 'C2H5Cl', type: 'addition' },
  { pattern: ['C2H4', 'HBr'], products: 'C2H5Br', type: 'addition' },
  { pattern: ['C2H4', 'H2O'], products: 'C2H5OH', type: 'addition' },
  { pattern: ['C2H4', 'H2'], products: 'C2H6', type: 'addition' },
  
  // Phản ứng cộng ankin
  { pattern: ['C2H2', 'Br2'], products: 'C2H2Br4', type: 'addition' },
  { pattern: ['C2H2', 'HCl'], products: 'CH2CHCl', type: 'addition' },
  { pattern: ['C2H2', 'H2O'], products: 'CH3CHO', type: 'addition' },
  { pattern: ['C2H2', 'H2'], products: 'C2H4', type: 'addition' },
  
  // Phản ứng thế benzen
  { pattern: ['C6H6', 'Br2'], products: 'C6H5Br + HBr', type: 'substitution' },
  { pattern: ['C6H6', 'Cl2'], products: 'C6H5Cl + HCl', type: 'substitution' },
  { pattern: ['C6H6', 'HNO3'], products: 'C6H5NO2 + H2O', type: 'substitution' },
  
  // Phản ứng ancol
  { pattern: ['C2H5OH', 'Na'], products: 'C2H5ONa + H2', type: 'alcohol' },
  { pattern: ['CH3OH', 'Na'], products: 'CH3ONa + H2', type: 'alcohol' },
  
  // Oxi hóa ancol
  { pattern: ['C2H5OH', 'CuO'], products: 'CH3CHO + Cu + H2O', type: 'oxidation' },
  { pattern: ['CH3OH', 'CuO'], products: 'HCHO + Cu + H2O', type: 'oxidation' },
  
  // Tráng bạc (phản ứng andehit)
  { pattern: ['CH3CHO', 'AgNO3', 'NH3'], products: 'CH3COONH4 + Ag + NH4NO3', type: 'silver-mirror' },
  { pattern: ['HCHO', 'AgNO3', 'NH3'], products: 'HCOONH4 + Ag + NH4NO3', type: 'silver-mirror' },
  { pattern: ['C6H12O6', 'AgNO3', 'NH3'], products: 'C6H12O7NH4 + Ag', type: 'silver-mirror' },
  
  // ==================== NHIỆT PHÂN BỔ SUNG ====================
  { pattern: ['Mg(OH)2'], products: 'MgO + H2O', type: 'decomposition' },
  { pattern: ['Al(OH)3'], products: 'Al2O3 + H2O', type: 'decomposition' },
  { pattern: ['Fe(OH)2'], products: 'FeO + H2O', type: 'decomposition' },
  { pattern: ['Zn(OH)2'], products: 'ZnO + H2O', type: 'decomposition' },
  { pattern: ['AgNO3'], products: 'Ag + NO2 + O2', type: 'decomposition' },
  { pattern: ['Cu(NO3)2'], products: 'CuO + NO2 + O2', type: 'decomposition' },
  { pattern: ['Fe(NO3)2'], products: 'FeO + NO2 + O2', type: 'decomposition' },
  { pattern: ['Pb(NO3)2'], products: 'PbO + NO2 + O2', type: 'decomposition' },
  { pattern: ['NaNO3'], products: 'NaNO2 + O2', type: 'decomposition' },
  { pattern: ['KNO3'], products: 'KNO2 + O2', type: 'decomposition' },
  { pattern: ['NH4Cl'], products: 'NH3 + HCl', type: 'decomposition' },
  { pattern: ['NH4NO3'], products: 'N2O + H2O', type: 'decomposition' },
  { pattern: ['(NH4)2CO3'], products: 'NH3 + H2O + CO2', type: 'decomposition' },
  { pattern: ['NH4HCO3'], products: 'NH3 + H2O + CO2', type: 'decomposition' },
  
  // Muối amoni + Axit (thêm trực tiếp vào database)
  { pattern: ['(NH4)2CO3', 'HCl'], products: 'NH4Cl + H2O + CO2', type: 'salt-acid' },
  { pattern: ['(NH4)2CO3', 'H2SO4'], products: '(NH4)2SO4 + H2O + CO2', type: 'salt-acid' },
  { pattern: ['(NH4)2CO3', 'HNO3'], products: 'NH4NO3 + H2O + CO2', type: 'salt-acid' },
  { pattern: ['NH4HCO3', 'HCl'], products: 'NH4Cl + H2O + CO2', type: 'salt-acid' },
  { pattern: ['NH4HCO3', 'H2SO4'], products: '(NH4)2SO4 + H2O + CO2', type: 'salt-acid' },
  { pattern: ['(NH4)2SO3', 'HCl'], products: 'NH4Cl + H2O + SO2', type: 'salt-acid' },
  { pattern: ['(NH4)2S', 'HCl'], products: 'NH4Cl + H2S', type: 'salt-acid' },
  
  { pattern: ['Ca(HCO3)2'], products: 'CaCO3 + H2O + CO2', type: 'decomposition' },
  { pattern: ['Mg(HCO3)2'], products: 'MgCO3 + H2O + CO2', type: 'decomposition' },
  { pattern: ['MgCO3'], products: 'MgO + CO2', type: 'decomposition' },
  { pattern: ['BaCO3'], products: 'BaO + CO2', type: 'decomposition' },
  { pattern: ['FeCO3'], products: 'FeO + CO2', type: 'decomposition' },
  { pattern: ['ZnCO3'], products: 'ZnO + CO2', type: 'decomposition' },
  
  // ==================== PHẢN ỨNG VỚI HALOGEN ====================
  { pattern: ['Fe', 'Cl2'], products: 'FeCl3', type: 'halogen' },
  { pattern: ['Fe', 'Br2'], products: 'FeBr3', type: 'halogen' },
  { pattern: ['Cu', 'Cl2'], products: 'CuCl2', type: 'halogen' },
  { pattern: ['Zn', 'Cl2'], products: 'ZnCl2', type: 'halogen' },
  { pattern: ['Al', 'Cl2'], products: 'AlCl3', type: 'halogen' },
  { pattern: ['Na', 'Cl2'], products: 'NaCl', type: 'halogen' },
  { pattern: ['K', 'Cl2'], products: 'KCl', type: 'halogen' },
  { pattern: ['Mg', 'Cl2'], products: 'MgCl2', type: 'halogen' },
  { pattern: ['Ca', 'Cl2'], products: 'CaCl2', type: 'halogen' },
  { pattern: ['H2', 'Br2'], products: 'HBr', type: 'halogen' },
  { pattern: ['H2', 'I2'], products: 'HI', type: 'halogen' },
  { pattern: ['H2', 'F2'], products: 'HF', type: 'halogen' },
  
  // Halogen đẩy halogen
  { pattern: ['Cl2', 'NaBr'], products: 'NaCl + Br2', type: 'halogen-displacement' },
  { pattern: ['Cl2', 'KBr'], products: 'KCl + Br2', type: 'halogen-displacement' },
  { pattern: ['Cl2', 'NaI'], products: 'NaCl + I2', type: 'halogen-displacement' },
  { pattern: ['Br2', 'NaI'], products: 'NaBr + I2', type: 'halogen-displacement' },
  
  // ==================== PHẢN ỨNG VỚI AXIT MẠNH (HNO3, H2SO4 đặc) ====================
  { pattern: ['Cu', 'H2SO4'], products: 'CuSO4 + SO2 + H2O', type: 'acid-strong' },
  { pattern: ['Ag', 'HNO3'], products: 'AgNO3 + NO2 + H2O', type: 'acid-strong' },
  { pattern: ['Zn', 'HNO3'], products: 'Zn(NO3)2 + NO2 + H2O', type: 'acid-strong' },
  { pattern: ['Mg', 'HNO3'], products: 'Mg(NO3)2 + NO2 + H2O', type: 'acid-strong' },
  { pattern: ['Al', 'HNO3'], products: 'Al(NO3)3 + NO2 + H2O', type: 'acid-strong' },
  { pattern: ['S', 'HNO3'], products: 'H2SO4 + NO2 + H2O', type: 'acid-strong' },
  { pattern: ['C', 'HNO3'], products: 'CO2 + NO2 + H2O', type: 'acid-strong' },
  { pattern: ['P', 'HNO3'], products: 'H3PO4 + NO2 + H2O', type: 'acid-strong' },
  { pattern: ['FeO', 'HNO3'], products: 'Fe(NO3)3 + NO + H2O', type: 'acid-strong' },
  { pattern: ['Fe3O4', 'HNO3'], products: 'Fe(NO3)3 + NO + H2O', type: 'acid-strong' },
  
  // ==================== PHẢN ỨNG NITO, PHOTPHO ====================
  { pattern: ['N2', 'O2'], products: 'NO', type: 'synthesis' },
  { pattern: ['NO', 'O2'], products: 'NO2', type: 'oxidation' },
  { pattern: ['NO2', 'O2', 'H2O'], products: 'HNO3', type: 'synthesis' },
  { pattern: ['NH3', 'HCl'], products: 'NH4Cl', type: 'synthesis' },
  { pattern: ['NH3', 'H2SO4'], products: '(NH4)2SO4', type: 'synthesis' },
  { pattern: ['NH3', 'HNO3'], products: 'NH4NO3', type: 'synthesis' },
  { pattern: ['NH3', 'H3PO4'], products: '(NH4)3PO4', type: 'synthesis' },
  { pattern: ['P2O5', 'H2O'], products: 'H3PO4', type: 'synthesis' },
  { pattern: ['Ca3(PO4)2', 'H2SO4'], products: 'CaSO4 + H3PO4', type: 'exchange' },
  
  // ==================== PHẢN ỨNG SILIC ====================
  { pattern: ['Si', 'O2'], products: 'SiO2', type: 'oxidation' },
  { pattern: ['SiO2', 'NaOH'], products: 'Na2SiO3 + H2O', type: 'acid-base' },
  { pattern: ['SiO2', 'Na2CO3'], products: 'Na2SiO3 + CO2', type: 'exchange' },
  { pattern: ['SiO2', 'CaO'], products: 'CaSiO3', type: 'oxide-oxide' },
  { pattern: ['SiO2', 'C'], products: 'Si + CO', type: 'reduction' },
  { pattern: ['SiO2', 'HF'], products: 'SiF4 + H2O', type: 'acid' },
];

// ==================== HỆ THỐNG DỰ ĐOÁN THÔNG MINH ====================

// Danh sách kim loại theo thứ tự hoạt động (mạnh -> yếu)
const METAL_ACTIVITY_SERIES = ['K', 'Ba', 'Ca', 'Na', 'Mg', 'Al', 'Zn', 'Fe', 'Ni', 'Sn', 'Pb', 'H', 'Cu', 'Hg', 'Ag', 'Pt', 'Au'];

// Bảng hóa trị phổ biến
const VALENCES = {
  'Na': 1, 'K': 1, 'Ag': 1, 'H': 1, 'Li': 1,
  'Ca': 2, 'Mg': 2, 'Ba': 2, 'Zn': 2, 'Cu': 2, 'Fe': 2, 'Pb': 2, 'Hg': 2, 'Sn': 2, 'Ni': 2,
  'Fe3': 3, 'Al': 3, 'Cr': 3,
  'NH4': 1, // Nhóm amoni
};

// Gốc axit phổ biến
const ACID_RADICALS = {
  'HCl': { radical: 'Cl', valence: 1, name: 'clorua' },
  'HBr': { radical: 'Br', valence: 1, name: 'bromua' },
  'HI': { radical: 'I', valence: 1, name: 'iotua' },
  'HNO3': { radical: 'NO3', valence: 1, name: 'nitrat' },
  'H2SO4': { radical: 'SO4', valence: 2, name: 'sunfat' },
  'H2CO3': { radical: 'CO3', valence: 2, name: 'cacbonat' },
  'H2SO3': { radical: 'SO3', valence: 2, name: 'sunfit' },
  'H2S': { radical: 'S', valence: 2, name: 'sunfua' },
  'H3PO4': { radical: 'PO4', valence: 3, name: 'photphat' },
  'CH3COOH': { radical: 'CH3COO', valence: 1, name: 'axetat' },
};

// Nhận dạng loại chất
const identifyCompoundType = (formula) => {
  // Axit
  if (/^H\d*[A-Z]/.test(formula) && !formula.startsWith('H2O')) {
    if (['HCl', 'HBr', 'HI', 'HF'].includes(formula)) return { type: 'acid', subtype: 'strong-acid', formula };
    if (['HNO3', 'H2SO4'].includes(formula)) return { type: 'acid', subtype: 'strong-acid', formula };
    if (['H2CO3', 'H2SO3', 'H2S', 'HNO2', 'H3PO4'].includes(formula)) return { type: 'acid', subtype: 'weak-acid', formula };
    if (/^H\d*[A-Z]/.test(formula)) return { type: 'acid', subtype: 'acid', formula };
  }
  
  // Bazơ (hydroxide)
  if (/\(OH\)\d*$|OH$/.test(formula)) {
    const metal = formula.replace(/\(OH\)\d*$|OH$/, '');
    return { type: 'base', metal, formula };
  }
  
  // Oxit
  if (/O\d*$/.test(formula) && !formula.includes('OH') && !formula.includes('NO3') && !formula.includes('SO4') && !formula.includes('CO3') && !formula.includes('PO4')) {
    const base = formula.replace(/O\d*$/, '');
    // Oxit axit: CO2, SO2, SO3, N2O5, P2O5...
    if (['C', 'S', 'N', 'P', 'Si', 'N2', 'P2', 'SO2', 'SO3', 'CO2', 'NO2', 'N2O5', 'P2O5', 'SiO2', 'Cl2O7'].some(x => formula.includes(x) || formula === x + 'O' || formula === x + 'O2' || formula === x + 'O3')) {
      return { type: 'oxide', subtype: 'acidic-oxide', formula };
    }
    // Oxit bazơ: Na2O, CaO, MgO, FeO, Fe2O3...
    if (['Na', 'K', 'Ca', 'Mg', 'Ba', 'Fe', 'Cu', 'Zn', 'Al', 'Pb', 'Ag'].some(m => formula.startsWith(m))) {
      return { type: 'oxide', subtype: 'basic-oxide', formula };
    }
    return { type: 'oxide', subtype: 'oxide', formula };
  }
  
  // Muối amoni - XỬ LÝ ĐẶC BIỆT
  if (formula.includes('NH4')) {
    // Tìm gốc axit
    let anion = '';
    let subtype = 'ammonium-salt';
    
    // Loại bỏ phần NH4 để lấy gốc axit
    const withoutNH4 = formula.replace(/\(NH4\)\d*/, '').replace('NH4', '');
    
    if (formula.includes('CO3')) {
      anion = 'CO3';
      subtype = 'ammonium-carbonate'; // Muối amoni cacbonat
    } else if (formula.includes('SO4')) {
      anion = 'SO4';
    } else if (formula.includes('NO3')) {
      anion = 'NO3';
    } else if (formula.includes('SO3')) {
      anion = 'SO3';
      subtype = 'ammonium-sulfite';
    } else if (formula.includes('Cl')) {
      anion = 'Cl';
    } else if (formula.includes('HCO3')) {
      anion = 'HCO3';
      subtype = 'ammonium-bicarbonate';
    } else if (formula.includes('PO4')) {
      anion = 'PO4';
    } else {
      anion = withoutNH4;
    }
    
    return { type: 'salt', subtype, cation: 'NH4', anion, formula };
  }
  
  // Muối cacbonat
  if (formula.includes('CO3') && !formula.startsWith('H')) {
    const metal = formula.replace(/\(CO3\)\d*/, '').replace('CO3', '').replace(/\d+$/, '');
    return { type: 'salt', subtype: 'carbonate', cation: metal, anion: 'CO3', formula };
  }
  
  // Muối sunfit
  if (formula.includes('SO3') && !formula.startsWith('H') && !formula.includes('O3)')) {
    const metal = formula.replace('SO3', '').replace(/\d+$/, '');
    return { type: 'salt', subtype: 'sulfite', cation: metal, anion: 'SO3', formula };
  }
  
  // Muối sunfua
  if (/[A-Z][a-z]?S$|[A-Z][a-z]?\d*S$/.test(formula) && !formula.includes('SO') && !formula.includes('O')) {
    const metal = formula.replace(/S\d*$/, '').replace('S', '');
    return { type: 'salt', subtype: 'sulfide', cation: metal, anion: 'S', formula };
  }
  
  // Muối thông thường
  if (/[A-Z][a-z]?\d*[A-Z]/.test(formula)) {
    // Muối clorua, bromua, nitrat, sunfat...
    for (const [acid, info] of Object.entries(ACID_RADICALS)) {
      if (formula.includes(info.radical)) {
        const cation = formula.replace(new RegExp(`\\(?${info.radical}\\)?\\d*`, 'g'), '').replace(/\d+$/, '');
        return { type: 'salt', subtype: info.name, cation, anion: info.radical, formula };
      }
    }
  }
  
  // Kim loại đơn chất
  if (METAL_ACTIVITY_SERIES.includes(formula) || ['Li', 'Cr', 'Mn', 'Co', 'Ni'].includes(formula)) {
    return { type: 'metal', formula };
  }
  
  // Phi kim đơn chất
  if (['O2', 'H2', 'N2', 'Cl2', 'Br2', 'I2', 'F2', 'S', 'C', 'P', 'Si'].includes(formula)) {
    return { type: 'nonmetal', formula };
  }
  
  // Nước
  if (formula === 'H2O') {
    return { type: 'water', formula };
  }
  
  // Hợp chất hữu cơ
  if (/^C\d*H\d*/.test(formula)) {
    return { type: 'organic', formula };
  }
  
  return { type: 'unknown', formula };
};

// Tạo công thức muối từ kim loại/cation và gốc axit
const createSaltFormula = (cation, anionInfo, cationValence = null) => {
  const cationVal = cationValence || VALENCES[cation] || 2;
  const anionVal = anionInfo.valence;
  
  // Tìm BSCNN
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const lcm = (cationVal * anionVal) / gcd(cationVal, anionVal);
  
  const cationCount = lcm / cationVal;
  const anionCount = lcm / anionVal;
  
  let formula = '';
  
  // Cation
  if (cation === 'NH4') {
    formula += cationCount > 1 ? `(NH4)${cationCount}` : 'NH4';
  } else {
    formula += cationCount > 1 ? `${cation}${cationCount}` : cation;
  }
  
  // Anion
  const anion = anionInfo.radical;
  if (anion.length > 2 && anionCount > 1) {
    formula += `(${anion})${anionCount}`;
  } else {
    formula += anionCount > 1 ? `${anion}${anionCount}` : anion;
  }
  
  return formula;
};

// Hàm dự đoán sản phẩm thông minh
const predictProductsAdvanced = (reactants) => {
  if (reactants.length === 0) return null;
  
  const compounds = reactants.map(r => ({
    formula: r,
    ...identifyCompoundType(r)
  }));
  
  // ==================== PHẢN ỨNG 1 CHẤT (NHIỆT PHÂN) ====================
  if (reactants.length === 1) {
    const comp = compounds[0];
    
    // Nhiệt phân bazơ không tan
    if (comp.type === 'base' && !['Na', 'K', 'Ba', 'Ca'].includes(comp.metal)) {
      const valence = VALENCES[comp.metal] || 2;
      if (valence === 2) {
        return { products: `${comp.metal}O + H2O`, type: 'decomposition' };
      } else if (valence === 3) {
        return { products: `${comp.metal}2O3 + H2O`, type: 'decomposition' };
      }
    }
    
    // Nhiệt phân muối cacbonat
    if (comp.subtype === 'carbonate' && comp.cation !== 'Na' && comp.cation !== 'K') {
      const valence = VALENCES[comp.cation] || 2;
      if (valence === 2) {
        return { products: `${comp.cation}O + CO2`, type: 'decomposition' };
      }
    }
    
    // Nhiệt phân muối amoni
    if (comp.subtype === 'ammonium-salt') {
      if (comp.anion === 'Cl') return { products: 'NH3 + HCl', type: 'decomposition' };
      if (comp.anion === 'NO3') return { products: 'N2O + H2O', type: 'decomposition' };
      if (comp.anion === 'CO3' || comp.formula.includes('CO3')) return { products: 'NH3 + H2O + CO2', type: 'decomposition' };
      if (comp.anion === 'HCO3' || comp.formula.includes('HCO3')) return { products: 'NH3 + H2O + CO2', type: 'decomposition' };
    }
    
    // Nhiệt phân muối nitrat
    if (comp.subtype === 'nitrat') {
      if (['Na', 'K'].includes(comp.cation)) {
        return { products: `${comp.cation}NO2 + O2`, type: 'decomposition' };
      } else if (['Cu', 'Pb', 'Fe', 'Zn', 'Ag'].includes(comp.cation)) {
        const valence = VALENCES[comp.cation] || 2;
        const oxide = valence === 2 ? `${comp.cation}O` : `${comp.cation}2O3`;
        return { products: `${oxide} + NO2 + O2`, type: 'decomposition' };
      }
    }
  }
  
  // ==================== PHẢN ỨNG 2 CHẤT ====================
  if (reactants.length === 2) {
    const [comp1, comp2] = compounds;
    
    // Sắp xếp để dễ xử lý
    let acid = compounds.find(c => c.type === 'acid');
    let base = compounds.find(c => c.type === 'base');
    let metal = compounds.find(c => c.type === 'metal');
    let oxide = compounds.find(c => c.type === 'oxide');
    let salt = compounds.find(c => c.type === 'salt');
    let water = compounds.find(c => c.type === 'water');
    let nonmetal = compounds.find(c => c.type === 'nonmetal');
    
    // 1. KIM LOẠI + AXIT → Muối + H2
    if (metal && acid) {
      const metalPos = METAL_ACTIVITY_SERIES.indexOf(metal.formula);
      const hPos = METAL_ACTIVITY_SERIES.indexOf('H');
      
      if (metalPos < hPos && metalPos !== -1) {
        const acidInfo = ACID_RADICALS[acid.formula];
        if (acidInfo) {
          const saltFormula = createSaltFormula(metal.formula, acidInfo);
          // HNO3 và H2SO4 đặc → không tạo H2
          if (acid.formula === 'HNO3') {
            return { products: `${saltFormula} + NO2 + H2O`, type: 'acid-metal' };
          }
          return { products: `${saltFormula} + H2`, type: 'acid-metal' };
        }
      }
    }
    
    // 2. BAZƠ + AXIT → Muối + H2O (trung hòa)
    if (base && acid) {
      const acidInfo = ACID_RADICALS[acid.formula];
      if (acidInfo) {
        const saltFormula = createSaltFormula(base.metal, acidInfo);
        return { products: `${saltFormula} + H2O`, type: 'neutralization' };
      }
    }
    
    // 3. OXIT BAZƠ + AXIT → Muối + H2O
    if (oxide && oxide.subtype === 'basic-oxide' && acid) {
      const metal = oxide.formula.replace(/\d*O\d*$/, '').replace(/\d+$/, '');
      const acidInfo = ACID_RADICALS[acid.formula];
      if (acidInfo) {
        const saltFormula = createSaltFormula(metal, acidInfo);
        return { products: `${saltFormula} + H2O`, type: 'oxide-acid' };
      }
    }
    
    // 4. MUỐI CACBONAT + AXIT → Muối mới + H2O + CO2
    if (salt && (salt.subtype === 'carbonate' || salt.anion === 'CO3') && acid) {
      const acidInfo = ACID_RADICALS[acid.formula];
      if (acidInfo) {
        // Nếu là muối amoni cacbonat
        if (salt.cation === 'NH4' || salt.formula.includes('NH4')) {
          const newSalt = createSaltFormula('NH4', acidInfo);
          return { products: `${newSalt} + H2O + CO2`, type: 'carbonate-acid' };
        }
        const saltFormula = createSaltFormula(salt.cation, acidInfo);
        return { products: `${saltFormula} + H2O + CO2`, type: 'carbonate-acid' };
      }
    }
    
    // 5. MUỐI AMONI + AXIT → Muối amoni mới + sản phẩm
    if (salt && (salt.subtype === 'ammonium-salt' || salt.subtype === 'ammonium-carbonate' || salt.subtype === 'ammonium-sulfite' || salt.subtype === 'ammonium-bicarbonate' || salt.cation === 'NH4') && acid) {
      const acidInfo = ACID_RADICALS[acid.formula];
      if (acidInfo) {
        const newSalt = createSaltFormula('NH4', acidInfo);
        // Nếu là muối cacbonat amoni
        if (salt.anion === 'CO3' || salt.formula.includes('CO3') || salt.subtype === 'ammonium-carbonate') {
          return { products: `${newSalt} + H2O + CO2`, type: 'salt-acid' };
        }
        // Nếu là muối bicacbonat amoni
        if (salt.anion === 'HCO3' || salt.formula.includes('HCO3') || salt.subtype === 'ammonium-bicarbonate') {
          return { products: `${newSalt} + H2O + CO2`, type: 'salt-acid' };
        }
        // Nếu là muối sunfit amoni
        if (salt.anion === 'SO3' || salt.subtype === 'ammonium-sulfite') {
          return { products: `${newSalt} + H2O + SO2`, type: 'salt-acid' };
        }
        return { products: `${newSalt}`, type: 'salt-acid' };
      }
    }
    
    // 6. MUỐI SUNFIT + AXIT → Muối mới + H2O + SO2
    if (salt && salt.subtype === 'sulfite' && acid) {
      const acidInfo = ACID_RADICALS[acid.formula];
      if (acidInfo) {
        const saltFormula = createSaltFormula(salt.cation, acidInfo);
        return { products: `${saltFormula} + H2O + SO2`, type: 'sulfite-acid' };
      }
    }
    
    // 7. MUỐI SUNFUA + AXIT → Muối mới + H2S
    if (salt && salt.subtype === 'sulfide' && acid) {
      const acidInfo = ACID_RADICALS[acid.formula];
      if (acidInfo) {
        const saltFormula = createSaltFormula(salt.cation, acidInfo);
        return { products: `${saltFormula} + H2S`, type: 'sulfide-acid' };
      }
    }
    
    // 8. KIM LOẠI + MUỐI → Kim loại mới + Muối mới (dãy điện hóa)
    if (metal && salt) {
      const metalPos = METAL_ACTIVITY_SERIES.indexOf(metal.formula);
      const saltMetalPos = METAL_ACTIVITY_SERIES.indexOf(salt.cation);
      
      if (metalPos !== -1 && saltMetalPos !== -1 && metalPos < saltMetalPos) {
        // Kim loại mạnh hơn đẩy kim loại yếu hơn
        const newSalt = salt.formula.replace(salt.cation, metal.formula);
        // Cần tính lại công thức muối
        for (const [acidFormula, acidInfo] of Object.entries(ACID_RADICALS)) {
          if (salt.formula.includes(acidInfo.radical)) {
            const newSaltFormula = createSaltFormula(metal.formula, acidInfo);
            return { products: `${newSaltFormula} + ${salt.cation}`, type: 'displacement' };
          }
        }
      }
    }
    
    // 9. OXIT BAZƠ + NƯỚC → Bazơ (chỉ với kim loại kiềm, kiềm thổ)
    if (oxide && oxide.subtype === 'basic-oxide' && water) {
      const metal = oxide.formula.replace(/\d*O\d*$/, '').replace(/\d+$/, '');
      if (['Na', 'K', 'Ca', 'Ba'].includes(metal) || oxide.formula === 'Na2O' || oxide.formula === 'K2O') {
        const valence = VALENCES[metal] || 2;
        if (valence === 1) {
          return { products: `${metal}OH`, type: 'oxide-water' };
        } else {
          return { products: `${metal}(OH)2`, type: 'oxide-water' };
        }
      }
    }
    
    // 10. OXIT AXIT + NƯỚC → Axit
    if (oxide && oxide.subtype === 'acidic-oxide' && water) {
      if (oxide.formula === 'CO2') return { products: 'H2CO3', type: 'oxide-water' };
      if (oxide.formula === 'SO2') return { products: 'H2SO3', type: 'oxide-water' };
      if (oxide.formula === 'SO3') return { products: 'H2SO4', type: 'oxide-water' };
      if (oxide.formula === 'N2O5') return { products: 'HNO3', type: 'oxide-water' };
      if (oxide.formula === 'P2O5') return { products: 'H3PO4', type: 'oxide-water' };
    }
    
    // 11. BAZƠ + OXIT AXIT → Muối + H2O
    if (base && oxide && oxide.subtype === 'acidic-oxide') {
      if (oxide.formula === 'CO2') {
        const valence = VALENCES[base.metal] || 1;
        if (valence === 1) {
          return { products: `${base.metal}2CO3 + H2O`, type: 'base-oxide' };
        } else {
          return { products: `${base.metal}CO3 + H2O`, type: 'base-oxide' };
        }
      }
      if (oxide.formula === 'SO2') {
        const valence = VALENCES[base.metal] || 1;
        if (valence === 1) {
          return { products: `${base.metal}2SO3 + H2O`, type: 'base-oxide' };
        } else {
          return { products: `${base.metal}SO3 + H2O`, type: 'base-oxide' };
        }
      }
    }
    
    // 12. KIM LOẠI + PHI KIM → Hợp chất
    if (metal && nonmetal) {
      if (nonmetal.formula === 'O2') {
        const valence = VALENCES[metal.formula] || 2;
        if (valence === 1) return { products: `${metal.formula}2O`, type: 'oxidation' };
        if (valence === 2) return { products: `${metal.formula}O`, type: 'oxidation' };
        if (valence === 3) return { products: `${metal.formula}2O3`, type: 'oxidation' };
      }
      if (nonmetal.formula === 'Cl2') {
        const valence = ['Fe', 'Al', 'Cr'].includes(metal.formula) ? 3 : (VALENCES[metal.formula] || 2);
        if (valence === 1) return { products: `${metal.formula}Cl`, type: 'halogen' };
        if (valence === 2) return { products: `${metal.formula}Cl2`, type: 'halogen' };
        if (valence === 3) return { products: `${metal.formula}Cl3`, type: 'halogen' };
      }
      if (nonmetal.formula === 'S') {
        return { products: `${metal.formula}S`, type: 'synthesis' };
      }
      if (nonmetal.formula === 'N2' && metal.formula === 'Mg') {
        return { products: 'Mg3N2', type: 'synthesis' };
      }
    }
    
    // 13. KIM LOẠI KIỀM + NƯỚC → Bazơ + H2
    if (metal && water) {
      if (['Na', 'K', 'Li'].includes(metal.formula)) {
        return { products: `${metal.formula}OH + H2`, type: 'metal-water' };
      }
      if (['Ca', 'Ba'].includes(metal.formula)) {
        return { products: `${metal.formula}(OH)2 + H2`, type: 'metal-water' };
      }
    }
    
    // 14. PHI KIM + PHI KIM
    if (comp1.type === 'nonmetal' && comp2.type === 'nonmetal') {
      if ((comp1.formula === 'H2' && comp2.formula === 'O2') || (comp2.formula === 'H2' && comp1.formula === 'O2')) {
        return { products: 'H2O', type: 'synthesis' };
      }
      if ((comp1.formula === 'H2' && comp2.formula === 'Cl2') || (comp2.formula === 'H2' && comp1.formula === 'Cl2')) {
        return { products: 'HCl', type: 'synthesis' };
      }
      if ((comp1.formula === 'H2' && comp2.formula === 'N2') || (comp2.formula === 'H2' && comp1.formula === 'N2')) {
        return { products: 'NH3', type: 'synthesis' };
      }
      if ((comp1.formula === 'H2' && comp2.formula === 'S') || (comp2.formula === 'H2' && comp1.formula === 'S')) {
        return { products: 'H2S', type: 'synthesis' };
      }
    }
  }
  
  return null;
};

// Hàm dự đoán sản phẩm từ chất tham gia
const predictProducts = (reactantsInput) => {
  if (!reactantsInput || reactantsInput.trim().length === 0) {
    return null;
  }
  
  // Parse và chuẩn hóa các chất tham gia
  const reactants = reactantsInput
    .split('+')
    .map(r => normalizeFormula(r.trim()))
    .filter(r => r.length > 0);
  
  if (reactants.length === 0) {
    return null;
  }
  
  // Sắp xếp để so sánh không phụ thuộc thứ tự
  const sortedReactants = [...reactants].sort();
  
  // 1. Tìm trong database trước (ưu tiên)
  for (const reaction of REACTION_DATABASE) {
    const sortedPattern = [...reaction.pattern].sort();
    
    // So sánh chính xác
    if (sortedReactants.length === sortedPattern.length &&
        sortedReactants.every((r, i) => r === sortedPattern[i])) {
      return {
        products: reaction.products,
        type: reaction.type,
        confidence: 'high'
      };
    }
  }
  
  // 2. Sử dụng hệ thống dự đoán thông minh
  const advancedPrediction = predictProductsAdvanced(reactants);
  if (advancedPrediction) {
    return {
      ...advancedPrediction,
      confidence: 'medium'
    };
  }
  
  // 3. Fallback: Kiểm tra đốt cháy hydrocacbon (CxHy + O2)
  if (reactants.length === 2) {
    const hasO2 = reactants.some(r => r === 'O2');
    const hydrocarbon = reactants.find(r => r !== 'O2');
    
    if (hasO2 && hydrocarbon) {
      const elements = parseFormula(hydrocarbon);
      // Nếu chỉ có C và H (hydrocacbon) hoặc C, H, O (ancol, este...)
      const elemKeys = Object.keys(elements);
      if (elemKeys.every(e => ['C', 'H', 'O'].includes(e)) && elements['C'] && elements['H']) {
        return {
          products: 'CO2 + H2O',
          type: 'combustion',
          confidence: 'medium'
        };
      }
    }
  }
  
  // Không tìm thấy
  return null;
};

// Các ví dụ phương trình
const EXAMPLE_EQUATIONS = [
  { reactants: 'Fe + O2', products: 'Fe2O3', name: 'Sắt cháy trong oxi' },
  { reactants: 'H2 + O2', products: 'H2O', name: 'Tổng hợp nước' },
  { reactants: 'CH4 + O2', products: 'CO2 + H2O', name: 'Đốt cháy metan' },
  { reactants: 'C2H6 + O2', products: 'CO2 + H2O', name: 'Đốt cháy etan' },
  { reactants: 'C3H8 + O2', products: 'CO2 + H2O', name: 'Đốt cháy propan' },
  { reactants: 'Al + HCl', products: 'AlCl3 + H2', name: 'Nhôm tác dụng với axit' },
  { reactants: 'NaOH + H2SO4', products: 'Na2SO4 + H2O', name: 'Phản ứng trung hòa' },
  { reactants: 'KMnO4 + HCl', products: 'KCl + MnCl2 + Cl2 + H2O', name: 'Điều chế Clo' },
  { reactants: 'Cu + HNO3', products: 'Cu(NO3)2 + NO2 + H2O', name: 'Đồng với axit nitric đặc' },
  { reactants: 'Fe + H2SO4', products: 'FeSO4 + H2', name: 'Sắt với axit sunfuric loãng' },
  { reactants: 'Ca(OH)2 + CO2', products: 'CaCO3 + H2O', name: 'Nước vôi hấp thụ CO2' },
  { reactants: 'NH3 + O2', products: 'NO + H2O', name: 'Oxi hóa amoniac' },
  { reactants: 'P + O2', products: 'P2O5', name: 'Đốt cháy photpho' },
  { reactants: 'Mg + N2', products: 'Mg3N2', name: 'Magie với nitơ' },
  { reactants: 'Fe3O4 + CO', products: 'Fe + CO2', name: 'Khử sắt từ oxit' },
];

const EquationBalancer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [reactantsInput, setReactantsInput] = useState('');
  const [productsInput, setProductsInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSteps, setShowSteps] = useState(true);
  const [showExamples, setShowExamples] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const [predictionStatus, setPredictionStatus] = useState(null); // 'success', 'not-found', null
  
  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('equationBalancerHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);
  
  // Save history to localStorage
  const saveToHistory = (equation) => {
    const newHistory = [equation, ...history.filter(h => 
      h.reactants !== equation.reactants || h.products !== equation.products
    )].slice(0, 20);
    setHistory(newHistory);
    localStorage.setItem('equationBalancerHistory', JSON.stringify(newHistory));
  };
  
  // Xử lý cân bằng phương trình
  const handleBalance = () => {
    setError('');
    setResult(null);
    setLoading(true);
    
    // Simulate processing time for UX
    setTimeout(() => {
      try {
        // Parse reactants và chuẩn hóa
        const reactantsList = reactantsInput
          .split('+')
          .map(r => r.trim())
          .filter(r => r.length > 0)
          .map(r => normalizeFormula(r)); // Chuẩn hóa mỗi công thức
        
        // Parse products và chuẩn hóa
        const productsList = productsInput
          .split('+')
          .map(p => p.trim())
          .filter(p => p.length > 0)
          .map(p => normalizeFormula(p)); // Chuẩn hóa mỗi công thức
        
        if (reactantsList.length === 0) {
          throw new Error('Vui lòng nhập ít nhất một chất tham gia');
        }
        
        if (productsList.length === 0) {
          throw new Error('Vui lòng nhập ít nhất một sản phẩm');
        }
        
        // Validate all formulas (đã được chuẩn hóa)
        const allCompounds = [...reactantsList, ...productsList];
        for (const compound of allCompounds) {
          const validation = validateFormula(compound);
          if (!validation.valid) {
            throw new Error(`Công thức "${compound}": ${validation.error}`);
          }
        }
        
        // Balance the equation
        const balanceResult = balanceEquation(reactantsList, productsList);
        
        // Verify the balance
        const verification = verifyBalance(
          reactantsList, 
          productsList, 
          balanceResult.reactantCoefficients, 
          balanceResult.productCoefficients
        );
        
        // Nếu không cân bằng được, thử các hệ số khác
        if (!verification.isBalanced) {
          // Thử brute force với các hệ số nhỏ
          const maxCoeff = 10;
          let found = false;
          
          const tryBalance = (coeffs, index) => {
            if (found) return;
            if (index === allCompounds.length) {
              const testVerify = verifyBalance(
                reactantsList,
                productsList,
                coeffs.slice(0, reactantsList.length),
                coeffs.slice(reactantsList.length)
              );
              if (testVerify.isBalanced) {
                balanceResult.reactantCoefficients = coeffs.slice(0, reactantsList.length);
                balanceResult.productCoefficients = coeffs.slice(reactantsList.length);
                found = true;
              }
              return;
            }
            
            for (let c = 1; c <= maxCoeff; c++) {
              coeffs[index] = c;
              tryBalance([...coeffs], index + 1);
              if (found) return;
            }
          };
          
          tryBalance(new Array(allCompounds.length).fill(1), 0);
          
          if (!found) {
            throw new Error('Không thể cân bằng phương trình này. Vui lòng kiểm tra lại công thức.');
          }
        }
        
        // Re-verify
        const finalVerification = verifyBalance(
          reactantsList, 
          productsList, 
          balanceResult.reactantCoefficients, 
          balanceResult.productCoefficients
        );
        
        const resultData = {
          reactants: reactantsInput,
          products: productsInput,
          reactantsList,
          productsList,
          reactantCoefficients: balanceResult.reactantCoefficients,
          productCoefficients: balanceResult.productCoefficients,
          elementCounts: finalVerification.elementCounts,
          isBalanced: finalVerification.isBalanced,
          timestamp: new Date().toISOString()
        };
        
        setResult(resultData);
        saveToHistory(resultData);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 500);
  };
  
  // Load example
  const loadExample = (example) => {
    setReactantsInput(example.reactants);
    setProductsInput(example.products);
    setResult(null);
    setError('');
    setShowExamples(false);
  };
  
  // Load from history
  const loadFromHistory = (item) => {
    setReactantsInput(item.reactants);
    setProductsInput(item.products);
    setResult(null);
    setError('');
    setShowHistory(false);
  };
  
  // Clear all
  const handleClear = () => {
    setReactantsInput('');
    setProductsInput('');
    setResult(null);
    setError('');
    setPredictionStatus(null);
  };
  
  // Dự đoán sản phẩm từ chất tham gia - ƯU TIÊN DATABASE
  const handlePredict = async () => {
    if (!reactantsInput.trim()) {
      setPredictionStatus('empty');
      setTimeout(() => setPredictionStatus(null), 3000);
      return;
    }
    
    // Bước 1: Thử tìm trong database local trước (nhanh và ổn định)
    const prediction = predictProducts(reactantsInput);
    
    if (prediction) {
      setProductsInput(prediction.products);
      setPredictionStatus('success');
      setError('');
      setTimeout(() => setPredictionStatus(null), 3000);
      return;
    }
    
    // Bước 2: Nếu không có trong database, thử gọi AI
    setPredictionStatus('loading');
    
    try {
      const response = await fetch('/api/ai-questions/predict-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reactants: reactantsInput })
      });
      
      const data = await response.json();
      
      if (data.success && data.products) {
        setProductsInput(data.products);
        setPredictionStatus('success-ai');
        setError('');
        setTimeout(() => setPredictionStatus(null), 3000);
        return;
      }
      
      // AI cũng không tìm thấy
      setPredictionStatus('not-found');
      setTimeout(() => setPredictionStatus(null), 5000);
      
    } catch (err) {
      console.error('AI prediction error:', err);
      setPredictionStatus('not-found');
      setTimeout(() => setPredictionStatus(null), 5000);
    }
  };
  
  // Copy result
  const copyResult = () => {
    if (!result) return;
    
    const leftSide = result.reactantsList
      .map((r, i) => (result.reactantCoefficients[i] > 1 ? result.reactantCoefficients[i] : '') + r)
      .join(' + ');
    const rightSide = result.productsList
      .map((p, i) => (result.productCoefficients[i] > 1 ? result.productCoefficients[i] : '') + p)
      .join(' + ');
    
    navigator.clipboard.writeText(`${leftSide} → ${rightSide}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Format equation display
  const formatEquationPart = (compounds, coefficients) => {
    return compounds.map((compound, i) => {
      const coeff = coefficients[i];
      return (
        <span key={i} className="inline-flex items-center">
          {i > 0 && <span className="mx-2 text-white/60">+</span>}
          <span className="inline-flex items-center bg-gradient-to-r from-emerald-500/30 to-teal-500/30 px-3 py-1.5 rounded-lg border border-emerald-400/50 backdrop-blur-sm">
            {coeff > 1 && (
              <span className="text-yellow-400 font-bold mr-1 text-lg">{coeff}</span>
            )}
            <span 
              className="font-mono text-white text-lg"
              dangerouslySetInnerHTML={{ __html: formatFormula(compound) }}
            />
          </span>
        </span>
      );
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 shadow-xl border-b border-emerald-500/30">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center shadow-lg border border-white/30">
                <Scale className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Cân Bằng Phương Trình Hóa Học
                </h1>
                <p className="text-emerald-100">
                  Nhập chất tham gia và sản phẩm để tự động cân bằng
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`p-2.5 rounded-xl transition-all ${
                  showHistory 
                    ? 'bg-white text-emerald-600' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                title="Lịch sử"
              >
                <History className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/program/chemistry')}
                className="px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors font-medium backdrop-blur-sm"
              >
                Quay lại
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <FlaskConical className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-lg font-semibold text-white">Nhập Phương Trình</h2>
                </div>
                
                <div className="space-y-4">
                  {/* Reactants Input */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      <span className="inline-flex items-center gap-2">
                        <Beaker className="w-4 h-4 text-orange-400" />
                        Chất tham gia (ngăn cách bằng dấu +)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={reactantsInput}
                      onChange={(e) => setReactantsInput(e.target.value)}
                      placeholder="Ví dụ: Fe + O2"
                      className="w-full px-4 py-3 text-lg font-mono bg-white/10 border border-white/30 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all text-white placeholder-white/50"
                    />
                  </div>
                  
                  {/* Arrow - Predict Button */}
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={handlePredict}
                      disabled={!reactantsInput.trim() || predictionStatus === 'loading'}
                      className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2.5 rounded-full flex items-center gap-2 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                      title="Bấm để dự đoán sản phẩm tự động"
                    >
                      {predictionStatus === 'loading' ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span className="text-sm font-semibold">Đang dự đoán...</span>
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-5 h-5 group-hover:animate-pulse" />
                          <span className="text-sm font-semibold">Dự đoán sản phẩm</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                    
                    {/* Prediction Status Messages */}
                    {predictionStatus === 'success' && (
                      <div className="flex items-center gap-2 text-green-400 text-sm animate-fade-in">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Đã điền sản phẩm từ database!</span>
                      </div>
                    )}
                    {predictionStatus === 'success-ai' && (
                      <div className="flex items-center gap-2 text-green-400 text-sm animate-fade-in">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>🤖 AI đã dự đoán sản phẩm!</span>
                      </div>
                    )}
                    {predictionStatus === 'loading' && (
                      <div className="flex items-center gap-2 text-cyan-400 text-sm animate-fade-in">
                        <Sparkles className="w-4 h-4 animate-pulse" />
                        <span>Đang hỏi AI...</span>
                      </div>
                    )}
                    {predictionStatus === 'not-found' && (
                      <div className="flex items-center gap-2 text-yellow-400 text-sm animate-fade-in">
                        <AlertCircle className="w-4 h-4" />
                        <span>Không tìm thấy phản ứng. Vui lòng nhập sản phẩm thủ công.</span>
                      </div>
                    )}
                    {predictionStatus === 'empty' && (
                      <div className="flex items-center gap-2 text-yellow-400 text-sm animate-fade-in">
                        <AlertCircle className="w-4 h-4" />
                        <span>Vui lòng nhập chất tham gia trước!</span>
                      </div>
                    )}
                    {!predictionStatus && (
                      <span className="text-white/50 text-xs">Hoặc nhập sản phẩm thủ công bên dưới</span>
                    )}
                  </div>
                  
                  {/* Products Input */}
                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      <span className="inline-flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        Sản phẩm (ngăn cách bằng dấu +)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={productsInput}
                      onChange={(e) => setProductsInput(e.target.value)}
                      placeholder="Ví dụ: Fe2O3"
                      className="w-full px-4 py-3 text-lg font-mono bg-white/10 border border-white/30 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all text-white placeholder-white/50"
                    />
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleBalance}
                    disabled={loading || !reactantsInput.trim() || !productsInput.trim()}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <Scale className="w-5 h-5" />
                        Cân Bằng Phương Trình
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={handleClear}
                    className="px-4 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors border border-white/20"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Error Message */}
                {error && (
                  <div className="mt-4 p-4 bg-red-500/20 border border-red-400/50 rounded-xl flex items-start gap-3 backdrop-blur-sm">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-300 font-medium">Lỗi</p>
                      <p className="text-red-200 text-sm">{error}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Result Card */}
            {result && (
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-fade-in">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6" />
                      <h3 className="text-lg font-semibold">Phương Trình Đã Cân Bằng</h3>
                    </div>
                    <button
                      onClick={copyResult}
                      className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                      title="Sao chép"
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Balanced Equation Display */}
                  <div className="flex flex-wrap items-center justify-center gap-2 p-6 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl border-2 border-dashed border-emerald-400/50 mb-6">
                    {formatEquationPart(result.reactantsList, result.reactantCoefficients)}
                    <span className="mx-4 text-2xl text-emerald-400 font-bold">→</span>
                    {formatEquationPart(result.productsList, result.productCoefficients)}
                  </div>
                  
                  {/* Element Balance Table */}
                  <div className="mb-4">
                    <button
                      onClick={() => setShowSteps(!showSteps)}
                      className="flex items-center gap-2 text-emerald-300 font-medium hover:text-emerald-200 transition-colors"
                    >
                      {showSteps ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      Kiểm tra cân bằng nguyên tố
                    </button>
                  </div>
                  
                  {showSteps && (
                    <div className="overflow-hidden rounded-xl border border-white/20">
                      <table className="w-full">
                        <thead className="bg-white/10">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-emerald-200">Nguyên tố</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-emerald-200">Bên trái</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-emerald-200">Bên phải</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-emerald-200">Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {Object.entries(result.elementCounts).map(([element, counts]) => (
                            <tr key={element} className="hover:bg-white/5">
                              <td className="px-4 py-3">
                                <span className="inline-flex items-center gap-2">
                                  <span className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                                    {element}
                                  </span>
                                  <span className="text-emerald-200 text-sm">
                                    {ELEMENTS[element]?.name || element}
                                  </span>
                                </span>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <span className="inline-flex items-center justify-center w-10 h-10 bg-orange-500/30 text-orange-300 rounded-lg font-bold">
                                  {counts.left}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <span className="inline-flex items-center justify-center w-10 h-10 bg-green-500/30 text-green-300 rounded-lg font-bold">
                                  {counts.right}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-center">
                                {counts.left === counts.right ? (
                                  <span className="inline-flex items-center gap-1 text-green-400">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="text-sm font-medium">Cân bằng</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-red-400">
                                    <AlertCircle className="w-5 h-5" />
                                    <span className="text-sm font-medium">Chưa cân bằng</span>
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                <h3 className="font-semibold text-white">Hướng dẫn</h3>
              </div>
              
              <div className="space-y-3 text-sm text-emerald-100">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-emerald-500/30 text-emerald-300 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                  <p>Nhập công thức thoải mái: <span className="text-yellow-300">fe2o3</span>, <span className="text-yellow-300">Fe2O3</span>, <span className="text-yellow-300">FE2O3</span> đều được!</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-emerald-500/30 text-emerald-300 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                  <p>Có thể có khoảng cách: <span className="text-yellow-300">Fe + O2</span> hoặc <span className="text-yellow-300">Fe+O2</span></p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-emerald-500/30 text-emerald-300 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                  <p>Tự sửa lỗi phổ biến: <span className="text-yellow-300">H20</span> → H₂O, <span className="text-yellow-300">C02</span> → CO₂</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 bg-emerald-500/30 text-emerald-300 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                  <p>Hỗ trợ ngoặc: <span className="text-yellow-300">ca(oh)2</span>, <span className="text-yellow-300">Al2(SO4)3</span></p>
                </div>
              </div>
            </div>
            
            {/* Examples */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-5">
              <button
                onClick={() => setShowExamples(!showExamples)}
                className="w-full flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-semibold text-white">Ví dụ mẫu</h3>
                </div>
                {showExamples ? <ChevronUp className="w-5 h-5 text-white/60" /> : <ChevronDown className="w-5 h-5 text-white/60" />}
              </button>
              
              {showExamples && (
                <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                  {EXAMPLE_EQUATIONS.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => loadExample(example)}
                      className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-400/50 transition-all group"
                    >
                      <p className="text-sm font-medium text-white group-hover:text-emerald-300">
                        {example.name}
                      </p>
                      <p className="text-xs text-white/60 font-mono mt-1">
                        {example.reactants} → {example.products}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* History */}
            {showHistory && history.length > 0 && (
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-purple-400" />
                    <h3 className="font-semibold text-white">Lịch sử</h3>
                  </div>
                  <button
                    onClick={() => {
                      setHistory([]);
                      localStorage.removeItem('equationBalancerHistory');
                    }}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Xóa tất cả
                  </button>
                </div>
                
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {history.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => loadFromHistory(item)}
                      className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-400/50 transition-all group"
                    >
                      <p className="text-sm font-mono text-white/80 group-hover:text-purple-300 truncate">
                        {item.reactants} → {item.products}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Info Card */}
            <div className="bg-gradient-to-br from-emerald-500/30 to-teal-600/30 backdrop-blur-xl rounded-2xl shadow-xl border border-emerald-400/30 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-5 h-5 text-emerald-300" />
                <h3 className="font-semibold text-white">Định luật bảo toàn</h3>
              </div>
              <p className="text-sm text-emerald-100 leading-relaxed">
                Trong phản ứng hóa học, tổng khối lượng các chất tham gia bằng tổng khối lượng các sản phẩm. 
                Số nguyên tử mỗi nguyên tố trước và sau phản ứng phải bằng nhau.
              </p>
              <div className="mt-4 pt-4 border-t border-emerald-400/30">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-white">Phương pháp đại số</span>
                </div>
                <p className="text-xs text-emerald-200 mt-1">
                  Hệ thống sử dụng thuật toán Gauss-Jordan để giải hệ phương trình tuyến tính và tìm hệ số cân bằng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EquationBalancer;
