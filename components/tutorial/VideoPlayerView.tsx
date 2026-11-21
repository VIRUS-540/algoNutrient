import Link from 'next/link';
import { Tutorial } from '@/types/tutorial';

interface PlayerViewProps {
  tutorial: Tutorial;
  onBack: () => void;
}

export default function VideoPlayerView({ tutorial, onBack }: PlayerViewProps) {
  return (
    <div className="space-y-6">
      <button 
        onClick={onBack}
        className="inline-flex items-center text-sm font-medium text-[#52765A] hover:text-[#244B38] transition-colors cursor-pointer"
      >
        ← Back to Tutorials
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Video & Details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={tutorial.videoUrl}
              title={tutorial.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#A8B99A]/35 shadow-xs">
            <span className="text-xs font-semibold bg-[#244B38] text-white px-3 py-1 rounded-full uppercase tracking-wider">
              {tutorial.category}
            </span>
            <h1 className="text-2xl font-bold text-[#244B38] mt-3">{tutorial.title}</h1>
            <p className="text-[#52765A] mt-2 leading-relaxed">{tutorial.description}</p>
          </div>
        </div>

        {/* Sidebar: Transcripts & Context Links */}
        <div className="bg-white p-6 rounded-2xl border border-[#A8B99A]/35 shadow-xs space-y-6">
          <div>
            <h3 className="font-bold text-[#244B38] text-sm uppercase tracking-wider">Key Takeaways</h3>
            <p className="text-sm text-[#52765A] mt-2 leading-relaxed">
              {tutorial.transcriptSummary || "Review step-by-step instructions for proper soaking, boiling times, and flavor pairings for local alternative protein recipes."}
            </p>
          </div>

          {tutorial.ingredientTarget && (
            <div className="pt-4 border-t border-[#F3EEDF]">
              <h3 className="font-bold text-[#244B38] text-sm uppercase tracking-wider">Related Ingredient</h3>
              <div className="mt-2 p-3.5 bg-[#F3EEDF]/60 rounded-xl border border-[#A8B99A]/40 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#244B38]">{tutorial.ingredientTarget}</span>
                <Link 
                  href="/dashboard"
                  onClick={() => {
                    // Optional: store tab preference if you handle tab routing via query/localStorage
                    localStorage.setItem("preferredDashboardTab", "go-altpro");
                  }}
                  className="text-xs text-[#C69A55] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>View in Marketplace</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}