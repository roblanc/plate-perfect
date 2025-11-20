import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { countryFormats } from '@/data/countryFormats';

export const usePlateTexture = (plateNumber: string, countryCode: string) => {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const country = countryFormats[countryCode];
    if (!country) return;

    // Canvas dimensions (high resolution for quality)
    const width = 1024;
    const height = 256;
    canvas.width = width;
    canvas.height = height;

    // Background
    ctx.fillStyle = country.backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // EU band for European plates
    if (country.hasEUBand) {
      ctx.fillStyle = '#003399';
      ctx.fillRect(0, 0, 100, height);

      // EU stars
      ctx.fillStyle = '#FFCC00';
      const stars = 12;
      const centerX = 50;
      const centerY = height / 2;
      const radius = 30;
      
      for (let i = 0; i < stars; i++) {
        const angle = (i * 2 * Math.PI) / stars - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Country code
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(country.regionCode || country.code, centerX, height - 20);
    }

    // Plate number
    ctx.fillStyle = country.textColor;
    ctx.font = 'bold 120px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const textX = country.hasEUBand ? width / 2 + 50 : width / 2;
    ctx.fillText(plateNumber.toUpperCase(), textX, height / 2);

    // Create texture
    const newTexture = new THREE.CanvasTexture(canvas);
    newTexture.needsUpdate = true;
    newTexture.minFilter = THREE.LinearFilter;
    newTexture.magFilter = THREE.LinearFilter;
    
    setTexture(newTexture);

    return () => {
      newTexture.dispose();
    };
  }, [plateNumber, countryCode]);

  return texture;
};
