/**
 * Parish Life Activity entity type definitions.
 * 
 * Represents recurring religious activities with strict schedules for a parish.
 * These are TENANT-SPECIFIC activities (different per parish).
 * 
 * **Domain Distinction**: Parish Life Activities are RECURRING religious activities 
 * with strict schedules (Holy Hour, Rosary, First Saturdays, Adoración Eucarística).
 * This is DISTINCT from Event (one-time or special occasions).
 * 
 * **Catholic Terminology**: From AGENTS.md Section 3.1:
 * "Parish Life (Vida Parroquial): Recurring religious activities with strict schedules.
 * NOT generic 'events'."
 * 
 * @module entities/events/model/parish-life-activity
 */

import type { TenantEntity, CreateInput, UpdateInput } from '@/shared/types';

/**
 * Day of the week for recurring activities.
 * Includes special Catholic observances (first Friday, first Saturday).
 */
export type DayOfWeek = 
  | 'monday' 
  | 'tuesday' 
  | 'wednesday' 
  | 'thursday' 
  | 'friday' 
  | 'saturday' 
  | 'sunday'
  | 'first_friday'     // First Friday devotion (Sagrado Corazón de Jesús)
  | 'first_saturday';  // First Saturday devotion (Inmaculado Corazón de María)

/**
 * Type of parish life activity based on its spiritual nature.
 * Used to categorize recurring religious practices.
 */
export type ActivityType = 
  | 'adoration'       // Eucharistic Adoration (Adoración Eucarística)
  | 'rosary'          // Holy Rosary (Santo Rosario)
  | 'lectio_divina'   // Divine Office / Lectio Divina (Lectura Orante)
  | 'holy_hour'       // Holy Hour (Hora Santa)
  | 'prayer_group'    // Prayer groups (Grupos de Oración, Legión de María)
  | 'novena'          // Novenas (9-day prayer devotions)
  | 'other';          // Other recurring activities

/**
 * Parish Life Activity entity (Tenant-specific).
 * 
 * Represents a recurring religious activity with a strict schedule for a parish.
 * Parish admins can create, edit, and manage these activities via the web admin panel.
 * 
 * **Catholic Context**: Examples include:
 * - Adoración Eucarística (Eucharistic Adoration) - every Friday 7-8pm
 * - Santo Rosario (Holy Rosary) - daily at 6pm
 * - Hora Santa (Holy Hour) - first Friday of each month
 * - Primeros Sábados (First Saturdays) - Immaculate Heart devotion
 * - Legión de María (Legion of Mary) - weekly meetings
 * 
 * **NOT for one-time events** - use Event entity instead.
 * 
 * @interface ParishLifeActivity
 * @extends TenantEntity
 * 
 * @example
 * ```typescript
 * const activity: ParishLifeActivity = {
 *   id: createUUID('123e4567-e89b-12d3-a456-426614174004'),
 *   tenant_id: createTenantId('sanjuan'),
 *   name: 'Adoración Eucarística',
 *   description: 'Adoración al Santísimo Sacramento todos los viernes',
 *   day_of_week: 'friday',
 *   start_time: '19:00',
 *   end_time: '20:00',
 *   location: 'Capilla Principal',
 *   activity_type: 'adoration',
 *   is_active: true,
 *   sort_order: 1,
 *   created_at: createTimestamp('2024-01-01T00:00:00Z'),
 *   updated_at: createTimestamp('2024-01-01T00:00:00Z')
 * };
 * ```
 */
export interface ParishLifeActivity extends TenantEntity {
  /** 
   * Activity name (short, descriptive).
   * @example 'Adoración Eucarística', 'Santo Rosario', 'Legión de María'
   */
  name: string;
  
  /** 
   * Description of the activity (optional).
   * Provides additional context or instructions.
   * @example 'Adoración al Santísimo Sacramento todos los viernes'
   */
  description?: string;
  
  /** 
   * Day of the week when the activity occurs.
   * Can be a regular weekday or special observance (first_friday, first_saturday).
   * @example 'friday', 'first_saturday'
   */
  day_of_week: DayOfWeek;
  
  /** 
   * Start time of the activity (24-hour format: HH:MM).
   * Optional for activities without a strict start time.
   * @example '19:00', '06:30'
   */
  start_time?: string;
  
  /** 
   * End time of the activity (24-hour format: HH:MM).
   * Optional for open-ended activities (e.g., all-day adoration).
   * @example '20:00', '21:30'
   */
  end_time?: string;
  
  /** 
   * Location where the activity takes place.
   * Can be within parish or external venue.
   * @example 'Capilla Principal', 'Salón Parroquial', 'Casa Parroquial'
   */
  location?: string;
  
  /** 
   * Type/category of the parish life activity.
   * Used for filtering and display organization.
   */
  activity_type: ActivityType;
  
  /** 
   * Whether this activity is currently active.
   * Allows temporary disabling without deletion (e.g., summer break).
   */
  is_active: boolean;
  
  /** 
   * Display order for sorting multiple activities on the same day.
   * Lower numbers appear first (e.g., 1 = morning, 2 = evening).
   */
  sort_order: number;
}

/**
 * Input type for creating a new ParishLifeActivity.
 * Requires tenant_id, name, day_of_week, activity_type, is_active, and sort_order.
 * 
 * @example
 * ```typescript
 * const createData: ParishLifeActivityCreate = {
 *   tenant_id: createTenantId('sanjuan'),
 *   name: 'Santo Rosario',
 *   description: 'Rezo del Santo Rosario diario',
 *   day_of_week: 'sunday',
 *   start_time: '18:00',
 *   end_time: '18:30',
 *   location: 'Capilla Principal',
 *   activity_type: 'rosary',
 *   is_active: true,
 *   sort_order: 1
 * };
 * ```
 */
export type ParishLifeActivityCreate = CreateInput<ParishLifeActivity>;

/**
 * Input type for updating an existing ParishLifeActivity.
 * All fields are optional for partial updates.
 * 
 * @example
 * ```typescript
 * const updateData: ParishLifeActivityUpdate = {
 *   start_time: '19:30',
 *   description: 'Horario actualizado para el verano'
 * };
 * ```
 */
export type ParishLifeActivityUpdate = UpdateInput<ParishLifeActivity>;
