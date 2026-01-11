import { useEffect } from "react";

export default function HomeCategorySection() {
  useEffect(() => {}, []);
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
              <div className="rounded-3xl overflow-hidden h-full">
                <img
                  src="https://img.freepik.com/free-photo/delicious-burger-studio_23-2151846495.jpg?semt=ais_hybrid&w=740&q=80"
                  alt="Main Dish"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Column 2 – Two Rows */}
              <div className="grid grid-rows-2 gap-6">
                <div className="rounded-3xl overflow-hidden">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMfA6GXa0E0PebyCGD65CS_XWUsaq3tYAzKQ&s"
                    alt="Pizza"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="rounded-3xl overflow-hidden">
                  <img
                    src="https://img.freepik.com/free-photo/colorful-soda-drinks-macro-shot_53876-18225.jpg?semt=ais_hybrid&w=740&q=80"
                    alt="Kebab"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE – CATEGORY LIST */}
            <div className="flex flex-col gap-6">
              {/* Category Item */}
              <div className="flex items-center gap-5 p-6 rounded-3xl bg-yellow-50 hover:shadow-lg transition">
                <img
                  src="https://png.pngtree.com/png-vector/20240829/ourmid/pngtree-delicious-and-testy-cheese-burger-png-image_13659847.png"
                  alt="Burger"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Burger</h3>
                  <p className="text-gray-600">Juicy & freshly grilled</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-6 rounded-3xl bg-orange-50 hover:shadow-lg transition">
                <img
                  src="https://img.freepik.com/free-photo/front-view-yummy-cake-with-cream-chocolate-chips-white-background-pie-biscuit-tea-sweet-cake-sugar_140725-115838.jpg?semt=ais_hybrid&w=740&q=80"
                  alt="Pizza"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Pizza</h3>
                  <p className="text-gray-600">Cheesy & oven baked</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-6 rounded-3xl bg-green-50 hover:shadow-lg transition">
                <img
                  src="https://www.verywellhealth.com/thmb/fx1NtS1oNpcStqoQZ_C1I0zayHY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/VWH-GettyImages-1154932488-00b170b3de244584bb67ac6e01efa8db.jpg"
                  alt="Kebab"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Kebab</h3>
                  <p className="text-gray-600">Smoky & perfectly spiced</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
