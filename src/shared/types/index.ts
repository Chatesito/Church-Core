/**
 * Shared types barrel export.
 * 
 * Re-exports all shared types, interfaces, and utilities used across the application.
 * 
 * @module shared/types
 */

// Base types and interfaces
export type {
  UUID,
  TenantId,
  Timestamp,
  GlobalEntity,
  TenantEntity,
  CreateInput,
  UpdateInput,
} from './base';

// Type guards and constructors
export {
  createUUID,
  createTenantId,
  createTimestamp,
} from './base';
