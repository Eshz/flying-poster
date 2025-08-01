
import React from 'react';

interface KeyTakeawaysSectionProps {
  posterData: any;
  designSettings: any;
  keyTakeawayColors: Array<{
    bg: string;
    textColor: string;
  }>;
  showKeypoints: boolean;
}

const KeyTakeawaysSection: React.FC<KeyTakeawaysSectionProps> = ({
  posterData,
  designSettings,
  keyTakeawayColors,
  showKeypoints
}) => {
  if (!showKeypoints || !posterData.keypoints || !posterData.keypoints.some((point: string) => point?.trim())) {
    return null;
  }

  // Filter visible key points
  const visibleKeyPoints = posterData.keypoints
    .map((point: string, index: number) => ({ point, index }))
    .filter(({ point, index }) => point?.trim() && posterData.keyVisibility?.[index] !== false);

  if (visibleKeyPoints.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Key Takeaways Title with lines */}
      <div className="flex items-center gap-4 pb-2 flex-shrink-0">
        <div className="flex-1 h-0.5 bg-gray-800"></div>
        <h2 
          className="text-lg font-bold text-center whitespace-nowrap"
          style={{ 
            color: "#202B5B",
            fontFamily: `var(--font-${designSettings.titleFont})`
          }}
        >
          Key Takeaways
        </h2>
        <div className="flex-1 h-0.5 bg-gray-800"></div>
      </div>
      
      {/* Key Takeaways Items - flexible height with better spacing */}
      <div className="flex-1 space-y-3 overflow-auto min-h-0">
        {visibleKeyPoints.map(({ point, index }) => {
          const colors = keyTakeawayColors[index] || keyTakeawayColors[0];
          
          return (
            <div key={index} className="flex min-h-[80px]">
              {/* Number Circle */}
              <div 
                className="w-16 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: colors.bg }}
              >
                <span 
                  className="text-3xl font-bold"
                  style={{ 
                    color: colors.textColor,
                    fontFamily: `var(--font-${designSettings.titleFont})`
                  }}
                >
                  {visibleKeyPoints.findIndex(item => item.index === index) + 1}
                </span>
              </div>
              
              {/* Content - adaptive height */}
              <div 
                className="flex-1 p-4 flex flex-col justify-center gap-2"
                style={{ backgroundColor: "#F2F2F2" }}
              >
                <h3 
                  className="text-sm font-black leading-tight"
                  style={{ 
                    color: "#202B5B",
                    fontFamily: `var(--font-${designSettings.titleFont})`
                  }}
                >
                  {point}
                </h3>
                {posterData.keyDescriptions?.[index] && (
                  <p 
                    className="text-xs leading-relaxed"
                    style={{ 
                      color: "#202B5B",
                      fontFamily: `var(--font-${designSettings.contentFont})`
                    }}
                  >
                    {posterData.keyDescriptions[index]}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeyTakeawaysSection;
