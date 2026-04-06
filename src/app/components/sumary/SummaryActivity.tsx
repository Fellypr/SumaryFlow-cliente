"use client";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import {
  AUTH_TOKEN_COOKIE_KEY,
  getUserIdFromToken,
  isAuthTokenValid,
} from "../../utils/authToken";
import { useSummary } from "@/app/hooks/useSummary";

interface ParsedSection {
  title: string;
  items: string[];
}

export default function SummaryActivity() {
  const [idUser, setIdUser] = useState<number | null>(null);
  const { summarize, title, GetSummaries, sumarizeActive } = useSummary();

  useEffect(() => {
    const token = parseCookies()[AUTH_TOKEN_COOKIE_KEY];
    const nextId =
      token && isAuthTokenValid(token) ? getUserIdFromToken(token) : null;
    queueMicrotask(() => setIdUser(nextId));
  }, []);

  useEffect(() => {
    if (!idUser) return;

    const timer = setTimeout(() => {
      GetSummaries(idUser, title);
    }, 350);
    return () => clearTimeout(timer);
  }, [idUser, title, GetSummaries]);

  const parseSummaryText = (rawText: string): ParsedSection[] => {
    if (!rawText) return [];
    const sections = rawText.split("###").filter(Boolean);

    return sections.map((section) => {
      const parts = section.split(/\s*\*\s+/).filter(Boolean);
      const sectionTitle = parts[0].trim();
      const sectionItems = parts.slice(1).map((item) => {
        return item.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      });

      return {
        title: sectionTitle,
        items: sectionItems,
      };
    });
  };

  const latestVideo = sumarizeActive ?? summarize[0] ?? null;

  return (
    <div className="flex flex-col rounded-2xl bg-neutral-900/80 backdrop-blur-md border border-neutral-800 shadow-2xl overflow-hidden transition-all duration-300 hover:border-neutral-700 w-full max-w-4xl mx-auto font-sans">
      <div className="px-6 py-4 border-b border-neutral-800 bg-linear-to-r from-neutral-900 to-neutral-800/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <svg
              className="w-5 h-5 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-white text-lg font-semibold tracking-wide">
            Linha do Tempo de Aprendizado
          </h3>
        </div>
      </div>

      <div className="p-8 min-h-[300px]">
        {!latestVideo ? (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-3 border-2 border-dashed border-neutral-800 rounded-xl bg-neutral-900/30">
            <p className="text-neutral-400 font-medium text-sm">
              Nenhuma atividade registrada.
            </p>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-neutral-800"></div>

            <div className="space-y-12">
              <div className="animate-fade-in-up">
                <h4 className="text-2xl font-bold text-white mb-10 pl-10 leading-tight">
                  {latestVideo.title || "Resumo do Conteúdo"}
                </h4>

                <div className="space-y-12">
                  {parseSummaryText(latestVideo.summary).map(
                    (section, secIndex) => (
                      <section key={secIndex} className="relative pl-10">
                        <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-neutral-900 border-2 border-blue-500 flex items-center justify-center z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        </div>

                        <h5 className="text-3xl font-bold text-blue-400 mb-3 tracking-tight">
                          {section.title}
                        </h5>

                        <div className="space-y-5">
                          {section.items.map((summaryItem, itemIndex) => {
                            const [label, ...rest] = summaryItem.split(":");
                            const description = rest.join(":").trim();

                            return (
                              <div key={itemIndex} className="relative group">
                                <div className="flex flex-col max-w-3xl">
                                  {description ? (
                                    <>
                                      <div className="absolute -left-[33px] top-2 w-2.5 h-2.5 rounded-full bg-neutral-700 border border-neutral-600 group-hover:bg-blue-500/50 transition-colors"></div>
                                      <span className="text-2xl font-bold text-neutral-100 leading-tight tracking-tight">
                                        {label.replace(/\*/g, "").trim()}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-base text-neutral-300 leading-relaxed">
                                      {summaryItem.replace(/\*/g, "").trim()}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}