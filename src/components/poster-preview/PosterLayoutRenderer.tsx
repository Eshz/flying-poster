
import React from 'react';
import { PosterData, DesignSettings } from '@/types/project';
import { getFontClass } from '@/utils/fontUtils';
import ClassicLayout from './ClassicLayout';
import ModernLayout from './ModernLayout';
import FocusLayout from './FocusLayout';
import AcademicModernLayout from './AcademicModernLayout';
import MinimalistCleanLayout from './MinimalistCleanLayout';
import DataVisualizationLayout from './DataVisualizationLayout';
import ExecutiveSummaryLayout from './ExecutiveSummaryLayout';

interface EnhancedDesignSettings extends DesignSettings {
  titleFontClass: string;
  contentFontClass: string;
}

interface PosterLayoutRendererProps {
  layout: string;
  posterData: PosterData;
  designSettings: DesignSettings;
  qrCodeUrl: string;
  showKeypoints: boolean;
  showQrCode: boolean;
}

const PosterLayoutRenderer: React.FC<PosterLayoutRendererProps> = React.memo(({
  layout,
  posterData,
  designSettings,
  qrCodeUrl,
  showKeypoints,
  showQrCode
}) => {
  const containerClasses = `${getFontClass('content', designSettings.titleFont, designSettings.contentFont)} w-full h-full`;

  const enhancedDesignSettings: EnhancedDesignSettings = {
    ...designSettings,
    titleFontClass: getFontClass('title', designSettings.titleFont, designSettings.contentFont),
    contentFontClass: getFontClass('content', designSettings.titleFont, designSettings.contentFont)
  };

  // Check if this is the Academic Modern style specifically
  const isAcademicModern = designSettings.headerBgColor === "#FFFFFF" && 
                          designSettings.sectionBgColor === "#3B82F6" &&
                          designSettings.keyPointsBgColor === "#EFF6FF";

  // Common container with design settings data attribute for ALL layouts
  const renderLayout = (LayoutComponent: React.ComponentType<any>) => (
    <div 
      className={containerClasses}
      data-design-settings={JSON.stringify(enhancedDesignSettings)}
    >
      <LayoutComponent 
        posterData={posterData}
        designSettings={enhancedDesignSettings}
        qrCodeUrl={qrCodeUrl}
        showKeypoints={showKeypoints}
        showQrCode={showQrCode}
      />
    </div>
  );

  if (isAcademicModern) {
    return renderLayout(AcademicModernLayout);
  }

  switch(layout) {
    case 'minimalist':
      return renderLayout(MinimalistCleanLayout);
    case 'data-viz':
      return renderLayout(DataVisualizationLayout);
    case 'executive':
      return renderLayout(ExecutiveSummaryLayout);
    case 'modern':
      return renderLayout(ModernLayout);
    case 'focus':
      return renderLayout(FocusLayout);
    case 'classic':
    default:
      return renderLayout(ClassicLayout);
  }
});

PosterLayoutRenderer.displayName = 'PosterLayoutRenderer';

export default PosterLayoutRenderer;
