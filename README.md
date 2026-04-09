# MemoDev

MemoDev is a full-stack developer knowledge vault for saving code snippets, technical notes, and reusable implementation ideas in one place.

Instead of digging through old repositories or repeating the same solutions, you can organize your work by project, tag, and language, then revisit it from a focused dashboard.

---

## What’s New

Recent additions to the project include:

- Dashboard overview with snippet, draft, and project stats
- Dedicated draft snippets page
- Snippet preview page with markdown and code rendering
- Edit snippet flow from preview and dashboard actions
- Project-aware snippet creation and editing
- Skeleton loaders for key dashboard and snippet pages
- Improved loading states across overview, drafts, preview, and editor screens
- Better project fallback handling when projects are deleted

---

## Features

- Secure authentication with access and refresh token flow
- Email verification and password reset
- Protected dashboard experience
- Project management for grouping snippets and notes
- Snippet creation, editing, preview, and deletion
- Draft and published snippet tracking
- Tag-based organization
- Markdown explanation rendering
- Code preview with language support
- Dashboard analytics and recent snippet activity

---

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- React Hook Form + Zod
- Zustand
- Tailwind CSS
- Radix UI based components

### Backend

- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- JWT authentication
- Cookie-based session handling
- Nodemailer
- Zod validation

---

## Project Structure

This project now uses a workspace layout:

```text
MemoDev/
├── apps/
│   ├── client/    # React frontend
│   └── server/    # Express API
├── packages/
└── README.md
```

Key app areas:

- `apps/client/src/pages/Dashboard` for overview, projects, drafts, snippet preview, and snippet editor pages
- `apps/client/src/components/features/Dashboard` for reusable dashboard UI
- `apps/server/src/modules` for auth, project, snippet, and dashboard services/controllers

---

## Prerequisites

Before running the project locally, make sure you have:

- Node.js 18+
- npm 9+
- MongoDB running locally or in the cloud
- SMTP credentials for email verification and password reset

---

## Environment Variables

Create a `.env` file in `apps/server/`:

```env
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

---

## Installation

Install dependencies from the repo root:

```bash
npm install
```

---

## Running the App

Run both frontend and backend from the root:

```bash
npm run dev
```

Or run each app separately:

```bash
npm run dev:server
npm run dev:client
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## Production Build

Build both apps from the root:

```bash
npm run build
```

You can also build each workspace separately:

```bash
npm run build -w @memodev/server
npm run build -w @memodev/client
```

---

## API Overview

Main backend route groups:

- `/api/auth` for signup, login, logout, email verification, password reset, and profile
- `/api/projects` for project create/read/update/delete
- `/api/snippets` for snippet create/read/update/delete, drafts, tags, and languages
- `/api/dashboard` for overview statistics and recent activity

---

## Roadmap

Planned improvements:

- AI-assisted README and documentation generation
- Advanced snippet search
- Public snippet sharing
- More snippet filtering and sorting options
- Expanded developer knowledge tools

---

## Notes

- The frontend uses Vite environment handling
- CORS on the backend expects `CLIENT_URL` to match your frontend origin
- Replace placeholder secrets with strong values in production

---

## Author

**AIM**

- GitHub: https://github.com/Mubarak-Ade
- Portfolio: https://mubaraq-ade.vercel.app

---

## License

MIT
