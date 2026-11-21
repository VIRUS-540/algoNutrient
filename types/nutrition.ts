// types/nutrition.ts
export interface NutritionInput {
  age: number;
  weight: number; // in kg
  height: number; // in cm
  activityLevel: 'sedentary' | 'moderate' | 'active';
  fitnessGoal: 'fat-loss' | 'muscle-gain' | 'maintenance';
  dietaryPreference: 'plant-based' | 'omnivore' | 'flexitarian';
  allergies: string[];
}

export interface ProteinRecommendation {
  dailyProteinTarget: number; // in grams
  estimatedCalories: number;
  recommendedCrops: {
    name: string;
    proteinPerServing: string;
    description: string;
    allergenWarning?: string;
  }[];
}