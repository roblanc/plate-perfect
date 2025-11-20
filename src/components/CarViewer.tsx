import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Car } from './Car';
import { Suspense } from 'react';

export const CarViewer = () => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-accent to-background rounded-lg shadow-lg overflow-hidden">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 2, 5]} fov={50} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-10, 10, -5]} intensity={0.5} />
        
        {/* Environment for reflections */}
        <Environment preset="sunset" />
        
        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#888888" roughness={0.8} metalness={0.2} />
        </mesh>

        <Suspense fallback={null}>
          <Car />
        </Suspense>
      </Canvas>
    </div>
  );
};
