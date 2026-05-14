# Research: Responsive App Shell & UI Layout

## Unknowns & Investigations

| Unknown | Investigation Task | Findings |
|---------|-------------------|----------|
| Responsive Grid Pattern | Research best practices for 1/2/3 column transitions using Tailwind CSS. | Use Tailwind's `grid-cols-1 md:grid-cols-2 xl:grid-cols-3` pattern. For the Host Dashboard, a "holy grail" or "sidebar-content-sidebar" layout is ideal. |
| Screen Transitions | Evaluate libraries vs. CSS for simple screen fades/slides. | Standard CSS Transitions or `CSSTransition` from `react-transition-group` are sufficient for simple fades. For more complex "shared element" transitions, Framer Motion is the industry standard but might be overkill. Decision: Use Tailwind CSS transitions + conditional rendering for minimalism. |
| Mobile Navigation | Best pattern for hiding participant list on small screens. | Use a slide-over drawer (Overlay) for mobile. The "Hamburger" menu should be replaced with a "Participants" count icon that triggers the drawer. |
| Touch Accessibility | Minimum targets and interaction feedback. | Minimum 44x44px. Use `:active` and `:focus` states with high-contrast rings for accessibility. Cards should have a `ring-2` focus state when selected. |

## Technology Decisions

### Decision 1: Tailwind CSS Breakpoints
- **Rationale**: Standardizes the responsive behavior across the app without custom media queries.
- **Breakpoints**: 
  - `sm`: 640px (Mobile Landscape)
  - `md`: 768px (Tablet - 2 column)
  - `lg`: 1024px (Laptop)
  - `xl`: 1280px (Desktop - 3 column)

### Decision 2: Layout Orchestration
- **Rationale**: Ensure the layout reacts to room state (Host vs. Peer) as well as viewport.
- **Approach**: Create a `useBreakpoint` hook that returns the current device type (mobile/tablet/desktop) to allow conditional component mounting (e.g., Drawer on mobile, Sidebar on desktop).

### Decision 3: Animation Strategy
- **Rationale**: Keep the bundle small while maintaining a "polished" feel.
- **Approach**: Use `AnimatePresence`-like behavior with vanilla CSS classes and `useEffect` to manage entering/leaving states for modals and drawers.

## Alternatives Considered
- **Framer Motion**: Rejected to keep the bundle size low and avoid unnecessary dependency complexity for simple transitions.
- **Bootstrap/MUI**: Rejected in favor of Tailwind CSS which is already configured in the project.
