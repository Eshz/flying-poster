
import React from 'react';
import BasicInfoSection from './BasicInfoSection';
import { ChevronDown, ChevronUp, Info } from "lucide-react";

interface ContactInfoSectionProps {
  posterData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  openSections: {[key: string]: boolean};
  toggleSection: (sectionId: string) => void;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  posterData,
  handleChange,
  openSections,
  toggleSection
}) => {
  const isOpen = openSections['general-info'];

  return (
    <div className="border-b border-gray-200 py-4">
      <div 
        className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
        onClick={() => toggleSection('general-info')}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-50 rounded-md flex items-center justify-center">
            <Info className="h-3 w-3 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">General Details</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </div>
      
      {isOpen && (
        <div className="mt-4 pl-9">
          <BasicInfoSection 
            posterData={posterData}
            handleChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default ContactInfoSection;
