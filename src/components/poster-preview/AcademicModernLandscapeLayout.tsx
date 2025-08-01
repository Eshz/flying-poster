
import React from 'react';
import ImagesDisplay from './ImagesDisplay';
import SectionColumn from './SectionColumn';
import KeyTakeawaysTile from './KeyTakeawaysTile';
import ReferencesTile from './ReferencesTile';
import MasonryGrid from './MasonryGrid';

interface AcademicModernLandscapeLayoutProps {
  posterData: any;
  designSettings: any;
  showKeypoints: boolean;
  activeSections: Array<{
    title: string;
    content: string;
    headerBg: string;
    headerTextColor: string;
    contentBg: string;
    contentTextColor: string;
  }>;
  keyTakeawayColors: Array<{
    bg: string;
    textColor: string;
  }>;
}

const AcademicModernLandscapeLayout: React.FC<AcademicModernLandscapeLayoutProps> = ({
  posterData,
  designSettings,
  showKeypoints,
  activeSections,
  keyTakeawayColors
}) => {
  // Check if references should be shown
  const showReferences = posterData.showReferences !== false && posterData.references?.trim();
  
  // Check if key takeaways should be shown
  const hasKeyTakeaways = showKeypoints && posterData.keypoints && posterData.keypoints.some((point: string) => point?.trim());
  
  // Check if there are visible images
  const hasImages = posterData.images && posterData.images.filter((img: any) => img.visible).length > 0;
  
  // Create grid items for masonry layout in proper order
  const gridItems = [];
  
  // 1. Distribute sections into grid items with size hints first
  activeSections.forEach((section, index) => {
    const contentLength = section.content?.length || 0;
    const isLargeContent = contentLength > 600;
    
    gridItems.push(
      <div 
        key={`section-${index}`}
        className="flex flex-col h-full"
        data-size={isLargeContent ? 'large' : 'normal'}
        data-order={index + 1}
        content={section.content} // Add content prop for density calculation
      >
        <SectionColumn
          sections={[section]}
          designSettings={designSettings}
        />
      </div>
    );
  });

  // 2. Add images after sections
  if (hasImages) {
    gridItems.push(
      <div 
        key="images"
        className="p-3 rounded-lg"
        style={{ backgroundColor: "#F2F2F2" }}
        data-size="normal"
        data-order={activeSections.length + 1}
      >
        <ImagesDisplay 
          images={posterData.images} 
          designSettings={designSettings}
        />
      </div>
    );
  }

  // 3. Add key takeaways second to last
  if (hasKeyTakeaways) {
    gridItems.push(
      <div 
        key="keytakeaways" 
        data-size="normal"
        data-order={98} // High order to ensure it comes before references
      >
        <KeyTakeawaysTile
          posterData={posterData}
          designSettings={designSettings}
          showKeypoints={showKeypoints}
          keyTakeawayColors={keyTakeawayColors}
          isCompact={true} // Use compact mode for landscape
        />
      </div>
    );
  }

  // 4. Add references last (always)
  if (showReferences) {
    gridItems.push(
      <div 
        key="references" 
        data-size="normal"
        data-order={99} // Highest order to ensure it's always last
      >
        <ReferencesTile
          posterData={posterData}
          designSettings={designSettings}
          isCompact={true} // Use compact mode for landscape
        />
      </div>
    );
  }

  return (
    <div className="h-full p-2">
      <MasonryGrid
        maxColumns={4} // Max 4 columns for landscape
        gap={8}
        className="h-full"
      >
        {gridItems}
      </MasonryGrid>
    </div>
  );
};

export default AcademicModernLandscapeLayout;
