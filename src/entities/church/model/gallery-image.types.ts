/**
 * Gallery image entity type definitions.
 * 
 * Defines images for hero sliders and photo galleries in the parish website.
 * Supports multiple display contexts and ordering.
 * 
 * @module entities/church/model/gallery-image
 */

import type { TenantEntity, CreateInput, UpdateInput } from '@/shared/types';

/**
 * Display context for gallery images.
 * Determines where the image appears on the website.
 */
export type ImageDisplayContext = 
  | 'hero_slider'   // Main hero carousel on homepage
  | 'gallery'       // Photo gallery section
  | 'both';         // Both hero slider and gallery

/**
 * Gallery image entity (Tenant-specific).
 * 
 * Represents an image used in the parish website's visual content.
 * Images are stored in Supabase Storage and can appear in multiple contexts.
 * 
 * @interface GalleryImage
 * @extends TenantEntity
 * 
 * @example
 * ```typescript
 * const image: GalleryImage = {
 *   id: createUUID('123e4567-e89b-12d3-a456-426614174003'),
 *   tenant_id: createTenantId('sanjuan'),
 *   image_url: 'https://storage.supabase.co/tenant-assets/sanjuan/gallery/church-exterior.jpg',
 *   title: 'Parroquia San Juan María Vianney',
 *   subtitle: 'Our beautiful church building',
 *   alt_text: 'Exterior view of San Juan María Vianney parish church in Neiva',
 *   display_context: 'both',
 *   is_active: true,
 *   sort_order: 1,
 *   created_at: createTimestamp('2024-01-01T00:00:00Z'),
 *   updated_at: createTimestamp('2024-01-01T00:00:00Z')
 * };
 * ```
 */
export interface GalleryImage extends TenantEntity {
  /** 
   * URL to the image file.
   * Stored in Supabase Storage under tenant-specific bucket.
   * @example 'https://storage.supabase.co/tenant-assets/sanjuan/gallery/image.jpg'
   */
  image_url: string;
  
  /** 
   * Main title/heading for the image.
   * Displayed as overlay text in hero slider or caption in gallery.
   * @example 'Bienvenidos a Nuestra Parroquia'
   */
  title?: string;
  
  /** 
   * Subtitle or supporting text for the image.
   * Additional context displayed below the title.
   * @example 'Celebrando 50 años de servicio'
   */
  subtitle?: string;
  
  /** 
   * Alt text for accessibility (screen readers, SEO).
   * Describes the image content for users who cannot see it.
   * @example 'Parish priest greeting parishioners after Sunday Mass'
   */
  alt_text: string;
  
  /** 
   * Where this image should be displayed.
   * Controls which sections of the website show this image.
   */
  display_context: ImageDisplayContext;
  
  /** 
   * Whether this image is currently active.
   * Allows temporary hiding without deletion (e.g., seasonal images).
   */
  is_active: boolean;
  
  /** 
   * Display order for sorting images in sliders/galleries.
   * Lower numbers appear first (e.g., 1, 2, 3...).
   */
  sort_order: number;
  
  /** 
   * Optional caption for gallery display.
   * More detailed description than title/subtitle.
   * @example 'This photo was taken during our annual patronal feast celebration in 2023.'
   */
  caption?: string;
  
  /** 
   * Photographer or image source credit.
   * @example 'Photo by María González'
   */
  credit?: string;
}

/**
 * Input type for creating a new GalleryImage.
 * Requires tenant_id, image_url, alt_text, display_context.
 * 
 * @example
 * ```typescript
 * const createData: GalleryImageCreate = {
 *   tenant_id: createTenantId('sanjuan'),
 *   image_url: 'https://storage.supabase.co/tenant-assets/sanjuan/gallery/new-photo.jpg',
 *   alt_text: 'Parish community gathering for Christmas celebration',
 *   display_context: 'gallery',
 *   is_active: true,
 *   sort_order: 10
 * };
 * ```
 */
export type GalleryImageCreate = CreateInput<GalleryImage>;

/**
 * Input type for updating an existing GalleryImage.
 * All fields optional for partial updates.
 * 
 * @example
 * ```typescript
 * const updateData: GalleryImageUpdate = {
 *   title: 'Updated Title',
 *   is_active: false
 * };
 * ```
 */
export type GalleryImageUpdate = UpdateInput<GalleryImage>;
