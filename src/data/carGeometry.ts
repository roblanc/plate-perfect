import { CarType } from '@/store/plateStore';

export interface CarGeometry {
    body: { size: [number, number, number]; position: [number, number, number] };
    cabin: { size: [number, number, number]; position: [number, number, number] };
    windows: { size: [number, number, number]; position: [number, number, number] };
    frontPlate: [number, number, number];
    rearPlate: [number, number, number];
    wheelSize: number;
    wheelPositions: [number, number, number][];
    spoiler?: { size: [number, number, number]; position: [number, number, number] };
}

// Specific geometry for individual car models
export const specificCarGeometry: Record<string, CarGeometry> = {
    // VW Golf Series - Compact hatchbacks with progressive sizing
    'vw-golf-4': {
        body: { size: [2.2, 0.65, 3.7], position: [0, 0.48, 0] },
        cabin: { size: [2.0, 0.75, 2.2], position: [0, 1.0, -0.15] },
        windows: { size: [1.95, 0.65, 2.15], position: [0, 1.1, -0.15] },
        frontPlate: [0, 0.33, 1.86],
        rearPlate: [0, 0.48, -1.86],
        wheelSize: 0.33,
        wheelPositions: [[-0.85, 0.28, 1.15], [0.85, 0.28, 1.15], [-0.85, 0.28, -1.15], [0.85, 0.28, -1.15]],
    },
    'vw-golf-5': {
        body: { size: [2.25, 0.68, 3.75], position: [0, 0.5, 0] },
        cabin: { size: [2.05, 0.78, 2.25], position: [0, 1.05, -0.18] },
        windows: { size: [2.0, 0.68, 2.2], position: [0, 1.15, -0.18] },
        frontPlate: [0, 0.35, 1.88],
        rearPlate: [0, 0.5, -1.88],
        wheelSize: 0.34,
        wheelPositions: [[-0.87, 0.29, 1.17], [0.87, 0.29, 1.17], [-0.87, 0.29, -1.17], [0.87, 0.29, -1.17]],
    },
    'vw-golf-6': {
        body: { size: [2.28, 0.7, 3.8], position: [0, 0.52, 0] },
        cabin: { size: [2.08, 0.8, 2.28], position: [0, 1.08, -0.2] },
        windows: { size: [2.03, 0.7, 2.23], position: [0, 1.18, -0.2] },
        frontPlate: [0, 0.36, 1.91],
        rearPlate: [0, 0.52, -1.91],
        wheelSize: 0.35,
        wheelPositions: [[-0.88, 0.3, 1.18], [0.88, 0.3, 1.18], [-0.88, 0.3, -1.18], [0.88, 0.3, -1.18]],
    },
    'vw-golf-7': {
        body: { size: [2.3, 0.72, 3.85], position: [0, 0.53, 0] },
        cabin: { size: [2.1, 0.82, 2.3], position: [0, 1.1, -0.22] },
        windows: { size: [2.05, 0.72, 2.25], position: [0, 1.2, -0.22] },
        frontPlate: [0, 0.37, 1.93],
        rearPlate: [0, 0.53, -1.93],
        wheelSize: 0.36,
        wheelPositions: [[-0.9, 0.31, 1.2], [0.9, 0.31, 1.2], [-0.9, 0.31, -1.2], [0.9, 0.31, -1.2]],
    },

    // VW Polo - Smaller compact
    'vw-polo': {
        body: { size: [2.0, 0.62, 3.5], position: [0, 0.45, 0] },
        cabin: { size: [1.85, 0.72, 2.0], position: [0, 0.95, -0.1] },
        windows: { size: [1.8, 0.62, 1.95], position: [0, 1.05, -0.1] },
        frontPlate: [0, 0.3, 1.76],
        rearPlate: [0, 0.45, -1.76],
        wheelSize: 0.31,
        wheelPositions: [[-0.8, 0.26, 1.05], [0.8, 0.26, 1.05], [-0.8, 0.26, -1.05], [0.8, 0.26, -1.05]],
    },

    // VW Tiguan - Compact SUV
    'vw-tiguan': {
        body: { size: [2.55, 0.95, 4.2], position: [0, 0.68, 0] },
        cabin: { size: [2.35, 0.88, 2.4], position: [0, 1.4, -0.18] },
        windows: { size: [2.3, 0.78, 2.35], position: [0, 1.5, -0.18] },
        frontPlate: [0, 0.48, 2.11],
        rearPlate: [0, 0.48, -2.11],
        wheelSize: 0.38,
        wheelPositions: [[-0.98, 0.38, 1.25], [0.98, 0.38, 1.25], [-0.98, 0.38, -1.25], [0.98, 0.38, -1.25]],
    },

    // VW Touran - MPV/Wagon
    'vw-touran': {
        body: { size: [2.4, 0.78, 4.5], position: [0, 0.52, 0] },
        cabin: { size: [2.2, 0.9, 2.9], position: [0, 1.15, -0.4] },
        windows: { size: [2.15, 0.8, 2.85], position: [0, 1.25, -0.4] },
        frontPlate: [0, 0.38, 2.26],
        rearPlate: [0, 0.58, -2.26],
        wheelSize: 0.35,
        wheelPositions: [[-0.92, 0.3, 1.3], [0.92, 0.3, 1.3], [-0.92, 0.3, -1.3], [0.92, 0.3, -1.3]],
    },

    // VW Jetta - Sedan
    'vw-jetta': {
        body: { size: [2.45, 0.75, 4.4], position: [0, 0.5, 0] },
        cabin: { size: [2.2, 0.68, 2.15], position: [0, 1.08, -0.25] },
        windows: { size: [2.15, 0.58, 2.1], position: [0, 1.18, -0.25] },
        frontPlate: [0, 0.38, 2.21],
        rearPlate: [0, 0.38, -2.21],
        wheelSize: 0.35,
        wheelPositions: [[-0.9, 0.3, 1.28], [0.9, 0.3, 1.28], [-0.9, 0.3, -1.28], [0.9, 0.3, -1.28]],
    },

    // BMW 3 Series - Sport sedan
    'bmw-3-series': {
        body: { size: [2.5, 0.72, 4.55], position: [0, 0.48, 0] },
        cabin: { size: [2.25, 0.65, 2.2], position: [0, 1.05, -0.3] },
        windows: { size: [2.2, 0.55, 2.15], position: [0, 1.15, -0.3] },
        frontPlate: [0, 0.36, 2.28],
        rearPlate: [0, 0.36, -2.28],
        wheelSize: 0.37,
        wheelPositions: [[-0.95, 0.32, 1.32], [0.95, 0.32, 1.32], [-0.95, 0.32, -1.32], [0.95, 0.32, -1.32]],
        spoiler: { size: [2.0, 0.08, 0.25], position: [0, 1.1, -2.2] },
    },

    // BMW 1 Series - Compact sport
    'bmw-1-series': {
        body: { size: [2.3, 0.68, 3.9], position: [0, 0.5, 0] },
        cabin: { size: [2.1, 0.75, 2.25], position: [0, 1.05, -0.2] },
        windows: { size: [2.05, 0.65, 2.2], position: [0, 1.15, -0.2] },
        frontPlate: [0, 0.35, 1.96],
        rearPlate: [0, 0.5, -1.96],
        wheelSize: 0.35,
        wheelPositions: [[-0.88, 0.3, 1.2], [0.88, 0.3, 1.2], [-0.88, 0.3, -1.2], [0.88, 0.3, -1.2]],
    },

    // Mercedes C-Class - Luxury sedan
    'mercedes-c-class': {
        body: { size: [2.52, 0.74, 4.6], position: [0, 0.5, 0] },
        cabin: { size: [2.28, 0.68, 2.25], position: [0, 1.08, -0.32] },
        windows: { size: [2.23, 0.58, 2.2], position: [0, 1.18, -0.32] },
        frontPlate: [0, 0.38, 2.31],
        rearPlate: [0, 0.38, -2.31],
        wheelSize: 0.37,
        wheelPositions: [[-0.96, 0.32, 1.35], [0.96, 0.32, 1.35], [-0.96, 0.32, -1.35], [0.96, 0.32, -1.35]],
    },

    // Audi A4 - Executive sedan
    'audi-a4': {
        body: { size: [2.48, 0.73, 4.58], position: [0, 0.49, 0] },
        cabin: { size: [2.24, 0.67, 2.22], position: [0, 1.07, -0.3] },
        windows: { size: [2.19, 0.57, 2.17], position: [0, 1.17, -0.3] },
        frontPlate: [0, 0.37, 2.3],
        rearPlate: [0, 0.37, -2.3],
        wheelSize: 0.36,
        wheelPositions: [[-0.94, 0.31, 1.33], [0.94, 0.31, 1.33], [-0.94, 0.31, -1.33], [0.94, 0.31, -1.33]],
    },

    // Toyota RAV4 - Mid-size SUV
    'toyota-rav4': {
        body: { size: [2.58, 0.98, 4.35], position: [0, 0.7, 0] },
        cabin: { size: [2.38, 0.9, 2.5], position: [0, 1.42, -0.2] },
        windows: { size: [2.33, 0.8, 2.45], position: [0, 1.52, -0.2] },
        frontPlate: [0, 0.5, 2.18],
        rearPlate: [0, 0.5, -2.18],
        wheelSize: 0.39,
        wheelPositions: [[-1.0, 0.39, 1.28], [1.0, 0.39, 1.28], [-1.0, 0.39, -1.28], [1.0, 0.39, -1.28]],
    },

    // Ford Focus - Popular hatchback
    'ford-focus': {
        body: { size: [2.27, 0.69, 3.82], position: [0, 0.51, 0] },
        cabin: { size: [2.07, 0.79, 2.27], position: [0, 1.06, -0.19] },
        windows: { size: [2.02, 0.69, 2.22], position: [0, 1.16, -0.19] },
        frontPlate: [0, 0.36, 1.92],
        rearPlate: [0, 0.51, -1.92],
        wheelSize: 0.34,
        wheelPositions: [[-0.88, 0.29, 1.18], [0.88, 0.29, 1.18], [-0.88, 0.29, -1.18], [0.88, 0.29, -1.18]],
    },
};

