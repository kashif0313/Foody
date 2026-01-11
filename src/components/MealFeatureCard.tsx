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
        className={`bg-${color}-500 rounded-3xl p-6 relative  group cursor-pointer hover:shadow-2xl transition-all`}
      >
        <div className="relative w-48 h-48 mx-auto mb-6 -mt-20 ">
          <div
            className={`absolute inset-0 bg-gradient-to-br from-${color}-400 to-${color}-500  rounded-full`}
          ></div>
          <img
            src={image}
            alt="Berries Salad"
            className="relative  w-full h-full object-cover object-center rounded-full border-8 border-white/50"
          />
        </div>

        <div className="text-center text-white">
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          <div className="flex items-center justify-between mb-4">
            {/* Price */}
            <p className="text-4xl font-bold text-white">${price}</p>

            {/* Fav Icon */}
            <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md cursor-pointer ">
              <i className="ri-heart-fill text-xl text-red-500"></i>
            </div>
          </div>
          <Link to={`/menu-detail/${id}`} data-discover="true">
            <div className="flex items-center justify-between mb-4">
              <RoundedButton
                label="Order Now"
                icon={<i className="ri-arrow-right-line text-lg"></i>}
                variant="secondary"
                className="px-8 py-3"
                onClick={() => console.log("Order clicked")}
              />

              <i className="ri-star-fill text-white text-lg"></i>
              <span className="text-lg font-semibold">{rating}</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
