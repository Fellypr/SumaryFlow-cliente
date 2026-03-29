"use client";

import Navbar from "../components/navbar/Navbar";
import LoadingGenerateSummary from "../components/loading/loadingGenerateSummary";
import {
  LatestVideoPreview,
  SummaryActivity,
  RecentSummaries,
} from "../components/sumary";
import { Youtube, ExternalLink, Sparkles } from "lucide-react";
import { useSummary } from "../hooks/useSummary";
import { useEffect} from "react";
import { useRouter} from "next/navigation";
import { parseCookies } from "nookies";
import {
  AUTH_TOKEN_COOKIE_KEY,
  clearAuthTokenCookie,
  isAuthTokenValid,
} from "../utils/authToken";
import MessageLogout from "../components/message/messageLogout";

export default function Sumary() {
  const { urlVideo, setUrlVideo, SubmitVideoUrl, loading } = useSummary();

  const router = useRouter();

  useEffect(() => {
    const token = parseCookies()[AUTH_TOKEN_COOKIE_KEY];
    if (!isAuthTokenValid(token)) {
      clearAuthTokenCookie();
      router.replace("/");
    }
  }, [router]); 

  return (
    <div>
      <header className=" h-20 w-full flex items-center justify-center">
        <Navbar />
      </header>
      <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8">
            <div className="shrink-0 flex justify-center sm:justify-start">
              <div className="w-14 h-14 rounded-xl bg-red-600/20 flex items-center justify-center">
                <Youtube className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <div className="flex-1 min-w-0 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                Resuma um vídeo do YouTube
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Digite o URL de um vídeo do YouTube e nós o resumiremos para
                você.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 min-w-0">
                  <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Digite o URL de um vídeo do YouTube"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-neutral-800/50 border border-neutral-600 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-500 transition-colors"
                    onChange={(e) => setUrlVideo(e.target.value)}
                    value={urlVideo}
                  />
                </div>
                <div className="flex gap-2 shrink-0">
                  {loading ? (
                    <button className="flex cursor-pointer flex-1 sm:flex-none px-2 py-2 rounded-lg bg-sky-900 text-white font-medium  items-center justify-center gap-2">
                      <LoadingGenerateSummary />
                    </button>
                  ) : (
                    <button
                      className="cursor-pointer flex-1 sm:flex-none px-4 py-3 rounded-lg bg-sky-500 text-white font-medium hover:bg-sky-600 transition-colors inline-flex items-center justify-center gap-2"
                      onClick={SubmitVideoUrl}
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                      Summarize
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
        <section className="max-w-7xl mx-auto mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <LatestVideoPreview />
              <SummaryActivity />
            </div>
            <div className="lg:col-span-1">
              <RecentSummaries />
            </div>
          </div>
        </section>
      </main>
      <footer>
        <p>Footer</p>
      </footer>
      <div className="flex justify-center items-center absolute top-0 w-full h-full bg-amber-200 ">
          <MessageLogout/>
      </div>

    </div>
  );
}
