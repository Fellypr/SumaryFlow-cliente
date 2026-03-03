import Link from "next/link";
import SummaryItem from "./SummaryItem";

const summaries = [
  {
    title: "Machine Learning Basics",
    metadata: "12 min ago • 45 min video",
    status: "complete" as const,
    thumbnailBg: "bg-amber-900/50",
  },
  {
    title: "UI/UX Design Principles",
    metadata: "1 hour ago • 1h 20m video",
    status: "complete" as const,
    thumbnailBg: "bg-neutral-700",
  },
  {
    title: "Node.js Crash Course",
    metadata: "3 hours ago • 2h 10m video",
    status: "complete" as const,
    thumbnailBg: "bg-neutral-700",
  },
  {
    title: "Podcast Production Tips",
    metadata: "Yesterday • 55 min video",
    status: "processing" as const,
    thumbnailBg: "bg-amber-800/30",
  },
];

export default function RecentSummaries() {
  return (
    <div className="rounded-xl bg-neutral-800/50 border border-neutral-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-700">
        <h3 className="text-white font-medium">Recent Summaries</h3>
        <Link
          href="#"
          className="text-sm text-sky-400 hover:text-sky-300 transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="p-3 space-y-1">
        {summaries.map((item) => (
          <SummaryItem
            key={item.title}
            title={item.title}
            metadata={item.metadata}
            status={item.status}
            thumbnailBg={item.thumbnailBg}
          />
        ))}
      </div>
    </div>
  );
}
