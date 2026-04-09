# Lib

See [agents/agents.md](agents/agents.md) for task-specific guides.

**Rule**: Never rewrite `cn()`. Always import from `@/lib/utils`:

```typescript
import { cn } from "@/lib/utils"
const className = cn("base", isActive && "active")
```