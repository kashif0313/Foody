import { useEffect, useState } from "react";
// import { categories, menuItems } from "../helpers/MockData";
import MealSimpleCard from "../components/MealSimpleCard";
import type { AdminMealData, Category } from "../helpers/Interface";
import { getThemeColor } from "../helpers/common";
import FoodLoadingScreen from "../helpers/LoadingScreen";
const color = getThemeColor();
export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  // Lazy initialize menuItems from localStorage
  const [menuItems] = useState<AdminMealData[]>(() => {
    const stored = localStorage.getItem("menuItems");
    return stored ? JSON.parse(stored) : [];
  });

  const [categories] = useState<Category[]>(() => {
    const stored = localStorage.getItem("categories");
    return stored ? JSON.parse(stored) : [];
  });

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1600); // ⏱️ loader visible for 600ms

    return () => clearTimeout(timer);
  });
  return (
    <>
      {showLoading && <FoodLoadingScreen />}
      <section className="pt-32 pb-16  ">
        {/* Header */}
        <div className={`bg-${color}-100 py-16`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Menu</h1>
            <p className="text-lg text-gray-600">
              Discover our delicious and healthy food options
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="ri-search-line text-gray-400 text-lg"></i>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for dishes..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex space-x-3 mb-12 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.identifier)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === category.identifier
                    ? `bg-${color}-500 text-white`
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <i className={`${category.icon} text-lg`}></i>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((meal) => (
              <MealSimpleCard
                key={meal.id}
                id={meal.id}
                title={meal.title}
                price={meal.price}
                rating={meal.rating}
                image={meal.images?.[0]}
                popular={meal.popular}
                calories={meal.calories}
                prepTime={meal.prepTime}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-6">
                <i className="ri-search-line text-5xl text-gray-400"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Items Found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
