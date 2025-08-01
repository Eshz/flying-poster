import { PREVIEW_WIDTH_PORTRAIT, PREVIEW_HEIGHT_PORTRAIT, PREVIEW_WIDTH_LANDSCAPE, PREVIEW_HEIGHT_LANDSCAPE } from './pdfConfig';
import { calculateScaleFactor } from './scaleCalculator';
import { ensureFontsLoaded } from './fontLoader';
import { prepareImagesForPdf, removeScrollbars } from './imageProcessor';

/**
 * Applies minimal scaling to maintain preview appearance in PDF based on orientation
 */
export const scaleElementForPdf = async (clonedElement: HTMLElement, orientation: 'portrait' | 'landscape' = 'portrait', designSettings?: any) => {
  const isLandscape = orientation === 'landscape';
  
  // Use appropriate preview dimensions based on orientation
  const previewWidth = isLandscape ? PREVIEW_WIDTH_LANDSCAPE : PREVIEW_WIDTH_PORTRAIT;
  const previewHeight = isLandscape ? PREVIEW_HEIGHT_LANDSCAPE : PREVIEW_HEIGHT_PORTRAIT;
  
  // Reset any transformations that might be applied from zoom
  clonedElement.style.transform = 'none';
  clonedElement.style.transformOrigin = 'initial';
  
  // Set dimensions to match preview exactly based on orientation
  clonedElement.style.width = `${previewWidth}px`;
  clonedElement.style.height = `${previewHeight}px`;
  clonedElement.style.margin = '0';
  clonedElement.style.padding = '0';
  clonedElement.style.overflow = 'visible';
  clonedElement.style.position = 'relative';
  clonedElement.style.backgroundColor = '#ffffff';
  clonedElement.style.boxSizing = 'border-box';
  
  // Ensure fonts are properly loaded and applied with design settings
  await ensureFontsLoaded(clonedElement, designSettings);
  
  // Ensure QR images and other images are properly handled
  prepareImagesForPdf(clonedElement);
  
  // Only apply minimal cleanup without aggressive scaling
  removeScrollbars(clonedElement);
  
  return 1; // Return scale factor of 1 to maintain original sizing
};

// Re-export the calculateScaleFactor for backward compatibility
export { calculateScaleFactor };
