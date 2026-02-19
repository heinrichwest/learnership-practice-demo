# SpecCon Learnership Rollout App

This is a Next.js application for generating learnership rollout programs.

## Features

- **Authentication**: Secure login with Role-Based Access Control (RBAC).
- **Roles**: System Admin (can manage users/roles) and Admin/User (can create programs).
- **PDF Generation**: Generate PDF rollout plans client-side using `jspdf`.
- **Database**: Prisma ORM ready for Neon (PostgreSQL).
- **UI**: Premium aesthetic using Tailwind CSS and Framer Motion.

## Setup Instructions

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    - Update `.env` with your Neon Database connection string.
    - `DATABASE_URL="postgresql://user:password@host/db?sslmode=require"`

3.  **Database Migration**:
    - Run the migration to create tables in Neon.
    ```bash
    npx prisma migrate dev --name init
    ```

4.  **Run Locally**:
    ```bash
    npm run dev
    ```
    - Access at `http://localhost:3000`.

## Assets

- **PDF Template**: `public/template.pdf` is used as a reference.
- **Branding**: Update `app/login/page.tsx` and `components/Sidebar.tsx` with real SpecCon logos. Replace the placeholder logo/colors with exact brand colors from the guide if provided.

## Known Issues

- **PDF Analysis**: Automatic field extraction requires a PDF with AcroForm fields. The provided PDF appears to be flat text. The current solution uses a dynamic form to generate a *new* PDF that mimics the structure.

## Deployment

- Connect this repository to **Vercel**.
- Add the `DATABASE_URL` and `NEXTAUTH_SECRET` to Vercel Environment Variables.
- Redeploy.
