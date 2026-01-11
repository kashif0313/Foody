import { Link } from "react-router-dom";
import { services } from "../helpers/MockData";
import { getThemeColor, getWebsiteName } from "../helpers/common";

const color = getThemeColor();
const WebsiteName = getWebsiteName();
export default function Services() {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide exceptional food delivery services with a commitment to
            quality, speed, and customer satisfaction. Discover what makes us
            the best choice for your food needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-gray-100"
              >
                <div
                  className={`w-20 h-20 flex items-center justify-center bg-gradient-to-br ${service.color} rounded-2xl mb-6`}
                >
                  <i className={`${service.icon} text-4xl text-white`}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ordering from {WebsiteName} is simple and convenient. Follow these
              easy steps to get your favorite food delivered.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div
                className={`w-24 h-24 flex items-center justify-center bg-${color}-500 rounded-full mx-auto mb-6 relative`}
              >
                <i className="ri-search-line text-4xl text-white"></i>
                <span
                  className={`absolute -top-2 -right-2 w-10 h-10 flex items-center justify-center bg-white text-${color}-500 rounded-full text-xl font-bold shadow-lg`}
                >
                  1
                </span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Browse Menu
              </h4>
              <p className="text-sm text-gray-600">
                Explore our wide variety of delicious dishes and select your
                favorites
              </p>
            </div>
            <div className="text-center">
              <div
                className={`w-24 h-24 flex items-center justify-center bg-${color}-500 rounded-full mx-auto mb-6 relative`}
              >
                <i className="ri-shopping-cart-line text-4xl text-white"></i>
                <span
                  className={`absolute -top-2 -right-2 w-10 h-10 flex items-center justify-center bg-white text-${color}-500 rounded-full text-xl font-bold shadow-lg`}
                >
                  2
                </span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Add to Cart
              </h4>
              <p className="text-sm text-gray-600">
                Add items to your cart and customize your order as per your
                preference
              </p>
            </div>
            <div className="text-center">
              <div
                className={`w-24 h-24 flex items-center justify-center bg-${color}-500 rounded-full mx-auto mb-6 relative`}
              >
                <i className="ri-bank-card-line text-4xl text-white"></i>
                <span
                  className={`absolute -top-2 -right-2 w-10 h-10 flex items-center justify-center bg-white text-${color}-500 rounded-full text-xl font-bold shadow-lg`}
                >
                  3
                </span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Make Payment
              </h4>
              <p className="text-sm text-gray-600">
                Choose your preferred payment method and complete the secure
                checkout
              </p>
            </div>
            <div className="text-center">
              <div
                className={`w-24 h-24 flex items-center justify-center bg-${color}-500 rounded-full mx-auto mb-6 relative`}
              >
                <i className="ri-truck-line text-4xl text-white"></i>
                <span
                  className={`absolute -top-2 -right-2 w-10 h-10 flex items-center justify-center bg-white text-${color}-500 rounded-full text-xl font-bold shadow-lg`}
                >
                  4
                </span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Fast Delivery
              </h4>
              <p className="text-sm text-gray-600">
                Sit back and relax while we deliver hot and fresh food to your
                doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div
          className={`max-w-5xl mx-auto bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-3xl p-12 text-center`}
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Order?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the best food delivery service in town. Order now and
            enjoy delicious meals delivered to your doorstep.
          </p>
          <Link
            to="/menu"
            className={`inline-block px-10 py-4 bg-white text-${color}-500 rounded-full text-base font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer shadow-lg`}
          >
            Order Now
          </Link>
        </div>
      </section>
    </section>
  );
}
