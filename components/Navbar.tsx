'use client';

import React from 'react';
import { Compass, BookOpen, Sparkles, Footprints } from 'lucide-react';
import { OllamaBadge } from './OllamaBadge';

interface NavbarProps {
  activeTab: 'home' | 'missions' | 'field-mode' | 'observation' | 'journal';
  setActiveTab: (tab: 'home' | 'missions' | 'field-mode' | 'observation' | 'journal') => void;
  journalCount: number;
}

export function Navbar({ activeTab, setActiveTab, journalCount }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-950/40 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-white animate-radar" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-lg text-emerald-400 group-hover:text-emerald-300 transition-colors">
                GemTrail
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                Gemma 3
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-none hidden sm:block">
              AI Outdoor Field Companion
            </p>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            id="nav-missions-btn"
            onClick={() => setActiveTab('missions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'missions'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Footprints className="w-4 h-4 text-emerald-400" />
            <span className="hidden xs:inline">Missions</span>
          </button>

          <button
            id="nav-journal-btn"
            onClick={() => setActiveTab('journal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              activeTab === 'journal'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Journal</span>
            {journalCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-900/80 text-emerald-300 border border-emerald-700/50">
                {journalCount}
              </span>
            )}
          </button>
        </nav>

        {/* Ollama Engine Status Pill */}
        <div className="flex items-center">
          <OllamaBadge />
        </div>
      </div>
    </header>
  );
}
