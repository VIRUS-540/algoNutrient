// app/tutorials/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Tutorial } from '@/types/tutorial';
import TutorialCatalog from '@/components/tutorial/TutorialCatalog';
import VideoPlayerView from '@/components/tutorial/VideoPlayerView';

// Sample mock data aligned with project scope (e.g., Soybeans, Cowpeas, Bambara nuts)
const MOCK_TUTORIALS: Tutorial[] = [
  {
    id: '1',
    title: 'How to Properly Soak and Boil Cowpeas for Maximum Digestibility',
    description: 'Learn traditional and modern techniques to reduce anti-nutrients and prepare cowpeas for plant-based meal prep.',
    category: 'Preparation',
    duration: '4:15',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    transcriptSummary: 'Rinse thoroughly, soak for at least 8 hours discarding the water, and boil under medium heat until tender.',
    ingredientTarget: 'Cowpeas (Beans)'
  },
  {
    id: '2',
    title: 'Making Fresh Soybean Milk and Okara at Home',
    description: 'A step-by-step guide on transforming raw local soybeans into nutrient-dense plant milk and functional flour sub-products.',
    category: 'Cooking',
    duration: '7:30',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    transcriptSummary: 'Blend soaked beans with clean water, strain using a nut milk bag, and boil the extract thoroughly for 20 minutes.',
    ingredientTarget: 'Soybeans'
  },
  {
    id: '3',
    title: 'Best Storage Practices to Prevent Pest Infestation in Bambara Nuts',
    description: 'Protect your harvested protein crops against moisture, humidity, and common storage pests using hermetic storage methods.',
    category: 'Storage',
    duration: '3:50',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    transcriptSummary: 'Dry seeds to under 12% moisture content and store in airtight containers in a cool, dry environment.',
    ingredientTarget: 'Bambara Nuts'
  }
];

export default function TutorialsPage() {
  const [activeTutorial, setActiveTutorial] = useState<Tutorial | null>(null);

  return (
    <div className="min-h-screen bg-[#F3EEDF] text-[#244B38] font-sans selection:bg-[#C69A55] selection:text-white">
      {/* Navigation Header with Back to Dashboard Link */}
      <header className="sticky top-0 z-50 border-b border-[#A8B99A]/30 bg-[#F3EEDF]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#244B38] font-bold tracking-tight text-[#F3EEDF]">
              aN
            </div>
            <span className="text-xl font-bold tracking-tight text-[#244B38]">
              algo<span className="text-[#52765A]">Nutrient</span>
            </span>
          </Link>

          <Link
            href="/dashboard"
            className="rounded-full border border-[#52765A]/40 bg-white px-4 py-2 text-xs font-semibold text-[#244B38] transition-colors hover:bg-[#244B38] hover:text-white cursor-pointer shadow-xs"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Banner */}
        <div className="mb-8 rounded-3xl bg-[#244B38] p-7 text-white sm:px-9 shadow-md">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#C69A55]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C69A55]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C69A55]" />
            Educational Hub
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#F3EEDF]">
            Learning &amp; Video Tutorial Hub
          </h1>
          <p className="mt-1 text-sm text-[#A8B99A]">
            Practical guides, preparation tutorials, and storage tips for local alternative protein crops.
          </p>
        </div>

        {activeTutorial ? (
          <VideoPlayerView tutorial={activeTutorial} onBack={() => setActiveTutorial(null)} />
        ) : (
          <TutorialCatalog tutorials={MOCK_TUTORIALS} onSelectTutorial={setActiveTutorial} />
        )}
      </main>
    </div>
  );
}