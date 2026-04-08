"use client";
import { useEffect } from 'react'
import mermaid from 'mermaid'
mermaid.initialize({
    startOnLoad: true,
    theme: "dark",
    securityLevel: "loose",
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
    }
})
export default function Mermaid({ chart }) {
    useEffect(() => {
        mermaid.contentLoaded()
    }, [chart])
    return (
        <div className='mermaid'>
            {chart}
        </div>
    )
}