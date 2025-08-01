
/**
 * Converts QR code images to base64 to ensure they export properly
 */
export const processQrCodeImages = async (clonedElement: HTMLElement) => {
  const qrImages = clonedElement.querySelectorAll('img[src*="qrserver.com"]');
  
  for (const img of qrImages) {
    const imgElement = img as HTMLImageElement;
    try {
      // Fetch the QR code image and convert to base64
      const response = await fetch(imgElement.src);
      const blob = await response.blob();
      const reader = new FileReader();
      
      await new Promise((resolve) => {
        reader.onload = () => {
          imgElement.src = reader.result as string;
          resolve(null);
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.warn('Could not convert QR code to base64:', error);
    }
  }
};
