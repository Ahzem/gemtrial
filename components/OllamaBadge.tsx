'use client';

import React, { useEffect, useState } from 'react';
import { Cpu, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { OllamaHealthResponse } from '@/lib/types';

export function OllamaBadge() {
  const [health, setHealth] = useState<OllamaHealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gemtrail');
      if (res.ok) {
        const data: OllamaHealthResponse = await res.json();
        setHealth(data);
      } else {
        setHealth({
          online: false,
          model: 'gemma3:1b',
          modelsFound: [],
          message: 'Unable to connect to Ollama endpoint',
        });
      }
    } catch {
      setHealth({
        online: false,
        model: 'gemma3:1b',
        modelsFound: [],
        message: 'Ollama local server unreachable',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const isOnline = health?.online ?? false;
  const isGemmaReady = health?.online && (health?.modelsFound?.some(m => m.includes('gemma')) || health?.model?.includes('gemma'));

  return (
    <div className="relative inline-block text-xs">
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all border ${
          loading
            ? 'bg-zinc-800/80 border-zinc-700 text-zinc-400'
            : isOnline
            ? isGemmaReady
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:border-emerald-400 shadow-sm shadow-emerald-950'
              : 'bg-amber-950/60 border-amber-500/40 text-amber-300 hover:border-amber-400'
            : 'bg-zinc-900/80 border-zinc-700/60 text-zinc-300 hover:border-zinc-500'
        }`}
        title="Ollama Engine Status"
      >
        <span className="relative flex h-2 w-2">
          {isOnline && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isGemmaReady ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isOnline
                ? isGemmaReady
                  ? 'bg-emerald-500'
                  : 'bg-amber-500'
                : 'bg-zinc-500'
            }`}
          />
        </span>
        <Cpu className="w-3.5 h-3.5" />
        <span className="font-medium tracking-tight">
          {loading
            ? 'Checking Ollama...'
            : isOnline
            ? isGemmaReady
              ? 'Gemma 3 1B Active'
              : 'Ollama Connected'
            : 'Observation Coach (Offline Mode)'}
        </span>
      </button>

      {showTooltip && (
        <div className="absolute right-0 mt-2 w-72 p-3 bg-zinc-900/95 border border-zinc-700/80 rounded-xl shadow-2xl backdrop-blur-md z-50 text-zinc-200 text-xs animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-zinc-800">
            <div className="font-semibold text-zinc-100 flex items-center gap-1.5">
              {isOnline ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-400" />
              )}
              {isOnline ? 'Ollama AI Engine Connected' : 'Local Heuristic Companion Ready'}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                fetchHealth();
              }}
              className="text-zinc-400 hover:text-white p-1"
              title="Refresh connection"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <p className="text-zinc-300 leading-relaxed mb-2">
            {health?.message || 'GemTrail uses Gemma 3 1B on Ollama for private on-device analysis.'}
          </p>

          {!isOnline && (
            <div className="bg-zinc-950/70 p-2 rounded border border-zinc-800 font-mono text-[11px] text-emerald-400">
              ollama run gemma3:1b
            </div>
          )}

          <div className="mt-2 text-[10px] text-zinc-400">
            {isOnline
              ? '100% private. Your outdoor discoveries never leave your device.'
              : 'Offline heuristic coach handles observations seamlessly even without Ollama running.'}
          </div>
        </div>
      )}
    </div>
  );
}
