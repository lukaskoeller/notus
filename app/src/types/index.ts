import { CSSProperties } from 'react';

// Allow CSS CustomProperties
export type CSSStyleObject = CSSProperties & {
  [key in `--${string}`]: string;
} & {
  '--gap'?: string;
};