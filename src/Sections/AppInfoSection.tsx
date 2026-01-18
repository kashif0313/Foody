import { useEffect } from "react";
export default function AppInfoSection() {
  useEffect(() => {}, []);

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            {/* LEFT CONTENT */}
            <div className="ml-8">
              <span className="inline-block bg-pink-100 text-pink-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
                🎉 Flat 30% OFF on First Order
              </span>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Get Our Food App Today
              </h2>

              <p className="text-gray-600 text-lg mb-8 max-w-xl">
                Order your favorite meals in just a few taps. Fast delivery,
                exclusive app-only deals, and real-time order tracking.
              </p>

              {/* Store Buttons */}
              <div className="flex items-center gap-4 flex-wrap">
                <a
                  href="#"
                  className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
                >
                  <i className="ri-apple-fill text-3xl"></i>
                  <div className="text-left leading-tight">
                    <p className="text-xs">Download on the</p>
                    <p className="text-sm font-semibold">App Store</p>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
                >
                  <i className="ri-google-play-fill text-3xl"></i>
                  <div className="text-left leading-tight">
                    <p className="text-xs">Get it on</p>
                    <p className="text-sm font-semibold">Google Play</p>
                  </div>
                </a>
              </div>
            </div>

            {/* RIGHT MOCKUP */}
            <div className="relative flex justify-center">
              {/* Background Blob */}
              <div className="absolute w-96 h-96 bg-pink-300/30 rounded-full blur-3xl"></div>

              <div className="relative ">
                <img
                  src="../assets/phone.png"
                  alt="Mobile App Mockup"
                  className=" h-80  drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
