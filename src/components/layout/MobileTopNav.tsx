
import React, { useState } from 'react';
import { Text, Palette, Download, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import PosterForm from '@/components/PosterForm';
import DesignPanel from '@/components/DesignPanel';

interface MobileTopNavProps {
  posterData: any;
  setPosterData: React.Dispatch<React.SetStateAction<any>>;
  designSettings: any;
  setDesignSettings: React.Dispatch<React.SetStateAction<any>>;
  qrColor: string;
  setQrColor: React.Dispatch<React.SetStateAction<string>>;
  handleExportPDF: () => void;
  currentZoom: number;
  onZoomChange: (zoom: number) => void;
  fitZoomLevel?: number;
  minZoom?: number;
  maxZoom?: number;
}

const MobileTopNav: React.FC<MobileTopNavProps> = ({
  posterData,
  setPosterData,
  designSettings,
  setDesignSettings,
  qrColor,
  setQrColor,
  handleExportPDF,
  currentZoom,
  onZoomChange,
  fitZoomLevel,
  minZoom = 0.05,
  maxZoom = 2
}) => {
  const [contentSheetOpen, setContentSheetOpen] = useState(false);
  const [designSheetOpen, setDesignSheetOpen] = useState(false);

  const zoomPercentage = Math.round(currentZoom * 100);

  const handleZoomIn = () => {
    const newZoom = Math.min(currentZoom + 0.05, maxZoom);
    onZoomChange(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(currentZoom - 0.05, minZoom);
    onZoomChange(newZoom);
  };

  const handleZoomReset = () => {
    onZoomChange(1);
  };

  const handleFitToWindow = () => {
    if (fitZoomLevel) {
      onZoomChange(fitZoomLevel);
    }
  };

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Left side - Content and Design panels */}
        <div className="flex items-center gap-2">
          <Sheet open={contentSheetOpen} onOpenChange={setContentSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Text className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[90vw] sm:w-[400px] overflow-y-auto">
              <div className="py-4">
                <h2 className="text-lg font-semibold mb-4">Content</h2>
                <PosterForm 
                  posterData={posterData}
                  setPosterData={setPosterData}
                />
              </div>
            </SheetContent>
          </Sheet>

          <Sheet open={designSheetOpen} onOpenChange={setDesignSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Palette className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[90vw] sm:w-[400px] overflow-y-auto">
              <div className="py-4">
                <h2 className="text-lg font-semibold mb-4">Design</h2>
                <DesignPanel 
                  designSettings={designSettings}
                  setDesignSettings={setDesignSettings}
                  qrColor={qrColor}
                  setQrColor={setQrColor}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Center - Zoom controls */}
        <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            disabled={currentZoom <= minZoom}
            className="h-8 w-8"
          >
            <ZoomOut className="h-3 w-3" />
          </Button>
          
          <button
            onClick={handleZoomReset}
            className="px-2 py-1 text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors min-w-[40px]"
          >
            {zoomPercentage}%
          </button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            disabled={currentZoom >= maxZoom}
            className="h-8 w-8"
          >
            <ZoomIn className="h-3 w-3" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleFitToWindow}
            disabled={!fitZoomLevel}
            className="h-8 w-8"
          >
            <Maximize className="h-3 w-3" />
          </Button>
        </div>

        {/* Right side - Export */}
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleExportPDF}
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MobileTopNav;
