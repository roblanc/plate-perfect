import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { usePlateStore } from '@/store/plateStore';
import { LicensePlate } from './LicensePlate';

export const Car = () => {
  const carRef = useRef<Group>(null);
  const carColor = usePlateStore((state) => state.carColor);

  // Subtle idle animation
  useFrame((state) => {
    if (carRef.current) {
      carRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group ref={carRef} castShadow>
      {/* Car Body - Simple sedan shape */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[2.5, 0.8, 4.5]} />
        <meshStandardMaterial color={carColor} metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Car Roof/Cabin */}
      <mesh position={[0, 1.1, -0.3]} castShadow>
        <boxGeometry args={[2.2, 0.7, 2.2]} />
        <meshStandardMaterial color={carColor} metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Windows */}
      <mesh position={[0, 1.2, -0.3]}>
        <boxGeometry args={[2.15, 0.6, 2.15]} />
        <meshStandardMaterial color="#88CCFF" transparent opacity={0.4} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Wheels */}
      {[
        [-0.9, 0.3, 1.3],
        [0.9, 0.3, 1.3],
        [-0.9, 0.3, -1.3],
        [0.9, 0.3, -1.3],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.35, 0.35, 0.3, 32]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Front License Plate */}
      <LicensePlate position={[0, 0.4, 2.26]} rotation={[0, 0, 0]} />

      {/* Rear License Plate */}
      <LicensePlate position={[0, 0.4, -2.26]} rotation={[0, Math.PI, 0]} />
    </group>
  );
};
