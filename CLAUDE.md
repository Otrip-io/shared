# @otrip/shared

Cross-project shared package. Pure TypeScript — no framework dependencies.

## Build

```bash
bun install && bun run build    # compile src/ → dist/
```

`dist/` is committed to git (git URL deps don't run install hooks).

## Current Modules

```
src/
  constants/    # ROLES, OTP_CONTEXTS, TOKEN_TYPES, GENDERS, TRIP_ROLES, OTP config values
  errors/       # ErrorDef, AUTH_ERRORS, OTP_ERRORS
  messages/     # AUTH_MESSAGES
  validation/   # PASSWORD_REGEX/MESSAGE, USERNAME_REGEX/MESSAGE
```

## Adding New Code

Only add when a feature actually needs it. Don't pre-create.

1. Create file in the appropriate module
2. Export from the module's `index.ts` barrel
3. `bun run build`

## What Belongs Here vs Stays Local

**Shared**: Values/types needed by both backend AND frontend (constants, errors, messages, validation, API response types)

**Local**: NestJS-specific code, Mongoose schemas, backend-only config (AUDIT_ACTIONS, SECURITY_THRESHOLDS)

## Technical

- **Output**: CJS (`"module": "commonjs"`) — NestJS compatibility
- **Error pattern**: `satisfies Record<string, ErrorDef>`
- **Subpath imports**: `@otrip/shared/constants`, `@otrip/shared/errors`, etc.

## CJS Compatibility (critical)

- tsconfig: `"module": "commonjs"`, `"moduleResolution": "node"` — never change
- NO `.js` extensions in source imports
- NO `"type": "module"` in package.json
- Exports map uses `"default"` condition only (not `"import"` / `"require"`)

## Testing

**No tests yet.** Pure constants/types — low risk. If adding logic (validators, formatters), add unit tests with Jest.

## After Any Change

1. `bun run build` — must compile clean
2. `cd ../api-service && bunx tsc --noEmit` — must pass
3. `cd ../web-app && bunx tsc -b` — must pass
4. `cd ../admin-panel && bunx tsc --noEmit` — must pass
5. Update this file (Current Modules) + root CLAUDE.md (Shared Package section)
