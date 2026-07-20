# Building Management System

A modern, production-ready Building Management System built with Next.js, Prisma, PostgreSQL and Auth.js.

The system allows landlords to manage buildings, floors, flats, tenants, leases, rent collection, utility bills and notices through a secure web application.

---

## Project Status

Current Stage

🟢 Active Development

Current Sprint

Sprint 2 — Building Module

---

## Features

### Authentication

- User Registration
- User Login
- Password Hashing (bcrypt)
- JWT Authentication
- Protected Routes
- Session Management
- Role-based Authentication
- Server Actions
- Zod Validation

### Building Management

- Building CRUD *(In Progress)*
- Floor Management *(Planned)*
- Flat Management *(Planned)*

### Tenant Management

- Tenant Profiles *(Planned)*
- Join Requests *(Planned)*
- Lease Management *(Planned)*

### Finance

- Rent Management *(Planned)*
- Utility Bills *(Planned)*
- Payment History *(Planned)*

### Communication

- Notices *(Planned)*

### Monitoring

- Activity Logs *(Planned)*

---

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4

### Backend

- Server Actions
- Auth.js v5

### Database

- PostgreSQL
- Prisma ORM

### Validation

- Zod

### Authentication

- Auth.js
- JWT
- bcrypt

---

## Project Structure

See

```

docs/02_ARCHITECTURE.md

```

for the complete project architecture.

---

## Documentation

Project documentation is available inside the `docs/` directory.

- Project Memory
- Roadmap
- Architecture
- Database
- Changelog
- Conventions

---

## Installation

Install dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev
```

Start development server

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file.

Required variables include:

```env
DATABASE_URL=
AUTH_SECRET=
```

---

## Development Philosophy

This project prioritizes:

- Clean Architecture
- Production-ready code
- Reusable Components
- Type Safety
- Scalability
- Maintainability

---

## License

Private project.