import React, { useState, useEffect, useMemo, useRef } from "react";
import { PosterData, DesignSettings } from "@/types/project";
import PosterPreview from "@/components/PosterPreview";
import ZoomControls from "@/components/ZoomControls";
import { useIsMobile } from "@/hooks/use-mobile";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import ContentVisibilityWarning from "../poster-preview/ContentVisibilityWarning";
import { checkContentVisibility } from "@/utils/contentVisibilityChecker";
import { getPosterDimensions } from "@/utils/posterConstants";
import { posterTheme } from "@/constants/posterTheme";
import { usePosterScaling } from "@/hooks/usePosterScaling";

interface PosterPreviewAreaProps {
  posterData: PosterData;
  qrColor: string;
  designSettings: DesignSettings;
  manualZoom?: number;
  onZoomChange?: (zoom: number) => void;
  onContainerScaleChange?: (scale: number) => void;
}

const PosterPreviewArea: React.FC<PosterPreviewAreaProps> = React.memo(
  ({
    posterData,
    qrColor,
    designSettings,
    manualZoom: externalManualZoom,
    onZoomChange: externalOnZoomChange,
    onContainerScaleChange: externalOnContainerScaleChange,
  }) => {
    const [internalManualZoom, setInternalManualZoom] = useState<number | undefined>(undefined);
    const [internalFitZoomLevel, setInternalFitZoomLevel] = useState<number>(0);
    const [hasInitialized, setHasInitialized] = useState<boolean>(false);
    const isMobile = useIsMobile();
    const containerRef = useRef<HTMLDivElement>(null);
    const previewContainerRef = useRef<HTMLDivElement>(null);

    const fitZoomLevel = internalFitZoomLevel;
    // Use external props if provided, otherwise use internal state
    const manualZoom =
      externalManualZoom !== undefined
        ? externalManualZoom
        : (internalManualZoom !== undefined ? internalManualZoom : fitZoomLevel);

    // Set initial zoom to fit-to-window when container scale is calculated
    useEffect(() => {
      if (fitZoomLevel > 0 && !hasInitialized) {
        // On mobile, always start with fit-to-screen
        // On desktop, use fit-to-screen if no external manual zoom is provided
        if (isMobile || externalManualZoom === undefined) {
          if (externalOnZoomChange) {
            externalOnZoomChange(fitZoomLevel);
          } else if (internalManualZoom === undefined) {
            setInternalManualZoom(fitZoomLevel);
          }
        }
        setHasInitialized(true);
      }
    }, [
      fitZoomLevel,
      hasInitialized,
      externalManualZoom,
      isMobile,
      externalOnZoomChange,
      internalManualZoom,
    ]);

    // Re-fit to screen when orientation changes on mobile
    useEffect(() => {
      if (isMobile && fitZoomLevel > 0) {
        const handleOrientationChange = () => {
          setTimeout(() => {
            if (externalOnZoomChange) {
              externalOnZoomChange(fitZoomLevel);
            } else {
              setInternalManualZoom(fitZoomLevel);
            }
          }, 100);
        };

        window.addEventListener("orientationchange", handleOrientationChange);
        window.addEventListener("resize", handleOrientationChange);

        return () => {
          window.removeEventListener(
            "orientationchange",
            handleOrientationChange
          );
          window.removeEventListener("resize", handleOrientationChange);
        };
      }
    }, [isMobile, fitZoomLevel, externalOnZoomChange]);

    const handleZoomChange = (zoom: number) => {
      if (externalOnZoomChange) {
        externalOnZoomChange(zoom);
      } else {
        setInternalManualZoom(zoom);
      }
    };

    const handleFitZoomLevelChange = (scale: number) => {
      setInternalFitZoomLevel(scale);
      if (externalOnContainerScaleChange) {
        externalOnContainerScaleChange(scale);
      }
    };

    const visibilityCheck = useMemo(
      () => checkContentVisibility(posterData, designSettings),
      [posterData, designSettings]
    );

    // Use posterTheme for preview width/height
    const previewWidth = posterTheme.width;
    const previewHeight = posterTheme.height;
    const aspectRatio = previewHeight / previewWidth;

    const { posterRef } = usePosterScaling({
      manualZoom,
      onContainerScaleChange: handleFitZoomLevelChange,
      posterUIWidth: previewWidth,
      posterUIHeight: previewHeight,
      a0WidthPx: previewWidth,
      a0HeightPx: previewHeight,
      containerRef,
    });

    // Compute whether to center or allow scrolling
    const isFitToWindow = manualZoom <= fitZoomLevel;
    const previewContainerClass = isFitToWindow
      ? "flex items-center justify-center w-full h-full p-0"
      : "w-full h-full p-0 overflow-auto";

    useEffect(() => {
      if (!previewContainerRef.current) return;
      if (manualZoom > fitZoomLevel) {
        // Center the poster in the scrollable area, but not perfectly (e.g., 70% of the way)
        const container = previewContainerRef.current;
        const poster = container.firstElementChild as HTMLElement | null;
        if (poster) {
          const scrollLeft = (poster.offsetWidth - container.clientWidth) * 0.7;
          const scrollTop = (poster.offsetHeight - container.clientHeight) * 0.7;
          container.scrollTo({ left: Math.max(0, scrollLeft), top: Math.max(0, scrollTop), behavior: 'auto' });
        }
      }
    }, [manualZoom, fitZoomLevel]);

    return (
      <div ref={containerRef} className="flex-1 bg-gray-100 relative overflow-hidden h-full w-full flex items-center justify-center">
        {/* Desktop-only zoom controls */}
        <div className="hidden lg:block absolute top-4 right-4 z-10">
          <ZoomControls
            currentZoom={manualZoom}
            onZoomChange={handleZoomChange}
            fitZoomLevel={fitZoomLevel}
          />
        </div>
        <div id="poster-preview" className={previewContainerClass} ref={previewContainerRef}>
          <div
            className="flex flex-col items-center justify-center"
            style={{
              width: `${previewWidth}pt`,
              height: `${previewHeight}pt`,
              fontSize: `${posterTheme.fontSizes.body}pt`,
              background: '#f3f4f6', // light gray
              overflow: 'visible',
            }}
          >
            {/* Content Visibility Warning */}
            <ContentVisibilityWarning
              isVisible={visibilityCheck.isContentVisible}
              warnings={visibilityCheck.warnings}
            />
            <PosterPreview
              posterData={{
                ...posterData,
                qrCodeColor: qrColor,
                showKeypoints: posterData.showKeypoints,
                showQrCode: posterData.showQrCode,
              }}
              designSettings={designSettings}
              manualZoom={manualZoom}
              onContainerScaleChange={handleFitZoomLevelChange}
            />
          </div>
        </div>
      </div>
    );
  }
);

PosterPreviewArea.displayName = "PosterPreviewArea";

export default PosterPreviewArea;
