/**
 * Saint of the Day entity type definitions.
 * 
 * Represents the Catholic Saint commemorated on a given day.
 * This is a GLOBAL entity - shared across all parishes (NO tenant_id).
 * Saint data is automatically fetched from Catholic liturgical APIs.
 * 
 * @module entities/liturgy/model/saint-of-day
 */

import type { GlobalEntity, CreateInput, UpdateInput } from '@/shared/types';

/**
 * Type of feast day in the liturgical calendar.
 * Determines the importance and celebration level of the saint's day.
 */
export type FeastType =
  | 'solemnity'          // Solemnidad (highest rank, e.g., Christmas, Easter)
  | 'feast'              // Fiesta (high rank, e.g., Apostles, major saints)
  | 'memorial'           // Memoria obligatoria (required memorial)
  | 'optional_memorial'; // Memoria libre (optional memorial)

/**
 * Saint of the Day entity (Global).
 * 
 * Stores information about the Catholic Saint commemorated on a specific day.
 * This is a GLOBAL entity shared across ALL parishes - saint commemorations
 * follow the universal Catholic liturgical calendar (with some regional variations).
 * 
 * **Automation**: Saint data is 100% automatic - fetched daily from Catholic APIs
 * (e.g., EWTN, Ciudad Redonda). Parish admins NEVER edit this data manually.
 * 
 * **Multiple Saints**: Some days may have multiple saints. Each saint gets a
 * separate record with the same date.
 * 
 * @interface SaintOfTheDay
 * @extends GlobalEntity
 * 
 * @example
 * ```typescript
 * const saint: SaintOfTheDay = {
 *   id: createUUID('123e4567-e89b-12d3-a456-426614174000'),
 *   date: '2024-12-08',
 *   name: 'Inmaculada Concepción de la Virgen María',
 *   feast_type: 'solemnity',
 *   description: 'Dogma proclamado por el Papa Pío IX en 1854...',
 *   image_url: 'https://storage.example.com/saints/immaculate-conception.jpg',
 *   locale: 'es-CO',
 *   created_at: createTimestamp('2024-12-01T00:00:00Z'),
 *   updated_at: createTimestamp('2024-12-01T00:00:00Z')
 * };
 * ```
 */
export interface SaintOfTheDay extends GlobalEntity {
  /** Date of the saint's commemoration (ISO 8601 format: YYYY-MM-DD) */
  date: string;
  
  /** Name of the saint (e.g., "San Juan María Vianney", "Santa Teresa de Ávila") */
  name: string;
  
  /** Type of feast day (solemnity, feast, memorial, optional_memorial) */
  feast_type: FeastType;
  
  /** Biography or description of the saint (optional, can be long text) */
  description?: string;
  
  /** URL to an image of the saint (optional) */
  image_url?: string;
  
  /** Locale/language code for the saint's name and description (e.g., 'es-CO', 'en-US') */
  locale: string;
}

/**
 * Input type for creating a new SaintOfTheDay.
 * Omits auto-generated fields (id, created_at, updated_at).
 * 
 * **Note**: This is typically used by automated sync jobs, not manual admin input.
 * 
 * @example
 * ```typescript
 * const createData: SaintOfTheDayCreate = {
 *   date: '2024-12-08',
 *   name: 'Inmaculada Concepción de la Virgen María',
 *   feast_type: 'solemnity',
 *   locale: 'es-CO'
 * };
 * ```
 */
export type SaintOfTheDayCreate = CreateInput<SaintOfTheDay>;

/**
 * Input type for updating an existing SaintOfTheDay.
 * All fields are optional (partial update).
 * Omits immutable fields (id, created_at, updated_at).
 * 
 * **Note**: Updates are rare - typically only for corrections, adding descriptions, or image URLs.
 * 
 * @example
 * ```typescript
 * const updateData: SaintOfTheDayUpdate = {
 *   description: 'Updated biography with more historical details...',
 *   image_url: 'https://storage.example.com/saints/immaculate-conception-hd.jpg'
 * };
 * ```
 */
export type SaintOfTheDayUpdate = UpdateInput<SaintOfTheDay>;
