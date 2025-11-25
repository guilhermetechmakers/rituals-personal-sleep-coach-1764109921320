import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  // Simple class name merger for NativeWind
  return inputs.filter(Boolean).join(' ');
}
