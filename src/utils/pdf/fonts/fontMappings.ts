
/**
 * Font key to font family mappings for PDF export
 */
export const getFontFamilyFromKey = (fontKey: string): string => {
  const fontMap: { [key: string]: string } = {
    'playfair': 'Playfair Display, serif',
    'roboto': 'Roboto, sans-serif',
    'merriweather': 'Merriweather, serif',
    'montserrat': 'Montserrat, sans-serif',
    'opensans': 'Open Sans, sans-serif',
    'lora': 'Lora, serif',
    'raleway': 'Raleway, sans-serif',
    'crimsontext': 'Crimson Text, serif',
    'sourceserifpro': 'Source Serif Pro, serif',
    'ebgaramond': 'EB Garamond, serif',
    'inter': 'Inter, sans-serif',
    'librewilson': 'Libre Baskerville, serif',
    'nunito': 'Nunito, sans-serif',
    'cormorantgaramond': 'Cormorant Garamond, serif',
    'worksans': 'Work Sans, sans-serif',
    'oldstandardtt': 'Old Standard TT, serif',
    'karla': 'Karla, sans-serif',
    'spectral': 'Spectral, serif',
    'publicsans': 'Public Sans, sans-serif',
    'vollkorn': 'Vollkorn, serif',
    'firasans': 'Fira Sans, sans-serif'
  };
  
  return fontMap[fontKey] || 'Roboto, sans-serif';
};
