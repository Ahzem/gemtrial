'use client';

import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  Send,
  Loader2,
  HelpCircle,
  Tag,
  Check,
} from 'lucide-react';
import { Mission, ObservationData } from '@/lib/types';

interface ObservationFormProps {
  mission?: Mission;
  onSubmit: (data: ObservationData) => void;
  isLoading: boolean;
  onCancel: () => void;
}

const COLOR_CHIPS = ['Dark grey', 'Speckled black & white', 'Reddish-brown', 'Silvery glint', 'Creamy white', 'Olive greenish'];
const TEXTURE_CHIPS = ['Satin smooth', 'Rough sandpapery', 'Layered & flaky', 'Pitted volcanic', 'Sharp & angular', 'Waxy'];
const SHAPE_CHIPS = ['Rounded oval', 'Angular chunk', 'Flat slab', 'Veined with stripe', 'Concentric rings', 'Pebble'];
const WEIGHT_CHIPS = ['Dense & heavy', 'Moderate', 'Lightweight & porous'];

export function ObservationForm({
  mission,
  onSubmit,
  isLoading,
  onCancel,
}: ObservationFormProps) {
  const [objectName, setObjectName] = useState('');
  const [color, setColor] = useState('');
  const [texture, setTexture] = useState('');
  const [shapePattern, setShapePattern] = useState('');
  const [weightFeel, setWeightFeel] = useState('');
  const [contextLocation, setContextLocation] = useState('');
  const [unusualNotes, setUnusualNotes] = useState('');
  const [rawDescription, setRawDescription] = useState('');
  const [useFreeform, setUseFreeform] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: ObservationData = {
      missionId: mission?.id,
      missionTitle: mission?.title,
      objectName: objectName.trim() || 'Outdoor Natural Specimen',
      color: color.trim(),
      texture: texture.trim(),
      shapePattern: shapePattern.trim(),
      weightFeel: weightFeel.trim(),
      contextLocation: contextLocation.trim(),
      unusualNotes: unusualNotes.trim(),
      rawDescription: rawDescription.trim(),
      timestamp: new Date().toISOString(),
    };

    onSubmit(data);
  };

  const handleChipClick = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    current: string,
    value: string
  ) => {
    if (!current) {
      setter(value);
    } else if (current.includes(value)) {
      setter(current.replace(value, '').replace(/,\s*,/, ',').replace(/^,\s*|,\s*$/g, '').trim());
    } else {
      setter(`${current}, ${value}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Context banner */}
      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 transition-colors"
        >
          ← Back
        </button>

        {mission && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-emerald-950 text-emerald-300 border border-emerald-800/40">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mission: {mission.title}</span>
          </div>
        )}
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 border-emerald-500/20">
        <div className="mb-6 space-y-1">
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <span>What Did You Observe?</span>
          </h2>
          <p className="text-xs text-zinc-300">
            Describe what you saw and felt. Don&apos;t worry about scientific names—GemTrail is your observation coach.
          </p>
        </div>

        {/* Freeform vs Guided Toggle */}
        <div className="flex items-center justify-end gap-2 mb-4 text-xs">
          <span className="text-zinc-400">Entry mode:</span>
          <button
            type="button"
            onClick={() => setUseFreeform(false)}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              !useFreeform
                ? 'bg-emerald-900/60 text-emerald-300 font-semibold border border-emerald-700/50'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Guided Sensory
          </button>
          <button
            type="button"
            onClick={() => setUseFreeform(true)}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              useFreeform
                ? 'bg-emerald-900/60 text-emerald-300 font-semibold border border-emerald-700/50'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Quick Description
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Object Nickname */}
          <div>
            <label className="block text-xs font-semibold text-zinc-200 mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-emerald-400" />
              <span>Specimen Nickname (Optional)</span>
            </label>
            <input
              type="text"
              value={objectName}
              onChange={(e) => setObjectName(e.target.value)}
              placeholder="e.g. Speckled Backyard River Stone, Sunlight SCHIST fragment"
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            />
          </div>

          {!useFreeform ? (
            <>
              {/* Color observation */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-200">
                  1. Color & Shades <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. Dark charcoal grey with small shiny white specks"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {COLOR_CHIPS.map((chip) => {
                    const selected = color.includes(chip);
                    return (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handleChipClick(setColor, color, chip)}
                        className={`text-[11px] px-2.5 py-0.5 rounded-full border transition-all ${
                          selected
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                            : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {selected && <Check className="w-2.5 h-2.5 inline mr-1" />}
                        {chip}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Texture observation */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-200">
                  2. Surface Texture <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={texture}
                  onChange={(e) => setTexture(e.target.value)}
                  placeholder="e.g. Very smooth on top, gritty sand texture on broken edge"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {TEXTURE_CHIPS.map((chip) => {
                    const selected = texture.includes(chip);
                    return (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handleChipClick(setTexture, texture, chip)}
                        className={`text-[11px] px-2.5 py-0.5 rounded-full border transition-all ${
                          selected
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                            : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {selected && <Check className="w-2.5 h-2.5 inline mr-1" />}
                        {chip}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Shape / Pattern */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-200">
                  3. Shape & Patterns
                </label>
                <input
                  type="text"
                  value={shapePattern}
                  onChange={(e) => setShapePattern(e.target.value)}
                  placeholder="e.g. Rounded pebble with a 2mm white line running around it"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {SHAPE_CHIPS.map((chip) => {
                    const selected = shapePattern.includes(chip);
                    return (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handleChipClick(setShapePattern, shapePattern, chip)}
                        className={`text-[11px] px-2.5 py-0.5 rounded-full border transition-all ${
                          selected
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                            : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {selected && <Check className="w-2.5 h-2.5 inline mr-1" />}
                        {chip}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Weight / Feel */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-zinc-200">
                  4. Weight & Density
                </label>
                <input
                  type="text"
                  value={weightFeel}
                  onChange={(e) => setWeightFeel(e.target.value)}
                  placeholder="e.g. Quite heavy for its size, cold to the touch"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {WEIGHT_CHIPS.map((chip) => {
                    const selected = weightFeel.includes(chip);
                    return (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handleChipClick(setWeightFeel, weightFeel, chip)}
                        className={`text-[11px] px-2.5 py-0.5 rounded-full border transition-all ${
                          selected
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                            : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {selected && <Check className="w-2.5 h-2.5 inline mr-1" />}
                        {chip}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Unusual / Context */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-200 mb-1">
                    Found At / Context
                  </label>
                  <input
                    type="text"
                    value={contextLocation}
                    onChange={(e) => setContextLocation(e.target.value)}
                    placeholder="e.g. Garden path, creek bank, park lawn"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-200 mb-1">
                    Anything Unusual?
                  </label>
                  <input
                    type="text"
                    value={unusualNotes}
                    onChange={(e) => setUnusualNotes(e.target.value)}
                    placeholder="e.g. Sparkles when tilted in sunlight"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
            </>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-zinc-200 mb-1.5">
                Tell GemTrail what you observed... <span className="text-emerald-400">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={rawDescription}
                onChange={(e) => {
                  setRawDescription(e.target.value);
                  // Auto fill color/texture fallback
                  if (!color) setColor(e.target.value);
                }}
                placeholder="e.g. I found a dark grey rock with tiny shiny specks on one side. It feels very smooth and heavy for its size, like a river stone. When I held it in sunlight, the little specks glinted like glitter."
                className="w-full p-4 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400 leading-relaxed"
              />
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-4 border-t border-zinc-800/80">
            <button
              id="observation-submit-btn"
              type="submit"
              disabled={isLoading || (!useFreeform && (!color || !texture)) || (useFreeform && !rawDescription)}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-zinc-950 font-bold text-base transition-all hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-emerald-500/20 active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-zinc-950" />
                  <span>Consulting GemTrail Observation Coach...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-zinc-950" />
                  <span>Ask GemTrail (Gemma 3 1B)</span>
                  <Send className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
            <p className="text-[11px] text-zinc-400 text-center mt-2.5 flex items-center justify-center gap-1">
              <HelpCircle className="w-3 h-3 text-emerald-400" />
              <span>Processed locally on your machine. Privacy-first, zero cloud tracking.</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
