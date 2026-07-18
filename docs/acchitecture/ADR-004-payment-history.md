# ADR-004: Payment History

## Status

Accepted

## Decision

Payments are stored separately from Rent and UtilityBill.

Each payment is recorded individually.

## Benefits

- Partial payments
- Installments
- Future online payment support
- Transaction history
- Auditability

## Consequences

Payment status is calculated from payment records rather than a single boolean flag.