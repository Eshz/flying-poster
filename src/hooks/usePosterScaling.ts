
import { useEffect, useRef } from 'react';
import { useIsMobile } from './use-mobile';

interface UsePosterScalingProps {
  manualZoom: number;
  onContainerScaleChange?: (scale: number) => void;
  posterUIWidth: number;
  posterUIHeight: number;
  a0WidthPx: number;
  a0HeightPx: number;
  containerRef?: React.RefObject<HTMLElement>;
}

export const usePosterScaling = ({
  manualZoom,
  onContainerScaleChange,
  posterUIWidth,
  posterUIHeight,
  a0WidthPx,
  a0HeightPx,
  containerRef
}: UsePosterScalingProps) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const calculateScale = () => {
      if (!posterRef.current) return;

      let container: HTMLElement | null = null;
      if (containerRef && containerRef.current) {
        container = containerRef.current;
      } else {
        container = posterRef.current.parentElement?.parentElement?.parentElement || null;
      }
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      if (containerRect.width === 0 || containerRect.height === 0) return;
      
      // Calculate what scale represents actual A0 size. This is the CSS scale for 100% zoom.
      const a0ScaleFactor = a0WidthPx / posterUIWidth;
      
      // Calculate fit-to-window scale - prioritize width fitting to prevent excessive height
      // Use different padding for mobile vs desktop
      const padding = isMobile ? 10 : 20;
      const availableWidth = containerRect.width - padding;
      const availableHeight = containerRect.height - padding;
      
      // Calculate CSS scale that maintains A0 aspect ratio while fitting within viewport
      const scaleX = availableWidth / posterUIWidth;
      const scaleY = availableHeight / posterUIHeight;
      
      // Use the smaller scale to maintain aspect ratio and prevent overflow, and add more margin
      const fitToWindowCssScale = Math.min(scaleX, scaleY) * 0.7;
      
      // The actual CSS scale applied is manualZoom (e.g. 1.0 for 100%) * a0ScaleFactor
      const actualScale = manualZoom * a0ScaleFactor;
      
      posterRef.current.style.transform = `scale(${actualScale})`;

      // Notify parent of the ZOOM LEVEL that corresponds to fitting to window.
      if (onContainerScaleChange) {
        // We want: zoomLevel * a0ScaleFactor = fitToWindowCssScale
        // So: zoomLevel = fitToWindowCssScale / a0ScaleFactor
        const fitToWindowZoomLevel = fitToWindowCssScale / a0ScaleFactor;
        onContainerScaleChange(fitToWindowZoomLevel);
      }
    };

    // Use ResizeObserver to trigger scaling when container is resized
    let resizeObserver: ResizeObserver | null = null;
    if (containerRef && containerRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        calculateScale();
      });
      resizeObserver.observe(containerRef.current);
    } else {
      // Fallback: listen to window resize
      window.addEventListener('resize', calculateScale);
      window.addEventListener('orientationchange', calculateScale);
    }

    // Initial calculation (in case container is already sized)
    setTimeout(calculateScale, 0);

    return () => {
      if (resizeObserver && containerRef && containerRef.current) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', calculateScale);
        window.removeEventListener('orientationchange', calculateScale);
      }
    };
  }, [manualZoom, onContainerScaleChange, posterUIWidth, posterUIHeight, a0WidthPx, a0HeightPx, isMobile, containerRef]);

  return { posterRef };
};
