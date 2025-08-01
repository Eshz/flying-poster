
/**
 * Prepares images for PDF export, ensuring QR codes and other images are properly handled
 */
export const prepareImagesForPdf = (element: HTMLElement) => {
  const images = element.querySelectorAll('img');
  images.forEach((img) => {
    const imgElement = img as HTMLImageElement;
    
    // Ensure images are displayed and not hidden
    imgElement.style.display = 'block';
    imgElement.style.visibility = 'visible';
    imgElement.style.opacity = '1';
    imgElement.style.position = 'relative';
    imgElement.style.zIndex = '1';
    
    // Remove any transforms or filters that might hide the image
    imgElement.style.transform = 'none';
    imgElement.style.filter = 'none';
    
    // Force load images that might not be loaded yet
    if (!imgElement.complete) {
      imgElement.loading = 'eager';
    }
    
    // For QR codes, convert to data URL to avoid CORS issues
    if (imgElement.src.includes('qrserver.com')) {
      // Create a canvas to convert the QR image to base64
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx && imgElement.complete) {
        canvas.width = imgElement.naturalWidth || 150;
        canvas.height = imgElement.naturalHeight || 150;
        
        try {
          ctx.drawImage(imgElement, 0, 0);
          const dataUrl = canvas.toDataURL('image/png');
          imgElement.src = dataUrl;
        } catch (error) {
          console.log('Could not convert QR image, keeping original:', error);
        }
      }
    }
    
    // Ensure images maintain their aspect ratio
    imgElement.style.objectFit = 'contain';
    imgElement.style.maxWidth = '100%';
    imgElement.style.height = 'auto';
  });
};

/**
 * Removes scrollbars and ensures proper visibility
 */
export const removeScrollbars = (element: HTMLElement) => {
  const allElements = element.querySelectorAll('*');
  allElements.forEach((el) => {
    const htmlElement = el as HTMLElement;
    htmlElement.style.visibility = 'visible';
    htmlElement.style.opacity = '1';
    htmlElement.style.overflow = 'visible';
    htmlElement.style.overflowX = 'visible';
    htmlElement.style.overflowY = 'visible';
    htmlElement.style.scrollBehavior = 'auto';
  });
};
