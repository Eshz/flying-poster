
import React from 'react';
import QrCode from "@/components/QrCode";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QrCodeSectionProps {
  qrCodeUrl: string;
  qrCodeColor: string;
  qrCodeCaption: string;
  handleQrUrlChange: (url: string) => void;
  handleQrColorChange: (color: string) => void;
  handleQrCaptionChange: (caption: string) => void;
}

const QrCodeSection: React.FC<QrCodeSectionProps> = ({
  qrCodeUrl,
  qrCodeColor,
  qrCodeCaption,
  handleQrUrlChange,
  handleQrColorChange,
  handleQrCaptionChange
}) => {
  return (
    <div className="space-y-6">
      <QrCode 
        url={qrCodeUrl} 
        setUrl={handleQrUrlChange}
        color={qrCodeColor}
        setColor={handleQrColorChange}
      />
      
      <div className="space-y-2">
        <Label htmlFor="qr-caption" className="text-sm font-medium text-gray-900">
          QR Code Caption
        </Label>
        <Input
          id="qr-caption"
          value={qrCodeCaption}
          placeholder="Scan for more info"
          onChange={(e) => handleQrCaptionChange(e.target.value)}
          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
        />
      </div>
    </div>
  );
};

export default QrCodeSection;
