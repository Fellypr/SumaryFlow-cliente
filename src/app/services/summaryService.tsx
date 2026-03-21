import { api } from "./api";

export interface VideoSummary {
  idVideo: number;
  codeVideoId: string;
  title: string;
  thumbnaiUrl: string;
  transcript: string;
  textGemini: string;
  mindMap: string | null;
  dateCreateSumary: string;
  idUser: number;
}

export interface GeminiServiceUserResult {
  summary: string;
  mindMap: string | null;
}

export type GetGeminiServiceUserParams = {
  idUser: number;
  title?: string;
};


export type SummarizeRequest = {
  videoUrl: string;
};

export const SummaryServices = {
  registerSummry: async (body: SummarizeRequest) => {
    const { data } = await api.post<VideoSummary>(
      "/VideoSummary/summarize",
      body,
    );
    return data;
  },
  getSummary: async ({ idUser, title }: GetGeminiServiceUserParams) => {
    const { data } = await api.get<GeminiServiceUserResult>(
      "/VideoSummary/get-gemini-service-user",
      { params: { idUser, ...(title ? { title } : {}) } },
    );
    return data;
  },
};
