import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        custom: ['"Hanalei Fill"', 'cursive'],
        fire: ['"Bungee Spice"', 'cursive'], // Adding the Google Font to Tailwind's font-family, // Add your custom font here
      },
    },
  },
  plugins: [],
} satisfies Config;
