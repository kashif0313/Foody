import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type {
  AdminMealData,
  CartItem,
  MealCardProps,
} from "../helpers/Interface";
import RelatedCategoryItem from "../Sections/RelatedCategoryItems";
import FoodLoadingScreen from "../helpers/LoadingScreen";
import { getThemeColor } from "../helpers/common";
const color = getThemeColor();
export default function MealDetail() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLoading, setShowLoading] = useState(true);
  const [menuItems] = useState<AdminMealData[]>(() => {
    const stored = localStorage.getItem("menuItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 600); // ⏱️ loader visible for 600ms

    return () => clearTimeout(timer);
  }, [id]);

  const numericId = Number(id);

  const dish: MealCardProps | null = !isNaN(numericId)
    ? menuItems.find((item) => item.id === numericId) || null
    : null;
  const relatedDishes = menuItems.filter(
    (item) => item.category === dish?.category
  );
  if (!dish) {
    return (
      <div className="pt-40 text-center text-gray-500">Meal not found</div>
    );
  }
  const handleAddToCart = () => {
    const cartItem = {
      id: dish.id,
      name: dish.title,
      price: dish.price,
      quantity,
      size: selectedSize,
      image: dish.images?.[0] ?? "/images/placeholder.png",
    };

    const existingCart: CartItem[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const existingItemIndex = existingCart.findIndex(
      (item) => item.id === dish.id && item.size === selectedSize
    );

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Added to cart successfully!");
  };
  return (
    <>
      {showLoading && <FoodLoadingScreen />}

      <section className="pt-32 pb-16  ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="w-full h-[500px] bg-gray-50 rounded-2xl overflow-hidden">
                {dish && (
                  <img
                    src={
                      dish.image ??
                      dish.images?.[selectedImage] ??
                      dish.images?.[0]
                    }
                    alt={dish.title}
                    className="w-full h-full object-cover object-top"
                  />
                )}
              </div>
              <div className="grid grid-cols-4 gap-3">
                {dish?.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-full h-24 bg-gray-50 rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedImage === index
                        ? `ring-2 ring-${color}-500`
                        : "hover:ring-2 hover:ring-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${dish.title} ${index + 1}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">
                    {dish.category}
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full whitespace-nowrap">
                    Popular
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                  {dish.title}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <i className="ri-star-fill text-yellow-400"></i>
                    <span className="text-sm font-semibold text-gray-900">
                      {dish.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({dish.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <i className="ri-time-line"></i>
                    <span>{dish.prepTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <i className="ri-fire-line"></i>
                    <span>{dish.calories} cal</span>
                  </div>
                </div>
                <p className="text-gray-600 text-base leading-relaxed">
                  {dish.description}
                </p>
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Ingredients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {dish?.ingredients?.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-50 text-gray-700 text-sm rounded-lg whitespace-nowrap"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Size
                </h3>
                <div className="flex space-x-3">
                  {["small", "medium", "large"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-lg text-sm font-medium capitalize transition-all whitespace-nowrap cursor-pointer ${
                        selectedSize === size
                          ? `bg-${color}-500 text-white`
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Price */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">
                    Quantity
                  </span>
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-orange-500 cursor-pointer"
                    >
                      <i className="ri-subtract-line text-lg"></i>
                    </button>
                    <span className="text-base font-semibold text-gray-900 w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className={`w-8 h-8 flex items-center justify-center text-gray-700 hover:text-${color}-500 cursor-pointer`}
                    >
                      <i className="ri-add-line text-lg"></i>
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Total Price</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ${(dish.price * quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`w-full bg-${color}-500 text-white py-4 rounded-lg text-base font-semibold hover:bg-${color}-600 transition-colors flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer`}
              >
                <i className="ri-shopping-cart-line text-xl"></i>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>

          <RelatedCategoryItem dishes={relatedDishes} />
        </div>
      </section>
    </>
  );
}
