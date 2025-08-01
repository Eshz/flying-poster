/**
 * Creates a temporary container for the cloned element with proper isolation
 */
export const createTempContainer = (clonedElement: HTMLElement) => {
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'fixed';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '-9999px';
  tempDiv.style.zIndex = '-1000';
  tempDiv.style.width = '800px';
  tempDiv.style.height = '1131px';
  tempDiv.style.overflow = 'hidden';
  tempDiv.style.backgroundColor = '#ffffff';
  tempDiv.style.margin = '0';
  tempDiv.style.padding = '0';
  tempDiv.style.visibility = 'hidden'; // Make completely invisible
  document.body.appendChild(tempDiv);
  tempDiv.appendChild(clonedElement);
  return tempDiv;
};

/**
 * Cleans up the temporary container
 */
export const cleanupTempContainer = (tempDiv: HTMLElement) => {
  if (tempDiv && tempDiv.parentNode) {
    document.body.removeChild(tempDiv);
  }
};

/**
 * Gets the original poster element from the preview (without zoom scaling)
 */
export const getOriginalPosterElement = () => {
  // Get the poster content element that hasn't been scaled by zoom
  const posterPreview = document.getElementById('poster-preview');
  if (posterPreview) {
    const posterContent = posterPreview.querySelector('#poster-content');
    return posterContent as HTMLElement;
  }
  return document.getElementById('poster-content');
};

/**
 * Extracts design settings from the poster preview component and React context
 */
export const extractDesignSettings = () => {
  let designSettings = null;
  
  // Try to get design settings from the poster preview element
  const posterPreview = document.getElementById('poster-preview');
  if (posterPreview) {
    // Try to extract design settings from data attributes
    const posterLayoutRenderer = posterPreview.querySelector('[data-design-settings]');
    if (posterLayoutRenderer) {
      try {
        designSettings = JSON.parse(posterLayoutRenderer.getAttribute('data-design-settings') || '{}');
        console.log('Found design settings from data attribute:', designSettings);
      } catch (e) {
        console.warn('Could not parse design settings from data attribute');
      }
    }
  }
  
  // If no design settings found, try to extract from the DOM structure
  if (!designSettings) {
    // Look for elements that might indicate the font settings
    const titleElements = document.querySelectorAll('.poster-title, h1, h2');
    const bodyElements = document.querySelectorAll('.poster-body, p');
    
    // Try to determine fonts from computed styles
    if (titleElements.length > 0) {
      const titleStyle = window.getComputedStyle(titleElements[0]);
      const bodyStyle = bodyElements.length > 0 ? window.getComputedStyle(bodyElements[0]) : null;
      
      designSettings = {
        titleFont: extractFontKeyFromStyle(titleStyle.fontFamily) || 'merriweather',
        contentFont: bodyStyle ? extractFontKeyFromStyle(bodyStyle.fontFamily) || 'roboto' : 'roboto',
        orientation: 'portrait' // default
      };
      
      console.log('Extracted design settings from DOM styles:', designSettings);
    }
  }
  
  // Fallback to default settings
  if (!designSettings) {
    designSettings = {
      titleFont: 'merriweather',
      contentFont: 'roboto',
      orientation: 'portrait'
    };
    console.log('Using fallback design settings:', designSettings);
  }
  
  return designSettings;
};

/**
 * Helper function to extract font key from computed font family
 */
const extractFontKeyFromStyle = (fontFamily: string): string | null => {
  if (!fontFamily) return null;
  
  const fontMap: { [key: string]: string } = {
    'Merriweather': 'merriweather',
    'Roboto': 'roboto',
    'Playfair Display': 'playfair',
    'Montserrat': 'montserrat',
    'Open Sans': 'opensans',
    'Lora': 'lora',
    'Raleway': 'raleway',
    'Inter': 'inter',
    'Nunito': 'nunito'
  };
  
  for (const [familyName, key] of Object.entries(fontMap)) {
    if (fontFamily.includes(familyName)) {
      return key;
    }
  }
  
  return null;
};
