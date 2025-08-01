
export interface DesignSettings {
  layout: 'classic' | 'modern' | 'focus' | 'minimalist' | 'data-viz' | 'executive';
  orientation: 'portrait' | 'landscape';
  titleFont: 'playfair' | 'roboto' | 'merriweather' | 'montserrat' | 'opensans' | 'lora' | 'raleway' | 
            'crimsontext' | 'sourceserifpro' | 'ebgaramond' | 'inter' | 'librewilson' | 'nunito' |
            'cormorantgaramond' | 'worksans' | 'oldstandardtt' | 'karla' | 'spectral' | 'publicsans' |
            'vollkorn' | 'firasans';
  contentFont: 'playfair' | 'roboto' | 'merriweather' | 'montserrat' | 'opensans' | 'lora' | 'raleway' | 
               'crimsontext' | 'sourceserifpro' | 'ebgaramond' | 'inter' | 'librewilson' | 'nunito' |
               'cormorantgaramond' | 'worksans' | 'oldstandardtt' | 'karla' | 'spectral' | 'publicsans' |
               'vollkorn' | 'firasans';
  headerBgColor: string;
  headerTextColor: string;
  sectionBgColor: string;
  sectionTitleColor: string;
  sectionTextColor: string;
  keyPointsBgColor: string;
  keyPointsTextColor: string;
}
