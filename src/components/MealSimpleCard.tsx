import { useEffect } from "react";
import type { MealCardProps } from "../helpers/Interface";
import { Link } from "react-router-dom";
import { getThemeColor } from "../helpers/common";
const color = getThemeColor();
export default function MealSimpleCard({
  id,
  title,
  price,
  rating,
  image,
  popular,
  prepTime,
  calories,
}: MealCardProps) {
  useEffect(() => {}, []);

  return (
    <Link
      to={`/menu-detail/${id}`}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all cursor-pointer group"
      data-discover="true"
    >
      <div className="relative w-full h-64 bg-gray-50">
        <img
          alt={title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          src={image}
        />
        {popular && (
          <span
            className={`absolute top-3 right-3 px-3 py-1 bg-${color}-500 text-white text-xs font-medium rounded-full whitespace-nowrap`}
          >
            Popular
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {/* Description can be added to props if needed */}
          Delicious and healthy meal
        </p>
        <div className="flex items-center space-x-3 mb-3 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <i className="ri-star-fill text-yellow-400"></i>
            <span>{rating}</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <i className="ri-time-line"></i>
            <span>{prepTime} min</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <i className="ri-fire-line"></i>
            <span>{calories} cal</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-2xl font-bold text-${color}-500`}>
            ${price}
          </span>
          <button
            className={`w-20 h-10 flex items-center justify-center bg-${color}-500 text-white rounded-lg hover:bg-${color}-600 transition-colors cursor-pointer`}
          >
            View
          </button>
        </div>
      </div>
    </Link>
  );
}
