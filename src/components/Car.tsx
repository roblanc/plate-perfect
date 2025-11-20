import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { usePlateStore } from '@/store/plateStore';
import { getCarModelById } from '@/data/carModels';
import { getCarGeometry } from '@/data/carGeometry';
import { hasCustomModel, getModelPath } from '@/data/carModelPaths';
import { LoadedCarModel } from './LoadedCarModel';
import { LicensePlate } from './LicensePlate';

export const Car = () => {
  const carRef = useRef<Group>(null);
  const { carColor, carModel } = usePlateStore();

  const selectedModel = getCarModelById(carModel);
  const carType = selectedModel?.type || 'sedan';
  const geometry = getCarGeometry(carModel, carType);

  // Subtle idle animation
  useFrame((state) => {
    if (carRef.current) {
      carRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });


  // Check if we have a custom 3D model for this car
  const modelPath = hasCustomModel(carModel) ? getModelPath(carModel) : undefined;

  return (
    <group ref={carRef} castShadow>
      {modelPath ? (
        // Use loaded 3D model if available
        <Suspense fallback={null}>
          <LoadedCarModel modelPath={modelPath} />
        </Suspense>
      ) : (
        // Fallback to geometric shapes
        <>
          {/* Car Body */}
          <mesh position={geometry.body.position} castShadow>
            <boxGeometry args={geometry.body.size} />
            <meshStandardMaterial
              color={carColor}
              metalness={0.85}
              roughness={0.15}
              envMapIntensity={2.0}
            />
          </mesh>

          {/* Car Cabin */}
          <mesh position={geometry.cabin.position} castShadow>
            <boxGeometry args={geometry.cabin.size} />
            <meshStandardMaterial
              color={carColor}
              metalness={0.85}
              roughness={0.15}
              envMapIntensity={2.0}
            />
          </mesh>

          {/* Windows */}
          <mesh position={geometry.windows.position}>
            <boxGeometry args={geometry.windows.size} />
            <meshPhysicalMaterial
              color="#0a0a15"
              transparent
              opacity={0.3}
              metalness={0.1}
              roughness={0.05}
              envMapIntensity={3.0}
              transmission={0.9}
              thickness={0.5}
            />
          </mesh>

          {/* Wheels */}
          {geometry.wheelPositions.map((pos, i) => (
            <group key={i} position={pos}>
              <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[geometry.wheelSize, geometry.wheelSize, 0.3, 32]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
              </mesh>
              {/* Rim */}
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[geometry.wheelSize * 0.7, geometry.wheelSize * 0.7, 0.32, 32]} />
                <meshStandardMaterial color="#cccccc" metalness={0.95} roughness={0.1} />
              </mesh>
            </group>
          ))}

          {/* Optional Spoiler for sport models */}
          {geometry.spoiler && (
            <mesh position={geometry.spoiler.position} castShadow>
              <boxGeometry args={geometry.spoiler.size} />
              <meshStandardMaterial
                color={carColor}
                metalness={0.85}
                roughness={0.15}
                envMapIntensity={2.0}
              />
            </mesh>
          )}
        </>
      )}

      {/* License Plates - always shown */}
      <LicensePlate position={geometry.frontPlate} rotation={[0, 0, 0]} />
      <LicensePlate position={geometry.rearPlate} rotation={[0, Math.PI, 0]} />
    </group>
  );
};
