# 🌿 GemTrail

> **An AI-powered outdoor field companion that helps people observe, investigate, and document rocks, minerals, and natural objects they discover outside.**

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Ollama](https://img.shields.io/badge/Ollama-Gemma%203%201B-black?style=flat)](https://ollama.com/library/gemma3)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 💡 The Core Philosophy

Most AI applications are designed to keep you glued to a screen. **GemTrail is designed around the opposite idea:**

> **"The AI should help the user explore the real world, not keep the user staring at the screen."**

Instead of building a computer-vision camera classifier that guesses gemstone names with false certainty, **GemTrail acts as an outdoor observation coach**:
- It prompts you to put your phone away.
- It guides you on 5-minute outdoor missions.
- It teaches you how to look for cleavage planes, hydrothermal veins, striations, and sunlight glints with your own eyes.
- It runs an open-weight model (**Gemma 3 1B**) 100% locally on your machine—ensuring complete privacy and zero cloud dependencies.

---

## ✨ Features

- ⏱️ **Field Mode & Screen Break**: A built-in 5-minute outdoor countdown with ambient audio chimes and soothing prompts reminding you to put your phone face down or in your pocket.
- 🎒 **Outdoor Missions**: Curated field activities including *Two-Tone Rock Explorer*, *The Tactile Hunter*, *Sunlight Sparkle Search*, *Riparian Pebble Compare*, and *Deep 5-Minute Observation*.
- 🔍 **Guided Sensory Observation**: Structured field intake recording color gradients, surface textures, facets, geometries, and weight feel.
- 🧠 **Local Gemma 3 1B Inference**: Powered by Google DeepMind's Gemma 3 1B model via Ollama. Distinguishes observations from geological possibilities without claiming false lab certainty, and suggests one actionable next test to do outside.
- 📖 **Private Field Journal**: Zero cloud database. All discoveries, tags, and AI observations are stored locally in browser `localStorage`, with search, category filtering, favorites, and JSON/Markdown export.
- 📱 **Mobile PWA Ready**: Optimized for handheld field exploration on 375px–430px smartphone screens with Web App Manifest support.
- 🛡️ **Leave No Trace Ethos**: Built-in safety warnings and conservation reminders preventing rock cracking or habitat disruption.

---

## 🛠️ Architecture & Tech Stack

```
User (Outdoors)
   │
   ▼
Next.js 16 Web Application (Mobile-friendly)
   │
   ├── [Local Storage] ── Field Journal & Discoveries (100% Private)
   │
   ▼
/api/gemtrail (Route Handler)
   │
   ▼
Ollama Daemon (http://localhost:11434)
   │
   ▼
Gemma 3 1B (Open-Weight Local Model)
```

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom glassmorphism and breathing pulse animations
- **AI Engine**: Local Ollama server running `gemma3:1b` (with resilient heuristic fallback for instant offline use)
- **Audio**: Web Audio API ambient chime synthesizer
- **Persistence**: Browser `localStorage` (No accounts, no telemetry, no API keys)

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [pnpm](https://pnpm.io/) (`corepack enable` or `npm install -g pnpm`)
- [Ollama](https://ollama.com/) installed and running locally

### 2. Download Gemma 3 1B

Pull the lightweight Gemma 3 1B model (~815 MB):

```bash
ollama run gemma3:1b
```

Verify that Ollama is responding:

```bash
ollama list
```

### 3. Install Dependencies

Clone this repository and install packages:

```bash
pnpm install
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Directory Structure

```
├── app/
│   ├── api/gemtrail/route.ts      # Health check (GET) & Gemma 3 1B inference (POST)
│   ├── globals.css                # Design tokens, glassmorphism, nature palette
│   ├── layout.tsx                 # SEO metadata, Viewport, Web App Manifest
│   └── page.tsx                   # Main state machine (Home → Missions → Field Mode → Observation → Journal)
├── components/
│   ├── Navbar.tsx                 # Navigation bar with live Ollama status indicator
│   ├── OllamaBadge.tsx            # Real-time health badge for Gemma 3 1B
│   ├── HomeHero.tsx               # Touch Grass hero, 3 pillars & mission quick-picker
│   ├── MissionCard.tsx            # Outdoor mission cards with checklists & tips
│   ├── FieldModeScreenBreak.tsx   # 5-minute outdoor timer with breathing animations & audio chime
│   ├── ObservationForm.tsx        # Guided sensory intake with interactive chips
│   ├── AiFeedbackCard.tsx         # Geological possibilities, next test & confetti save
│   ├── FieldJournal.tsx           # Searchable journal with filter, detail modal & export
│   └── Footer.tsx                 # Privacy guarantee & Leave No Trace notice
├── lib/
│   ├── types.ts                   # Domain models (Mission, Observation, Feedback, Journal)
│   ├── missions.ts                # Catalog of 6 outdoor field activities
│   ├── prompt.ts                  # System prompt guardrails & heuristic fallback
│   ├── ollama.ts                  # Ollama HTTP client & error handler
│   └── storage.ts                 # Type-safe browser localStorage manager
├── public/
│   ├── hero-banner.jpg            # Field journal hero photography
│   └── manifest.json              # Web App Manifest
└── docs/
    └── product_idea.md            # Product specification & DEV challenge alignment
```

---

## 🌿 Leave No Trace & Field Safety

1. **Observe, don't destroy:** Never smash, crush, or acid-test unknown stones.
2. **Preserve habitats:** Return stones to where you found them, especially in creek beds and mossy environments.
3. **Safety first:** Do not lick, taste, or ingest minerals or soil.

---

## 📜 License

MIT License. Crafted for curious explorers stepping into the real world.
