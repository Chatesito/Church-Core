/**
 * User entity module.
 * 
 * This module exports all User domain types:
 * - User: Hybrid entity (GlobalEntity with nullable tenant_id)
 * - UserRole: Tenant-specific role assignments (many-to-many with parishes)
 * 
 * @module entities/user
 */

// User entity and types
export type { 
  User, 
  SystemRole, 
  UserCreate, 
  UserUpdate 
} from './model/user.types';

// UserRole entity and types
export type { 
  UserRole, 
  RoleType, 
  UserRoleCreate, 
  UserRoleUpdate 
} from './model/user-role.types';
