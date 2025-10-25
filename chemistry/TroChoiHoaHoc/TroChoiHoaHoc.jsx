import React, { useState, useCallback, useEffect } from 'react';
import '../common-theme.css';
import './TroChoiHoaHoc.css';

// Game data and utilities
const reactionRules = new Map([
	[['H2','O2'].sort().join('+'), ['H2O']],
	[['N2','H2'].sort().join('+'), ['NH3']],
	[['CO2','H2O'].sort().join('+'), ['C6H12O6','O2']],
	[['Na','Cl2'].sort().join('+'), ['NaCl']],
	[['Fe','O2'].sort().join('+'), ['Fe2O3']],
	[['CaCO3'].sort().join('+'), ['CaO','CO2']],
	[['CH4','O2'].sort().join('+'), ['CO2','H2O']],
	[['HCl','NaOH'].sort().join('+'), ['NaCl','H2O']],
	// Additional reactions for distractors
	[['Mg','O2'].sort().join('+'), ['MgO']],
	[['Ca','O2'].sort().join('+'), ['CaO']],
	[['Al','O2'].sort().join('+'), ['Al2O3']],
	[['Zn','O2'].sort().join('+'), ['ZnO']],
	[['Cu','O2'].sort().join('+'), ['CuO']],
	[['K','O2'].sort().join('+'), ['K2O']],
	[['C','O2'].sort().join('+'), ['CO2']],
	[['S','O2'].sort().join('+'), ['SO2']],
	[['P','O2'].sort().join('+'), ['P2O5']],
	[['H2','Cl2'].sort().join('+'), ['HCl']],
	[['H2','F2'].sort().join('+'), ['HF']],
	[['H2','Br2'].sort().join('+'), ['HBr']],
	[['H2','I2'].sort().join('+'), ['HI']],
	[['H2','S'].sort().join('+'), ['H2S']],
	[['K','Cl2'].sort().join('+'), ['KCl']],
	[['Mg','Cl2'].sort().join('+'), ['MgCl2']],
	[['Ca','Cl2'].sort().join('+'), ['CaCl2']],
]);

const distractorPool = [
	'H2','O2','N2','Cl2','F2','Br2','I2','Na','K','Mg','Ca','Fe','Cu','Zn','Al','C','S','P'
];

const levels = [
	{
		layout: ['R', '+', 'R', '→', 'P'],
		target: { left: ['H2', 'O2'], right: ['H2O'] },
		requirements: [
			'Một khí rất nhẹ, không màu, dễ cháy.',
			'Một khí duy trì sự cháy.',
			'Sản phẩm là chất lỏng không màu ở điều kiện thường.'
		],
		title: 'Đốt cháy khí nhẹ tạo nước'
	},
	{
		layout: ['R', '+', 'R', '→', 'P'],
		target: { left: ['N2', 'H2'], right: ['NH3'] },
		requirements: [
			'Một khí trơ chiếm phần lớn không khí.',
			'Một khí rất nhẹ và dễ cháy.',
			'Sản phẩm là khí có mùi khai, tan tốt trong nước.'
		],
		title: 'Tổng hợp khí có mùi khai'
	},
	{
		layout: ['R', '+', 'R', '→', 'P', '+', 'P'],
		target: { left: ['CO2', 'H2O'], right: ['C6H12O6', 'O2'] },
		requirements: [
			'Một khí gây hiệu ứng nhà kính.',
			'Chất lỏng không màu, không mùi, hoà tan nhiều chất.',
			'Sản phẩm gồm một loại đường đơn và một khí duy trì sự cháy.'
		],
		title: 'Quang hợp tối giản'
	},
	{
		layout: ['R', '+', 'R', '→', 'P'],
		target: { left: ['Na', 'Cl2'], right: ['NaCl'] },
		requirements: [
			'Một kim loại mềm, phản ứng rất mạnh với nước.',
			'Một khí màu vàng lục, mùi hắc.',
			'Sản phẩm là muối ăn quen thuộc.'
		],
		title: 'Tạo muối ăn'
	},
	{
		layout: ['R', '+', 'R', '→', 'P'],
		target: { left: ['Fe', 'O2'], right: ['Fe2O3'] },
		requirements: [
			'Một kim loại có từ tính.',
			'Một khí duy trì sự cháy.',
			'Sản phẩm là "gỉ" màu nâu đỏ.'
		],
		title: 'Hình thành gỉ sắt'
	},
	{
		layout: ['R', '→', 'P', '+', 'P'],
		target: { left: ['CaCO3'], right: ['CaO', 'CO2'] },
		requirements: [
			'Chất rắn chính của đá vôi.',
			'Khi đun nóng phân hủy tạo một oxit bazơ rắn (vôi sống) và một khí làm đục nước vôi trong.'
		],
		title: 'Nhiệt phân đá vôi'
	},
	{
		layout: ['R', '+', 'R', '→', 'P', '+', 'P'],
		target: { left: ['CH4', 'O2'], right: ['CO2', 'H2O'] },
		requirements: [
			'Thành phần chính của khí thiên nhiên.',
			'Phản ứng cháy hoàn toàn sinh ra một khí gây hiệu ứng nhà kính và hơi nước.'
		],
		title: 'Cháy metan hoàn toàn'
	},
	{
		layout: ['R', '+', 'R', '→', 'P', '+', 'P'],
		target: { left: ['HCl', 'NaOH'], right: ['NaCl', 'H2O'] },
		requirements: [
			'Một axit mạnh làm đỏ quỳ tím.',
			'Một bazơ mạnh làm xanh quỳ tím.',
			'Sản phẩm là muối ăn và nước.'
		],
		title: 'Trung hòa axit – bazơ'
	}
];

