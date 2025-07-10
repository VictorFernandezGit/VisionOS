# VisionOS – Growth Strategy Simulator for Founders & CEOs

**VisionOS** is an intelligent business sandbox that empowers entrepreneurs to simulate decisions *before* they make them. Plug in your metrics, tweak levers like ad budget, pricing, churn, or conversion rate, and see projected impacts on MRR, CAC, LTV, and profit — all with actionable, AI-generated insights.

---

## 🧠 Core Features and services

- 📈 Simulate business changes in real-time
- 🔁 Model traffic → conversion → revenue flows
- 🧠 GPT-powered strategy insights from your numbers
- 📊 KPI dashboards & scenario comparison
- 🗂 Save and revisit simulation versions

---

## 🧱 Tech Stack

### Frontend
- `Next.js` + `Tailwind CSS`
- `Recharts.js` for visualizations
- `React Hook Form` for input management

### Backend
- `FastAPI` (or `Flask`) for API layer
- `Python` (NumPy + pandas) for simulation logic
- `OpenAI API` for insight generation

### Database
- `PostgreSQL` (via Supabase or Render)
- Optional: `TimescaleDB` for time-series financial projections

### Auth & Hosting
- `Supabase` (Auth + User storage)
- `Vercel` (Frontend) + `Render` (Backend API)

### Optional Services
- `Redis` (for caching GPT results or background jobs)
- `Celery` (for async sim processing)
- `S3` (for exporting scenarios or uploading historicals)

---

## 📊 System Architecture

---

## 🏗️ Monorepo Structure

- `frontend/` – Next.js (React, Tailwind, Recharts)
- `backend/`  – FastAPI, Celery, PostgreSQL, Redis, OpenAI

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker (for local dev)
- PostgreSQL, Redis (local or cloud)

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Celery Worker
```bash
cd backend
source venv/bin/activate
celery -A app.celery_worker.celery worker --loglevel=info
```

### Environment Variables
See `backend/.env.example` for required config.
