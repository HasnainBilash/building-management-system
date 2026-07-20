# Project Memory

> This document is the permanent memory of the Building Management System.
>
> Read this document before starting development or beginning a new ChatGPT conversation.

---

# Project Information

## Project Name

Building Management System

## Status

🟢 Active Development

## Repository

Private

## Current Branch

main

## Current Sprint

Sprint 3 — Floors Module

---

# Project Status

## Authentication

✅ Complete

## Dashboard

✅ Complete

## Building Module

✅ Complete

## Architecture

✅ Architecture v2.0 (Frozen)

## Documentation

🚧 Updating to Version 2.0

## Current Development

🚧 Floors Module

---

# Project Vision

Build a modern, scalable, production-ready Building Management System that allows landlords to manage residential properties from a single dashboard while providing tenants with a structured and secure workflow.

The project should prioritize:

- Scalability
- Maintainability
- Readability
- Simplicity
- Long-term consistency

Production-quality architecture is always preferred over shortcuts.

---

# Project Philosophy

This project intentionally spends more time designing architecture so future development becomes easier.

Whenever information is missing:

> ASK.

Never guess.

Never silently redesign architecture.

Never rewrite working code unless there is a valid architectural reason.

---

# Technology Stack

## Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4

## Backend

- Server Actions

## Authentication

- Auth.js v5
- Credentials Provider
- JWT Strategy
- bcrypt

## Database

- PostgreSQL
- Prisma ORM

## Validation

- Zod

---

# Architecture Summary

The project follows a layered architecture.

```
Browser

↓

App Router

↓

React Components

↓

Server Actions

↓

Prisma ORM

↓

PostgreSQL
```

Business logic belongs inside Server Actions.

Validation belongs inside Zod.

Database access belongs inside Prisma.

UI components should never contain business logic.

Architecture v2.0 is considered frozen unless intentionally revised.

---

# Current Features

## Completed

### Authentication

- User Registration
- User Login
- Password Hashing
- JWT Authentication
- Session Management
- Protected Routes
- Route Protection
- Credentials Provider
- Zod Validation

### Dashboard

- Dashboard Layout
- Sidebar Navigation
- Header
- User Navigation

### Building Module

- Create Building
- Building List
- Building Details
- Edit Building
- Soft Delete Building
- Ownership Validation
- Reusable Building Form
- Server Actions
- Prisma Integration
- Zod Validation

---

# Planned Modules

- Floors
- Flats
- Tenant Profiles
- Join Requests
- Lease Management
- Rent Management
- Utility Bills
- Payment History
- Notices
- Activity Logs
- Reports
- Analytics

---

# Current Folder Structure

```
docs/

prisma/

public/

src/
    actions/
    app/
    components/
    lib/
    types/

README.md

package.json
```

The complete folder explanation lives inside

```
docs/02_ARCHITECTURE.md
```

---

# Database

Current database models include

- User
- Building
- Floor
- Flat
- TenantProfile
- Lease
- JoinRequest
- Rent
- UtilityBill
- PaymentHistory
- Notice
- ActivityLog

Complete schema documentation lives in

```
docs/03_DATABASE.md
```

---

# Current Routing

Public

```
/
```

```
/login
```

```
/register
```

Protected

```
/dashboard
```

```
/dashboard/buildings
```

```
/dashboard/buildings/new
```

```
/dashboard/buildings/[id]
```

```
/dashboard/buildings/[id]/edit
```

Authentication

```
/api/auth/*
```

Future modules should follow the same routing pattern.

---

# Development Principles

The project follows these principles.

- TypeScript everywhere
- Prisma for database access
- Auth.js for authentication
- Zod for validation
- Server Actions for internal CRUD
- API Routes only when required by external libraries or integrations
- Reusable UI components
- No duplicated business logic
- Soft Delete over hard delete where appropriate
- Ownership validation for protected resources

---

# Documentation

Documentation is considered part of the project.

A feature is not complete until the documentation has been updated.

Current documentation

```
00_PROJECT_MEMORY.md
```

Project overview

```
01_ROADMAP.md
```

Development roadmap

```
02_ARCHITECTURE.md
```

Architecture

```
03_DATABASE.md
```

Database schema

```
04_CHANGELOG.md
```

Project history

```
05_CONVENTIONS.md
```

Coding conventions

```
06_MODULE_TEMPLATE.md
```

Blueprint for future modules

---

# Current Environment Variables

Required

```
DATABASE_URL
```

```
AUTH_SECRET
```

Whenever a new environment variable is introduced, document it here.

---

# Development Workflow

Every feature follows the same workflow.

1. Design
2. Discuss architecture
3. Implement
4. Test
5. Refactor
6. Update documentation
7. Commit

Documentation is considered part of the implementation.

---

# Working Agreement

Whenever ChatGPT is uncertain about

- project structure
- implementation
- architecture
- existing code

it should request the relevant file instead of making assumptions.

Correctness is preferred over speed.

---

# Next Goal

Implement the Floors Module following the established architecture.

Future modules should reuse the same architecture and development patterns introduced by the Building Module.

---

# Long-Term Goal

Develop a complete production-ready Building Management System while maintaining a clean, scalable, and consistent architecture across every module.

This document should always represent the current state of the repository.