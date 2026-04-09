# Sanity CMS

See [agents/agents.md](agents/agents.md) for task-specific guides.

**Core rule**: `client` is always nullable. Always `if (client)` before fetch.

```typescript
import { client } from "./lib/client"

if (client) {
  try {
    data = await client.fetch(MY_QUERY)
  } catch {
    data = null
  }
}
```