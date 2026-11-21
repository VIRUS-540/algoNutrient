export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: 'Preparation' | 'Cooking' | 'Storage' | 'Nutrition';
  duration: string;
  videoUrl: string;
  transcriptSummary?: string;
  ingredientTarget?: string;
}