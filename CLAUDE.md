# @otrip/shared

Cross-project shared package. Pure TypeScript — no framework dependencies. Output: CJS.

```bash
bun install && bun run build    # compile src/ → dist/
```

`dist/` is committed to git (git URL deps don't run install hooks).

## Modules

`constants/`, `errors/`, `messages/`, `validation/` — values/types needed by both backend AND frontend.

## Rules

- **CJS only**: `"module": "commonjs"`, `"moduleResolution": "node"`. No `.js` extensions in source. No `"type": "module"`.
- Only add code when a feature actually needs it. No pre-creating.
- What belongs here: constants, errors, messages, validation, API response types used by 2+ projects.
- What stays local: NestJS-specific code, Mongoose schemas, backend-only constants.

## After Any Change

1. `bun run build` — clean compile
2. `cd ../api-service && bunx tsc --noEmit`
3. `cd ../web-app && bunx tsc -b`
4. `cd ../admin-panel && bunx tsc --noEmit`
