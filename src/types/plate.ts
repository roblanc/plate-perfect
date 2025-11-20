export interface CountryFormat {
  code: string;
  name: string;
  maxLength: number;
  pattern: RegExp;
  format: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  plateWidth: number; // in cm
  plateHeight: number; // in cm
  examples: string[];
  description: string;
  hasEUBand?: boolean;
  regionCode?: string;
}

export interface PlateState {
  plateNumber: string;
  country: string;
  carColor: string;
  carModel: string;
  isValid: boolean;
  errorMessage?: string;
}
