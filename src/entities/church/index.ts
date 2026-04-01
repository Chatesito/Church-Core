/**
 * Church domain entities barrel export.
 * 
 * Exports all church-related entity types, interfaces, and enums.
 * Use this module for all church entity imports across the application.
 * 
 * @module entities/church
 * 
 * @example
 * ```typescript
 * // Import from barrel
 * import type { 
 *   Parish, 
 *   ParishCreate, 
 *   ParishTheme,
 *   MassSchedule,
 *   DayOfWeek 
 * } from '@/entities/church';
 * ```
 */

// Parish entity
export type {
  Parish,
  ParishCreate,
  ParishUpdate,
  ParishStatus,
  ParishContactInfo,
  ParishLocation
} from './model/parish.types';

// Parish Theme entity
export type {
  ParishTheme,
  ParishThemeCreate,
  ParishThemeUpdate
} from './model/parish-theme.types';

// Mass Schedule entity
export type {
  MassSchedule,
  MassScheduleCreate,
  MassScheduleUpdate,
  DayOfWeek,
  MassType,
  MassLanguage
} from './model/mass-schedule.types';

// Gallery Image entity
export type {
  GalleryImage,
  GalleryImageCreate,
  GalleryImageUpdate,
  ImageDisplayContext
} from './model/gallery-image.types';
