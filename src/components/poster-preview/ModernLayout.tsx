
import React from 'react';
import PosterSection from './PosterSection';
import KeyTakeaway from './KeyTakeaway';
import ImagesDisplay from './ImagesDisplay';
import { calculateDynamicTextSizes, getContentDensity } from '@/utils/dynamicTextSizing';

interface ModernLayoutProps {
  posterData: any;
  designSettings: any;
  qrCodeUrl: string;
  showKeypoints: boolean;
  showQrCode: boolean;
}

const ModernLayout: React.FC<ModernLayoutProps> = ({
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
  
  // Determine if we need a four-column layout for very dense content
  const shouldUseFourColumn = hasImages && visibleImages.length > 3 && 
    sections.reduce((acc, section) => acc + section.length, 0) > 3000;
  
  if (shouldUseFourColumn) {
    // Four-column layout for very dense content
    return (
      <div className="p-2 h-full flex flex-col">
        <div className="grid grid-cols-4 gap-2 flex-grow">
          {/* Column 1: Introduction */}
          <div className="flex flex-col space-y-2 h-full">
            <PosterSection 
              title={sectionTitles[0] || "Introduction"}
              content={posterData?.introduction || ""}
              designSettings={designSettings}
              className="p-2 flex-grow"
              titleSizeClass={textSizes.sectionHeading}
              textSizeClass={textSizes.bodyText}
            />
            
            <PosterSection 
              title={sectionTitles[1] || "Methods"}
              content={posterData?.methods || ""}
              designSettings={designSettings}
              className="p-2 flex-grow"
              titleSizeClass={textSizes.sectionHeading}
              textSizeClass={textSizes.bodyText}
            />
          </div>
          
          {/* Column 2: Findings & Images */}
          <div className="flex flex-col space-y-2 h-full">
            <PosterSection 
              title={sectionTitles[2] || "Findings"}
              content={posterData?.findings || ""}
              designSettings={designSettings}
              className="p-2 flex-grow"
              titleSizeClass={textSizes.sectionHeading}
              textSizeClass={textSizes.bodyText}
            />
            
            {hasImages && (
              <div className="flex-shrink-0">
                <ImagesDisplay 
                  images={posterData.images.slice(0, Math.ceil(visibleImages.length / 2))}
                  designSettings={designSettings}
                  className="max-h-48"
                />
              </div>
            )}
          </div>
          
          {/* Column 3: Key Points */}
          <div className="flex flex-col space-y-2 h-full">
            {showKeypoints && visibleKeyPoints.length > 0 && (
              <>
                <div className="relative text-center">
                  <div 
                    className="absolute top-1/2 left-0 right-0 h-0.5 transform -translate-y-1/2"
                    style={{ backgroundColor: designSettings.keyPointsTextColor || designSettings.sectionTitleColor }}
                  />
                  <h2 
                    className={`${textSizes.caption} font-bold relative inline-block px-2`}
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
                  {visibleKeyPoints.map((item, index) => (
                    <KeyTakeaway
                      key={item.originalIndex}
                      number={index + 1}
                      title={item.point}
                      description={item.description}
                      designSettings={designSettings}
                      titleSizeClass="text-xs"
                      textSizeClass="text-xs"
                      listMode={true}
                      circleSize="1.2rem"
                      visible={true}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          {/* Column 4: Conclusions, References & More Images */}
          <div className="flex flex-col space-y-2 h-full">
            <PosterSection 
              title={sectionTitles[3] || "Conclusions"}
              content={posterData?.conclusions || ""}
              designSettings={designSettings}
              className="p-2 flex-grow"
              titleSizeClass={textSizes.sectionHeading}
              textSizeClass={textSizes.bodyText}
            />
            
            {hasImages && visibleImages.length > Math.ceil(visibleImages.length / 2) && (
              <div className="flex-shrink-0">
                <ImagesDisplay 
                  images={posterData.images.slice(Math.ceil(visibleImages.length / 2))}
                  designSettings={designSettings}
                  className="max-h-32"
                />
              </div>
            )}
            
            <PosterSection 
              title={sectionTitles[4] || "References"}
              content={posterData?.references || ""}
              designSettings={designSettings}
              className="p-2 flex-grow"
              titleSizeClass={textSizes.sectionHeading}
              textSizeClass={textSizes.caption}
              isPreLine={true}
            />
          </div>
        </div>
      </div>
    );
  }
  
  // Original three-column layout with adaptations
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="grid grid-cols-3 gap-4 flex-grow">
        {/* Column 1: Introduction & Methods */}
        <div className="flex flex-col space-y-4 h-full">
          <PosterSection 
            title={sectionTitles[0] || "Introduction"}
            content={posterData?.introduction || ""}
            designSettings={designSettings}
            className="p-4 flex-grow"
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.bodyText}
          />
          
          <PosterSection 
            title={sectionTitles[1] || "Methods"}
            content={posterData?.methods || ""}
            designSettings={designSettings}
            className="p-4 flex-grow"
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.bodyText}
          />
          
          {/* Images in first column only if not too many */}
          {hasImages && visibleImages.length <= 2 && (
            <ImagesDisplay 
              images={posterData.images}
              designSettings={designSettings}
            />
          )}
        </div>
        
        {/* Column 2: Findings & Key Points */}
        <div className="flex flex-col space-y-4 h-full">
          <PosterSection 
            title={sectionTitles[2] || "Findings"}
            content={posterData?.findings || ""}
            designSettings={designSettings}
            className="p-4 flex-grow"
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.bodyText}
          />
          
          {/* Images moved here if too many for column 1 */}
          {hasImages && visibleImages.length > 2 && (
            <ImagesDisplay 
              images={posterData.images}
              designSettings={designSettings}
              className="max-h-64"
            />
          )}
          
          {/* Key Points */}
          {showKeypoints && visibleKeyPoints.length > 0 && (
            <>
              <div className="relative text-center mb-2">
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
              
              <div className="bg-white rounded border border-gray-200 overflow-hidden">
                {visibleKeyPoints.slice(0, 2).map((item, index) => (
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
        </div>
        
        {/* Column 3: Conclusions & References + Remaining Key Points */}
        <div className="flex flex-col space-y-4 h-full">
          {showKeypoints && visibleKeyPoints.length > 2 && (
            <div className="bg-white rounded border border-gray-200 overflow-hidden">
              {visibleKeyPoints.slice(2).map((item, index) => (
                <KeyTakeaway
                  key={item.originalIndex}
                  number={index + 3}
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
          )}
          
          <PosterSection 
            title={sectionTitles[3] || "Conclusions"}
            content={posterData?.conclusions || ""}
            designSettings={designSettings}
            className="p-4 flex-grow"
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.bodyText}
          />
          
          <PosterSection 
            title={sectionTitles[4] || "References"}
            content={posterData?.references || ""}
            designSettings={designSettings}
            className="p-4 flex-grow"
            titleSizeClass={textSizes.sectionHeading}
            textSizeClass={textSizes.caption}
            isPreLine={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ModernLayout;
