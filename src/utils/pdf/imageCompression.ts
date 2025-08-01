
/**
 * Compresses images in the DOM element for better PDF optimization
 * Handles CORS issues by skipping compression for tainted canvases
 */
export const compressImages = (element: HTMLElement) => {
  const images = element.querySelectorAll('img');
  images.forEach((img) => {
    const imgElement = img as HTMLImageElement;
    
    // Skip if image is not loaded
    if (!imgElement.complete) {
      return;
    }
    
    try {
      // Create a canvas to compress the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Set canvas dimensions
        canvas.width = imgElement.naturalWidth || imgElement.width;
        canvas.height = imgElement.naturalHeight || imgElement.height;
        
        // Draw the image
        ctx.drawImage(imgElement, 0, 0);
        
        // Try to convert to compressed data URL
        // This will throw an error if the canvas is tainted (CORS issue)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        imgElement.src = compressedDataUrl;
      }
    } catch (error) {
      // If we get a SecurityError (tainted canvas), skip compression
      // The original image will be used as-is
      console.log('Skipping image compression due to CORS restriction:', error);
    }
  });
};
