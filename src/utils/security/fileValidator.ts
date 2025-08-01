
/**
 * Security utilities for file uploads
 */

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/gif',
  'image/webp'
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Validates file type and size for security
 */
export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File size exceeds 5MB limit. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`
    };
  }

  // Check MIME type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid file type: ${file.type}. Only JPEG, PNG, GIF, and WebP images are allowed.`
    };
  }

  // Check file extension matches MIME type
  const extension = file.name.toLowerCase().split('.').pop();
  const mimeTypeExtensionMap: Record<string, string[]> = {
    'image/jpeg': ['jpg', 'jpeg'],
    'image/png': ['png'],
    'image/gif': ['gif'],
    'image/webp': ['webp']
  };

  const expectedExtensions = mimeTypeExtensionMap[file.type];
  if (!expectedExtensions || !extension || !expectedExtensions.includes(extension)) {
    return {
      isValid: false,
      error: 'File extension does not match file type'
    };
  }

  return { isValid: true };
};

/**
 * Validates multiple files
 */
export const validateFiles = (files: FileList | File[]): { validFiles: File[]; errors: string[] } => {
  const validFiles: File[] = [];
  const errors: string[] = [];

  const fileArray = Array.from(files);
  
  for (const file of fileArray) {
    const validation = validateFile(file);
    if (validation.isValid) {
      validFiles.push(file);
    } else {
      errors.push(`${file.name}: ${validation.error}`);
    }
  }

  return { validFiles, errors };
};

/**
 * Creates a safe file reader with error handling
 */
export const safeFileReader = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const validation = validateFile(file);
    if (!validation.isValid) {
      reject(new Error(validation.error));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result && typeof event.target.result === 'string') {
        resolve(event.target.result);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('File reading failed'));
    };
    
    // Set timeout to prevent hanging
    setTimeout(() => {
      reader.abort();
      reject(new Error('File reading timeout'));
    }, 30000); // 30 second timeout
    
    reader.readAsDataURL(file);
  });
};
