import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getThemeColor, getWebsiteName } from "../helpers/common";
const color = getThemeColor();
const WebsiteName = getWebsiteName();
export default function Footer() {
  useEffect(() => {}, []);

  return (
    <footer className={`bg-${color}-500 py-16 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3
              className="text-3xl font-bold mb-6 text-white"
              style={{ fontFamily: "Pacifico, cursive" }}
            >
              {WebsiteName}
            </h3>
            <p className="text-sm text-white/90 mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              diam pellentesque bibendum non
            </p>
            <div className="flex items-center space-x-3">
              <button
                className={`w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white hover:text-${color}-500 transition-colors cursor-pointer text-white`}
              >
                <i className="ri-facebook-fill text-lg"></i>
              </button>
              <button
                className={`w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white hover:text-${color}-500 transition-colors cursor-pointer text-white`}
              >
                <i className="ri-twitter-fill text-lg"></i>
              </button>
              <button
                className={`w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white hover:text-${color}-500 transition-colors cursor-pointer text-white`}
              >
                <i className="ri-instagram-fill text-lg"></i>
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Company</h4>
            <ul className="space-y-3 text-sm text-white/90">
              <li>
                <Link
                  to="/about-us"
                  className="hover:text-white transition-colors"
                >
                  About us
                </Link>
              </li>
              <li>Team</li>
              <li>Careers</li>
              <li>Services</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Support</h4>
            <ul className="space-y-3 text-sm text-white/90">
              <li>Help center</li>
              <li>Safety center</li>
              <li>Guidelines</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Contact</h4>
            <ul className="space-y-3 text-sm text-white/90">
              <li className="flex items-start space-x-2">
                <i className="ri-map-pin-line text-base mt-1"></i>
                <span>1234 Street Name, City Name</span>
              </li>
              <li className="flex items-start space-x-2">
                <i className="ri-phone-line text-base mt-1"></i>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <i className="ri-mail-line text-base mt-1"></i>
                <span>info@{WebsiteName}.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/90 mb-4 md:mb-0">
            Copyright 2026 {WebsiteName}. All Rights Reserved
          </p>
          <div className="flex items-center space-x-6">
            <Link
              to="/privacy-policy"
              className="text-sm text-white/90 hover:text-white whitespace-nowrap transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-white/90 hover:text-white whitespace-nowrap transition-colors"
            >
              Terms
            </Link>
            <a
              href="https://itskashifwork.epizy.com/?i=1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/90 hover:text-white whitespace-nowrap transition-colors"
            >
              Powered by ItskashifWork
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
