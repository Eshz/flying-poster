
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface KeyTakeawayItemProps {
  index: number;
  title: string;
  description: string;
  visible: boolean;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onVisibilityChange: (visible: boolean) => void;
  onDragStart?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
}

export const KeyTakeawayItem: React.FC<KeyTakeawayItemProps> = ({
  index,
  title,
  description,
  visible,
  onTitleChange,
  onDescriptionChange,
  onVisibilityChange,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragging
}) => {
  return (
    <div 
      className={`space-y-4 cursor-move ${isDragging ? 'opacity-50' : ''}`}
      draggable={true}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`key-visible-${index}`}
            checked={visible}
            onCheckedChange={(checked) => onVisibilityChange(checked as boolean)}
          />
          <Label htmlFor={`key-visible-${index}`} className="text-sm text-gray-600">
            Show
          </Label>
        </div>
      </div>
      
      <Input
        id={`keypoint-${index}`}
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Enter key takeaway title"
        className="border-0 border-b border-gray-300 focus:border-blue-400 focus:ring-0 rounded-none bg-transparent text-sm px-0"
        aria-label={`Key takeaway ${index + 1} title`}
      />
      
      <div className="space-y-2">
        <Label htmlFor={`keydesc-${index}`} className="text-xs font-medium text-gray-700">
          Description
        </Label>
        <Textarea
          id={`keydesc-${index}`}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={2}
          placeholder="Enter key takeaway description"
          className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md text-sm"
          aria-label={`Key takeaway ${index + 1} description`}
        />
      </div>
    </div>
  );
};
