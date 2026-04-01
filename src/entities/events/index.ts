/**
 * Events domain entity exports.
 * 
 * Barrel export for all event-related entities and types.
 * This includes both one-time Events and recurring ParishLifeActivities.
 * 
 * **Domain Distinction**:
 * - Event: One-time or special occasions (Patronal Feasts, Retreats)
 * - ParishLifeActivity: Recurring religious activities (Rosary, Adoration)
 * 
 * @module entities/events
 */

// Event entity and related types
export type {
  Event,
  EventCreate,
  EventUpdate,
  EventType,
  EventStatus,
  RecurrencePattern
} from './model/event.types';

// Parish Life Activity entity and related types
export type {
  ParishLifeActivity,
  ParishLifeActivityCreate,
  ParishLifeActivityUpdate,
  DayOfWeek,
  ActivityType
} from './model/parish-life-activity.types';
