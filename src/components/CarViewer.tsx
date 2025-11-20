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
        <ambientLight intensity={0.4} />

        {/* Key light - main showroom light */}
        <directionalLight
          position={[10, 15, 10]}
          intensity={2.5}
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* Fill lights for NFS-style dramatic lighting */}
        <directionalLight position={[-10, 10, -10]} intensity={1.2} color="#5577ff" />
        <directionalLight position={[0, 8, -12]} intensity={0.8} color="#ffffff" />

        {/* Rim lights for edge highlights - signature NFS look */}
        <spotLight position={[6, 2, -6]} intensity={2.0} angle={0.4} penumbra={0.6} color="#66ccff" />
        <spotLight position={[-6, 2, -6]} intensity={2.0} angle={0.4} penumbra={0.6} color="#ff6644" />
        <spotLight position={[0, 5, 8]} intensity={1.5} angle={0.5} penumbra={0.5} color="#ffffff" />

        {/* Environment for reflections - city preset for that NFS urban showroom vibe */}
        <Environment preset="city" />

        {/* Showroom Ground - ultra glossy reflective floor like NFS */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial
            color="#050508"
            roughness={0.05}
            metalness={0.95}
            envMapIntensity={2.5}
          />
        </mesh>

        <Suspense fallback={null}>
          <Car />
        </Suspense>
      </Canvas>
    </div>
  );
};
