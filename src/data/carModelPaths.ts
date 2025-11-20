// Map of car model IDs to their 3D model file paths
// Add your downloaded .glb or .gltf files to /public/models/
export const carModelPaths: Record<string, string> = {
    // VW Models - Temporarily disabled until we fix GLTF serving
    // The geometric fallback shapes look great and work perfectly!
    // 'vw-golf-4': '/models/vw-golf-4.gltf',
    // 'vw-golf-5': '/models/vw-golf-5.glb',
    // 'vw-polo': '/models/vw-polo.glb',
    // 'vw-tiguan': '/models/vw-tiguan.glb',

    'vw-golf-gti-2001': '/models/volkswagen_golf_gti_2001.glb',

    // Audi Models
    // 'audi-a3': '/models/audi-a3.glb',

    // BMW Models
    // 'bmw-3-series': '/models/bmw-3-series.glb',

    // Add more models as you download them from Sketchfab or other sources
};

// Check if a car model has a 3D model file available
export const hasCustomModel = (modelId: string): boolean => {
    return modelId in carModelPaths;
};

// Get the path to a car's 3D model file
export const getModelPath = (modelId: string): string | undefined => {
    return carModelPaths[modelId];
};

// Instructions for adding new models:
// 1. Download a .glb or .gltf model from Sketchfab or other sources
// 2. Place the file in the /public/models/ directory
// 3. Add an entry to carModelPaths above with the model ID and file path
// 4. The app will automatically use the 3D model instead of the geometric fallback

// Recommended sources for free car models:
// - Sketchfab (https://sketchfab.com) - Filter by "Downloadable" and check license
// - Poly Pizza (https://poly.pizza)
// - Free3D (https://free3d.com)
// - TurboSquid Free Models (https://www.turbosquid.com/Search/3D-Models/free)

// License considerations:
// - Look for CC0 (Public Domain) or CC-BY licenses
// - Always check if commercial use is allowed
// - Give attribution if required by the license
