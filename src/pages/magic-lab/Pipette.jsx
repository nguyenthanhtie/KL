import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import useLabStore from './store';
import { useCursor } from '@react-three/drei';

const Pipette = (props) => {
  const meshRef = useRef();
  
  // Lấy trạng thái từ store
  const pipetteFilled = useLabStore(state => state.pipetteFilled);
  const fillPipette = useLabStore(state => state.fillPipette);
  const addDrop = useLabStore(state => state.addDrop);
  const questStatus = useLabStore(state => state.questStatus);
  
  // Để đơn giản, ta không dùng Drag & Drop phức tạp mà chỉ bấm click để tương tác
  // Click vào lọ HCl (tượng trưng gần đó) -> bơm pipette
  // Click lại vào Pipette (khi nó ở trên cốc) -> nhỏ giọt
  
  // Trạng thái hover cho đổi con trỏ chuột
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  
  // Khi chuột nhấp vào ống hút
  const handleClick = (e) => {
    e.stopPropagation(); // Ngăn click lan tới scene
    
    if (questStatus === 'idle') {
       // Bắt đầu nhiệm vụ nếu chưa bắt đầu
       useLabStore.getState().startQuest();
    }
    
    if (!pipetteFilled) {
      fillPipette();
      // Ta có thể thêm hiệu ứng di chuyển nhẹ hoặc animation bơm ở đây
    } else {
      addDrop();
      // Hiệu ứng "nhỏ giọt" - nhún ống hút xuống một xíu
      meshRef.current.position.y -= 0.1;
      setTimeout(() => {
        if(meshRef.current) meshRef.current.position.y += 0.1;
      }, 150);
    }
  };

  return (
    <group ref={meshRef} {...props} onClick={handleClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {/* Thân trên (bóp cao su) */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={pipetteFilled ? '#dd2222' : '#aaaaaa'} roughness={0.7} />
      </mesh>
      {/* Thân dưới (ống thủy tinh) */}
      <mesh position={[0, 0.4, 0]}>
         {/* Bán kính trên 0.05, dưới 0.02, dài 1 */}
        <cylinderGeometry args={[0.05, 0.02, 1, 16]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} transparent roughness={0.1} />
      </mesh>
      
      {/* Ống chứa HCl (ảo) màu đỏ nhạt nếu pipette đầy */}
      {pipetteFilled && (
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.04, 0.015, 0.8, 16]} />
          <meshBasicMaterial color="#ffaaaa" transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
};

export default Pipette;
