
import { getPosterDimensions } from '../posterConstants';

/**
 * Ensures proper styling for PDF export and removes scrollbars based on orientation
 */
export const preparePosterForExport = (clonedElement: HTMLElement, orientation: 'portrait' | 'landscape' = 'portrait') => {
  const dimensions = getPosterDimensions(orientation);
  
  // Set exact dimensions to match preview based on orientation
  clonedElement.style.width = `${dimensions.width}px`;
  clonedElement.style.height = `${dimensions.height}px`;
  clonedElement.style.position = 'relative';
  clonedElement.style.overflow = 'hidden';
  clonedElement.style.display = 'flex';
  clonedElement.style.flexDirection = 'column';
  clonedElement.style.margin = '0';
  clonedElement.style.padding = '0';
  clonedElement.style.boxSizing = 'border-box';
  clonedElement.style.backgroundColor = '#ffffff';
  
  // Remove any transforms that might be applied from zoom
  clonedElement.style.transform = 'none';
  clonedElement.style.transformOrigin = 'initial';
  
  // Force visibility and remove scrollbars on all child elements
  const allElements = clonedElement.querySelectorAll('*');
  allElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    htmlElement.style.visibility = 'visible';
    htmlElement.style.opacity = '1';
    htmlElement.style.overflow = 'hidden';
    
    // Remove any scroll-related styles
    htmlElement.style.overflowX = 'hidden';
    htmlElement.style.overflowY = 'hidden';
    htmlElement.style.scrollBehavior = 'auto';
  });
  
  // Ensure the main container has proper flex layout
  const mainContainer = clonedElement.querySelector('.p-4.h-full.flex.flex-col') || 
                        clonedElement.querySelector('.p-2') ||
                        clonedElement.querySelector('[class*="p-"]');
  if (mainContainer) {
    const container = mainContainer as HTMLElement;
    container.style.height = '100%';
    container.style.overflow = 'hidden';
  }
};
