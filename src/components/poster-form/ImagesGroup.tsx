
import React from 'react';
import ImagesSection from './ImagesSection';
import { Image } from "lucide-react";
import { PosterImage } from '@/types/poster';
import { CollapsibleSection } from '@/components/ui/collapsible-section';

interface ImagesGroupProps {
  posterData: any;
  handleImagesChange: (images: PosterImage[]) => void;
}

const ImagesGroup: React.FC<ImagesGroupProps> = ({
  posterData,
  handleImagesChange
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <CollapsibleSection
      id="images"
      title="Images"
      icon={<Image className="h-3 w-3 text-blue-600" />}
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    >
      <ImagesSection 
        images={posterData.images || []}
        onImagesChange={handleImagesChange}
      />
    </CollapsibleSection>
  );
};

export default ImagesGroup;
