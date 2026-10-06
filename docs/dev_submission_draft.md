# GemTrail: The AI That Tells You to Put Your Phone Away

*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass](https://dev.to/challenges/hacktoberfest-week1-2026-10-05)*

---

## What I Built

Most modern AI applications are designed to optimize for screen time—infinite chat feeds, constant notifications, and endless scrolling. 

**GemTrail** was built around the exact opposite philosophy:

> **"The AI should help the user explore the real world, not keep the user staring at the screen."**

**GemTrail** is an AI-powered outdoor field observation companion. Instead of an unreliable computer-vision camera classifier that guesses gemstone names with false certainty, GemTrail serves as a **patient natural observation coach**:

1. **Screen Break / Field Mode**: It presents a 5-minute outdoor field mission (e.g. *Two-Tone Rock Explorer*, *The Tactile Hunter*, or *Sunlight Sparkle Search*) and intentionally instructs the user to put their phone in their pocket and step outside.
2. **Guided Sensory Intake**: When the user returns, they log what they directly felt and observed—color gradients, grain texture, angularity, hydrothermal quartz veins, or sunlight specular reflections.
3. **Local AI Observation Coach**: Powered by **Gemma 3 1B** running completely on-device via **Ollama**, GemTrail explains geological mechanisms as possibilities (sedimentary strata, metamorphic foliation, hydraulic tumbling) without pretending to make definitive laboratory diagnoses.
4. **Actionable Next Outdoor Test**: It prompts the user with one specific physical check to perform outside (e.g. tilting under sunlight to test cleavage planes, or wetting the rock to reveal hidden grain boundaries).
5. **Private Field Journal**: Kept entirely in the browser's `localStorage`—no accounts, no tracking, and no cloud databases.

It is made for hikers, curious neighborhood explorers, students, and anyone who wants to rediscover the physical geology right under their feet.

---

## Demo

{% youtube Guhca29LI18 %}

- **Video Walkthrough**: [https://youtu.be/Guhca29LI18](https://youtu.be/Guhca29LI18)
- **Live Code Repository**: [https://github.com/Ahzem/gemtrial](https://github.com/Ahzem/gemtrial)
- **Local Dev Server**: Runs on `http://localhost:3000` with local Ollama (`http://localhost:11434`)

### Demo Highlights:
- **0:00–0:20**: Introduction & Philosophy — why AI should encourage outdoor presence.
- **0:20–0:45**: Field Mode Screen Break — starting a 5-minute outdoor timer with breathing animations.
- **0:45–1:15**: Stepping outside — finding a natural specimen and observing colors, bands, and textures.
- **1:15–1:45**: Recording observations & consulting Gemma 3 1B on-device.
- **1:45–2:00**: Terminal proof showing `ollama list` with `gemma3:1b` running privately with zero cloud API keys.

---

## Code

{% github Ahzem/gemtrial %}

Repository link: [https://github.com/Ahzem/gemtrial](https://github.com/Ahzem/gemtrial)

The complete stack is open-source:
- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with glassmorphism and outdoor dark-mode aesthetics
- **Ollama API Client** calling `gemma3:1b` with strict structured JSON output and fallback heuristics
- **Web Audio API** synthesized chimes for the Field Mode timer

---

## How I Built It

### 1. Local Open-Weight Model: Gemma 3 1B on Ollama
I chose **Gemma 3 1B**, Google's lightweight open-weight model, served via the local **Ollama** daemon (`http://127.0.0.1:11434`). At only ~815 MB, it loads fast on ordinary consumer hardware and delivers near-instant inference with zero cloud latency and zero API fees.

### 2. Guardrailed Observation Coach Prompt
Rather than asking the model to hallucinate mineral names, I engineered a disciplined system prompt:

```text
You are GemTrail, an outdoor field observation companion.
You are an observation coach, NOT a professional geologist or gemologist.

IMPORTANT RULES:
- Never claim that you can positively identify a rock, mineral, or gemstone from a simple description.
- Never invent scientific facts about an unknown object.
- Clearly distinguish observations from possibilities.
- Encourage the user to observe the object themselves outside.
- Give the user one useful next observation to make in the sunlight.
- Remind users to practice Leave No Trace.
```

The route handler (`app/api/gemtrail/route.ts`) validates connection health, queries the local model, parses structured responses, and logs latency.

### 3. "Touch Grass" Screen Break UX
The application is built around the `FieldModeScreenBreak` component. When a user accepts a mission, the app transitions into an ambient field display, initiates a 5-minute timer with a gentle breathing pulse, and prompts:
> *"Put your phone away. Spend 5 minutes observing. We'll be here when you return."*

---

## Why Does Open Innovation Matter?

Open innovation is the entire backbone of what makes GemTrail viable and ethical:

1. **True Privacy in Nature**: Closed APIs require transmitting personal exploration notes, photos, and timestamps to remote corporate servers. By using open-weight Gemma 3 running locally on Ollama, **observations never leave the user's machine**.
2. **Offline & Remote Capability**: Nature trails and state parks rarely have dependable 5G connectivity. Open-weight models empower users to bring intelligent observation tools into off-grid wilderness environments.
3. **No Financial Gatekeeping**: Closed LLMs require recurring API keys and credit cards. Open models let students, park rangers, and backyard hobbyists explore science freely without fearing a cloud billing spike.
4. **Resilience & Independence**: When an app is built around open weights and local code, it never breaks because an upstream API changed its pricing tier or discontinued an endpoint.

---

## My Agent Session

Developed with pair-programming assistance from Antigravity IDE, testing TypeScript schemas, Next.js 16 routing conventions, and live local Ollama model verification.

---

## Prize Categories

- **Touch Grass Track** (Getting developers and users outdoors into nature)
- **Open Innovation Track** (Harnessing open-weight Gemma 3 1B for local, private, on-device AI)
