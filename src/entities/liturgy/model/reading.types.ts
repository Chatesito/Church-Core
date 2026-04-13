/**
 * Reading entity type definitions.
 * 
 * Represents individual liturgical readings (First Reading, Psalm, Second Reading, Gospel).
 * This is a GLOBAL entity - shared across all parishes (NO tenant_id).
 * Readings are automatically fetched from Catholic liturgical APIs.
 * 
 * @module entities/liturgy/model/reading
 */

import type { GlobalEntity, CreateInput, UpdateInput } from '@/shared/types';

/**
 * Type of liturgical reading within a day's Mass.
 * Determines position in the book and formatting.
 */
export type ReadingType =
  | 'first_reading'   // Primera Lectura
  | 'psalm'           // Salmo Responsorial
  | 'second_reading'  // Segunda Lectura (opcional)
  | 'gospel';         // Evangelho

/**
 * Reading entity (Global).
 * 
 * Stores individual reading text for a specific liturgical day.
 * Each DayReading contains multiple Reading entities (usually 3-4 per day).
 * 
 * **CRITICAL**: This entity stores the actual READING TEXT.
 * The metadata (date, season, color) is stored in LiturgicalReading.
 * 
 * **Automation**: Readings are 100% automatic - fetched daily from Catholic APIs
 * (e.g., EWTN, Ciudad Redonda). Parish admins NEVER edit this data manually.
 * 
 * **Locale Support**: Readings are stored per locale. Default is 'es' (Spanish).
 * Future expansion for 'en', 'pt', 'la', etc.
 * 
 * @interface Reading
 * @extends GlobalEntity
 * 
 * @example
 * ```typescript
 * const gospel: Reading = {
 *   id: createUUID('123e4567-e89b-12d3-a456-426614174001'),
 *   liturgical_reading_id: createUUID('123e4567-e89b-12d3-a456-426614174000'),
 *   type: 'gospel',
 *   reference: 'Mt 1,18-24',
 *   text: 'Lectura del santo evangelio según San Mateo: El nacimiento de Jesús...' ,
 *   order: 4,
 *   locale: 'es',
 *   created_at: createTimestamp('2024-12-01T00:00:00Z'),
 *   updated_at: createTimestamp('2024-12-01T00:00:00Z')
 * };
 * ```
 */
export interface Reading extends GlobalEntity {
  /** Foreign key to the parent LiturgicalReading (date metadata) */
  liturgical_reading_id: string;
  
  /** Type of reading (determines position and formatting in the book) */
  type: ReadingType;
  
  /** Biblical reference (e.g., "Gn 1,1-19", "Salmo 23", "Jn 3,16-21") */
  reference: string;
  
  /** Full text of the reading (typically 200-800 words) */
  text: string;
  
  /** Display order within the day's readings (1 = first, 4 = last) */
  order: number;
  
  /** Locale/language code for the reading (e.g., 'es', 'en', 'pt') */
  locale: string;
}

/**
 * Input type for creating a new Reading.
 * Omits auto-generated fields (id, created_at, updated_at).
 * 
 * @example
 * ```typescript
 * const createData: ReadingCreate = {
 *   liturgical_reading_id: '123e4567-e89b-12d3-a456-426614174000',
 *   type: 'gospel',
 *   reference: 'Mt 1,18-24',
 *   text: 'El nacimiento de Jesús...',
 *   order: 4,
 *   locale: 'es'
 * };
 * ```
 */
export type ReadingCreate = CreateInput<Reading>;

/**
 * Input type for updating an existing Reading.
 * All fields are optional (partial update).
 * 
 * @example
 * ```typescript
 * const updateData: ReadingUpdate = {
 *   text: 'Texto corregido...'
 * };
 * ```
 */
export type ReadingUpdate = UpdateInput<Reading>;
