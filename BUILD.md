# Build scripts for Traefik Learn Interactive Guide

## Production Build
```bash
npm run build
```

## Docker Build & Deploy
```bash
docker compose up -d --build
```

## Development
```bash
npm run dev
```

## Environment Variables
- `OPENAI_API_KEY` — Optional: for AI-powered search (set in .env or docker compose environment)
