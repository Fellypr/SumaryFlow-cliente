"use client";
import { Search, Loader2 } from "lucide-react";
import SummaryItem from "./SummaryItem";
import { useSummary } from "../../hooks/useSummary";

export default function RecentSummaries() {
  const { summarize, setTitle, title, isFetching, loading } = useSummary();

  const formatDate = (value: string) =>
    new Date(value).toLocaleString("pt-BR", {
      dateStyle: "short",
    });

  return (
    <div className="rounded-xl bg-neutral-800/50 border border-neutral-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-700">
        <h3 className="text-white font-medium">Recent Summaries</h3>
      </div>
      <div className="p-3 space-y-1">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por titulo (deixe vazio para recentes)"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-neutral-900/70 border border-neutral-600 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-colors"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {!isFetching && summarize.length === 0 && (
          <p className="text-xs text-neutral-400 mb-2">
            Nenhum resumo encontrado.
          </p>
        )}

        {loading && (
          <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-700/30 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-lg shrink-0 flex items-center justify-center bg-neutral-700 border border-neutral-600 animate-pulse"></div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium truncate bg-neutral-700 animate-pulse rounded-sm">
                ­
              </div>
              <div className="w-19 text-sm text-gray-400 truncate bg-neutral-700 animate-pulse rounded-sm h-3 mt-1.5">
                ­
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-1.5">
              <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
              <span className="text-sm text-gray-400">Processing</span>
            </div>
          </div>
        )}
        
        {summarize.map((item, index) => (
          <>
            <SummaryItem
              key={`${item.title}-${item.dateCreateSumary}-${index}`}
              title={item.title}
              thumbnaiUrl={item.thumbnaiUrl}
              metadata={formatDate(item.dateCreateSumary)}
              item={item}
            />
          </>
        ))}
      </div>
    </div>
  );
}
