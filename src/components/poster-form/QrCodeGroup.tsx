
import React from 'react';
import QrCodeSection from './QrCodeSection';
import { Switch } from "@/components/ui/switch";
import { CollapsibleSection } from "@/components/ui/collapsible-section";
import { QrCode } from "lucide-react";

interface QrCodeGroupProps {
  posterData: any;
  handleQrUrlChange: (url: string) => void;
  handleQrColorChange: (color: string) => void;
  handleQrCaptionChange: (caption: string) => void;
  handleToggleChange: (field: string) => (checked: boolean) => void;
  openSections: {[key: string]: boolean};
  toggleSection: (sectionId: string) => void;
}

const QrCodeGroup: React.FC<QrCodeGroupProps> = ({
  posterData,
  handleQrUrlChange,
  handleQrColorChange,
  handleQrCaptionChange,
  handleToggleChange,
  openSections,
  toggleSection
}) => {
  const isOpen = openSections['qr-code'];

  return (
    <CollapsibleSection
      id="qr-code"
      title="QR Code"
      icon={<QrCode className="h-3 w-3 text-blue-600" />}
      isOpen={isOpen}
      onToggle={() => toggleSection('qr-code')}
      rightContent={
        <Switch 
          checked={posterData.showQrCode !== false} 
          onCheckedChange={handleToggleChange('showQrCode')}
          onClick={(e) => e.stopPropagation()}
        />
      }
    >
      {posterData.showQrCode !== false && (
        <QrCodeSection 
          qrCodeUrl={posterData.qrCodeUrl || ''}
          qrCodeColor={posterData.qrCodeColor || '#000000'}
          qrCodeCaption={posterData.qrCodeCaption || 'Scan me!'}
          handleQrUrlChange={handleQrUrlChange}
          handleQrColorChange={handleQrColorChange}
          handleQrCaptionChange={handleQrCaptionChange}
        />
      )}
    </CollapsibleSection>
  );
};

export default QrCodeGroup;
