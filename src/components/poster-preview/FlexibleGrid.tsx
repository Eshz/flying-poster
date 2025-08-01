
import React from 'react';

interface FlexibleGridProps {
  children: React.ReactNode;
  minColumnWidth?: number;
  maxColumns?: number;
  gap?: number;
  className?: string;
  autoFit?: boolean;
}

const FlexibleGrid: React.FC<FlexibleGridProps> = ({
  children,
  minColumnWidth = 250,
  maxColumns = 4,
  gap = 12,
  className = '',
  autoFit = true
}) => {
  const gridStyle = autoFit ? {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}px, 1fr))`,
    gap: `${gap}px`,
    gridAutoFlow: 'row dense', // This helps fill gaps
  } : {
    display: 'grid',
    gridTemplateColumns: `repeat(${maxColumns}, 1fr)`,
    gap: `${gap}px`,
    gridAutoFlow: 'row dense'
  };

  return (
    <div 
      className={className}
      style={gridStyle}
    >
      {children}
    </div>
  );
};

export default FlexibleGrid;
