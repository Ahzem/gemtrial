'use client';

import React from 'react';
import {
  Mountain,
  Sparkles,
  Sun,
  Compass,
  Droplets,
  Eye,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { Mission } from '@/lib/types';

interface MissionCardProps {
  mission: Mission;
  isSelected?: boolean;
  onSelect: (mission: Mission) => void;
  onStartDirectly?: (mission: Mission) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Mountain: <Mountain className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Sun: <Sun className="w-5 h-5" />,
  Compass: <Compass className="w-5 h-5" />,
  Droplets: <Droplets className="w-5 h-5" />,
  Eye: <Eye className="w-5 h-5" />,
};

export function MissionCard({ mission, isSelected, onSelect, onStartDirectly }: MissionCardProps) {
  const icon = ICON_MAP[mission.iconName] || <Compass className="w-5 h-5" />;

  return (
    <div
      onClick={() => onSelect(mission)}
      className={`relative cursor-pointer rounded-2xl p-5 transition-all border ${
        isSelected
          ? 'bg-emerald-950/70 border-emerald-400 shadow-xl shadow-emerald-900/30 ring-1 ring-emerald-400/50'
          : 'glass-panel glass-panel-hover'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-900/50 border border-emerald-700/40 text-emerald-300">
            {icon}
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">
              {mission.category}
            </span>
            <h3 className="text-base font-bold text-white leading-tight">
              {mission.title}
            </h3>
          </div>
        </div>

        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 shrink-0">
          {mission.difficulty}
        </span>
      </div>

      <p className="text-xs text-zinc-300 mb-4 leading-relaxed">
        {mission.description}
      </p>

      {/* Checklist Preview */}
      <div className="space-y-1.5 mb-4 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
        <div className="text-[11px] font-semibold text-emerald-300 flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span>Look closely for:</span>
        </div>
        <ul className="text-[11px] text-zinc-400 space-y-1 pl-1">
          {mission.checklist.slice(0, 3).map((item, idx) => (
            <li key={idx} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-500/70 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Field Tip notice */}
      <div className="text-[11px] text-amber-300/90 bg-amber-950/30 p-2.5 rounded-lg border border-amber-800/30 flex items-start gap-1.5 mb-4">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
        <span className="leading-snug">{mission.fieldTip}</span>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-xs">
        <div className="flex items-center gap-1.5 text-zinc-400">
          <Clock className="w-3.5 h-3.5 text-zinc-400" />
          <span>{mission.durationMinutes} min outdoor timer</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onStartDirectly) {
              onStartDirectly(mission);
            } else {
              onSelect(mission);
            }
          }}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold transition-transform active:scale-95 text-xs shadow-md shadow-emerald-500/20"
        >
          <span>Start Field Mode</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
