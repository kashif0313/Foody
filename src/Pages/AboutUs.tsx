import { Link } from "react-router-dom";
import { restaurantStats } from "../helpers/MockData";
import ChefsSection from "../Sections/HomeChefsSection";
import { getThemeColor, getWebsiteName } from "../helpers/common";
const color = getThemeColor();
const WebsiteName = getWebsiteName();
export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className={`pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-${color}-50 to-white`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-6xl font-bold text-gray-900 leading-tight">
                About {WebsiteName}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                We are passionate about delivering delicious, healthy food right
                to your doorstep. Our mission is to make quality food accessible
                to everyone while maintaining the highest standards of taste and
                hygiene.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Founded in 2020, {WebsiteName} has grown from a small local
                kitchen to a trusted food delivery service serving thousands of
                happy customers. We believe in using fresh, locally-sourced
                ingredients and preparing every dish with love and care.
              </p>
              <Link
                to="/menu"
                className={`inline-block px-10 py-4 bg-${color}-500 text-white rounded-full text-sm font-semibold hover:bg-${color}-600 transition-colors whitespace-nowrap cursor-pointer shadow-lg`}
              >
                Explore Menu
              </Link>
            </div>
            <div className="relative">
              <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://readdy.ai/api/search-image?query=modern%20restaurant%20kitchen%20with%20chefs%20preparing%20food%20professional%20cooking%20environment%20bright%20clean%20on%20simple%20background%20professional%20photography&width=700&height=700&seq=about1&orientation=squarish"
                  alt="Our Kitchen"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {restaurantStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-20 h-20 flex items-center justify-center bg-${color}-500 rounded-full mx-auto mb-4`}
                >
                  <i className={`${stat.icon} text-4xl text-white`}></i>
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-base text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-${color}-50 `}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From humble beginnings to becoming a trusted name in food delivery
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div
                className={`w-16 h-16 flex items-center justify-center bg-${color}-500 rounded-2xl mb-6`}
              >
                <i className="ri-lightbulb-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                To become the most trusted and loved food delivery service,
                making quality food accessible to everyone, everywhere.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div
                className={`w-16 h-16 flex items-center justify-center bg-${color}-500 rounded-2xl mb-6`}
              >
                <i className="ri-heart-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                To deliver delicious, healthy food prepared with fresh
                ingredients while providing exceptional customer service.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div
                className={`w-16 h-16 flex items-center justify-center bg-${color}-500 rounded-2xl mb-6`}
              >
                <i className="ri-star-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Values
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Quality, integrity, customer satisfaction, and sustainability
                are at the core of everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ChefsSection />
    </div>
  );
}
