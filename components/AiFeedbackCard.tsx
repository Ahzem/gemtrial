'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  Compass,
  ArrowRight,
  ShieldCheck,
  Eye,
  AlertTriangle,
  RotateCcw,
  Copy,
  Check,
} from 'lucide-react';
import { AiFeedback, ObservationData, Mission } from '@/lib/types';

interface AiFeedbackCardProps {
  feedback: AiFeedback;
  observation: ObservationData;
  mission?: Mission;
  onSaveToJournal: () => void;
  onStartAnother: () => void;
  isSaved: boolean;
}

export function AiFeedbackCard({
  feedback,
  observation,
  mission,
  onSaveToJournal,
  onStartAnother,
  isSaved,
}: AiFeedbackCardProps) {
  const [copied, setCopied] = useState(false);

  const handleSaveWithCelebration = () => {
    onSaveToJournal();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#10b981', '#34d399', '#f59e0b', '#14b8a6'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleCopyNotes = () => {
    const text = `GemTrail Field Observation: ${observation.objectName || 'Natural Specimen'}
Mission: ${mission?.title || 'Outdoor Discovery'}
Date: ${new Date().toLocaleDateString()}
Colors: ${observation.color}
Texture: ${observation.texture}
Patterns: ${observation.shapePattern || 'N/A'}

AI Observation Coach (Gemma 3 1B):
${feedback.summary}

Possibilities: ${feedback.scientificPossibilities}
Next Observation: ${feedback.nextObservation}
Field Tip: ${feedback.fieldTip}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/40">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>GemTrail AI Feedback</span>
        </div>

        <button
          onClick={handleCopyNotes}
          className="text-xs text-zinc-400 hover:text-white px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-1.5 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied to Clipboard' : 'Copy Field Notes'}</span>
        </button>
      </div>

      {/* Main Analysis Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border-emerald-500/30 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Specimen Header */}
        <div className="border-b border-zinc-800/80 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-400">
                {mission?.title || 'Field Discovery'}
              </span>
              <h2 className="text-2xl font-black text-white mt-0.5">
                {observation.objectName || 'Field Specimen'}
              </h2>
            </div>
            {feedback.latencyMs && (
              <span className="text-[11px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 shrink-0">
                {feedback.latencyMs}ms
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
            <span>🌿 GemTrail&apos;s Thoughts</span>
          </h3>
          <p className="text-zinc-200 text-sm sm:text-base leading-relaxed bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/80">
            {feedback.summary}
          </p>
        </div>

        {/* Observations Detected */}
        {feedback.observationsDetected && feedback.observationsDetected.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-zinc-400">What You Noticed:</h4>
            <div className="flex flex-wrap gap-2">
              {feedback.observationsDetected.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs bg-zinc-900 text-zinc-300 border border-zinc-700/80"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Scientific Possibilities */}
        <div className="space-y-2 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 p-4 rounded-2xl border border-zinc-800">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Geological & Natural Possibilities:</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {feedback.scientificPossibilities}
          </p>
          <div className="pt-2 flex items-center gap-1.5 text-[11px] text-zinc-400 italic">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>{feedback.confidenceNotice}</span>
          </div>
        </div>

        {/* Next Physical Observation (Outside!) */}
        <div className="space-y-2 bg-emerald-950/40 p-4 rounded-2xl border border-emerald-700/40">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>🔎 Next Observation to Make Outside:</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
            {feedback.nextObservation}
          </p>
        </div>

        {/* Field Tip */}
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/30 text-amber-200/90 text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-snug">
            <strong className="font-semibold text-amber-300">Field Tip: </strong>
            {feedback.fieldTip}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3 border-t border-zinc-800/80">
          <button
            id="feedback-save-journal-btn"
            onClick={handleSaveWithCelebration}
            disabled={isSaved}
            className={`flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm transition-all shadow-lg ${
              isSaved
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 cursor-default'
                : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-emerald-500/20 active:scale-[0.98]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{isSaved ? 'Saved in Field Journal ✓' : 'Add to Field Journal'}</span>
          </button>

          <button
            onClick={onStartAnother}
            className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Next Mission</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
