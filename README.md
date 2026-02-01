# Portfolio

A full-stack portfolio website with a public-facing site and a protected dashboard to manage content. All displayed content (experience, education, projects, skills) is loaded from the API.

## Tech Stack

- **Frontend:** React 19, Vite 7, Tailwind CSS 4, Framer Motion, React Router
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB (Mongoose)

## Project Structure

```
Portfolio/
├── Frontend/          # React SPA (Vite)
│   └── src/
│       ├── page/      # Home, Experience, Education, Projects, Contact, Auth, Dashboard
│       ├── layout/    # MainLayout
│       ├── context/   # AuthContext
│       ├── lib/       # api, utils
│       └── constants/ # routes, etc.
├── Backend/           # Express API
│   ├── controller/    # auth, projects, experience, education
│   ├── model/         # User, Projects, Experience, Education
│   ├── routes/        # auth, projects, experience, education
│   ├── middleware/    # auth (JWT)
│   └── server.ts
└── package.json       # Root scripts (runs both apps)
```

## Features

- **Public pages:** Home, Experience, Education, Projects, Contact — all data from API
- **Auth:** Login with JWT; unauthorized users cannot access the dashboard or see the dashboard dropdown
- **Dashboard (protected):** Manage Projects, Experience, and Education (CRUD)
- **Home:** Current role & company, education, and focus (unique tech from projects) — all from API

## API Endpoints

| Area        | Public (GET)           | Protected (auth required)                    |
|------------|------------------------|----------------------------------------------|
| Auth       | —                      | `POST /api/auth/login`                       |
| Projects   | `GET /api/projects/public` | Create, update, delete, get-all             |
| Experience | `GET /api/experience/public` | Create, update, delete, get-all         |
| Education  | `GET /api/education/public` | Create, update, delete                   |

## Setup

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

### Environment

**Backend** (`Backend/.env`):

- `PORT` — server port (e.g. `5000`)
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs

**Frontend** (optional):

- `VITE_API_URL` — base URL for the API (e.g. `http://localhost:5000`). Omit for same-origin.

### Install & Run

```bash
# Install root deps (concurrently)
npm install

# Run frontend and backend together
npm run dev
```

Or run separately:

```bash
npm run dev:frontend   # Frontend only (Vite)
npm run dev:backend    # Backend only (Express)
```

- Frontend: typically `http://localhost:5173`
- Backend: `http://localhost:5000` (or your `PORT`)

## Scripts (root)

| Script         | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Start Frontend + Backend       |
| `npm run dev:frontend` | Start Frontend only   |
| `npm run dev:backend`  | Start Backend only    |
| `npm run build`        | Build Backend, output to `dist` |
| `npm run start`        | Run built Backend             |

## Deploy on Render (Backend + MongoDB Atlas)

1. **Environment variables** (Render → Service → Environment):
   - `MONGO_URI` — your Atlas connection string (e.g. `mongodb+srv://user:pass@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`)
   - `JWT_SECRET` — secret for JWT (any long random string)
   - `PORT` — set by Render automatically; no need to add it

2. **MongoDB Atlas Network Access** (required for Render to reach Atlas):
   - Atlas → Network Access → Add IP Address
   - Add **`0.0.0.0/0`** (Allow access from anywhere) so Render’s outbound IPs can connect  
   - Without this you’ll see `MongoServerSelectionError` or TLS/SSL errors on deploy

3. **Connection string**: If the password contains `@`, `#`, `:`, etc., [URL-encode](https://www.urlencoder.org/) it in the URI.

4. **Build & start**: Use build command `npm install; npm run build` and start command `npm run start` (root). The backend uses Mongoose only and connects with timeouts suitable for Atlas.

## License

Private / portfolio use.
