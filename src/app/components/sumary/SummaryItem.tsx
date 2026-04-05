import { Check} from "lucide-react";
import Image from "next/image";
interface SummaryItemProps {
  title: string;
  metadata: string;
  thumbnailBg?: string;
  thumbnaiUrl: string;
}

export default function SummaryItem({
  title,
  metadata,
  thumbnailBg = "bg-neutral-700",
  thumbnaiUrl,
}: SummaryItemProps) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-700/30 transition-colors cursor-pointer">
      <div
        className={`w-12 h-12 rounded-lg shrink-0 flex items-center justify-center ${thumbnailBg} border border-neutral-600`}
      >
        <Image src={thumbnaiUrl || ""} alt={title} className="object-cover w-full h-full" width={100} height={100} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">{title}</p>
        <p className="text-sm text-gray-400 truncate">{metadata}</p>
      </div>
      <div className="shrink-0 flex items-center gap-1.5">
          <>
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-400">Complete</span>
          </>
      </div>
    </div>
  );
}
