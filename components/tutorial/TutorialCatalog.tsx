import { useState } from 'react';
import { Tutorial } from '@/types/tutorial';

interface CatalogProps {
  tutorials: Tutorial[];
  onSelectTutorial: (tutorial: Tutorial) => void;
}

export default function TutorialCatalog({ tutorials, onSelectTutorial }: CatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Preparation', 'Cooking', 'Storage', 'Nutrition'];

  const filteredTutorials = selectedCategory === 'All' 
    ? tutorials 
    : tutorials.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat 
                ? 'bg-emerald-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tutorial) => (
          <div 
            key={tutorial.id}
            onClick={() => onSelectTutorial(tutorial)}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
          >
            <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
              <span className="text-white text-xs bg-black/60 px-2 py-1 rounded absolute bottom-2 right-2">
                {tutorial.duration}
              </span>
              <div className="w-12 h-12 rounded-full bg-emerald-600/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="p-4">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                {tutorial.category}
              </span>
              <h3 className="font-semibold text-gray-900 mt-1 line-clamp-1">{tutorial.title}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{tutorial.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}