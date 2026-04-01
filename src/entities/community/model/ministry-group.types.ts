/**
 * Ministry group entity type definitions.
 * 
 * Defines parish communities, organizations, and ministry groups.
 * These are organized groups within the parish that serve specific purposes.
 * 
 * Examples:
 * - Liturgical: Coro Parroquial, Monaguillos, Lectores
 * - Charitable: Cáritas, Visita a Enfermos
 * - Prayer: Legión de María, Adoración Nocturna
 * - Youth: Grupo Juvenil, Confirmación
 * 
 * @module entities/community/model/ministry-group
 */

import type { TenantEntity, CreateInput, UpdateInput, UUID } from '@/shared/types';

/**
 * Ministry group type categories.
 * Classifies groups by their primary purpose within parish life.
 * 
 * - liturgical: Groups serving during Mass/liturgy (choir, altar servers, lectors)
 * - charitable: Groups focused on charity and service (Caritas, hospital visits)
 * - prayer: Prayer-focused groups (Rosary groups, Eucharistic Adoration)
 * - youth: Youth and young adult ministry groups
 * - family: Marriage preparation, family life ministry
 * - catechetical: Religious education, RCIA, catechism classes
 * - other: Other ministry groups not in predefined categories
 */
export type GroupType = 
  | 'liturgical' 
  | 'charitable' 
  | 'prayer' 
  | 'youth' 
  | 'family' 
  | 'catechetical' 
  | 'other';

/**
 * Ministry group entity (Tenant-specific).
 * 
 * Represents an organized community or ministry within the parish.
 * Used for displaying active groups, their schedules, and contact information.
 * 
 * @interface MinistryGroup
 * @extends TenantEntity
 * 
 * @example
 * ```typescript
 * const group: MinistryGroup = {
 *   id: createUUID('123e4567-e89b-12d3-a456-426614174004'),
 *   tenant_id: createTenantId('sanjuan'),
 *   name: 'Coro Parroquial San Juan',
 *   description: 'Ministerio de música litúrgica que sirve en las misas dominicales.',
 *   meeting_schedule: 'Ensayos: Jueves 7:00 PM',
 *   meeting_location: 'Salón Parroquial, segundo piso',
 *   contact_person_id: createUUID('member-123'),
 *   group_type: 'liturgical',
 *   is_active: true,
 *   sort_order: 1,
 *   created_at: createTimestamp('2024-01-01T00:00:00Z'),
 *   updated_at: createTimestamp('2024-01-01T00:00:00Z')
 * };
 * ```
 */
export interface MinistryGroup extends TenantEntity {
  /** 
   * Name of the ministry group.
   * @example 'Coro Parroquial San Juan', 'Legión de María', 'Monaguillos'
   */
  name: string;
  
  /** 
   * Description of the group's purpose and activities.
   * @example 'Ministerio de música que sirve en las misas dominicales y eventos especiales.'
   */
  description: string;
  
  /** 
   * Meeting schedule information (free-form text).
   * Can include day, time, frequency.
   * @example 'Ensayos: Jueves 7:00 PM', 'Reuniones: Primer sábado de cada mes a las 9:00 AM'
   */
  meeting_schedule?: string;
  
  /** 
   * Location where the group meets.
   * @example 'Salón Parroquial', 'Capilla del Santísimo', 'Casa Cural'
   */
  meeting_location?: string;
  
  /** 
   * Foreign key to ParishMember who serves as contact person.
   * Optional reference to a member responsible for this group.
   */
  contact_person_id?: UUID;
  
  /** 
   * Type/category of the ministry group.
   * Determines how the group is classified on the website.
   */
  group_type: GroupType;
  
  /** 
   * Whether this group is currently active and accepting members.
   * Allows temporary deactivation without deletion.
   */
  is_active: boolean;
  
  /** 
   * Display order for sorting groups on the website.
   * Lower numbers appear first (e.g., 1 = most prominent group).
   */
  sort_order: number;
}

/**
 * Input type for creating a new MinistryGroup.
 * Requires tenant_id, name, description, group_type, is_active, and sort_order.
 * 
 * @example
 * ```typescript
 * const createData: MinistryGroupCreate = {
 *   tenant_id: createTenantId('sanjuan'),
 *   name: 'Coro Parroquial San Juan',
 *   description: 'Ministerio de música litúrgica',
 *   meeting_schedule: 'Jueves 7:00 PM',
 *   meeting_location: 'Salón Parroquial',
 *   group_type: 'liturgical',
 *   is_active: true,
 *   sort_order: 1
 * };
 * ```
 */
export type MinistryGroupCreate = CreateInput<MinistryGroup>;

/**
 * Input type for updating an existing MinistryGroup.
 * All fields optional for partial updates.
 * 
 * @example
 * ```typescript
 * const updateData: MinistryGroupUpdate = {
 *   meeting_schedule: 'Cambio de horario: Miércoles 6:30 PM',
 *   description: 'Ahora también servimos en misas de primera comunión'
 * };
 * ```
 */
export type MinistryGroupUpdate = UpdateInput<MinistryGroup>;
