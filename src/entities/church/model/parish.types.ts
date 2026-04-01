/**
 * Parish entity type definitions.
 * 
 * Represents a Catholic parish (tenant) in the ChurchCore platform.
 * Each parish is a separate tenant with isolated data and customizable branding.
 * 
 * @module entities/church/model/parish
 */

import type { TenantEntity, CreateInput, UpdateInput } from '@/shared/types';

/**
 * Status of a parish in the system.
 * - active: Parish is operational and accessible
 * - inactive: Parish is temporarily disabled
 * - archived: Parish is permanently archived
 */
export type ParishStatus = 'active' | 'inactive' | 'archived';

/**
 * Contact information for a parish.
 * All fields are optional to support gradual data entry.
 */
export interface ParishContactInfo {
  /** Physical address of the parish */
  address?: string;
  /** Primary phone number */
  phone?: string;
  /** Primary email address */
  email?: string;
  /** Website URL */
  website?: string;
}

/**
 * Geographic location coordinates for the parish.
 * Used for embedded maps (e.g., Google Maps).
 */
export interface ParishLocation {
  /** Latitude coordinate */
  latitude: number;
  /** Longitude coordinate */
  longitude: number;
}

/**
 * Parish entity (Tenant-specific).
 * 
 * Core entity representing a Catholic parish. Each parish is a tenant
 * with isolated data, custom branding, and dedicated configuration.
 * 
 * @interface Parish
 * @extends TenantEntity
 * 
 * @example
 * ```typescript
 * const parish: Parish = {
 *   id: createUUID('123e4567-e89b-12d3-a456-426614174000'),
 *   tenant_id: createTenantId('sanjuan'),
 *   name: 'Parroquia San Juan María Vianney',
 *   description: 'Parish serving the community of Neiva, Huila',
 *   contact_info: {
 *     address: 'Calle 8 # 12-34, Neiva, Huila',
 *     phone: '+57 318 123 4567',
 *     email: 'contacto@sanjuanmariavianney.org'
 *   },
 *   location: { latitude: 2.9273, longitude: -75.2819 },
 *   status: 'active',
 *   created_at: createTimestamp('2024-01-01T00:00:00Z'),
 *   updated_at: createTimestamp('2024-01-01T00:00:00Z')
 * };
 * ```
 */
export interface Parish extends TenantEntity {
  /** Official name of the parish (e.g., "Parroquia San Juan María Vianney") */
  name: string;
  
  /** Brief description or mission statement of the parish */
  description?: string;
  
  /** Contact information (address, phone, email, website) */
  contact_info?: ParishContactInfo;
  
  /** Geographic coordinates for map embedding */
  location?: ParishLocation;
  
  /** Current operational status of the parish */
  status: ParishStatus;
}

/**
 * Input type for creating a new Parish.
 * Omits auto-generated fields (id, created_at, updated_at).
 * 
 * @example
 * ```typescript
 * const createData: ParishCreate = {
 *   tenant_id: createTenantId('sanjuan'),
 *   name: 'Parroquia San Juan María Vianney',
 *   status: 'active'
 * };
 * ```
 */
export type ParishCreate = CreateInput<Parish>;

/**
 * Input type for updating an existing Parish.
 * All fields are optional (partial update).
 * Omits immutable fields (id, tenant_id, created_at, updated_at).
 * 
 * @example
 * ```typescript
 * const updateData: ParishUpdate = {
 *   contact_info: {
 *     phone: '+57 318 999 8888'
 *   }
 * };
 * ```
 */
export type ParishUpdate = UpdateInput<Parish>;
