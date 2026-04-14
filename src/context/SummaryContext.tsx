"use client";

import React, { createContext, useState, useCallback, ReactNode, useContext, useEffect } from "react";
import { GeminiServiceUserResult, SummaryServices } from "../app/services/summaryService";
import { parseApiError } from "../app/errors/apiError";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

interface SummaryContextData {
    urlVideo: string;
    title: string;
    summarize: GeminiServiceUserResult[];
    setUrlVideo: (val: string) => void;
    setTitle: (val: string) => void;
    setSumarizeActive: (val: GeminiServiceUserResult | null) => void;
    sumarizeActive: GeminiServiceUserResult | null;
    loading: boolean;
    isFetching: boolean;
    SubmitVideoUrl: (e: React.FormEvent) => Promise<any>;
    GetSummaries: (idUserParam?: number, searchTitle?: string) => Promise<any>;
    handleSumarize: (item: GeminiServiceUserResult) => void;
}

export const SummaryContext = createContext({} as SummaryContextData);

export const SummaryProvider = ({ children }: { children: ReactNode }) => {
    const { idUser } = useContext(AuthContext);

    const [urlVideo, setUrlVideo] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    
    
    const [loading, setLoading] = useState<boolean>(false);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [summarize, setSummarize] = useState<GeminiServiceUserResult[]>([]);
    const [sumarizeActive, setSumarizeActive] = useState<GeminiServiceUserResult | null>(null);

    const handleSumarize =(item: GeminiServiceUserResult) => {
        setSumarizeActive(item);
    };
    useEffect(() => {
        console.log(sumarizeActive)
    },[sumarizeActive])

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
            
            return [];
        } finally {
            setIsFetching(false);
        }
    }, [idUser, title]);

    async function SubmitVideoUrl(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await SummaryServices.registerSummry({ videoUrl: urlVideo });
            toast.success("Sumário gerado com sucesso", {
                toasterId: "menssageSuccess",
            });
            setUrlVideo("");
            if (idUser) {
              await GetSummaries(idUser);
            }
            return response;
        } catch (err: unknown) {
            const msg = parseApiError(err);
            toast.error(msg.message, {
                toasterId: "menssageErro",
            });
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
                loading,
                isFetching,
                SubmitVideoUrl,
                GetSummaries,
                handleSumarize,
                sumarizeActive,
                setSumarizeActive
            }}
        >
            {children}
        </SummaryContext.Provider>
    );
};
