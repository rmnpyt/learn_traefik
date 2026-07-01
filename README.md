# Traefik Learn

An interactive, comprehensive guide to **Traefik v3** — from basic reverse proxy setup to advanced API gateway and enterprise patterns.

Built with [Next.js](https://nextjs.org) (SSG) and deployed as a static site.

> **Live site:** [https://traefik-learn.raminshirani.com](https://traefik-learn.raminshirani.com)

## Features

- **15 chapters** covering everything from EntryPoints and Routers to Observability, Security, and Production deployments
- **Interactive playground** — live YAML config editor with request-flow visualization (React Flow)
- **Compose generator** — generate production `docker-compose.yml` with one click
- **Quiz arena** — multiple-choice questions and configuration challenges
- **Full-text search** across all content
- **AI-powered answers** — ask questions and get answers grounded in the guide content
- **Dark/light mode**
- **Static site generation** — fast, deployable anywhere

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, SSG) |
| Styling | Tailwind CSS v4, `@tailwindcss/typography` |
| Content | MDX via `next-mdx-remote` |
| Syntax highlighting | `highlight.js` |
| Diagrams | React Flow (`@xyflow/react`) |
| Code editor | Monaco Editor |
| Search | Full-text index + LLM-powered AI answers |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Output is in `.next/` — deploy the standalone build with the included `Dockerfile`.

## Docker

```bash
docker compose up -d
```

Runs on `http://localhost:3089`.

See [BUILD.md](./BUILD.md) for production deployment details.

## Content

All MDX content lives in `content/learn/` (chapters) and `content/reference/` (reference docs). Add or edit markdown files — the site rebuilds automatically.
