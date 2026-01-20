import { useState } from "react";
import { getThemeColor } from "../helpers/common";
import type { FormInputProps } from "../helpers/Interface";

const color = getThemeColor();

export default function InputField({
  label,
  type = "text",
  value,
  placeholder,
  required = false,
  readonly = false,
  error = false,
  onChange,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <div className="relative">
        <input
          type={inputType}
          value={value}
          required={required}
          readOnly={readonly}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2
            ${
              error
                ? "border border-red-500 focus:ring-red-500"
                : `border border-gray-200 focus:ring-${color}-500`
            } ${readonly ? "cursor-pointer bg-gray-100" : "cursor-text"}
            ${isPassword ? "pr-12" : ""}
          `}
        />

        {/* 👁 Eye icon only for password fields */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
          >
            <i
              className={`${
                showPassword ? "ri-eye-off-line" : "ri-eye-line"
              } text-gray-400`}
            ></i>
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1">This field is required</p>
      )}
    </div>
  );
}
