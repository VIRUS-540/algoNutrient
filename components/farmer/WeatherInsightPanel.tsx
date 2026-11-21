// components/farmer/WeatherInsightPanel.tsx
'use client';

import { useState } from 'react';
import { WeatherData } from '@/types/farmer';

export default function WeatherInsightPanel() {
  const [selectedRegion, setSelectedRegion] = useState<string>('Lagos / Southwest Pilot');

  // Sample regional weather data aligned with project focus
  const weatherDataMap: Record<string, WeatherData> = {
    'Lagos / Southwest Pilot': {
      location: 'Southwest Region (Selected Pilot)',
      temperature: 28,
      rainfall: 'Moderate (120mm forecasted)',
      humidity: '82%',
      riskAlert: 'Favorable planting window for cowpeas and soybeans; monitor short-term humidity.',
      forecastSummary: 'Stable wet-season progression with standard rainfall patterns suitable for legume cultivation.'
    },
    'North-Central Region': {
      location: 'North-Central Region',
      temperature: 32,
      rainfall: 'Low (45mm forecasted)',
      humidity: '58%',
      riskAlert: 'Potential dry spell risk in early vegetative stage. Consider drought-tolerant Bambara nut options.',
      forecastSummary: 'Higher temperatures and intermittent rainfall requiring soil moisture retention strategies.'
    }
  };

  const current = weatherDataMap[selectedRegion];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#A8B99A]/35 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-block rounded-full bg-[#C69A55]/20 px-3 py-1 text-xs font-semibold text-[#C69A55] uppercase tracking-wider">
            Module D: Weather Intelligence
          </span>
          <h2 className="text-xl font-bold text-[#244B38] mt-1">Agricultural &amp; Climate Forecasting</h2>
        </div>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-[#A8B99A]/40 bg-[#F3EEDF]/40 text-[#244B38] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#244B38]"
        >
          <option value="Lagos / Southwest Pilot">Southwest Region</option>
          <option value="North-Central Region">North-Central Region</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#F3EEDF]/50 border border-[#A8B99A]/30">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#52765A]">Temperature</p>
          <p className="mt-1 text-2xl font-bold text-[#244B38]">{current.temperature}°C</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#F3EEDF]/50 border border-[#A8B99A]/30">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#52765A]">Rainfall Forecast</p>
          <p className="mt-1 text-lg font-bold text-[#244B38]">{current.rainfall}</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#F3EEDF]/50 border border-[#A8B99A]/30">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#52765A]">Humidity</p>
          <p className="mt-1 text-2xl font-bold text-[#C69A55]">{current.humidity}</p>
        </div>
      </div>

      {current.riskAlert && (
        <div className="p-4 rounded-2xl bg-[#C69A55]/10 border border-[#C69A55]/30 text-sm text-[#244B38] flex items-start gap-3">
          <span className="font-bold">⚠️ Advisory:</span>
          <span>{current.riskAlert}</span>
        </div>
      )}

      <p className="text-xs text-[#52765A] italic">
        *Weather information supports risk awareness and basic agricultural suitability guidance; it does not guarantee yield predictions[cite: 3].
      </p>
    </div>
  );
}