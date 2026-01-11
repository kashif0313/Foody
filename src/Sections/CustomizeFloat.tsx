import { useState, useEffect } from "react";
import type { CustomizationSettings } from "../helpers/Interface";
import InputField from "../components/InputField";
import SimpleButton from "../components/SimpleButton";

export default function CustomizationPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const [settings, setSettings] = useState<CustomizationSettings>(() => {
    const saved = localStorage.getItem("WebsiteConfig");
    return saved
      ? JSON.parse(saved)
      : {
          siteName: "foody",
          primaryColor: "#f97316",
        };
  });

  const applySettings = (newSettings: CustomizationSettings) => {
    // Update CSS variables for colors
    document.documentElement.style.setProperty(
      "--primary-color",
      newSettings.primaryColor
    );

    // Update all elements with the primary color
    const style = document.createElement("style");
    style.id = "custom-theme";
    const existingStyle = document.getElementById("custom-theme");
    if (existingStyle) {
      existingStyle.remove();
    }

    document.head.appendChild(style);
  };

  useEffect(() => {
    applySettings(settings);
  }, [settings]);

  const handleSave = () => {
    localStorage.setItem("WebsiteConfig", JSON.stringify(settings));
    applySettings(settings);
    setIsOpen(false);
    window.location.reload();
  };

  const handleReset = () => {
    const defaultSettings = {
      siteName: "foody",
      primaryColor: "green",
    };
    setSettings(defaultSettings);
    localStorage.setItem("WebsiteConfig", JSON.stringify(defaultSettings));
    applySettings(defaultSettings);
    window.location.reload();
  };
  const presetColors = [
    {
      name: "Orange",
      hex: "#f97316",
      bgClass: "orange",
    },
    {
      name: "Red",
      hex: "#ef4444",
      bgClass: "red",
    },
    {
      name: "Green",
      hex: "#10b981",
      bgClass: "green",
    },
    {
      name: "Teal",
      hex: "#14b8a6",
      bgClass: "teal",
    },
    {
      name: "Pink",
      hex: "#ec4899",
      bgClass: "pink",
    },
    {
      name: "Indigo",
      hex: "#6366f1",
      bgClass: "indigo",
    },
    {
      name: "Amber",
      hex: "#6366f1",
      bgClass: "amber",
    },
    {
      name: "Purple",
      hex: "#a855f7",
      bgClass: "purple",
    },
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center bg-gray-900 text-white rounded-full shadow-2xl hover:scale-110 transition-all z-50 cursor-pointer"
        title="Customize Website"
      >
        <i className="ri-palette-line text-2xl"></i>
      </button>

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Customize Website
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Personalize your site
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-2xl text-gray-700"></i>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Site Name */}
            <div>
              <InputField
                label=" Website Name"
                type="text"
                value={settings.siteName}
                placeholder="Enter your email"
                onChange={(value) =>
                  setSettings({ ...settings, siteName: value })
                }
              />

              <p className="text-xs text-gray-500 mt-2">
                This will appear in the logo and throughout the site
              </p>
            </div>

            {/* Primary Color */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                <i className="ri-palette-line text-lg mr-2"></i>
                Primary Color
              </label>

              {/* Preset Colors */}
              <div>
                <div className="grid grid-cols-3 gap-3">
                  {presetColors.map((preset) => (
                    <button
                      key={preset.hex}
                      onClick={() =>
                        setSettings({
                          ...settings,
                          primaryColor: preset.bgClass,
                        })
                      }
                      className="flex flex-col items-center space-y-1 p-1 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div
                        className={`w-12 h-12 rounded-lg border-2 border-gray-200 bg-${preset.bgClass}-600`}
                      ></div>

                      <span className="text-xs font-medium text-gray-700">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-gray-700 mb-3">
                Preview
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full bg-${settings.primaryColor}-600`}
                  >
                    <i className="ri-restaurant-2-fill text-white text-lg"></i>
                  </div>
                  <span
                    className="text-lg font-bold text-gray-900"
                    style={{ fontFamily: "Pacifico, cursive" }}
                  >
                    {settings.siteName || "foody"}
                  </span>
                </div>

                <button
                  className={`w-full text-white
    px-6 py-3 rounded-lg text-sm font-semibold
    transition-colors whitespace-nowrap cursor-pointer
    flex items-center justify-center gap-2
    disabled:opacity-50 disabled:cursor-not-allowed bg-${settings.primaryColor}-600`}
                >
                  Sample Button
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <i className="ri-information-line text-xl text-blue-500 mt-0.5"></i>
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    Portfolio Mode
                  </p>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    This is a live demo from <strong>itskashifwork</strong>,
                    showcasing how easily the website can be customized for
                    different brands and needs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-200 space-y-3">
            <SimpleButton
              type="submit"
              label="Save Changes"
              icon={<i className="ri-save-line mr-2"></i>}
              onClick={() => handleSave()}
              className="flex-1"
            />
            <SimpleButton
              type="button"
              label=" Reset to Default"
              className="flex-1"
              variant="secondary"
              icon={<i className="ri-refresh-line mr-2"></i>}
              onClick={() => handleReset()}
            />
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        ></div>
      )}
    </>
  );
}
