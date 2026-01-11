import { getThemeColor } from "../helpers/common";
import type { FormInputProps } from "../helpers/Interface";
const color = getThemeColor();
export default function InputField({
  label,
  type = "text",
  value,
  placeholder,
  required = false,
  error = false,
  onChange,
}: FormInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2
          ${
            error
              ? "border border-red-500 focus:ring-red-500"
              : `border border-gray-200 focus:ring-${color}-500`
          }
        `}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1">This field is required</p>
      )}
    </div>
  );
}
