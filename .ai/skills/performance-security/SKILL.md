### Performance & Security (AI Skill)

Use this skill when optimizing for speed or implementing authentication/authorization (RBAC/PBAC). This ensures the app is both fast and secure.

### How to Use for AI Agents
1. **Performance**: Consult this before major state management or heavy UI changes.
2. **Security**: Use this for JWT handling, RBAC checks, or user-generated content sanitization.

### Performance Optimizations
- **Code Splitting**: Implement at the route level using dynamic imports (lazy loading). Avoid over-splitting.
- **State Management**:
  - Keep state local to where it's used to minimize re-renders.
  - Use **Zustand** or **TanStack Query** for medium/high-velocity data instead of Context.
  - Use state initializer functions for expensive computations: `useState(() => myExpensiveFn())`.
- **Children Prop**: Use `children` to isolate VDOM structures and prevent parent re-renders from affecting them.
- **Styling**: Prefer zero-runtime solutions like **Tailwind CSS** or CSS Modules over runtime CSS-in-JS.
- **Images**: Use modern formats (WebP), lazy loading, and `srcset`.
- **Data Prefetching**: Use `queryClient.prefetchQuery` for anticipated user navigation.

### Security Best Practices
- **Authentication**:
  - Use **JWT** stored in `HttpOnly` cookies (via `js-cookie` in dev/mock) to prevent XSS theft.
  - Global user state is managed via `react-query-auth` in `src/lib/auth.tsx`.
- **Authorization**:
  - **RBAC** (Role-Based Access Control): Use the `Authorization` component with roles (e.g., `ADMIN`, `USER`).
  - **PBAC** (Permission-Based Access Control): Use custom policies for granular checks (e.g., "is owner").
- **XSS Prevention**: Always sanitize user-generated HTML/Markdown before rendering (using `DOMPurify` or similar).

### Supporting Resources
- [Detailed Performance Reference](reference/performance-detail.md)
- [Detailed Security Reference](reference/security-detail.md)
