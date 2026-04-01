/**
 * Community domain entity exports.
 * 
 * Re-exports all community-related types for convenient importing.
 * 
 * Import examples:
 * ```typescript
 * import type { 
 *   ParishMember, 
 *   MemberRole, 
 *   MinistryGroup,
 *   SacramentRecord 
 * } from '@/entities/community';
 * ```
 * 
 * @module entities/community
 */

// Parish Member types
export type {
  ParishMember,
  ParishMemberCreate,
  ParishMemberUpdate,
  MemberRole,
} from './model/parish-member.types';

// Ministry Group types
export type {
  MinistryGroup,
  MinistryGroupCreate,
  MinistryGroupUpdate,
  GroupType,
} from './model/ministry-group.types';

// Sacrament Record types
export type {
  SacramentRecord,
  SacramentRecordCreate,
  SacramentRecordUpdate,
  SacramentType,
} from './model/sacrament-record.types';
