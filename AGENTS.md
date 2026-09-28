# Base44 Dev Environment

## Stack
- **Next.js 16.1.1** (Turbopack) + React 19, TypeScript, Tailwind v4.
- **PostgreSQL 16** for the data layer (`src/lib/db.ts`, schema in `src/lib/schema.sql`).

## Running
```
docker compose -f docker-compose.base44.yml up -d
```
- `web` (node:22) bind-mounts the repo at `/app`, runs `npm install && npx next dev -p 3000 -H 0.0.0.0`, exposes host port 3000.
- `db` (postgres:16-alpine) with generated local creds (`vendor:vendorpass`).
- `migrate` is a one-shot that runs `src/lib/schema.sql` against `db`, ordered after db is healthy.

## Notes / Quirks
- The UI pages are **client components using mock data** (`src/lib/mock-data.ts`). The `db.ts` pool and `sql` helpers exist but are NOT imported by any route — the app renders fully without a live DB. Postgres + migration are set up so the DB layer is functional if routes are added.
- `next.config.ts` sets `allowedDevOrigins` from `BASE44_PUBLIC_HOST_SUFFIX` so the preview origin can reach dev assets/HMR. The var is passed into the `web` service environment.
- Local infra credentials are inline in compose (`environment:`); no external secrets are required to boot. `.env.base44-defaults` holds non-secret placeholders; `/run/base44/app.env` (last in `env_file:`) overrides them if real secrets are added later.

## Verify
- `curl localhost:3000` returns the dashboard HTML (`<title>VendorShield ...`).
- `docker compose exec -T db psql -U vendor -d vendor_risk_db -c "\dt"` lists `vendors` and `vendor_audit_log`.
