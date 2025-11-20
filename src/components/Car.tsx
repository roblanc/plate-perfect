import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { usePlateStore, CarType } from '@/store/plateStore';
import { getCarModelById } from '@/data/carModels';
import { LicensePlate } from './LicensePlate';

const carGeometry: Record<CarType, {
  body: { size: [number, number, number]; position: [number, number, number] };
  cabin: { size: [number, number, number]; position: [number, number, number] };
  windows: { size: [number, number, number]; position: [number, number, number] };
  frontPlate: [number, number, number];
  rearPlate: [number, number, number];
}> = {
  hatchback: {
    body: { size: [2.3, 0.7, 3.8], position: [0, 0.5, 0] },
    cabin: { size: [2.1, 0.8, 2.3], position: [0, 1.05, -0.2] },
    windows: { size: [2.05, 0.7, 2.25], position: [0, 1.15, -0.2] },
    frontPlate: [0, 0.35, 1.91],
    rearPlate: [0, 0.5, -1.91],
  },
  sedan: {
    body: { size: [2.5, 0.8, 4.5], position: [0, 0.5, 0] },
    cabin: { size: [2.2, 0.7, 2.2], position: [0, 1.1, -0.3] },
    windows: { size: [2.15, 0.6, 2.15], position: [0, 1.2, -0.3] },
    frontPlate: [0, 0.4, 2.26],
    rearPlate: [0, 0.4, -2.26],
  },
  suv: {
    body: { size: [2.6, 1.0, 4.3], position: [0, 0.7, 0] },
    cabin: { size: [2.4, 0.9, 2.5], position: [0, 1.45, -0.2] },
    windows: { size: [2.35, 0.8, 2.45], position: [0, 1.55, -0.2] },
    frontPlate: [0, 0.5, 2.16],
    rearPlate: [0, 0.5, -2.16],
  },
  wagon: {
    body: { size: [2.4, 0.75, 4.6], position: [0, 0.5, 0] },
    cabin: { size: [2.2, 0.85, 3.0], position: [0, 1.1, -0.5] },
    windows: { size: [2.15, 0.75, 2.95], position: [0, 1.2, -0.5] },
    frontPlate: [0, 0.38, 2.31],
    rearPlate: [0, 0.6, -2.31],
  },
  coupe: {
    body: { size: [2.4, 0.65, 4.2], position: [0, 0.45, 0] },
    cabin: { size: [2.1, 0.6, 2.0], position: [0, 0.95, -0.3] },
    windows: { size: [2.05, 0.5, 1.95], position: [0, 1.0, -0.3] },
    frontPlate: [0, 0.3, 2.11],
    rearPlate: [0, 0.35, -2.11],
  },
};

export const Car = () => {
  const carRef = useRef<Group>(null);
  const { carColor, carModel } = usePlateStore();
  
  const selectedModel = getCarModelById(carModel);
  const carType: CarType = selectedModel?.type || 'sedan';
  const geometry = carGeometry[carType];

  // Subtle idle animation
  useFrame((state) => {
    if (carRef.current) {
      carRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  const wheelPositions: [number, number, number][] = 
    carType === 'hatchback' || carType === 'coupe'
      ? [[-0.9, 0.3, 1.2], [0.9, 0.3, 1.2], [-0.9, 0.3, -1.2], [0.9, 0.3, -1.2]]
      : carType === 'suv'
      ? [[-1.0, 0.4, 1.3], [1.0, 0.4, 1.3], [-1.0, 0.4, -1.3], [1.0, 0.4, -1.3]]
      : [[-0.9, 0.3, 1.3], [0.9, 0.3, 1.3], [-0.9, 0.3, -1.3], [0.9, 0.3, -1.3]];

  return (
    <group ref={carRef} castShadow>
      {/* Car Body */}
      <mesh position={geometry.body.position} castShadow>
        <boxGeometry args={geometry.body.size} />
        <meshStandardMaterial 
          color={carColor} 
          metalness={0.7} 
          roughness={0.3}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Car Cabin */}
      <mesh position={geometry.cabin.position} castShadow>
        <boxGeometry args={geometry.cabin.size} />
        <meshStandardMaterial 
          color={carColor} 
          metalness={0.7} 
          roughness={0.3}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Windows */}
      <mesh position={geometry.windows.position}>
        <boxGeometry args={geometry.windows.size} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          transparent 
          opacity={0.6} 
          metalness={0.9} 
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      {/* Wheels */}
      {wheelPositions.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.35, 0.35, 0.3, 32]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.25, 0.25, 0.32, 32]} />
            <meshStandardMaterial color="#cccccc" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Front License Plate */}
      <LicensePlate position={geometry.frontPlate} rotation={[0, 0, 0]} />

      {/* Rear License Plate */}
      <LicensePlate position={geometry.rearPlate} rotation={[0, Math.PI, 0]} />
    </group>
  );
};
