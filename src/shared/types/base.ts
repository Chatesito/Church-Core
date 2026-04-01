/**
 * Base types and interfaces for ChurchCore domain entities.
 * 
 * This module defines:
 * - Branded types for type safety (UUID, TenantId, Timestamp)
 * - Base entity interfaces (GlobalEntity, TenantEntity)
 * - Utility types for CRUD operations
 * 
 * @module shared/types/base
 */

// ============================================================================
// Branded Types
// ============================================================================

/**
 * Branded UUID type for compile-time ID safety.
 * Prevents mixing different ID types accidentally.
 */
export type UUID = string & { readonly __brand: 'UUID' };

/**
 * Branded TenantId type for tenant isolation safety.
 * Ensures tenant IDs cannot be confused with other string IDs.
 */
export type TenantId = string & { readonly __brand: 'TenantId' };

/**
 * Branded Timestamp type for ISO 8601 datetime strings.
 * Provides type safety for temporal data.
 */
export type Timestamp = string & { readonly __brand: 'Timestamp' }; // ISO 8601

// ============================================================================
// Type Guards / Constructors (Zero-cost runtime helpers)
// ============================================================================

/**
 * Creates a branded UUID from a string.
 * Use for runtime values that need to be typed as UUID.
 * 
 * @param id - String value to brand as UUID
 * @returns Branded UUID type
 */
export const createUUID = (id: string): UUID => id as UUID;

/**
 * Creates a branded TenantId from a string.
 * Use for runtime values that need to be typed as TenantId.
 * 
 * @param id - String value to brand as TenantId
 * @returns Branded TenantId type
 */
export const createTenantId = (id: string): TenantId => id as TenantId;

/**
 * Creates a branded Timestamp from an ISO 8601 string.
 * Use for runtime values that need to be typed as Timestamp.
 * 
 * @param iso - ISO 8601 datetime string
 * @returns Branded Timestamp type
 */
export const createTimestamp = (iso: string): Timestamp => iso as Timestamp;

// ============================================================================
// Base Entity Interfaces
// ============================================================================

/**
 * Base interface for global entities (shared across all tenants).
 * 
 * Global entities:
 * - Do NOT have tenant_id (data is shared)
 * - Examples: LiturgicalReading, SaintOfTheDay, LiturgicalSeason
 * 
 * @interface GlobalEntity
 */
export interface GlobalEntity {
  /** Unique identifier for the entity */
  id: UUID;
  /** Timestamp when the entity was created (ISO 8601) */
  created_at: Timestamp;
  /** Timestamp when the entity was last updated (ISO 8601) */
  updated_at: Timestamp;
}

/**
 * Base interface for tenant-specific entities (isolated per parish).
 * 
 * Tenant entities:
 * - MUST have tenant_id (enforces multi-tenant data isolation)
 * - Examples: Parish, MassSchedule, Event, ParishMember
 * 
 * @interface TenantEntity
 */
export interface TenantEntity {
  /** Unique identifier for the entity */
  id: UUID;
  /** Tenant identifier for multi-tenant isolation (MANDATORY) */
  tenant_id: TenantId;
  /** Timestamp when the entity was created (ISO 8601) */
  created_at: Timestamp;
  /** Timestamp when the entity was last updated (ISO 8601) */
  updated_at: Timestamp;
}

// ============================================================================
// Utility Types for CRUD Operations
// ============================================================================

/**
 * Utility type for entity creation input.
 * Omits auto-generated fields: id, created_at, updated_at.
 * 
 * @template T - Entity type extending TenantEntity or GlobalEntity
 * 
 * @example
 * ```typescript
 * interface Parish extends TenantEntity {
 *   name: string;
 *   contact_info?: { email?: string };
 * }
 * 
 * type ParishCreate = CreateInput<Parish>;
 * // Result: { tenant_id: TenantId; name: string; contact_info?: { email?: string } }
 * ```
 */
export type CreateInput<T extends TenantEntity | GlobalEntity> = 
  Omit<T, 'id' | 'created_at' | 'updated_at'>;

/**
 * Utility type for entity update input.
 * - All fields optional (partial update)
 * - Omits immutable fields: id, tenant_id, created_at, updated_at
 * 
 * @template T - Entity type extending TenantEntity or GlobalEntity
 * 
 * @example
 * ```typescript
 * interface Parish extends TenantEntity {
 *   name: string;
 *   contact_info?: { email?: string };
 * }
 * 
 * type ParishUpdate = UpdateInput<Parish>;
 * // Result: { name?: string; contact_info?: { email?: string } }
 * ```
 */
export type UpdateInput<T extends TenantEntity | GlobalEntity> = 
  Partial<Omit<T, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>>;
