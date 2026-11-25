# MovyoHealth

Web app for MovyoHealth—telehealth and digital healthcare—built with Next.js. The UI uses Tailwind CSS, with Inter and Instrument Serif loaded via `next/font`.

## Tech stack

| Area        | Choice                          |
| ----------- | ------------------------------- |
| Framework   | [Next.js](https://nextjs.org) 16 (App Router) |
| UI          | React 19, Tailwind CSS 4       |
| Language    | TypeScript                      |
| Linting     | ESLint (Next.js config)         |
| Container   | Docker (multi-stage, standalone output) |

## Prerequisites

- **Node.js** 20+ (recommended: current LTS)
- **npm** (ships with Node)
- **Docker Desktop** (optional, for containerized build/run)

## Install

```bash
npm install
```

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start dev server (default: [http://localhost:3000](http://localhost:3000)) |
| `npm run build` | Production build |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint |
| `npm run docker:build` | Build Docker image `movyohealth` |
| `npm run docker:run` | Run container, host port **3000** |
| `npm run docker:run:3001` | Run container, host port **3001** (if 3000 is busy) |
| `npm run docker:compose` | `docker compose up --build` |

## Local development

```bash
npm run dev
```

Edit files under `src/`; the dev server hot-reloads. Main routes live in `src/app/` (e.g. `/`, `/ui`, `/component`).

## Production build

```bash
npm run build
npm run start
```

## Docker

Build and run the production image:

```bash
npm run docker:build
npm run docker:run
```

Or with Compose:

```bash
docker compose up --build
```

**Port in use:** If `docker run` fails because port 3000 is taken (e.g. `npm run dev` is running), stop the other process or use `npm run docker:run:3001` and open [http://localhost:3001](http://localhost:3001).

**Git Bash on Windows:** If `docker` is not found, use `npm run docker:*` (npm uses the Windows `PATH`), or run `source scripts/gitbash-docker-path.sh` once per session, then use the `docker` CLI directly.

## Project layout

```
src/
  app/           # App Router: pages, layout, global styles
  components/    # UI and layout components
public/          # Static assets
```

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
- [Next.js deployment](https://nextjs.org/docs/app/building-your-application/deploying)

## Deploy

You can deploy to [Vercel](https://vercel.com) or any host that runs Node or Docker; use `npm run build` and `npm run start`, or ship the Docker image built by this repo’s `Dockerfile`.
