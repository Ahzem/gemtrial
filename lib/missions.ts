import { Mission } from './types';

export const FIELD_MISSIONS: Mission[] = [
  {
    id: 'rock-explorer',
    title: 'Two-Tone Rock Explorer',
    category: 'rock',
    tagline: 'Find a stone displaying at least two distinct color tones or layers.',
    description:
      'Venture into your yard, garden, park, or trail. Scan the ground for a single rock displaying at least two different shades, stripes, or inclusions.',
    durationMinutes: 5,
    prompts: [
      'Where do the two colors meet — is the boundary sharp or gradual?',
      'Is one color raised or recessed compared to the other?',
      'Does one color reflect light differently than the surrounding stone?',
    ],
    checklist: [
      'Primary & secondary colors',
      'Surface texture (gritty, waxy, chalky, smooth)',
      'Weight density in your palm',
      'Distinct bands or speckled flecks',
    ],
    fieldTip: 'Resist the urge to crack or strike the rock. Natural weathering tells the real geological story.',
    badge: 'Dual Tone Scout',
    iconName: 'Mountain',
    difficulty: 'Beginner',
  },
  {
    id: 'texture-hunter',
    title: 'The Tactile Hunter',
    category: 'texture',
    tagline: 'Discover three distinct natural surfaces without looking down at your phone.',
    description:
      'Put your screen away. Use your fingertips to experience contrast: find something rough, something satin-smooth, and something surprisingly cool to the touch.',
    durationMinutes: 6,
    prompts: [
      'Close your eyes for 30 seconds and feel the texture without visual bias.',
      'Does the surface warm up as your palm rests on it?',
      'Is the rough texture jagged (angular crystals) or pitted (volcanic/weathered)?',
    ],
    checklist: [
      'Micro-ridges and grain size',
      'Surface temperature sensation',
      'Porosity vs impermeability',
    ],
    fieldTip: 'Touch gently. Lichens and fragile mosses can take decades to grow back if scraped.',
    badge: 'Touch Grass Tactile',
    iconName: 'Sparkles',
    difficulty: 'Beginner',
  },
  {
    id: 'crystal-search',
    title: 'Sunlight Sparkle Search',
    category: 'crystal',
    tagline: 'Inspect stones against direct sunlight for reflective mineral facets.',
    description:
      'Look for subtle glints. Hold stones up to daylight or low sun and tilt them slowly at varying angles to catch reflections.',
    durationMinutes: 7,
    prompts: [
      'Do the reflections flash simultaneously (cleavage planes) or twinkle randomly (granular quartz)?',
      'What color is the flash (metallic gold, silvery, glassy clear)?',
      'Are the shiny spots distributed evenly or concentrated in veins?',
    ],
    checklist: [
      'Flashes of light across angles',
      'Facet shapes (square, flake, needle-like)',
      'Underlying stone body tone',
    ],
    fieldTip: 'A drop of clean water on the surface often reveals hidden crystal facets without causing harm.',
    badge: 'Sunlight Glint Master',
    iconName: 'Sun',
    difficulty: 'Intermediate',
  },
  {
    id: 'pattern-finder',
    title: 'Natural Pattern Finder',
    category: 'pattern',
    tagline: 'Locate repeating geological or botanical geometries in your area.',
    description:
      'Nature repeats geometries: concentric rings, parallel striations, hexagonal fractals, or sediment ripples. Discover one intriguing specimen.',
    durationMinutes: 5,
    prompts: [
      'Are the lines straight, curved, folded, or wavy?',
      'Does the pattern wrap entirely around the object?',
      'Does the texture change along the stripe boundaries?',
    ],
    checklist: [
      'Geometry type (lines, spirals, concentric rings)',
      'Spacing consistency',
      'Color shifts along ridges',
    ],
    fieldTip: 'Patterns in stones often mark ancient water currents or alternating pressure millions of years ago.',
    badge: 'Pattern Cartographer',
    iconName: 'Compass',
    difficulty: 'Intermediate',
  },
  {
    id: 'water-explorer',
    title: 'Riparian Pebble Compare',
    category: 'water',
    tagline: 'Compare a stone found near moisture or drainage with a dry upland stone.',
    description:
      'Find a stone near a puddle, gutter, creek, or garden hose, and compare its patina, smoothness, and weight with an upland dry stone.',
    durationMinutes: 8,
    prompts: [
      'Is the river stone noticeably rounded compared to dry angular rocks?',
      'How does the color darken when wet vs as it dries in your hand?',
      'Does the surface feel slippery due to biofilm or silky smooth from abrasion?',
    ],
    checklist: [
      'Rounding grade (angular vs sub-rounded vs tumbled smooth)',
      'Wet vs dry appearance',
      'Weight & density comparison',
    ],
    fieldTip: 'Always return river stones to where you found them to prevent local soil erosion.',
    badge: 'Currents & Sediments',
    iconName: 'Droplets',
    difficulty: 'Explorer',
  },
  {
    id: 'five-minute-mindful',
    title: 'Deep 5-Minute Observation',
    category: 'mindful',
    tagline: 'Pick one single stone or leaf. Spend 5 continuous minutes observing it in silence.',
    description:
      'The purest outdoor discipline: choose one modest stone. Sit comfortably. Put the phone face down or in your pocket. Do not look away for 5 whole minutes.',
    durationMinutes: 5,
    prompts: [
      'What is the very first detail you noticed?',
      'What took you 3 full minutes before you finally noticed it?',
      'How does the weight feel as you gently pass it between hands?',
    ],
    checklist: [
      'Micro-cracks and tiny inclusions',
      'Color gradients unseen at first glance',
      'Acoustic sound when gently tapped with a fingernail',
    ],
    fieldTip: 'Observation is a muscle. The longer you look without distraction, the more nature speaks.',
    badge: 'Pure Observer',
    iconName: 'Eye',
    difficulty: 'Beginner',
  },
];

export function getMissionById(id: string): Mission {
  return FIELD_MISSIONS.find((m) => m.id === id) || FIELD_MISSIONS[0];
}
