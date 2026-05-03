import type { ChangeEvent } from "react";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
};

const Select = ({
  value,
  onChange,
  options,
  label,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  required = false
}: SelectProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}{required && <span className="text-danger ms-1">*</span>}</label>}

      <select
        className={`form-select ${className}`}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      >
        {/* 👇 Important: placeholder option */}
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;