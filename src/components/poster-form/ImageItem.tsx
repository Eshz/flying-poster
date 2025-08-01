
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VisibilityToggle } from "@/components/ui/visibility-toggle";
import { Trash2 } from "lucide-react";

interface ImageItemProps {
  index: number;
  image: { url: string; visible: boolean; caption: string; upperCaption?: string };
  onUpperCaptionChange: (value: string) => void;
  onCaptionChange: (value: string) => void;
  onVisibilityToggle: () => void;
  onRemove: () => void;
}

export const ImageItem: React.FC<ImageItemProps> = ({
  index,
  image,
  onUpperCaptionChange,
  onCaptionChange,
  onVisibilityToggle,
  onRemove
}) => {
  return (
    <div className="border rounded-md p-3 flex gap-3 items-start">
      <div className="w-20 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
        <img 
          src={image.url} 
          alt={`Uploaded image ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 space-y-2">
        <Input
          placeholder="Upper caption"
          value={image.upperCaption || ''}
          onChange={(e) => onUpperCaptionChange(e.target.value)}
          className="text-xs h-8"
          aria-label={`Upper caption for image ${index + 1}`}
        />
        
        <Input
          placeholder="Lower caption"
          value={image.caption}
          onChange={(e) => onCaptionChange(e.target.value)}
          className="text-xs h-8"
          aria-label={`Lower caption for image ${index + 1}`}
        />
        
        <div className="flex justify-between items-center">
          <VisibilityToggle
            id={`show-image-${index}`}
            checked={image.visible}
            onCheckedChange={onVisibilityToggle}
            label={image.visible ? 'Visible' : 'Hidden'}
          />
          
          <Button 
            variant="destructive" 
            size="sm"
            onClick={onRemove}
            className="h-6 w-6 p-0"
            aria-label={`Remove image ${index + 1}`}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
