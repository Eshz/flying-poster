
import React from 'react';
import { posterTheme } from '@/constants/posterTheme';

interface ReferencesTileProps {
  posterData: any;
  designSettings: any;
  isCompact?: boolean; // For landscape mode
}

const ReferencesTile: React.FC<ReferencesTileProps> = ({
  posterData,
  designSettings,
  isCompact = false
}) => {
  // Hide if references are disabled or empty
  if (posterData.showReferences === false || !posterData.references?.trim()) {
    return null;
  }

  // Convert plain text references to list items
  const formatReferences = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    
    return lines.map((line, index) => (
      <li key={index} style={{ marginBottom: `${posterTheme.spacing.referenceMargin / 3}pt` }}>
        <p 
          style={{
            fontSize: `${posterTheme.fontSizes.reference}pt`,
            color: '#FFFFFF',
            fontFamily: `var(--font-${designSettings.contentFont})`,
            lineHeight: 1.4,
            fontWeight: 400,
            margin: 0,
          }}
        >
          {line.trim()}
        </p>
      </li>
    ));
  };

  return (
    <div className="flex flex-col h-full">
      {/* References Header */}
      <div 
        style={{
          backgroundColor: '#3E3C72',
          borderBottom: `2pt solid #FFFFFF`,
          borderRadius: `${posterTheme.radius.reference}pt ${posterTheme.radius.reference}pt 0 0`,
          padding: `${posterTheme.spacing.sectionPadding}pt`,
        }}
      >
        <h2 
          style={{
            fontSize: `${posterTheme.fontSizes.sectionHeader * 0.69}pt`,
            fontWeight: 900,
            color: '#FFFFFF',
            fontFamily: `var(--font-${designSettings.titleFont})`,
            marginBottom: `${posterTheme.spacing.referenceMargin}pt`,
            letterSpacing: '0.1pt',
            margin: 0,
          }}
        >
          {posterData.sectionTitles?.[4] || 'References'}
        </h2>
      </div>
      {/* References Content */}
      <div 
        style={{
          backgroundColor: '#3E3C72',
          borderRadius: `0 0 ${posterTheme.radius.reference}pt ${posterTheme.radius.reference}pt`,
          padding: `${posterTheme.spacing.sectionPadding}pt`,
          flex: 1,
        }}
      >
        <ul 
          style={{
            color: '#FFFFFF',
            fontFamily: `var(--font-${designSettings.contentFont})`,
            fontSize: `${posterTheme.fontSizes.reference}pt`,
            paddingLeft: '1.5em',
            margin: 0,
            listStyleType: 'disc',
          }}
        >
          {formatReferences(posterData.references)}
        </ul>
      </div>
    </div>
  );
};

export default ReferencesTile;
