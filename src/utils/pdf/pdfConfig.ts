
// A0 dimensions at 300 DPI - corrected calculations
// A0 = 841 × 1189 mm = 84.1 × 118.9 cm
// At 300 DPI: (841mm / 25.4) * 300 = 9921 points, (1189mm / 25.4) * 300 = 14043 points
export const A0_WIDTH_POINTS = 2384; // 84.1 cm at 300 DPI in points (841mm)
export const A0_HEIGHT_POINTS = 3370; // 118.9 cm at 300 DPI in points (1189mm)

// Current preview dimensions
export const PREVIEW_WIDTH_PORTRAIT = 800;
export const PREVIEW_HEIGHT_PORTRAIT = 1131;
export const PREVIEW_WIDTH_LANDSCAPE = 1131;
export const PREVIEW_HEIGHT_LANDSCAPE = 800;

/**
 * Creates optimized PDF export configuration for A0 posters at 300 DPI
 * Maintains preview appearance while achieving print quality
 */
export const createPdfConfig = (orientation: 'portrait' | 'landscape' = 'portrait') => {
  const isLandscape = orientation === 'landscape';
  
  // Swap dimensions for landscape
  const pdfWidth = isLandscape ? A0_HEIGHT_POINTS : A0_WIDTH_POINTS;
  const pdfHeight = isLandscape ? A0_WIDTH_POINTS : A0_HEIGHT_POINTS;
  const previewWidth = isLandscape ? PREVIEW_WIDTH_LANDSCAPE : PREVIEW_WIDTH_PORTRAIT;
  const previewHeight = isLandscape ? PREVIEW_HEIGHT_LANDSCAPE : PREVIEW_HEIGHT_PORTRAIT;
  
  // Calculate scale based on orientation
  const scale = pdfWidth / previewWidth;

  return {
    margin: 0,
    filename: `conference-poster-A0-${orientation}-300dpi.pdf`,
    image: { 
      type: 'jpeg', 
      quality: 0.98
    },
    html2canvas: { 
      scale: scale,
      useCORS: true,
      letterRendering: true,
      logging: false,
      width: previewWidth,
      height: previewHeight,
      allowTaint: false,
      imageTimeout: 15000,
      removeContainer: false,
      backgroundColor: '#ffffff',
      foreignObjectRendering: true,
      windowWidth: previewWidth,
      windowHeight: previewHeight,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      dpi: 300,
      ignoreElements: (element: Element) => {
        const el = element as HTMLElement;
        return el.style.overflow === 'scroll' || 
               el.style.overflowX === 'scroll' || 
               el.style.overflowY === 'scroll' ||
               el.classList.contains('scrollbar');
      }
    },
    jsPDF: { 
      unit: 'pt', 
      format: [pdfWidth, pdfHeight], 
      orientation: orientation,
      compress: true,
      precision: 2
    }
  };
};
