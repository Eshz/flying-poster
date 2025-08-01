
/**
 * Validates URLs for security purposes
 */
export const isValidUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    const parsedUrl = new URL(url);
    
    // Only allow HTTP and HTTPS protocols
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return false;
    }

    // Prevent localhost and private IP ranges in production
    const hostname = parsedUrl.hostname.toLowerCase();
    if (hostname === 'localhost' || 
        hostname === '127.0.0.1' ||
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.') ||
        hostname.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./)) {
      console.warn('Private/local URLs are not recommended for QR codes');
    }

    return true;
  } catch {
    return false;
  }
};

/**
 * Sanitizes URL for safe usage
 */
export const sanitizeUrl = (url: string): string => {
  if (!isValidUrl(url)) {
    return '';
  }

  try {
    const parsedUrl = new URL(url);
    // Return the cleaned URL
    return parsedUrl.toString();
  } catch {
    return '';
  }
};

/**
 * Validates QR code data content
 */
export const validateQrCodeData = (data: string): boolean => {
  if (!data || typeof data !== 'string') {
    return false;
  }

  // Check if it's a URL
  if (data.startsWith('http://') || data.startsWith('https://')) {
    return isValidUrl(data);
  }

  // For non-URL data, basic validation
  if (data.length > 2000) {
    return false; // QR codes have practical limits
  }

  // Check for potentially malicious content
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /data:text\/html/i,
    /vbscript:/i
  ];

  return !suspiciousPatterns.some(pattern => pattern.test(data));
};
