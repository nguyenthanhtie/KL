import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { molecules, atomColors, atomRadii, moleculeCategories } from '../data/moleculesData';

// Convert hex string to number
const hexToNumber = (hex) => parseInt(hex.replace('#', ''), 16);

const MolecularViewer = ({ molecule: initialMolecule, viewMode: initialViewMode = 'ball-stick' }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  
  const [selectedMolecule, setSelectedMolecule] = useState(initialMolecule || 'H2O');
  const [viewMode, setViewMode] = useState(initialViewMode);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [autoRotate, setAutoRotate] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const moleculeData = molecules[selectedMolecule];

  const clearScene = useCallback((scene) => {
    while(scene.children.length > 0) { 
      const object = scene.children[0];
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(mat => mat.dispose());
        } else {
          object.material.dispose();
        }
      }
      scene.remove(object);
    }
  }, []);

  const drawMolecule = useCallback((scene, molData, mode) => {
    if (!molData || !molData.atoms) return;

    const { atoms, bonds } = molData;
    const scaleFactor = 1.5;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-10, -10, -10);
    scene.add(directionalLight2);

    if (mode === 'ball-stick' || mode === 'ball') {
      atoms.forEach((atom, index) => {
        const baseRadius = (atomRadii[atom.element] || atomRadii.default) * scaleFactor;
        const radius = mode === 'ball' ? baseRadius * 1.5 : baseRadius * 0.6;
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const color = hexToNumber(atomColors[atom.element] || atomColors.default);
        const material = new THREE.MeshPhongMaterial({
          color: color,
          shininess: 100,
          specular: 0x444444
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(
          atom.position[0] * scaleFactor,
          atom.position[1] * scaleFactor,
          atom.position[2] * scaleFactor
        );
        sphere.userData = { atomIndex: index, element: atom.element };
        scene.add(sphere);

        // Labels
        if (showLabels && mode === 'ball-stick') {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = 64;
          canvas.height = 64;
          context.fillStyle = 'rgba(0, 0, 0, 0.7)';
          context.beginPath();
          context.arc(32, 32, 28, 0, 2 * Math.PI);
          context.fill();
          context.fillStyle = 'white';
          context.font = 'bold 28px Arial';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText(atom.element, 32, 32);
          
          const texture = new THREE.CanvasTexture(canvas);
          const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
          const sprite = new THREE.Sprite(spriteMaterial);
          sprite.position.set(
            atom.position[0] * scaleFactor,
            atom.position[1] * scaleFactor + radius + 0.5,
            atom.position[2] * scaleFactor
          );
          sprite.scale.set(0.8, 0.8, 1);
          scene.add(sprite);
        }
      });

      // Draw bonds
      if ((mode === 'ball-stick') && bonds) {
        bonds.forEach(bond => {
          const start = atoms[bond.from];
          const end = atoms[bond.to];
          
          const startVec = new THREE.Vector3(
            start.position[0] * scaleFactor,
            start.position[1] * scaleFactor,
            start.position[2] * scaleFactor
          );
          const endVec = new THREE.Vector3(
            end.position[0] * scaleFactor,
            end.position[1] * scaleFactor,
            end.position[2] * scaleFactor
          );
          
          const direction = new THREE.Vector3().subVectors(endVec, startVec);
          const length = direction.length();
          
          const bondOrder = bond.order || 1;
          const drawBond = (offset = new THREE.Vector3()) => {
            const bondRadius = 0.08;
            const geometry = new THREE.CylinderGeometry(bondRadius, bondRadius, length, 16);
            const material = new THREE.MeshPhongMaterial({ 
              color: 0x606060,
              shininess: 50
            });
            const cylinder = new THREE.Mesh(geometry, material);
            
            const midPoint = startVec.clone().add(direction.clone().multiplyScalar(0.5));
            cylinder.position.copy(midPoint.add(offset));
            cylinder.quaternion.setFromUnitVectors(
              new THREE.Vector3(0, 1, 0),
              direction.clone().normalize()
            );
            
            scene.add(cylinder);
          };

          if (bondOrder >= 2) {
            const perpendicular = new THREE.Vector3(1, 0, 0);
            if (Math.abs(direction.dot(perpendicular)) > 0.9) {
              perpendicular.set(0, 1, 0);
            }
            const offset = new THREE.Vector3().crossVectors(direction, perpendicular).normalize().multiplyScalar(0.15);
            drawBond(offset);
            drawBond(offset.clone().negate());
            if (bondOrder >= 3) {
              drawBond();
            }
          } else {
            drawBond();
          }
        });
      }
    } else if (mode === 'space-filling') {
      atoms.forEach((atom, index) => {
        const radius = (atomRadii[atom.element] || atomRadii.default) * scaleFactor * 2;
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const color = hexToNumber(atomColors[atom.element] || atomColors.default);
        const material = new THREE.MeshPhongMaterial({
          color: color,
          shininess: 80,
          specular: 0x333333
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(
          atom.position[0] * scaleFactor,
          atom.position[1] * scaleFactor,
          atom.position[2] * scaleFactor
        );
        sphere.userData = { atomIndex: index, element: atom.element };
        scene.add(sphere);
      });
    } else if (mode === 'wireframe') {
      if (bonds) {
        bonds.forEach(bond => {
          const start = atoms[bond.from];
          const end = atoms[bond.to];
          
          const points = [
            new THREE.Vector3(start.position[0] * scaleFactor, start.position[1] * scaleFactor, start.position[2] * scaleFactor),
            new THREE.Vector3(end.position[0] * scaleFactor, end.position[1] * scaleFactor, end.position[2] * scaleFactor)
          ];
          
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 2 });
          const line = new THREE.Line(geometry, material);
          scene.add(line);
        });
      }

      atoms.forEach((atom) => {
        const geometry = new THREE.SphereGeometry(0.25, 16, 16);
        const color = hexToNumber(atomColors[atom.element] || atomColors.default);
        const material = new THREE.MeshBasicMaterial({ color });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(
          atom.position[0] * scaleFactor,
          atom.position[1] * scaleFactor,
          atom.position[2] * scaleFactor
        );
        scene.add(sphere);
      });
    }
  }, [showLabels]);

  useEffect(() => {
    if (!moleculeData) return;

    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Initialize scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      60,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;
    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2;
    controlsRef.current = controls;

    // Draw molecule
    drawMolecule(scene, moleculeData, viewMode);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      clearScene(scene);
      renderer.dispose();
    };
  }, [moleculeData, viewMode, autoRotate, drawMolecule, clearScene]);

  // Update autoRotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  const filteredMolecules = Object.keys(molecules).filter(key => {
    const mol = molecules[key];
    const matchesCategory = selectedCategory === 'all' || 
      moleculeCategories[selectedCategory]?.molecules?.includes(key);
    const matchesSearch = searchTerm === '' || 
      mol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mol.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mol.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-900 rounded-xl p-4 md:p-6">
      
      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Tìm phân tử (tên, công thức)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none w-60"
        />
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-1 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
        >
          <option value="all">Tất cả phân tử</option>
          {Object.entries(moleculeCategories).map(([key, cat]) => (
            <option key={key} value={key}>{cat.name}</option>
          ))}
        </select>

        <select
          value={selectedMolecule}
          onChange={(e) => setSelectedMolecule(e.target.value)}
          className="px-1 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none min-w-[200px]"
        >
          {filteredMolecules.length === 0 ? (
            <option disabled>Không tìm thấy phân tử</option>
          ) : (
            filteredMolecules.map(key => (
              <option key={key} value={key}>
                {molecules[key]?.formula} - {molecules[key]?.name}
              </option>
            ))
          )}
        </select>

        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          className="px-1 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
        >
          <option value="ball-stick">🔵 Que-Cầu</option>
          <option value="space-filling">⚫ Dạng đặc</option>
          <option value="wireframe">📐 Khung dây</option>
          <option value="ball">🎱 Chỉ cầu</option>
        </select>

        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-4 py-2 rounded-lg transition-all ${
            autoRotate ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          🔄 Tự xoay
        </button>

        <button
          onClick={() => setShowLabels(!showLabels)}
          className={`px-4 py-2 rounded-lg transition-all ${
            showLabels ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          🏷️ Nhãn
        </button>
      </div>

      {/* Molecule info */}
      {moleculeData && (
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-blue-400">{moleculeData.formula}</div>
              <h3 className="text-lg font-semibold text-white mt-1">{moleculeData.name}</h3>
              <p className="text-gray-400 text-sm">{moleculeData.description}</p>
            </div>
            <div className="text-right text-gray-500 text-sm">
              <p>{moleculeData.atoms?.length} nguyên tử • {moleculeData.bonds?.length} liên kết</p>
              <p className="text-xs text-gray-600 mt-2">Danh mục: {selectedCategory === 'all' ? 'Tất cả' : moleculeCategories[selectedCategory]?.name}</p>
              <p className="text-xs text-blue-400 mt-1">{filteredMolecules.length}/{Object.keys(molecules).length} phân tử khả dụng</p>
            </div>
          </div>
        </div>
      )}

      {/* 3D Viewer */}
      <div 
        ref={mountRef} 
        className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-gray-700"
      />

      {/* Instructions */}
      <div className="mt-4 text-center text-gray-400 text-sm">
        <p> Kéo chuột để xoay • Cuộn để zoom • Click phải và kéo để di chuyển</p>
      </div>

      
    </div>
  );
};

export default MolecularViewer;