// Base geometry templates by car type
export const baseCarGeometry: Record<CarType, CarGeometry> = {
    hatchback: {
        body: { size: [2.3, 0.7, 3.8], position: [0, 0.5, 0] },
        cabin: { size: [2.1, 0.8, 2.3], position: [0, 1.05, -0.2] },
        windows: { size: [2.05, 0.7, 2.25], position: [0, 1.15, -0.2] },
        frontPlate: [0, 0.35, 1.91],
        rearPlate: [0, 0.5, -1.91],
        wheelSize: 0.35,
        wheelPositions: [[-0.9, 0.3, 1.2], [0.9, 0.3, 1.2], [-0.9, 0.3, -1.2], [0.9, 0.3, -1.2]],
    },
    sedan: {
        body: { size: [2.5, 0.8, 4.5], position: [0, 0.5, 0] },
        cabin: { size: [2.2, 0.7, 2.2], position: [0, 1.1, -0.3] },
        windows: { size: [2.15, 0.6, 2.15], position: [0, 1.2, -0.3] },
        frontPlate: [0, 0.4, 2.26],
        rearPlate: [0, 0.4, -2.26],
        wheelSize: 0.35,
        wheelPositions: [[-0.9, 0.3, 1.3], [0.9, 0.3, 1.3], [-0.9, 0.3, -1.3], [0.9, 0.3, -1.3]],
    },
    suv: {
        body: { size: [2.6, 1.0, 4.3], position: [0, 0.7, 0] },
        cabin: { size: [2.4, 0.9, 2.5], position: [0, 1.45, -0.2] },
        windows: { size: [2.35, 0.8, 2.45], position: [0, 1.55, -0.2] },
        frontPlate: [0, 0.5, 2.16],
        rearPlate: [0, 0.5, -2.16],
        wheelSize: 0.38,
        wheelPositions: [[-1.0, 0.4, 1.3], [1.0, 0.4, 1.3], [-1.0, 0.4, -1.3], [1.0, 0.4, -1.3]],
    },
    wagon: {
        body: { size: [2.4, 0.75, 4.6], position: [0, 0.5, 0] },
        cabin: { size: [2.2, 0.85, 3.0], position: [0, 1.1, -0.5] },
        windows: { size: [2.15, 0.75, 2.95], position: [0, 1.2, -0.5] },
        frontPlate: [0, 0.38, 2.31],
        rearPlate: [0, 0.6, -2.31],
        wheelSize: 0.35,
        wheelPositions: [[-0.9, 0.3, 1.35], [0.9, 0.3, 1.35], [-0.9, 0.3, -1.35], [0.9, 0.3, -1.35]],
    },
    coupe: {
        body: { size: [2.4, 0.65, 4.2], position: [0, 0.45, 0] },
        cabin: { size: [2.1, 0.6, 2.0], position: [0, 0.95, -0.3] },
        windows: { size: [2.05, 0.5, 1.95], position: [0, 1.0, -0.3] },
        frontPlate: [0, 0.3, 2.11],
        rearPlate: [0, 0.35, -2.11],
        wheelSize: 0.35,
        wheelPositions: [[-0.9, 0.3, 1.25], [0.9, 0.3, 1.25], [-0.9, 0.3, -1.25], [0.9, 0.3, -1.25]],
    },
};

// Get geometry for a specific car model, fallback to base type
export const getCarGeometry = (modelId: string, carType: CarType): CarGeometry => {
    return specificCarGeometry[modelId] || baseCarGeometry[carType];
};
