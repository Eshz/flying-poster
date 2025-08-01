
import React from 'react';
import { posterTheme } from '@/constants/posterTheme';

interface ImagesDisplayProps {
  images: { url: string; visible: boolean; caption: string; upperCaption?: string }[];
  designSettings: any;
  className?: string;
}

const ImagesDisplay: React.FC<ImagesDisplayProps> = ({
  images,
  designSettings,
  className = ""
}) => {
  // Filter only visible images
  const visibleImages = images.filter(img => img.visible);
  
  if (visibleImages.length === 0) return null;
  
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: `${posterTheme.spacing.tileGap}pt` }}>
      {visibleImages.map((image, index) => (
        <div 
          key={index}
          style={{
            borderRadius: `${posterTheme.radius.tile}pt`,
            padding: `${posterTheme.spacing.sectionPadding}pt`,
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: `${posterTheme.spacing.headerMargin / 2}pt`,
          }}
        >
          {/* Upper Caption with title font and key takeaways color */}
          {image.upperCaption && (
            <div 
              style={{
                fontSize: `${posterTheme.fontSizes.body * 0.8}pt`,
                fontWeight: 700,
                color: designSettings.keyPointsTextColor,
                fontFamily: `var(--font-${designSettings.titleFont})`,
                textAlign: 'left',
                width: '100%',
                padding: `0 0 ${posterTheme.spacing.headerMargin / 2}pt 0`,
              }}
            >
              {image.upperCaption}
            </div>
          )}
          <div style={{ borderRadius: `${posterTheme.radius.tile}pt`, width: '100%', overflow: 'hidden' }}>
            <img 
              src={image.url} 
              alt={image.caption || image.upperCaption || `Image ${index + 1}`}
              style={{
                width: '100%',
                objectFit: 'contain',
                maxHeight: `${posterTheme.spacing.keyCircle * 3.5}pt`,
                display: 'block',
              }}
            />
          </div>
          {/* Caption below the image with content font and key takeaways color */}
          {image.caption && (
            <div 
              style={{
                fontSize: `${posterTheme.fontSizes.body * 0.8}pt`,
                color: designSettings.keyPointsTextColor,
                fontFamily: `var(--font-${designSettings.contentFont})`,
                textAlign: 'left',
                width: '100%',
                padding: `${posterTheme.spacing.headerMargin / 2}pt 0 0 0`,
              }}
            >
              {image.caption}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImagesDisplay;
