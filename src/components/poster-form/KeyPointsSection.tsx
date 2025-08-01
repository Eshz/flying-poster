
import React from 'react';
import { KeyTakeawayItem } from './KeyTakeawayItem';

interface KeyPointsSectionProps {
  keypoints: string[];
  keyDescriptions: string[];
  keyVisibility: boolean[];
  handleKeyPointChange: (index: number, value: string) => void;
  handleKeyDescriptionChange: (index: number, value: string) => void;
  handleKeyVisibilityChange: (index: number, visible: boolean) => void;
  handleKeyTakeawaysReorder: (newKeypoints: string[]) => void;
  singleIndex?: number;
}

const KeyPointsSection: React.FC<KeyPointsSectionProps> = ({
  keypoints,
  keyDescriptions,
  keyVisibility,
  handleKeyPointChange,
  handleKeyDescriptionChange,
  handleKeyVisibilityChange,
  handleKeyTakeawaysReorder,
  singleIndex
}) => {
  // If singleIndex is provided, only show that specific key takeaway
  if (singleIndex !== undefined) {
    return (
      <KeyTakeawayItem
        index={singleIndex}
        title={keypoints[singleIndex] || ''}
        description={keyDescriptions[singleIndex] || ''}
        visible={keyVisibility[singleIndex] !== false}
        onTitleChange={(value) => handleKeyPointChange(singleIndex, value)}
        onDescriptionChange={(value) => handleKeyDescriptionChange(singleIndex, value)}
        onVisibilityChange={(visible) => handleKeyVisibilityChange(singleIndex, visible)}
      />
    );
  }

  // Original full form layout
  return (
    <div className="space-y-4">
      {keypoints.map((point, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg">
          <KeyTakeawayItem
            index={index}
            title={point}
            description={keyDescriptions[index] || ''}
            visible={keyVisibility[index] !== false}
            onTitleChange={(value) => handleKeyPointChange(index, value)}
            onDescriptionChange={(value) => handleKeyDescriptionChange(index, value)}
            onVisibilityChange={(visible) => handleKeyVisibilityChange(index, visible)}
          />
        </div>
      ))}
    </div>
  );
};

export default KeyPointsSection;
