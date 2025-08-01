
import { useMemo } from 'react';
import { PosterData } from '@/types/project';
import { CONTENT_DENSITY_THRESHOLDS } from '@/constants/layout';

export type ContentDensity = 'low' | 'medium' | 'high';

export const useLayoutManager = (posterData: PosterData, visibleKeyPoints: any[]) => {
  const contentDensity: ContentDensity = useMemo(() => {
    const sections = [
      posterData?.introduction || "",
      posterData?.methods || "",
      posterData?.findings || "",
      posterData?.conclusions || "",
      posterData?.references || ""
    ];
    
    const totalContent = sections.reduce((acc, section) => acc + section.length, 0);
    
    if (totalContent > CONTENT_DENSITY_THRESHOLDS.HIGH) return 'high';
    if (totalContent > CONTENT_DENSITY_THRESHOLDS.MEDIUM) return 'medium';
    return 'low';
  }, [posterData]);

  const layoutConfig = useMemo(() => {
    const hasImages = posterData.images && posterData.images.filter(img => img.visible).length > 0;
    const visibleImages = posterData.images?.filter(img => img.visible) || [];
    
    return {
      hasImages,
      visibleImages,
      shouldUseThreeColumn: hasImages && visibleImages.length > 2,
      keyPointCols: contentDensity === 'high' ? 'grid-cols-4' : 
                   contentDensity === 'medium' ? 'grid-cols-3' : 'grid-cols-2',
      contentDensity
    };
  }, [posterData.images, contentDensity]);

  return {
    contentDensity,
    layoutConfig
  };
};
