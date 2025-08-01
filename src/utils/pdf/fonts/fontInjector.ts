
import { getFontFamilyFromKey } from './fontMappings';

/**
 * Injects comprehensive CSS with all font families resolved
 */
export const injectResolvedFontCSS = (clonedElement: HTMLElement, designSettings?: any) => {
  const style = document.createElement('style');
  const titleFont = getFontFamilyFromKey(designSettings?.titleFont || 'merriweather');
  const contentFont = getFontFamilyFromKey(designSettings?.contentFont || 'roboto');
  
  style.textContent = `
    /* Resolve all CSS font variables */
    :root {
      --font-playfair: 'Playfair Display', serif !important;
      --font-roboto: 'Roboto', sans-serif !important;
      --font-merriweather: 'Merriweather', serif !important;
      --font-montserrat: 'Montserrat', sans-serif !important;
      --font-opensans: 'Open Sans', sans-serif !important;
      --font-lora: 'Lora', serif !important;
      --font-raleway: 'Raleway', sans-serif !important;
      --font-crimsontext: 'Crimson Text', serif !important;
      --font-sourceserifpro: 'Source Serif Pro', serif !important;
      --font-ebgaramond: 'EB Garamond', serif !important;
      --font-inter: 'Inter', sans-serif !important;
      --font-librewilson: 'Libre Baskerville', serif !important;
      --font-nunito: 'Nunito', sans-serif !important;
      --font-cormorantgaramond: 'Cormorant Garamond', serif !important;
      --font-worksans: 'Work Sans', sans-serif !important;
      --font-oldstandardtt: 'Old Standard TT', serif !important;
      --font-karla: 'Karla', sans-serif !important;
      --font-spectral: 'Spectral', serif !important;
      --font-publicsans: 'Public Sans', sans-serif !important;
      --font-vollkorn: 'Vollkorn', serif !important;
      --font-firasans: 'Fira Sans', sans-serif !important;
    }
    
    /* Apply fonts to all common elements */
    .poster-title, h1, h2, h3 {
      font-family: ${titleFont} !important;
      font-weight: 700 !important;
    }
    
    .poster-body, p, div:not(.poster-title):not(h1):not(h2):not(h3) {
      font-family: ${contentFont} !important;
    }
    
    /* Tailwind font classes - force override */
    .font-playfair { font-family: 'Playfair Display', serif !important; }
    .font-roboto { font-family: 'Roboto', sans-serif !important; }
    .font-merriweather { font-family: 'Merriweather', serif !important; }
    .font-montserrat { font-family: 'Montserrat', sans-serif !important; }
    .font-opensans { font-family: 'Open Sans', sans-serif !important; }
    .font-lora { font-family: 'Lora', serif !important; }
    .font-raleway { font-family: 'Raleway', sans-serif !important; }
    .font-crimsontext { font-family: 'Crimson Text', serif !important; }
    .font-sourceserifpro { font-family: 'Source Serif Pro', serif !important; }
    .font-ebgaramond { font-family: 'EB Garamond', serif !important; }
    .font-inter { font-family: 'Inter', sans-serif !important; }
    .font-librewilson { font-family: 'Libre Baskerville', serif !important; }
    .font-nunito { font-family: 'Nunito', sans-serif !important; }
    .font-cormorantgaramond { font-family: 'Cormorant Garamond', serif !important; }
    .font-worksans { font-family: 'Work Sans', sans-serif !important; }
    .font-oldstandardtt { font-family: 'Old Standard TT', serif !important; }
    .font-karla { font-family: 'Karla', sans-serif !important; }
    .font-spectral { font-family: 'Spectral', serif !important; }
    .font-publicsans { font-family: 'Public Sans', sans-serif !important; }
    .font-vollkorn { font-family: 'Vollkorn', serif !important; }
    .font-firasans { font-family: 'Fira Sans', sans-serif !important; }
  `;
  
  // Insert at the beginning of the cloned element
  clonedElement.insertBefore(style, clonedElement.firstChild);
  console.log('Injected comprehensive resolved font CSS into cloned element with settings:', designSettings);
};
