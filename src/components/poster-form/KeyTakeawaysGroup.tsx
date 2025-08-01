
import React, { useState, useEffect } from 'react';
import KeyPointsSection from './KeyPointsSection';
import { Switch } from "@/components/ui/switch";
import { ChevronDown, ChevronUp, Target } from "lucide-react";

interface KeyTakeawaysGroupProps {
  posterData: any;
  handleKeyPointChange: (index: number, value: string) => void;
  handleKeyDescriptionChange: (index: number, value: string) => void;
  handleKeyVisibilityChange: (index: number, visible: boolean) => void;
  handleKeyTakeawaysReorder: (newKeypoints: string[]) => void;
  handleToggleChange: (field: string) => (checked: boolean) => void;
  openSections: {[key: string]: boolean};
  toggleSection: (sectionId: string) => void;
}

const KeyTakeawaysGroup: React.FC<KeyTakeawaysGroupProps> = ({
  posterData,
  handleKeyPointChange,
  handleKeyDescriptionChange,
  handleKeyVisibilityChange,
  handleKeyTakeawaysReorder,
  handleToggleChange,
  openSections,
  toggleSection
}) => {
  const isOpen = openSections['key-takeaways'];

  return (
    <div className="border-b border-gray-200 py-4">
      <div 
        className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
        onClick={() => toggleSection('key-takeaways')}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-50 rounded-md flex items-center justify-center">
            <Target className="h-3 w-3 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Key Takeaways</h3>
        </div>
        <div className="flex items-center gap-2">
          <Switch 
            checked={posterData.showKeypoints !== false} 
            onCheckedChange={handleToggleChange('showKeypoints')}
            onClick={(e) => e.stopPropagation()}
          />
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>
      </div>
      
      {isOpen && posterData.showKeypoints !== false && (
        <div className="mt-4 pl-9">
          <KeyPointsSection 
            keypoints={posterData.keypoints || ['', '', '', '']}
            keyDescriptions={posterData.keyDescriptions || ['', '', '', '']}
            keyVisibility={posterData.keyVisibility || [true, true, true, true]}
            handleKeyPointChange={handleKeyPointChange}
            handleKeyDescriptionChange={handleKeyDescriptionChange}
            handleKeyVisibilityChange={handleKeyVisibilityChange}
            handleKeyTakeawaysReorder={handleKeyTakeawaysReorder}
          />
        </div>
      )}
    </div>
  );
};

export default KeyTakeawaysGroup;
