
import React from 'react';
import PosterSection from './PosterSection';
import KeyTakeaway from './KeyTakeaway';
import ImagesDisplay from './ImagesDisplay';
import { calculateDynamicTextSizes, getContentDensity } from '@/utils/dynamicTextSizing';

interface FocusLayoutProps {
  posterData: any;
  designSettings: any;
  qrCodeUrl: string;
  showKeypoints: boolean;
  showQrCode: boolean;
}

const FocusLayout: React.FC<FocusLayoutProps> = ({
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
  
  // Adjust key points layout based on content density
  const keyPointCols = contentDensity === 'high' ? 'grid-cols-4' : 
                      contentDensity === 'medium' ? 'grid-cols-3' : 'grid-cols-2';
  
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="max-w-4xl mx-auto space-y-6 flex-grow flex flex-col">
        {/* QR Code and Title Row */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-4/5">
            <PosterSection 
              title={sectionTitles[0] || "Introduction"}
              content={posterData?.introduction || ""}
              designSettings={designSettings}
              className="p-4"
              titleSizeClass={textSizes.sectionHeading}
              textSizeClass={textSizes.bodyText}
            />
          </div>

          {/* QR Code */}
          {showQrCode && qrCodeUrl && (
            <div className="flex flex-col items-center">
              <img 
                src={qrCodeUrl} 
                alt="QR Code" 
                className="w-28 h-28 object-contain"
              />
              <p 
                className={`${textSizes.caption} text-center mt-1`}
                style={{ 
                  color: designSettings.sectionTitleColor,
                  fontFamily: `var(--font-${designSettings.contentFont})`
                }}
              >
                Scan for more info
              </p>
            </div>
          )}
        </div>
        
        {/* Adaptive two-column layout for methods and findings if content is dense */}
        {contentDensity === 'high' ? (
          <div className="grid grid-cols-2 gap-4">
            <PosterSection 
              title={sectionTitles[1] || "Methods"}
              content={posterData?.methods || ""}
              designSettings={designSettings}
              className="p-4 flex-grow"
              titleSizeClass={textSizes.sectionHeading}
              textSizeClass={textSizes.bodyText}
            />
            
            <PosterSection 
              title={sectionTitles[2] || "Findings"}
              content={posterData?.findings || ""}
              designSettings={designSettings}
              className="p-4 flex-grow"
              titleSizeClass={textSizes.sectionHeading}
              textSizeClass={textSizes.bodyText}
            />
          </div>
        ) : (
          <>
            <PosterSection 
              title={sectionTitles[1] || "Methods"}
              content={posterData?.methods || ""}
              designSettings={designSettings}
              className="p-4 flex-grow"
              titleSizeClass={textSizes.sectionHeading}
              textSizeClass={textSizes.bodyText}
            />
            
            <PosterSection 
              title={sectionTitles[2] || "Findings"}
              content={posterData?.findings || ""}
              designSettings={designSettings}
              className="p-4 flex-grow"
              titleSizeClass={textSizes.sectionHeading}
              textSizeClass={textSizes.bodyText}
            />
          </>
        )}
        
        {/* Images Section - adaptive positioning */}
        {hasImages && (
          <div className={`${contentDensity === 'high' ? 'my-2' : 'my-4'}`}>
            <ImagesDisplay 
              images={posterData.images}
              designSettings={designSettings}
              className={contentDensity === 'high' ? 'max-h-48' : ''}
            />
          </div>
        )}
        
        {/* Key Takeaways Section with strikethrough title */}
        {showKeypoints && visibleKeyPoints.length > 0 && (
          <>
            <div className={`relative text-center ${contentDensity === 'high' ? 'my-2' : 'my-6'}`}>
              {/* Strikethrough line */}
              <div 
                className="absolute top-1/2 left-0 right-0 h-0.5 transform -translate-y-1/2"
                style={{ backgroundColor: designSettings.keyPointsTextColor || designSettings.sectionTitleColor }}
              />
              {/* Title with background */}
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
            
            {/* List layout for key points - content-adaptive height */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {visibleKeyPoints.map((item, index) => (
                <KeyTakeaway
                  key={item.originalIndex}
                  number={index + 1}
                  title={item.point}
                  description={item.description}
                  designSettings={designSettings}
                  titleSizeClass={textSizes.bodyText}
                  textSizeClass={textSizes.caption}
                  circleSize={contentDensity === 'high' ? '2rem' : '2.5rem'}
                  listMode={true}
                  visible={true}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Conclusions and References - side by side if high density */}
        {contentDensity === 'high' ? (
          <div className="grid grid-cols-2 gap-4">
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
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default FocusLayout;
