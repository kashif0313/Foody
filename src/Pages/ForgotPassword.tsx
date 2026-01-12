import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import SimpleButton from "../components/SimpleButton";
import { getThemeColor, getWebsiteName } from "../helpers/common";
const color = getThemeColor();
const WebsiteName = getWebsiteName();
export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      setError("Email is required");
      return;
    }

    setError("");

    alert(`Reset password email has been sent to ${formData.email}`);
    formData.email = "";
  };

  return (
    <>
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
              Forgot Password No worry
            </h1>
            <p className="text-gray-600">Enter Email to Reset Password.</p>
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
                  onChange={(value) =>
                    setFormData({ ...formData, email: value })
                  }
                />
              </div>

              <SimpleButton type="submit" label="Send Reset Password Email" />
            </form>
            <p className="text-center text-sm text-gray-600 mt-6">
              Return to{" "}
              <Link
                to="/login"
                className={`text-${color}-500 font-semibold hover:text-${color}-600`}
              >
                Login
              </Link>{" "}
              Page?{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
