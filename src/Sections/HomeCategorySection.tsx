import { useNavigate } from "react-router-dom";

export default function HomeCategorySection() {
  const navigate = useNavigate();
  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900">Our Categories</h2>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* LEFT SIDE – IMAGE GRID */}
            <div className="grid grid-cols-2 gap-6 h-full">
              {/* Column 1 – Large Image */}
              <div
                className="rounded-3xl overflow-hidden h-full "
                onClick={() => {
                  navigate("/menu?category=salads");
                }}
              >
                <img
                  src="../assets/home_img3.jpg"
                  alt="Main Dish"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Column 2 – Two Rows */}
              <div className="grid grid-rows-2 gap-6">
                <div
                  className="rounded-3xl overflow-hidden"
                  onClick={() => {
                    navigate("/menu?category=desserts");
                  }}
                >
                  <img
                    src="../assets/home_img2.jpg"
                    alt="Pizza"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div
                  className="rounded-3xl overflow-hidden"
                  onClick={() => {
                    navigate("/menu?category=drinks");
                  }}
                >
                  <img
                    src="../assets/home_img1.jpg"
                    alt="Kebab"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE – CATEGORY LIST */}
            <div className="flex flex-col gap-6">
              {/* Category Item */}
              <div
                className="flex items-center gap-5 p-6 rounded-3xl bg-yellow-50 hover:shadow-lg transition"
                onClick={() => {
                  navigate("/menu?category=burgers");
                }}
              >
                <img
                  src="../assets/burger.jpg"
                  alt="Burger"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Burger</h3>
                  <p className="text-gray-600">
                    Juicy, cheesy, and freshly grilled
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-6  bg-orange-50 hover:shadow-lg transition">
                <img
                  src="../assets/pizza.jpg"
                  alt="Pizza"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Pizza</h3>
                  <p className="text-gray-600">
                    Cheesy, crispy, and oven baked
                  </p>
                </div>
              </div>

              <div
                className="flex items-center gap-5 p-6 rounded-3xl bg-green-50 hover:shadow-lg transition"
                onClick={() => {
                  navigate("/menu?category=drinks");
                }}
              >
                <img
                  src="../assets/drinks.jpg"
                  alt="drinks"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Drinks</h3>
                  <p className="text-gray-600">
                    Refreshing, chilled, and energizing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
