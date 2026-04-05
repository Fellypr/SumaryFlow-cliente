"use client";

import React, { createContext, useState, useCallback, ReactNode, useContext, useEffect } from "react";
import { GeminiServiceUserResult, SummaryServices } from "../app/services/summaryService";
import { parseApiError } from "../app/errors/apiError";
import { AuthContext } from "./AuthContext";

interface SummaryContextData {
    urlVideo: string;
    title: string;
    summarize: GeminiServiceUserResult[];
    setUrlVideo: (val: string) => void;
    setTitle: (val: string) => void;
    error: string | null;
    success: string | null;
    loading: boolean;
    isFetching: boolean;
    SubmitVideoUrl: (e: React.FormEvent) => Promise<any>;
    GetSummaries: (idUserParam?: number, searchTitle?: string) => Promise<any>;
}

export const SummaryContext = createContext({} as SummaryContextData);

export const SummaryProvider = ({ children }: { children: ReactNode }) => {
    const { idUser } = useContext(AuthContext);

    const [urlVideo, setUrlVideo] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setIsSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [summarize, setSummarize] = useState<GeminiServiceUserResult[]>([]);

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const showErrorTemporarily = useCallback((message: string, ms = 4000) => {
        setError(message);
        setTimeout(() => setError(null), ms);
    }, []);

    const GetSummaries = useCallback(async (idUserParam?: number, searchTitle?: string) => {
        const targetIdUser = idUserParam || idUser;
        if (!targetIdUser) return [];

        setIsFetching(true);
        try {
            const normalizedTitle = (searchTitle ?? title).trim();
            const response = await SummaryServices.getSummary({
                idUser: targetIdUser,
                ...(normalizedTitle ? { title: normalizedTitle } : {}),
            });
            setSummarize(response);
            return response;
        } catch (err: unknown) {
            const msg = parseApiError(err);
            showErrorTemporarily(msg.message, 6000);
            return [];
        } finally {
            setIsFetching(false);
        }
    }, [idUser, title, showErrorTemporarily]);

    async function SubmitVideoUrl(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await SummaryServices.registerSummry({ videoUrl: urlVideo });
            await sleep(5000); 
            setIsSuccess("Summary feito com sucesso");
            setUrlVideo("");
            
            if (idUser) {
              await GetSummaries(idUser);
            }

            return response;
        } catch (err: unknown) {
            const msg = parseApiError(err);
            setError(msg.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (!idUser) return;
        const timer = setTimeout(() => {
            GetSummaries(idUser, title);
        }, 500);
        return () => clearTimeout(timer);
    }, [idUser, title, GetSummaries]);


    return (
        <SummaryContext.Provider
            value={{
                urlVideo,
                title,
                summarize,
                setUrlVideo,
                setTitle,
                error,
                success,
                loading,
                isFetching,
                SubmitVideoUrl,
                GetSummaries
            }}
        >
            {children}
        </SummaryContext.Provider>
    );
};
