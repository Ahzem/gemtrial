import { ObservationData, AiFeedback, OllamaHealthResponse } from './types';
import { GEMTRAIL_SYSTEM_PROMPT, buildObservationUserPrompt, generateHeuristicFeedback } from './prompt';

const DEFAULT_OLLAMA_URL = process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434';
const DEFAULT_MODEL = process.env.OLLAMA_MODEL || 'gemma3:1b';

/**
 * Checks connection status to the local Ollama instance and verifies if Gemma 3 1B is installed.
 */
export async function checkOllamaHealth(): Promise<OllamaHealthResponse> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`${DEFAULT_OLLAMA_URL}/api/tags`, {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return {
        online: false,
        model: DEFAULT_MODEL,
        modelsFound: [],
        message: `Ollama returned status ${res.status}`,
      };
    }

    const data = await res.json();
    const models = Array.isArray(data.models) ? data.models.map((m: { name: string }) => m.name) : [];
    const hasTargetModel = models.some((name: string) => name.toLowerCase().includes('gemma3') || name.toLowerCase().includes('gemma'));

    return {
      online: true,
      model: hasTargetModel ? DEFAULT_MODEL : (models[0] || DEFAULT_MODEL),
      modelsFound: models,
      message: hasTargetModel
        ? `Connected to Ollama with ${DEFAULT_MODEL}`
        : `Connected to Ollama. Notice: '${DEFAULT_MODEL}' not detected in [${models.slice(0, 3).join(', ')}]. Run 'ollama pull ${DEFAULT_MODEL}' or using available model.`,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return {
      online: false,
      model: DEFAULT_MODEL,
      modelsFound: [],
      message: `Local Ollama is offline or unreachable at ${DEFAULT_OLLAMA_URL} (${msg})`,
    };
  }
}

/**
 * Invokes Gemma 3 1B on Ollama or returns grounded heuristic fallback if Ollama is unreachable.
 */
export async function queryGemmaObservation(observation: ObservationData): Promise<AiFeedback> {
  const startTime = Date.now();
  const userPrompt = buildObservationUserPrompt(observation);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 18000); // 18s timeout for local 1B model

    const res = await fetch(`${DEFAULT_OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        system: GEMTRAIL_SYSTEM_PROMPT,
        prompt: userPrompt,
        stream: false,
        format: 'json',
        options: {
          temperature: 0.4,
          top_p: 0.9,
          num_predict: 500,
        },
      }),
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`[GemTrail] Ollama query failed with status ${res.status}, falling back to observation heuristics.`);
      const fallback = generateHeuristicFeedback(observation);
      fallback.latencyMs = Date.now() - startTime;
      return fallback;
    }

    const json = await res.json();
    const rawResponse = json.response;

    // Try parsing the model response as JSON
    try {
      const parsed = JSON.parse(rawResponse);
      return {
        summary: parsed.summary || 'Observation logged.',
        observationsDetected: Array.isArray(parsed.observationsDetected)
          ? parsed.observationsDetected
          : [observation.color, observation.texture].filter(Boolean),
        scientificPossibilities:
          parsed.scientificPossibilities || 'Interesting geological features observed.',
        nextObservation:
          parsed.nextObservation || 'Examine the specimen under a magnifying glass or bright sunlight.',
        fieldTip: parsed.fieldTip || 'Keep your hands clean and preserve the natural surroundings.',
        sourceModel: 'gemma3:1b',
        confidenceNotice:
          'Analyzed locally by Gemma 3 1B via Ollama. No data left your device.',
        latencyMs: Date.now() - startTime,
      };
    } catch {
      // If the model output plain text instead of strict JSON, parse standard sections
      const lines = rawResponse.split('\n').filter((l: string) => l.trim().length > 0);
      return {
        summary: lines[0] || 'Field observation recorded.',
        observationsDetected: [observation.color, observation.texture, observation.shapePattern].filter(Boolean),
        scientificPossibilities:
          lines.slice(1, 3).join(' ') ||
          'Various natural processes may create these features; safe physical testing can reveal more.',
        nextObservation:
          'Take this specimen outside into direct sunlight and tilt it to inspect reflective crystalline facets.',
        fieldTip: 'Avoid breaking or crushing the rock to maintain natural crystal integrity.',
        sourceModel: 'gemma3:1b',
        confidenceNotice: 'Analyzed locally by Gemma 3 1B. Private & offline-ready.',
        latencyMs: Date.now() - startTime,
      };
    }
  } catch (error) {
    console.info('[GemTrail] Ollama unreachable, using grounded field heuristics:', error);
    const fallback = generateHeuristicFeedback(observation);
    fallback.latencyMs = Date.now() - startTime;
    return fallback;
  }
}
