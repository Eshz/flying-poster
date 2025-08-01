
/**
 * Dynamic text sizing utility for poster layouts
 * Based on content density and available space
 */

export interface TextSizeConfig {
  mainTitle: string;
  sectionHeading: string;
  bodyText: string;
  caption: string;
}

export const calculateDynamicTextSizes = (
  contentDensity: 'low' | 'medium' | 'high',
  hasImages: boolean,
  totalSections: number
): TextSizeConfig => {
  // Base sizes following the guidelines (converted to Tailwind classes)
  const baseSizes = {
    low: {
      mainTitle: 'text-6xl', // ~72pt
      sectionHeading: 'text-3xl', // ~36pt
      bodyText: 'text-lg', // ~24pt
      caption: 'text-base' // ~18pt
    },
    medium: {
      mainTitle: 'text-5xl', // ~60pt
      sectionHeading: 'text-2xl', // ~30pt
      bodyText: 'text-base', // ~18pt
      caption: 'text-sm' // ~16pt
    },
    high: {
      mainTitle: 'text-4xl', // ~48pt
      sectionHeading: 'text-xl', // ~24pt
      bodyText: 'text-sm', // ~16pt
      caption: 'text-xs' // ~14pt
    }
  };

  let adjustedDensity = contentDensity;
  
  // Adjust density based on images and sections
  if (hasImages && totalSections > 4) {
    adjustedDensity = 'high';
  } else if (hasImages || totalSections > 3) {
    adjustedDensity = 'medium';
  }

  return baseSizes[adjustedDensity];
};

export const getContentDensity = (
  sections: string[],
  images: any[],
  keypoints: string[]
): 'low' | 'medium' | 'high' => {
  const totalTextLength = sections.reduce((acc, section) => acc + section.length, 0);
  const visibleImages = images?.filter(img => img.visible)?.length || 0;
  const totalKeypoints = keypoints?.length || 0;

  // Calculate content score
  const contentScore = 
    (totalTextLength / 1000) + // Text density
    (visibleImages * 2) + // Images take more space
    (totalKeypoints * 0.5); // Keypoints add complexity

  if (contentScore > 8) return 'high';
  if (contentScore > 4) return 'medium';
  return 'low';
};
