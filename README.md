# Davit Nazarov Portfolio

Full-stack portfolio landing page built for the test task: frontend presentation, API-backed content, contact form, email delivery, and a lightweight portfolio helper.

## Links

- GitHub: https://github.com/DavitNazarov/Portfolio
- Deploy: https://portfolio-m12j.onrender.com

## Stack

- Frontend: React 19, Vite 7, Tailwind CSS 4, Framer Motion, Lucide Icons
- Backend/API: Node.js, Express, TypeScript
- Database: MongoDB with Mongoose
- Email: Resend
- Deployment: Render

## What Is Implemented

- Public portfolio sections: intro, experience, education, working process, projects, awards, contact
- Backend API for projects, experience, education, awards, auth, notifications, AI chat, and contact form
- Protected dashboard for managing portfolio content
- Required feedback form with name, phone, email, and comment
- Loading, success, and error states for API-driven UI and the contact form
- Email flow: owner receives the message and the sender receives a copy
- Atlas AI portfolio helper: OpenRouter-powered chat using live MongoDB portfolio data, with a local fallback if the AI service is unavailable

## Contact Form

The contact form posts to:

```txt
POST /api/notify/contact
```

Payload:

```json
{
  "name": "Visitor name",
  "phone": "+995 ...",
  "email": "visitor@example.com",
  "comment": "Message text"
}
```

Backend behavior:

- validates required fields
- validates email format
- limits phone/comment length
- rate-limits submissions per IP
- sends the full message to `NOTIFY_EMAIL`
- sends a confirmation copy to the submitted email address
- returns clear error responses if validation fails or the mailer is not configured
- email delivery uses Resend; before domain verification, Resend can deliver only to the verified owner email, `nazarov.davit17@gmail.com`

## AI Usage

This project uses AI in two ways:

- Product feature: Atlas, an on-site portfolio helper powered by OpenRouter model `google/gemma-4-26b-a4b-it:free`. The backend builds the assistant context from the current MongoDB projects, experience, education, and awards data, so dashboard changes update what Atlas knows.
- Development workflow: AI was used mainly as a frontend UI/UX pair-programming tool. Before coding, I prepared the project context, API contracts, existing components, styling rules, and exact instructions for what the screen should do. Then I used AI to help implement layouts, component structure, responsive states, micro-interactions, and interface copy.

What was checked or fixed manually:

- API contracts and validation behavior
- form loading/success/error states
- Resend owner/user email flow
- responsive layout and visual consistency
- AI-generated frontend code was reviewed, simplified, and cleaned manually
- TypeScript build errors
- stale README content and inaccurate claims

## Environment Variables

Backend (`Backend/.env` locally or Render environment):

```txt
PORT=3000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret
RESEND_API_KEY=re_...
NOTIFY_EMAIL=owner@example.com
NOTIFY_FROM=Portfolio <onboarding@resend.dev>
OPENROUTER_API_KEY=sk-or-...
OPENROUTER_MODEL=google/gemma-4-26b-a4b-it:free
OPENROUTER_SITE_URL=https://your-deploy-url
OPENROUTER_APP_NAME=Davit Nazarov Portfolio
FRONTEND_URL=https://your-deploy-url
```

Notes:

- `MONGO_URI` is required for portfolio data and dashboard CRUD.
- `RESEND_API_KEY`, `NOTIFY_EMAIL`, and `NOTIFY_FROM` are required for the contact form email flow.
- Resend test mode only sends to the verified account email, `nazarov.davit17@gmail.com`. To send user copies to any visitor, verify a sending domain in Resend and use a `NOTIFY_FROM` address on that domain.
- `OPENROUTER_API_KEY` is required for Atlas AI answers. `OPENROUTER_MODEL` defaults to `google/gemma-4-26b-a4b-it:free`.
- In local frontend development, leave `VITE_API_URL` unset to use the Vite proxy, or set it to the backend URL if running separately.

## Run Locally

Install root dependencies:

```bash
npm install
```

Run frontend and backend together:

```bash
npm run dev
```

Run separately:

```bash
npm run dev:frontend
npm run dev:backend
```

Typical local URLs:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Build And Check

```bash
npm run build --prefix Backend
npm run build --prefix Frontend
npm run lint --prefix Frontend
```

Root production build:

```bash
npm run build
```

## Deploy Notes

Render uses:

```bash
npm install && npm run build
npm start
```

Set these Render environment variables before testing the contact form:

- `MONGO_URI`
- `JWT_SECRET`
- `RESEND_API_KEY`
- `NOTIFY_EMAIL`
- `NOTIFY_FROM`
- `OPENROUTER_API_KEY`
- `OPENROUTER_MODEL`
- `OPENROUTER_SITE_URL`
- `OPENROUTER_APP_NAME`

## Project Structure

```txt
Portfolio/
├── Backend/
│   ├── controller/
│   ├── lib/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   └── server.ts
├── Frontend/
│   └── src/
│       ├── components/
│       ├── constants/
│       ├── hooks/
│       ├── layout/
│       ├── lib/
│       └── page/
├── package.json
└── render.yaml
```
