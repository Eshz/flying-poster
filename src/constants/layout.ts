
export const LAYOUT_TYPES = {
  CLASSIC: 'classic',
  MODERN: 'modern',
  FOCUS: 'focus'
} as const;

export const GRID_CONFIGURATIONS = {
  TWO_COLUMN: 'grid-cols-2',
  THREE_COLUMN: 'grid-cols-3',
  FOUR_COLUMN: 'grid-cols-4'
} as const;

export const CONTENT_DENSITY_THRESHOLDS = {
  HIGH: 2000,
  MEDIUM: 1000,
  LOW: 500
} as const;
