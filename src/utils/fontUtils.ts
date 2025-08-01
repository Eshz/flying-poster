import { FONT_FAMILIES } from '@/constants/fonts';

export const getFontClass = (fontType: 'title' | 'content', titleFont: string, contentFont: string): string => {
  const font = fontType === 'title' ? titleFont : contentFont;
  
  switch(font) {
    case 'playfair': return 'font-playfair';
    case 'roboto': return 'font-roboto';
    case 'merriweather': return 'font-merriweather';
    case 'montserrat': return 'font-montserrat';
    case 'opensans': return 'font-opensans';
    case 'lora': return 'font-lora';
    case 'raleway': return 'font-raleway';
    
    case 'crimsontext': return 'font-crimsontext';
    case 'sourceserifpro': return 'font-sourceserifpro';
    case 'ebgaramond': return 'font-ebgaramond';
    case 'inter': return 'font-inter';
    case 'librewilson': return 'font-librewilson';
    case 'nunito': return 'font-nunito';
    case 'cormorantgaramond': return 'font-cormorantgaramond';
    case 'worksans': return 'font-worksans';
    case 'oldstandardtt': return 'font-oldstandardtt';
    case 'karla': return 'font-karla';
    case 'spectral': return 'font-spectral';
    case 'publicsans': return 'font-publicsans';
    case 'vollkorn': return 'font-vollkorn';
    case 'firasans': return 'font-firasans';
    
    default: return 'font-roboto';
  }
};

export const getFontFamily = (fontKey: string): string => {
  return FONT_FAMILIES[fontKey as keyof typeof FONT_FAMILIES] || FONT_FAMILIES.roboto;
};
