import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  // Use clsx to merge class names properly
  return clsx(...inputs);
}
