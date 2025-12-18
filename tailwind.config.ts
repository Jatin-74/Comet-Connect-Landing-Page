import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tech: ['var(--font-tech)'], // Use with font-tech
        body: ['var(--font-body)'], // Use with font-body
      },
      colors: {
        suronex: {
          green: "#22c55e", // Hacker Green
          dark: "#050505",  // OLED Black
        }
      },
    },
  },
  plugins: [],
};
export default config;