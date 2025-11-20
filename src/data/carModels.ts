import { CarModel } from '@/store/plateStore';

export const carModels: CarModel[] = [
  // Volkswagen
  { id: 'vw-golf-gti-2001', name: 'VW Golf GTI 2001', type: 'hatchback' },
  { id: 'vw-golf-4', name: 'VW Golf 4', type: 'hatchback' },
  { id: 'vw-golf-5', name: 'VW Golf 5', type: 'hatchback' },
  { id: 'vw-golf-6', name: 'VW Golf 6', type: 'hatchback' },
  { id: 'vw-golf-7', name: 'VW Golf 7', type: 'hatchback' },
  { id: 'vw-polo', name: 'VW Polo', type: 'hatchback' },
  { id: 'vw-tiguan', name: 'VW Tiguan', type: 'suv' },
  { id: 'vw-touran', name: 'VW Touran', type: 'wagon' },
  { id: 'vw-jetta', name: 'VW Jetta', type: 'sedan' },
  
  // Skoda
  { id: 'skoda-octavia', name: 'Skoda Octavia', type: 'sedan' },
  { id: 'skoda-superb', name: 'Skoda Superb', type: 'sedan' },
  { id: 'skoda-fabia', name: 'Skoda Fabia', type: 'hatchback' },
  { id: 'skoda-rapid', name: 'Skoda Rapid', type: 'sedan' },
  { id: 'skoda-kodiaq', name: 'Skoda Kodiaq', type: 'suv' },
  
  // Seat
  { id: 'seat-leon', name: 'Seat Leon', type: 'hatchback' },
  { id: 'seat-ibiza', name: 'Seat Ibiza', type: 'hatchback' },
  
  // Renault
  { id: 'renault-megane', name: 'Renault Megane', type: 'hatchback' },
  { id: 'renault-clio', name: 'Renault Clio', type: 'hatchback' },
  { id: 'renault-talisman', name: 'Renault Talisman', type: 'sedan' },
  { id: 'renault-fluence', name: 'Renault Fluence', type: 'sedan' },
  { id: 'renault-captur', name: 'Renault Captur', type: 'suv' },
  
  // Peugeot
  { id: 'peugeot-206', name: 'Peugeot 206', type: 'hatchback' },
  { id: 'peugeot-207', name: 'Peugeot 207', type: 'hatchback' },
  { id: 'peugeot-308', name: 'Peugeot 308', type: 'hatchback' },
  { id: 'peugeot-3008', name: 'Peugeot 3008', type: 'suv' },
  
  // Citroën
  { id: 'citroen-c3', name: 'Citroën C3', type: 'hatchback' },
  { id: 'citroen-c4', name: 'Citroën C4', type: 'hatchback' },
  { id: 'citroen-c4-cactus', name: 'Citroën C4 Cactus', type: 'suv' },
  
  // Ford
  { id: 'ford-focus', name: 'Ford Focus', type: 'hatchback' },
  { id: 'ford-mondeo', name: 'Ford Mondeo', type: 'sedan' },
  { id: 'ford-fiesta', name: 'Ford Fiesta', type: 'hatchback' },
  { id: 'ford-kuga', name: 'Ford Kuga', type: 'suv' },
  
  // Opel
  { id: 'opel-astra', name: 'Opel Astra', type: 'hatchback' },
  { id: 'opel-corsa', name: 'Opel Corsa', type: 'hatchback' },
  { id: 'opel-insignia', name: 'Opel Insignia', type: 'sedan' },
  { id: 'opel-zafira', name: 'Opel Zafira', type: 'wagon' },
  
  // BMW
  { id: 'bmw-3-series', name: 'BMW 3 Series', type: 'sedan' },
  { id: 'bmw-1-series', name: 'BMW 1 Series', type: 'hatchback' },
  { id: 'bmw-5-series', name: 'BMW 5 Series', type: 'sedan' },
  { id: 'bmw-x3', name: 'BMW X3', type: 'suv' },
  
  // Audi
  { id: 'audi-a4', name: 'Audi A4', type: 'sedan' },
  { id: 'audi-a3', name: 'Audi A3', type: 'hatchback' },
  { id: 'audi-a6', name: 'Audi A6', type: 'sedan' },
  { id: 'audi-q5', name: 'Audi Q5', type: 'suv' },
  
  // Mercedes
  { id: 'mercedes-c-class', name: 'Mercedes C-Class', type: 'sedan' },
  { id: 'mercedes-e-class', name: 'Mercedes E-Class', type: 'sedan' },
  { id: 'mercedes-a-class', name: 'Mercedes A-Class', type: 'hatchback' },
  
  // Toyota
  { id: 'toyota-corolla', name: 'Toyota Corolla', type: 'sedan' },
  { id: 'toyota-auris', name: 'Toyota Auris', type: 'hatchback' },
  { id: 'toyota-yaris', name: 'Toyota Yaris', type: 'hatchback' },
  { id: 'toyota-rav4', name: 'Toyota RAV4', type: 'suv' },
  
  // Honda
  { id: 'honda-civic', name: 'Honda Civic', type: 'sedan' },
  
  // Hyundai
  { id: 'hyundai-i30', name: 'Hyundai i30', type: 'hatchback' },
  { id: 'hyundai-i20', name: 'Hyundai i20', type: 'hatchback' },
  { id: 'hyundai-tucson', name: 'Hyundai Tucson', type: 'suv' },
  { id: 'hyundai-santa-fe', name: 'Hyundai Santa Fe', type: 'suv' },
  
  // Kia
  { id: 'kia-ceed', name: 'Kia Ceed', type: 'hatchback' },
  { id: 'kia-rio', name: 'Kia Rio', type: 'hatchback' },
  { id: 'kia-sportage', name: 'Kia Sportage', type: 'suv' },
];

export const getCarModelById = (id: string): CarModel | undefined => {
  return carModels.find(model => model.id === id);
};
