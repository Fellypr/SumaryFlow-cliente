"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import mermaid from "mermaid";
import { Minus, Move, Plus, RefreshCcw, Scan } from "lucide-react";

type MermaidViewerProps = {
  chart: string;
  className?: string;
};

let mermaidInitialized = false;

function ensureMermaidInitialized() {
  if (mermaidInitialized) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    securityLevel: "loose",
    themeVariables: {
      background: "transparent",
      primaryColor: "#1e293b",       
      primaryTextColor: "#f8fafc",   
      primaryBorderColor: "#475569", 
      lineColor: "#94a3b8",          
      secondaryColor: "#0f172a",
      secondaryTextColor: "#f8fafc",
      secondaryBorderColor: "#334155",
      tertiaryColor: "#1e293b",
      tertiaryTextColor: "#f8fafc",
      tertiaryBorderColor: "#475569",
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    flowchart: {
      useMaxWidth: false,
      htmlLabels: true,
      curve: "linear", 
      padding: 20,
      nodeSpacing: 50,
      rankSpacing: 60,
    },
  });
  mermaidInitialized = true;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function MermaidViewer({ chart, className }: MermaidViewerProps) {
  const renderId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgWrapRef = useRef<HTMLDivElement | null>(null);

  const [svg, setSvg] = useState<string>("");
  const [renderError, setRenderError] = useState<string | null>(null);

  const transformRef = useRef({ x: 0, y: 0, scale: 1 });

  const gestureRef = useRef<{
    isPanning: boolean;
    pointerId: number | null;
    startX: number;
    startY: number;
    startTx: number;
    startTy: number;
  }>({
    isPanning: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    startTx: 0,
    startTy: 0,
  });

  const hasChart = useMemo(() => chart.trim().length > 0, [chart]);

  const applyTransform = (instant = false) => {
    const wrap = svgWrapRef.current;
    if (!wrap) return;
    const svgEl = wrap.querySelector("svg");
    if (!svgEl) return;

    const { x, y, scale } = transformRef.current;

    svgEl.style.transformOrigin = "0 0";
    svgEl.style.transition = instant ? "none" : "transform 0.2s cubic-bezier(0.2, 0, 0, 1)";
    svgEl.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    svgEl.style.cursor = gestureRef.current.isPanning ? "grabbing" : "grab";
  };

  useEffect(() => {
    if (!hasChart) {
      setSvg("");
      setRenderError(null);
      transformRef.current = { x: 0, y: 0, scale: 1 };
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        ensureMermaidInitialized();
        setRenderError(null);

        const { svg: nextSvg } = await mermaid.render(`mmd-${renderId.replace(/:/g, '')}`, chart);
        if (cancelled) return;
        setSvg(nextSvg);

        transformRef.current = { x: 0, y: 0, scale: 1 };
        setTimeout(() => applyTransform(true), 50); 
      } catch (e) {
        if (cancelled) return;
        setSvg("");
        setRenderError(e instanceof Error ? e.message : "Falha ao renderizar.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, hasChart, renderId]);

  const zoomTo = (nextScale: number, anchor?: { x: number; y: number }) => {
    const container = containerRef.current;
    if (!container) return;

    const minScale = 0.35;
    const maxScale = 2.75;
    const clamped = clamp(nextScale, minScale, maxScale);

    if (!anchor) {
      transformRef.current.scale = clamped;
    } else {
      const ratio = clamped / transformRef.current.scale;
      transformRef.current.x = anchor.x - (anchor.x - transformRef.current.x) * ratio;
      transformRef.current.y = anchor.y - (anchor.y - transformRef.current.y) * ratio;
      transformRef.current.scale = clamped;
    }
    
    applyTransform(false); 
  };

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const anchor = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const delta = e.deltaY;
    const intensity = e.ctrlKey ? 0.02 : 0.0015;
    const next = transformRef.current.scale * Math.exp(-delta * intensity);
    
    zoomTo(next, anchor);
  };

  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (e.button !== 0) return;
    const container = containerRef.current;
    if (!container) return;

    container.setPointerCapture(e.pointerId);
    gestureRef.current.isPanning = true;
    gestureRef.current.pointerId = e.pointerId;
    gestureRef.current.startX = e.clientX;
    gestureRef.current.startY = e.clientY;
    gestureRef.current.startTx = transformRef.current.x;
    gestureRef.current.startTy = transformRef.current.y;
    applyTransform(true); 
  };

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!gestureRef.current.isPanning) return;
    if (gestureRef.current.pointerId !== e.pointerId) return;

    const dx = e.clientX - gestureRef.current.startX;
    const dy = e.clientY - gestureRef.current.startY;
    
    transformRef.current.x = gestureRef.current.startTx + dx;
    transformRef.current.y = gestureRef.current.startTy + dy;
    
    requestAnimationFrame(() => applyTransform(true));
  };

  const endPan = (e: React.PointerEvent<HTMLDivElement>) => {
    if (gestureRef.current.pointerId !== e.pointerId) return;
    gestureRef.current.isPanning = false;
    gestureRef.current.pointerId = null;
    applyTransform(true);
  };

  const reset = () => {
    transformRef.current = { x: 0, y: 0, scale: 1 };
    applyTransform(false);
  };

  const fit = () => {
    const container = containerRef.current;
    const wrap = svgWrapRef.current;
    if (!container || !wrap) return;
    const svgEl = wrap.querySelector("svg");
    if (!svgEl) return;

    const bbox = svgEl.getBBox();
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    if (cw <= 0 || ch <= 0 || bbox.width <= 0 || bbox.height <= 0) return;

    const padding = 40;
    const s = clamp(
      Math.min((cw - padding) / bbox.width, (ch - padding) / bbox.height),
      0.35,
      2.2,
    );

    const contentW = bbox.width * s;
    const contentH = bbox.height * s;
    const nextTx = (cw - contentW) / 2 - bbox.x * s;
    const nextTy = (ch - contentH) / 2 - bbox.y * s;

    transformRef.current = { x: nextTx, y: nextTy, scale: s };
    applyTransform(false);
  };

  const controls = useMemo(
    () => [
      { key: "zoomOut", label: "Diminuir zoom", icon: Minus, onClick: () => zoomTo(transformRef.current.scale / 1.15) },
      { key: "zoomIn", label: "Aumentar zoom", icon: Plus, onClick: () => zoomTo(transformRef.current.scale * 1.15) },
      { key: "fit", label: "Ajustar ao quadro", icon: Scan, onClick: fit },
      { key: "reset", label: "Resetar posição", icon: RefreshCcw, onClick: reset },
    ],
    []
  );

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Move className="h-4 w-4" />
          <span>Scroll para zoom, arraste para mover</span>
        </div>

        <div className="flex items-center gap-2">
          {controls.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={c.onClick}
              aria-label={c.label}
              className="inline-flex items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/70 px-2.5 py-2 text-neutral-200 shadow-sm transition hover:border-neutral-700 hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
            >
              <c.icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPan}
        onPointerCancel={endPan}
        onPointerLeave={(e) => endPan(e)}
        className="mt-4 relative h-[420px] md:h-[520px] overflow-hidden rounded-2xl border border-neutral-800 bg-[#0b1120]"
        style={{
          touchAction: "none",
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      >
        {!hasChart ? (
          <div className="absolute inset-0 grid place-items-center p-8 text-center">
             
          </div>
        ) : renderError ? (
          <div className="absolute inset-0 grid place-items-center p-8 text-center">
            
          </div>
        ) : (
          <div
            ref={svgWrapRef}
            className="absolute inset-0 p-4"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </div>
    </div>
  );
}