/**
 * Liturgy domain entities barrel export.
 * 
 * Exports all liturgy-related entity types, interfaces, and enums.
 * Use this module for all liturgy entity imports across the application.
 * 
 * **IMPORTANT**: All liturgy entities are GLOBAL (NO tenant_id).
 * They are shared across all parishes in the platform.
 * 
 * @module entities/liturgy
 * 
 * @example
 * ```typescript
 * // Import from barrel
 * import type { 
 *   LiturgicalReading,
 *   LiturgicalSeason,
 *   SaintOfTheDay,
 *   FeastType,
 *   LiturgicalColor
 * } from '@/entities/liturgy';
 * ```
 */

// Liturgical Reading metadata entity
export type {
  LiturgicalReading,
  LiturgicalReadingCreate,
  LiturgicalReadingUpdate,
  LiturgicalSeason as LiturgicalSeasonType,
  LiturgicalColor
} from './model/liturgical-reading.types';

// Individual Reading text entity
export type {
  Reading,
  ReadingType,
  ReadingCreate,
  ReadingUpdate
} from './model/reading.types';

// Saint of the Day entity
export type {
  SaintOfTheDay,
  SaintOfTheDayCreate,
  SaintOfTheDayUpdate,
  FeastType
} from './model/saint-of-day.types';

// Liturgical Season entity
export type {
  LiturgicalSeason,
  LiturgicalSeasonCreate,
  LiturgicalSeasonUpdate
} from './model/liturgical-season.types';
