
import React from 'react';
import { FormField } from './form-field';

interface ContentEditorProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  className?: string;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 6,
  required = false,
  className
}) => {
  return (
    <FormField
      id={id}
      name={id} // <-- Pass name prop
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type="textarea"
      rows={rows}
      required={required}
      className={className}
    />
  );
};
