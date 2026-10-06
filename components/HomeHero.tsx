'use client';

import React from 'react';
import Image from 'next/image';
import { Compass, Footprints, BookOpen, ShieldCheck, Cpu, Sparkles, ArrowRight, Sun, Leaf } from 'lucide-react';
import { Mission } from '@/lib/types';
import { FIELD_MISSIONS } from '@/lib/missions';

interface HomeHeroProps {
  onStartMission: (mission?: Mission) => void;
  onOpenJournal: () => void;
  journalCount: number;
}

export function HomeHero({ onStartMission, onOpenJournal, journalCount }: HomeHeroProps) {
  const featuredMission = FIELD_MISSIONS[0];

  return (
    <div className="space-y-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl border border-emerald-900/40 bg-zinc-950/60 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        {/* Glow ambient effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-700/50 shadow-inner">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Built for the &ldquo;Touch Grass&rdquo; Outdoor Movement</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              The AI that tells you to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                put your phone away.
              </span>
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-xl">
              Most AI apps trap you in front of a screen. <strong className="text-emerald-300 font-semibold">GemTrail</strong> is different. It sends you outside on 5-minute field missions, coaches your natural observation skills, and helps you document the minerals, stones, and textures right outside your door.
            </p>

            {/* Three Pillar Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-left">
                <div className="text-lg mb-1">🌿</div>
                <div className="font-semibold text-xs text-emerald-300">1. Go Outside</div>
                <div className="text-[11px] text-zinc-400">Step away from your screen into fresh air</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-left">
                <div className="text-lg mb-1">🔎</div>
                <div className="font-semibold text-xs text-amber-300">2. Observe Closely</div>
                <div className="text-[11px] text-zinc-400">Inspect facets, strata, textures & colors</div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-left">
                <div className="text-lg mb-1">📝</div>
                <div className="font-semibold text-xs text-teal-300">3. Record & Learn</div>
                <div className="text-[11px] text-zinc-400">Gemma 3 guides your next discovery</div>
              </div>
            </div>

            {/* Main Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                id="hero-start-mission-btn"
                onClick={() => onStartMission(featuredMission)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-zinc-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:opacity-95 transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
              >
                <Compass className="w-5 h-5 text-zinc-950" />
                <span>Start Field Mission</span>
                <ArrowRight className="w-4 h-4 ml-0.5 text-zinc-950" />
              </button>

              <button
                id="hero-open-journal-btn"
                onClick={onOpenJournal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-zinc-200 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 transition-all hover:border-zinc-500 active:scale-[0.98]"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>My Field Journal</span>
                {journalCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {journalCount} finds
                  </span>
                )}
              </button>
            </div>

            {/* Local AI Credential Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Gemma 3 1B on Ollama</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>100% Private Local Storage</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Zero Cloud Cloud Keys Needed</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-800/40 shadow-2xl group">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/hero-banner.jpg"
                  alt="Outdoor Field Journal on Mossy Boulder"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
              </div>

              {/* Overlay card info */}
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-600/40 backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Observation Coaching</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Not a Gemologist. A Curiosity Catalyst.
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-2">
                  GemTrail doesn&apos;t guess false mineral names from photos. It coaches you to check cleavage, banding, and sunlight glints with your own eyes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Mission Showcase Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Footprints className="w-5 h-5 text-emerald-400" />
              Outdoor Field Missions
            </h2>
            <p className="text-xs text-zinc-400">
              Pick a quick 5-minute activity before stepping outside
            </p>
          </div>
          <button
            onClick={() => onStartMission()}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 hover:underline"
          >
            <span>View all {FIELD_MISSIONS.length} missions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FIELD_MISSIONS.slice(0, 3).map((mission) => (
            <div
              key={mission.id}
              className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/40 font-medium">
                    {mission.durationMinutes} min outdoor
                  </span>
                  <span className="text-zinc-400 font-mono text-[11px]">
                    {mission.difficulty}
                  </span>
                </div>
                <h3 className="font-bold text-base text-zinc-100 group-hover:text-emerald-300">
                  {mission.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {mission.description}
                </p>
              </div>

              <button
                onClick={() => onStartMission(mission)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-200 border border-emerald-700/40 transition-colors"
              >
                <span>Select Mission</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
