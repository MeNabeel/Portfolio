# Portfolio Web Application Documentation

## 1. Project Overview
This project is a modern, highly responsive, and premium personal portfolio built for a Software Engineering student specializing in the MERN stack and AI integrations. It features a "Glassmorphism" aesthetic with a sleek dark mode, vibrant accent colors, and dynamic micro-animations to create a visually stunning experience.

## 2. Goals
- **Showcase Expertise**: Highlight skills, projects, and certifications in a professional and visually engaging format.
- **Secure Authentication**: Implement a robust authentication system to protect private assets (e.g., resume downloads, private certifications) and secure the admin dashboard.
- **Dynamic Content Management**: Build a secure backend and CMS to allow the owner to easily add, edit, and manage portfolio content (Projects, Skills, Contact messages) without deploying code changes.
- **Bot Protection**: Prevent spam and brute-force attacks by strictly rate-limiting authentication attempts and enforcing Google reCAPTCHA v3.

## 3. Technical Specifications
- **Frontend Framework**: Next.js 15 (App Router), React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Glassmorphism UI components (shadcn/ui inspired)
- **Database**: PostgreSQL (hosted via Supabase)
- **ORM**: Prisma Client
- **Authentication**: Supabase Auth (Email/Password) with custom middleware route protection
- **Security**: LRU-Cache based Rate Limiting, Google reCAPTCHA v3 invisible token verification
- **Deployment**: Configured for Vercel/GitHub integration

## 4. Milestones
- [x] **Phase 1**: Initial UI setup, routing, and Glassmorphism design system implementation.
- [x] **Phase 2**: Static content integration (Experience, Tech Stack, Projects).
- [x] **Phase 3**: Supabase Auth configuration, Middleware route protection, and Login/Signup UI.
- [x] **Phase 4**: Security enhancements (Rate Limiting, reCAPTCHA v3) and secure Resume Download API.
- [ ] **Phase 5**: Complete Prisma database schema push and dynamic data hydration (Pending Network Resolution).

---

## Technical Disclaimer & Status Notice

**We have successfully integrated the entire tech stack.** The Supabase authentication API is fully connected, the GitHub repository is synced, and the codebase is completely armed. 

However, **due to network firewall restrictions on the current internet connection**, outbound database traffic on ports `5432` and `6543` is actively blocked. Because of this, the Prisma database schema push (`npx prisma db push`) could not be executed locally, and the database seeding was paused to prevent the application from hanging. 

Once the machine is connected to an unrestricted network (such as a home Wi-Fi or mobile hotspot), running the Prisma push command will instantly sync the database and bring the dynamic CMS features online.
