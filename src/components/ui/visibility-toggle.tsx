
import React from 'react';
import { Switch } from './switch';
import { Label } from './label';

interface VisibilityToggleProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export const VisibilityToggle: React.FC<VisibilityToggleProps> = ({
  id,
  checked,
  onCheckedChange,
  label = "Show",
  onClick,
  className
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className || ''}`}>
      <Switch 
        id={id}
        checked={checked} 
        onCheckedChange={onCheckedChange}
        onClick={onClick}
        aria-describedby={`${id}-label`}
      />
      <Label 
        htmlFor={id} 
        id={`${id}-label`}
        className="text-sm text-gray-600"
      >
        {label}
      </Label>
    </div>
  );
};
