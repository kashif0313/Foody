import { Link, useSearchParams } from "react-router-dom";
import { diliveryDriver } from "../helpers/MockData";
import { useMemo, useState } from "react";
import type {
  CartItem,
  DeliveryDriver,
  Order,
  OrderTimelineItem,
} from "../helpers/Interface";
import { getThemeColor } from "../helpers/common";

const color = getThemeColor();
export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  // ✅ Get trackId from query param
  const trackId = searchParams.get("trackId");
  const order = useMemo(() => {
    if (!trackId) return null;
    return orders.find((o: Order) => String(o.id) === trackId);
  }, [orders, trackId]);

  const [driver] = useState<DeliveryDriver>(() => {
    const randomIndex = Math.floor(Math.random() * diliveryDriver.length);
    return diliveryDriver[randomIndex];
  });
  return (
    <>
      <section className="pt-32 pb-16  ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/orders"
            className={`inline-flex items-center space-x-2 text-sm text-gray-600 hover:text-${color}-500 mb-6 cursor-pointer`}
          >
            <i className="ri-arrow-left-line"></i>
            <span>Back to Orders</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      #{order.id}
                    </h1>
                    <p className="text-sm text-gray-500">
                      {order.date} at {order.time}
                    </p>
                  </div>
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium whitespace-nowrap">
                    On the Way
                  </span>
                </div>

                <div className={`bg-${color}-50 rounded-xl p-6 mb-6`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Estimated Arrival
                      </p>
                      <p className={`text-3xl font-bold text-${color}-500`}>
                        {order.estimatedTime ?? 30}min
                      </p>
                    </div>
                    <div
                      className={`w-16 h-16 flex items-center justify-center bg-${color}-500 rounded-full animate-pulse`}
                    >
                      <i className="ri-e-bike-2-fill text-3xl text-white"></i>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {order?.timeline?.map(
                    (item: OrderTimelineItem, index: number) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div
                          className={`w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0 ${
                            item.completed
                              ? `bg-${color}-500 text-white`
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <i className={`${item.icon} text-lg`}></i>
                        </div>
                        <div className="flex-1 pt-1">
                          <p
                            className={`text-base font-semibold ${
                              item.completed ? "text-gray-900" : "text-gray-400"
                            }`}
                          >
                            {item.status}
                          </p>
                          <p className="text-sm text-gray-500">{item.time}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Delivery Address
                </h3>
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-10 h-10 flex items-center justify-center bg-${color}-50 text-${color}-500 rounded-lg flex-shrink-0`}
                  >
                    <i className="ri-map-pin-line text-xl"></i>
                  </div>
                  <p className="text-base text-gray-700 pt-2">
                    {order.customer.address}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Order Items
                </h3>
                <div className="space-y-3">
                  {order.items.map((dish: CartItem, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                    >
                      <div className="flex items-center space-x-3">
                        <span
                          className={`w-8 h-8 flex items-center justify-center bg-${color}-50 text-${color}-500 rounded-lg text-sm font-semibold`}
                        >
                          {dish.quantity}x
                        </span>
                        <span className="text-base text-gray-900">
                          {dish.name}
                        </span>
                      </div>
                      <span className="text-base font-semibold text-gray-900">
                        ${(dish.price * dish.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className={`text-2xl font-bold text-${color}-500`}>
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Driver Info */}
            <div className="space-y-6">
              {/* Driver Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Delivery Driver
                </h3>

                <div className="flex items-center space-x-4 mb-6">
                  <div
                    className={`w-16 h-16 flex items-center justify-center bg-gradient-to-br from-${color}-400 to-${color}-600 rounded-full text-white text-2xl font-bold`}
                  >
                    {driver.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {driver.name}
                    </p>
                    <div className="flex items-center space-x-1">
                      <i className="ri-star-fill text-yellow-400 text-sm"></i>
                      <span className="text-sm text-gray-600">
                        {driver.rating} rating
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg">
                      <i className="ri-phone-line"></i>
                    </div>
                    <span>{driver.phone}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg">
                      <i className="ri-car-line"></i>
                    </div>
                    <span>{driver.vehicle}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    className={`w-full px-6 py-3 bg-${color}-500 text-white rounded-lg text-sm font-medium hover:bg-${color}-600 flex items-center justify-center space-x-2`}
                  >
                    <i className="ri-phone-line"></i>
                    <span>Call Driver</span>
                  </button>

                  <button className="w-full px-6 py-3 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center space-x-2">
                    <i className="ri-message-3-line"></i>
                    <span>Message Driver</span>
                  </button>
                </div>
                {/* Help Card */}
                <div className={`bg-${color}-50 mt-5 rounded-2xl p-6`}>
                  <div
                    className={`w-12 h-12 flex items-center justify-center bg-${color}-500 rounded-full mb-4`}
                  >
                    <i className="ri-customer-service-2-line text-2xl text-white"></i>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Need Help?
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Our support team is here to assist you 24/7
                  </p>
                  <button
                    className={`w-full px-6 py-3 bg-white text-${color}-500 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer`}
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
