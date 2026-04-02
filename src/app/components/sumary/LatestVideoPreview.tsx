"use client";
import { Play } from "lucide-react";
import { useSummary } from "../../hooks/useSummary";
import { parseCookies } from "nookies";
import {
  AUTH_TOKEN_COOKIE_KEY,
  getUserIdFromToken,
  isAuthTokenValid,
} from "../../utils/authToken";
import { useEffect, useState } from "react";
export default function LatestVideoPreview() {
  const { summarize, GetSummaries, title } = useSummary();
  const latestVideo = summarize[0];
  const [idUser, setIdUser] = useState<number | null>(null);
  console.log(latestVideo);

  useEffect(() => {
    const token = parseCookies()[AUTH_TOKEN_COOKIE_KEY];
    const nextId =
      token && isAuthTokenValid(token) ? getUserIdFromToken(token) : null;
    queueMicrotask(() => setIdUser(nextId));
  }, []);
  const formatDate = (value: string) =>
    new Date(value).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  
  useEffect(()=>{
    if (!idUser) return;

    const timer = setTimeout(() => {
      GetSummaries(idUser, title);
    },500);
    return () => clearTimeout(timer);
  }, [idUser, title, GetSummaries]);
  return (
    <div className="rounded-xl bg-neutral-800/50 border border-neutral-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-700">
        <h3 className="text-white font-medium">Video mais recente</h3>
      </div>
      {latestVideo ? (
        <>
          <div className="relative aspect-video bg-neutral-900">
            <div
              className="absolute inset-0 bg-cover bg-center  opacity-80"
              style={{
                backgroundImage:
                  `url("${latestVideo?.thumbnaiUrl}")`,
              }}
            />
            <button
              type="button"
              className="absolute left-4 top-4 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Play video"
            >
              <Play className="w-6 h-6 text-neutral-900 " fill="currentColor" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 bg-black/40 backdrop-blur-sm">
              <p className="font-medium sm:text-2xl text-white max-w-160 tracking-wide">
                {latestVideo?.title}
              </p>
              <p className="text-[17px] text-white">
                {formatDate(latestVideo?.dateCreateSumary)}
              </p>
            </div>
          </div>
          </>
        ) : (
          <div className="p-4 text-center text-neutral-400">
            Sem videos recentes.
          </div>
        )}
    </div>
  );
}
