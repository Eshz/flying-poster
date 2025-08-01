
import React from 'react';
import { DesignSettings } from '@/types/design';
import { useDesignStyles } from '@/hooks/useDesignStyles';
import { useAnalytics } from '@/hooks/useAnalytics';
import StyleThumbnail from '@/components/design/StyleThumbnail';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Monitor, Smartphone } from 'lucide-react';

interface DesignPanelProps {
  designSettings: DesignSettings;
  setDesignSettings: (designSettings: DesignSettings) => void;
  qrColor: string;
  setQrColor: (color: string) => void;
}

const DesignPanel: React.FC<DesignPanelProps> = React.memo(({ 
  designSettings, 
  setDesignSettings, 
  qrColor, 
  setQrColor 
}) => {
  const { trackDesignStyleSelected, trackLayoutSelected } = useAnalytics();
  const { applyStyle, isStyleSelected, stylesData } = useDesignStyles(
    designSettings, 
    setDesignSettings
  );

  const handleApplyStyle = (style: any) => {
    applyStyle(style);
    trackDesignStyleSelected(style.name);
    trackLayoutSelected(style.settings.layout);
  };

  const handleOrientationChange = (value: string) => {
    const newOrientation = value as 'portrait' | 'landscape';
    setDesignSettings({
      ...designSettings,
      orientation: newOrientation
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b bg-white">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Design Styles</h2>
        <p className="text-sm text-gray-600">Choose from pre-designed poster styles</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Orientation Control */}
        <div className="bg-white p-4 rounded-lg border">
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Orientation
          </Label>
          <RadioGroup
            value={designSettings.orientation || 'portrait'}
            onValueChange={handleOrientationChange}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="portrait" id="portrait" />
              <Label htmlFor="portrait" className="flex items-center gap-2 cursor-pointer">
                <Smartphone className="h-4 w-4" />
                Portrait
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="landscape" id="landscape" />
              <Label htmlFor="landscape" className="flex items-center gap-2 cursor-pointer">
                <Monitor className="h-4 w-4" />
                Landscape
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Style Thumbnails - Masonry Grid */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Style Templates
          </Label>
          <div 
            className="columns-2 gap-4 space-y-4"
            style={{
              columnFill: 'balance'
            }}
          >
            {stylesData.map((style) => (
              <div key={style.id} className="break-inside-avoid mb-4">
                <StyleThumbnail 
                  style={style}
                  isSelected={isStyleSelected(style)}
                  onApplyStyle={handleApplyStyle}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

DesignPanel.displayName = 'DesignPanel';

export default DesignPanel;
