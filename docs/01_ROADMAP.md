# Project Roadmap

> This roadmap tracks the long-term development of the Building Management System.
>
> Items move from **Planned → In Progress → Completed**.
>
> This document reflects project direction rather than implementation details.

---

# Project Goal

Build a production-ready Building Management System using modern architecture, scalable design, and consistent development practices.

The project is developed module by module, with each module completed before moving to the next.

---

# Development Progress

## Phase 1 — Foundation

### Authentication

Status

✅ Completed

Features

- User Registration
- User Login
- Password Hashing
- Auth.js Integration
- JWT Sessions
- Protected Routes
- Route Middleware (proxy.ts)
- Zod Validation
- Prisma Integration

---

### Dashboard

Status

✅ Completed

Features

- Dashboard Layout
- Sidebar
- Header
- User Navigation
- Protected Dashboard

---

## Phase 2 — Core Property Management

### Building Module

Status

✅ Completed

Features

- Create Building
- Building List
- Building Details
- Edit Building
- Soft Delete
- Ownership Validation
- Zod Validation
- Reusable Building Form
- Server Actions
- Prisma Integration

---

### Floors Module

Status

✅ Completed

Features

- Floor List
- Create Floor
- Bulk Create Floors (range-based, duplicate-safe)
- Floor Details
- Edit Floor
- Soft Delete
- Building Relationship
- Floor Ordering
- Floor Statistics
- Breadcrumb Navigation
- Back Navigation

---

### Flats Module

Status

🚧 Current Sprint

Planned Features

- Flat List
- Create Flat
- Flat Details
- Edit Flat
- Soft Delete
- Floor Assignment
- Occupancy Status
- Rent Information

---

## Phase 3 — Tenant Management

### Tenant Profiles

Status

⬜ Planned

Features

- Tenant Profile
- Contact Information
- Emergency Contact
- Profile Status

---

### Join Requests

Status

⬜ Planned

Features

- Request Submission
- Approval Workflow
- Rejection Workflow
- Assignment to Flats

---

### Lease Management

Status

⬜ Planned

Features

- Lease Creation
- Lease Renewal
- Lease Expiration
- Move In / Move Out

---

## Phase 4 — Financial Management

### Rent Management

Status

⬜ Planned

Features

- Monthly Rent
- Rent Status
- Due Dates
- Outstanding Balance

Note

Should support surfacing which flats currently have unpaid or overdue rent, feeding into Phase 6 Reports.

---

### Utility Bills

Status

⬜ Planned

Features

- Water
- Gas
- Electricity
- Custom Utilities

---

### Payment History

Status

⬜ Planned

Features

- Payment Records
- Receipts
- Payment Status
- Payment Timeline

---

## Phase 5 — Communication

### Notices

Status

⬜ Planned

Features

- Building Notices
- Floor Notices
- Scheduled Notices

Note

Should support surfacing active notices per building/floor at a glance, feeding into Phase 6 Reports.

---

### Activity Logs

Status

⬜ Planned

Features

- User Activity
- Building Activity
- Audit Trail

---

## Phase 6 — Reports

Status

⬜ Planned

Features

- Building Statistics
- Occupancy Reports
- Revenue Reports
- Outstanding Payments
- Monthly Reports

---

## Phase 7 — Analytics

Status

⬜ Planned

Features

- Dashboard Charts
- Occupancy Analytics
- Revenue Trends
- Building Performance

---

# Development Principles

Every module should include, where applicable:

- List Page
- Details Page
- Create Page
- Edit Page
- Soft Delete
- Ownership Validation
- Zod Validation
- Server Actions
- Reusable Components
- Documentation Updates

A module is considered complete only when all of the above are implemented and documented.

---

# Current Priority

Current Sprint

🚧 Flats Module

Goal

Introduce Flats beneath Floors, including occupancy status and rent information, so individual rentable units can be tracked.

The Flats module should follow the same architecture and conventions established by the Building and Floors modules.

---

# Future Enhancements

Potential improvements after the core system is complete:

- Search
- Filtering
- Pagination
- File Uploads
- Image Galleries
- Email Notifications
- SMS Notifications
- Push Notifications
- Calendar Integration
- Multi-language Support
- Dark Mode Improvements
- Data Export
- Data Import
- Role-Based Access Control
- Multi-Tenant Organizations

These features should only be implemented after the core management workflow is complete.

---

# Definition of Done

A module is complete when it satisfies all of the following:

- Business logic implemented
- UI completed
- Validation completed
- Ownership checks implemented
- Soft delete implemented (where applicable)
- Documentation updated
- Tested manually
- Ready for production-quality refactoring

Only then should development move to the next module.