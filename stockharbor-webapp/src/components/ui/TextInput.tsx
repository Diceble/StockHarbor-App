interface TextInputProps {
  label: string;
  value: string;
  name: string;
  required?: boolean;
  icon?: React.ReactNode;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  name,
  required = true,
  icon,
  handleInputChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {icon}
        {label} {required && "*"}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleInputChange}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter product name"
      />
    </div>
  );
};

export default TextInput;
