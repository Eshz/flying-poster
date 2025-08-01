
/**
 * Utility to check if poster content is likely to be fully visible
 * Based on content density and layout constraints
 */

export interface ContentVisibilityCheck {
  isContentVisible: boolean;
  warnings: string[];
}

export const checkContentVisibility = (
  posterData: any,
  designSettings: any
): ContentVisibilityCheck => {
  const warnings: string[] = [];
  
  // Calculate total text content
  const sections = [
    posterData?.introduction || "",
    posterData?.methods || "",
    posterData?.findings || "",
    posterData?.conclusions || "",
    posterData?.references || ""
  ];
  
  const totalTextLength = sections.reduce((acc, section) => acc + section.length, 0);
  const visibleImages = posterData?.images?.filter(img => img.visible)?.length || 0;
  const keypoints = posterData?.keypoints || [];
  const keyVisibility = posterData?.keyVisibility || [true, true, true, true];
  const visibleKeyPoints = keypoints.filter((_, index) => keyVisibility[index] !== false);
  
  // Enhanced layout-specific checks
  const layout = designSettings?.layout || 'classic';
  
  // Check individual section lengths more strictly
  const sectionLimits = {
    classic: { max: 800, warning: 600 },
    modern: { max: 700, warning: 500 },
    focus: { max: 900, warning: 700 }
  };
  
  const limits = sectionLimits[layout] || sectionLimits.classic;
  
  // Check each section individually
  const sectionNames = ['Introduction', 'Methods', 'Findings', 'Conclusions', 'References'];
  sections.forEach((section, index) => {
    if (section.length > limits.max) {
      warnings.push(`${sectionNames[index]} section is too long and will be cropped (${section.length} chars, max ${limits.max})`);
    } else if (section.length > limits.warning) {
      warnings.push(`${sectionNames[index]} section is quite long and may be difficult to read (${section.length} chars)`);
    }
  });
  
  // Layout-specific content density checks
  if (layout === 'classic') {
    // Classic layout uses 2-3 columns, check for column overflow
    if (totalTextLength > 3500) {
      warnings.push("Total text content is too long for Classic layout - content will be cropped");
    }
    
    // Check for sections that will be cut off in right column
    const conclusionsLength = sections[3].length;
    const referencesLength = sections[4].length;
    if (conclusionsLength + referencesLength > 1200 && visibleKeyPoints.length > 2) {
      warnings.push("Conclusions and References sections combined are too long and will be cropped by Key Takeaways");
    }
  }
  
  if (layout === 'modern') {
    // Modern layout uses 3-4 columns
    if (totalTextLength > 4000) {
      warnings.push("Total text content is too long for Modern layout - content will be cropped");
    }
    
    // Check for right column overflow
    const rightColumnContent = sections[3].length + sections[4].length;
    if (rightColumnContent > 1000 && visibleImages > 1) {
      warnings.push("Right column content (Conclusions + References) is too long and will be cropped by images");
    }
  }
  
  if (layout === 'focus') {
    // Focus layout is more linear but has QR code positioning
    if (totalTextLength > 4500) {
      warnings.push("Total text content is too long for Focus layout - content will be cropped");
    }
  }
  
  // Check for excessive text content
  if (totalTextLength > 4000) {
    warnings.push("Text content is very long and may not fit properly in the poster layout");
  }
  
  // Check for too many images
  if (visibleImages > 4) {
    warnings.push("Too many images may crowd the layout and hide text content");
  }
  
  // Check for combination of high content density
  if (totalTextLength > 2500 && visibleImages > 2) {
    warnings.push("High text content combined with multiple images may cause layout issues");
  }
  
  // Check for too many key points
  if (visibleKeyPoints.length > 6) {
    warnings.push("Too many key takeaways may not fit in the available space");
  }
  
  // Check for very long individual sections
  const longSections = sections.filter(section => section.length > 1000);
  if (longSections.length > 2) {
    warnings.push("Multiple sections have very long content that may overflow");
  }
  
  // Check for specific problematic combinations
  if (visibleKeyPoints.length > 3 && sections[3].length > 500 && sections[4].length > 300) {
    warnings.push("Key Takeaways, Conclusions, and References may overlap - consider reducing content");
  }
  
  return {
    isContentVisible: warnings.length === 0,
    warnings
  };
};
