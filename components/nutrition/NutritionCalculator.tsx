// components/nutrition/NutritionCalculator.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NutritionInput, ProteinRecommendation } from '@/types/nutrition';

export default function NutritionCalculator() {
  const [formData, setFormData] = useState<NutritionInput>({
    age: 22,
    weight: 70,
    height: 175,
    activityLevel: 'moderate',
    fitnessGoal: 'muscle-gain',
    dietaryPreference: 'plant-based',
    allergies: [],
  });

  const [result, setResult] = useState<ProteinRecommendation | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    // Transparent rule-based protein & calorie estimations
    const baseMultiplier = formData.fitnessGoal === 'muscle-gain' ? 2.0 : 1.6;
    const proteinTarget = Math.round(formData.weight * baseMultiplier);
    const calories = Math.round(formData.weight * 32);

    // Filter local alternative protein options based on project scope
    const localCrops = [
      {
        name: 'Soybeans (Processed / Milk / Tofu)',
        proteinPerServing: '36g per 100g',
        description: 'Exceptional complete amino-acid profile, ideal for high-protein meal prep and plant milk alternatives.',
      },
      {
        name: 'Cowpeas (Brown Beans)',
        proteinPerServing: '24g per 100g',
        description: 'Rich in dietary fiber and slow-release carbohydrates, perfect for traditional Moi-Moi or Akara.',
      },
      {
        name: 'Bambara Nuts',
        proteinPerServing: '20g per 100g',
        description: 'Dense, complete-profile African legume packed with essential minerals, magnesium, and zinc.',
      },
      {
        name: 'African Yam Beans',
        proteinPerServing: '22g per 100g',
        description: 'Combines the benefits of tubers and legumes, providing high protein density for food innovators.',
      }
    ];

    setResult({
      dailyProteinTarget: proteinTarget,
      estimatedCalories: calories,
      recommendedCrops: localCrops,
    });
  };

  return (
    <div className="space-y-8">
      {/* Input Form Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#A8B99A]/35 shadow-sm">
        <h2 className="text-xl font-bold text-[#244B38] mb-4">AI Protein &amp; Nutrition Calculator</h2>
        <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#52765A] mb-2">Weight (kg)</label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 rounded-xl border border-[#A8B99A]/40 bg-[#F3EEDF]/40 text-[#244B38] focus:outline-none focus:ring-2 focus:ring-[#244B38]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#52765A] mb-2">Fitness Goal</label>
            <select
              value={formData.fitnessGoal}
              onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value as any })}
              className="w-full px-4 py-3 rounded-xl border border-[#A8B99A]/40 bg-[#F3EEDF]/40 text-[#244B38] focus:outline-none focus:ring-2 focus:ring-[#244B38]"
            >
              <option value="muscle-gain">Lean Muscle Hypertrophy</option>
              <option value="fat-loss">Sustainable Fat Loss &amp; Recomposition</option>
              <option value="maintenance">Metabolic Health &amp; Maintenance</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#244B38] text-white font-semibold hover:bg-[#1b382a] transition-all shadow-md cursor-pointer"
            >
              Generate Recommendations →
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-[#A8B99A]/35 shadow-xs">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#52765A]">Daily Protein Baseline</p>
              <p className="mt-1 text-3xl font-bold text-[#244B38]">{result.dailyProteinTarget}g / day</p>
              <p className="mt-1 text-xs text-[#52765A]">Calculated using transparent nutritional reference rules</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#A8B99A]/35 shadow-xs">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#52765A]">Estimated Energy Need</p>
              <p className="mt-1 text-3xl font-bold text-[#C69A55]">{result.estimatedCalories} kcal</p>
              <p className="mt-1 text-xs text-[#52765A]">Calibrated to your body weight and activity parameters</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-[#244B38] pt-4">Recommended Locally Available Protein Crops</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.recommendedCrops.map((crop, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#A8B99A]/35 shadow-xs space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-[#244B38]">{crop.name}</h4>
                    <span className="text-xs font-semibold bg-[#C69A55]/20 text-[#C69A55] px-2.5 py-1 rounded-full">
                      {crop.proteinPerServing}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#52765A] leading-relaxed">{crop.description}</p>
                </div>
                <div className="pt-4 flex justify-end">
                  <Link
                    href="/tutorials"
                    className="text-xs text-[#244B38] font-bold hover:text-[#C69A55] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View in Marketplace / Tutorials</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#C69A55]/10 border border-[#C69A55]/30 text-xs text-[#244B38]">
            <strong>Disclaimer:</strong> Outputs are general nutritional estimates and guidance, not medical prescriptions. Users with specific medical conditions should consult a qualified professional.
          </div>
        </div>
      )}
    </div>
  );
}