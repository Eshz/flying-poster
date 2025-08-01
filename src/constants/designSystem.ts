
export const DESIGN_TOKENS = {
  colors: {
    primary: {
      50: '#f5f7ff',
      100: '#e6ebff',
      400: '#4052b6',
      500: '#4052b6',
      600: '#3344a0',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      900: '#111827',
    },
    blue: {
      50: '#eff6ff',
      400: '#60a5fa',
      600: '#2563eb',
    },
    red: {
      500: '#ef4444',
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  }
} as const;

export const COMPONENT_VARIANTS = {
  input: {
    default: 'border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md',
    underline: 'border-0 border-b border-gray-300 focus:border-blue-400 focus:ring-0 rounded-none bg-transparent px-0',
  },
  button: {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
  }
} as const;
