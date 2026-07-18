# ADR-003: Lease Model

## Status

Accepted

## Context

A flat may have multiple tenants over time.

Rent may change between tenants.

Historical information must be preserved.

## Decision

A dedicated Lease model will connect TenantProfile and Flat.

Lease stores:

- Move-in date
- Move-out date
- Monthly rent
- Security deposit
- Status

Rent records reference Lease instead of Flat.

## Rationale

This preserves occupancy history and rent history without overwriting previous data.