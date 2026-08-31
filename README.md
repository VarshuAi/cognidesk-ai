# 🤖 CogniDesk AI — Autonomous Enterprise Customer Support & Multi-Channel Contact Center

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-19.x-61dafb?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwind-css" alt="Tailwind v4" />
  <img src="https://img.shields.io/badge/Architecture-Clean%20Enterprise-emerald" alt="Design" />
</p>

---

## 🌟 Overview

**CogniDesk AI** is an enterprise-grade, autonomous customer support studio and multi-channel contact center. Designed with a calm, high-efficiency **Linear / Stripe aesthetic**, CogniDesk combines **verifiable RAG grounding**, real-time **Chain-of-Thought (CoT) reasoning traces**, **1-click resolution playbooks**, and seamless **Autonomous AI ⇋ Human Agent handovers**.

---

## ⚡ Key Highlights

- **🧠 Transparent Chain-of-Thought (CoT) Reasoning**: Inspect exact decision steps, grounded citations, and execution telemetry for every AI response.
- **💬 Distraction-Free Conversation Canvas**: High-readability chat streams with Markdown support, sentiment analysis, and private team whisper notes (`⌘ + Enter` composer).
- **🪟 Collapsible Context Inspector (`⌘I`)**:
  - **Copilot**: Grounded knowledge citations, real-time confidence rating, and tone switcher (*Empathetic*, *Professional*, *Concise*, *Technical*).
  - **Customer 360**: Real-time revenue telemetry (MRR, Lifetime Value, Stripe Status, SLA clocks).
  - **Docs Search**: In-context knowledge base lookup with 1-click snippet insertion into chat.
  - **Resolution Playbooks**: 1-click execution for Stripe pro-rated refunds, VIP Slack alarms, and Jira tickets.
- **📚 Integrated Knowledge Base (GitBook / Mintlify Style)**: Category-driven documentation hub with high-dimensional vector embeddings and live gap resolution.
- **⚡ Automated Resolution Workflows**: Visual node pipeline with step-by-step test execution.
- **📊 Real-Time Analytics & CSAT Telemetry**: Live deflection rate tracking, hourly customer sentiment trends, and channel volume distribution.
- **🎭 Multi-Channel Simulation Studio**: Built-in end-user widget simulator and Voice SIP telephony testing modal.
- **⌨️ Global Command Palette (`⌘K`)**: Instant fuzzy search across tickets, docs, workflows, and settings.

---

## 🛠️ Architecture & Tech Stack

```
cognidesk-ai/
├── src/
│   ├── components/
│   │   ├── inbox/              # TicketList, ConversationView, ContextInspectorPanel
│   │   ├── knowledge/          # KnowledgeBaseHub, ArticleEditorModal
│   │   ├── playbooks/          # PlaybookBuilder (Visual Node Runner)
│   │   ├── analytics/          # AnalyticsDashboard (CSAT & Deflection metrics)
│   │   ├── settings/           # IntegrationSettings (Stripe, Slack, Okta, Jira)
│   │   ├── simulation/         # CustomerWidgetModal, VoiceCallModal
│   │   └── layout/             # TopHeader, CommandPalette
│   ├── data/                   # Mock omnichannel tickets, docs, playbooks, analytics
│   ├── engine/                 # AI Reasoning Engine, RAG similarity matcher, tone switcher
│   ├── store/                  # Zustand state management
│   ├── types/                  # Domain TypeScript interfaces
│   ├── App.tsx                 # Root application layout
│   └── main.tsx                # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

- **Frontend**: React 19, TypeScript 5.9, Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`), Obsidian & Zinc Design Tokens
- **Icons**: Lucide React
- **State Management**: Zustand
- **Utility**: clsx, tailwind-merge, canvas-confetti

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/VarshuAi/cognidesk-ai.git
cd cognidesk-ai

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🧪 Production Build

```bash
# Compile TypeScript and bundle production assets
npm run build

# Preview production build locally
npm run preview
```

---

## 🤝 Contributing

Contributions are welcome! Please read [`CONTRIBUTING.md`](./CONTRIBUTING.md) for details on our code of conduct and development workflow.

---

## 🔒 Security

For security vulnerabilities and bug reports, please review our [`SECURITY.md`](./SECURITY.md) policy.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE) © 2026 **Varshan Gowda (VarshuAi)**.
