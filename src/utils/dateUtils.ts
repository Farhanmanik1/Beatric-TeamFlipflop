/**
 * Utility functions for date handling in the Smart Workout app
 */

/**
 * Converts a Date object to ISO string format for Redux storage
 * @param date - Date object to convert
 * @returns ISO string representation of the date
 */
export const toISOString = (date: Date): string => {
  return date.toISOString();
};

/**
 * Converts an ISO string back to a Date object
 * @param isoString - ISO string to convert
 * @returns Date object
 */
export const fromISOString = (isoString: string): Date => {
  return new Date(isoString);
};

/**
 * Gets the current date as an ISO string
 * @returns Current date as ISO string
 */
export const getCurrentDateISO = (): string => {
  return new Date().toISOString();
};

/**
 * Formats a date for display purposes
 * @param date - Date object or ISO string
 * @returns Formatted date string
 */
export const formatDateForDisplay = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString();
};

/**
 * Formats a date and time for display purposes
 * @param date - Date object or ISO string
 * @returns Formatted date and time string
 */
export const formatDateTimeForDisplay = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString();
};
