### Components & Styling (AI Skill)

Use this skill when building UI components, using Tailwind CSS, or creating Storybook stories. This ensures UI consistency and accessibility.

### How to Use for AI Agents
1. **Identify UI Needs**: When creating or modifying a component, review these design and styling rules.
2. **Consult UI Library**: Check `src/components/ui/` for existing shared components before creating new ones.
3. **Apply Styling**: Use Tailwind utility classes for all styling. Wrap headless primitives from Radix UI.
4. **Create Story**: When creating a component, add a Storybook story (`*.stories.tsx`) next to the file.

### Component Design Rules
1. **Colocation**: Keep components, logic, styles, and state as close as possible to where they are used.
2. **Avoid Nested Render Functions**: Extract logic into separate components instead of defining helper render functions within a component.
3. **Consistency**: Use **PascalCase** for components everywhere.
4. **Prop Limits**: Use component composition (via `children` or slots) instead of accepting too many props.
5. **Shared Component Library**: Identify and extract repeated UI patterns into `src/components/ui/` as common abstractions.
6. **Wrap 3rd Party Components**: Always wrap external components (e.g., from Radix UI) to decouple them from the application logic.

### Styling Stack
- **Tailwind CSS**: Utility-first CSS for all styling needs.
- **Radix UI**: Headless component library for accessible primitives (Modals, Tabs, etc.).
- **Lucide React**: Primary icon library.

### Development Tools
- **Storybook**: Use it for developing and testing components in isolation and as a component catalog.
- **Stories Location**: Place stories next to their component (`*.stories.tsx`).

### Supporting Resources
- [Detailed Components Reference](reference/components-detail.md)
