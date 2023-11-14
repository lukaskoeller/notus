import { CSSProperties } from 'react';

// Allow CSS CustomProperties
export type CSSStyleObject = CSSProperties & {
  [key in `--${string}`]: string;
} & {
  '--gap'?: string;
};

/**
 * Get a union of all values from an object.
 */
export type ObjectValues<T extends Record<string, unknown>> = T[keyof T];
