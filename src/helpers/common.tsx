export const getFeaturedColors = () => {
  return [
    import.meta.env.VITE_FEATURED_CARD_1,
    import.meta.env.VITE_FEATURED_CARD_2,
    import.meta.env.VITE_FEATURED_CARD_3,
    import.meta.env.VITE_FEATURED_CARD_4,
    import.meta.env.VITE_FEATURED_CARD_5,
    import.meta.env.VITE_FEATURED_CARD_6,
    import.meta.env.VITE_FEATURED_CARD_7,
  ];
};

// utils/auth.ts
export const isLoggedIn = () => {
  return !!localStorage.getItem("userAuth");
};

export const isAdmin = () => {
  return !!localStorage.getItem("adminAuth");
};

export const isAdminLoggedIn = () => {
  return window.location.pathname.includes("admin/dashboard");
};

export const getThemeColor = () => {
  const saved = localStorage.getItem("WebsiteConfig");

  // console.log("themeColor == ", saved);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return (
        parsed?.primaryColor || import.meta.env.VITE_THEME_COLOR || "#f97316"
      );
    } catch {
      // fallback if JSON is corrupted
    }
  } else {
    return "green";
  }
  return saved;
};

export const getWebsiteName = () => {
  const saved = localStorage.getItem("WebsiteConfig");

  // console.log("themeColor == ", saved);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return parsed?.siteName || import.meta.env.VITE_SITE_NAME || "foody";
    } catch {
      // fallback if JSON is corrupted
    }
  } else {
    return "foody";
  }
  return saved;
};
