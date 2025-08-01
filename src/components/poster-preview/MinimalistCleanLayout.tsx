
import React from 'react';
import ImagesDisplay from './ImagesDisplay';

interface MinimalistCleanLayoutProps {
  posterData: any;
  designSettings: any;
  qrCodeUrl: string;
  showKeypoints: boolean;
  showQrCode: boolean;
}

const MinimalistCleanLayout: React.FC<MinimalistCleanLayoutProps> = ({
  posterData,
  designSettings,
  qrCodeUrl,
  showKeypoints,
  showQrCode
}) => {
  const sections = [
    { 
      title: posterData.sectionTitles?.[0] || "Introduction", 
      content: posterData.introduction,
      number: "1"
    },
    { 
      title: posterData.sectionTitles?.[1] || "Methods", 
      content: posterData.methods,
      number: "2"
    },
    { 
      title: posterData.sectionTitles?.[2] || "Results", 
      content: posterData.findings,
      number: "3"
    },
    { 
      title: posterData.sectionTitles?.[3] || "Discussion", 
      content: posterData.conclusions,
      number: "4"
    }
  ];

  const activeSections = sections.filter(section => section.content?.trim());

  return (
    <div className="flex gap-6 h-full p-6" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Left Column - Main Sections */}
      <div className="w-2/3 space-y-6 overflow-auto">
        {activeSections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Section Header with Circle Number */}
            <div className="flex items-center gap-4 p-6 border-b border-gray-100">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: designSettings.sectionBgColor }}
              >
                {section.number}
              </div>
              <h2 
                className="text-xl font-bold"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  fontFamily: `var(--font-${designSettings.titleFont})`
                }}
              >
                {section.title}
              </h2>
            </div>
            
            {/* Section Content */}
            <div className="p-6">
              <p 
                className="text-sm leading-relaxed"
                style={{ 
                  color: designSettings.sectionTextColor,
                  fontFamily: `var(--font-${designSettings.contentFont})`
                }}
              >
                {section.content}
              </p>
            </div>
          </div>
        ))}
        
        {/* Images section */}
        {posterData.images && posterData.images.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <ImagesDisplay 
              images={posterData.images} 
              designSettings={designSettings}
            />
          </div>
        )}
      </div>

      {/* Right Column - Key Points and References */}
      <div className="w-1/3 space-y-6 overflow-auto">
        {/* Key Points */}
        {showKeypoints && posterData.keypoints && posterData.keypoints.some((point: string) => point?.trim()) && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 
              className="text-lg font-bold mb-4 text-center"
              style={{ 
                color: designSettings.sectionTitleColor,
                fontFamily: `var(--font-${designSettings.titleFont})`
              }}
            >
              Key Findings
            </h2>
            
            <div className="space-y-4">
              {posterData.keypoints.map((point: string, index: number) => {
                const isVisible = posterData.keyVisibility?.[index] !== false;
                if (!point?.trim() || !isVisible) return null;
                
                return (
                  <div key={index} className="border-l-4 pl-4" style={{ borderLeftColor: designSettings.sectionBgColor }}>
                    <h3 
                      className="text-sm font-semibold mb-2"
                      style={{ 
                        color: designSettings.sectionTitleColor,
                        fontFamily: `var(--font-${designSettings.titleFont})`
                      }}
                    >
                      {point}
                    </h3>
                    {posterData.keyDescriptions?.[index] && (
                      <p 
                        className="text-xs leading-relaxed"
                        style={{ 
                          color: designSettings.sectionTextColor,
                          fontFamily: `var(--font-${designSettings.contentFont})`
                        }}
                      >
                        {posterData.keyDescriptions[index]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* References */}
        {posterData.references?.trim() && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 
              className="text-lg font-bold mb-4"
              style={{ 
                color: designSettings.sectionTitleColor,
                fontFamily: `var(--font-${designSettings.titleFont})`
              }}
            >
              {posterData.sectionTitles?.[4] || "References"}
            </h2>
            
            <div 
              className="text-xs leading-relaxed whitespace-pre-line"
              style={{ 
                color: designSettings.sectionTextColor,
                fontFamily: `var(--font-${designSettings.contentFont})`
              }}
              dangerouslySetInnerHTML={{
                __html: posterData.references.replace(/\n/g, '<br>')
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MinimalistCleanLayout;
