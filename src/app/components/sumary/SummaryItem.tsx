import { Check, Loader2, Video } from "lucide-react";

interface SummaryItemProps {
  title: string;
  metadata: string;
  status: "complete" | "processing";
  thumbnailBg?: string;
}

export default function SummaryItem({
  title,
  metadata,
  status,
  thumbnailBg = "bg-neutral-700",
}: SummaryItemProps) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-700/30 transition-colors cursor-pointer">
      <div
        className={`w-12 h-12 rounded-lg shrink-0 flex items-center justify-center ${thumbnailBg} border border-neutral-600`}
      >
        <Video className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">{title}</p>
        <p className="text-sm text-gray-400 truncate">{metadata}</p>
      </div>
      <div className="shrink-0 flex items-center gap-1.5">
        {status === "complete" ? (
          <>
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-400">Complete</span>
          </>
        ) : (
          <>
            <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
            <span className="text-sm text-gray-400">Processing</span>
          </>
        )}
      </div>
    </div>
  );
}
