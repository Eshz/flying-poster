
import React, { useState } from 'react';
import ContactInfoSection from './poster-form/ContactInfoSection';
import SectionsGroup from './poster-form/SectionsGroup';
import KeyTakeawaysGroup from './poster-form/KeyTakeawaysGroup';
import ImagesGroup from './poster-form/ImagesGroup';
import QrCodeGroup from './poster-form/QrCodeGroup';
import ReferencesSection from './poster-form/ReferencesSection';
import { PosterData } from '@/types/project';
import { PosterImage } from '@/types/poster';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

interface PosterFormProps {
  posterData: PosterData;
  setPosterData: (posterData: Partial<PosterData> | ((prev: PosterData) => PosterData)) => void;
}

const PosterForm: React.FC<PosterFormProps> = ({ 
  posterData, 
  setPosterData
}) => {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    'general-info': true,
    'sections': false
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === '_bulk_update' && typeof value === 'function') {
      setPosterData(value);
      return;
    }
    
    setPosterData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleKeyPointChange = (index: number, value: string) => {
    setPosterData(prev => {
      const updatedKeypoints = [...prev.keypoints];
      updatedKeypoints[index] = value;
      return { ...prev, keypoints: updatedKeypoints };
    });
  };
  
  const handleKeyDescriptionChange = (index: number, value: string) => {
    setPosterData(prev => {
      const updatedDescriptions = [...prev.keyDescriptions];
      updatedDescriptions[index] = value;
      return { ...prev, keyDescriptions: updatedDescriptions };
    });
  };

  const handleKeyVisibilityChange = (index: number, visible: boolean) => {
    setPosterData(prev => {
      const updatedVisibility = [...(prev.keyVisibility || [true, true, true, true])];
      updatedVisibility[index] = visible;
      return { ...prev, keyVisibility: updatedVisibility };
    });
  };

  const handleSectionTitleChange = (index: number, value: string) => {
    setPosterData(prev => {
      const updatedSectionTitles = [...prev.sectionTitles];
      updatedSectionTitles[index] = value;
      return { ...prev, sectionTitles: updatedSectionTitles };
    });
  };

  // Handle reordering of key takeaways
  const handleKeyTakeawaysReorder = (newKeypoints: string[]) => {
    const currentKeypoints = posterData.keypoints || [];
    const currentDescriptions = posterData.keyDescriptions || [];
    const currentVisibility = posterData.keyVisibility || [];
    
    // Create mapping of old indices to new indices
    const indexMap = new Map();
    newKeypoints.forEach((keypoint, newIndex) => {
      const oldIndex = currentKeypoints.indexOf(keypoint);
      if (oldIndex !== -1) {
        indexMap.set(oldIndex, newIndex);
      }
    });
    
    // Reorder descriptions and visibility arrays accordingly
    const newDescriptions = new Array(newKeypoints.length);
    const newVisibility = new Array(newKeypoints.length);
    
    indexMap.forEach((newIndex, oldIndex) => {
      newDescriptions[newIndex] = currentDescriptions[oldIndex] || '';
      newVisibility[newIndex] = currentVisibility[oldIndex] !== undefined ? currentVisibility[oldIndex] : true;
    });
    
    setPosterData(prev => ({
      ...prev,
      keypoints: newKeypoints,
      keyDescriptions: newDescriptions,
      keyVisibility: newVisibility
    }));
  };

  // Handle reordering of sections
  const handleSectionsReorder = (newSectionTitles: string[]) => {
    const sectionFields = ['introduction', 'methods', 'findings', 'conclusions', 'references'];
    const currentData = [
      posterData.introduction || '',
      posterData.methods || '',
      posterData.findings || '',
      posterData.conclusions || '',
      posterData.references || ''
    ];
    
    // Find the mapping between old and new positions
    const currentTitles = posterData.sectionTitles || [];
    const indexMap = new Map();
    newSectionTitles.forEach((title, newIndex) => {
      const oldIndex = currentTitles.indexOf(title);
      if (oldIndex !== -1) {
        indexMap.set(oldIndex, newIndex);
      }
    });
    
    // Reorder content accordingly
    const newData = new Array(5).fill('');
    indexMap.forEach((newIndex, oldIndex) => {
      newData[newIndex] = currentData[oldIndex];
    });
    
    setPosterData(prev => ({
      ...prev,
      sectionTitles: newSectionTitles,
      introduction: newData[0],
      methods: newData[1],
      findings: newData[2],
      conclusions: newData[3],
      references: newData[4]
    }));
  };

  const handleQrUrlChange = (url: string) => {
    setPosterData(prev => ({ ...prev, qrCodeUrl: url }));
  };
  
  const handleQrColorChange = (color: string) => {
    setPosterData(prev => ({ ...prev, qrCodeColor: color }));
  };
  
  const handleImagesChange = (images: PosterImage[]) => {
    setPosterData(prev => ({ ...prev, images }));
  };
  
  const handleToggleChange = (field: keyof PosterData) => (checked: boolean) => {
    setPosterData(prev => ({ ...prev, [field]: checked }));
  };
  
  const handleQrCaptionChange = (caption: string) => {
    setPosterData(prev => ({ ...prev, qrCodeCaption: caption }));
  };
  
  return (
    <ErrorBoundary>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-0">
          <ContactInfoSection 
            posterData={posterData}
            handleChange={handleChange}
            openSections={openSections}
            toggleSection={toggleSection}
          />
          
          <SectionsGroup 
            posterData={posterData}
            handleChange={handleChange}
            handleSectionTitleChange={handleSectionTitleChange}
            handleSectionsReorder={handleSectionsReorder}
            openSections={openSections}
            toggleSection={toggleSection}
          />

          <KeyTakeawaysGroup 
            posterData={posterData}
            handleKeyPointChange={handleKeyPointChange}
            handleKeyDescriptionChange={handleKeyDescriptionChange}
            handleKeyVisibilityChange={handleKeyVisibilityChange}
            handleKeyTakeawaysReorder={handleKeyTakeawaysReorder}
            handleToggleChange={handleToggleChange}
            openSections={openSections}
            toggleSection={toggleSection}
          />

          <ReferencesSection 
            posterData={posterData}
            handleChange={handleChange}
            openSections={openSections}
            toggleSection={toggleSection}
          />

          <QrCodeGroup 
            posterData={posterData}
            handleQrUrlChange={handleQrUrlChange}
            handleQrColorChange={handleQrColorChange}
            handleQrCaptionChange={handleQrCaptionChange}
            handleToggleChange={handleToggleChange}
            openSections={openSections}
            toggleSection={toggleSection}
          />

          <ImagesGroup 
            posterData={posterData}
            handleImagesChange={handleImagesChange}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default PosterForm;
