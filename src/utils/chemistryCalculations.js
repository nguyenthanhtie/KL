// Utility functions để cân bằng phương trình hóa học

// Parse công thức hóa học thành object
export const parseChemicalFormula = (formula) => {
  const elements = {};
  const cleanFormula = formula.replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (match) => {
    const subscripts = '₀₁₂₃₄₅₆₇₈₉';
    return subscripts.indexOf(match).toString();
  });

  const regex = /([A-Z][a-z]?)(\d*)/g;
  let match;
  
  while ((match = regex.exec(cleanFormula)) !== null) {
    const element = match[1];
    const count = match[2] ? parseInt(match[2]) : 1;
    elements[element] = (elements[element] || 0) + count;
  }
  
  return elements;
};

// Kiểm tra cân bằng phương trình
export const checkBalance = (reactants, products, coefficients) => {
  const elementCount = {};
  
  // Đếm nguyên tố ở vế trái
  reactants.forEach((formula, index) => {
    const elements = parseChemicalFormula(formula);
    Object.entries(elements).forEach(([element, count]) => {
      elementCount[element] = (elementCount[element] || 0) + count * coefficients[index];
    });
  });
  
  // Trừ đi nguyên tố ở vế phải
  products.forEach((formula, index) => {
    const elements = parseChemicalFormula(formula);
    Object.entries(elements).forEach(([element, count]) => {
      const productIndex = reactants.length + index;
      elementCount[element] = (elementCount[element] || 0) - count * coefficients[productIndex];
    });
  });
  
  // Kiểm tra tất cả bằng 0
  return Object.values(elementCount).every(count => count === 0);
};

// Tính GCD (Greatest Common Divisor)
const gcd = (a, b) => {
  return b === 0 ? a : gcd(b, a % b);
};

// Rút gọn hệ số
const simplifyCoefficients = (coefficients) => {
  const gcdValue = coefficients.reduce((a, b) => gcd(a, b));
  return coefficients.map(c => c / gcdValue);
};

// Thuật toán cân bằng phương trình đơn giản
export const balanceEquation = (reactants, products) => {
  // Lấy tất cả các nguyên tố
  const allElements = new Set();
  [...reactants, ...products].forEach(formula => {
    const elements = parseChemicalFormula(formula);
    Object.keys(elements).forEach(element => allElements.add(element));
  });
  
  const elementList = Array.from(allElements);
  const numCompounds = reactants.length + products.length;
  
  // Thử các hệ số từ 1-10
  const maxCoeff = 10;
  
  for (let attempt = 0; attempt < 1000; attempt++) {
    const coefficients = Array(numCompounds).fill(0).map(() => 
      Math.floor(Math.random() * maxCoeff) + 1
    );
    
    if (checkBalance(reactants, products, coefficients)) {
      return simplifyCoefficients(coefficients);
    }
  }
  
  // Thuật toán ma trận đơn giản cho các trường hợp phức tạp
  // (Đây là phương pháp đơn giản hóa, có thể cần cải thiện)
  return tryMatrixMethod(reactants, products, elementList);
};

// Phương pháp ma trận đơn giản
const tryMatrixMethod = (reactants, products, elements) => {
  // Tạo ma trận hệ số
  const numCompounds = reactants.length + products.length;
  const matrix = [];
  
  elements.forEach(element => {
    const row = [];
    
    // Chất phản ứng (dương)
    reactants.forEach(formula => {
      const parsed = parseChemicalFormula(formula);
      row.push(parsed[element] || 0);
    });
    
    // Sản phẩm (âm)
    products.forEach(formula => {
      const parsed = parseChemicalFormula(formula);
      row.push(-(parsed[element] || 0));
    });
    
    matrix.push(row);
  });
  
  // Thử nghiệm với các giá trị cụ thể
  const coefficients = Array(numCompounds).fill(1);
  
  // Phương pháp thử và sai cải tiến
  for (let r1 = 1; r1 <= 10; r1++) {
    for (let r2 = 1; r2 <= 10; r2++) {
      for (let p1 = 1; p1 <= 10; p1++) {
        for (let p2 = 1; p2 <= 10; p2++) {
          const testCoeffs = [r1, r2, p1, p2].slice(0, numCompounds);
          if (testCoeffs.length < numCompounds) {
            testCoeffs.push(...Array(numCompounds - testCoeffs.length).fill(1));
          }
          
          if (checkBalance(reactants, products, testCoeffs)) {
            return simplifyCoefficients(testCoeffs);
          }
        }
      }
    }
  }
  
  return coefficients;
};

// Định dạng phương trình với hệ số
export const formatEquation = (reactants, products, coefficients) => {
  const reactantStr = reactants.map((r, i) => 
    coefficients[i] > 1 ? `${coefficients[i]}${r}` : r
  ).join(' + ');
  
  const productStr = products.map((p, i) => {
    const coeffIndex = reactants.length + i;
    return coefficients[coeffIndex] > 1 ? `${coefficients[coeffIndex]}${p}` : p;
  }).join(' + ');
  
  return `${reactantStr} → ${productStr}`;
};

// Validate công thức hóa học
export const validateFormula = (formula) => {
  const pattern = /^([A-Z][a-z]?\d*)+$/;
  return pattern.test(formula.replace(/[₀₁₂₃₄₅₆₇₈₉]/g, ''));
};

// Tính khối lượng mol
export const calculateMolarMass = (formula, atomicMasses) => {
  const elements = parseChemicalFormula(formula);
  let totalMass = 0;
  
  Object.entries(elements).forEach(([element, count]) => {
    if (atomicMasses[element]) {
      totalMass += atomicMasses[element] * count;
    }
  });
  
  return totalMass;
};

// Atomic masses của các nguyên tố phổ biến
export const atomicMasses = {
  'H': 1.008,
  'He': 4.003,
  'C': 12.011,
  'N': 14.007,
  'O': 15.999,
  'F': 18.998,
  'Na': 22.990,
  'Mg': 24.305,
  'Al': 26.982,
  'Si': 28.085,
  'P': 30.974,
  'S': 32.065,
  'Cl': 35.453,
  'K': 39.098,
  'Ca': 40.078,
  'Fe': 55.845,
  'Cu': 63.546,
  'Zn': 65.38,
  'Ag': 107.868,
  'Au': 196.967
};
