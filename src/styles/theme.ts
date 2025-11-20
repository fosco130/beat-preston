// Greenhouse OS Brand Design System

export const colors = {
  // Primary Colors
  darkGreen: '#1E4D42',
  yellow: '#FDB92F',
  pink: '#FFB3BA',
  brightGreen: '#4CAF50',

  // Neutrals
  white: '#FFFFFF',
  offWhite: '#F9F7F4',
  lightGray: '#F5F5F5',
  borderGray: '#E0E0E0',
  textDark: '#1E4D42',
  textGray: '#666666',
  placeholderGray: '#999999',

  // Semantic Colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
} as const;

export const typography = {
  fonts: {
    primary: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    serif: '"Georgia", serif',
  },
  sizes: {
    hero: '60px',
    h1: '48px',
    h2: '36px',
    h3: '28px',
    h4: '24px',
    body: '18px',
    bodySmall: '16px',
    small: '14px',
    tiny: '12px',
    button: '16px',
    score: '56px',
  },
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
} as const;

export const spacing = {
  xs: '8px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
  xxl: '64px',
} as const;

export const borderRadius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  pill: '24px',
  full: '9999px',
} as const;

export const shadows = {
  subtle: '0 2px 8px rgba(0, 0, 0, 0.06)',
  standard: '0 4px 16px rgba(0, 0, 0, 0.08)',
  prominent: '0 8px 24px rgba(0, 0, 0, 0.12)',
  hero: '0 12px 40px rgba(0, 0, 0, 0.15)',
} as const;

export const animations = {
  durations: {
    fast: '200ms',
    normal: '300ms',
    slow: '400ms',
    score: '600ms',
  },
  easings: {
    easeOut: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const;

export const breakpoints = {
  ipadLandscape: '2048px',
  ipadPortrait: '1536px',
  mobile: '768px',
} as const;

export const touchTargets = {
  minimum: '44px',
  comfortable: '48px',
  large: '56px',
} as const;
