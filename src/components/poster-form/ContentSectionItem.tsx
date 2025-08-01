
import React from 'react';
import { SectionInput } from '@/components/ui/section-input';
import { ContentEditor } from '@/components/ui/content-editor';
import { Card, CardContent } from '@/components/ui/card';

interface ContentSectionItemProps {
  index: number;
  sectionTitle: string;
  sectionField: string;
  defaultTitle: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onDragStart?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
}

export const ContentSectionItem: React.FC<ContentSectionItemProps> = ({
  index,
  sectionTitle,
  sectionField,
  defaultTitle,
  content,
  onTitleChange,
  onContentChange,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragging
}) => {
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Ensure the event has the correct name attribute for the parent handler
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name: sectionField
      }
    } as React.ChangeEvent<HTMLTextAreaElement>;
    
    onContentChange(syntheticEvent);
  };

  return (
    <Card 
      className={`p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow cursor-move ${isDragging ? 'opacity-50' : ''}`}
      draggable={true}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      <CardContent className="p-0 space-y-4">
        <SectionInput
          id={`section-title-${index}`}
          label={`${sectionTitle} Title`}
          value={defaultTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder={`Enter ${sectionTitle.toLowerCase()} title`}
        />
        
        <ContentEditor
          id={sectionField}
          label="Content"
          value={content}
          onChange={handleContentChange}
          placeholder={`Enter ${sectionTitle.toLowerCase()} content`}
        />
      </CardContent>
    </Card>
  );
};
