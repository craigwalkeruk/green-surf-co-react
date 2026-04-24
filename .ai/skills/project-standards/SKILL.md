### Project Standards & Practices (AI Skill)

Use this skill when writing or refactoring code to ensure compliance with project-wide linting, naming, and import rules.

### How to Use for AI Agents
1. **Naming Check**: Verify your file and folder names follow Kebab Case (e.g., `auth-provider.tsx`).
2. **Import Check**: Always use absolute imports with `@/*` from `src/`.
3. **Consistency**: Follow the project's React best practices for accessibility and component composition.

### Coding Standards
- **ESLint**: Identified and prevents common errors, enforces uniformity. Rules in `.eslintrc.cjs`.
- **Prettier**: Automatic formatting via `.prettierrc`. Integrated with ESLint.
- **TypeScript**: Mandatory for type safety. Prioritize updating type declarations during refactoring.
- **Husky**: Git hooks for pre-commit validation (linting, formatting, type checking).

### File & Folder Naming
- **Kebab Case**: Enforced for all files (`.ts`, `.tsx`) and folders within `src/` (except `__tests__`).
  - Correct: `my-component.tsx`, `auth-provider.tsx`
  - Incorrect: `MyComponent.tsx`, `authProvider.tsx`

### Import Rules
- **Absolute Imports**: Always use `@/*` for imports from `src/`.
  - Example: `import { Button } from '@/components/button';`
- **Avoid Cross-Feature Imports**: Features should be independent. Compose them at the application level.
- **Unidirectional Flow**: Shared -> Features -> App.

### React Best Practices
- **Component Composition**: Use `children` props to avoid prop drilling.
- **Semantic HTML**: Use `main`, `header`, `section`, `nav`, `h1-h6` instead of generic `div`s.
- **Accessibility**: Use `aria-labels` and `aria-labelledby` correctly.
- **Icons**: Standardize on `lucide-react`.
- **Colocation**: Keep related logic, tests, and types close to the component.

### Supporting Resources
- [Full Project Standards Reference](reference/project-standards-detail.md)
