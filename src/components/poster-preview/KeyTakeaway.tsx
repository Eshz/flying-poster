
import React from 'react';

interface KeyTakeawayProps {
  number: number;
  title: string;
  description: string;
  designSettings: any;
  className?: string;
  titleSizeClass?: string;
  textSizeClass?: string;
  circleSize?: string;
  useCircleText?: boolean;
  listMode?: boolean;
  visible?: boolean;
}

const KeyTakeaway: React.FC<KeyTakeawayProps> = ({
  number,
  title,
  description,
  designSettings,
  className = "p-2 rounded flex flex-col",
  titleSizeClass = "text-sm",
  textSizeClass = "text-xs",
  circleSize = "2rem",
  useCircleText = false,
  listMode = false,
  visible = true
}) => {
  // Don't render if not visible
  if (!visible) {
    return null;
  }

  if (listMode) {
    return (
      <div className="flex items-start gap-4 py-3 border-b border-gray-200 last:border-b-0">
        {/* Left cell - Number */}
        <div className="flex-shrink-0 w-12 flex justify-center">
          <div 
            className="rounded-full flex items-center justify-center text-lg font-bold"
            style={{ 
              backgroundColor: designSettings.keyPointsTextColor || designSettings.sectionTitleColor, 
              color: designSettings.sectionBgColor,
              width: circleSize,
              height: circleSize,
              minWidth: circleSize,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            {number}
          </div>
        </div>
        
        {/* Right cell - Content */}
        <div className="flex-1">
          <h3 
            className={`${titleSizeClass} font-bold mb-1`}
            style={{ 
              color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor,
              fontFamily: `var(--font-${designSettings.titleFont})`
            }}
          >
            {title}
          </h3>
          <p 
            className={textSizeClass}
            style={{ 
              color: designSettings.sectionTextColor,
              fontFamily: `var(--font-${designSettings.contentFont})`
            }}
          >
            {description}
          </p>
        </div>
      </div>
    );
  }

  // Original grid mode
  return (
    <div 
      className={className}
      style={{ backgroundColor: designSettings.keyPointsBgColor || '#f5f7ff' }}
    >
      <div className="flex items-start mb-1">
        <div 
          data-circle-number="true"
          className={`rounded-full flex items-center justify-center text-lg font-bold mr-1 flex-shrink-0 ${useCircleText ? 'text-xl' : ''}`}
          style={{ 
            backgroundColor: designSettings.keyPointsTextColor || designSettings.sectionTitleColor, 
            color: designSettings.sectionBgColor,
            width: circleSize,
            height: circleSize,
            minWidth: circleSize,
            fontFamily: `var(--font-${designSettings.titleFont})`
          }}
        >
          {number}
        </div>
        <h3 
          className={`${titleSizeClass} font-bold`}
          style={{ 
            color: designSettings.keyPointsTextColor || designSettings.sectionTitleColor,
            fontFamily: `var(--font-${designSettings.titleFont})`
          }}
        >
          {title}
        </h3>
      </div>
      <p 
        className={textSizeClass}
        style={{ 
          color: designSettings.sectionTextColor,
          fontFamily: `var(--font-${designSettings.contentFont})`
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default KeyTakeaway;
