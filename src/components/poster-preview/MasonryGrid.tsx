
import React, { useMemo, useRef, useEffect, useState } from 'react';

interface MasonryGridProps {
  children: React.ReactNode[];
  maxColumns?: number;
  gap?: number;
  className?: string;
  onColumnCountChange?: (columnCount: number) => void;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({
  children,
  maxColumns = 3,
  gap = 12,
  className = '',
  onColumnCountChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const { columnWrappers, optimalColumns } = useMemo(() => {
    // Calculate content density to determine optimal columns
    const calculateContentDensity = () => {
      let totalContentLength = 0;
      let itemCount = 0;
      
      children.forEach(child => {
        if (React.isValidElement(child)) {
          const props = child.props as any;
          // Check for content length in various props
          const content = props.content || props.children || '';
          if (typeof content === 'string') {
            totalContentLength += content.length;
          }
          itemCount++;
        }
      });
      
      return { totalContentLength, itemCount };
    };
    
    const { totalContentLength, itemCount } = calculateContentDensity();
    const avgContentLength = itemCount > 0 ? totalContentLength / itemCount : 0;
    
    // Always start from 2 columns - no 1 column layout
    let optimalCols = 2;
    if (itemCount <= 6 && avgContentLength < 800) {
      optimalCols = 2;
    } else if (itemCount <= 9 && avgContentLength < 1200) {
      optimalCols = Math.min(3, maxColumns);
    } else {
      optimalCols = maxColumns;
    }
    
    // Check if columns would be too wide (over 400px) and adjust accordingly
    if (containerWidth > 0) {
      const availableWidth = containerWidth - (gap * (optimalCols - 1));
      const columnWidth = availableWidth / optimalCols;
      
      // If column width exceeds 1192pt (equivalent to 400px in old preview), increase columns
      while (columnWidth > 1192 && optimalCols < maxColumns) {
        optimalCols++;
        const newAvailableWidth = containerWidth - (gap * (optimalCols - 1));
        const newColumnWidth = newAvailableWidth / optimalCols;
        if (newColumnWidth <= 1192) break;
      }
    }
    
    // Ensure we don't have more columns than items, but minimum 2
    const columns = Math.max(2, Math.min(optimalCols, itemCount, maxColumns));
    
    const columnArrays: React.ReactNode[][] = Array.from({ length: columns }, () => []);
    
    // Get item order for proper sequencing
    const getItemOrder = (child: React.ReactNode): number => {
      if (React.isValidElement(child)) {
        return child.props['data-order'] || 0;
      }
      return 0;
    };
    
    // Sort children by their order first
    const sortedChildren = [...children].sort((a, b) => {
      const orderA = getItemOrder(a);
      const orderB = getItemOrder(b);
      return orderA - orderB;
    });
    
    // Handle special positioning for References and Key Takeaways
    const referencesItem = sortedChildren.find(child => 
      React.isValidElement(child) && child.key === 'references'
    );
    
    const keyTakeawaysItem = sortedChildren.find(child => 
      React.isValidElement(child) && child.key === 'keytakeaways'
    );
    
    // Remove special items from sorted children for now
    const regularItems = sortedChildren.filter(child => 
      React.isValidElement(child) && 
      child.key !== 'references' && 
      child.key !== 'keytakeaways'
    );
    
    // Fill columns left-to-right: squeeze as many items as possible in each column before moving to next
    let currentColumn = 0;
    for (let i = 0; i < regularItems.length; i++) {
      columnArrays[currentColumn].push(regularItems[i]);
      
      // Only move to next column if current column has enough items and we have more columns available
      // This creates a more aggressive packing strategy
      const itemsInCurrentColumn = columnArrays[currentColumn].length;
      const remainingItems = regularItems.length - i - 1;
      const remainingColumns = columns - currentColumn - 1;
      
      // Move to next column only if we have remaining columns and the remaining items 
      // would leave other columns with at least 1 item each
      if (remainingColumns > 0 && remainingItems >= remainingColumns) {
        // Check if current column is getting too full compared to what's left
        const avgItemsPerRemainingColumn = Math.ceil(remainingItems / remainingColumns);
        if (itemsInCurrentColumn >= avgItemsPerRemainingColumn + 1) {
          currentColumn++;
        }
      }
    }
    
    // Place Key Takeaways in the rightmost column (but not at the very end)
    if (keyTakeawaysItem) {
      const rightmostColumnIndex = columns - 1;
      columnArrays[rightmostColumnIndex].push(keyTakeawaysItem);
    }
    
    // Always place References last in the rightmost column
    if (referencesItem) {
      const rightmostColumnIndex = columns - 1;
      columnArrays[rightmostColumnIndex].push(referencesItem);
    }
    
    return { columnWrappers: columnArrays, optimalColumns: columns };
  }, [children, maxColumns, containerWidth, gap]);

  // Notify parent of column count changes
  useEffect(() => {
    if (onColumnCountChange) {
      onColumnCountChange(optimalColumns);
    }
  }, [optimalColumns, onColumnCountChange]);

  return (
    <div 
      ref={containerRef}
      className={`flex ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {columnWrappers.map((columnChildren, columnIndex) => (
        <div 
          key={columnIndex}
          className="flex-1 flex flex-col"
          style={{ gap: `${gap}px` }}
        >
          {columnChildren}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
