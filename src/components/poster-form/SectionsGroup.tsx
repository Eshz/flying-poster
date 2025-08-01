
import React from 'react';
import { ChevronDown, ChevronUp, FileText } from "lucide-react";
import ContentSection from './ContentSection';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';

interface SectionsGroupProps {
  posterData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSectionTitleChange: (index: number, value: string) => void;
  handleSectionsReorder: (newSectionTitles: string[]) => void;
  openSections: {[key: string]: boolean};
  toggleSection: (sectionId: string) => void;
}

const SectionsGroup: React.FC<SectionsGroupProps> = ({
  posterData,
  handleChange,
  handleSectionTitleChange,
  handleSectionsReorder,
  openSections,
  toggleSection
}) => {
  const isOpen = openSections['sections'];
  
  const sectionTitles = posterData.sectionTitles || [
    '1. Introduction',
    '2. Methods', 
    '3. Findings',
    '4. Conclusions'
  ];

  const {
    draggedItem,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd
  } = useDragAndDrop(sectionTitles, handleSectionsReorder);

  const sections = [
    { field: 'introduction', title: 'Introduction', index: 0 },
    { field: 'methods', title: 'Methods', index: 1 },
    { field: 'findings', title: 'Findings', index: 2 },
    { field: 'conclusions', title: 'Conclusions', index: 3 }
  ];

  return (
    <div className="border-b border-gray-200 py-4">
      <div 
        className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
        onClick={() => toggleSection('sections')}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-50 rounded-md flex items-center justify-center">
            <FileText className="h-3 w-3 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Sections</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </div>
      
      {isOpen && (
        <div className="pl-9 space-y-6">
          {sections.map((section, index) => (
            <ContentSection
              key={section.field}
              posterData={posterData}
              handleChange={handleChange}
              handleSectionTitleChange={handleSectionTitleChange}
              sectionIndex={section.index}
              sectionField={section.field}
              sectionTitle={section.title}
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              isDragging={draggedItem?.index === index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionsGroup;
