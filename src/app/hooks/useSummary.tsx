"use client";

import { GeminiServiceUserResult, SummaryServices } from "../services/summaryService";
import { parseApiError } from "../errors/apiError";
import { useCallback, useState } from "react";



export const useSummary = () =>{
    const [urlVideo, setUrlVideo] = useState<string>("");
    const [title,setTitle] = useState<string>("");
    const [error ,setError] = useState<string | null>(null);
    const [success, setIsSuccess] = useState<string | null>(null);
    const [loading,setLoading] = useState<boolean>(false);
    const [isFetching ,setIsFetching] = useState<boolean> (false);
    const [summarize , setSummarize] = useState<GeminiServiceUserResult[]>([]);


    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    async function SubmitVideoUrl (e:React.FormEvent){
        e.preventDefault();
        setLoading(true)
        try{
            const response = await SummaryServices.registerSummry({videoUrl: urlVideo})
            await sleep(5000)
            setIsSuccess("Summary feito com sucesso")
            setUrlVideo("")
            return response;

        }catch(err:unknown){
            const msg = parseApiError(err)
            setError(msg.message)
        }finally{
            setLoading(false);
        }

    }

    const showErrorTemporarily = useCallback((message: string, ms = 4000) => {
        setError(message);
        setTimeout(() => setError(null), ms);
    }, []);

    const GetSummaries = useCallback(async (idUser: number, searchTitle?: string) => {
        setIsFetching(true);
        try{
            const normalizedTitle = (searchTitle ?? title).trim();
            const response = await SummaryServices.getSummary({
                idUser,
                ...(normalizedTitle ? { title: normalizedTitle } : {}),
            });
            setSummarize(response);
            console.log(response);
            return response;
        }catch(err:unknown){
            const msg = parseApiError(err)
            showErrorTemporarily(msg.message,6000)
            return [];
        }finally{
            setIsFetching(false);
        }
    }, [title, showErrorTemporarily]);

    return{
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
    }
}
