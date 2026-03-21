"use client";

import { SummaryServices } from "../services/summaryService";
import { parseApiError } from "../errors/apiError";
import { useState } from "react";


export const UseSummary = () =>{
    const [urlVideo, setUrlVideo] = useState<string>("");
    const [error ,setError] = useState<string | null>(null);
    const [success, setIsSuccess] = useState<string | null>(null);
    const [loading,setLoading] = useState<boolean>(false);


    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    async function SubmitVideoUrl(e:React.FormEvent){
        e.preventDefault();
        setLoading(true)
        try{
            const response = await SummaryServices.registerSummry({videoUrl: urlVideo})
            await sleep(5000)
            setIsSuccess("Summary feito com sucesso")
            setUrlVideo("")
            console.log(response)
            return response

        }catch(err:unknown){
            const msg = parseApiError(err)
            setError(msg.message)
        }finally{
            setLoading(false);
        }

    }

    return{
        urlVideo,
        setUrlVideo,
        error,
        success,
        loading,
        SubmitVideoUrl
    }
}
