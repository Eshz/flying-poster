
import { preloadFonts } from './fonts/fontPreloader';
import { replaceAllCSSVariableFonts } from './fonts/cssVariableResolver';
import { injectResolvedFontCSS } from './fonts/fontInjector';

/**
 * Ensures fonts are properly loaded and applied for PDF export across ALL layouts
 */
export const ensureFontsLoaded = async (clonedElement: HTMLElement, designSettings?: any) => {
  // First preload fonts
  await preloadFonts();
  
  console.log('Starting comprehensive font application for ALL poster layouts...');
  console.log('Design settings:', designSettings);
  
  // Inject comprehensive CSS with resolved font variables
  injectResolvedFontCSS(clonedElement, designSettings);
  
  // Get all elements including the root element
  const allElements = [clonedElement, ...Array.from(clonedElement.querySelectorAll('*'))];
  
  // Replace CSS variables in ALL elements
  allElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    replaceAllCSSVariableFonts(htmlElement, designSettings);
  });
  
  console.log(`Processed ${allElements.length} elements for comprehensive font CSS variable replacement`);
  console.log('Comprehensive font application completed for all layouts');
  
  // Wait longer for font application to take effect
  await new Promise(resolve => setTimeout(resolve, 1500));
};

// Export preloadFonts for backward compatibility
export { preloadFonts };
