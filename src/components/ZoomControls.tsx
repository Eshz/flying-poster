
import React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface ZoomControlsProps {
  currentZoom: number;
  onZoomChange: (zoom: number) => void;
  fitZoomLevel?: number;
  minZoom?: number;
  maxZoom?: number;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ 
  currentZoom, 
  onZoomChange, 
  fitZoomLevel,
  minZoom = 0.05,
  maxZoom = 2
}) => {
  const { trackZoomChanged } = useAnalytics();
  
  // Show zoom percentage relative to actual A0 size
  const zoomDisplay = currentZoom > 0 ? `${Math.round(currentZoom * 100)}%` : 'Fit';

  const handleZoomIn = () => {
    const newZoom = Math.min(currentZoom + 0.05, maxZoom);
    onZoomChange(newZoom);
    trackZoomChanged(newZoom, 'manual');
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(currentZoom - 0.05, minZoom);
    onZoomChange(newZoom);
    trackZoomChanged(newZoom, 'manual');
  };

  const handleZoomReset = () => {
    // Reset to 100% (actual A0 size)
    onZoomChange(1);
    trackZoomChanged(1, 'reset');
  };

  const handleFitToWindow = () => {
    // Set zoom to fit the entire poster in the window
    if (fitZoomLevel) {
      onZoomChange(fitZoomLevel);
      trackZoomChanged(fitZoomLevel, 'fit_to_window');
    }
  };

  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex items-center gap-2 z-10">
      <Button
        variant="outline"
        size="sm"
        onClick={handleZoomOut}
        disabled={currentZoom <= minZoom}
        className="h-8 w-8 p-0"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      
      <button
        onClick={handleZoomReset}
        className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
        title="Reset to 100% (A0 size: 84.1 x 118.8 cm)"
      >
        {zoomDisplay}
      </button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleZoomIn}
        disabled={currentZoom >= maxZoom}
        className="h-8 w-8 p-0"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleFitToWindow}
        disabled={!fitZoomLevel}
        className="h-8 px-2"
        title="Fit entire poster to window"
      >
        <Maximize className="h-4 w-4 mr-1" />
        Fit
      </Button>
    </div>
  );
};

export default ZoomControls;
