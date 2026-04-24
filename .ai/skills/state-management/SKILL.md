### State Management (AI Skill)

Use this skill when choosing between local component state, global state, server cache, or URL state. This ensures efficient data management.

### How to Use for AI Agents
1. **Fetch Data**: Always use **TanStack Query** for remote server data.
2. **UI State**: Use **Zustand** for simple global UI state (modals, notifications).
3. **Form State**: Use **React Hook Form** with **Zod** for inputs.
4. **Shared Info**: Use **React Router** for shareable state (IDs, filters).

### 1. Component State
- **Usage**: Data specific to a single component and its children.
- **Tools**: `useState`, `useReducer`.
- **Guideline**: Start local, elevate only if needed.

### 2. Application (Global) State
- **Usage**: Global UI state (modals, notifications, theme).
- **Tool**: **Zustand** (primary).
- **Guideline**: Localize as much as possible; avoid globalizing everything.

### 3. Server Cache State
- **Usage**: Data fetched from the server.
- **Tool**: **TanStack Query (React Query)**.
- **Guideline**: Do not store remote data in global state stores like Zustand/Redux. Use Query for caching, revalidation, and synchronization.

### 4. Form State
- **Usage**: User input and validation.
- **Tools**: **React Hook Form** + **Zod** (for validation).
- **Guideline**: Use abstracted `Form` and `Input` components.

### 5. URL State
- **Usage**: Data in the address bar (ID in path, search filters in query params).
- **Tool**: **React Router**.
- **Guideline**: Use for shareable state (e.g., current discussion ID, search queries).

### Supporting Resources
- [Detailed State Management Reference](reference/state-management-detail.md)