// Utility functions
const toPretty = (formula) => formula.replace(/(\d+)/g, '<sub>$1</sub>');
const keyOf = (arr) => [...arr].sort().join('+');

const pickDistractors = (excludeSet, count = 4) => {
	const picks = [];
	const pool = distractorPool.filter(x => !excludeSet.has(x));
	for (let i = pool.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[pool[i], pool[j]] = [pool[j], pool[i]];
	}
	for (let i = 0; i < Math.min(count, pool.length); i++) picks.push(pool[i]);
	return picks;
};

const interleave = (arrA, arrB) => {
	const out = [];
	const maxLen = Math.max(arrA.length, arrB.length);
	for (let i = 0; i < maxLen; i++) {
		if (i < arrA.length) out.push(arrA[i]);
		if (i < arrB.length) out.push(arrB[i]);
	}
	return out;
};

const generateProducts = (leftReactants) => {
	if (!leftReactants.length) return [];
	const k = keyOf(leftReactants);
	return reactionRules.get(k) || ['NR'];
};

const arraysEqualIgnoreOrder = (a, b) => {
	if (a.length !== b.length) return false;
	const aa = [...a].sort();
	const bb = [...b].sort();
	for (let i = 0; i < aa.length; i++) if (aa[i] !== bb[i]) return false;
	return true;
};

// Drag and Drop Tile Component
const DragTile = ({ formula, onDragStart, onDragEnd, isDragging }) => (
	<button 
		className={`tile ${isDragging ? 'dragging' : ''}`}
		draggable
		onDragStart={(e) => onDragStart(e, formula)}
		onDragEnd={onDragEnd}
		dangerouslySetInnerHTML={{ __html: toPretty(formula) }}
	/>
);

// Drop Zone Component
const DropZone = ({ id, onDrop, onClear, children, isActive }) => (
	<div 
		className={`dropzone ${children ? 'filled' : ''} ${isActive ? 'active' : ''}`}
		onDragOver={(e) => e.preventDefault()}
		onDrop={(e) => onDrop(e, id)}
		onClick={() => onClear(id)}
	>
		{children}
	</div>
);

// Product Zone Component (readonly)
const ProductZone = ({ id, children }) => (
	<div className="dropzone readonly">
		{children}
	</div>
);

