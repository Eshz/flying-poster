
import React from 'react';

interface ReferencesFormatterProps {
  references: string;
  designSettings: any;
  sectionTitle?: string;
}

const ReferencesFormatter: React.FC<ReferencesFormatterProps> = ({
  references,
  designSettings,
  sectionTitle = "5. References"
}) => {
  // Format references for proper list display
  const formatReferences = (text: string) => {
    // Split by lines and filter out empty lines
    const lines = text.split('\n').filter(line => line.trim());
    
    return lines.map((line, index) => (
      <li key={index} className="mb-1">
        <p className="text-sm leading-relaxed" style={{ 
          color: "#FFFFFF",
          fontFamily: `var(--font-${designSettings.contentFont})`
        }}>
          {line.trim()}
        </p>
      </li>
    ));
  };

  // Generate unique CSS for this component instance
  const uniqueId = `references-formatter-${Math.random().toString(36).substr(2, 9)}`;

  if (!references?.trim()) {
    return null;
  }

  return (
    <div className={`flex flex-col flex-1 min-h-0 ${uniqueId}`}>
      <style>
        {`
          .${uniqueId} ul.paragraph-list li::marker {
            color: #FFFFFF;
            font-family: var(--font-${designSettings.contentFont});
            font-weight: normal;
          }
        `}
      </style>
      
      {/* References Header */}
      <div 
        className="px-4 py-3 border-b-2 border-white flex-shrink-0"
        style={{ 
          backgroundColor: "#3E3C72",
          borderBottomColor: "#FFFFFF"
        }}
      >
        <h2 
          className="text-lg font-bold"
          style={{ 
            color: "#FFFFFF",
            fontFamily: `var(--font-${designSettings.titleFont})`
          }}
        >
          {sectionTitle}
        </h2>
      </div>
      
      {/* References Content - stretches to fill remaining space */}
      <div 
        className="p-4 flex-1 overflow-auto"
        style={{ backgroundColor: "#3E3C72" }}
      >
        <ul 
          className="paragraph-list list-disc pl-4 space-y-1"
          style={{
            color: "#FFFFFF",
            fontFamily: `var(--font-${designSettings.contentFont})`
          }}
        >
          {formatReferences(references)}
        </ul>
      </div>
    </div>
  );
};

export default ReferencesFormatter;
