## 🎬 TMDB Movie Explorer (Next.js App Router)

A server-rendered Movie Explorer application built using Next.js App Router and TypeScript.
The project uses a Backend-for-Frontend (BFF) approach to securely interact with the TMDB API, demonstrating best practices in SSR, API design, caching, and error handling.

## Features

- 🔍 Search movies using TMDB
- 📄 Movie detail page with full information
- 🖼️ Dynamic poster & backdrop image handling
- ⚡ Server-Side Rendering (SSR) using App Router
- 🔐 Secure API access via backend route handlers
- 🧠 Backend-for-Frontend (BFF) architecture
- 🚦 Proper error handling (including rate limits)
- 🧪 Manual and code-level testing
- 📦 Type-safe codebase with TypeScript

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- React
- TMDB API
- Fetch API
- Vercel (Deployment)

## env file
```
NEXT_PUBLIC_BASE_URL = <VERCEL_HOME_URL>
READ_ACCESS_TOKEN = <TMDB_READ_ACCESS_TOKEN>
```

## Run Locally
```
npm run build
npm run start 
npm run test 
npm run typecheck 
```
