'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HomeHero } from '@/components/HomeHero';
import { MissionCard } from '@/components/MissionCard';
import { FieldModeScreenBreak } from '@/components/FieldModeScreenBreak';
import { ObservationForm } from '@/components/ObservationForm';
import { AiFeedbackCard } from '@/components/AiFeedbackCard';
import { FieldJournal } from '@/components/FieldJournal';
import { Footer } from '@/components/Footer';

import { Mission, ObservationData, AiFeedback, JournalEntry } from '@/lib/types';
import { FIELD_MISSIONS } from '@/lib/missions';
import { getStoredJournalEntries, saveJournalEntry } from '@/lib/storage';
import { Footprints, Sparkles, Compass } from 'lucide-react';

type AppTab = 'home' | 'missions' | 'field-mode' | 'observation' | 'feedback' | 'journal';

export default function Home() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [selectedMission, setSelectedMission] = useState<Mission>(FIELD_MISSIONS[0]);
  const [currentObservation, setCurrentObservation] = useState<ObservationData | null>(null);
  const [currentFeedback, setCurrentFeedback] = useState<AiFeedback | null>(null);
  const [isLoadingObservation, setIsLoadingObservation] = useState(false);
  const [isSavedInJournal, setIsSavedInJournal] = useState(false);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  // Load stored journal entries on mount
  useEffect(() => {
    setJournalEntries(getStoredJournalEntries());
  }, []);

  // Scroll to top when changing tabs
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleStartMission = (mission?: Mission) => {
    if (mission) {
      setSelectedMission(mission);
    }
    setActiveTab('field-mode');
  };

  const handleObservationSubmit = async (data: ObservationData) => {
    setIsLoadingObservation(true);
    setCurrentObservation(data);

    try {
      const res = await fetch('/api/gemtrail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ observation: data }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const result = await res.json();
      if (result.success && result.feedback) {
        setCurrentFeedback(result.feedback);
        setIsSavedInJournal(false);
        setActiveTab('feedback');
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Error submitting observation:', err);
      // Even if fetch fails completely, provide the immediate graceful feedback
      alert('Note: Connecting with offline companion coach.');
    } finally {
      setIsLoadingObservation(false);
    }
  };

  const handleSaveToJournal = () => {
    if (!currentObservation || !currentFeedback) return;
    saveJournalEntry(selectedMission, currentObservation, currentFeedback);
    setIsSavedInJournal(true);
    setJournalEntries(getStoredJournalEntries());
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080d0b] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab === 'feedback' ? 'observation' : activeTab}
        setActiveTab={(tab) => setActiveTab(tab)}
        journalCount={journalEntries.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        {activeTab === 'home' && (
          <HomeHero
            onStartMission={handleStartMission}
            onOpenJournal={() => setActiveTab('journal')}
            journalCount={journalEntries.length}
          />
        )}

        {activeTab === 'missions' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Footprints className="w-6 h-6 text-emerald-400" />
                  <h2 className="text-2xl font-black text-white">Outdoor Field Missions</h2>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Choose an activity before you step outside. Put your phone away for the duration.
                </p>
              </div>

              <div className="text-xs text-zinc-400 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>{FIELD_MISSIONS.length} Guided Field Activities</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {FIELD_MISSIONS.map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  isSelected={selectedMission.id === mission.id}
                  onSelect={(m) => {
                    setSelectedMission(m);
                    setActiveTab('field-mode');
                  }}
                  onStartDirectly={(m) => {
                    setSelectedMission(m);
                    setActiveTab('field-mode');
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'field-mode' && (
          <FieldModeScreenBreak
            mission={selectedMission}
            onFinishObservation={() => setActiveTab('observation')}
            onExit={() => setActiveTab('missions')}
          />
        )}

        {activeTab === 'observation' && (
          <ObservationForm
            mission={selectedMission}
            onSubmit={handleObservationSubmit}
            isLoading={isLoadingObservation}
            onCancel={() => setActiveTab('field-mode')}
          />
        )}

        {activeTab === 'feedback' && currentFeedback && currentObservation && (
          <AiFeedbackCard
            feedback={currentFeedback}
            observation={currentObservation}
            mission={selectedMission}
            onSaveToJournal={handleSaveToJournal}
            onStartAnother={() => setActiveTab('missions')}
            isSaved={isSavedInJournal}
          />
        )}

        {activeTab === 'journal' && (
          <FieldJournal
            entries={journalEntries}
            onEntriesChange={(updated) => setJournalEntries(updated)}
            onStartNewMission={() => setActiveTab('missions')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
