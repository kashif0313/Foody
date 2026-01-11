import { useRef, useState } from "react";
import MealFeatureCard from "../components/MealFeatureCard";
import { menuItems } from "../helpers/MockData";
import { getFeaturedColors, getThemeColor } from "../helpers/common";
const color = getThemeColor();

export default function MealFeaturedSection() {
  const colors = getFeaturedColors();
  // generate random colors once per render using useMemo
  // generate random colors once on component mount
  const [randomColors] = useState(() =>
    menuItems.map(() => {
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    })
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Featured Dishes
            </h2>
            <p className="text-gray-600">Our most popular items</p>
          </div>
          <div className="relative bg-white py-10 px-20 rounded-3xl ">
            {/* LEFT BUTTON */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2
               w-14 h-14 bg-white rounded-full shadow-xl
               flex items-center justify-center z-10"
              onClick={() => scroll("left")}
            >
              <i className="ri-arrow-left-s-line text-2xl text-gray-900"></i>
            </button>

            {/* RIGHT BUTTON */}
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
               w-14 h-14 bg-white rounded-full shadow-xl
               flex items-center justify-center z-10"
              onClick={() => scroll("right")}
            >
              <i className="ri-arrow-right-s-line text-2xl text-gray-900"></i>
            </button>

            {/* SQUEEZE EFFECT (MASK CUTS) */}
            <div
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-10 h-20 bg-${color}-100 rounded-r-[100px] `}
            ></div>
            <div
              className={`absolute right-0 top-1/2 -translate-y-1/2 w-10 h-20 bg-${color}-100 rounded-l-[100px] `}
            ></div>
            <div
              ref={scrollRef}
              className="scroll-smooth
              scrollbar-hide overflow-hidden pt-20"
            >
              {/* CONTENT */}
              <div className="flex gap-6 relative z-0">
                {menuItems.map((meal, index) => (
                  <MealFeatureCard
                    key={meal.id}
                    id={meal.id}
                    title={meal.title}
                    price={meal.price}
                    rating={meal.rating}
                    image={meal.images[0]}
                    color={randomColors[index]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
