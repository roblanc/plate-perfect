import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { usePlateStore } from '@/store/plateStore';
import { Suspense } from 'react';
import * as THREE from 'three';

interface LoadedCarModelProps {
    modelPath: string;
}

export const LoadedCarModel = ({ modelPath }: LoadedCarModelProps) => {
    const { carColor } = usePlateStore();
    const gltf = useLoader(GLTFLoader, modelPath);

    // Apply the selected color to all meshes in the model
    if (gltf.scene) {
        gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                // Only apply color to car body materials (not windows, lights, etc.)
                if (child.material && child.name.toLowerCase().includes('body')) {
                    const material = child.material as THREE.MeshStandardMaterial;
                    material.color.set(carColor);
                    material.metalness = 0.85;
                    material.roughness = 0.15;
                    material.envMapIntensity = 2.0;
                }
            }
        });
    }

    return (
        <Suspense fallback={null}>
            <primitive object={gltf.scene} scale={1} position={[0, 0, 0]} />
        </Suspense>
    );
};
