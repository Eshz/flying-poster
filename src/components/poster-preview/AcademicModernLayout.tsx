
import React from 'react';
import AcademicModernLandscapeLayout from './AcademicModernLandscapeLayout';
import AcademicModernPortraitLayout from './AcademicModernPortraitLayout';
import { getSectionsConfig, getKeyTakeawayColors, calculateContentBalance } from './academicModernUtils';

interface AcademicModernLayoutProps {
  posterData: any;
  designSettings: any;
  qrCodeUrl: string;
  showKeypoints: boolean;
  showQrCode: boolean;
}

const AcademicModernLayout: React.FC<AcademicModernLayoutProps> = ({
  posterData,
  designSettings,
  qrCodeUrl,
  showKeypoints,
  showQrCode
}) => {
  const isLandscape = designSettings.orientation === 'landscape';
  
  const sections = getSectionsConfig(posterData);
  const activeSections = sections.filter(section => section.content?.trim());
  const keyTakeawayColors = getKeyTakeawayColors();
  
  if (isLandscape) {
    return (
      <AcademicModernLandscapeLayout
        posterData={posterData}
        designSettings={designSettings}
        showKeypoints={showKeypoints}
        activeSections={activeSections}
        keyTakeawayColors={keyTakeawayColors}
      />
    );
  }

  // Portrait Layout
  const shouldLeftStretch = calculateContentBalance(posterData, activeSections);

  return (
    <AcademicModernPortraitLayout
      posterData={posterData}
      designSettings={designSettings}
      showKeypoints={showKeypoints}
      activeSections={activeSections}
      keyTakeawayColors={keyTakeawayColors}
      shouldLeftStretch={shouldLeftStretch}
    />
  );
};

export default AcademicModernLayout;
