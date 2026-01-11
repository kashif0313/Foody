import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import SimpleButton from "../components/SimpleButton";
import AuthSocialSection from "../Sections/AuthSocialSection";
import { getThemeColor, getWebsiteName } from "../helpers/common";
const color = getThemeColor();
const WebsiteName = getWebsiteName();
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: { email: string; password: string }) =>
        u.email === formData.email && u.password === formData.password
    );

    if (user) {
      localStorage.setItem("userAuth", "true");
      localStorage.setItem("userName", user.name);
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center px-4 py-12">
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
          <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to continue ordering</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <InputField
                label="Email"
                type="email"
                required
                value={formData.email}
                placeholder="Enter your email"
                onChange={(value) => setFormData({ ...formData, email: value })}
              />
            </div>

            <div>
              <InputField
                label="Password"
                type="password"
                required
                value={formData.password}
                placeholder="Create a password"
                onChange={(value) =>
                  setFormData({ ...formData, password: value })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className={`text-sm text-${color}-500 hover:text-${color}-600`}
              >
                Forgot password?
              </Link>
            </div>

            <SimpleButton type="submit" label="Sign In" />
          </form>
          <AuthSocialSection />
          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className={`text-${color}-500 font-semibold hover:text-${color}-600`}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
