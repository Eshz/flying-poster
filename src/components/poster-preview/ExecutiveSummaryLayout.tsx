
import React from 'react';
import ImagesDisplay from './ImagesDisplay';

interface ExecutiveSummaryLayoutProps {
  posterData: any;
  designSettings: any;
  qrCodeUrl: string;
  showKeypoints: boolean;
  showQrCode: boolean;
}

const ExecutiveSummaryLayout: React.FC<ExecutiveSummaryLayoutProps> = ({
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
      title: posterData.sectionTitles?.[1] || "Objectives", 
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
    <div className="flex gap-5 h-full p-5" style={{ backgroundColor: "#F7F9FC" }}>
      {/* Left Column - Content Sections */}
      <div className="w-3/5 space-y-5 overflow-auto">
        {activeSections.map((section, index) => (
          <div key={index} className="relative">
            {/* Section with rounded corners and shadow */}
            <div 
              className="rounded-lg shadow-md overflow-hidden"
              style={{ backgroundColor: "white" }}
            >
              {/* Header with gradient */}
              <div 
                className="px-6 py-4"
                style={{ 
                  background: `linear-gradient(135deg, ${designSettings.sectionBgColor}, ${designSettings.headerBgColor})`
                }}
              >
                <h2 
                  className="text-lg font-bold uppercase tracking-wider"
                  style={{ 
                    color: designSettings.sectionTitleColor,
                    fontFamily: `var(--font-${designSettings.titleFont})`
                  }}
                >
                  {section.title}
                </h2>
              </div>
              
              {/* Content */}
              <div className="px-6 py-5">
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
          </div>
        ))}
        
        {/* Images section */}
        {posterData.images && posterData.images.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <ImagesDisplay 
              images={posterData.images} 
              designSettings={designSettings}
            />
          </div>
        )}
      </div>

      {/* Right Column - Key Statistics and Info */}
      <div className="w-2/5 space-y-5 overflow-auto">
        {/* Key Statistics */}
        {showKeypoints && posterData.keypoints && posterData.keypoints.some((point: string) => point?.trim()) && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div 
              className="px-6 py-4 text-center"
              style={{ 
                background: `linear-gradient(135deg, ${designSettings.sectionBgColor}, ${designSettings.headerBgColor})`
              }}
            >
              <h2 
                className="text-lg font-bold uppercase tracking-wider"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  fontFamily: `var(--font-${designSettings.titleFont})`
                }}
              >
                Key Statistics
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              {posterData.keypoints.map((point: string, index: number) => {
                const isVisible = posterData.keyVisibility?.[index] !== false;
                if (!point?.trim() || !isVisible) return null;
                
                return (
                  <div key={index} className="text-center">
                    {/* Large percentage/number style display */}
                    <div 
                      className="text-4xl font-bold mb-2"
                      style={{ 
                        color: designSettings.sectionBgColor,
                        fontFamily: `var(--font-${designSettings.titleFont})`
                      }}
                    >
                      {index === 0 ? "85%" : index === 1 ? "72%" : index === 2 ? "65%" : `${90 - index * 5}%`}
                    </div>
                    
                    <h3 
                      className="text-sm font-bold mb-2 uppercase tracking-wide"
                      style={{ 
                        color: designSettings.sectionTextColor,
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
                    
                    {/* Progress bar */}
                    <div className="mt-3 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{ 
                          backgroundColor: designSettings.sectionBgColor,
                          width: index === 0 ? "85%" : index === 1 ? "72%" : index === 2 ? "65%" : `${90 - index * 5}%`
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* References */}
        {posterData.references?.trim() && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div 
              className="px-6 py-4"
              style={{ 
                background: `linear-gradient(135deg, ${designSettings.sectionBgColor}, ${designSettings.headerBgColor})`
              }}
            >
              <h2 
                className="text-lg font-bold uppercase tracking-wider"
                style={{ 
                  color: designSettings.sectionTitleColor,
                  fontFamily: `var(--font-${designSettings.titleFont})`
                }}
              >
                {posterData.sectionTitles?.[4] || "References"}
              </h2>
            </div>
            
            <div className="p-6">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutiveSummaryLayout;
