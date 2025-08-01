/**
 * Converts a file to base64 data URL
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Converts uploaded images to base64 for export
 */
export const convertImagesToBase64 = async (images: any[]): Promise<any[]> => {
  return Promise.all(
    images.map(async (image) => {
      // If the image URL is already a data URL (base64), keep it as is
      if (image.url.startsWith('data:')) {
        return image;
      }
      
      // If it's a blob URL or external URL, try to convert it
      try {
        const response = await fetch(image.url);
        const blob = await response.blob();
        const file = new File([blob], 'image', { type: blob.type });
        const base64 = await fileToBase64(file);
        
        return {
          ...image,
          url: base64
        };
      } catch (error) {
        console.warn('Could not convert image to base64:', error);
        return image; // Return original if conversion fails
      }
    })
  );
};

/**
 * Validates that imported images are in the correct format
 */
export const validateImportedImages = (images: any[]): any[] => {
  if (!Array.isArray(images)) return [];
  
  return images.filter(image => 
    image && 
    typeof image.url === 'string' && 
    typeof image.visible === 'boolean' && 
    typeof image.caption === 'string'
  );
};
