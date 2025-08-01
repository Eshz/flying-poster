
import React from 'react';

interface SectionColumnProps {
  sections: Array<{
    title: string;
    content: string;
    headerBg: string;
    headerTextColor: string;
    contentBg: string;
    contentTextColor: string;
  }>;
  designSettings: any;
}

const SectionColumn: React.FC<SectionColumnProps> = ({
  sections,
  designSettings
}) => {
  if (!sections || sections.length === 0) {
    return <div className="h-full"></div>;
  }

  return (
    <div className="h-full flex flex-col gap-2">
      {sections.map((section, index) => {
        const isLast = index === sections.length - 1;
        
        return (
          <div 
            key={index} 
            className={`flex flex-col ${sections.length === 1 ? 'flex-1' : isLast ? 'flex-1' : 'flex-shrink-0'}`}
          >
            {/* Section Header */}
            <div 
              className="px-3 py-2 border-b-2 border-white flex-shrink-0"
              style={{ 
                backgroundColor: section.headerBg,
                borderBottomColor: section.headerTextColor === "#FFFFFF" ? "#FFFFFF" : "#202B5B"
              }}
            >
              <h2 
                className="text-sm font-bold"
                style={{ 
                  color: section.headerTextColor,
                  fontFamily: `var(--font-${designSettings.titleFont})`
                }}
              >
                {section.title}
              </h2>
            </div>
            
            {/* Section Content - stretches to fill available space */}
            <div 
              className="p-3 flex-1 overflow-auto min-h-0"
              style={{ backgroundColor: section.contentBg }}
            >
              <p 
                className="text-xs leading-relaxed"
                style={{ 
                  color: section.contentTextColor,
                  fontFamily: `var(--font-${designSettings.contentFont})`
                }}
              >
                {section.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SectionColumn;
