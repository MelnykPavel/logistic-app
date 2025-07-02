# Logistic App

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=blue)](https://www.prisma.io/)
[![Zod](https://img.shields.io/badge/Zod-000000?logo=typescript&logoColor=white)](https://github.com/colinhacks/zod)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

---

## Project Overview

**Logistic App** is a logistics management system developed with **Next.js** and **TypeScript**. The application is designed to facilitate efficient logistics operations, providing two distinct user roles — **Drivers** and **Managers** — each with dedicated functionalities for managing orders, warehouses, and clients.

Key features include secure authentication, comprehensive order lifecycle management, warehouse and client administration, and real-time commenting. The application uses **Prisma ORM** for robust database interactions and **Zod** for strict input validation.

---

## Core Features

- **Role-Based Access Control:** Distinct interfaces and permissions for Drivers and Managers.
- **Authentication:** Secure registration, login, and logout with email and password.
- **Order Management:**
  - Managers can create, view, update, and delete orders.
  - Drivers can browse available orders, assign themselves to one active order, update its status (declined, in progress, completed), and review order history.
- **Warehouse Management:** Full CRUD operations for Managers.
- **Client Management:** Full CRUD operations for Managers.
- **Order Comments:** Both user roles can add comments to orders for better communication.
- **Input Validation:** All inputs are validated using **Zod** schemas to ensure data integrity.
- **Modern UI:** Built with **Tailwind CSS v4** and [**shadcn/ui**](https://ui.shadcn.com/) for accessible and consistent user interfaces.

---

## Technology Stack

| Technology     | Description                                  |
|----------------|----------------------------------------------|
| Next.js        | React framework with server-side rendering   |
| TypeScript     | Strongly typed JavaScript                    |
| Tailwind CSS   | Utility-first CSS framework                  |
| Prisma         | Type-safe ORM and database migrations        |
| Zod            | Input schema validation                      |
| shadcn/ui      | Accessible React component library           |
| PostgreSQL     | Relational database                          |
| Vercel         | Hosting and deployment platform              |

---

## Project Structure

```bash
/prisma         # Prisma schema and migrations
/public         # Static assets
/src
  /app          # Next.js App Router (routes and layouts)
  /(auth)       # Authentication pages and layouts
  /(main)       # Main application dashboards and pages
  /components   # Shared React UI components
  /constants    # Static data and table definitions
  /hooks        # Custom React hooks
  /lib          # Utilities: auth, Prisma client, validation
  /providers    # Context providers for global state
  /server       # Server-side actions and data fetching
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **PostgreSQL** database (Supabase recommended for hosted setup)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd logistic-app
   npm install
   ```

2. Configure environment variables:

   Create a `.env` file in the project root with the following **example** values:

   ```env
   DATABASE_URL=postgresql://username:password@host:port/dbname
   DIRECT_URL=postgresql://username:password@host:port/dbname

   JWT_SECRET="your_jwt_secret"
   JWT_EXPIRATION_TIME=1d
   JWT_ISSUER=https://yourapp.example.com
   JWT_AUDIENCE=https://yourapp.example.com

   COOKIE_NAME=auth_token
   COOKIE_MAX_AGE=86400
   ```

3. Set up the database:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.ocalhost:3000](http://localhost:3000) in your browser.