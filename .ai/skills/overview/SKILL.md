### Application Overview (AI Skill)

Use this skill when onboarding to the project or needing high-level context on the application domain, user roles, and data models.

### How to Use for AI Agents
1. **Domain Context**: Use this to understand the "What" and "Why" of the application before implementation.
2. **Role Verification**: Consult this when implementing role-based checks (RBAC/PBAC) or feature visibility.
3. **Data Relations**: Use this to understand connections between Users, Teams, Discussions, and Comments.

### Application Concept
The application is a platform where users can create or join teams to start discussions on various topics.

### Data Model
- **User**: Roles (`ADMIN`, `USER`). Admins can manage discussions/comments/users; regular users can participate.
- **Team**: Has one admin and multiple members.
- **Discussion**: Created by team members.
- **Comment**: Messages within a discussion.

### Deployment & CI/CD
- **Framework**: Vite-based React application.
- **Environments**: Configured for local development, testing, and production.
- **Tools**: GitHub Actions, Netlify, or similar platforms can be used for deployment.

### Supporting Resources
- [Detailed Overview Reference](reference/overview-detail.md)
- [Deployment Reference](reference/deployment-detail.md)
- [Additional Resources](reference/additional-resources.md)
