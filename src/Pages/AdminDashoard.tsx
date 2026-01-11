import { useState } from "react";
import { stats } from "../helpers/MockData";
import DishesSection from "../Sections/Dashboard/DishesSection";
import CategorySection from "../Sections/Dashboard/CategorySection";
import ChefSection from "../Sections/Dashboard/ChefSection";
import { getThemeColor } from "../helpers/common";
import PublicPagesSection from "../Sections/Dashboard/PublicPagesSection";
import OrdersSection from "../Sections/Dashboard/OrdersSection";
import UsersSection from "../Sections/Dashboard/UsersSection";
const color = getThemeColor();
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dishes");

  return (
    <>
      <section className="pt-32 pb-16  ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your restaurant operations</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 flex items-center justify-center ${stat.color} rounded-lg`}
                  >
                    <i className={`${stat.icon} text-2xl text-white`}></i>
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg p-1 inline-flex mb-6">
            <button
              onClick={() => setActiveTab("dishes")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "dishes"
                  ? `bg-${color}-500 text-white`
                  : `text-gray-700 hover:text-${color}-500`
              }`}
            >
              Manage Dishes
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "categories"
                  ? `bg-${color}-500 text-white`
                  : `text-gray-700 hover:text-${color}-500`
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "users"
                  ? `bg-${color}-500 text-white`
                  : `text-gray-700 hover:text-${color}-500`
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "orders"
                  ? `bg-${color}-500 text-white`
                  : `text-gray-700 hover:text-${color}-500`
              }`}
            >
              Recent Orders
            </button>
            <button
              onClick={() => setActiveTab("chef")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "chef"
                  ? `bg-${color}-500 text-white`
                  : `text-gray-700 hover:text-${color}-500`
              }`}
            >
              Chef Info
            </button>
            <button
              onClick={() => setActiveTab("public_page")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "public_page"
                  ? `bg-${color}-500 text-white`
                  : `text-gray-700 hover:text-${color}-500`
              }`}
            >
              Public Pages
            </button>
          </div>
          {activeTab === "dishes" && <DishesSection />}
          {activeTab === "categories" && <CategorySection />}
          {activeTab === "chef" && <ChefSection />}
          {activeTab === "public_page" && <PublicPagesSection />}
          {activeTab === "orders" && <OrdersSection />}
          {activeTab === "users" && <UsersSection />}
        </div>
      </section>
    </>
  );
}
