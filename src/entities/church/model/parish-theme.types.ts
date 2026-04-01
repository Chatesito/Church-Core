/**
 * Parish theme entity type definitions.
 * 
 * Defines branding and theming configuration for a parish.
 * Each parish can customize colors, logos, and typography.
 * 
 * @module entities/church/model/parish-theme
 */

import type { TenantEntity, CreateInput, UpdateInput } from '@/shared/types';

/**
 * Parish theme entity (Tenant-specific).
 * 
 * Stores visual branding configuration for a parish tenant.
 * Used to generate CSS variables for dynamic theming without code changes.
 * 
 * Colors use hex format (e.g., '#FFD700' for gold, '#000000' for black).
 * 
 * @interface ParishTheme
 * @extends TenantEntity
 * 
 * @example
 * ```typescript
 * const theme: ParishTheme = {
 *   id: createUUID('123e4567-e89b-12d3-a456-426614174001'),
 *   tenant_id: createTenantId('sanjuan'),
 *   primary_color: '#FFD700',    // Gold
 *   secondary_color: '#000000',  // Black
 *   accent_color: '#FFFFFF',     // White
 *   logo_url: 'https://cdn.example.com/sanjuan/logo.png',
 *   favicon_url: 'https://cdn.example.com/sanjuan/favicon.ico',
 *   created_at: createTimestamp('2024-01-01T00:00:00Z'),
 *   updated_at: createTimestamp('2024-01-01T00:00:00Z')
 * };
 * ```
 */
export interface ParishTheme extends TenantEntity {
  /** 
   * Primary brand color (hex format).
   * Used for main UI elements, headers, CTAs.
   * @example '#FFD700' (Gold)
   */
  primary_color: string;
  
  /** 
   * Secondary brand color (hex format).
   * Used for backgrounds, borders, secondary text.
   * @example '#000000' (Black)
   */
  secondary_color: string;
  
  /** 
   * Accent color (hex format).
   * Used for highlights, hover states, badges.
   * @example '#FFFFFF' (White)
   */
  accent_color: string;
  
  /** 
   * URL to the parish logo image.
   * Displayed in header/navbar. Stored in Supabase Storage.
   * @example 'https://storage.supabase.co/tenant-assets/sanjuan/logo.png'
   */
  logo_url?: string;
  
  /** 
   * URL to the parish favicon image.
   * Browser tab icon. Stored in Supabase Storage.
   * @example 'https://storage.supabase.co/tenant-assets/sanjuan/favicon.ico'
   */
  favicon_url?: string;
  
  /** 
   * Primary font family name.
   * If not specified, system uses default font stack.
   * @example 'Inter, sans-serif'
   */
  font_family?: string;
  
  /** 
   * Base font size in pixels.
   * Used for responsive typography calculations.
   * @example 16 (default), 18 (larger for accessibility)
   */
  font_size_base?: number;
}

/**
 * Input type for creating a new ParishTheme.
 * Requires tenant_id and three core colors.
 * 
 * @example
 * ```typescript
 * const createData: ParishThemeCreate = {
 *   tenant_id: createTenantId('sanjuan'),
 *   primary_color: '#FFD700',
 *   secondary_color: '#000000',
 *   accent_color: '#FFFFFF'
 * };
 * ```
 */
export type ParishThemeCreate = CreateInput<ParishTheme>;

/**
 * Input type for updating an existing ParishTheme.
 * All fields optional for partial updates.
 * 
 * @example
 * ```typescript
 * const updateData: ParishThemeUpdate = {
 *   logo_url: 'https://storage.supabase.co/tenant-assets/sanjuan/new-logo.png'
 * };
 * ```
 */
export type ParishThemeUpdate = UpdateInput<ParishTheme>;
