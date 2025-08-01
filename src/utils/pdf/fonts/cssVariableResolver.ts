
import { getFontFamilyFromKey } from './fontMappings';

/**
 * Aggressively replaces ALL CSS variable font references with actual font families
 */
export const replaceAllCSSVariableFonts = (element: HTMLElement, designSettings?: any) => {
  // Replace inline style CSS variables
  if (element.style.fontFamily && element.style.fontFamily.includes('var(--font-')) {
    const match = element.style.fontFamily.match(/var\(--font-([^)]+)\)/);
    if (match) {
      const fontKey = match[1];
      const fontFamily = getFontFamilyFromKey(fontKey);
      element.style.fontFamily = fontFamily;
      console.log(`Replaced inline CSS variable --font-${fontKey} with ${fontFamily} on element:`, element.tagName, element.className);
    }
  }
  
  // Handle computed styles that might still have CSS variables
  const computedStyle = window.getComputedStyle(element);
  if (computedStyle.fontFamily && computedStyle.fontFamily.includes('var(--font-')) {
    const match = computedStyle.fontFamily.match(/var\(--font-([^)]+)\)/);
    if (match) {
      const fontKey = match[1];
      const fontFamily = getFontFamilyFromKey(fontKey);
      element.style.fontFamily = fontFamily;
      console.log(`Replaced computed CSS variable --font-${fontKey} with ${fontFamily} on element:`, element.tagName, element.className);
    }
  }
  
  // Handle Tailwind font classes by converting them to inline styles
  const classList = Array.from(element.classList);
  const fontClass = classList.find(cls => cls.startsWith('font-'));
  if (fontClass && fontClass !== 'font-bold' && fontClass !== 'font-medium' && fontClass !== 'font-normal') {
    const fontKey = fontClass.replace('font-', '');
    const fontFamily = getFontFamilyFromKey(fontKey);
    element.style.fontFamily = fontFamily;
    console.log(`Applied font from Tailwind class ${fontClass} -> ${fontFamily} on element:`, element.tagName);
  }
  
  // Handle poster-specific classes with design settings
  if (designSettings) {
    if (element.classList.contains('poster-title') || element.tagName === 'H1' || element.tagName === 'H2') {
      const titleFont = getFontFamilyFromKey(designSettings.titleFont || 'merriweather');
      element.style.fontFamily = titleFont;
      element.style.fontWeight = '700';
      console.log(`Applied title font ${titleFont} to ${element.tagName} element with classes:`, element.className);
    }
    
    if (element.classList.contains('poster-body') || element.tagName === 'P' || element.tagName === 'DIV') {
      // Only apply content font to elements that don't already have a specific font
      if (!element.style.fontFamily || element.style.fontFamily.includes('var(--font-')) {
        const contentFont = getFontFamilyFromKey(designSettings.contentFont || 'roboto');
        element.style.fontFamily = contentFont;
        element.style.fontWeight = '400';
        console.log(`Applied content font ${contentFont} to ${element.tagName} element with classes:`, element.className);
      }
    }
  }
};
