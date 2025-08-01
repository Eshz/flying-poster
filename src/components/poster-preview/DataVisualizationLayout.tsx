
import React from 'react';
import ImagesDisplay from './ImagesDisplay';

interface DataVisualizationLayoutProps {
  posterData: any;
  designSettings: any;
  qrCodeUrl: string;
  showKeypoints: boolean;
  showQrCode: boolean;
}

const DataVisualizationLayout: React.FC<DataVisualizationLayoutProps> = ({
  posterData,
  designSettings,
  qrCodeUrl,
  showKeypoints,
  showQrCode
}) => {
  const sections = [
    { 
      title: posterData.sectionTitles?.[0] || "Introduction", 
      content: posterData.introduction
    },
    { 
      title: posterData.sectionTitles?.[1] || "Methodology", 
      content: posterData.methods
    },
    { 
      title: posterData.sectionTitles?.[2] || "Results", 
      content: posterData.findings
    },
    { 
      title: posterData.sectionTitles?.[3] || "Discussion", 
      content: posterData.conclusions
    }
  ];

  const activeSections = sections.filter(section => section.content?.trim());

  return (
    <div className="flex gap-4 h-full p-4" style={{ backgroundColor: "#F8FAFC" }}>
      {/* Left Column - Sections */}
      <div className="w-1/2 space-y-4 overflow-auto">
        {activeSections.map((section, index) => (
          <div key={index}>
            {/* Section Header */}
            <div 
              className="px-4 py-3 rounded-t-lg"
              style={{ backgroundColor: designSettings.sectionBgColor }}
            >
              <h2 
                className="text-lg font-bold uppercase tracking-wide"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  fontFamily: `var(--font-${designSettings.titleFont})`
                }}
              >
                {section.title}
              </h2>
            </div>
            
            {/* Section Content */}
            <div 
              className="p-4 rounded-b-lg border-2"
              style={{ 
                backgroundColor: designSettings.keyPointsBgColor,
                borderColor: designSettings.sectionBgColor
              }}
            >
              <p 
                className="text-sm leading-relaxed"
                style={{ 
                  color: designSettings.keyPointsTextColor,
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
          <div 
            className="p-4 rounded-lg border-2"
            style={{ 
              backgroundColor: designSettings.keyPointsBgColor,
              borderColor: designSettings.sectionBgColor
            }}
          >
            <ImagesDisplay 
              images={posterData.images} 
              designSettings={designSettings}
            />
          </div>
        )}
      </div>

      {/* Right Column - Key Insights */}
      <div className="w-1/2 space-y-4 overflow-auto">
        {/* Key Insights Header */}
        {showKeypoints && posterData.keypoints && posterData.keypoints.some((point: string) => point?.trim()) && (
          <div>
            <div 
              className="px-4 py-3 rounded-t-lg"
              style={{ backgroundColor: designSettings.sectionBgColor }}
            >
              <h2 
                className="text-lg font-bold uppercase tracking-wide text-center"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  fontFamily: `var(--font-${designSettings.titleFont})`
                }}
              >
                Key Insights
              </h2>
            </div>
            
            {/* Key Points Grid */}
            <div 
              className="p-4 rounded-b-lg border-2 space-y-4"
              style={{ 
                backgroundColor: designSettings.keyPointsBgColor,
                borderColor: designSettings.sectionBgColor
              }}
            >
              {posterData.keypoints.map((point: string, index: number) => {
                const isVisible = posterData.keyVisibility?.[index] !== false;
                if (!point?.trim() || !isVisible) return null;
                
                return (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg border"
                    style={{ 
                      backgroundColor: "white",
                      borderColor: designSettings.sectionBgColor
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: designSettings.sectionBgColor }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <h3 
                          className="text-sm font-bold mb-2"
                          style={{ 
                            color: designSettings.keyPointsTextColor,
                            fontFamily: `var(--font-${designSettings.titleFont})`
                          }}
                        >
                          {point}
                        </h3>
                        {posterData.keyDescriptions?.[index] && (
                          <p 
                            className="text-xs leading-relaxed"
                            style={{ 
                              color: designSettings.keyPointsTextColor,
                              fontFamily: `var(--font-${designSettings.contentFont})`
                            }}
                          >
                            {posterData.keyDescriptions[index]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* References */}
        {posterData.references?.trim() && (
          <div>
            <div 
              className="px-4 py-3 rounded-t-lg"
              style={{ backgroundColor: designSettings.sectionBgColor }}
            >
              <h2 
                className="text-lg font-bold uppercase tracking-wide"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  fontFamily: `var(--font-${designSettings.titleFont})`
                }}
              >
                {posterData.sectionTitles?.[4] || "References"}
              </h2>
            </div>
            
            <div 
              className="p-4 rounded-b-lg border-2"
              style={{ 
                backgroundColor: designSettings.keyPointsBgColor,
                borderColor: designSettings.sectionBgColor
              }}
            >
              <div 
                className="text-xs leading-relaxed whitespace-pre-line"
                style={{ 
                  color: designSettings.keyPointsTextColor,
                  fontFamily: `var(--font-${designSettings.contentFont})`
                }}
                dangerouslySetInnerHTML={{
                  __html: posterData.references.replace(/\n/g, '<br>')
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataVisualizationLayout;
