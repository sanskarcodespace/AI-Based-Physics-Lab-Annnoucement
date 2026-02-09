# Laboratory System Installation Guide

This guide covers the production deployment of the AI-Based Physics Lab Announcement system.

## 1. Prerequisites
- Node.js 18+
- Python 3.9+
- SQLite3

## 2. Environment Setup
Copy the `.env.example` (or create `.env`) and configure your variables:
```bash
DATABASE_URL="file:./dev.db"
ELEVENLABS_API_KEY="your_api_key_here" # Optional for premium TTS
```

## 3. Database Initialization
```bash
npm install
npx prisma migrate dev --name init
npx prisma generate
```

## 4. TTS Microservice (Python)
Navigate to `tts_service` and install dependencies:
```bash
pip install -r requirements.txt
# To run manually:
python main.py
```

## 5. Background Service Installation
We provide a CLI tool to generate the appropriate service for your OS:

### Run the Installer
```bash
node scripts/setup-service.js install
```

### OS Specific Activation
- **Windows**: Use the generated XML with Task Scheduler (`schtasks`).
- **Linux**: Copy the generated `.service` to `/etc/systemd/system/`.
- **macOS**: Copy the `.plist` to `~/Library/LaunchAgents/`.

## 6. Logs & Audits
Logs are stored in the `logs/` directory and persisted in the SQLite database accessible via the `/dashboard/logs` UI.
