
/**
 * Calculate the relative luminance of a color
 * Based on WCAG 2.0 formula
 * @param hexColor - Hex color code (e.g., #FFFFFF)
 */
export const getLuminance = (hexColor: string): number => {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  // Calculate luminance
  const R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

/**
 * Calculate contrast ratio between two colors
 * Based on WCAG 2.0 formula
 * @param color1 - First hex color
 * @param color2 - Second hex color
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  
  const lightest = Math.max(luminance1, luminance2);
  const darkest = Math.min(luminance1, luminance2);
  
  return (lightest + 0.05) / (darkest + 0.05);
};

/**
 * Check if the contrast between two colors meets WCAG accessibility standards
 * @param color1 - First hex color
 * @param color2 - Second hex color
 * @param level - 'AA' or 'AAA' standard level
 * @param isLargeText - Whether the text size is large (14pt bold/18pt regular or larger)
 */
export const isAccessible = (
  color1: string, 
  color2: string, 
  level: 'AA' | 'AAA' = 'AA', 
  isLargeText: boolean = false
): boolean => {
  const ratio = getContrastRatio(color1, color2);
  
  if (level === 'AA') {
    return isLargeText ? ratio >= 3 : ratio >= 4.5;
  } else {
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  }
};

/**
 * Convert RGB to Hex color
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

/**
 * Convert Hex to RGB color
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  // Remove # if present
  const cleanHex = hex.replace('#', '');
  
  // Parse hex value
  const bigint = parseInt(cleanHex, 16);
  
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
};

/**
 * Predefined accessible color combinations - Updated with pastel hues
 */
export const accessibleColorPairs = [
  // Classic high contrast options
  { bg: '#FFFFFF', fg: '#000000', name: 'Black on White' },
  { bg: '#000000', fg: '#FFFFFF', name: 'White on Black' },
  
  // Pastel Blue Theme (inspired by the reference image)
  { bg: '#E6F3FF', fg: '#2D5AA0', name: 'Soft Blue Theme' },
  { bg: '#2D5AA0', fg: '#E6F3FF', name: 'Deep Blue / Light Blue' },
  
  // Pastel Purple Theme
  { bg: '#F0E6FF', fg: '#5B2C87', name: 'Soft Purple Theme' },
  { bg: '#5B2C87', fg: '#F0E6FF', name: 'Deep Purple / Light Purple' },
  
  // Pastel Lavender Theme (matching the header in the image)
  { bg: '#E8E4F3', fg: '#3F2E5B', name: 'Lavender Theme' },
  { bg: '#3F2E5B', fg: '#E8E4F3', name: 'Deep Lavender / Light Lavender' },
  
  // Mixed Purple-Blue Theme (using colors from the uploaded image)
  { bg: '#BBCDE8', fg: '#202B5B', name: 'Purple-Blue Mix' },
  { bg: '#B0C6F3', fg: '#3E3C72', name: 'Soft Purple-Blue' },
  
  // Pastel Mint Theme
  { bg: '#E6F7F1', fg: '#1B5E3F', name: 'Soft Mint Theme' },
  { bg: '#1B5E3F', fg: '#E6F7F1', name: 'Deep Green / Light Mint' },
  
  // Pastel Rose Theme
  { bg: '#FFF0F5', fg: '#8B2252', name: 'Soft Rose Theme' },
  { bg: '#8B2252', fg: '#FFF0F5', name: 'Deep Rose / Light Pink' },
  
  // Pastel Peach Theme
  { bg: '#FFF5E6', fg: '#B5620E', name: 'Soft Peach Theme' },
  { bg: '#B5620E', fg: '#FFF5E6', name: 'Deep Orange / Light Peach' },
  
  // Academic Blues (similar to the poster in the image)
  { bg: '#F8FAFF', fg: '#1E3A8A', name: 'Academic Blue' },
  { bg: '#1E3A8A', fg: '#F8FAFF', name: 'Classic Academic' },
];

/**
 * Get font display name from CSS font family
 */
export const getFontDisplayName = (fontFamily: string): string => {
  const fontMap: Record<string, string> = {
    'playfair': 'Playfair Display',
    'roboto': 'Roboto',
    'merriweather': 'Merriweather',
    'montserrat': 'Montserrat',
    'opensans': 'Open Sans',
    'lora': 'Lora',
    'raleway': 'Raleway',
  };
  
  return fontMap[fontFamily] || fontFamily;
};

/**
 * Available fonts for the poster
 */
export const availableFonts = [
  { value: 'playfair', label: 'Playfair Display' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'merriweather', label: 'Merriweather' },
  { value: 'montserrat', label: 'Montserrat' },
  { value: 'opensans', label: 'Open Sans' },
  { value: 'lora', label: 'Lora' },
  { value: 'raleway', label: 'Raleway' },
];
