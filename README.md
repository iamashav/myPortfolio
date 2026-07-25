# ashavparihar.me

Personal site and portfolio, structured as an npm workspaces monorepo so a future blog and
playground app can be added without a rebuild of the setup.

## Structure

- `apps/site` — the portfolio (Vite + React + TypeScript + SCSS), deployed to `/`
- `apps/blog` — reserved for a future blog, deployed to `/blog`
- `apps/playground` — reserved for a future project, deployed to `/play`
- `packages/ui` — shared design tokens (colors, spacing, radius, type, breakpoints)

## Development

```bash
npm install
npm run dev --workspace apps/site
```

## Build

```bash
npm run build --workspace apps/site
```
