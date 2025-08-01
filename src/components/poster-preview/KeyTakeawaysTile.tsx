
import React from 'react';
import { posterTheme } from '@/constants/posterTheme';

interface KeyTakeawaysTileProps {
  posterData: any;
  designSettings: any;
  showKeypoints: boolean;
  keyTakeawayColors?: Array<{
    bg: string;
    textColor: string;
  }>;
  isCompact?: boolean; // For landscape mode
}

const KeyTakeawaysTile: React.FC<KeyTakeawaysTileProps> = ({
  posterData,
  designSettings,
  showKeypoints,
  keyTakeawayColors = [
    { bg: "#FF6B6B", textColor: "#FFFFFF" },
    { bg: "#4ECDC4", textColor: "#FFFFFF" },
    { bg: "#45B7D1", textColor: "#FFFFFF" },
    { bg: "#96CEB4", textColor: "#FFFFFF" },
    { bg: "#FFEAA7", textColor: "#2D3436" }
  ],
  isCompact = false
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
      <div className="flex items-center gap-2 pb-3 flex-shrink-0">
        <div style={{ flex: 1, height: posterTheme.border.keyTakeaway, background: '#264796' }} />
        <h2 
          style={{
            color: "#202B5B",
            fontFamily: `var(--font-${designSettings.titleFont})`,
            fontSize: `${posterTheme.fontSizes.sectionHeader * 0.88}pt`,
            fontWeight: 900,
            letterSpacing: '0.2pt',
            margin: 0,
            textAlign: 'center',
            padding: `0 ${posterTheme.spacing.keyTakeawayMargin}pt`,
          }}
        >
          Key Takeaways
        </h2>
        <div style={{ flex: 1, height: posterTheme.border.keyTakeaway, background: '#264796' }} />
      </div>
      {/* Key Takeaways Items */}
      <div className="flex-1" style={{ gap: `${posterTheme.spacing.keyTakeawayMargin}pt`, display: 'flex', flexDirection: 'column' }}>
        {visibleKeyPoints.map(({ point, index }, displayIndex) => {
          const colors = keyTakeawayColors[index] || keyTakeawayColors[0];
          return (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              background: '#F7F8FA',
              borderRadius: `${posterTheme.radius.keyTakeaway}pt`,
              marginBottom: `${posterTheme.spacing.keyTakeawayMargin}pt`,
              minHeight: `${posterTheme.spacing.keyCircle * 1.3}pt`,
              border: `${posterTheme.border.keyTakeaway}pt solid #E0E6F6`,
              boxShadow: '0 2px 8px rgba(38,71,150,0.06)',
              padding: 0,
            }}>
              {/* Number Circle */}
              <div 
                style={{
                  width: `${posterTheme.spacing.keyCircle}pt`,
                  height: `${posterTheme.spacing.keyCircle}pt`,
                  borderRadius: `${posterTheme.spacing.keyCircle / 2}pt`,
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: `${posterTheme.spacing.keyCircle / 3.5}pt`,
                  background: colors.bg,
                  display: 'flex',
                }}
              >
                <span 
                  style={{
                    fontSize: `${posterTheme.spacing.keyCircleText}pt`,
                    fontWeight: 900,
                    color: colors.textColor,
                    fontFamily: `var(--font-${designSettings.titleFont})`,
                    letterSpacing: '0.1pt',
                  }}
                >
                  {displayIndex + 1}
                </span>
              </div>
              {/* Content */}
              <div 
                style={{
                  flex: 1,
                  padding: `${posterTheme.spacing.keyCircle / 4.5}pt ${posterTheme.spacing.keyCircle / 3.5}pt`,
                }}
              >
                <h3 
                  style={{
                    fontSize: `${posterTheme.fontSizes.keyTakeaway}pt`,
                    fontWeight: 900,
                    color: '#264796',
                    fontFamily: `var(--font-${designSettings.titleFont})`,
                    marginBottom: `${posterTheme.spacing.keyCircle / 14}pt`,
                    letterSpacing: '0.1pt',
                    margin: 0,
                  }}
                >
                  {point}
                </h3>
                {posterData.keyDescriptions?.[index] && (
                  <p 
                    style={{
                      fontSize: `${posterTheme.fontSizes.body * 0.73}pt`,
                      color: '#264796',
                      fontFamily: `var(--font-${designSettings.contentFont})`,
                      fontWeight: 400,
                      margin: 0,
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

export default KeyTakeawaysTile;
