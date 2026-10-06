import { JournalEntry, ObservationData, AiFeedback, Mission } from './types';

const STORAGE_KEY = 'gemtrail_field_journal_v1';
const DRAFT_STORAGE_KEY = 'gemtrail_active_draft_v1';

export const SAMPLE_ENTRIES: JournalEntry[] = [
  {
    id: 'sample-entry-1',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    missionTitle: 'Two-Tone Rock Explorer',
    missionCategory: 'rock',
    observation: {
      objectName: 'Veined River Cobble',
      color: 'Charcoal grey with bright milky-white quartzite streak',
      texture: 'Silky smooth water-tumbled body with a raised, coarse white vein',
      shapePattern: 'Egg-shaped oval with a continuous 3mm stripe wrapping all the way around',
      weightFeel: 'Feels surprisingly dense and cool in the palm',
      contextLocation: 'Gravel bed along dry drainage ditch near neighborhood park',
      unusualNotes: 'The white stripe resists scraping much more than the grey matrix',
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    feedback: {
      summary: 'Remarkable differential erosion! You observed an intact intrusive mineral vein.',
      observationsDetected: [
        'Two distinct mineral bodies (charcoal matrix vs milky stripe)',
        'Differential hardness (raised vein resists abrasion)',
        'Continuous circumferential band',
      ],
      scientificPossibilities:
        'The white stripe is very likely hydrothermal quartz or feldspar injected into a fracture fault in host slate or basalt millions of years ago. As the stone was tumbled by water, the softer dark host rock eroded faster, leaving the harder quartz vein standing proud.',
      nextObservation:
        'Wet the surface under sunlight and check if the white vein lets light pass through slightly (translucent quartz) or blocks all light (opaque calcite).',
      fieldTip:
        'Notice how ancient geological fault lines fit directly inside the palm of your hand. Never smash it with a hammer.',
      sourceModel: 'gemma3:1b',
      confidenceNotice: 'Gemma 3 1B Field Observation • 100% Local on Device',
      latencyMs: 820,
    },
    tags: ['Vein', 'River Pebble', 'Hydrothermal Quartz'],
    isFavorite: true,
  },
  {
    id: 'sample-entry-2',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    missionTitle: 'Sunlight Sparkle Search',
    missionCategory: 'crystal',
    observation: {
      objectName: 'Glinting Mica Schist Fragment',
      color: 'Silvery sheen over brownish-grey fine grain',
      texture: 'Flaky layered sheets on one side, gritty sand feel on edges',
      shapePattern: 'Angular tabular slab about 4cm wide',
      weightFeel: 'Moderate weight, easily crumbled at flaky corners',
      contextLocation: 'Exposed hillside trail cutting',
      unusualNotes: 'Flashes silver like tiny mirrors when tilted in mid-morning sun',
      timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
    feedback: {
      summary: 'You discovered miniature natural mirrors created through metamorphic alignment.',
      observationsDetected: [
        'Silvery specular reflections across planes',
        'Foliated micaceous sheets',
        'Tabular metamorphic structure',
      ],
      scientificPossibilities:
        'The flashes are characteristic of muscovite mica flakes. Under deep underground tectonic temperatures, clay minerals recrystallize into flat mica plates perpendicular to compression, producing the shimmering foliation.',
      nextObservation:
        'Hold the stone in shade, then step back into sunlight. Notice how the glitter vanishes instantly without direct directional rays, confirming specular reflection rather than luminescence.',
      fieldTip:
        'Mica flakes are delicate. Keep this specimen in a small cloth pouch or leave it resting naturally on the trail bank for the next hiker.',
      sourceModel: 'gemma3:1b',
      confidenceNotice: 'Gemma 3 1B Field Observation • 100% Local on Device',
      latencyMs: 740,
    },
    tags: ['Metamorphic', 'Mica', 'Sunlight Glint'],
    isFavorite: false,
  },
];

export function getStoredJournalEntries(): JournalEntry[] {
  if (typeof window === 'undefined') return SAMPLE_ENTRIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with sample entries so the user immediately has something inspiring to see
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_ENTRIES));
      return SAMPLE_ENTRIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SAMPLE_ENTRIES;
  } catch (e) {
    console.error('Failed to read journal entries from localStorage', e);
    return SAMPLE_ENTRIES;
  }
}

export function saveJournalEntry(
  mission: Mission | undefined,
  observation: ObservationData,
  feedback: AiFeedback
): JournalEntry {
  const entries = getStoredJournalEntries();
  const newEntry: JournalEntry = {
    id: 'entry-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
    createdAt: new Date().toISOString(),
    missionTitle: mission?.title || observation.missionTitle || 'Outdoor Discovery',
    missionCategory: mission?.category || 'rock',
    observation,
    feedback,
    isFavorite: false,
    tags: [
      mission?.category || 'outdoors',
      observation.color.split(' ')[0] || 'stone',
      'field-find',
    ].filter(Boolean),
  };

  const updated = [newEntry, ...entries];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return newEntry;
}

export function deleteJournalEntry(id: string): JournalEntry[] {
  const entries = getStoredJournalEntries();
  const updated = entries.filter((e) => e.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function toggleFavoriteEntry(id: string): JournalEntry[] {
  const entries = getStoredJournalEntries();
  const updated = entries.map((e) =>
    e.id === id ? { ...e, isFavorite: !e.isFavorite } : e
  );
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function exportJournalAsJson(): string {
  const entries = getStoredJournalEntries();
  return JSON.stringify(entries, null, 2);
}

export function clearJournalStorage(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
