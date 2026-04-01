/**
 * Sacrament record entity type definitions.
 * 
 * Defines parish sacramental records for the seven Catholic sacraments.
 * This is a future feature for tracking and managing sacramental history.
 * 
 * The Seven Sacraments of the Catholic Church:
 * - Baptism (Bautismo): First sacrament, initiation into the Church
 * - First Communion (Primera Comunión): First reception of the Eucharist
 * - Confirmation (Confirmación): Completion of baptismal grace
 * - Marriage (Matrimonio): Union of spouses before God
 * - Holy Orders (Orden Sagrado): Ordination to priesthood/diaconate
 * - Anointing of the Sick (Unción de los Enfermos): Healing sacrament
 * 
 * @module entities/community/model/sacrament-record
 */

import type { TenantEntity, CreateInput, UpdateInput, Timestamp } from '@/shared/types';

/**
 * Sacrament types according to Catholic doctrine.
 * 
 * The seven sacraments divided into three categories:
 * - Initiation: baptism, first_communion, confirmation
 * - Service: marriage, holy_orders
 * - Healing: anointing_of_sick
 * 
 * Note: Reconciliation (Confession) is typically not formally recorded
 * due to the sacramental seal of confession.
 */
export type SacramentType = 
  | 'baptism' 
  | 'first_communion' 
  | 'confirmation' 
  | 'marriage' 
  | 'holy_orders' 
  | 'anointing_of_sick';

/**
 * Sacrament record entity (Tenant-specific).
 * 
 * Represents a sacramental record kept by the parish.
 * Used for tracking when and where sacraments were administered.
 * 
 * CRITICAL: This is a FUTURE feature. Define the type now for architecture,
 * but implementation of sacrament registry is deferred to a later phase.
 * 
 * Privacy considerations:
 * - These are official Church records
 * - Access should be restricted (Parish Admin only)
 * - May be used for certificate generation
 * 
 * @interface SacramentRecord
 * @extends TenantEntity
 * 
 * @example
 * ```typescript
 * const record: SacramentRecord = {
 *   id: createUUID('123e4567-e89b-12d3-a456-426614174005'),
 *   tenant_id: createTenantId('sanjuan'),
 *   sacrament_type: 'baptism',
 *   sacrament_date: createTimestamp('2024-03-17T10:00:00Z'),
 *   recipient_name: 'María Elena Rodríguez García',
 *   minister_name: 'Padre Juan Carlos Rodríguez',
 *   location: 'Parroquia San Juan María Vianney, Neiva',
 *   notes: 'Padrinos: José y Ana García',
 *   certificate_issued: true,
 *   created_at: createTimestamp('2024-03-17T12:00:00Z'),
 *   updated_at: createTimestamp('2024-03-17T12:00:00Z')
 * };
 * ```
 */
export interface SacramentRecord extends TenantEntity {
  /** 
   * Type of sacrament administered.
   * Determines which sacrament this record documents.
   */
  sacrament_type: SacramentType;
  
  /** 
   * Date when the sacrament was administered.
   * @example createTimestamp('2024-03-17T10:00:00Z')
   */
  sacrament_date: Timestamp;
  
  /** 
   * Full name of the person who received the sacrament.
   * @example 'María Elena Rodríguez García', 'Juan Carlos Pérez'
   */
  recipient_name?: string;
  
  /** 
   * Name of the priest or deacon who administered the sacrament.
   * @example 'Padre Juan Carlos Rodríguez', 'Diácono Pedro Martínez'
   */
  minister_name?: string;
  
  /** 
   * Location where the sacrament was celebrated.
   * Can be the parish church or another location.
   * @example 'Parroquia San Juan María Vianney, Neiva', 'Capilla del Hospital'
   */
  location?: string;
  
  /** 
   * Additional notes about the sacrament.
   * Can include godparents (padrinos), special circumstances, etc.
   * @example 'Padrinos: José y Ana García', 'Bautismo de emergencia'
   */
  notes?: string;
  
  /** 
   * Whether a sacramental certificate has been issued.
   * Tracks if official documentation was provided to the recipient.
   */
  certificate_issued?: boolean;
}

/**
 * Input type for creating a new SacramentRecord.
 * Requires tenant_id, sacrament_type, and sacrament_date.
 * 
 * @example
 * ```typescript
 * const createData: SacramentRecordCreate = {
 *   tenant_id: createTenantId('sanjuan'),
 *   sacrament_type: 'baptism',
 *   sacrament_date: createTimestamp('2024-03-17T10:00:00Z'),
 *   recipient_name: 'María Elena Rodríguez García',
 *   minister_name: 'Padre Juan Carlos Rodríguez',
 *   certificate_issued: false
 * };
 * ```
 */
export type SacramentRecordCreate = CreateInput<SacramentRecord>;

/**
 * Input type for updating an existing SacramentRecord.
 * All fields optional for partial updates.
 * 
 * @example
 * ```typescript
 * const updateData: SacramentRecordUpdate = {
 *   certificate_issued: true,
 *   notes: 'Certificado entregado el 2024-03-20'
 * };
 * ```
 */
export type SacramentRecordUpdate = UpdateInput<SacramentRecord>;
