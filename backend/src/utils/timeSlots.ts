// =============================================
// Barbearia Vikings — Time Slots Utility
// =============================================

import { SLOT_DURATION_MINUTES, SLOT_BUFFER_MINUTES } from '@vikinges/shared';

/**
 * Generates time slots between startTime and endTime with the given duration.
 * @param startTime "09:00"
 * @param endTime "18:00"
 * @param durationMinutes defaults to SLOT_DURATION_MINUTES (35)
 * @returns ["09:00", "09:35", "10:10", ...]
 */
export function generateTimeSlots(
  startTime: string,
  endTime: string,
  durationMinutes: number = SLOT_DURATION_MINUTES,
): string[] {
  const slots: string[] = [];
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);

  let currentMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;
  const step = durationMinutes + SLOT_BUFFER_MINUTES;

  while (currentMinutes + durationMinutes <= endMinutes) {
    const h = Math.floor(currentMinutes / 60);
    const m = currentMinutes % 60;
    slots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
    currentMinutes += step;
  }

  return slots;
}

/**
 * Checks if two time ranges overlap.
 */
export function hasTimeConflict(
  startA: Date,
  endA: Date,
  startB: Date,
  endB: Date,
): boolean {
  return startA < endB && startB < endA;
}

/**
 * Converts a time string "HH:mm" on a given date to a Date object (UTC-3 / São Paulo).
 */
export function timeStringToDate(date: Date, timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

/**
 * Adds minutes to a Date.
 */
export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

/**
 * Gets the start of day for a given date.
 */
export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Gets the end of day for a given date.
 */
export function endOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}
