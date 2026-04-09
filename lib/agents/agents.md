# Lib Agents

Task-specific guides for the `lib/` directory. Read [AGENTS.md](../AGENTS.md) first.

## File Map

```
lib/
├── metadata.ts       → agents/seo.md (use createPageMetadata())
├── utils.ts           → Always import cn() from here, never rewrite
├── contact-schema.ts → agents/forms.md (use buildContactSchema())
└── resend.ts         → Resend client singleton
```

## Rule: Never Rewrite `cn()`

The `cn()` utility in `lib/utils.ts` is the single source of truth for class name merging. Always import from there:

```typescript
import { cn } from "@/lib/utils"

// Good
<span className={cn("base", isActive && "active")}

// Bad — never duplicate
<span className={"base " + (isActive ? "active" : "")}>
```

## Pattern: Resend Client

```typescript
// lib/resend.ts
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export { resend }
```

Use `import { resend } from "@/lib/resend"` everywhere you need to send email. Never instantiate Resend inline.