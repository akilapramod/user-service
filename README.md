Notes
 - This scaffold shows OAuth redirect endpoints and strategy stubs. The strategies currently return placeholder user objects; you'll need to implement token exchange, user upsert, and issuance of local JWTs and refresh tokens.
 - This project uses Supabase (Postgres) as the primary datastore. Legacy archival schema/repository files have been removed from the codebase; the service is Supabase-only.
User Service (NestJS) — Quick start (PowerShell)

1) From `d:\e-channeling` project root, create the user-service folder and scaffolded files are already placed under `user-service/`.

2) Install dependencies (PowerShell):

```powershell
cd d:\e-channeling\user-service
npm install --legacy-peer-deps
```

3) Set up environment variables
- Copy `d:\e-channeling\.env` to `d:\e-channeling\user-service\.env` or point `src/main.ts` dotenv to parent .env (already configured to load parent .env).
- Fill Google/Azure client ids and secrets.
- Ensure Supabase vars are set: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_KEY), and any other required envs like API_PREFIX, PORT.

4) Run development server:

```powershell
npm run start:dev
```

## Vercel Deployment

1) Install Vercel CLI if not already: `npm i -g vercel`

2) In project root (`user-service/`), run `vercel login` and `vercel` to deploy (or push to GitHub and connect Vercel).

3) In Vercel dashboard, add environment variables:
   - SUPABASE_URL: Your Supabase project URL
   - SUPABASE_SERVICE_ROLE_KEY: Your Supabase service role key
   - SUPABASE_KEY: (Alternative to service role if needed)
   - API_PREFIX: /api (optional, defaults to /api)
   - PORT: 3002 (optional, Vercel ignores but for consistency)
   - Other OAuth secrets (GOOGLE_CLIENT_ID, etc.)

4) Access deployed app at <your-vercel-url> (redirects to /docs for Swagger UI) or <your-vercel-url>/docs directly.

Notes:
- The app now uses dynamic Swagger generation with @nestjs/swagger, no external YAML needed.
- For serverless, a handler is exported in main.ts, and vercel.json configures routing.
- If 404 persists, check Function Logs in Vercel for errors (e.g., missing env vars).
- This scaffold shows OAuth redirect endpoints and strategy stubs. The strategies currently return placeholder user objects; you'll need to implement token exchange, user upsert, and issuance of local JWTs and refresh tokens.
- This project uses Supabase (Postgres) as the primary datastore. Legacy archival schema/repository files were moved to `src/legacy/` for reference only.
