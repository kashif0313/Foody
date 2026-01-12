import { useEffect } from "react";
import type { MealCardProps } from "../helpers/Interface";
import RoundedButton from "./RoundedButton";
import { Link } from "react-router-dom";

export default function MealFeatureCard({
  id,
  title,
  price,
  rating,
  image,
  color,
}: MealCardProps) {
  useEffect(() => {}, []);

  return (
    <>
      <div
        className={`bg-${color}-500 rounded-3xl p-6 relative group cursor-pointer hover:shadow-2xl transition-all flex flex-col justify-between`}
        style={{ minHeight: "350px" }} // ensures button sticks at bottom
      >
        {/* Image with Rating Badge */}
        <div className="relative w-48 h-48 mx-auto -mt-20">
          {/* Gradient Circle Background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-${color}-400 to-${color}-500 rounded-full`}
          ></div>

          {/* Main Image */}
          <img
            src={image}
            alt={title}
            className="relative w-full h-full object-cover object-center rounded-full border-8 border-white/50"
          />

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 flex items-center bg-white px-3 py-1 rounded-full shadow-md">
            <i className="ri-star-fill text-yellow-400 mr-1"></i>
            <span className="text-sm font-semibold text-gray-800">
              {rating}
            </span>
          </div>

          {/* Favorite Heart Icon */}
          <div className="absolute bottom-2 left-2 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md cursor-pointer">
            <i className="ri-heart-fill text-red-500"></i>
          </div>
        </div>

        {/* Title & Price */}
        <div className="text-center text-white mt-4">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-3xl font-bold mb-4">${price}</p>
        </div>

        {/* Button at Bottom */}
        <div className="mt-auto text-center">
          <Link to={`/menu-detail/${id}`} data-discover="true">
            <RoundedButton
              label="Order Now"
              icon={<i className="ri-arrow-right-line text-lg"></i>}
              variant="secondary"
              className="px-8 py-3"
              onClick={() => console.log("Order clicked")}
            />
          </Link>
        </div>
      </div>
    </>
  );
}
