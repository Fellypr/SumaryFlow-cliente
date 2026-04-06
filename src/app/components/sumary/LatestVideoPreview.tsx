"use client";
import { Play, Calendar } from "lucide-react";
import { useSummary } from "../../hooks/useSummary";
import { useState, useEffect } from "react";
import { GeminiServiceUserResult } from "@/app/services/summaryService";
export default function LatestVideoPreview() {
  const {sumarizeActive, summarize} = useSummary();
  
  const latestVideo = sumarizeActive ?? summarize[0] ?? null;

  const formatDate = (value: string) =>
    new Date(value).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  return (
    <div className="rounded-xl bg-neutral-800/50 border border-neutral-700/60 overflow-hidden shadow-lg shadow-black/20">
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-700/60 bg-neutral-800/30">
        <h3 className="text-neutral-100 font-semibold flex items-center gap-2.5">
          <span className="w-1.5 h-5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
          Vídeo Mais Recente
        </h3>
      </div>
      
      {latestVideo ? (
        <div className="relative aspect-video w-full overflow-hidden group cursor-pointer bg-neutral-900">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage: `url("${latestVideo?.thumbnaiUrl}")`,
            }}
          />
          
          <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-900/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
            <div className="space-y-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out"> 
              <h4 className="text-xl sm:text-2xl font-bold text-white leading-tight line-clamp-2 drop-shadow-lg">
                {latestVideo?.title}
              </h4>
              
              <div className="flex items-center gap-3 text-sm text-neutral-300 font-medium">
                <span className="flex items-center gap-1.5 drop-shadow-md">
                  <Calendar className="w-4 h-4 opacity-80" />
                  {formatDate(latestVideo?.dateCreateSumary)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center flex flex-col items-center justify-center space-y-4 bg-neutral-800/20 aspect-video">
          <div className="w-14 h-14 rounded-full bg-neutral-800/80 border border-neutral-700/50 flex items-center justify-center">
            <Play className="w-6 h-6 text-neutral-500" />
          </div>
          <p className="text-neutral-400 font-medium text-sm">
            Nenhum vídeo recente disponível.
          </p>
        </div>
      )}
    </div>
  );
}
