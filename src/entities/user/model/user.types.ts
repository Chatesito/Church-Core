/**
 * User entity types for ChurchCore authentication and authorization.
 * 
 * User is a HYBRID entity:
 * - Extends GlobalEntity (has id, created_at, updated_at)
 * - Has NULLABLE tenant_id field (null = SuperAdmin, TenantId = scoped to parish)
 * 
 * Why Hybrid?
 * - SuperAdmins are GLOBAL users (tenant_id = null) — they manage the entire platform
 * - ParishAdmins/Parishioners are SCOPED users (tenant_id = TenantId) — they belong to a specific parish
 * 
 * @module entities/user/model/user.types
 */

import type { GlobalEntity, TenantId } from '@/shared/types';

// ============================================================================
// User Role Types
// ============================================================================

/**
 * System-level role enum.
 * 
 * Role hierarchy:
 * - SuperAdmin: Platform owner (tenant_id = null) — can create/manage all tenants
 * - ParishAdmin: Parish priest/secretary (tenant_id = TenantId) — can manage parish content
 * - Parishioner: End-user (tenant_id = TenantId) — read-only access to public data
 */
export type SystemRole = 'SuperAdmin' | 'ParishAdmin' | 'Parishioner';

// ============================================================================
// User Entity
// ============================================================================

/**
 * User entity interface.
 * 
 * Represents a user in the ChurchCore platform with authentication and authorization data.
 * 
 * @interface User
 * @extends GlobalEntity
 * 
 * @example
 * ```typescript
 * // SuperAdmin user (global)
 * const superAdmin: User = {
 *   id: '123e4567-e89b-12d3-a456-426614174000' as UUID,
 *   email: 'admin@churchcore.com',
 *   role: 'SuperAdmin',
 *   tenant_id: null, // Global user
 *   display_name: 'Platform Admin',
 *   created_at: '2024-01-01T00:00:00Z' as Timestamp,
 *   updated_at: '2024-01-01T00:00:00Z' as Timestamp,
 * };
 * 
 * // ParishAdmin user (scoped to tenant)
 * const parishAdmin: User = {
 *   id: '223e4567-e89b-12d3-a456-426614174000' as UUID,
 *   email: 'padre@sanjuan.com',
 *   role: 'ParishAdmin',
 *   tenant_id: 'tenant-sanjuan-vianney' as TenantId, // Scoped to parish
 *   display_name: 'Padre José',
 *   avatar_url: 'https://storage.supabase.co/avatars/padre-jose.jpg',
 *   created_at: '2024-01-01T00:00:00Z' as Timestamp,
 *   updated_at: '2024-01-01T00:00:00Z' as Timestamp,
 * };
 * ```
 */
export interface User extends GlobalEntity {
  /** User's email address (used for authentication) */
  email: string;
  
  /** System-level role (SuperAdmin, ParishAdmin, or Parishioner) */
  role: SystemRole;
  
  /** 
   * Tenant identifier for scoped users.
   * - null = SuperAdmin (global access to entire platform)
   * - TenantId = ParishAdmin/Parishioner (scoped to specific parish)
   */
  tenant_id: TenantId | null;
  
  /** Optional display name for UI */
  display_name?: string;
  
  /** Optional avatar image URL (stored in Supabase Storage) */
  avatar_url?: string;
}

// ============================================================================
// CRUD Utility Types
// ============================================================================

/**
 * Input type for creating a new User.
 * Omits auto-generated fields: id, created_at, updated_at.
 * 
 * @type UserCreate
 * 
 * @example
 * ```typescript
 * const newUser: UserCreate = {
 *   email: 'feligres@gmail.com',
 *   role: 'Parishioner',
 *   tenant_id: 'tenant-sanjuan-vianney' as TenantId,
 *   display_name: 'María González',
 * };
 * ```
 */
export type UserCreate = Omit<User, 'id' | 'created_at' | 'updated_at'>;

/**
 * Input type for updating an existing User.
 * All fields are optional (partial update).
 * Omits immutable fields: id, created_at, updated_at.
 * 
 * @type UserUpdate
 * 
 * @example
 * ```typescript
 * const updateData: UserUpdate = {
 *   display_name: 'María González de García',
 *   avatar_url: 'https://storage.supabase.co/avatars/maria.jpg',
 * };
 * ```
 */
export type UserUpdate = Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;
