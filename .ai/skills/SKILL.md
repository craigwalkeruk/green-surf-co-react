### Bulletproof React AI Skill Registry

This is the central entry point for AI agents working on the Bulletproof React project. Use this registry to discover specialized skills and guidelines for specific tasks.

### How to Use These Skills
1. **Identify the Task**: Determine the domain of your current task (e.g., creating a new API endpoint, styling a component, or writing a test).
2. **Consult the Relevant Skill**: Read the corresponding `SKILL.md` file in the directories below for actionable instructions and project-specific patterns.
3. **Follow the Guidelines**: Ensure your implementation aligns with the architectural rules and best practices defined in each skill.
4. **Reference Detailed Docs**: Use the links within each `SKILL.md` to access deeper reference documentation when needed.

### Available Specialized Skills

| Skill Area | Location | When to Use |
| :--- | :--- | :--- |
| **Project Overview** | `overview/` | When onboarding or needing high-level context about the application domain and data model. |
| **Project Structure** | `project-structure/` | When deciding where to place new files or understanding feature-based architecture. |
| **Coding Standards** | `project-standards/` | When writing or refactoring code to ensure compliance with linting, naming, and import rules. |
| **API & Data Fetching** | `api-layer/` | When implementing new API requests, fetchers, or TanStack Query hooks. |
| **State Management** | `state-management/` | When deciding between local, global, server cache, or URL state. |
| **Components & Styling** | `components-styling/` | When building UI components, using Tailwind CSS, or creating Storybook stories. |
| **Testing Strategy** | `testing/` | When writing Unit, Integration, or E2E tests using Vitest, Testing Library, or Playwright. |
| **Error Handling** | `error-handling/` | When implementing error boundaries, API interceptors, or tracking. |
| **Performance & Security** | `performance-security/` | When optimizing for speed or implementing authentication/authorization (RBAC/PBAC). |

### Global Project Principles
- **Feature-Based**: Business logic is organized by feature in `src/features/`.
- **Unidirectional**: Flow moves from Shared -> Features -> App. Features must be independent.
- **Type-Safe**: TypeScript and Zod are used throughout for robust data validation and type safety.
- **User-Centric**: Development and testing prioritize the user's experience and interaction patterns.
