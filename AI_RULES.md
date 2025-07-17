# AI Development Rules for SafeDawgs

This document outlines the technical stack and development conventions for the SafeDawgs application. Adhering to these rules ensures consistency, maintainability, and high-quality code.

## Tech Stack

The SafeDawgs application is built with a modern, type-safe, and component-driven stack:

*   **Framework**: [Next.js](https://nextjs.org/) (using the App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - A collection of beautifully designed, accessible components built on Radix UI.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
*   **Icons**: [Lucide React](https://lucide.dev/) for a consistent and clean icon set.
*   **Forms**: [React Hook Form](https://react-hook-form.com/) for performant and flexible form handling.
*   **Schema Validation**: [Zod](https://zod.dev/) for type-safe schema declarations and validation.
*   **Charts**: [Recharts](https://recharts.org/) for creating charts and data visualizations.
*   **Notifications**: [Sonner](https://sonner.emilkowal.ski/) for toast notifications.

## Library Usage and Conventions

### 1. Component Development
-   **Primary Component Library**: **ALWAYS** use components from `shadcn/ui` (`@/components/ui`) for all standard UI elements like Buttons, Cards, Dialogs, Inputs, etc.
-   **Custom Components**: Create new components in the `@/components` directory for domain-specific features (e.g., `Hero`, `ImpactPreview`). Compose them using `shadcn/ui` components.
-   **Component Files**: Each component should be in its own file.

### 2. Styling
-   **Utility-First**: **ALWAYS** use Tailwind CSS utility classes for styling. Avoid writing custom CSS in `.css` files.
-   **Responsiveness**: Ensure all components are responsive using Tailwind's breakpoint prefixes (e.g., `md:`, `lg:`).
-   **Theming**: Colors and styles are defined in `app/globals.css` and `tailwind.config.ts`. Use the defined theme variables (e.g., `bg-background`, `text-primary`).

### 3. Icons
-   **Icon Library**: **ONLY** use icons from the `lucide-react` package. This maintains visual consistency.

### 4. Forms
-   **Form Logic**: Use `react-hook-form` for managing form state, validation, and submission.
-   **Form UI**: Use the `shadcn/ui` `Form` components (`<Form>`, `<FormField>`, `<FormItem>`, etc.) which are built to integrate with `react-hook-form`.
-   **Validation**: Use `Zod` to define validation schemas for forms.

### 5. Notifications
-   **User Feedback**: Use `sonner` for all toast notifications to inform the user of actions, successes, or errors. Import and use the `toast()` function from `sonner`.

### 6. File Structure
-   **Pages**: All pages are defined as `page.tsx` files within the `app/` directory, following Next.js App Router conventions.
-   **Layouts**: Root layout is in `app/layout.tsx`. Nested layouts can be created for specific route groups.
-   **Components**: Reusable, application-specific components go in `@/components`.
-   **UI Primitives**: The `shadcn/ui` components are located in `@/components/ui` and should **NOT** be modified directly.