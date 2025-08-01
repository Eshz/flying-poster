
import React from 'react';
import { posterTheme } from '@/constants/posterTheme';

interface PosterHeaderProps {
  title: string;
  authors: string;
  school: string;
  contact: string;
  designSettings: any;
  qrCodeUrl?: string;
  showQrCode?: boolean;
  qrCodeCaption?: string;
}

const PosterHeader: React.FC<PosterHeaderProps> = ({
  title,
  authors,
  school,
  contact,
  designSettings,
  qrCodeUrl,
  showQrCode,
  qrCodeCaption
}) => {
  // Filter out empty fields and create array of visible fields
  const visibleFields = [
    { content: authors?.trim(), label: 'Authors' },
    { content: school?.trim(), label: 'Institution' },
    { content: contact?.trim(), label: 'Contact' }
  ].filter(field => field.content);

  // Check if authors row should be hidden (all fields empty)
  const shouldHideAuthorsRow = visibleFields.length === 0;

  // Calculate equal flex basis for visible fields
  const flexBasis = visibleFields.length > 0 ? `${100 / visibleFields.length}%` : '100%';

  return (
    <>
      <div 
        className={`w-full text-center relative flex items-center justify-center px-4 ${showQrCode && qrCodeUrl ? 'py-2' : 'py-4'}`}
        style={{ 
          backgroundColor: designSettings.headerBgColor, 
          color: designSettings.headerTextColor,
          fontFamily: `var(--font-${designSettings.titleFont})`,
          minHeight: showQrCode && qrCodeUrl ? '120px' : 'auto'
        }}
      >
        <div className="flex-1 transition-all duration-300 flex items-center justify-between">
          <h1
            style={{
              fontSize: `${posterTheme.fontSizes.title}pt`,
              fontFamily: `var(--font-${designSettings.titleFont})`,
              fontWeight: 900,
              color: '#264796',
              textAlign: 'center',
              flex: 1,
              marginRight: `${posterTheme.spacing.headerMargin * 1.5}pt`,
              letterSpacing: '0.5pt',
              margin: 0,
            }}
          >
            {title}
          </h1>
          {showQrCode && qrCodeUrl && (
            <div style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              minWidth: `${posterTheme.spacing.keyCircle * 2.1}pt`,
              display: 'flex',
              flexDirection: 'column',
            }}>
              <img
                src={qrCodeUrl}
                alt="QR Code"
                style={{
                  width: `${posterTheme.spacing.keyCircle * 1.6}pt`,
                  height: `${posterTheme.spacing.keyCircle * 1.6}pt`,
                  marginBottom: `${posterTheme.spacing.headerMargin / 4}pt`,
                }}
              />
              {qrCodeCaption && (
                <div
                  style={{
                    fontSize: `${posterTheme.fontSizes.qrCaption}pt`,
                    color: '#264796',
                    fontFamily: 'Roboto, sans-serif',
                    textAlign: 'center',
                    fontWeight: 700,
                  }}
                >
                  {qrCodeCaption}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Author info with top and bottom borders - only render if there are visible fields */}
      {!shouldHideAuthorsRow && (
        <div 
          className="w-full text-center py-2"
          style={{
            borderTop: '1px solid #202b5b',
            borderBottom: '1px solid #202b5b',
            backgroundColor: designSettings.headerBgColor,
          }}
        >
          <div 
            className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 px-2 mx-auto overflow-hidden"
            style={{ 
              color: designSettings.headerTextColor,
              fontFamily: `var(--font-${designSettings.titleFont})`,
              maxWidth: '98%'
            }}
          >
            {visibleFields.map((field, index) => (
              <div 
                key={index}
                className="mb-1 md:mb-0 min-w-0 break-words"
                style={{ 
                  flexBasis,
                  fontSize: `${posterTheme.fontSizes.subtitle}pt`,
                  fontWeight: 700,
                  letterSpacing: '0.2pt',
                  fontFamily: `var(--font-${designSettings.titleFont})`,
                }}
              >
                {field.content}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PosterHeader;
