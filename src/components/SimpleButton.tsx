import { getThemeColor } from "../helpers/common";
import type { PrimaryButtonProps } from "../helpers/Interface";

const color = getThemeColor();

export default function SimpleButton({
  label,
  type = "button",
  onClick,
  disabled = false,
  icon,
  className = "",
  variant = "primary",
}: PrimaryButtonProps) {
  const baseClasses = `w-full
    px-6 py-3 rounded-lg text-sm font-semibold
    transition-colors whitespace-nowrap cursor-pointer
    flex items-center justify-center gap-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-${color}-500 text-white
      hover:bg-${color}-600
    `,
    secondary: `
      bg-transparent
      text-${color}-500
      border border-${color}-500
      hover:bg-${color}-50
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {label}
    </button>
  );
}
