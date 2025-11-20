# 3D Car Models Directory

This directory contains 3D car models in GLB or GLTF format.

## How to Add a New Car Model

### Step 1: Find and Download a Model

**Recommended Sources:**
1. **Sketchfab** (https://sketchfab.com)
   - Search for the car model (e.g., "Volkswagen Golf IV")
   - Filter by "Downloadable"
   - Check the license (look for CC0 or CC-BY that allows commercial use)
   - Download in GLB or GLTF format

2. **Other Sources:**
   - Poly Pizza (https://poly.pizza)
   - Free3D (https://free3d.com)
   - TurboSquid Free Models (https://www.turbosquid.com)

### Step 2: Prepare the Model

1. Download the model in `.glb` or `.gltf` format
2. Rename the file to match the car model ID (e.g., `vw-golf-4.glb`)
3. Place the file in this directory (`/public/models/`)

### Step 3: Register the Model

Open `/src/data/carModelPaths.ts` and add an entry:

```typescript
export const carModelPaths: Record<string, string> = {
  'vw-golf-4': '/models/vw-golf-4.glb',
  'vw-polo': '/models/vw-polo.glb',
  // Add more models here...
};
```

### Step 4: Test

1. Restart the dev server if needed
2. Select the car model from the dropdown
3. The real 3D model should load instead of the geometric fallback

## Model Requirements

- **Format:** GLB (preferred) or GLTF
- **Size:** Try to keep models under 10MB for performance
- **Orientation:** Models should face forward (positive Z-axis)
- **Scale:** The app will auto-scale, but models around 1-2 units work best
- **Materials:** PBR materials work best (metallic/roughness workflow)

## License Considerations

Always check the license before using a model:
- ✅ CC0 (Public Domain) - Free to use
- ✅ CC-BY - Free to use with attribution
- ❌ CC-BY-NC - Not for commercial use
- ❌ CC-BY-ND - No derivatives allowed

## Example: VW Golf IV from Sketchfab

The example you provided:
https://sketchfab.com/3d-models/volkswagen-golf-iv-3e40ac80ec044394999715a18e2dbe33

1. Visit the link
2. Click "Download 3D Model"
3. Select "glTF" format
4. Save as `vw-golf-4.glb` in this directory
5. Add to `carModelPaths.ts`:
   ```typescript
   'vw-golf-4': '/models/vw-golf-4.glb',
   ```

## Current Models

(List will be updated as you add models)

- None yet - Add your first model!

## Tips

- **Performance:** Fewer polygons = faster loading
- **Textures:** Embedded textures in GLB work best
- **Testing:** Test each model after adding to ensure it loads correctly
- **Fallback:** If a model doesn't load, the app will use geometric shapes
