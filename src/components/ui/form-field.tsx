import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: 'input' | 'textarea' | 'underline-input';
  rows?: number;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  name?: string; // <-- Add this line
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'input',
  rows = 3,
  className,
  required = false,
  disabled = false,
  error,
  name // <-- Add this line
}) => {
  const baseInputClasses = "border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-md text-sm";
  const underlineInputClasses = "border-0 border-b border-gray-300 focus:border-blue-400 focus:ring-0 rounded-none bg-transparent text-sm px-0";

  return (
    <div className={cn("space-y-1", className)}>
      <Label 
        htmlFor={id} 
        className="text-xs font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {type === 'textarea' ? (
        <Textarea
          id={id}
          name={name || id} // <-- Pass name prop
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={cn(baseInputClasses, error && "border-red-500")}
          disabled={disabled}
          required={required}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <Input
          id={id}
          name={name || id} // <-- Pass name prop
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            type === 'underline-input' ? underlineInputClasses : baseInputClasses,
            error && "border-red-500"
          )}
          disabled={disabled}
          required={required}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
