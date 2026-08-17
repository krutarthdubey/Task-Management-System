# AbleSpace Task Manager

A finished full-stack task management application built around the project architecture we planned: **Next.js + TypeScript + Tailwind** frontend, **NestJS + TypeScript + MongoDB** backend.

## Included

- Email/password registration and login
- Guest login
- JWT authentication
- Responsive workspace shell with light/dark mode
- Overview dashboard with task statistics
- Task creation, editing, deletion and completion
- Status and priority filtering
- Search
- List/grid task views
- Due dates and tags
- Task detail pages
- Subtask/resources-ready data model
- Comments/collaboration
- Projects CRUD
- Profile/settings
- MongoDB persistence
- Docker Compose MongoDB setup

## Requirements

- Node.js 20+
- npm 10+
- MongoDB 7/8, or Docker Desktop

## Quick start

### 1. Start MongoDB

```bash
docker compose up -d
```

Or use a MongoDB Atlas connection string.

### 2. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

Backend runs on `http://localhost:5000`.

### 3. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

### 4. Or from the root

```bash
npm install
npm run install:all
npm run dev
```

## Environment

Backend `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ablespace_tasks
JWT_SECRET=change-this-secret
CLIENT_URL=http://localhost:3000
```

Frontend `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Production builds

```bash
npm run build --prefix backend
npm run build --prefix frontend
```

Then run the backend with `npm start --prefix backend` and the frontend with `npm start --prefix frontend`.

## Project structure

```text
ablespace-task-manager/
├── backend/
│   └── src/
│       ├── auth/
│       ├── users/
│       ├── tasks/
│       ├── projects/
│       ├── comments/
│       └── common/
├── frontend/
│   ├── app/
│   ├── components/
│   └── lib/
├── docker-compose.yml
└── README.md
```

The ZIP contains source code and configuration; `node_modules` and build output are intentionally excluded so the archive stays portable.
