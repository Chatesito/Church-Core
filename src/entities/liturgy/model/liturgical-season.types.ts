/**
 * Liturgical Season entity type definitions.
 * 
 * Represents a season in the Catholic Church liturgical year.
 * This is a GLOBAL entity - shared across all parishes (NO tenant_id).
 * Seasons follow the universal Catholic liturgical calendar.
 * 
 * @module entities/liturgy/model/liturgical-season
 */

import type { GlobalEntity, CreateInput, UpdateInput } from '@/shared/types';

/**
 * Re-export LiturgicalColor from liturgical-reading for consistency.
 * Both entities share the same color enum.
 */
export type { LiturgicalColor } from './liturgical-reading.types';
import type { LiturgicalColor } from './liturgical-reading.types';

/**
 * Liturgical Season entity (Global).
 * 
 * Stores information about liturgical seasons in the Catholic Church calendar.
 * This is a GLOBAL entity shared across ALL parishes - seasons are universal
 * in the Catholic Church (though dates may vary slightly by year).
 * 
 * **Purpose**: This entity helps track season boundaries and liturgical colors
 * for UI theming, calendar views, and liturgical planning.
 * 
 * **Seasons**: The Catholic liturgical year includes:
 * - Advent (Adviento) - Purple
 * - Christmas (Navidad) - White/Gold
 * - Ordinary Time (Tiempo Ordinario) - Green
 * - Lent (Cuaresma) - Purple
 * - Holy Week (Semana Santa) - Red/Purple
 * - Easter (Pascua) - White/Gold
 * 
 * @interface LiturgicalSeason
 * @extends GlobalEntity
 * 
 * @example
 * ```typescript
 * const season: LiturgicalSeason = {
 *   id: createUUID('123e4567-e89b-12d3-a456-426614174000'),
 *   name: 'Advent',
 *   liturgical_color: 'purple',
 *   start_date: '2024-12-01',
 *   end_date: '2024-12-24',
 *   description: 'Tiempo de preparación para la Navidad',
 *   created_at: createTimestamp('2024-01-01T00:00:00Z'),
 *   updated_at: createTimestamp('2024-01-01T00:00:00Z')
 * };
 * ```
 */
export interface LiturgicalSeason extends GlobalEntity {
  /** Name of the liturgical season (e.g., "Advent", "Lent", "Easter") */
  name: string;
  
  /** Primary liturgical color for this season */
  liturgical_color: LiturgicalColor;
  
  /** Start date of the season (ISO 8601 format: YYYY-MM-DD) - optional, varies by year */
  start_date?: string;
  
  /** End date of the season (ISO 8601 format: YYYY-MM-DD) - optional, varies by year */
  end_date?: string;
  
  /** Description or significance of the season (optional) */
  description?: string;
}

/**
 * Input type for creating a new LiturgicalSeason.
 * Omits auto-generated fields (id, created_at, updated_at).
 * 
 * **Note**: Seasons are typically seeded during system initialization,
 * not created dynamically by users.
 * 
 * @example
 * ```typescript
 * const createData: LiturgicalSeasonCreate = {
 *   name: 'Advent',
 *   liturgical_color: 'purple',
 *   description: 'Tiempo de preparación para la Navidad'
 * };
 * ```
 */
export type LiturgicalSeasonCreate = CreateInput<LiturgicalSeason>;

/**
 * Input type for updating an existing LiturgicalSeason.
 * All fields are optional (partial update).
 * Omits immutable fields (id, created_at, updated_at).
 * 
 * **Note**: Updates are rare - typically only for corrections or adding yearly date ranges.
 * 
 * @example
 * ```typescript
 * const updateData: LiturgicalSeasonUpdate = {
 *   start_date: '2024-12-01',
 *   end_date: '2024-12-24'
 * };
 * ```
 */
export type LiturgicalSeasonUpdate = UpdateInput<LiturgicalSeason>;
