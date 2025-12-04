# AI Rules for Marcenaria Brutalista App

This document outlines the technical stack and guidelines for developing and modifying the "Marcenaria Brutalista" application.

## Tech Stack Overview

*   **Frontend Framework:** React (version 19.2.0) for building dynamic user interfaces.
*   **Language:** TypeScript (~5.8.2) for enhanced code quality and type safety.
*   **Routing:** React Router DOM (version 7.10.0) for declarative client-side navigation.
*   **Styling:** Tailwind CSS (via CDN in `index.html`) for a utility-first approach to styling, complemented by custom brutalist CSS definitions.
*   **UI Components:** `shadcn/ui` is available and should be prioritized for new UI components. Existing components utilize custom Tailwind CSS.
*   **Charting & Data Visualization:** Recharts (version 3.5.1) for interactive charts and graphs.
*   **Icons:** Google Material Symbols Outlined (via CDN in `index.html`) for a consistent icon set.
*   **Build Tool:** Vite (version 6.2.0) for a fast development experience and efficient bundling.
*   **State Management:** React Context API (`AppContext.tsx`) for global application state.

## Library Usage Guidelines

To maintain consistency and best practices, please adhere to the following rules when making changes or adding new features:

*   **React:**
    *   Always use functional components and React Hooks.
    *   Create a new file for every new component, placing it in `src/components/`.
*   **React Router DOM:**
    *   Manage all client-side routing.
    *   Keep the main route definitions within `src/App.tsx`.
*   **Styling (Tailwind CSS & Custom Brutalist):**
    *   **New Components:** When creating new UI elements, prioritize using `shadcn/ui` components.
    *   **Existing Components:** For modifications to existing components, continue to use and extend the current Tailwind CSS classes and custom brutalist styles defined in `index.html`.
    *   Ensure all designs are responsive.
*   **Recharts:**
    *   Utilize Recharts for all data visualization and charting requirements.
*   **Material Symbols Outlined:**
    *   Use this library for all icon needs across the application.
*   **State Management:**
    *   Leverage the `AppContext` (React Context API) for managing application-wide state and data flow.
*   **File Structure:**
    *   Place all source code within the `src` directory.
    *   New pages should reside in `src/pages/`.
    *   New components should be placed in `src/components/`.
*   **Code Quality:**
    *   Write clean, readable, and maintainable TypeScript code.
    *   Avoid over-engineering; focus on simple and elegant solutions.
    *   Do not use `try/catch` blocks for error handling unless specifically requested, to allow errors to bubble up for easier debugging.