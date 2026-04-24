### API Layer & Data Fetching (AI Skill)

Use this skill when implementing or modifying API requests, fetchers, or TanStack Query hooks. This ensures consistent data handling and caching.

### How to Use for AI Agents
1. **Identify Request Needs**: When you need to fetch data, consult this skill.
2. **Implement Fetcher**: Create types/Zod schemas and a fetcher function in the appropriate feature's `api/` directory.
3. **Wrap in Hook**: Expose the request via a TanStack Query hook (e.g., `useGetItems`) following the patterns below.

### Core Principles
- **Single Client Instance**: Use the configured Axios client in `src/lib/api-client.ts`.
- **Separated Request Declarations**: Do not declare API calls inline. Define them in `src/features/feature-name/api/`.
- **Zod Validation**: Always use Zod for validating request/response data and generating TypeScript types.

### Request Declaration Structure
Each API request file should contain:
1. **Types/Validation**: Zod schemas and TypeScript types for request/response.
2. **Fetcher Function**: The actual call to the endpoint using the API client.
3. **TanStack Query Hook**: A custom hook wrapping the fetcher for data management and caching.

### Key Tools
- **Axios**: Configured client in `src/lib/api-client.ts`.
- **TanStack Query**: Used for fetching and state management.
- **MSW (Mock Service Worker)**: Used for API mocking in development and testing.

### Supporting Resources
- [Detailed API Layer Reference](reference/api-layer-detail.md)
