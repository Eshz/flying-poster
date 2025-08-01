import React, { useMemo } from "react";
import { PosterData, DesignSettings } from "@/types/project";
import PosterHeader from "./poster-preview/PosterHeader";
import PosterLayoutRenderer from "./poster-preview/PosterLayoutRenderer";
import { usePosterScaling } from "@/hooks/usePosterScaling";
import { posterTheme } from "@/constants/posterTheme";

interface PosterPreviewProps {
  posterData: PosterData;
  designSettings: DesignSettings;
  manualZoom?: number;
  onContainerScaleChange?: (scale: number) => void;
}

const PosterPreview: React.FC<PosterPreviewProps> = React.memo(
  ({ posterData, designSettings, manualZoom = 1, onContainerScaleChange }) => {
    // Use posterTheme dimensions for A0 size
    const dimensions = useMemo(() => ({
      width: posterTheme.width,
      height: posterTheme.height,
      a0Width: posterTheme.width,
      a0Height: posterTheme.height,
    }), []);

    const { posterRef } = usePosterScaling({
      manualZoom,
      onContainerScaleChange,
      posterUIWidth: dimensions.width,
      posterUIHeight: dimensions.height,
      a0WidthPx: dimensions.a0Width,
      a0HeightPx: dimensions.a0Height,
    });

    // QR Code generation - memoized for performance
    const qrCodeUrl = useMemo(() => {
      if (!posterData.qrCodeUrl || posterData.showQrCode === false) return "";

      return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
        posterData.qrCodeUrl
      )}&color=${(posterData.qrCodeColor || "#000000").replace("#", "")}`;
    }, [posterData.qrCodeUrl, posterData.showQrCode, posterData.qrCodeColor]);

    // Check content visibility - memoized for performance

    return (
      <div
        id="poster-content"
        ref={posterRef}
        className="bg-white border border-gray-200 relative overflow-visible flex flex-col shadow-lg"
        style={{
          width: `${dimensions.width}pt`,
          height: `${dimensions.height}pt`,
        }}
      >
        {/* Header Section */}
        <PosterHeader
          title={posterData.title}
          authors={posterData.authors}
          school={posterData.school}
          contact={posterData.contact}
          designSettings={designSettings}
          qrCodeUrl={qrCodeUrl}
          showQrCode={posterData.showQrCode !== false}
          qrCodeCaption={posterData.qrCodeCaption}
        />

        {/* Dynamic Content Layout - allowing content to be visible */}
        <div className="flex-grow overflow-visible p-1">
          <PosterLayoutRenderer
            layout={designSettings.layout}
            posterData={posterData}
            designSettings={designSettings}
            qrCodeUrl={qrCodeUrl}
            showKeypoints={posterData.showKeypoints !== false}
            showQrCode={posterData.showQrCode !== false}
          />
        </div>
      </div>
    );
  }
);

PosterPreview.displayName = "PosterPreview";

export default PosterPreview;