// Main Chemistry Game Component
const TroChoiHoaHoc = () => {
	const [level, setLevel] = useState(0);
	const [placements, setPlacements] = useState({});
	const [status, setStatus] = useState('');
	const [statusKind, setStatusKind] = useState('');
	const [reactantSlots, setReactantSlots] = useState(0);
	const [products, setProducts] = useState([]);
	const [draggedFormula, setDraggedFormula] = useState(null);
	const [activeZone, setActiveZone] = useState(null);

	const currentLevel = levels[level];

	// Generate bank items for current level
	const generateBankItems = useCallback(() => {
		const needLeft = [...currentLevel.target.left];
		const exclude = new Set([...currentLevel.target.right, ...needLeft]);
		const extras = pickDistractors(exclude, 4);
		return interleave(needLeft, extras);
	}, [currentLevel]);

	const [bankItems, setBankItems] = useState([]);

	// Initialize level
	useEffect(() => {
		const items = generateBankItems();
		setBankItems(items);
		setPlacements({});
		setProducts([]);
		setStatus('Kéo thả để hoàn thành theo mô tả.');
		setStatusKind('');

		// Count reactant slots
		const rCount = currentLevel.layout.filter(tok => tok === 'R').length;
		setReactantSlots(rCount);
	}, [level, generateBankItems, currentLevel]);

	// Recompute products when placements change
	useEffect(() => {
		const left = Object.keys(placements)
			.filter(id => id.startsWith('R'))
			.map(id => placements[id])
			.filter(Boolean);

		if (reactantSlots && left.length === reactantSlots) {
			const newProducts = generateProducts(left);
			setProducts(newProducts);
		} else {
			setProducts([]);
		}
	}, [placements, reactantSlots]);

	const handleDragStart = (e, formula) => {
		e.dataTransfer.setData('text/plain', formula);
		setDraggedFormula(formula);
	};

	const handleDragEnd = () => {
		setDraggedFormula(null);
		setActiveZone(null);
	};

	const handleDragOver = (zoneId) => {
		setActiveZone(zoneId);
	};

	const handleDrop = (e, zoneId) => {
		e.preventDefault();
		const formula = e.dataTransfer.getData('text/plain');
		if (!formula) return;

		// Update placements
		setPlacements(prev => ({ ...prev, [zoneId]: formula }));
    
		// Remove dragged item from bank
		setBankItems(prev => {
			const index = prev.findIndex(item => item === formula);
			if (index !== -1) {
				const newItems = [...prev];
				newItems.splice(index, 1);
				return newItems;
			}
			return prev;
		});

		// If replacing, add old item back to bank
		if (placements[zoneId]) {
			setBankItems(prev => [...prev, placements[zoneId]]);
		}

		setActiveZone(null);
		setStatus(`Đã thả: ${formula}`);
	};

	const handleClear = (zoneId) => {
		const formula = placements[zoneId];
		if (!formula) return;

		// Remove from placements
		setPlacements(prev => {
			const newPlacements = { ...prev };
			delete newPlacements[zoneId];
			return newPlacements;
		});

		// Add back to bank
		setBankItems(prev => [...prev, formula]);
	};

	const validate = () => {
		const rZones = Object.keys(placements).filter(id => id.startsWith('R'));
		if (rZones.length < reactantSlots) {
			setStatus('Hãy điền đủ tất cả các ô chất phản ứng.');
			setStatusKind('error');
			return;
		}

		const left = rZones.map(id => placements[id]).filter(Boolean);
		const targetLeft = currentLevel.target.left;
		const targetRight = currentLevel.target.right;
		const generated = generateProducts(left);
    
		const ok = arraysEqualIgnoreOrder(left, targetLeft) && arraysEqualIgnoreOrder(generated, targetRight);
    
		if (ok) {
			setStatus('Chính xác! ✅');
			setStatusKind('success');
		} else {
			setStatus('Chưa đúng. Thử điều chỉnh lại các ô.');
			setStatusKind('error');
		}
	};

	const goToPrevLevel = () => {
		if (level > 0) setLevel(level - 1);
	};

	const goToNextLevel = () => {
		if (level < levels.length - 1) setLevel(level + 1);
	};

	// Render equation elements
	const renderEquation = () => {
		const elements = [];
		let rCount = 0;
		let pCount = 0;

		currentLevel.layout.forEach((tok, index) => {
			if (tok === 'R') {
				const id = `R${++rCount}`;
				const formula = placements[id];
				elements.push(
					<DropZone 
						key={id}
						id={id}
						onDrop={handleDrop}
						onClear={handleClear}
						isActive={activeZone === id}
					>
						{formula && (
							<div 
								className="tile"
								dangerouslySetInnerHTML={{ __html: toPretty(formula) }}
							/>
						)}
					</DropZone>
				);
			} else if (tok === 'P') {
				const id = `P${++pCount}`;
				const product = products[pCount - 1];
				elements.push(
					<ProductZone key={id} id={id}>
						{product && (
							<div 
								className="tile"
								dangerouslySetInnerHTML={{ __html: toPretty(product) }}
							/>
						)}
					</ProductZone>
				);
			} else {
				elements.push(
					<div key={`op-${index}`} className="operator">
						{tok}
					</div>
				);
			}
		});

		return elements;
	};

	return (
		<div className="game-container">
			<header className="game-header">
				<h1>🧪 Trò chơi Hóa học</h1>
				<p className="subtitle">
					Phần yêu cầu chỉ mô tả tính chất, không hiện kí hiệu hóa học. 
					Hãy kéo thả công thức đúng từ Ngân hàng.
				</p>
			</header>

			<main className="game-main">
				<div className="game-board">
					<section className="palette">
						<h3>🏦 Ngân hàng</h3>
						<div className="tiles">
							{bankItems.map((formula, index) => (
								<DragTile
									key={`${formula}-${index}`}
									formula={formula}
									onDragStart={handleDragStart}
									onDragEnd={handleDragEnd}
									isDragging={draggedFormula === formula}
								/>
							))}
						</div>
						<p className="hint">Mẹo: Chữ O (ôxy) không phải số 0. Hãy dùng chữ O viết hoa.</p>
					</section>

					<div className="level-bar">
						<div className="level-controls">
							<button 
								className="btn" 
								disabled={level === 0}
								onClick={goToPrevLevel}
							>
								← Trước
							</button>
						</div>
						<h2>{`Cấp độ ${level + 1}/8 – ${currentLevel.title}`}</h2>
						<div className="level-controls">
							<button 
								className="btn" 
								disabled={level === levels.length - 1}
								onClick={goToNextLevel}
							>
								Tiếp →
							</button>
						</div>
					</div>

					<h3>Yêu cầu (mô tả tính chất, không dùng kí hiệu)</h3>
					<ul className="hintlist">
						{currentLevel.requirements.map((req, index) => (
							<li key={index}>{req}</li>
						))}
					</ul>

					<div className="equation">
						{renderEquation()}
					</div>

					<div className="controls">
						<button className="btn primary" onClick={validate}>
							Kiểm tra
						</button>
					</div>

					<p className={`status ${statusKind}`}>{status}</p>
				</div>
			</main>
		</div>
	);
};

export default TroChoiHoaHoc;
