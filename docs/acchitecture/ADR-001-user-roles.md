# ADR-001: Immutable User Roles

## Status

Accepted

## Context

The system supports two types of users:

- Landlord
- Tenant

A design decision was required to determine whether a single account could change roles or hold multiple roles.

## Decision

A user selects their role during registration.

The selected role is permanent.

If a person wishes to use the system as both a landlord and a tenant, they must create separate accounts.

## Rationale

This approach provides:

- Simpler authorization
- Cleaner business rules
- Easier testing
- Reduced UI complexity
- Lower maintenance cost

## Consequences

Advantages

- Simple role checks
- Cleaner dashboard logic
- Smaller permission matrix

Disadvantages

- Users managing properties while renting elsewhere require two accounts.

This trade-off is acceptable for the scope of this project.