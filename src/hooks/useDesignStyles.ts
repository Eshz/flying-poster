
import { useMemo, useCallback } from 'react';
import { DesignSettings } from '@/types/design';
import { PosterStyle, posterStyles } from '@/data/posterStyles';

export const useDesignStyles = (
  designSettings: DesignSettings,
  setDesignSettings: (settings: DesignSettings) => void
) => {
  const applyStyle = useCallback((style: PosterStyle) => {
    setDesignSettings({
      ...designSettings, // Preserve existing settings including orientation
      layout: style.layout,
      titleFont: style.titleFont,
      contentFont: style.contentFont,
      headerBgColor: style.headerBgColor,
      headerTextColor: style.headerTextColor,
      sectionBgColor: style.sectionBgColor,
      sectionTitleColor: style.sectionTitleColor,
      sectionTextColor: style.sectionTextColor,
      keyPointsBgColor: style.keyPointsBgColor,
      keyPointsTextColor: style.keyPointsTextColor
    });
  }, [designSettings, setDesignSettings]);

  const isStyleSelected = useCallback((style: PosterStyle): boolean => {
    return (
      designSettings.layout === style.layout &&
      designSettings.titleFont === style.titleFont &&
      designSettings.contentFont === style.contentFont &&
      designSettings.headerBgColor === style.headerBgColor &&
      designSettings.headerTextColor === style.headerTextColor &&
      designSettings.sectionBgColor === style.sectionBgColor &&
      designSettings.sectionTitleColor === style.sectionTitleColor &&
      designSettings.sectionTextColor === style.sectionTextColor &&
      designSettings.keyPointsBgColor === style.keyPointsBgColor &&
      designSettings.keyPointsTextColor === style.keyPointsTextColor
    );
  }, [designSettings]);

  const stylesData = useMemo(() => posterStyles, []);

  return {
    applyStyle,
    isStyleSelected,
    stylesData
  };
};
