import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F2A4A",
          dark: "#0A1D33",
          light: "#1E4270",
        },
        brandgreen: {
          DEFAULT: "#1E8A4C",
          dark: "#166A3A",
          light: "#2FAE63",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          container: "#F5F6F8",
          dim: "#E2E5EA",
        },
        ink: {
          DEFAULT: "#12181F",
          muted: "#5B6472",
        },
        status: {
          success: "#1E8A4C",
          warning: "#C98A1B",
          danger: "#C93A2E",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "4px",
      },
    },
  },
  plugins: [],
};

export default config;
