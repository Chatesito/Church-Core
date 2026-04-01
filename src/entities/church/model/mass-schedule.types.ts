/**
 * Mass schedule entity type definitions.
 * 
 * Defines recurring Mass (Eucharist) schedules for a parish.
 * Masses follow weekly patterns and can be configured per day.
 * 
 * @module entities/church/model/mass-schedule
 */

import type { TenantEntity, CreateInput, UpdateInput } from '@/shared/types';

/**
 * Days of the week literal union.
 * Used for defining recurring Mass schedules.
 */
export type DayOfWeek = 
  | 'monday' 
  | 'tuesday' 
  | 'wednesday' 
  | 'thursday' 
  | 'friday' 
  | 'saturday' 
  | 'sunday';

/**
 * Type of Mass celebration.
 * Differentiates between regular weekday Masses and special occasions.
 */
export type MassType = 
  | 'daily'         // Regular weekday Mass
  | 'sunday'        // Sunday/weekend Mass
  | 'vigil'         // Saturday evening vigil Mass
  | 'special';      // Special occasions (e.g., First Friday, Holy Day)

/**
 * Language in which the Mass is celebrated.
 * Allows for multilingual parish communities.
 */
export type MassLanguage = 
  | 'spanish' 
  | 'english' 
  | 'latin' 
  | 'other';

/**
 * Mass schedule entity (Tenant-specific).
 * 
 * Represents a recurring Mass celebration time for a parish.
 * Multiple schedules can exist per day (e.g., morning and evening Masses).
 * 
 * @interface MassSchedule
 * @extends TenantEntity
 * 
 * @example
 * ```typescript
 * const schedule: MassSchedule = {
 *   id: createUUID('123e4567-e89b-12d3-a456-426614174002'),
 *   tenant_id: createTenantId('sanjuan'),
 *   day_of_week: 'sunday',
 *   time: '09:00',
 *   mass_type: 'sunday',
 *   language: 'spanish',
 *   is_active: true,
 *   sort_order: 1,
 *   created_at: createTimestamp('2024-01-01T00:00:00Z'),
 *   updated_at: createTimestamp('2024-01-01T00:00:00Z')
 * };
 * ```
 */
export interface MassSchedule extends TenantEntity {
  /** 
   * Day of the week when the Mass occurs.
   * @example 'sunday', 'wednesday'
   */
  day_of_week: DayOfWeek;
  
  /** 
   * Time of the Mass in 24-hour format (HH:MM).
   * @example '09:00', '18:30'
   */
  time: string;
  
  /** 
   * Type of Mass celebration.
   * Determines liturgical significance.
   */
  mass_type: MassType;
  
  /** 
   * Language of the Mass celebration.
   * Useful for multilingual parishes.
   */
  language: MassLanguage;
  
  /** 
   * Additional notes or special instructions.
   * @example 'Followed by coffee and fellowship', 'Children's liturgy available'
   */
  notes?: string;
  
  /** 
   * Location within the parish (if multiple venues).
   * @example 'Main Chapel', 'Parish Hall', 'Outdoor Garden'
   */
  location?: string;
  
  /** 
   * Whether this schedule is currently active.
   * Allows temporary disabling without deletion (e.g., summer schedule changes).
   */
  is_active: boolean;
  
  /** 
   * Display order for sorting multiple Masses on the same day.
   * Lower numbers appear first (e.g., 1 = 7:00 AM, 2 = 9:00 AM).
   */
  sort_order: number;
}

/**
 * Input type for creating a new MassSchedule.
 * Requires tenant_id, day, time, type, and language.
 * 
 * @example
 * ```typescript
 * const createData: MassScheduleCreate = {
 *   tenant_id: createTenantId('sanjuan'),
 *   day_of_week: 'sunday',
 *   time: '09:00',
 *   mass_type: 'sunday',
 *   language: 'spanish',
 *   is_active: true,
 *   sort_order: 1
 * };
 * ```
 */
export type MassScheduleCreate = CreateInput<MassSchedule>;

/**
 * Input type for updating an existing MassSchedule.
 * All fields optional for partial updates.
 * 
 * @example
 * ```typescript
 * const updateData: MassScheduleUpdate = {
 *   time: '10:00',
 *   notes: 'Time changed for summer schedule'
 * };
 * ```
 */
export type MassScheduleUpdate = UpdateInput<MassSchedule>;
