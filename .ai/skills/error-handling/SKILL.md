### Error Handling & Tracking (AI Skill)

Use this skill when implementing error boundaries, API interceptors, or production error tracking. This ensures the app is resilient and errors are logged correctly.

### How to Use for AI Agents
1. **API Errors**: If handling network issues, use the Axios interceptor in `src/lib/api-client.ts`.
2. **UI Resilience**: Add localized error boundaries in features/layouts to prevent full app crashes.
3. **Tracking**: Ensure production errors are reported via Sentry.

### API Error Handling
- **Interceptor**: Use an Axios interceptor (`src/lib/api-client.ts`) to manage global API errors.
- **Actions**: Trigger notification toasts, log out unauthorized users, or handle token refreshes centrally.

### Application Error Boundaries
- **Granularity**: Do not rely on a single global error boundary. Place multiple boundaries around different parts of the application (e.g., features, layouts).
- **Benefit**: Contains errors locally, preventing a total app crash and allowing users to continue using other parts of the system.

### Production Error Tracking
- **Tool**: **Sentry** (recommended).
- **Best Practice**: Upload source maps to Sentry to map minified production errors back to original source code.

### Supporting Resources
- [Detailed Error Handling Reference](reference/error-handling-detail.md)
