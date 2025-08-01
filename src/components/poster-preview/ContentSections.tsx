
import React from 'react';

interface ContentSectionsProps {
  activeSections: Array<{
    title: string;
    content: string;
    headerBg: string;
    headerTextColor: string;
    contentBg: string;
    contentTextColor: string;
  }>;
  designSettings: any;
  shouldLeftStretch: boolean;
  shouldRedistribute: boolean;
}

const ContentSections: React.FC<ContentSectionsProps> = ({
  activeSections,
  designSettings,
  shouldLeftStretch,
  shouldRedistribute
}) => {
  return (
    <>
      {activeSections.map((section, index) => {
        const isLast = index === activeSections.length - 1;
        const shouldStretch = shouldLeftStretch && isLast;
        
        // Determine if this section should expand based on content length
        const isLongContent = section.content && section.content.length > 800;
        const shouldExpandForContent = shouldRedistribute && isLongContent;
        
        return (
          <div 
            key={index} 
            className={`flex flex-col ${shouldStretch || shouldExpandForContent ? 'flex-1' : 'flex-shrink-0'}`}
            style={{ minHeight: shouldExpandForContent ? '200px' : 'auto' }}
          >
            {/* Section Header */}
            <div 
              className="px-4 py-3 border-b-2 border-white flex-shrink-0"
              style={{ 
                backgroundColor: section.headerBg,
                borderBottomColor: section.headerTextColor === "#FFFFFF" ? "#FFFFFF" : "#202B5B"
              }}
            >
              <h2 
                className="text-lg font-bold"
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
              className={`p-4 flex-1 overflow-auto ${shouldStretch || shouldExpandForContent ? 'min-h-0' : ''}`}
              style={{ backgroundColor: section.contentBg }}
            >
              <p 
                className="text-sm leading-relaxed"
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
    </>
  );
};

export default ContentSections;
