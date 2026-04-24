### Project Structure (AI Skill)

Use this skill to keep new code aligned with the current layout of the repo.

### How to Use for AI Agents
1. **Locate Feature**: For feature work (e.g., `auth`, `discussions`), place code in `src/features/<feature>/`.
2. **Shared vs. Feature**: Use `src/components/`, `src/hooks/`, `src/lib/`, `src/utils/`, etc. only for cross-feature reuse.
3. **Verify Flows**: Avoid feature-to-feature imports; compose in `src/app/`.

### Core Directory Structure (`src/`)
- `app/`: Application layer (router, providers, and `routes/` entrypoints).
- `assets/`: Static assets (figma exports, world-peas demo assets, etc.).
- `components/`: Shared UI, grouped into `errors/`, `layouts/`, `seo/`, `ui/`.
- `config/`: App-level configuration helpers.
- `dev/`: Development-only utilities.
- `features/`: Business logic organized by feature.
- `hooks/`: Shared React hooks.
- `lib/`: Shared libraries/config (e.g., API client wrappers).
- `mocks/`: Mock data/handlers used across tests/dev.
- `test/`: Additional tests (outside `testing/`).
- `testing/`: Test utilities and mocks shared across suites.
- `types/`: Shared TypeScript types.
- `utils/`: Shared utility functions.

### Feature Structure (`src/features/<feature>/`)
Current pattern:
- `api/`: API request declarations and hooks (TanStack Query, fetchers, etc.).
- `components/`: UI scoped to the feature (with optional `__tests__/`).

When needed, add `hooks/`, `types/`, or `utils/` inside the feature. No feature-level `stores/` are present; prefer server cache (TanStack Query) or local component state. Create new subfolders only when they provide clear organization.

### Architecture Rules
1. **Feature Independence**: Features should not import from other features. Compose in `app/`.
2. **Unidirectional Flow**: `shared` -> `features` -> `app`.
   - Shared modules cannot import from features or app.
   - Features can import from shared but not from app.
   - App can import from both features and shared.
3. **Avoid Barrel Files**: Import files directly to improve tree-shaking and performance.

### Supporting Resources
- [Detailed Structure Reference](reference/project-structure-detail.md)
- [Unidirectional Flow Diagram](../assets/unidirectional-codebase.png)
