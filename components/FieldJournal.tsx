'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Star,
  Trash2,
  Download,
  Calendar,
  Compass,
  Eye,
  X,
  Share2,
  Check,
  Footprints,
  AlertCircle,
} from 'lucide-react';
import { JournalEntry } from '@/lib/types';
import {
  deleteJournalEntry,
  toggleFavoriteEntry,
  exportJournalAsJson,
} from '@/lib/storage';

interface FieldJournalProps {
  entries: JournalEntry[];
  onEntriesChange: (updated: JournalEntry[]) => void;
  onStartNewMission: () => void;
}

export function FieldJournal({
  entries,
  onEntriesChange,
  onStartNewMission,
}: FieldJournalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);
  const [copiedExport, setCopiedExport] = useState(false);

  const categories = ['all', 'rock', 'texture', 'crystal', 'pattern', 'water', 'mindful'];

  const filteredEntries = entries.filter((entry) => {
    if (onlyFavorites && !entry.isFavorite) return false;
    if (selectedCategory !== 'all' && entry.missionCategory !== selectedCategory) return false;
    if (!searchQuery) return true;

    const q = searchQuery.toLowerCase();
    const name = (entry.observation.objectName || '').toLowerCase();
    const color = (entry.observation.color || '').toLowerCase();
    const texture = (entry.observation.texture || '').toLowerCase();
    const mission = (entry.missionTitle || '').toLowerCase();
    const tags = entry.tags.join(' ').toLowerCase();

    return name.includes(q) || color.includes(q) || texture.includes(q) || mission.includes(q) || tags.includes(q);
  });

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (confirm('Are you sure you want to delete this field observation from your journal?')) {
      const updated = deleteJournalEntry(id);
      onEntriesChange(updated);
      if (activeEntry?.id === id) setActiveEntry(null);
    }
  };

  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = toggleFavoriteEntry(id);
    onEntriesChange(updated);
    if (activeEntry?.id === id) {
      setActiveEntry(updated.find((item) => item.id === id) || null);
    }
  };

  const handleDownloadJson = () => {
    const jsonStr = exportJournalAsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gemtrail-field-journal-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyMarkdownReport = () => {
    let md = `# GemTrail Field Journal Report\nGenerated: ${new Date().toLocaleDateString()}\nTotal Discoveries: ${entries.length}\n\n`;
    entries.forEach((entry, i) => {
      md += `## ${i + 1}. ${entry.observation.objectName || 'Specimen'}\n`;
      md += `- **Mission:** ${entry.missionTitle}\n`;
      md += `- **Date:** ${new Date(entry.createdAt).toLocaleDateString()}\n`;
      md += `- **Colors:** ${entry.observation.color}\n`;
      md += `- **Texture:** ${entry.observation.texture}\n`;
      md += `- **Coach Insight:** ${entry.feedback.summary}\n`;
      md += `- **Possibilities:** ${entry.feedback.scientificPossibilities}\n`;
      md += `- **Next Observation:** ${entry.feedback.nextObservation}\n\n`;
    });
    navigator.clipboard.writeText(md);
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Journal Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-black text-white">My Field Journal</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/40">
              {entries.length} {entries.length === 1 ? 'Discovery' : 'Discoveries'}
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Permanent local record of your outdoor observations. Kept privately in your browser.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdownReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 transition-colors"
            title="Copy as Markdown Report"
          >
            {copiedExport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedExport ? 'Copied' : 'Share / MD'}</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 transition-colors"
            title="Download full JSON export"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={onStartNewMission}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-colors shadow-sm shadow-emerald-500/20"
          >
            <Footprints className="w-3.5 h-3.5" />
            <span>New Mission</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel rounded-2xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by rock name, colors, quartz vein, mica schist..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
              onlyFavorites
                ? 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>Favorites</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-zinc-400 text-[11px] mr-1 uppercase font-semibold">Filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg capitalize whitespace-nowrap transition-colors text-xs ${
                selectedCategory === cat
                  ? 'bg-emerald-900/80 text-emerald-300 font-bold border border-emerald-600/50'
                  : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Entries Grid or Empty State */}
      {filteredEntries.length === 0 ? (
        <div className="text-center py-16 px-4 glass-panel rounded-3xl border-dashed border-zinc-800">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center mx-auto mb-3 text-zinc-500">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-zinc-200">No field observations found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1 mb-6">
            {searchQuery || selectedCategory !== 'all' || onlyFavorites
              ? 'Try adjusting your search criteria or category filter.'
              : 'Your journal is waiting for its first natural specimen. Head outside on a mission!'}
          </p>
          <button
            onClick={onStartNewMission}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs"
          >
            <Footprints className="w-4 h-4" />
            <span>Start an Outdoor Mission</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => setActiveEntry(entry)}
              className="glass-panel glass-panel-hover rounded-2xl p-5 cursor-pointer space-y-3 relative group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
                    <Compass className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{entry.missionTitle}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {entry.observation.objectName || 'Field Specimen'}
                  </h3>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleToggleFavorite(entry.id, e)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-400 transition-colors"
                    title={entry.isFavorite ? 'Unstar' : 'Star'}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        entry.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    />
                  </button>
                  <button
                    onClick={(e) => handleDelete(entry.id, e)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 opacity-60 group-hover:opacity-100 transition-opacity"
                    title="Delete entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sensory Highlights */}
              <div className="text-xs text-zinc-300 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800 space-y-1">
                <div>
                  <strong className="text-zinc-400">Color: </strong>
                  {entry.observation.color}
                </div>
                {entry.observation.texture && (
                  <div>
                    <strong className="text-zinc-400">Texture: </strong>
                    {entry.observation.texture}
                  </div>
                )}
              </div>

              {/* Coach Insight Snippet */}
              <p className="text-xs text-zinc-400 line-clamp-2 italic">
                &ldquo;{entry.feedback.summary}&rdquo;
              </p>

              {/* Next Observation Preview */}
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium pt-2 border-t border-zinc-800/80">
                <Eye className="w-3 h-3 shrink-0" />
                <span className="truncate">Next: {entry.feedback.nextObservation}</span>
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(entry.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="text-emerald-400 font-mono">
                  {entry.feedback.sourceModel === 'gemma3:1b' ? 'Gemma 3 1B' : 'Local Heuristic'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Entry Detail Modal */}
      {activeEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 space-y-6 border-emerald-500/40 relative shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                  {activeEntry.missionTitle}
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  {activeEntry.observation.objectName || 'Field Specimen'}
                </h3>
                <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(activeEntry.createdAt).toLocaleString()}
                  </span>
                  <span>•</span>
                  <span className="font-mono text-emerald-400">
                    {activeEntry.feedback.sourceModel === 'gemma3:1b' ? 'Gemma 3 1B Local' : 'Local Heuristic'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleFavorite(activeEntry.id)}
                  className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400"
                >
                  <Star
                    className={`w-4 h-4 ${activeEntry.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`}
                  />
                </button>
                <button
                  onClick={() => setActiveEntry(null)}
                  className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sensory Observations Recorded */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Your Field Observations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                  <div className="text-zinc-400 font-semibold">Color:</div>
                  <div className="text-zinc-200 mt-0.5">{activeEntry.observation.color}</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                  <div className="text-zinc-400 font-semibold">Texture:</div>
                  <div className="text-zinc-200 mt-0.5">{activeEntry.observation.texture}</div>
                </div>
                {activeEntry.observation.shapePattern && (
                  <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                    <div className="text-zinc-400 font-semibold">Shape & Pattern:</div>
                    <div className="text-zinc-200 mt-0.5">{activeEntry.observation.shapePattern}</div>
                  </div>
                )}
                {activeEntry.observation.weightFeel && (
                  <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                    <div className="text-zinc-400 font-semibold">Weight & Feel:</div>
                    <div className="text-zinc-200 mt-0.5">{activeEntry.observation.weightFeel}</div>
                  </div>
                )}
                {activeEntry.observation.contextLocation && (
                  <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 sm:col-span-2">
                    <div className="text-zinc-400 font-semibold">Location / Context:</div>
                    <div className="text-zinc-200 mt-0.5">{activeEntry.observation.contextLocation}</div>
                  </div>
                )}
              </div>
            </div>

            {/* AI Feedback */}
            <div className="space-y-4 pt-2 border-t border-zinc-800">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                  GemTrail Observation Coach Insights
                </h4>
                <p className="text-sm text-zinc-200 leading-relaxed bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800">
                  {activeEntry.feedback.summary}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-300 space-y-1.5">
                <div className="font-bold text-amber-300">Geological Possibilities:</div>
                <p className="leading-relaxed">{activeEntry.feedback.scientificPossibilities}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-200 space-y-1.5">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Next Outdoor Observation:</span>
                </div>
                <p className="leading-relaxed">{activeEntry.feedback.nextObservation}</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/30 text-[11px] text-amber-300">
                <AlertCircle className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
                {activeEntry.feedback.fieldTip}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <button
                onClick={() => handleDelete(activeEntry.id)}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-950/30 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Entry</span>
              </button>

              <button
                onClick={() => setActiveEntry(null)}
                className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
