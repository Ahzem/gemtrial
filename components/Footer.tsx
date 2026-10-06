'use client';

import React from 'react';
import { Compass, ShieldCheck, Cpu, Heart, Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-900 bg-zinc-950/70 text-zinc-400 text-xs py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-zinc-200 flex items-center gap-1.5">
              <span>GemTrail</span>
              <span className="text-[10px] text-emerald-400 font-mono">v1.0</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              The AI that gets you outside • Powered by Gemma 3 1B
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-zinc-400">
          <div className="flex items-center gap-1 text-emerald-400/90">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero Cloud Logging</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1 text-zinc-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>Local Ollama Architecture</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1 text-teal-400">
            <Leaf className="w-3.5 h-3.5" />
            <span>Leave No Trace</span>
          </div>
        </div>

        <div className="text-[11px] text-zinc-400 text-center sm:text-right">
          <span>Crafted for real-world exploration.</span>
        </div>
      </div>
    </footer>
  );
}
