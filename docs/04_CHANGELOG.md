# Changelog

All notable changes to the Building Management System are documented here.

The format loosely follows Keep a Changelog while remaining focused on project development.

---

# [Unreleased]

## Planned

- Flats Module
- Tenant Profiles
- Join Requests
- Lease Management
- Rent Management
- Utility Bills
- Payment History
- Notices
- Reports
- Analytics

---

# [v2.1.0] - Floors Module + Navigation

## Added

### Floors Module

- Create Floor
- Bulk Create Floors (range-based, `skipDuplicates` safe)
- Floor List (ordered by Floor Number)
- Floor Details (with Flat status statistics: occupied / vacant / maintenance)
- Edit Floor
- Soft Delete Floor
- Building Relationship (ownership validated via Building, not a direct `ownerId`)
- Server Action CRUD Architecture, matching the Building module
- Reusable Floor Form (Single / Multiple toggle, shared Create + Bulk Create UI)

---

### Navigation

- `Breadcrumbs` component — full-path navigation on every nested page
- `BackLink` component — one-step back navigation on every nested page
- Fixed Floor Details back navigation (previously skipped the Floors List level)
- Disabled dead sidebar links (Flats, Tenants, Payments) pending those modules being built

---

### Documentation

Added

```
06_NAVIGATION_UX.md
```

Updated

- Project Memory
- Roadmap
- Database (clarified schema-complete vs application-complete models)

---

# [v2.0.0] - Authentication + Building Module

## Added

### Authentication

- User Registration
- User Login
- Auth.js v5
- Credentials Provider
- JWT Session Strategy
- Password Hashing (bcrypt)
- Protected Dashboard
- Route Protection using proxy.ts
- Zod Validation
- Prisma Integration

---

### Dashboard

- Dashboard Layout
- Sidebar Navigation
- Header
- User Navigation

---

### Building Module

- Create Building
- Building List
- Building Details Page
- Edit Building
- Soft Delete Building
- Ownership Validation
- Building Validation (Zod)
- Shared Building Form
- Server Action CRUD Architecture

---

### Project Structure

Added feature-based folder organization.

Introduced dedicated directories for:

- Building Server Actions
- Building Components
- Building Validation
- Shared Types

---

### Architecture

Established Architecture v2.0.

Major decisions:

- Server Actions are the default for internal CRUD.
- API routes are reserved for external integrations and framework requirements.
- Every major entity receives:
  - List Page
  - Create Page
  - Details Page
  - Edit Page
- Feature-based architecture is the project standard.
- Reusable UI components are separated from business components.
- Soft Delete is the default deletion strategy.

---

### Documentation

Updated:

- Project Memory
- Roadmap
- Architecture

Prepared documentation for future module development.

---

# [v1.0.0] - Initial Foundation

## Added

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Prisma
- PostgreSQL
- Auth.js
- Initial Project Structure
- Documentation Structure

This version established the technical foundation for the project.