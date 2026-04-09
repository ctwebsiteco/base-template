# Components

See [agents/agents.md](agents/agents.md) for task-specific guides.

**Rule**: Never modify `components/ui/` directly — it is shadcn/ui managed. Use `pnpm ui add <component>` to add components.

| Type | Examples | Pattern |
|------|----------|---------|
| Server Components | `json-ld.tsx`, `site-footer.tsx` | RSC by default |
| Client Components | `rum-client.tsx`, `ga4.tsx` | `"use client"` directive |
| Hybrid | `contact-form.tsx` | Server wrapper + client form |