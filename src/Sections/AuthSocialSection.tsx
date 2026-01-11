import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthSocialSection() {
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const handleSocialLogin = (provider: string) => {
    localStorage.setItem("userAuth", "true");
    localStorage.setItem("userName", `${provider} User`);
    navigate("/");
  };
  return (
    <>
      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => handleSocialLogin("Google")}
          className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <i className="ri-google-fill text-xl text-red-500"></i>
        </button>
        <button
          onClick={() => handleSocialLogin("Facebook")}
          className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <i className="ri-facebook-fill text-xl text-blue-600"></i>
        </button>
        <button
          onClick={() => handleSocialLogin("Apple")}
          className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <i className="ri-apple-fill text-xl text-gray-900"></i>
        </button>
      </div>
    </>
  );
}
