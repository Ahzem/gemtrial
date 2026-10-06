'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Pause,
  Play,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Sun,
  Shield,
  Volume2,
  VolumeX,
  Compass,
} from 'lucide-react';
import { Mission } from '@/lib/types';

interface FieldModeScreenBreakProps {
  mission: Mission;
  onFinishObservation: () => void;
  onExit: () => void;
}

export function FieldModeScreenBreak({
  mission,
  onFinishObservation,
  onExit,
}: FieldModeScreenBreakProps) {
  const [totalSeconds, setTotalSeconds] = useState(mission.durationMinutes * 60);
  const [remainingSeconds, setRemainingSeconds] = useState(mission.durationMinutes * 60);
  const [isActive, setIsActive] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);

  // Play gentle chime when timer expires
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = audioContextRef.current || new AudioCtx();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.3); // E5

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Audio not permitted or supported
    }
  };

  useEffect(() => {
    setTotalSeconds(mission.durationMinutes * 60);
    setRemainingSeconds(mission.durationMinutes * 60);
    setHasStarted(true);
    setIsActive(true);
  }, [mission]);

  // Timer countdown
  useEffect(() => {
    if (!isActive || !hasStarted || remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          playChime();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, hasStarted, remainingSeconds]);

  // Prompt rotator every 25 seconds
  useEffect(() => {
    if (!hasStarted) return;
    const interval = setInterval(() => {
      setCurrentPromptIndex((prev) => (prev + 1) % mission.prompts.length);
    }, 20000);
    return () => clearInterval(interval);
  }, [hasStarted, mission.prompts.length]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPct = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
  const isFinished = remainingSeconds === 0;

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onExit}
          className="text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 transition-colors"
        >
          ← Choose different mission
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800"
            title={soundEnabled ? 'Mute alert chime' : 'Enable alert chime'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/40 font-mono">
            FIELD MODE
          </span>
        </div>
      </div>

      {/* Main Breathing Field Screen */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden border-emerald-500/30">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-zinc-950/40 pointer-events-none" />

        {/* Mission Title */}
        <div className="space-y-2 mb-8 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/40 text-emerald-300 border border-emerald-700/40">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Active Mission: {mission.title}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Put Your Phone Away.
          </h2>

          <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
            {isFinished
              ? 'Observation time complete! Pick up your specimen and record your findings.'
              : 'Step outdoors, find your object, and spend these minutes observing without distraction.'}
          </p>
        </div>

        {/* Circular Breathing Timer */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto my-6 flex items-center justify-center">
          {/* Animated pulsing glow backdrop */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-1000 ${
              isActive && !isFinished ? 'animate-breathe' : ''
            }`}
            style={{
              background: isFinished
                ? 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 75%)',
            }}
          />

          {/* SVG Progress Ring */}
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-zinc-800/80 stroke-current"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-emerald-400 stroke-current transition-all duration-1000"
              strokeWidth="6"
              strokeDasharray={276.46}
              strokeDashoffset={276.46 - (276.46 * progressPct) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Digital Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
            <span className="font-mono text-4xl sm:text-5xl font-black text-white tracking-wider">
              {formatTime(remainingSeconds)}
            </span>
            <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-semibold">
              {isFinished ? 'Time Finished' : isActive ? 'Observing Outdoors' : 'Timer Paused'}
            </span>
          </div>
        </div>

        {/* Ambient Coaching Prompt */}
        <div className="relative z-10 my-6 p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 max-w-md mx-auto text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-1">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Field Prompt:</span>
          </div>
          <p className="text-xs text-zinc-200 leading-relaxed italic">
            &ldquo;{mission.prompts[currentPromptIndex] || mission.tagline}&rdquo;
          </p>
        </div>

        {/* Timer Control Bar */}
        <div className="flex items-center justify-center gap-3 relative z-10 mb-8">
          <button
            onClick={() => setIsActive(!isActive)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 transition-colors"
          >
            {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isActive ? 'Pause Timer' : 'Resume'}</span>
          </button>

          <button
            onClick={() => setRemainingSeconds((prev) => prev + 60)}
            className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors"
            title="Add 1 minute"
          >
            <span>+1 Min</span>
          </button>

          <button
            onClick={() => {
              setRemainingSeconds(mission.durationMinutes * 60);
              setIsActive(true);
            }}
            className="p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800"
            title="Reset timer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* The Action Button: "I'm Back" */}
        <div className="pt-2 relative z-10">
          <button
            id="field-mode-back-btn"
            onClick={onFinishObservation}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold transition-all shadow-xl ${
              isFinished
                ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-zinc-950 shadow-emerald-500/30 scale-105 animate-pulse'
                : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-emerald-950/40'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>I&apos;m Back — Record Field Observation</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Outdoor reminders */}
        <div className="grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-zinc-800/80 text-left text-xs text-zinc-400">
          <div className="flex items-start gap-2">
            <Sun className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>Hold specimen at angle in bright natural light for sparkle tests</span>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Practice Leave No Trace: leave surrounding wildlife undisturbed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
