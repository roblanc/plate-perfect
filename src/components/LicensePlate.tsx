import { useMemo } from 'react';
import { usePlateStore } from '@/store/plateStore';
import { usePlateTexture } from '@/hooks/usePlateTexture';
import { countryFormats } from '@/data/countryFormats';

interface LicensePlateProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

export const LicensePlate = ({ position, rotation }: LicensePlateProps) => {
  const { plateNumber, country } = usePlateStore();
  const texture = usePlateTexture(plateNumber, country);

  const plateScale = useMemo(() => {
    const countryData = countryFormats[country];
    if (!countryData) return [1, 0.25, 0.02] as [number, number, number];

    // Scale based on real dimensions (converting cm to scene units)
    const width = countryData.plateWidth / 25; // Normalize to scene scale
    const height = countryData.plateHeight / 25;
    
    return [width, height, 0.02] as [number, number, number];
  }, [country]);

  if (!texture) return null;

  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={plateScale} />
      <meshStandardMaterial map={texture} metalness={0.3} roughness={0.7} />
    </mesh>
  );
};
