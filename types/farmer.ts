// types/farmer.ts
export interface WeatherData {
  location: string;
  temperature: number; // in °C
  rainfall: string;
  humidity: string;
  riskAlert?: string; // e.g., "Potential dry spell warning"
  forecastSummary: string;
}

export interface CropRecommendation {
  cropName: string;
  suitabilityScore: string;
  estimatedDemand: string;
  priceTrend: string;
  reasoning: string;
}