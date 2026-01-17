🤖 Chatbot Platform — Full-Stack LLM SaaS

A minimal yet production-ready Chatbot Platform that allows users to authenticate, create projects (agents), manage system prompts, and chat with an LLM in real time.
Built with a clean, extensible architecture and deployed on modern cloud infrastructure.

🌐 Live Demo

Frontend (Vercel): https://chatbot-platform-mu.vercel.app

Backend (Render): https://chatbot-backend-0g5l.onrender.com

✨ Features
Core Features

🔐 User authentication (JWT)

👤 Secure user account management

📁 Project / Agent creation per user

🧠 System prompt management per project

💬 Real-time AI chat (streaming responses)

🕓 Persistent chat history (per project)

Non-Functional

⚡ Low-latency streaming responses

🔒 Strict data isolation per user

📈 Scalable, stateless backend

🧩 Modular & extensible codebase

🚀 Production deployment (Vercel + Render)

🧱 High-Level Architecture
┌────────────┐ HTTPS ┌──────────────┐
│ Frontend │ ──────────────▶ │ Backend │
│ (Vercel) │ │ (Render) │
└────────────┘ └──────┬───────┘
│
▼
┌────────────┐
│ PostgreSQL │
│ (Render) │
└────────────┘

🧠 System Design Explanation
1️⃣ Frontend (React + Vite)

Built with React + Vite

Tailwind CSS for UI

JWT stored in localStorage

Uses:

axios for standard API calls

native fetch() for streaming chat responses

Chat UI updates incrementally as tokens stream in

2️⃣ Backend (Node.js + Express)

Stateless REST API

JWT-based authentication middleware

Each request is scoped to a userId

Clean route separation:

/auth → authentication

/projects → project management

/chat → AI interaction

3️⃣ Database (PostgreSQL + Prisma)

PostgreSQL hosted on Render

Prisma ORM for:

schema definition

migrations

type-safe queries

Core Models:

User → Project → ChatMessage

Strong relational integrity

All data scoped per authenticated user

4️⃣ LLM Integration (OpenRouter)

Uses OpenRouter API (provider-agnostic)

Easy model switching (e.g. Mistral, LLaMA)

Supports streaming responses

System prompt injected per project

🔐 Authentication Flow

User registers or logs in

Backend issues a JWT

JWT stored on client

JWT sent in Authorization header

Middleware verifies token and injects userId

All queries are user-scoped

💬 Chat Flow (Streaming)

User sends message

Message saved to DB (role: user)

Backend forwards prompt + system prompt to LLM

LLM response streams token-by-token

Tokens streamed to frontend

Final assistant message persisted to DB

📦 Tech Stack
Frontend

React

Vite

Tailwind CSS

Axios

Backend

Node.js

Express

JWT

Prisma ORM

Database

PostgreSQL

AI

OpenRouter (LLM provider)

Deployment

Frontend: Vercel

Backend: Render

Database: Render PostgreSQL

🚀 Local Setup
1️⃣ Clone Repository
git clone https://github.com/<your-username>/chatbot-platform.git
cd chatbot-platform

2️⃣ Backend Setup
cd backend
npm install

Create .env:

DATABASE_URL=postgresql://...
JWT_SECRET=supersecret
OPENAI_API_KEY=sk-or-xxxx
OPENAI_BASE_URL=https://openrouter.ai/api/v1
PORT=5000

Run migrations:

npx prisma migrate dev

Start backend:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🌍 Deployment Strategy
Backend (Render)

Node Web Service

Prisma migrations run during build

Stateless design allows horizontal scaling

Frontend (Vercel)

Static build

Global edge delivery

Environment-agnostic API configuration

🛡️ Security Considerations

Passwords hashed with bcrypt

JWT expiration enforced

User-scoped DB queries

No secrets exposed to frontend

CORS handled explicitly for production

🔮 Future Improvements

🔁 Refresh tokens

🧠 Multiple agents per project

📎 File uploads (OpenAI Files API)

📊 Analytics & usage limits

🗄️ Redis caching

🔐 OAuth (Google / GitHub)

🎥 Demo Walkthrough (Suggested)

Register user

Login

Create project

Edit system prompt

Chat with AI

Refresh page → history persists

🏁 Summary

This project demonstrates:

Real-world full-stack engineering

Production deployment

LLM integration

Scalable architecture

Clean separation of concerns

This is a real SaaS foundation, not a toy project.
