
import React, { useRef } from 'react';
import { Button } from './button';
import { Upload, Image } from "lucide-react";

interface UploadAreaProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasImages?: boolean;
  acceptMultiple?: boolean;
  acceptedTypes?: string;
  maxSizeMB?: number;
  className?: string;
}

export const UploadArea: React.FC<UploadAreaProps> = ({
  onFileUpload,
  hasImages = false,
  acceptMultiple = true,
  acceptedTypes = "image/*",
  className
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`border border-dashed rounded-md p-8 text-center text-gray-500 relative ${className || ''}`}>
      <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" />
      <p>{hasImages ? 'Drop more images here or' : 'No images uploaded yet'}</p>
      {!hasImages && <p className="text-sm mb-4">Upload images to include in your poster</p>}
      
      <input 
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        multiple={acceptMultiple}
        className="hidden" 
        onChange={onFileUpload}
        aria-label="Upload images"
      />
      
      <Button 
        onClick={handleButtonClick}
        type="button"
        size="sm"
        className="bg-black text-white hover:bg-gray-800 mt-2"
        aria-label="Upload images"
      >
        <Upload className="h-4 w-4 mr-2" /> Upload Images
      </Button>
    </div>
  );
};
