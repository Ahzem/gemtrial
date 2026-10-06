import { ObservationData, AiFeedback } from './types';

export const GEMTRAIL_SYSTEM_PROMPT = `You are GemTrail, an AI-powered outdoor field observation companion.
Your job is to help people explore the natural world, especially rocks, minerals, stones, plants, and other interesting objects they discover outdoors.
You are an observation coach, NOT a professional geologist or gemologist.

IMPORTANT PRINCIPLES & RULES:
1. Never claim that you can positively identify a rock, mineral, or gemstone from a simple description.
2. Never invent scientific facts about an unknown object.
3. Clearly distinguish observations from possibilities.
4. Encourage the user to observe the object themselves.
5. Ask simple questions that can be answered by looking, touching, or observing the object safely outdoors.
6. Encourage users to spend less time on the screen and more time in nature.
7. Do not encourage breaking, cutting, tasting, burning, or damaging unknown objects.
8. Keep responses concise, warm, scientific, and easy to understand.
9. Give the user one clear, actionable next observation to make outside.

OUTPUT FORMAT:
You must respond with valid JSON with the following keys:
{
  "summary": "Brief encouraging summary of what they found (1-2 sentences)",
  "observationsDetected": ["Key observation 1", "Key observation 2", "Key observation 3"],
  "scientificPossibilities": "A cautious, educational explanation of geological/natural possibilities without asserting definitive identification.",
  "nextObservation": "One specific, safe test or observation to perform outside (e.g., angle in sunlight, scratch test against glass or fingernail, water drop test).",
  "fieldTip": "One practical leave-no-trace or outdoor safety/observational tip."
}
Only output the raw JSON object, no markdown code block markers or conversational preamble.`;

export function buildObservationUserPrompt(obs: ObservationData): string {
  const parts: string[] = [];
  if (obs.missionTitle) {
    parts.push(`Field Mission: ${obs.missionTitle}`);
  }
  if (obs.objectName) {
    parts.push(`Field Name: ${obs.objectName}`);
  }
  if (obs.color) parts.push(`Color: ${obs.color}`);
  if (obs.texture) parts.push(`Texture: ${obs.texture}`);
  if (obs.shapePattern) parts.push(`Shape & Patterns: ${obs.shapePattern}`);
  if (obs.weightFeel) parts.push(`Weight & Density: ${obs.weightFeel}`);
  if (obs.contextLocation) parts.push(`Found At / Context: ${obs.contextLocation}`);
  if (obs.unusualNotes) parts.push(`Unusual Details: ${obs.unusualNotes}`);
  if (obs.rawDescription) parts.push(`Observer Notes: ${obs.rawDescription}`);

  return parts.join('\n');
}

/**
 * Fallback natural observation coach in case local Ollama is not yet started.
 * Provides grounded, scientifically cautious observations adhering to the GemTrail rules.
 */
export function generateHeuristicFeedback(obs: ObservationData): AiFeedback {
  const colorLower = (obs.color || '').toLowerCase();
  const textLower = (
    `${obs.color} ${obs.texture} ${obs.shapePattern} ${obs.unusualNotes} ${obs.rawDescription || ''}`
  ).toLowerCase();

  const detected: string[] = [];
  if (obs.color) detected.push(`Color palette: ${obs.color}`);
  if (obs.texture) detected.push(`Surface texture: ${obs.texture}`);
  if (obs.shapePattern) detected.push(`Form & geometry: ${obs.shapePattern}`);
  if (obs.weightFeel) detected.push(`Feel in hand: ${obs.weightFeel}`);
  if (detected.length === 0) detected.push('Natural specimen observation');

  let possibilities =
    'Natural stones carry signatures of volcanic cooling, river tumbling, or sedimentary compaction over millions of years. ';
  let nextCheck =
    'Take the specimen into direct sunlight and tilt it at low angles. Watch whether light reflects uniformly or in discrete crystalline sparks.';
  let tip =
    'Leave the surrounding geology undisturbed. Observe in place whenever possible, following Leave No Trace.';

  if (textLower.includes('shiny') || textLower.includes('sparkl') || textLower.includes('glint') || textLower.includes('crystal')) {
    possibilities =
      'Reflective micro-facets frequently point to mineral inclusions such as quartz crystals, mica flakes, or feldspar cleavage planes. However, metallic luster vs vitreous (glassy) luster can only be confirmed through closer facet inspection.';
    nextCheck =
      'Hold the stone steady and check if the sparkles are thin flexible flakes (indicative of mica) or solid translucent geometric grains (indicative of quartz).';
    tip =
      'Do not attempt to chisel out crystals; natural fracture faces preserve the mineral’s true geometry.';
  } else if (textLower.includes('stripe') || textLower.includes('layer') || textLower.includes('band')) {
    possibilities =
      'Distinct linear banding typically suggests sedimentary deposition (strata formed by silt or sand layers over epochs) or metamorphic foliation where intense tectonic pressure aligned mineral grains into parallel sheets.';
    nextCheck =
      'Examine the edges where the bands terminate. Are the layer thicknesses uniform, or do they taper and show wave-like micro-sedimentation?';
    tip =
      'Sedimentary layers can be brittle along bedding planes; support the stone with both hands.';
  } else if (textLower.includes('smooth') || textLower.includes('water') || textLower.includes('river') || textLower.includes('round')) {
    possibilities =
      'High surface sphericity and satiny polish are classic hallmarks of hydraulic abrasion—years of rolling in alluvial gravel or glacial meltwater wear down sharp mineral corners into smooth contours.';
    nextCheck =
      'Apply a few drops of clean water to the surface. Note whether the color contrast intensifies significantly, revealing concealed grain boundaries.';
    tip =
      'River-polished rocks often harbor delicate macro-invertebrates on their underside—always place them back if lifted from stream banks.';
  } else if (textLower.includes('heavy') || textLower.includes('dense') || textLower.includes('dark') || colorLower.includes('black')) {
    possibilities =
      'Dark, dense stones frequently belong to mafic volcanic suites (such as basalt) or iron-rich mineral concentrates. High specific gravity indicates a high metallic or ferromagnesian mineral percentage.';
    nextCheck =
      'Carefully test whether the specimen is attracted to a common household magnet, which indicates magnetite or hematite content.';
    tip =
      'A dense stone makes a great thermal sink—notice how slowly it absorbs warmth from your palm.';
  }

  return {
    summary: `You made an attentive field observation! Your notes highlight notable characteristics: ${obs.color || 'distinct tone'}${obs.texture ? `, with a ${obs.texture} finish` : ''}.`,
    observationsDetected: detected,
    scientificPossibilities: possibilities,
    nextObservation: nextCheck,
    fieldTip: tip,
    sourceModel: 'local-heuristic-companion',
    confidenceNotice:
      'Gemma 3 1B Companion Observation: Real rocks and minerals require laboratory testing or streak plates for positive identification. GemTrail guides your observation without false certainty.',
  };
}
