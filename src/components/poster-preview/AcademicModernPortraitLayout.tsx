
import React from 'react';
import ImagesDisplay from './ImagesDisplay';
import KeyTakeawaysTile from './KeyTakeawaysTile';
import ReferencesTile from './ReferencesTile';
import MasonryGrid from './MasonryGrid';
import { posterTheme } from '@/constants/posterTheme';

interface AcademicModernPortraitLayoutProps {
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
  shouldLeftStretch: boolean;
}

const AcademicModernPortraitLayout: React.FC<AcademicModernPortraitLayoutProps> = ({
  posterData,
  designSettings,
  showKeypoints,
  activeSections,
  keyTakeawayColors,
  shouldLeftStretch
}) => {
  const [columnCount, setColumnCount] = React.useState(3);

  // Check if there are any visible images
  const hasVisibleImages = posterData.images && posterData.images.filter((img: any) => img.visible).length > 0;
  
  // Count visible key takeaways
  const visibleKeyTakeaways = posterData.keypoints?.filter(
    (point: string, index: number) => point?.trim() && posterData.keyVisibility?.[index] !== false
  ) || [];
  
  // Calculate if References should expand (when key takeaways are minimal or hidden)
  const shouldReferencesExpand = !showKeypoints || visibleKeyTakeaways.length <= 2;

  // Create grid items for masonry layout in proper order
  const gridItems = [];
  
  // 1. Add content sections first
  activeSections.forEach((section, index) => {
    const contentLength = section.content?.length || 0;
    const isLargeContent = contentLength > 400;
    
    gridItems.push(
      <div 
        key={`section-${index}`}
        className="flex flex-col h-full"
        data-size={isLargeContent ? 'large' : 'normal'}
        data-order={index + 1}
        content={section.content}
        style={{
          borderRadius: `${posterTheme.radius.tile}pt`,
          overflow: 'hidden',
          border: `${posterTheme.border.tile}pt solid #fff`,
          marginBottom: 0,
        }}
      >
        {/* Section Header */}
        <div 
          style={{ 
            backgroundColor: section.headerBg,
            borderBottom: `${posterTheme.border.sectionHeader}pt solid ${section.headerTextColor === "#FFFFFF" ? "#FFFFFF" : "#202B5B"}`,
            padding: `${posterTheme.spacing.sectionPadding * 0.7}pt`,
          }}
        >
          <h2 
            style={{ 
              color: section.headerTextColor,
              fontFamily: `var(--font-${designSettings.titleFont})`,
              fontSize: `${posterTheme.fontSizes.sectionHeader}pt`,
              fontWeight: 900,
              letterSpacing: '0.2pt',
              margin: 0,
            }}
          >
            {section.title}
          </h2>
        </div>
        
        {/* Section Content */}
        <div 
          style={{ 
            backgroundColor: section.contentBg,
            padding: `${posterTheme.spacing.sectionPadding}pt`,
            flex: 1,
          }}
        >
          <p 
            style={{ 
              color: section.contentTextColor,
              fontFamily: `var(--font-${designSettings.contentFont})`,
              fontSize: `${posterTheme.fontSizes.body}pt`,
              lineHeight: 1.6,
              fontWeight: 400,
              margin: 0,
            }}
          >
            {section.content}
          </p>
        </div>
      </div>
    );
  });

  // 2. Add images after sections
  if (hasVisibleImages) {
    gridItems.push(
      <div 
        key="images"
        style={{
          backgroundColor: "#F2F2F2",
          borderRadius: `${posterTheme.radius.tile}pt`,
          padding: `${posterTheme.spacing.sectionPadding}pt`,
          marginBottom: 0,
        }}
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
  if (showKeypoints && visibleKeyTakeaways.length > 0) {
    gridItems.push(
      <div 
        key="keytakeaways"
        data-size={shouldReferencesExpand ? 'small' : 'normal'}
        data-order={98}
      >
        <KeyTakeawaysTile
          posterData={posterData}
          designSettings={designSettings}
          showKeypoints={showKeypoints}
          keyTakeawayColors={keyTakeawayColors}
          isCompact={false}
        />
      </div>
    );
  }

  // 4. Add references last (always)
  gridItems.push(
    <div 
      key="references"
      data-size={shouldReferencesExpand ? 'large' : 'normal'}
      data-order={99}
    >
      <ReferencesTile
        posterData={posterData}
        designSettings={designSettings}
        isCompact={false}
      />
    </div>
  );

  // Store column count in global context for PDF export
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__POSTER_COLUMN_COUNT__ = columnCount;
    }
  }, [columnCount]);

  return (
    <div className="h-full p-3">
      <MasonryGrid
        maxColumns={3}
        gap={posterTheme.spacing.tileGap}
        className="h-full"
        onColumnCountChange={setColumnCount}
      >
        {gridItems}
      </MasonryGrid>
    </div>
  );
};

export default AcademicModernPortraitLayout;
