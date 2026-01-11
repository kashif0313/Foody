import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import SimpleButton from "../components/SimpleButton";
import AuthSocialSection from "../Sections/AuthSocialSection";
import { getThemeColor, getWebsiteName } from "../helpers/common";
const color = getThemeColor();
const WebsiteName = getWebsiteName();
export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Save user data to localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if email already exists
    if (
      users.some((user: { email: string }) => user.email === formData.email)
    ) {
      setError("Email already registered");
      return;
    }

    users.push({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("userAuth", "true");
    localStorage.setItem("userName", formData.name);

    navigate("/");
  };

  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="  flex items-center justify-center ">
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
              Create Account
            </h1>
            <p className="text-gray-600">
              Join us and start ordering delicious food
            </p>
          </div>

          {/* Register Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <InputField
                  label="Full Name"
                  type="text"
                  required
                  value={formData.name}
                  placeholder="Enter your full name"
                  onChange={(value) =>
                    setFormData({ ...formData, name: value })
                  }
                />
              </div>

              <div>
                <InputField
                  label="Email"
                  type="email"
                  required
                  value={formData.email}
                  placeholder="Enter your email"
                  onChange={(value) =>
                    setFormData({ ...formData, email: value })
                  }
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

              <div>
                <InputField
                  label=" Confirm Password"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  placeholder="Confirm your password"
                  onChange={(value) =>
                    setFormData({ ...formData, confirmPassword: value })
                  }
                />
              </div>

              <SimpleButton type="submit" label="Create Account" />
            </form>

            <AuthSocialSection />

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className={`text-${color}-500 font-semibold hover:text-${color}-600`}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
