import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Order, UserProfile } from "../helpers/Interface";
import SimpleButton from "../components/SimpleButton";
import InputField from "../components/InputField";
import ConfirmationPopup from "../Sections/ConfirmationPopup";
import { getThemeColor } from "../helpers/common";
const color = getThemeColor();
export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("userProfile");
    return saved
      ? JSON.parse(saved)
      : {
          name: localStorage.getItem("userName") || "Guest User",
          email: localStorage.getItem("userEmail") || "user@example.com",
          phone: "+1 234 567 8900",
          address: "123 Main Street",
          city: "New York",
          zipCode: "10001",
          avatar:
            "https://readdy.ai/api/search-image?query=professional%20friendly%20person%20smiling%20portrait%20clean%20white%20background%20professional%20photography&width=200&height=200&seq=avatar1&orientation=squarish",
        };
  });

  const [editProfile, setEditProfile] = useState(profile);
  const handleSaveProfile = () => {
    setProfile(editProfile);
    localStorage.setItem("userProfile", JSON.stringify(editProfile));
    localStorage.setItem("userName", editProfile.name);
    localStorage.setItem("userEmail", editProfile.email);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userAuth");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/");
  };
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const recentOrders = orders.slice(0, 5);
  return (
    <>
      <section className="pt-32 pb-16  ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full overflow-hidden">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://via.placeholder.com/200x200/e5e7eb/9ca3af?text=User";
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {profile.name}
                  </h3>
                  <p className="text-sm text-gray-600">{profile.email}</p>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      activeTab === "profile"
                        ? `bg-${color}-50 text-${color}-500`
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <i className="ri-user-line text-lg"></i>
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      activeTab === "orders"
                        ? `bg-${color}-50 text-${color}-500`
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <i className="ri-shopping-bag-line text-lg"></i>
                    <span>My Orders</span>
                  </button>
                  {/* <button
                    onClick={() => setActiveTab("addresses")}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      activeTab === "addresses"
                        ? `bg-${color}-50 text-${color}-500`
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <i className="ri-map-pin-line text-lg"></i>
                    <span>Addresses</span>
                  </button> */}
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      activeTab === "settings"
                        ? `bg-${color}-50 text-${color}-500`
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <i className="ri-settings-line text-lg"></i>
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <i className="ri-logout-box-line text-lg"></i>
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="bg-white rounded-2xl p-8 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Profile Information
                    </h2>
                    {!isEditing ? (
                      <div>
                        <SimpleButton
                          type="button"
                          label="Edit profile"
                          className="w-auto"
                          variant="primary"
                          onClick={() => {
                            setEditProfile(profile);
                            setIsEditing(true);
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex space-x-3">
                        <SimpleButton
                          type="button"
                          label="Cancel"
                          className="w-auto"
                          variant="secondary"
                          onClick={handleSaveProfile}
                        />

                        <SimpleButton
                          type="button"
                          label="Save Changes"
                          className="w-auto"
                          variant="primary"
                          onClick={handleSaveProfile}
                        />
                      </div>
                    )}
                  </div>

                  {!isEditing ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Full Name
                          </label>
                          <p className="text-base text-gray-900">
                            {profile.name}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Email
                          </label>
                          <p className="text-base text-gray-900">
                            {profile.email}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Phone
                          </label>
                          <p className="text-base text-gray-900">
                            {profile.phone}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            City
                          </label>
                          <p className="text-base text-gray-900">
                            {profile.city}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Address
                          </label>
                          <p className="text-base text-gray-900">
                            {profile.address}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">
                            Zip Code
                          </label>
                          <p className="text-base text-gray-900">
                            {profile.zipCode}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Avatar URL
                        </label>
                        <input
                          type="url"
                          value={editProfile.avatar}
                          onChange={(e) =>
                            setEditProfile({
                              ...editProfile,
                              avatar: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <InputField
                            label="Full Name"
                            value={editProfile.name}
                            placeholder="123"
                            onChange={(e) =>
                              setEditProfile({
                                ...editProfile,
                                name: e,
                              })
                            }
                          />
                        </div>
                        <div>
                          <InputField
                            label="Email"
                            type="email"
                            value={editProfile.email}
                            placeholder="123"
                            onChange={(e) =>
                              setEditProfile({
                                ...editProfile,
                                email: e,
                              })
                            }
                          />
                        </div>
                        <div>
                          <InputField
                            label="Phone"
                            value={editProfile.phone}
                            onChange={(e) =>
                              setEditProfile({
                                ...editProfile,
                                phone: e,
                              })
                            }
                          />
                        </div>
                        <div>
                          <InputField
                            label="City"
                            value={editProfile.city}
                            onChange={(e) =>
                              setEditProfile({
                                ...editProfile,
                                city: e,
                              })
                            }
                          />
                        </div>
                        <div className="md:col-span-2">
                          <InputField
                            label="Address"
                            value={editProfile.address}
                            onChange={(e) =>
                              setEditProfile({
                                ...editProfile,
                                address: e,
                              })
                            }
                          />
                        </div>
                        <div>
                          <InputField
                            label=" Zip Code"
                            value={editProfile.zipCode}
                            onChange={(e) =>
                              setEditProfile({
                                ...editProfile,
                                zipCode: e,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="bg-white rounded-2xl p-8 border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    My Orders
                  </h2>
                  {recentOrders.length > 0 ? (
                    <div className="space-y-4">
                      {recentOrders.map((order: Order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">
                                Order #{order.id}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {order.date}
                              </p>
                            </div>

                            <span
                              className={`px-4 py-2 rounded-full text-sm font-medium ${
                                order.status === "delivered"
                                  ? "bg-green-100 text-green-700"
                                  : order.status === "on-the-way"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>

                          <div className=" items-center justify-between pb-5 border-b border-gray-200">
                            {order.items.map((item) => (
                              <div className="my-2 w-full flex items-center justify-between ">
                                <div className="flex items-center">
                                  <span
                                    className={`rounded-lg p-1 px-2 text-sm font-bold bg-${color}-50 text-${color}-500`}
                                  >
                                    {item.quantity}x
                                  </span>
                                  <span className="mx-2">{item.name}</span>
                                </div>

                                <span className="mx-2 text-md font-bold">
                                  ${item.price}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            {/* Left: Total Amount */}
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-600">
                                Total Amount
                              </span>
                              <span className="text-xl font-bold text-gray-900">
                                ${order.total}
                              </span>
                            </div>

                            {/* Right: Buttons */}
                            <div className="flex gap-4">
                              <SimpleButton
                                type="button"
                                label="Track Order"
                                className="w-auto"
                                variant="primary"
                                onClick={() =>
                                  navigate(`/track-order?trackId=${order.id}`)
                                }
                              />
                              <SimpleButton
                                type="button"
                                label="Contact Support"
                                className="w-auto"
                                variant="secondary"
                                onClick={() => navigate("/menu")}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <i className="ri-shopping-bag-line text-6xl text-gray-300 mb-4"></i>
                      <p className="text-gray-600 mb-4">No orders yet</p>

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
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {/* {activeTab === "addresses" && (
                <div className="bg-white rounded-2xl p-8 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Saved Addresses
                    </h2>
                    <button className="px-6 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors whitespace-nowrap cursor-pointer">
                      Add New Address
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-lg">
                            <i className="ri-home-line text-xl text-orange-500"></i>
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-gray-900">
                              Home
                            </h3>
                            <span className="text-xs text-green-600 font-medium">
                              Default
                            </span>
                          </div>
                        </div>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <i className="ri-edit-line"></i>
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">{profile.address}</p>
                      <p className="text-sm text-gray-600">
                        {profile.city}, {profile.zipCode}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {profile.phone}
                      </p>
                    </div>
                  </div>
                </div>
              )} */}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="bg-white rounded-2xl p-8 border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Settings
                  </h2>
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-base font-bold text-gray-900 mb-4">
                        Notifications
                      </h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer">
                          <span className="text-sm text-gray-700">
                            Order updates
                          </span>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                          />
                        </label>
                        <label className="flex items-center justify-between cursor-pointer">
                          <span className="text-sm text-gray-700">
                            Promotional emails
                          </span>
                          <input
                            type="checkbox"
                            className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                          />
                        </label>
                        <label className="flex items-center justify-between cursor-pointer">
                          <span className="text-sm text-gray-700">
                            SMS notifications
                          </span>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-base font-bold text-gray-900 mb-4">
                        Privacy
                      </h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer">
                          <span className="text-sm text-gray-700">
                            Share data for better experience
                          </span>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                          />
                        </label>
                        <label className="flex items-center justify-between cursor-pointer">
                          <span className="text-sm text-gray-700">
                            Location services
                          </span>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-4">
                        Account
                      </h3>
                      <button className="text-sm text-red-600 hover:text-red-700 font-medium cursor-pointer">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {showLogoutModal && (
        <ConfirmationPopup
          title="Logout"
          message="are you sure you want to logout ?"
          acceptBtnLabel="Logout"
          declineBtnLabel="Cancel"
          onAccept={handleLogout}
          onDecline={() => {
            console.log("cancel clieded ");
            setShowLogoutModal(false);
          }}
        />
      )}
    </>
  );
}
