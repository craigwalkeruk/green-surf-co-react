### Testing Strategy (AI Skill)

Use this skill when adding or modifying Unit, Integration, or E2E tests. This ensures project reliability and code quality.

### How to Use for AI Agents
1. **Choose Test Level**: Focus on **Integration Tests** (Vitest/Testing Library) for features and **E2E Tests** (Playwright) for critical user flows.
2. **Mock APIs**: Always use **MSW** to define server responses; do not mock the fetch function directly.
3. **Verify Behavior**: Use Testing Library to interact with elements by their labels/roles, not their implementation details.

### Testing Philosophy
- **Confidence Over Coverage**: Focus on tests that provide the most confidence in the application's reliability (Integration & E2E).
- **User-Centric**: Test features in the way a user would interact with them, not their implementation details.

### Test Types
- **Unit Tests**: Test smallest parts (shared components, functions) in isolation. Fast and easy.
- **Integration Tests**: Test how different parts work together. Focus on these for feature validation.
- **E2E Tests**: Test the entire application as a whole, simulating real-world user scenarios.

### Core Tooling
- **Vitest**: Modern testing framework (Jest-compatible). Used for Unit and Integration tests.
- **Testing Library**: Tool for user-centric testing (renders on screen, interacting with components).
- **Playwright**: Tool for E2E testing. Supports browser (visual) and headless (CI/CD) modes.
- **MSW (Mock Service Worker)**: Intercepts HTTP requests and returns mocked data. Used for designing APIs, mocking responses in development, and testing.

### Key Practices
- **Mocking**: Use MSW to define API handlers and DB models for consistent, predictable test data.
- **Avoid Fetch Mocking**: Let MSW intercept actual network requests during testing for a more realistic setup.

### Supporting Resources
- [Detailed Testing Reference](reference/testing-detail.md)
