
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sanitizeUserInput } from '@/utils/security/htmlSanitizer';

interface BasicInfoSectionProps {
  posterData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  singleField?: string;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ 
  posterData, 
  handleChange,
  singleField
}) => {
  // Helper function to determine if field should use textarea
  const shouldUseTextarea = (value: string) => {
    return value && (value.length > 50 || value.includes('\n'));
  };

  // Secure change handler that sanitizes input
  const handleSecureChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Determine max length based on field type
    const maxLengths: Record<string, number> = {
      title: 200,
      authors: 500,
      school: 200,
      contact: 100
    };
    
    const maxLength = maxLengths[name] || 1000;
    const sanitizedValue = sanitizeUserInput(value, maxLength);
    
    // Call handleChange with a plain event-like object
    handleChange({ target: { name, value: sanitizedValue } } as any);
  };

  // If singleField is provided, only show that field
  if (singleField) {
    const fieldConfig = {
      title: { label: 'Title', placeholder: 'Enter your poster title' },
      authors: { label: 'Authors', placeholder: 'Enter author names' },
      school: { label: 'School/Institution', placeholder: 'Enter institution name' },
      contact: { label: 'Contact Info', placeholder: 'Enter contact information' }
    };

    const config = fieldConfig[singleField as keyof typeof fieldConfig];
    if (!config) return null;

    const value = posterData[singleField] || '';
    const useTextarea = shouldUseTextarea(value);

    return (
      <div className="space-y-1">
        <Label htmlFor={singleField} className="text-xs font-medium text-gray-700">
          {config.label}
        </Label>
        {useTextarea ? (
          <Textarea
            id={singleField}
            name={singleField}
            value={value}
            onChange={handleSecureChange}
            placeholder={config.placeholder}
            className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md text-sm min-h-[60px] resize-none"
            rows={Math.max(2, Math.ceil(value.length / 50))}
          />
        ) : (
          <Input
            id={singleField}
            name={singleField}
            value={value}
            onChange={handleSecureChange}
            placeholder={config.placeholder}
            className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md text-sm"
          />
        )}
      </div>
    );
  }

  // Compact layout with adaptive text areas and full border styling
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="title" className="text-xs font-medium text-gray-700">
          Title
        </Label>
        {shouldUseTextarea(posterData.title || '') ? (
          <Textarea
            id="title"
            name="title"
            value={posterData.title || ''}
            onChange={handleSecureChange}
            placeholder="Enter your poster title"
            className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md text-sm min-h-[60px] resize-none"
            rows={Math.max(2, Math.ceil((posterData.title || '').length / 50))}
          />
        ) : (
          <Input
            id="title"
            name="title"
            value={posterData.title || ''}
            onChange={handleSecureChange}
            placeholder="Enter your poster title"
            className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md text-sm"
          />
        )}
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="authors" className="text-xs font-medium text-gray-700">
          Authors
        </Label>
        {shouldUseTextarea(posterData.authors || '') ? (
          <Textarea
            id="authors"
            name="authors"
            value={posterData.authors || ''}
            onChange={handleSecureChange}
            placeholder="Enter author names"
            className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md text-sm min-h-[60px] resize-none"
            rows={Math.max(2, Math.ceil((posterData.authors || '').length / 50))}
          />
        ) : (
          <Input
            id="authors"
            name="authors"
            value={posterData.authors || ''}
            onChange={handleSecureChange}
            placeholder="Enter author names"
            className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md text-sm"
          />
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="school" className="text-xs font-medium text-gray-700">
          School/Institution
        </Label>
        {shouldUseTextarea(posterData.school || '') ? (
          <Textarea
            id="school"
            name="school"
            value={posterData.school || ''}
            onChange={handleSecureChange}
            placeholder="Enter institution name"
            className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md text-sm min-h-[60px] resize-none"
            rows={Math.max(2, Math.ceil((posterData.school || '').length / 50))}
          />
        ) : (
          <Input
            id="school"
            name="school"
            value={posterData.school || ''}
            onChange={handleSecureChange}
            placeholder="Enter institution name"
            className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md text-sm"
          />
        )}
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="contact" className="text-xs font-medium text-gray-700">
          Contact Info
        </Label>
        {shouldUseTextarea(posterData.contact || '') ? (
          <Textarea
            id="contact"
            name="contact"
            value={posterData.contact || ''}
            onChange={handleSecureChange}
            placeholder="Enter contact information"
            className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md text-sm min-h-[60px] resize-none"
            rows={Math.max(2, Math.ceil((posterData.contact || '').length / 50))}
          />
        ) : (
          <Input
            id="contact"
            name="contact"
            value={posterData.contact || ''}
            onChange={handleSecureChange}
            placeholder="Enter contact information"
            className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md text-sm"
          />
        )}
      </div>
    </div>
  );
};

export default BasicInfoSection;
