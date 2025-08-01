
// A0 dimensions in pixels at 96 DPI (standard screen DPI)
// A0 = 841 × 1189 mm = 33.1 × 46.8 inches = 3179 × 4494 pixels at 96 DPI
export const A0_WIDTH_PX = 3179;
export const A0_HEIGHT_PX = 4494;

// Portrait dimensions (default)
export const POSTER_UI_WIDTH_PORTRAIT = 800;
export const POSTER_UI_HEIGHT_PORTRAIT = 1131;

// Landscape dimensions (swapped)
export const POSTER_UI_WIDTH_LANDSCAPE = 1131;
export const POSTER_UI_HEIGHT_LANDSCAPE = 800;

// Helper function to get dimensions based on orientation
export const getPosterDimensions = (orientation: 'portrait' | 'landscape') => {
  if (orientation === 'landscape') {
    return {
      width: POSTER_UI_WIDTH_LANDSCAPE,
      height: POSTER_UI_HEIGHT_LANDSCAPE,
      a0Width: A0_HEIGHT_PX,
      a0Height: A0_WIDTH_PX
    };
  }
  return {
    width: POSTER_UI_WIDTH_PORTRAIT,
    height: POSTER_UI_HEIGHT_PORTRAIT,
    a0Width: A0_WIDTH_PX,
    a0Height: A0_HEIGHT_PX
  };
};

// Legacy exports for backward compatibility
export const POSTER_UI_WIDTH = POSTER_UI_WIDTH_PORTRAIT;
export const POSTER_UI_HEIGHT = POSTER_UI_HEIGHT_PORTRAIT;
