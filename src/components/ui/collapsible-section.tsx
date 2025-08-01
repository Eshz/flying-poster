
import React from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  id,
  title,
  icon,
  isOpen,
  onToggle,
  children,
  rightContent,
  className
}) => {
  return (
    <div className={cn("border-b border-gray-200 py-4", className)}>
      <div 
        className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-6 h-6 bg-blue-50 rounded-md flex items-center justify-center">
              {icon}
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {rightContent}
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>
      </div>
      
      {isOpen && (
        <div id={`${id}-content`} className="mt-4 pl-9">
          {children}
        </div>
      )}
    </div>
  );
};
