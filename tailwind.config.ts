import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        racing: {
          light: "#22c55e",
          DEFAULT: "#166534",
          dark: "#064e3b",
        },
      },
    },
  },
  plugins: [],
};
export default config;