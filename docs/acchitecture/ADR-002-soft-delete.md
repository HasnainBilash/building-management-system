# ADR-002: Soft Delete Strategy

## Status

Accepted

## Decision

Important business entities use soft deletion.

A nullable `deletedAt` timestamp is added to selected models.

## Applies To

- User
- Building
- Floor
- Flat
- Notice

## Does Not Apply To

- Rent
- PaymentHistory
- UtilityBill
- ActivityLog

Financial and audit data should remain permanent.

## Rationale

Accidental deletion of buildings or users should be recoverable.

Financial records should never disappear.