# ghwls.com

Personal site.

## Develop

```bash
nvm use            # Node pinned in .nvmrc (>=22.12 required by Vite)
npm install
npm run dev        # dev server
```

## Build

```bash
npm run build      # static build into build/ (also fails on broken internal links)
npm run preview    # serve the built site
npm run check      # svelte-check
npm test           # vitest (pure helpers)
```

Deployed to Cloudflare Pages via `@sveltejs/adapter-static`; redirects in
`static/_redirects`. The old portfolio lives on at `v1.ghwls.com`.
