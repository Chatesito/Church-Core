/**
 * Parish member entity type definitions.
 * 
 * Defines public-facing parish team members (clergy, staff, leaders).
 * This is NOT for all parishioners, only those displayed on the website.
 * 
 * Terminology reference (AGENTS.md Section 3.1):
 * - Párroco (Priest)
 * - Diácono (Deacon)
 * - Secretaria (Secretary)
 * - Músicos/Coro (Musicians/Choir)
 * 
 * @module entities/community/model/parish-member
 */

import type { TenantEntity, CreateInput, UpdateInput } from '@/shared/types';

/**
 * Parish member role types.
 * Defines official positions within the parish structure.
 * 
 * Based on Catholic Church hierarchy and parish organization:
 * - priest: Párroco (Pastor/Parish Priest)
 * - deacon: Diácono (Permanent or Transitional Deacon)
 * - secretary: Secretaria (Parish Secretary/Administrator)
 * - music_coordinator: Coordinador de Música (Choir Director/Music Minister)
 * - catechist: Catequista (Religious Education Teacher)
 * - sacristan: Sacristán (Liturgical Assistant)
 * - other: Other parish roles not in predefined list
 */
export type MemberRole = 
  | 'priest' 
  | 'deacon' 
  | 'secretary' 
  | 'music_coordinator' 
  | 'catechist' 
  | 'sacristan' 
  | 'other';

/**
 * Parish member entity (Tenant-specific).
 * 
 * Represents a public-facing member of the parish team.
 * Used for displaying staff, clergy, and key ministers on the parish website.
 * 
 * CRITICAL: This is NOT for managing all parishioners/congregation members.
 * Only for those who have official roles and are displayed publicly.
 * 
 * @interface ParishMember
 * @extends TenantEntity
 * 
 * @example
 * ```typescript
 * const member: ParishMember = {
 *   id: createUUID('123e4567-e89b-12d3-a456-426614174003'),
 *   tenant_id: createTenantId('sanjuan'),
 *   full_name: 'Padre Juan Carlos Rodríguez',
 *   role: 'priest',
 *   role_display_name: 'Párroco',
 *   description: 'Ordenado en 2010, sirve a la parroquia desde 2018.',
 *   photo_url: 'https://example.com/photos/padre-juan.jpg',
 *   email: 'padre@sanjuan.org',
 *   phone: '+57 300 123 4567',
 *   sort_order: 1,
 *   is_active: true,
 *   created_at: createTimestamp('2024-01-01T00:00:00Z'),
 *   updated_at: createTimestamp('2024-01-01T00:00:00Z')
 * };
 * ```
 */
export interface ParishMember extends TenantEntity {
  /** 
   * Full name of the parish member.
   * @example 'Padre Juan Carlos Rodríguez', 'Hermana María González'
   */
  full_name: string;
  
  /** 
   * Official role within the parish structure.
   * Determines the member's position in the hierarchy.
   */
  role: MemberRole;
  
  /** 
   * Custom display name for the role (overrides default role label).
   * Use for localized or specific titles.
   * @example 'Párroco', 'Vicario Parroquial', 'Directora de Coro'
   */
  role_display_name?: string;
  
  /** 
   * Biography or description of the member.
   * Can include ordination date, years of service, personal message.
   * @example 'Ordenado en 2010, ha servido en 3 parroquias. Especialista en liturgia.'
   */
  description?: string;
  
  /** 
   * URL to member's photo (stored in Supabase Storage or external CDN).
   * @example 'https://storage.supabase.co/parish-members/padre-juan.jpg'
   */
  photo_url?: string;
  
  /** 
   * Public contact email (if member allows public contact).
   * @example 'padre@sanjuan.org', 'secretaria@parroquia.com'
   */
  email?: string;
  
  /** 
   * Public contact phone (if member allows public contact).
   * @example '+57 300 123 4567'
   */
  phone?: string;
  
  /** 
   * Display order for sorting members on the website.
   * Lower numbers appear first (e.g., 1 = Priest, 2 = Deacon, 3 = Secretary).
   */
  sort_order: number;
  
  /** 
   * Whether this member is currently active and should be displayed.
   * Allows temporary hiding without deletion (e.g., sabbatical, transfer).
   */
  is_active: boolean;
}

/**
 * Input type for creating a new ParishMember.
 * Requires tenant_id, full_name, role, sort_order, and is_active.
 * 
 * @example
 * ```typescript
 * const createData: ParishMemberCreate = {
 *   tenant_id: createTenantId('sanjuan'),
 *   full_name: 'Padre Juan Carlos Rodríguez',
 *   role: 'priest',
 *   role_display_name: 'Párroco',
 *   description: 'Ordenado en 2010',
 *   photo_url: 'https://example.com/photos/padre-juan.jpg',
 *   sort_order: 1,
 *   is_active: true
 * };
 * ```
 */
export type ParishMemberCreate = CreateInput<ParishMember>;

/**
 * Input type for updating an existing ParishMember.
 * All fields optional for partial updates.
 * 
 * @example
 * ```typescript
 * const updateData: ParishMemberUpdate = {
 *   description: 'Actualizado: ahora también coordinador de pastoral juvenil',
 *   phone: '+57 300 999 8888'
 * };
 * ```
 */
export type ParishMemberUpdate = UpdateInput<ParishMember>;
