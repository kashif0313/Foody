import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import SimpleButton from "../components/SimpleButton";
import { getThemeColor, getWebsiteName } from "../helpers/common";
const color = getThemeColor();
const WebsiteName = getWebsiteName();
export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (email === "admin@foody.com" && password === "admin123") {
        localStorage.setItem("adminAuth", "true");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid email or password");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className=" flex items-center justify-center ">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2">
              <div className="w-12 h-12 flex items-center justify-center">
                <i
                  className={`ri-restaurant-2-fill text-4xl text-${color}-500`}
                ></i>
              </div>
              <span
                className="text-3xl font-bold text-gray-900"
                style={{ fontFamily: "Pacifico, cursive" }}
              >
                {WebsiteName}
              </span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600">Sign in to manage your restaurant</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <div>
                <InputField
                  label="Email"
                  type="email"
                  required
                  value={email}
                  placeholder="Enter your email"
                  onChange={(value) => setEmail(value)}
                />
              </div>

              <div>
                <InputField
                  label="Password"
                  type={"password"}
                  required
                  value={password}
                  placeholder="Enter your password"
                  onChange={(value) => setPassword(value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    disabled={isLoading}
                    className={`w-4 h-4 text-${color}-500 border-gray-300 rounded focus:ring-${color}-500 cursor-pointer disabled:cursor-not-allowed`}
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className={`text-sm text-${color}-500 hover:text-${color}-600 disabled:opacity-50`}
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle forgot password
                  }}
                >
                  Forgot password?
                </a>
              </div>

              {/* <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 text-white py-3 rounded-lg text-base font-semibold hover:bg-orange-600 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button> */}
              <SimpleButton
                type="submit"
                label={isLoading ? "Signing in..." : "Sign In"}
              />
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Demo credentials: admin@foody.com / admin123
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-orange-500"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
