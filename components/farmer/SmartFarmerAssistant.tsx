// components/farmer/SmartFarmerAssistant.tsx
'use client';

import { useState } from 'react';
import { CropRecommendation } from '@/types/farmer';

export default function SmartFarmerAssistant() {
  const [farmSize, setFarmSize] = useState<string>('2 Hectares');
  const [selectedCropFocus, setSelectedCropFocus] = useState<string>('Soybeans vs Cowpeas');

  const recommendations: Record<string, CropRecommendation[]> = {
    'Soybeans vs Cowpeas': [
      {
        cropName: 'Soybeans (Glycine max)',
        suitabilityScore: 'High Suitability (92%)',
        estimatedDemand: 'High commercial demand from food innovators and processors.',
        priceTrend: 'Stable upward trend (+12% YoY)',
        reasoning: 'Strong regional demand for plant milk and protein isolate formulation. Highly compatible with current soil and rainfall windows.'
      },
      {
        cropName: 'Cowpeas (Vigna unguiculata)',
        suitabilityScore: 'Optimal Suitability (95%)',
        estimatedDemand: 'Consistent household and retail market demand.',
        priceTrend: 'Steady seasonal pricing',
        reasoning: 'Lower input requirements with reliable drought resilience during sporadic dry spells in the region.'
      }
    ]
  };

  const currentRecs = recommendations[selectedCropFocus];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#A8B99A]/35 shadow-sm space-y-6">
      <div>
        <span className="inline-block rounded-full bg-[#244B38] text-white px-3 py-1 text-xs font-semibold uppercase tracking-wider">
          Smart Farmer Production Assistant
        </span>
        <h2 className="text-xl font-bold text-[#244B38] mt-2">Data-Informed Crop Cultivation Guidance</h2>
        <p className="text-sm text-[#52765A] mt-1">
          Compare candidate crops using combined regional demand, market price signals, and weather forecasts[cite: 4].
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#52765A] mb-2">Available Land / Scale</label>
          <input
            type="text"
            value={farmSize}
            onChange={(e) => setFarmSize(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#A8B99A]/40 bg-[#F3EEDF]/40 text-[#244B38] focus:outline-none focus:ring-2 focus:ring-[#244B38]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#52765A] mb-2">Candidate Comparison</label>
          <select
            value={selectedCropFocus}
            onChange={(e) => setSelectedCropFocus(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#A8B99A]/40 bg-[#F3EEDF]/40 text-[#244B38] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#244B38]"
          >
            <option value="Soybeans vs Cowpeas">Soybeans vs. Cowpeas</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {currentRecs.map((rec, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-[#F3EEDF]/50 border border-[#A8B99A]/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#244B38] text-lg">{rec.cropName}</h3>
                <span className="text-xs font-semibold bg-[#244B38] text-white px-2.5 py-1 rounded-full">
                  {rec.suitabilityScore}
                </span>
              </div>
              <p className="text-sm text-[#52765A] leading-relaxed"><strong>Reasoning:</strong> {rec.reasoning}</p>
            </div>
            <div className="pt-4 border-t border-[#A8B99A]/30 text-xs space-y-1 text-[#244B38]">
              <p><strong>Demand:</strong> {rec.estimatedDemand}</p>
              <p><strong>Price Signal:</strong> <span className="text-[#C69A55] font-semibold">{rec.priceTrend}</span></p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-[#244B38]/5 border border-[#244B38]/20 text-xs text-[#244B38]">
        <strong>Note:</strong> Recommendations must be checked against local agricultural extension advice and should not guarantee yield, profit, or market access[cite: 4].
      </div>
    </div>
  );
}