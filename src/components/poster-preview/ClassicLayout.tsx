
import React from 'react';
import PosterSection from './PosterSection';
import KeyTakeaway from './KeyTakeaway';
import ImagesDisplay from './ImagesDisplay';
import { calculateDynamicTextSizes, getContentDensity } from '@/utils/dynamicTextSizing';

interface ClassicLayoutProps {
  posterData: any;
  designSettings: any;
  qrCodeUrl: string;
  showKeypoints: boolean;
  showQrCode: boolean;
}

const ClassicLayout: React.FC<ClassicLayoutProps> = ({
  posterData,
  designSettings,
  qrCodeUrl,
  showKeypoints,
  showQrCode
}) => {
  const hasImages = posterData.images && posterData.images.filter(img => img.visible).length > 0;
  const visibleImages = posterData.images?.filter(img => img.visible) || [];
  
  // Ensure sectionTitles exists with fallback values
  const sectionTitles = posterData?.sectionTitles || [
    "1. Introduction",
    "2. Methods",
    "3. Findings",
    "4. Conclusions",
    "5. References"
  ];
  
  const keypoints = posterData?.keypoints || ["Key Point 1", "Key Point 2", "Key Point 3", "Key Point 4"];
  const keyDescriptions = posterData?.keyDescriptions || ["Description 1", "Description 2", "Description 3", "Description 4"];
  const keyVisibility = posterData?.keyVisibility || [true, true, true, true];
  
  // Filter visible key points
  const visibleKeyPoints = keypoints.map((point, index) => ({
    point,
    description: keyDescriptions[index] || "",
    visible: keyVisibility[index] !== false,
    originalIndex: index
  })).filter(item => item.visible);
  
  // Calculate content density and text sizes
  const sections = [
    posterData?.introduction || "",
    posterData?.methods || "",
    posterData?.findings || "",
    posterData?.conclusions || "",
    posterData?.references || ""
  ];
  
  const contentDensity = getContentDensity(sections, posterData.images, visibleKeyPoints.map(item => item.point));
  const textSizes = calculateDynamicTextSizes(contentDensity, hasImages, sections.length);
  
  // Determine layout based on content
  const shouldUseThreeColumn = hasImages && visibleImages.length > 2;
  const shouldMoveImagesToSeparateColumn = hasImages && (
    sections.reduce((acc, section) => acc + section.length, 0) > 2000 ||
    visibleImages.length > 1
  );

  if (shouldUseThreeColumn || shouldMoveImagesToSeparateColumn) {
    // Three-column layout for heavy content
    return (
      <div className="grid grid-cols-3 gap-2 h-full overflow-hidden">
        {/* Left Column - Introduction & Methods */}
        <div className="flex flex-col space-y-2 h-full overflow-hidden">
          <PosterSection 
            title={sectionTitles[0] || "Introduction"}
            content={posterData?.introduction || ""}
            designSettings={designSettings}
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.bodyText}
          />
          
          <PosterSection 
            title={sectionTitles[1] || "Methods"}
            content={posterData?.methods || ""}
            designSettings={designSettings}
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.bodyText}
          />
        </div>
        
        {/* Middle Column - Findings & Key Points */}
        <div className="flex flex-col space-y-2 h-full overflow-hidden">
          <PosterSection 
            title={sectionTitles[2] || "Findings"}
            content={posterData?.findings || ""}
            designSettings={designSettings}
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.bodyText}
          />
          
          {/* Key Points in compact layout */}
          {showKeypoints && visibleKeyPoints.length > 0 && (
            <>
              <div className="relative text-center my-2">
                <div 
                  className="absolute top-1/2 left-0 right-0 h-0.5 transform -translate-y-1/2"
                  style={{ backgroundColor: designSettings.keyPointsTextColor || designSettings.sectionTitleColor }}
                />
                <h2 
                  className={`${textSizes.bodyText} font-bold relative inline-block px-2`}
                  style={{ 
                    color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor,
                    fontFamily: `var(--font-${designSettings.titleFont})`,
                    backgroundColor: '#ffffff'
                  }}
                >
                  Key Takeaways
                </h2>
              </div>
              
              <div className="bg-white rounded border border-gray-200 overflow-hidden">
                {visibleKeyPoints.slice(0, 2).map((item, index) => (
                  <KeyTakeaway
                    key={item.originalIndex}
                    number={index + 1}
                    title={item.point}
                    description={item.description}
                    designSettings={designSettings}
                    titleSizeClass={textSizes.caption}
                    textSizeClass="text-xs"
                    listMode={true}
                    circleSize="1.5rem"
                    visible={true}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Right Column - Images, Conclusions, References */}
        <div className="flex flex-col space-y-2 h-full overflow-hidden">
          {/* Images Section */}
          {hasImages && (
            <div className="flex-shrink-0">
              <ImagesDisplay 
                images={posterData.images}
                designSettings={designSettings}
                className="max-h-64"
              />
            </div>
          )}
          
          {/* Remaining Key Points */}
          {showKeypoints && visibleKeyPoints.length > 2 && (
            <div className="bg-white rounded border border-gray-200 overflow-hidden">
              {visibleKeyPoints.slice(2).map((item, index) => (
                <KeyTakeaway
                  key={item.originalIndex}
                  number={index + 3}
                  title={item.point}
                  description={item.description}
                  designSettings={designSettings}
                  titleSizeClass={textSizes.caption}
                  textSizeClass="text-xs"
                  listMode={true}
                  circleSize="1.5rem"
                  visible={true}
                />
              ))}
            </div>
          )}
          
          <PosterSection 
            title={sectionTitles[3] || "Conclusions"}
            content={posterData?.conclusions || ""}
            designSettings={designSettings}
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.bodyText}
          />
          
          <PosterSection 
            title={sectionTitles[4] || "References"}
            content={posterData?.references || ""}
            designSettings={designSettings}
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.caption}
            isPreLine={true}
          />
        </div>
      </div>
    );
  }

  // Original two-column layout for lighter content
  return (
    <div className="grid grid-cols-2 gap-2 h-full overflow-hidden">
      {/* Left Column */}
      <div className="flex flex-col space-y-2 h-full overflow-hidden">
        <PosterSection 
          title={sectionTitles[0] || "Introduction"}
          content={posterData?.introduction || ""}
          designSettings={designSettings}
          titleSizeClass={textSizes.sectionHeading}
          textSizeClass={textSizes.bodyText}
        />
        
        <PosterSection 
          title={sectionTitles[1] || "Methods"}
          content={posterData?.methods || ""}
          designSettings={designSettings}
          titleSizeClass={textSizes.sectionHeading}
          textSizeClass={textSizes.bodyText}
        />
        
        <PosterSection 
          title={sectionTitles[2] || "Findings"}
          content={posterData?.findings || ""}
          designSettings={designSettings}
          titleSizeClass={textSizes.sectionHeading}
          textSizeClass={textSizes.bodyText}
        />
        
        {/* Images Section - Left Column only if content is light */}
        {hasImages && !shouldMoveImagesToSeparateColumn && (
          <div className="flex-grow">
            <ImagesDisplay 
              images={posterData.images}
              designSettings={designSettings}
              className="h-full"
            />
          </div>
        )}
      </div>
      
      {/* Right Column */}
      <div className="flex flex-col space-y-2 h-full overflow-hidden">
        {/* Key Takeaways Section with strikethrough title */}
        {showKeypoints && visibleKeyPoints.length > 0 && (
          <>
            <div className="relative text-center my-2">
              <div 
                className="absolute top-1/2 left-0 right-0 h-0.5 transform -translate-y-1/2"
                style={{ backgroundColor: designSettings.keyPointsTextColor || designSettings.sectionTitleColor }}
              />
              <h2 
                className={`${textSizes.bodyText} font-bold relative inline-block px-4`}
                style={{ 
                  color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor,
                  fontFamily: `var(--font-${designSettings.titleFont})`,
                  backgroundColor: '#ffffff'
                }}
              >
                Key Takeaways
              </h2>
            </div>
            
            {/* List layout for key points - removed flex-grow */}
            <div className="bg-white rounded border border-gray-200 overflow-hidden">
              {visibleKeyPoints.map((item, index) => (
                <KeyTakeaway
                  key={item.originalIndex}
                  number={index + 1}
                  title={item.point}
                  description={item.description}
                  designSettings={designSettings}
                  titleSizeClass={textSizes.bodyText}
                  textSizeClass={textSizes.caption}
                  listMode={true}
                  visible={true}
                />
              ))}
            </div>
          </>
        )}
        
        <PosterSection 
          title={sectionTitles[3] || "Conclusions"}
          content={posterData?.conclusions || ""}
          designSettings={designSettings}
          titleSizeClass={textSizes.sectionHeading}
          textSizeClass={textSizes.bodyText}
        />
        
        <PosterSection 
          title={sectionTitles[4] || "References"}
          content={posterData?.references || ""}
          designSettings={designSettings}
          titleSizeClass={textSizes.sectionHeading}
          textSizeClass={textSizes.caption}
          isPreLine={true}
        />
      </div>
    </div>
  );
};

export default ClassicLayout;
