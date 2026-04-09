#!/usr/bin/env node
// Verify CLAUDE.md files exist in required directories

import { readdirSync, statSync, existsSync } from "fs";
import { join, relative } from "path";

const rootDir = process.cwd();

// Directories that MUST have a CLAUDE.md
const requiredDirs = [
  "",
  "lib",
  "sanity",
  "app",
  "components",
];

// Directories that need CLAUDE.md if they contain agents/ or skills/ subdirs
// (.claude is a Claude Code settings dir, not an app module — skip it)
function findSpecialDirs(dir) {
  const results = [];
  try {
    const items = readdirSync(dir);
    for (const item of items) {
      if (item === "node_modules" || item === ".git" || item === ".husky" || item === ".claude") continue;
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        const hasAgentsOrSkills = existsSync(join(fullPath, "agents")) ||
                                  existsSync(join(fullPath, "skills"));
        if (hasAgentsOrSkills && item !== "agents" && item !== "skills") {
          results.push(fullPath);
        }
        results.push(...findSpecialDirs(fullPath));
      }
    }
  } catch {
    // skip
  }
  return results;
}

const specialDirs = findSpecialDirs(rootDir);
const allRequired = new Set([
  ...requiredDirs.map((d) => (d ? join(rootDir, d, "CLAUDE.md") : join(rootDir, "CLAUDE.md"))),
  ...specialDirs.map((d) => join(d, "CLAUDE.md")),
]);

const missing = [...allRequired].filter((f) => !existsSync(f));

if (missing.length > 0) {
  console.error("Missing required CLAUDE.md files:");
  missing.forEach((f) => console.error(`  - ${relative(rootDir, f)}`));
  process.exit(1);
}

console.log("All CLAUDE.md files present.");
process.exit(0);