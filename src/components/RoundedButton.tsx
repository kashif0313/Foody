import { getThemeColor } from "../helpers/common";
import type { ButtonProps } from "../helpers/Interface";

const color = getThemeColor();

export default function RoundedButton({
  label,
  onClick,
  href,
  icon,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles =
    " rounded-full text-sm font-semibold transition-colors flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer";

  const variants = {
    primary: `bg-${color}-500 text-white hover:bg-${color}-600`,
    secondary: "bg-white text-gray-900 hover:bg-gray-100",
  };

  const content = (
    <>
      <span>{label}</span>
      {icon}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {content}
    </button>
  );
}
