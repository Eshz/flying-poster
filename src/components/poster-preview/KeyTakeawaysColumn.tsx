
import React from 'react';

interface KeyTakeawaysColumnProps {
  posterData: any;
  designSettings: any;
  showKeypoints: boolean;
  keyTakeawayColors: Array<{
    bg: string;
    textColor: string;
  }>;
}

const KeyTakeawaysColumn: React.FC<KeyTakeawaysColumnProps> = ({
  posterData,
  designSettings,
  showKeypoints,
  keyTakeawayColors
}) => {
  // Hide the entire column if keypoints are disabled or empty
  if (!showKeypoints || !posterData.keypoints || !posterData.keypoints.some((point: string) => point?.trim())) {
    return <div className="h-full flex flex-col"></div>;
  }

  return (
    <div className="h-full flex flex-col">
      {/* Key Takeaways Title with lines */}
      <div className="flex items-center gap-2 pb-3 flex-shrink-0">
        <div className="flex-1 h-0.5 bg-gray-800"></div>
        <h2 
          className="text-sm font-bold text-center whitespace-nowrap px-2"
          style={{ 
            color: "#202B5B",
            fontFamily: `var(--font-${designSettings.titleFont})`
          }}
        >
          Key Takeaways
        </h2>
        <div className="flex-1 h-0.5 bg-gray-800"></div>
      </div>
      
      {/* Key Takeaways Items - stretches to fill remaining space */}
      <div className="flex-1 space-y-2 overflow-auto min-h-0">
        {posterData.keypoints.map((point: string, index: number) => {
          const isVisible = posterData.keyVisibility?.[index] !== false;
          if (!point?.trim() || !isVisible) return null;
          
          const colors = keyTakeawayColors[index] || keyTakeawayColors[0];
          
          return (
            <div key={index} className="flex min-h-[60px]">
              {/* Number Circle */}
              <div 
                className="w-12 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: colors.bg }}
              >
                <span 
                  className="text-lg font-bold"
                  style={{ 
                    color: colors.textColor,
                    fontFamily: `var(--font-${designSettings.titleFont})`
                  }}
                >
                  {index + 1}
                </span>
              </div>
              
              {/* Content */}
              <div 
                className="flex-1 p-2 flex flex-col justify-center gap-1"
                style={{ backgroundColor: "#F2F2F2" }}
              >
                <h3 
                  className="text-xs font-black leading-tight"
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

export default KeyTakeawaysColumn;
