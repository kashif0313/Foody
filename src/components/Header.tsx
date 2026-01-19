import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import RoundedButton from "./RoundedButton";
import {
  getThemeColor,
  getWebsiteName,
  isAdminLoggedIn,
  isLoggedIn,
} from "../helpers/common";
import type { CartItem } from "../helpers/Interface";
import SimpleButton from "./SimpleButton";

const themeColor = getThemeColor();
const WebsiteName = getWebsiteName();

export default function Header() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("cart");
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  });

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const syncCart = () => {
      const stored = localStorage.getItem("cart");
      setCartItems(stored ? JSON.parse(stored) : []);
    };

    window.addEventListener("cartUpdated", syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener("cartUpdated", syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartCount = cartItems.length;

  const NavItem = ({ to, label }: { to: string; label: string }) => (
    <NavLink
      to={to}
      onClick={() => setShowMobileMenu(false)}
      className={({ isActive }) =>
        `block md:inline-block text-sm font-medium whitespace-nowrap px-4 py-2 rounded-full ${
          isActive
            ? `bg-${themeColor}-500 text-white`
            : `text-gray-900 hover:text-${themeColor}-500`
        }`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <>
      {/* Top Banner */}
      <div className="fixed w-full bg-yellow-100 text-yellow-900 text-md text-center py-1 z-30">
        🚀{" "}
        <a
          href="https://itskashifwork.epizy.com/?i=1"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          ItsKashifWork
        </a>{" "}
        Portfolio Demo — Built by Kashif Imran
      </div>

      {/* Navbar */}
      <nav className="fixed top-8 left-0 right-0 z-20 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 flex items-center justify-center">
                <i
                  className={`ri-restaurant-2-fill text-3xl text-${themeColor}-500`}
                ></i>
              </div>
              <span
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "Pacifico, cursive" }}
              >
                {WebsiteName}
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {!isAdminLoggedIn() ? (
                <>
                  <NavItem to="/" label="Home" />
                  <NavItem to="/menu" label="Menu" />
                  <NavItem to="/services" label="Service" />
                  <NavItem to="/about-us" label="About Us" />

                  <div className="flex items-center space-x-4">
                    <Link to="/checkout" className="relative cursor-pointer">
                      <i className="ri-shopping-cart-line text-xl text-gray-700"></i>
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                          {cartCount}
                        </span>
                      )}
                    </Link>

                    {!isLoggedIn() ? (
                      <RoundedButton
                        label="Login"
                        className="px-4 py-2"
                        onClick={() => navigate("/signup")}
                      />
                    ) : (
                      <div className="relative" ref={profileRef}>
                        <button
                          onClick={() => setShowProfileMenu((prev) => !prev)}
                          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                        >
                          <i className="ri-user-3-line text-lg text-gray-700"></i>
                        </button>

                        {showProfileMenu && (
                          <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden z-50">
                            <button
                              onClick={() => {
                                navigate("/profile");
                                setShowProfileMenu(false);
                              }}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                            >
                              <i className="ri-user-line"></i> Profile
                            </button>

                            <div className="border-t" />

                            <button
                              onClick={() => {
                                localStorage.removeItem("userAuth");
                                window.location.href = "/";
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <i className="ri-logout-box-r-line"></i> Logout
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <NavItem to="/" label="View Site" />
                  <SimpleButton
                    onClick={() => {
                      localStorage.removeItem("adminAuth");
                      window.location.href = "/";
                    }}
                    className="w-auto"
                    type="button"
                    label="Logout"
                  />
                </>
              )}
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden text-2xl text-gray-700"
              onClick={() => setShowMobileMenu((prev) => !prev)}
            >
              <i
                className={showMobileMenu ? "ri-close-line" : "ri-menu-3-line"}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t shadow-sm">
            <div className="px-4 py-4 space-y-2">
              {!isAdminLoggedIn() ? (
                <>
                  <NavItem to="/" label="Home" />
                  <NavItem to="/menu" label="Menu" />
                  <NavItem to="/services" label="Service" />
                  <NavItem to="/about-us" label="About Us" />

                  <Link
                    to="/checkout"
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700"
                  >
                    <i className="ri-shopping-cart-line"></i>
                    Cart ({cartCount})
                  </Link>

                  {!isLoggedIn() ? (
                    <RoundedButton
                      label="Login"
                      className="w-full mt-2 px-4 py-2"
                      onClick={() => {
                        navigate("/signup");
                        setShowMobileMenu(false);
                      }}
                    />
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setShowMobileMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                      >
                        <i className="ri-user-line"></i> Profile
                      </button>

                      <button
                        onClick={() => {
                          localStorage.removeItem("userAuth");
                          window.location.href = "/";
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <i className="ri-logout-box-r-line"></i> Logout
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <NavItem to="/" label="View Site" />
                  <SimpleButton
                    onClick={() => {
                      localStorage.removeItem("adminAuth");
                      window.location.href = "/";
                    }}
                    className="w-full"
                    type="button"
                    label="Logout"
                  />
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
