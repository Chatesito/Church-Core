/**
 * Event entity type definitions.
 * 
 * Represents one-time or special occasion events for a parish.
 * These are TENANT-SPECIFIC events (different per parish).
 * 
 * **Domain Distinction**: Events are one-time or special occasions 
 * (Patronal Feasts, Retreats, Bingo Nights, Parish Missions).
 * This is DISTINCT from ParishLifeActivity (recurring religious activities).
 * 
 * @module entities/events/model/event
 */

import type { TenantEntity, CreateInput, UpdateInput, UUID } from '@/shared/types';

/**
 * Type of event based on its nature and purpose.
 * Used to categorize events for filtering and display.
 */
export type EventType = 
  | 'liturgical'     // Liturgical celebrations (e.g., Patronal Feast, First Communion)
  | 'social'         // Social gatherings (e.g., Parish Bingo, Coffee Hour)
  | 'charitable'     // Charitable activities (e.g., Food Drive, Fundraiser)
  | 'educational'    // Formation and education (e.g., Bible Study, Catechism Class)
  | 'retreat'        // Spiritual retreats (e.g., Weekend Retreat, Day of Reflection)
  | 'other';         // Miscellaneous events

/**
 * Event publication and lifecycle status.
 * Controls visibility and indicates event completion.
 */
export type EventStatus = 
  | 'draft'          // Being prepared, not visible to parishioners
  | 'published'      // Active and visible to parishioners
  | 'cancelled'      // Event was cancelled (still visible with notice)
  | 'completed';     // Event has occurred and is now historical

/**
 * Recurrence pattern for recurring events.
 * Defines how the event repeats over time.
 */
export type RecurrencePattern = 
  | 'none'           // One-time event (default)
  | 'daily'          // Repeats daily
  | 'weekly'         // Repeats weekly
  | 'monthly'        // Repeats monthly (same date)
  | 'yearly';        // Repeats yearly (annual event)

/**
 * Event entity (Tenant-specific).
 * 
 * Represents a one-time or special occasion event for a parish.
 * Parish admins can create, edit, and publish events via the web admin panel.
 * 
 * **Catholic Context**: Examples include:
 * - Patronal Feasts (Fiesta Patronal)
 * - Parish Retreats (Retiros Parroquiales)
 * - Charitable Events (Bingo, Fundraisers)
 * - Special Masses (First Communion, Confirmation)
 * 
 * **NOT for recurring religious activities** - use ParishLifeActivity instead.
 * 
 * @interface Event
 * @extends TenantEntity
 * 
 * @example
 * ```typescript
 * const event: Event = {
 *   id: createUUID('123e4567-e89b-12d3-a456-426614174003'),
 *   tenant_id: createTenantId('sanjuan'),
 *   title: 'Fiesta Patronal - San Juan María Vianney',
 *   description: 'Celebración anual del santo patrono con Misa solemne...',
 *   event_date: '2024-08-04',
 *   start_time: '10:00',
 *   end_time: '14:00',
 *   location: 'Parroquia San Juan María Vianney',
 *   event_type: 'liturgical',
 *   status: 'published',
 *   is_recurring: false,
 *   created_at: createTimestamp('2024-01-15T00:00:00Z'),
 *   updated_at: createTimestamp('2024-01-15T00:00:00Z')
 * };
 * ```
 */
export interface Event extends TenantEntity {
  /** 
   * Event title (short, descriptive).
   * @example 'Fiesta Patronal', 'Retiro de Adviento', 'Bingo Parroquial'
   */
  title: string;
  
  /** 
   * Full event description (can be long, supports rich text/Markdown).
   * Provides detailed information about the event.
   * @example 'Celebración anual de nuestro santo patrono con Misa solemne...'
   */
  description?: string;
  
  /** 
   * Date of the event (ISO 8601 format: YYYY-MM-DD).
   * For multi-day events, this is the start date.
   * @example '2024-08-04'
   */
  event_date: string;
  
  /** 
   * Start time of the event (24-hour format: HH:MM).
   * Optional for all-day events.
   * @example '10:00', '18:30'
   */
  start_time?: string;
  
  /** 
   * End time of the event (24-hour format: HH:MM).
   * Optional for events without a defined end time.
   * @example '14:00', '21:00'
   */
  end_time?: string;
  
  /** 
   * Event location (can be within parish or external venue).
   * @example 'Parroquia San Juan María Vianney', 'Salón Parroquial', 'Casa de Retiros'
   */
  location?: string;
  
  /** 
   * Type/category of the event.
   * Used for filtering and display organization.
   */
  event_type: EventType;
  
  /** 
   * Current status of the event in its lifecycle.
   * Controls visibility and indicates completion.
   */
  status: EventStatus;
  
  /** 
   * Whether this event recurs (repeats over time).
   * If true, see recurrence_pattern for details.
   * @default false
   */
  is_recurring: boolean;
  
  /** 
   * Recurrence pattern if is_recurring is true.
   * Defines how the event repeats.
   */
  recurrence_pattern?: RecurrencePattern;
  
  /** 
   * URL to an event image or poster.
   * Used for promotional display on the website.
   * @example 'https://storage.supabase.co/events/patronal-feast-2024.jpg'
   */
  image_url?: string;
  
  /** 
   * User ID of the person who created this event.
   * Foreign key reference to User entity (for audit trail).
   */
  created_by?: UUID;
}

/**
 * Input type for creating a new Event.
 * Requires tenant_id, title, event_date, event_type, status, and is_recurring.
 * 
 * @example
 * ```typescript
 * const createData: EventCreate = {
 *   tenant_id: createTenantId('sanjuan'),
 *   title: 'Retiro de Cuaresma',
 *   description: 'Retiro espiritual para preparar la Semana Santa',
 *   event_date: '2024-03-15',
 *   start_time: '09:00',
 *   end_time: '17:00',
 *   location: 'Casa de Retiros María Auxiliadora',
 *   event_type: 'retreat',
 *   status: 'published',
 *   is_recurring: false
 * };
 * ```
 */
export type EventCreate = CreateInput<Event>;

/**
 * Input type for updating an existing Event.
 * All fields are optional for partial updates.
 * 
 * @example
 * ```typescript
 * const updateData: EventUpdate = {
 *   status: 'cancelled',
 *   description: 'CANCELADO: El evento ha sido pospuesto debido al clima.'
 * };
 * ```
 */
export type EventUpdate = UpdateInput<Event>;
