# ghwls.com

Personal site.

## Develop

```bash
bun install
bun run dev        # dev server
```

## Build

```bash
bun run build      # static build into build/ (also fails on broken internal links)
bun run preview    # serve the built site
bun run check      # svelte-check
bun test           # vitest (pure helpers)
```

Deployed to Cloudflare Pages via `@sveltejs/adapter-static` (build command
`bun run build`, output dir `build`); redirects in `static/_redirects`. The old
portfolio lives on at `v1.ghwls.com`.
