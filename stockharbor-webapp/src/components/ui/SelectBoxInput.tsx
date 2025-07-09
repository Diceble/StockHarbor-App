import { ChangeEventHandler } from "react";

interface SelectBoxInputProps {
  label: string;
  name: string;
  icon?: React.ReactNode;
  options: { value: string; label: string }[];
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
}

const SelectBoxInput: React.FC<SelectBoxInputProps> = ({
  label,
  name,
  icon,
  options,
  value,
  onChange,
  required = true,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {icon}
        {label} {required && "*"}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBoxInput;
