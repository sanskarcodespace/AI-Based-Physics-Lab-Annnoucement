# AI-Based Physics Lab Announcement System 🧪

A premium, high-performance Next.js 14 SaaS platform designed for physics laboratory management and automated audio announcements. Featuring a stunning 3D design system, real-time telemetry, and an intelligent TTS microservice.

![Main Dashboard](https://raw.githubusercontent.com/sanskarcodespace/AI-Based-Physics-Lab-Annnoucement/main/public/demo-screenshot.png)

## ✨ Features

- **Premium SaaS UI**: Glassmorphism aesthetics with dynamic neon accents and 3D visualizations.
- **Smart Scheduling**: Automate announcements based on lab schedules with daily persistence.
- **Hybrid TTS Engine**: Intelligent switching between locally synthesized voice and high-fidelity ElevenLabs API.
- **Micro-interactions**: Framer Motion and GSAP powered animations for a fluid, reactive experience.
- **Performance Optimized**: 
  - Dynamic loading of heavy 3D assets.
  - WebGL suspension on inactive tabs to save energy.
  - Edge caching for telemetry data.
- **Emergency Broadcast**: Instant, high-priority voice override system for lab safety.

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+
- Python 3.10+ (for TTS Service)
- SQLite (included)

### 2. Installation

#### Frontend (Next.js)
```bash
git clone https://github.com/sanskarcodespace/AI-Based-Physics-Lab-Annnoucement.git
cd AI-Based-Physics-Lab-Annnoucement
npm install
npx prisma db push
npx prisma db seed
```

#### TTS Service (Python)
```bash
cd tts_service
pip install -r requirements.txt
python server.py
```

### 3. Environment Secrets
Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
# Optional: High fidelity voice
ELEVENLABS_API_KEY="your_api_key_here"
```

### 4. Run the Platform
```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: TTS Service
cd tts_service && python server.py
```

## 🏗️ Technical Architecture

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Shadcn/UI.
- **3D Engine**: React Three Fiber, Three.js, @react-three/drei, GSAP.
- **State Management**: Zustand.
- **Backend**: Next.js API Routes, Prisma ORM, SQLite.
- **Voice Engine**: FastAPI (Python), Pyttsx3 / ElevenLabs.

## 🔐 Environment Secrets

The following secrets are required in your Vercel/Production environment:

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | SQLite connection string (local) or Turso (edge) | `file:./dev.db` |
| `ELEVENLABS_API_KEY` | API Key for high-fidelity voice rendering | (Optional) |
| `NEXT_PUBLIC_APP_URL` | Base URL of the application | `http://localhost:3000` |

## 🏗️ Build & Deployment Pipeline

This project is optimized for **Vercel** with a semi-automated pipeline:

1.  **Code Commit**: On every push to `main`, Vercel triggers a build.
2.  **Linting & Analysis**: `eslint` and `next/bundle-analyzer` run to ensure code quality and performance metrics.
3.  **Database Migration**: `npx prisma db push` is executed during the build phase (custom build command recommended: `npx prisma db push && next build`).
4.  **Edge Routing**: `vercel.json` handles global headers and API rewrites.
5.  **Deployment**: The app is served via Vercel's global CDN with optimized asset delivery.

## 🧪 Seeding & Testing

To reset and seed the database with fresh laboratory parameters:
```bash
npx prisma db seed
```

---
Developed by **Sanskar Sharma** for Advanced Physics Laboratory Management.
