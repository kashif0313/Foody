import { useEffect, useState } from "react";
import { getThemeColor } from "./common";

const loadingTexts = [
  "Finding dishes ",
  "Preparing menu ",
  "Cutting vegetables ",
  "Adding ice to drinks ",
  "Cooking with love ",
];

export default function FoodLoadingScreen() {
  const [textIndex, setTextIndex] = useState(0);
  const color = getThemeColor();
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 1600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      {/* Bouncy food icons */}
      <div className={`food-loader mb-6 text-${color}-600`}>
        <i className="ri-cup-line food-icon"></i>
        <i className="ri-cup-fill food-icon"></i>
        <i className="ri-restaurant-2-line food-icon"></i>
        <i className="ri-leaf-line food-icon"></i>
        <i className="ri-restaurant-line food-icon"></i>
      </div>

      {/* Dynamic text */}
      <h2 className="text-lg font-semibold text-gray-800 animate-fade">
        {loadingTexts[textIndex]}
      </h2>
    </div>
  );
}
