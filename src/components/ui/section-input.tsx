
import React from 'react';
import { FormField } from './form-field';

interface SectionInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export const SectionInput: React.FC<SectionInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
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
      type="underline-input"
      required={required}
      className={className}
    />
  );
};
