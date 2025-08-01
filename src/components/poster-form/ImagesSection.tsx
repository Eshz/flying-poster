
import React, { useState } from 'react';
import { ImageItem } from './ImageItem';
import { UploadArea } from '@/components/ui/upload-area';
import { validateFiles, safeFileReader } from '@/utils/security/fileValidator';
import { toast } from 'sonner';

interface ImagesSectionProps {
  images: { url: string; visible: boolean; caption: string; upperCaption?: string }[];
  onImagesChange: (images: { url: string; visible: boolean; caption: string; upperCaption?: string }[]) => void;
}

const ImagesSection: React.FC<ImagesSectionProps> = ({ 
  images,
  onImagesChange 
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      const { validFiles, errors } = validateFiles(e.target.files);
      
      // Show errors for invalid files
      if (errors.length > 0) {
        errors.forEach(error => toast.error(error));
      }
      
      if (validFiles.length === 0) {
        return;
      }
      
      // Process valid files
      const newImages = [...images];
      const filePromises = validFiles.map(file => safeFileReader(file));
      
      try {
        const results = await Promise.allSettled(filePromises);
        
        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            newImages.push({
              url: result.value,
              visible: true,
              caption: '',
              upperCaption: ''
            });
          } else {
            toast.error(`Failed to process ${validFiles[index].name}: ${result.reason}`);
          }
        });
        
        onImagesChange(newImages);
        
        if (results.some(r => r.status === 'fulfilled')) {
          toast.success(`Successfully uploaded ${results.filter(r => r.status === 'fulfilled').length} image(s)`);
        }
      } catch (error) {
        toast.error('Failed to process images');
        console.error('Image processing error:', error);
      }
    } catch (error) {
      toast.error('File validation failed');
      console.error('File validation error:', error);
    } finally {
      setIsUploading(false);
      // Reset the input
      e.target.value = '';
    }
  };

  const handleImageUpdate = (index: number, updates: Partial<{ url: string; visible: boolean; caption: string; upperCaption: string }>) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], ...updates };
    onImagesChange(newImages);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-6">
      {images.length > 0 ? (
        <div className="space-y-3">
          {images.map((image, index) => (
            <ImageItem
              key={index}
              index={index}
              image={image}
              onUpperCaptionChange={(value) => handleImageUpdate(index, { upperCaption: value })}
              onCaptionChange={(value) => handleImageUpdate(index, { caption: value })}
              onVisibilityToggle={() => handleImageUpdate(index, { visible: !image.visible })}
              onRemove={() => handleRemoveImage(index)}
            />
          ))}
          
          <UploadArea 
            onFileUpload={handleFileUpload}
            hasImages={true}
          />
        </div>
      ) : (
        <UploadArea 
          onFileUpload={handleFileUpload}
          hasImages={false}
        />
      )}
      
      {isUploading && (
        <div className="text-center text-sm text-gray-500">
          Processing images...
        </div>
      )}
    </div>
  );
};

export default ImagesSection;
