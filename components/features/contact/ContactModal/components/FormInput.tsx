import React from 'react';
import { inputClasses } from './contactFormConstants';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  required?: boolean;
}

export function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false
}: Readonly<FormInputProps>) {
  // Convert single error into the Record structure expected by inputClasses
  const errorsRecord = error ? { [name]: error } : {};

  return (
    <div>
      <label className="block text-[13px] text-white/80 mb-2">
        {label}
        {required && <span className="text-error ml-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={inputClasses(name, errorsRecord)}
      />
      {error && <p className="mt-1 text-[11px] text-error/90">{error}</p>}
    </div>
  );
}
