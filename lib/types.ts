export interface Mission {
  id: string;
  title: string;
  category: 'rock' | 'texture' | 'crystal' | 'pattern' | 'water' | 'botany' | 'mindful';
  tagline: string;
  description: string;
  durationMinutes: number;
  prompts: string[];
  checklist: string[];
  fieldTip: string;
  badge: string;
  iconName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Explorer';
}

export interface ObservationData {
  missionId?: string;
  missionTitle?: string;
  objectName?: string;
  color: string;
  texture: string;
  shapePattern: string;
  weightFeel: string;
  contextLocation: string;
  unusualNotes: string;
  rawDescription?: string;
  photoUrl?: string;
  timestamp: string;
}

export interface AiFeedback {
  summary: string;
  observationsDetected: string[];
  scientificPossibilities: string;
  nextObservation: string;
  fieldTip: string;
  sourceModel: 'gemma3:1b' | 'local-heuristic-companion';
  confidenceNotice: string;
  latencyMs?: number;
}

export interface JournalEntry {
  id: string;
  createdAt: string;
  missionTitle: string;
  missionCategory: string;
  observation: ObservationData;
  feedback: AiFeedback;
  isFavorite?: boolean;
  tags: string[];
}

export interface OllamaHealthResponse {
  online: boolean;
  model: string;
  modelsFound: string[];
  message: string;
}
