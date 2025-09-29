import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type AnyObject = Record<string, unknown>;

/**
 * Combines class names using clsx and tailwind-merge
 * This allows for dynamic class names while properly handling Tailwind CSS conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Type-safe assertion function
 */
export function assertValue<T>(
  value: T | undefined | null,
  message: string,
): asserts value is T {
  if (value === undefined || value === null) {
    throw new Error(message);
  }
}

/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param currency - The currency code (default: 'KES')
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency = "KES"): string {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a date string
 * @param date - Date string or Date object
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
) {
  return new Intl.DateTimeFormat("en-KE", options).format(new Date(date));
}

/**
 * Generate a random string
 * @param length - Length of the string
 * @returns Random string
 */
export function generateId(length = 8): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length)),
  ).join("");
}

/**
 * Delay execution
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after the delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    if (ms < 0) throw new Error("Delay must be non-negative");
    setTimeout(resolve, ms);
  });
}

/**
 * Truncate a string to a maximum length
 * @param str - String to truncate
 * @param length - Maximum length
 * @returns Truncated string
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

/**
 * Check if code is running on the client side
 */
export const isClient = typeof window !== "undefined";

/**
 * Check if code is running on the server side
 */
export const isServer = !isClient;

/**
 * Capitalize the first letter of each word in a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Remove all HTML tags from a string
 * @param str - String containing HTML
 * @returns Clean string without HTML tags
 */
export function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "");
}
