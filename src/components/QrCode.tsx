
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateQrCodeData, sanitizeUrl } from '@/utils/security/urlValidator';
import { toast } from 'sonner';

interface QrCodeProps {
  url: string;
  setUrl: (url: string) => void;
  color: string;
  setColor: (color: string) => void;
}

const QrCode: React.FC<QrCodeProps> = ({ url, setUrl, color, setColor }) => {
  const [isValidUrl, setIsValidUrl] = useState(true);
  
  const handleUrlChange = (inputUrl: string) => {
    const sanitizedUrl = sanitizeUrl(inputUrl) || inputUrl; // Keep original if not a URL
    const isValid = validateQrCodeData(sanitizedUrl);
    
    setIsValidUrl(isValid);
    setUrl(sanitizedUrl);
    
    if (!isValid && inputUrl.trim()) {
      toast.error('Invalid QR code data. Please check your URL or content.');
    }
  };

  // Only generate QR code if URL is valid and not empty
  const shouldShowQrCode = url && isValidUrl && validateQrCodeData(url);
  const qrCodeUrl = shouldShowQrCode 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}&color=${color.replace('#', '')}`
    : null;
  
  return (
    <div className="space-y-3">
      <Label htmlFor="qr-url">QR Code Link</Label>
      <Input
        id="qr-url"
        value={url}
        placeholder="https://your-website.com"
        onChange={(e) => handleUrlChange(e.target.value)}
        className={`mb-2 ${!isValidUrl && url ? 'border-red-500' : ''}`}
        aria-describedby={!isValidUrl && url ? "url-error" : undefined}
      />
      
      {!isValidUrl && url && (
        <p id="url-error" className="text-sm text-red-500" role="alert">
          Please enter a valid URL or QR code content
        </p>
      )}
      
      <div className="flex justify-center">
        {qrCodeUrl ? (
          <div className="border rounded-md p-2 bg-white">
            <img 
              src={qrCodeUrl} 
              alt="QR Code" 
              className="w-[150px] h-[150px]"
              width={150}
              height={150}
              onError={() => {
                toast.error('Failed to generate QR code');
              }}
            />
          </div>
        ) : url && (
          <div className="border rounded-md p-2 bg-gray-100 w-[150px] h-[150px] flex items-center justify-center text-gray-500 text-sm">
            Invalid QR Code Data
          </div>
        )}
      </div>
    </div>
  );
};

export default QrCode;
