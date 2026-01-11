import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import SimpleButton from "../components/SimpleButton";
import type { CartItem } from "../helpers/Interface";
import OrderingPopup from "../Sections/OrderingPopup";
import { getThemeColor } from "../helpers/common";
const color = getThemeColor();
export default function Checkout() {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    notes: "",
  });
  const excludedFields = ["notes", "paymentMethod"];

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("cart");
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  function getRandomTime(minMinutes = 10, maxMinutes = 45) {
    const now = new Date();
    const randomMinutes =
      Math.floor(Math.random() * (maxMinutes - minMinutes + 1)) + minMinutes;

    now.setMinutes(now.getMinutes() + randomMinutes);
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  const handleSubmit = () => {
    const newErrors: Record<string, boolean> = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (excludedFields.includes(key)) return;

      if (
        formData.paymentMethod !== "card" &&
        ["cardNumber", "cardExpiry", "cardCVV"].includes(key)
      ) {
        return;
      }

      if (!value || value.toString().trim() === "") {
        newErrors[key] = true;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    const now = new Date();

    // pick a random completed step index (0 → 4)
    const completedIndex = Math.floor(Math.random() * 5);
    const ETA = Math.floor(Math.random() * (45 - 10 + 1)) + 10;

    const timeline = [
      {
        status: "Order Placed",
        icon: "ri-shopping-bag-line",
      },
      {
        status: "Order Confirmed",
        icon: "ri-checkbox-circle-line",
      },
      {
        status: "Preparing Food",
        icon: "ri-restaurant-line",
      },
      {
        status: "Out for Delivery",
        icon: "ri-bike-line",
      },
      {
        status: "Delivered",
        icon: "ri-home-smile-line",
      },
    ].map((item, index) => ({
      ...item,
      completed: index <= completedIndex,
      time: index <= completedIndex ? now.toLocaleTimeString() : "--",
    }));

    // ✅ Create order object
    const newOrder = {
      id: Date.now(),
      customer: formData,

      items: cartItems, // full items
      itemsCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),

      total: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),

      status: "pending",
      date: new Date().toLocaleDateString(),
      time: getRandomTime(),
      createdAt: new Date().toISOString(),
      timeline,
      estimatedTime: ETA,
    };

    // ✅ Get existing orders
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");

    // ✅ Append new order
    existingOrders.push(newOrder);

    // ✅ Save orders
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // ✅ Clear cart
    localStorage.removeItem("cart");
    setCartItems([]);

    window.dispatchEvent(new Event("cartUpdated"));

    setShowPopup(true);

    // ✅ HIDE POPUP + REDIRECT after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
      navigate(`/track-order?trackId=${newOrder.id}`);
    }, 3000);
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;
  return (
    <>
      {showPopup && <OrderingPopup />}
      <section className="pt-32 pb-16  ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl">
              <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-6">
                <i className="ri-shopping-cart-line text-5xl text-gray-400"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mb-8">
                Add some delicious food to get started!
              </p>

              <div className="flex items-center justify-center ">
                <SimpleButton
                  type="button"
                  label="Start Ordering"
                  className="w-64"
                  variant="primary"
                  onClick={() => navigate("/menu")}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Delivery Information */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Delivery Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <InputField
                        label=" Full Name"
                        required
                        error={errors.fullName}
                        value={formData.fullName}
                        placeholder="John Doe"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fullName: e,
                          })
                        }
                      />
                    </div>
                    <div>
                      <InputField
                        label="Email"
                        required
                        error={errors.email}
                        value={formData.email}
                        placeholder="JohnDoe@example.com"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <InputField
                      label="Phone Number"
                      required
                      value={formData.phone}
                      error={errors.phone}
                      placeholder="03xxxxxxxxx"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e,
                        })
                      }
                    />
                  </div>

                  <div>
                    <InputField
                      label=" Delivery Address"
                      required
                      value={formData.address}
                      error={errors.address}
                      placeholder="123 Main Street, Apt 4B"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: e,
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <InputField
                        label="City"
                        required
                        value={formData.city}
                        error={errors.city}
                        placeholder="New York"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            city: e,
                          })
                        }
                      />
                    </div>
                    <div>
                      <InputField
                        label="ZIP Code"
                        required
                        value={formData.zipCode}
                        error={errors.zipCode}
                        placeholder="10001"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            zipCode: e,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Notes (Optional)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Ring the doorbell, leave at door, etc."
                    ></textarea>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Payment Method
                  </h2>

                  <div className="space-y-4 mb-6">
                    <label
                      className={`flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-${color}-500 transition-colors`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentMethod: e.target.value,
                          })
                        }
                        className="w-5 h-5 text-orange-500"
                      />
                      <div className="ml-4 flex items-center space-x-3">
                        <i className="ri-bank-card-line text-2xl text-gray-700"></i>
                        <span className="font-medium text-gray-900">
                          Credit / Debit Card
                        </span>
                      </div>
                    </label>

                    <label
                      className={`flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-${color}-500 transition-colors`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={formData.paymentMethod === "cash"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentMethod: e.target.value,
                          })
                        }
                        className="w-5 h-5 text-orange-500"
                      />
                      <div className="ml-4 flex items-center space-x-3">
                        <i className="ri-money-dollar-circle-line text-2xl text-gray-700"></i>
                        <span className="font-medium text-gray-900">
                          Cash on Delivery
                        </span>
                      </div>
                    </label>
                  </div>

                  {formData.paymentMethod === "card" && (
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                      <div>
                        <InputField
                          label="Card Number"
                          required
                          value={formData.cardNumber}
                          placeholder="1234 5678 9012 3456"
                          error={errors.cardNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              cardNumber: e,
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <InputField
                            label=" Expiry Date"
                            required
                            value={formData.cardExpiry}
                            error={errors.cardExpiry}
                            placeholder="MM/YY"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                cardExpiry: e,
                              })
                            }
                          />
                        </div>
                        <div>
                          <InputField
                            label="CVV"
                            required
                            value={formData.cardCVV}
                            error={errors.cardCVV}
                            placeholder="123"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                cardCVV: e,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-0"
                      >
                        <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 mb-1">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500 mb-2">
                            Size: {item.size}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  updateQuantity(index, item.quantity - 1)
                                }
                                className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                              >
                                <i className="ri-subtract-line text-xs"></i>
                              </button>
                              <span className="text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(index, item.quantity + 1)
                                }
                                className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                              >
                                <i className="ri-add-line text-xs"></i>
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(index)}
                              className="text-red-500 hover:text-red-600 cursor-pointer"
                            >
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                          <p className="text-sm font-bold text-gray-900 mt-2">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 py-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold text-gray-900">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="font-semibold text-gray-900">
                        ${deliveryFee.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-semibold text-gray-900">
                        ${tax.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-100">
                      <span className="text-gray-900">Total</span>
                      <span className={`text-${color}-500`}>
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <SimpleButton
                    type="button"
                    label="Place Order"
                    className="flex-1"
                    variant="primary"
                    onClick={() => handleSubmit()}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
