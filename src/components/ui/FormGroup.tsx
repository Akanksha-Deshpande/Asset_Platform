import React from "react";
import ErrorState from "../shared/ErrorState";

type FormGroupProps = {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  error?: string;
  helperText?: string;
  required?: boolean;
};

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  htmlFor,
  children,
  error,
  helperText,
  required = false
}) => {
  return (
    <div className="mb-3">
      {/* Label */}
      <label htmlFor={htmlFor} className="form-label">
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>

      {/* Input / control */}
      {children}

      {/* Helper text */}
      {helperText && !error && (
        <div className="form-text">{helperText}</div>
      )}

      {/* Error message */}
      {error && (
        <ErrorState message={error} />
      )}
    </div>
  );
};

export default FormGroup;