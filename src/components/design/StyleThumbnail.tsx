
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { PosterStyle } from '@/data/posterStyles';

interface StyleThumbnailProps {
  style: PosterStyle;
  isSelected: boolean;
  onApplyStyle: (style: PosterStyle) => void;
}

const StyleThumbnail: React.FC<StyleThumbnailProps> = React.memo(({ 
  style, 
  isSelected, 
  onApplyStyle 
}) => {
  const isAcademicModern = style.id === "academic-modern";

  return (
    <Button
      variant="outline"
      className={`h-auto p-0 border-2 hover:border-blue-500 transition-all duration-200 overflow-hidden relative ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : ''
      }`}
      onClick={() => onApplyStyle(style)}
    >
      {isSelected && (
        <div className="absolute top-1 right-1 z-10 bg-blue-500 text-white rounded-full p-1">
          <Check className="h-3 w-3" />
        </div>
      )}
      
      <div className="w-full h-24 flex flex-col">
        {/* Header */}
        <div 
          className="h-6 w-full flex items-center justify-center text-xs font-bold"
          style={{ 
            backgroundColor: style.headerBgColor, 
            color: style.headerTextColor,
            fontFamily: style.titleFont === 'playfair' ? 'Playfair Display' : 
                       style.titleFont === 'merriweather' ? 'Merriweather' :
                       style.titleFont === 'montserrat' ? 'Montserrat' :
                       style.titleFont === 'raleway' ? 'Raleway' : 'sans-serif',
            border: isAcademicModern ? '1px solid #E5E7EB' : 'none'
          }}
        >
          Title
        </div>
        
        {/* Content Area */}
        <div 
          className="flex-1 p-1 flex gap-1"
          style={{ backgroundColor: isAcademicModern ? '#F9FAFB' : style.sectionBgColor }}
        >
          {/* Academic Modern specific layout */}
          {isAcademicModern ? (
            <>
              <div className="w-2/3 h-full flex flex-col gap-1">
                <div className="h-1/2 bg-blue-500 rounded-sm"></div>
                <div className="h-1/2 bg-blue-500 rounded-sm"></div>
              </div>
              <div className="w-1/3 h-full bg-blue-100 rounded-sm"></div>
            </>
          ) : (
            <>
              {/* Minimalist layout */}
              {style.layout === 'minimalist' && (
                <>
                  <div className="w-2/3 h-full flex flex-col gap-1">
                    <div className="h-1/4 bg-white rounded-sm border"></div>
                    <div className="h-1/4 bg-white rounded-sm border"></div>
                    <div className="h-1/4 bg-white rounded-sm border"></div>
                    <div className="h-1/4 bg-white rounded-sm border"></div>
                  </div>
                  <div className="w-1/3 h-full bg-white rounded-sm border"></div>
                </>
              )}
              
              {/* Data visualization layout */}
              {style.layout === 'data-viz' && (
                <>
                  <div className="w-1/2 h-full flex flex-col gap-1">
                    <div className="h-1/3 bg-gray-200 rounded-sm"></div>
                    <div className="h-1/3 bg-gray-200 rounded-sm"></div>
                    <div className="h-1/3 bg-gray-200 rounded-sm"></div>
                  </div>
                  <div className="w-1/2 h-full flex flex-col gap-1">
                    <div className="h-1/2 bg-white rounded-sm border"></div>
                    <div className="h-1/2 bg-white rounded-sm border"></div>
                  </div>
                </>
              )}
              
              {/* Executive layout */}
              {style.layout === 'executive' && (
                <>
                  <div className="w-3/5 h-full flex flex-col gap-1">
                    <div className="h-1/4 bg-white rounded-sm shadow-sm"></div>
                    <div className="h-1/4 bg-white rounded-sm shadow-sm"></div>
                    <div className="h-1/4 bg-white rounded-sm shadow-sm"></div>
                    <div className="h-1/4 bg-white rounded-sm shadow-sm"></div>
                  </div>
                  <div className="w-2/5 h-full bg-white rounded-sm shadow-sm"></div>
                </>
              )}
              
              {/* Classic layout */}
              {style.layout === 'classic' && (
                <>
                  <div className="w-1/2 h-full bg-gray-200 rounded-sm"></div>
                  <div className="w-1/2 h-full bg-gray-200 rounded-sm"></div>
                </>
              )}
              
              {/* Modern layout */}
              {style.layout === 'modern' && (
                <>
                  <div className="w-1/3 h-full bg-gray-200 rounded-sm"></div>
                  <div className="w-1/3 h-full bg-gray-200 rounded-sm"></div>
                  <div className="w-1/3 h-full bg-gray-200 rounded-sm"></div>
                </>
              )}
              
              {/* Focus layout */}
              {style.layout === 'focus' && (
                <div className="w-2/3 h-full bg-gray-200 rounded-sm mx-auto"></div>
              )}
            </>
          )}
        </div>
        
        {/* Style Info */}
        <div className="p-1 text-xs text-center bg-white border-t">
          <div className="font-medium">{style.name}</div>
          <Badge variant="secondary" className="text-xs mt-1">
            {style.category}
          </Badge>
        </div>
      </div>
    </Button>
  );
});

StyleThumbnail.displayName = 'StyleThumbnail';

export default StyleThumbnail;
