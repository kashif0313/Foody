import { useEffect } from "react";
import { Link } from "react-router-dom";
import MealFeaturedSection from "../Sections/MealFeaturedSection";
import HomeCategorySection from "../Sections/HomeCategorySection";
import ChefsSection from "../Sections/HomeChefsSection";
import AppInfoSection from "../Sections/AppInfoSection";
import {
  categories,
  featuredMeals,
  topChefs,
  menuItems,
  publicPages,
} from "../helpers/MockData";
import { getThemeColor } from "../helpers/common";
const color = getThemeColor();
export default function Home() {
  const defaultSettings = {
    siteName: "foody",
    primaryColor: import.meta.env.VITE_THEME_COLOR,
  };
  useEffect(() => {
    // Store data in localStorage if not already stored
    if (!localStorage.getItem("categories")) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }

    if (!localStorage.getItem("featuredMeals")) {
      localStorage.setItem("featuredMeals", JSON.stringify(featuredMeals));
    }

    if (!localStorage.getItem("topChefs")) {
      localStorage.setItem("topChefs", JSON.stringify(topChefs));
    }

    if (!localStorage.getItem("menuItems")) {
      localStorage.setItem("menuItems", JSON.stringify(menuItems));
    }
    if (!localStorage.getItem("publicPages")) {
      localStorage.setItem("publicPages", JSON.stringify(publicPages));
    }
    if (!localStorage.getItem("WebsiteConfig")) {
      localStorage.setItem("WebsiteConfig", JSON.stringify(defaultSettings));
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 via-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-6xl font-bold leading-tight">
                <span className="text-gray-900">Healthy Eating is</span>
                <br />
                <span className="text-gray-900">important part of</span>
                <br />
                <span className="text-gray-900">lifestyle</span>
              </h1>
              <p className="text-gray-600 text-base leading-relaxed max-w-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque
                congue arcu
              </p>
              <div className="flex items-center space-x-4">
                <Link
                  to="/menu"
                  className={`px-8 py-4 bg-${color}-500 text-white rounded-full text-sm font-semibold hover:bg-${color}-600 transition-colors whitespace-nowrap cursor-pointer shadow-lg`}
                >
                  Order Now{" "}
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center items-center">
              <div className="relative w-[450px] h-[450px]">
                {/* Large orange circle background */}
                <div
                  className={`absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-${color}-500 rounded-full 
                  -translate-x-1/2 -translate-y-1/2`}
                ></div>

                {/* Main food image */}
                <div
                  className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full overflow-hidden 
                  border-8 border-white shadow-2xl 
                  -translate-x-1/2 -translate-y-1/2"
                >
                  <img
                    src="https://readdy.ai/api/search-image?query=colorful%20healthy%20buddha%20bowl%20with%20quinoa%20grilled%20chicken%20fresh%20vegetables%20avocado%20cherry%20tomatoes%20corn%20edamame%20on%20simple%20clean%20white%20background%20professional%20food%20photography%20vibrant%20colors%20top%20view&width=600&height=600&seq=hero1&orientation=squarish"
                    alt="Healthy Bowl"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {/* 20% OFF badge */}
                <div
                  className={`absolute -top-4 right-8 bg-${color}-500 text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-xl `}
                >
                  <p className="text-2xl font-bold leading-none">20%</p>
                  <p className="text-xs">OFF</p>
                </div>

                {/* Fast Delivery card */}
                <div className="absolute top-16 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 flex items-center justify-center bg-${color}-100 rounded-full`}
                  >
                    <i
                      className={`ri-truck-line text-xl text-${color}-500`}
                    ></i>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">People Server</p>
                    <p className="text-sm font-bold text-gray-900">
                      30 Minutes
                    </p>
                  </div>
                </div>

                {/* Best Quality card */}
                <div className="absolute bottom-8 right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center space-x-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full">
                    <i className="ri-restaurant-line text-xl text-green-500"></i>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Discount</p>
                    <p className="text-sm font-bold text-gray-900">Coupons</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={`bg-${color}-100`}>
        <MealFeaturedSection />
        <HomeCategorySection />
        <ChefsSection />
        <AppInfoSection />
      </div>
    </>
  );
}
