import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "scripts/**",
    "data/**",
    "seed/**",
  ]),

  // Project-specific rules for app/ and components/ (NOT system dirs)
  {
    files: ["app/**/*.ts", "app/**/*.tsx", "components/**/*.ts", "components/**/*.tsx"],
    ignores: ["app/actions/**", "app/api/**", "app/layout.tsx", "lib/data/**"],
    rules: {
      // No direct Sanity client in pages/components (except system dirs)
      "no-restricted-imports": [
        "error",
        {
          name: "@/sanity/lib/client",
          message:
            "Use lib/data/ accessors (getCompanyInfo, getContactForm). Direct client access is only allowed in lib/data/, sanity/, app/actions/, app/api/, and app/layout.tsx.",
          allowTypeImports: true,
        },
      ],

      // No if(client) patterns in app/ and components/ (except system dirs)
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "IfStatement[test.type='Identifier'][test.name='client']",
          message:
            "if(client) is only allowed in lib/data/, sanity/, app/actions/, and app/api/. Use lib/data/ accessors instead.",
        },
        {
          selector:
            "BinaryExpression[operator='&&'][left.type='Identifier'][left.name='client']",
          message:
            "client && ... is only allowed in lib/data/, sanity/, app/actions/, and app/api/. Use lib/data/ accessors instead.",
        },
      ],
    },
  },

  // General rules
  {
    rules: {
      // Warn on console.log
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Unused vars
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },

  // Sanity schemas — no console allowed
  {
    files: ["sanity/schemas/**/*.ts"],
    rules: {
      "no-console": "error",
    },
  },
]);

export default eslintConfig;