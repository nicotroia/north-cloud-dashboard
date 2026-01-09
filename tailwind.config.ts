import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,scss,mdx}"],
  darkMode: "class",
  plugins: [],
  theme: {
    extend: {
      container: {
        padding: "1.5rem",
        center: true,
      },
      screens: {
        sm: "640px",
        md: "800px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontFamily: {
        primary: ["Montserrat", "Arial", "Helvetica", ...fontFamily.sans],
        body: ["Oxygen", "Arial", "Helvetica", ...fontFamily.sans],
        mono: ["Monaco", ...fontFamily.mono],
      },
      spacing: {
        "content-max": "1536px",
      },
      fontSize: {
        "3xs": "0.5rem",
        "2xs": "0.65rem",
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
      colors: {
        web: {
          primary: "var(--color-primary)",
          "primary-dim": "var(--color-primary-dim)",
          success: "var(--color-success)",
          danger: "var(--color-danger)",
          readable: "var(--color-readable)",
          "readable-dim": "var(--color-readable-dim)",
          background: "var(--color-background)",
          dimmer: "var(--color-content)",
          content: "var(--color-content)",
          "content-dim": "var(--color-content-dim)",
          border: "var(--color-border)",
          link: "var(--color-link)",
          "link-hover": "var(--color-link-hover)",
        },
      },
    },
  },
};

export default config;
