/**
 * Liturgical Reading entity type definitions.
 * 
 * Represents the daily liturgical readings metadata for the Catholic Church.
 * This is a GLOBAL entity - shared across all parishes (NO tenant_id).
 * Readings are automatically fetched from Catholic liturgical APIs.
 * 
 * @module entities/liturgy/model/liturgical-reading
 */

import type { GlobalEntity, CreateInput, UpdateInput } from '@/shared/types';

/**
 * Liturgical season in the Catholic Church calendar.
 * Determines the liturgical color and readings cycle.
 */
export type LiturgicalSeason =
  | 'Advent'           // Adviento
  | 'Christmas'        // Navidad
  | 'Ordinary Time'    // Tiempo Ordinario
  | 'Lent'             // Cuaresma
  | 'Easter'           // Pascua
  | 'Holy Week';       // Semana Santa

/**
 * Liturgical color used in vestments and altar decorations.
 * Color corresponds to the liturgical season or feast type.
 */
export type LiturgicalColor =
  | 'green'     // Ordinary Time
  | 'purple'    // Advent, Lent
  | 'white'     // Christmas, Easter, special feasts
  | 'red'       // Palm Sunday, Pentecost, martyrs
  | 'gold'      // Special solemnities (alternative to white)
  | 'black';    // Optional for Masses for the dead

/**
 * Liturgical Reading entity (Global).
 * 
 * Stores daily liturgical readings metadata for the Catholic Church.
 * This is a GLOBAL entity shared across ALL parishes - readings are the same
 * worldwide for each liturgical day (except language variations).
 * 
 * **CRITICAL**: This entity stores METADATA only (date, season, color, day name).
 * Individual reading texts (First Reading, Psalm, Second Reading, Gospel) are
 * stored in a separate `Reading` entity (not in this phase).
 * 
 * **Automation**: Readings are 100% automatic - fetched daily from Catholic APIs
 * (e.g., EWTN, Ciudad Redonda). Parish admins NEVER edit this data manually.
 * 
 * @interface LiturgicalReading
 * @extends GlobalEntity
 * 
 * @example
 * ```typescript
 * const reading: LiturgicalReading = {
 *   id: createUUID('123e4567-e89b-12d3-a456-426614174000'),
 *   date: '2024-12-08',
 *   liturgical_day_name: 'Inmaculada Concepción de la Virgen María',
 *   season: 'Advent',
 *   liturgical_color: 'white',
 *   locale: 'es-CO',
 *   created_at: createTimestamp('2024-12-01T00:00:00Z'),
 *   updated_at: createTimestamp('2024-12-01T00:00:00Z')
 * };
 * ```
 */
export interface LiturgicalReading extends GlobalEntity {
  /** Date of the liturgical day (ISO 8601 format: YYYY-MM-DD) */
  date: string;
  
  /** Name of the liturgical day (e.g., "Inmaculada Concepción", "3er Domingo de Adviento") */
  liturgical_day_name: string;
  
  /** Current liturgical season */
  season: LiturgicalSeason;
  
  /** Liturgical color for vestments and decorations */
  liturgical_color: LiturgicalColor;
  
  /** Locale/language code for the readings (e.g., 'es-CO', 'en-US', 'pt-BR') */
  locale: string;
}

/**
 * Input type for creating a new LiturgicalReading.
 * Omits auto-generated fields (id, created_at, updated_at).
 * 
 * **Note**: This is typically used by automated sync jobs, not manual admin input.
 * 
 * @example
 * ```typescript
 * const createData: LiturgicalReadingCreate = {
 *   date: '2024-12-08',
 *   liturgical_day_name: 'Inmaculada Concepción de la Virgen María',
 *   season: 'Advent',
 *   liturgical_color: 'white',
 *   locale: 'es-CO'
 * };
 * ```
 */
export type LiturgicalReadingCreate = CreateInput<LiturgicalReading>;

/**
 * Input type for updating an existing LiturgicalReading.
 * All fields are optional (partial update).
 * Omits immutable fields (id, created_at, updated_at).
 * 
 * **Note**: Updates are rare - typically only for corrections or locale additions.
 * 
 * @example
 * ```typescript
 * const updateData: LiturgicalReadingUpdate = {
 *   liturgical_day_name: 'Inmaculada Concepción de María'
 * };
 * ```
 */
export type LiturgicalReadingUpdate = UpdateInput<LiturgicalReading>;
