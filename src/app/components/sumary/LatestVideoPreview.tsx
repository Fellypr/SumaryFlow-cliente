import { Play } from "lucide-react";

export default function LatestVideoPreview() {
  return (
    <div className="rounded-xl bg-neutral-800/50 border border-neutral-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-700">
        <h3 className="text-white font-medium">Latest Video Preview</h3>
        <span className="text-gray-400 text-sm">Processing</span>
      </div>
      <div className="relative aspect-video bg-neutral-900">
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm opacity-80"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800')",
          }}
        />
        <div className="absolute inset-0 bg-neutral-900/60" />
        <button
          type="button"
          className="absolute left-4 top-4 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Play video"
        >
          <Play className="w-6 h-6 text-neutral-900 " fill="currentColor" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          <div className="text-white">
            <p className="font-medium">
              Advanced React Patterns - Full Course 2024
            </p>
            <p className="text-sm text-gray-400">
              1.2M views • 2 days ago • Code with channel
            </p>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-neutral-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: "65%" }}
              />
            </div>
            <p className="text-sm text-white text-right">65% summarized</p>
          </div>
        </div>
      </div>
    </div>
  );
}
