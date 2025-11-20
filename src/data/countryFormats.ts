import { CountryFormat } from "@/types/plate";

export const countryFormats: Record<string, CountryFormat> = {
  RO: {
    code: "RO",
    name: "Romania",
    maxLength: 9,
    pattern: /^[A-Z]{1,2}\s?\d{2,3}\s?[A-Z]{3}$/,
    format: "XX 00 ABC",
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    fontFamily: "sans-serif",
    plateWidth: 52,
    plateHeight: 11,
    hasEUBand: true,
    regionCode: "RO",
    examples: ["B 123 ABC", "CT 45 XYZ", "TM 789 DEF"],
    description: "Romanian plates: 1-2 letters (county), 2-3 digits, 3 letters"
  },
  DE: {
    code: "DE",
    name: "Germany",
    maxLength: 9,
    pattern: /^[A-Z]{1,3}\s?[A-Z]{1,2}\s?\d{1,4}$/,
    format: "XX AB 1234",
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    fontFamily: "sans-serif",
    plateWidth: 52,
    plateHeight: 11,
    hasEUBand: true,
    regionCode: "D",
    examples: ["B AB 1234", "M XY 999", "HH AB 5678"],
    description: "German plates: 1-3 letters (region), 1-2 letters, 1-4 digits"
  },
  FR: {
    code: "FR",
    name: "France",
    maxLength: 9,
    pattern: /^[A-Z]{2}\s?\d{3}\s?[A-Z]{2}$/,
    format: "AB 123 CD",
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    fontFamily: "sans-serif",
    plateWidth: 52,
    plateHeight: 11,
    hasEUBand: true,
    regionCode: "F",
    examples: ["AB 123 CD", "XY 456 ZW", "PQ 789 RS"],
    description: "French plates: 2 letters, 3 digits, 2 letters"
  },
  UK: {
    code: "UK",
    name: "United Kingdom",
    maxLength: 7,
    pattern: /^[A-Z]{2}\d{2}\s?[A-Z]{3}$/,
    format: "AB12 CDE",
    backgroundColor: "#FFD700",
    textColor: "#000000",
    fontFamily: "sans-serif",
    plateWidth: 52,
    plateHeight: 11,
    hasEUBand: false,
    examples: ["AB12 CDE", "XY34 FGH", "PQ56 RST"],
    description: "UK plates: 2 letters, 2 digits, 3 letters"
  },
  US: {
    code: "US",
    name: "United States",
    maxLength: 8,
    pattern: /^[A-Z0-9]{1,8}$/,
    format: "ABC1234",
    backgroundColor: "#4169E1",
    textColor: "#FFFFFF",
    fontFamily: "sans-serif",
    plateWidth: 30.5,
    plateHeight: 15.2,
    hasEUBand: false,
    examples: ["ABC1234", "XYZ9876", "1234ABC"],
    description: "US plates: 1-8 alphanumeric characters (varies by state)"
  }
};

export const validatePlate = (plateNumber: string, countryCode: string): { isValid: boolean; errorMessage?: string } => {
  const country = countryFormats[countryCode];
  
  if (!country) {
    return { isValid: false, errorMessage: "Invalid country code" };
  }

  const cleanPlate = plateNumber.toUpperCase().trim();

  if (cleanPlate.length === 0) {
    return { isValid: false, errorMessage: "Plate number cannot be empty" };
  }

  if (cleanPlate.length > country.maxLength) {
    return { isValid: false, errorMessage: `Plate number too long (max ${country.maxLength} characters)` };
  }

  if (!country.pattern.test(cleanPlate)) {
    return { isValid: false, errorMessage: `Invalid format. Expected: ${country.format}` };
  }

  return { isValid: true };
};
