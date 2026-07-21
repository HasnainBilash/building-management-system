# Changelog

All notable changes to the Building Management System are documented here.

The format loosely follows Keep a Changelog while remaining focused on project development.

---

# [Unreleased]

## Planned

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

# [v2.2.0] - Flats Module + Quick Setup

## Added

### Flats Module

- Create Flat
- Bulk Create Flats (numeric range, `skipDuplicates` safe — flat numbers are
  text, so this uses a from/to numeric range rather than the raw field)
- Flat List (ordered by Flat Number)
- Flat Details (bedrooms, bathrooms, monthly rent, status)
- Edit Flat
- Soft Delete Flat
- Floor Relationship (ownership validated two hops up: Flat → Floor → Building)
- Server Action CRUD Architecture, matching the Building and Floors modules
- Reusable Flat Form (Single / Multiple toggle, shared Create + Bulk Create UI)
- Breadcrumb + back navigation built in from the start (not retrofitted)

---

### Quick Setup

- New cross-entity action (`src/actions/quick-setup/`) that generates a
  range of Floors and, per Floor, a range of Flats in a single database
  transaction
- Flats auto-numbered Floor × 100 + unit (Floor 3 → 301, 302, ...)
- Duplicate-safe: re-running it, or running it on a building with existing
  floors/flats, only fills gaps — nothing is overwritten
- Capped at 100 floors / 500 total flats per run
- Linked from Building Details as a dedicated page, separate from the plain
  Create Building form, so building creation itself stays simple

---

### Navigation

- Removed the dead "Flats" sidebar link — Flats has no top-level list page
  by design (always accessed via a specific Building → Floor), so a
  disabled placeholder there was misleading rather than informative
- Tenants and Payments remain as "Soon" placeholders, since those are
  plausible future top-level pages

---

### Documentation

Updated

- Project Memory
- Roadmap
- Database (Flat moved from schema-only to schema + application complete)

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