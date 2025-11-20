import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Car } from './Car';
import { Suspense } from 'react';

export const CarViewer = () => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1e] rounded-lg shadow-2xl overflow-hidden">
      <Canvas shadows gl={{ antialias: true, alpha: false }}>
        <PerspectiveCamera makeDefault position={[5, 2.5, 5]} fov={45} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={4}
          maxDistance={18}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 6}
        />
        
        {/* NFS-style Lighting Setup */}
        <ambientLight intensity={0.3} />
        
        {/* Key light - main showroom light */}
        <directionalLight
          position={[8, 12, 8]}
          intensity={2}
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Fill lights */}
        <directionalLight position={[-8, 8, -8]} intensity={0.8} color="#4466ff" />
        <directionalLight position={[0, 5, -10]} intensity={0.6} color="#ffffff" />
        
        {/* Rim lights for edge highlights */}
        <spotLight position={[5, 1, -5]} intensity={1.2} angle={0.3} penumbra={0.5} color="#88ccff" />
        <spotLight position={[-5, 1, -5]} intensity={1.2} angle={0.3} penumbra={0.5} color="#ff8844" />
        
        {/* Environment for reflections - studio preset for showroom look */}
        <Environment preset="city" />
        
        {/* Showroom Ground - glossy reflective floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial 
            color="#0a0a15" 
            roughness={0.15} 
            metalness={0.9}
            envMapIntensity={1.5}
          />
        </mesh>

        <Suspense fallback={null}>
          <Car />
        </Suspense>
      </Canvas>
    </div>
  );
};
