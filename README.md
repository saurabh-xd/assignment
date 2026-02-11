# 🧠 AI Customer Support System (Multi-Agent)

Fullstack AI-powered customer support system with multi-agent architecture.

**Stack:** Turborepo + Hono + Prisma + Next.js + Vercel AI SDK

---

## 🚀 Architecture

```
User → Next.js Frontend
     → Hono API
     → Router Agent
        ├─ Order Agent (order status, tracking)
        ├─ Billing Agent (invoices, refunds)
        └─ Support Agent (FAQs, help)
     → Tools (DB queries)
     → PostgreSQL
```

---

## 🧱 Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | Next.js, TailwindCSS |
| **Backend** | Hono, Node.js |
| **Database** | PostgreSQL (Neon), Prisma ORM |
| **AI** | Vercel AI SDK, Groq |
| **Monorepo** | Turborepo |

---

## 📁 Project Structure

```
apps/
 ├─ api/      # Backend (Hono server)
 └─ web/      # Frontend (Next.js)

packages/
 └─ db/       # Prisma + Database client
```

---

## 🤖 Multi-Agent System

### Router Agent
Analyzes user intent and delegates to specialist agents.

### Sub-Agents

| Agent | Handles | Tools |
|-------|---------|-------|
| **Order** | Order status, tracking, cancellations | `getOrderDetails()` |
| **Billing** | Invoices, refunds, payments | `getInvoiceDetails()` |
| **Support** | FAQs, general support | `getConversationHistory()` |

---

## 🗃️ Database Schema

- `Conversation` - Chat sessions
- `Message` - Chat messages with agent context
- `Order` - Customer orders
- `Invoice` - Billing invoices

---

## 🛣️ API Routes

### Chat
```
POST   /api/chat/messages
GET    /api/chat/conversations
GET    /api/chat/conversations/:id
DELETE /api/chat/conversations/:id
```

### Agents
```
GET /api/agents
GET /api/agents/:type/capabilities
```

### Health
```
GET /api/health
```

---

## ⚙️ Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables

**`apps/api/.env`**
```env
DATABASE_URL=your_postgres_url
GROQ_API_KEY=your_groq_key
```

**`packages/db/.env`**
```env
DATABASE_URL=your_postgres_url
```

### 3. Database Setup
```bash
cd packages/db
npx prisma migrate dev
npx tsx prisma/seed.ts
```

### 4. Run Development Server
```bash
npm run dev
# or
npx turbo dev
```

- **Frontend:** http://localhost:3000
- **API:** http://localhost:3001

---

## 🧪 Example Queries

```
"Where is my order ORD-001?"
→ Routes to Order Agent → Fetches order from DB

"I need invoice INV-001"
→ Routes to Billing Agent → Retrieves invoice

"How do I reset my password?"
→ Routes to Support Agent → Searches knowledge base
```

---

## ✅ Features

- ✅ Multi-agent routing system
- ✅ AI-powered intent classification
- ✅ Database-backed tools
- ✅ Conversation memory & context
- ✅ Controller-Service pattern
- ✅ Global error handling middleware
- ✅ Type-safe Hono RPC (Turborepo)
- ✅ Seeded test data
- ✅ REST API with proper validation
- ✅ Modern chat UI with TailwindCSS



