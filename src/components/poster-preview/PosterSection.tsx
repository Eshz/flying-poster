
import React from 'react';

interface PosterSectionProps {
  title: string;
  content: string;
  designSettings: any;
  className?: string;
  isPreLine?: boolean;
  titleSizeClass?: string;
  textSizeClass?: string;
}

const PosterSection: React.FC<PosterSectionProps> = ({
  title,
  content,
  designSettings,
  className = "p-3 rounded flex-grow overflow-auto",
  isPreLine = false,
  titleSizeClass = "text-lg md:text-xl",
  textSizeClass = "text-xs md:text-sm"
}) => {
  return (
    <div 
      className={className}
      style={{ backgroundColor: designSettings.sectionBgColor }}
    >
      <h2 
        className={`${titleSizeClass} font-semibold mb-1`}
        style={{ 
          color: designSettings.sectionTitleColor,
          fontFamily: `var(--font-${designSettings.titleFont})`
        }}
      >
        {title}
      </h2>
      <p 
        className={`${textSizeClass} ${isPreLine ? 'whitespace-pre-line' : ''}`}
        style={{ 
          color: designSettings.sectionTextColor,
          fontFamily: `var(--font-${designSettings.contentFont})`
        }}
      >
        {content}
      </p>
    </div>
  );
};

export default PosterSection;
