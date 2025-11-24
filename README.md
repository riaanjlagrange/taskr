# Taskr: A Project and Issue Tracking Application

Taskr is a full-stack web application designed to help you manage your projects and track associated issues. It provides a clean and intuitive interface for creating projects, adding issues, and monitoring their status.

## Tech Stack

This project is built with a modern technology stack:

-   **Framework:** [Next.js](https://nextjs.org/)
-   **Database:** [SQLite](https://www.sqlite.org/index.html)
-   **ORM:** [Prisma](https://www.prisma.io/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Authentication:** [Clerk](https://clerk.com/)
-   **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react) & [React Icons](https://react-icons.github.io/react-icons/)
-   **Linting:** [ESLint](https.eslint.org)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v20 or later)
-   pnpm (or your favorite package manager)

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/riaanjlagrange/taskr.git
    ```
2.  Install NPM packages
    ```sh
    pnpm install
    ```
3.  Set up your environment variables by creating a `.env.local` file in the root of the project. You will need to add your Clerk credentials.
    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    ```
4.  Initialize the database.
    ```sh
    npx prisma db push
    ```

### Running the Application

To run the application in a development environment, use the following command:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project follows a standard Next.js App Router structure:

-   `src/app/`: Contains all the pages and routes for the application.
-   `src/components/`: Contains all the React components used in the application.
-   `src/actions/`: Server-side actions for handling form submissions and data mutations.
-   `prisma/`: Contains the database schema (`schema.prisma`) and migrations.
-   `public/`: Contains all the static assets for the application.

## Database

This project uses **SQLite** as its database, with **Prisma** as the ORM. The database schema is defined in the `prisma/schema.prisma` file.

When you make changes to the schema, you can create a new migration with:

```bash
npx prisma migrate dev --name <migration-name>
```

Then, apply the migration to your database with:

```bash
npx prisma db push
```

## Deployment

This application is ready to be deployed on any platform that supports Next.js, such as [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Ensure that you have set up the necessary environment variables for your database and authentication provider on your deployment platform.
