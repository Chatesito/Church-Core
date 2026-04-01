/**
 * UserRole entity types for ChurchCore role-based access control.
 * 
 * Represents many-to-many relationship between Users and Parishes.
 * A user can have different roles in different parishes.
 * 
 * This entity is TENANT-SPECIFIC (extends TenantEntity):
 * - Has mandatory tenant_id field (indicates which parish this role applies to)
 * - Enforces multi-tenant data isolation via Supabase RLS
 * 
 * @module entities/user/model/user-role.types
 */

import type { TenantEntity, UUID } from '@/shared/types';

// ============================================================================
// Role Type
// ============================================================================

/**
 * Role type enum for parish-specific roles.
 * 
 * Note: SuperAdmin is NOT included here because:
 * - SuperAdmins are GLOBAL users (tenant_id = null in User table)
 * - SuperAdmins do NOT need UserRole records (they have platform-wide access)
 * 
 * Role types:
 * - ParishAdmin: Can manage parish content (events, groups, schedules, members)
 * - Parishioner: Read-only access to public parish data
 */
export type RoleType = 'ParishAdmin' | 'Parishioner';

// ============================================================================
// UserRole Entity
// ============================================================================

/**
 * UserRole entity interface.
 * 
 * Represents a user's role assignment to a specific parish.
 * Enables many-to-many relationship between Users and Parishes.
 * 
 * @interface UserRole
 * @extends TenantEntity
 * 
 * @example
 * ```typescript
 * // User is ParishAdmin in San Juan María Vianney parish
 * const adminRole: UserRole = {
 *   id: '123e4567-e89b-12d3-a456-426614174000' as UUID,
 *   user_id: '223e4567-e89b-12d3-a456-426614174000' as UUID,
 *   role: 'ParishAdmin',
 *   tenant_id: 'tenant-sanjuan-vianney' as TenantId,
 *   created_at: '2024-01-01T00:00:00Z' as Timestamp,
 *   updated_at: '2024-01-01T00:00:00Z' as Timestamp,
 * };
 * 
 * // Same user is Parishioner in a different parish
 * const parishionerRole: UserRole = {
 *   id: '323e4567-e89b-12d3-a456-426614174000' as UUID,
 *   user_id: '223e4567-e89b-12d3-a456-426614174000' as UUID,
 *   role: 'Parishioner',
 *   tenant_id: 'tenant-otra-parroquia' as TenantId,
 *   created_at: '2024-01-01T00:00:00Z' as Timestamp,
 *   updated_at: '2024-01-01T00:00:00Z' as Timestamp,
 * };
 * ```
 */
export interface UserRole extends TenantEntity {
  /** Foreign key to User.id */
  user_id: UUID;
  
  /** Role type for this user in this parish */
  role: RoleType;
  
  // tenant_id inherited from TenantEntity — indicates which parish this role applies to
}

// ============================================================================
// CRUD Utility Types
// ============================================================================

/**
 * Input type for creating a new UserRole.
 * Omits auto-generated fields: id, created_at, updated_at.
 * 
 * @type UserRoleCreate
 * 
 * @example
 * ```typescript
 * const newRole: UserRoleCreate = {
 *   user_id: '223e4567-e89b-12d3-a456-426614174000' as UUID,
 *   role: 'ParishAdmin',
 *   tenant_id: 'tenant-sanjuan-vianney' as TenantId,
 * };
 * ```
 */
export type UserRoleCreate = Omit<UserRole, 'id' | 'created_at' | 'updated_at'>;

/**
 * Input type for updating an existing UserRole.
 * All fields are optional (partial update).
 * Omits immutable fields: id, tenant_id, created_at, updated_at.
 * 
 * Note: tenant_id is immutable because role assignments are scoped to a specific parish.
 * To change a user's role in a different parish, create a new UserRole record.
 * 
 * @type UserRoleUpdate
 * 
 * @example
 * ```typescript
 * // Promote Parishioner to ParishAdmin
 * const updateData: UserRoleUpdate = {
 *   role: 'ParishAdmin',
 * };
 * ```
 */
export type UserRoleUpdate = Partial<Omit<UserRole, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>>;
