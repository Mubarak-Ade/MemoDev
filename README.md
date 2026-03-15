# MemoDev

MemoDev is a full-stack web application for managing development notes in the form of **projects** and **code snippets**. It includes secure authentication, email verification, password reset flows, and a protected dashboard experience.

## Tech Stack

### Frontend (`client/`)
- React 19 + TypeScript
- Vite
- React Router
- React Query
- Zustand
- Tailwind CSS + Radix UI/shadcn-style components

### Backend (`server/`)
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- JWT-based auth (access + refresh)
- Cookie-based session/refresh handling
- Nodemailer for transactional email
- Zod + express-validator input validation

## Project Structure

```text
MemoDev/
├── client/   # React frontend
├── server/   # Express API + MongoDB models
└── README.md
```

## Prerequisites

Before running locally, make sure you have:
- Node.js 18+
- npm 9+
- A MongoDB instance (local or cloud)
- SMTP credentials (for verification + password reset email)

## Environment Variables

Create a `.env` file in `server/` with the following keys:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_SECRET=your_access_token_secret
REFRESH_SECRET=your_refresh_token_secret
NODE_ENV=development
CLIENT_URL=http://localhost:5173
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

## Installation

Install dependencies for both apps:

```bash
cd client && npm install
cd ../server && npm install
```

## Running the App (Development)

Start backend:

```bash
cd server
npm run dev
```

Start frontend in a separate terminal:

```bash
cd client
npm run dev
```

Default local URLs:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000` (or your `PORT`)

## Build for Production

Frontend:

```bash
cd client
npm run build
```

Backend:

```bash
cd server
npm run build
npm start
```

## API Overview

Base API routes exposed by the backend:
- `/api/auth` – signup, login, refresh, logout, email verification, password reset, profile
- `/api/projects` – create/read/update/delete projects (protected)
- `/api/snippets` – create/read/update/delete snippets + tags (protected)

## Notes

- The frontend currently uses Vite defaults for environment handling.
- CORS is configured in the backend and expects `CLIENT_URL` to match the frontend origin.
- Replace placeholder secrets with strong random values in production.
