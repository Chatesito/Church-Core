/**
 * Global entities barrel export.
 * 
 * This module re-exports all domain entities for convenient imports:
 * 
 * ```typescript
 * import { Parish, User, Event, LiturgicalReading } from '@/entities';
 * ```
 * 
 * Or import from specific domains for tree-shaking:
 * 
 * ```typescript
 * import { Parish } from '@/entities/church';
 * import { User } from '@/entities/user';
 * ```
 * 
 * @module entities
 */

// ============================================================================
// Church Domain (Tenant-specific)
// ============================================================================
export type {
  // Parish
  Parish,
  ParishStatus,
  ParishContactInfo,
  ParishLocation,
  ParishCreate,
  ParishUpdate,
  // Theme
  ParishTheme,
  ParishThemeCreate,
  ParishThemeUpdate,
  // Mass Schedule
  MassSchedule,
  MassType,
  MassLanguage,
  MassScheduleCreate,
  MassScheduleUpdate,
  // Gallery
  GalleryImage,
  ImageDisplayContext,
  GalleryImageCreate,
  GalleryImageUpdate,
  // Shared enums
  DayOfWeek,
} from './church';

// ============================================================================
// Liturgy Domain (Global - shared across all tenants)
// ============================================================================
export type {
  // Readings
  LiturgicalReading,
  LiturgicalReadingCreate,
  LiturgicalReadingUpdate,
  LiturgicalSeasonType, // Type alias for season name strings
  LiturgicalColor,
  // Saints
  SaintOfTheDay,
  FeastType,
  SaintOfTheDayCreate,
  SaintOfTheDayUpdate,
  // Seasons (entity)
  LiturgicalSeason,
  LiturgicalSeasonCreate,
  LiturgicalSeasonUpdate,
} from './liturgy';

// ============================================================================
// Events Domain (Tenant-specific)
// ============================================================================
export type {
  // Events
  Event,
  EventType,
  EventStatus,
  RecurrencePattern,
  EventCreate,
  EventUpdate,
  // Parish Life Activities
  ParishLifeActivity,
  ActivityType,
  ParishLifeActivityCreate,
  ParishLifeActivityUpdate,
} from './events';

// ============================================================================
// Community Domain (Tenant-specific)
// ============================================================================
export type {
  // Parish Members
  ParishMember,
  MemberRole,
  ParishMemberCreate,
  ParishMemberUpdate,
  // Ministry Groups
  MinistryGroup,
  GroupType,
  MinistryGroupCreate,
  MinistryGroupUpdate,
  // Sacrament Records
  SacramentRecord,
  SacramentType,
  SacramentRecordCreate,
  SacramentRecordUpdate,
} from './community';

// ============================================================================
// User Domain (Hybrid - GlobalEntity with nullable tenant_id)
// ============================================================================
export type {
  // Users
  User,
  SystemRole,
  UserCreate,
  UserUpdate,
  // User Roles (many-to-many with parishes)
  UserRole,
  RoleType,
  UserRoleCreate,
  UserRoleUpdate,
} from './user';
